(() => {
  const SYNC_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  const CODE_KEY = 'pw-collaudo-access-code';
  const LOCAL_SCAN_MS = 700;
  const REMOTE_POLL_MS = 3000;

  let activeKey = '';
  let basePayload = null;
  let lastUpdatedAt = '';
  let lastLocalSnapshot = '';
  let localDirty = false;
  let applyingRemote = false;
  let savingRemote = false;
  let loadingRemote = false;
  let codePromptPaused = false;
  let saveTimer = null;
  let loadSeq = 0;

  function setStatus(message, ms = 2200) {
    const el = document.getElementById('status');
    if (!el) return;
    el.textContent = message;
    if (ms > 0) {
      setTimeout(() => {
        if (el.textContent === message) el.textContent = '';
      }, ms);
    }
  }

  function getFormType() {
    return document.getElementById('formType')?.value || '';
  }

  function getCommessa() {
    return (document.querySelector('[data-field="commessa"]')?.value || '').trim();
  }

  function normalizeCommessa(value) {
    return String(value || '').trim().toUpperCase().replace(/\s+/g, ' ');
  }

  function makeKey(type, commessa) {
    return `${type}::${normalizeCommessa(commessa)}`;
  }

  function getAccessCode() {
    let code = localStorage.getItem(CODE_KEY) || '';
    if (code) return code;
    if (codePromptPaused) return '';

    code = (prompt('Inserisci il codice reparto per condividere le schede Collaudo PW tra i PC:') || '')
      .trim()
      .toUpperCase();

    if (code) localStorage.setItem(CODE_KEY, code);
    else codePromptPaused = true;
    return code;
  }

  async function api(body) {
    const code = getAccessCode();
    if (!code) throw new Error('code_missing');

    const res = await fetch(SYNC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, code })
    });

    let json = {};
    try { json = await res.json(); } catch (_) {}

    if (res.status === 401 && json.error === 'invalid_code') {
      localStorage.removeItem(CODE_KEY);
      codePromptPaused = true;
      alert('Codice reparto non corretto. Reinseriscilo modificando di nuovo la commessa.');
      throw new Error('invalid_code');
    }

    if (!res.ok) throw new Error(json.error || `sync_${res.status}`);
    return json;
  }

  function collectDom() {
    const payload = {
      type: getFormType(),
      fields: {},
      esiti: {},
      signatures: {}
    };

    document.querySelectorAll('input[data-field]').forEach(el => {
      payload.fields[el.dataset.field] = el.value || '';
    });

    document.querySelectorAll('input[data-group]').forEach(el => {
      if (el.checked) payload.esiti[el.dataset.group] = el.dataset.value;
    });

    document.querySelectorAll('img[data-signature]').forEach(img => {
      const key = img.dataset.signature;
      payload.signatures[key] = img.dataset.hasSignature === '1' && img.getAttribute('src')
        ? img.src
        : '';
    });

    return payload;
  }

  function stablePayload(payload) {
    if (!payload) return '';
    return JSON.stringify({
      type: payload.type || '',
      fields: payload.fields || {},
      esiti: payload.esiti || {},
      signatures: payload.signatures || {}
    });
  }

  function deepEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  function buildPatch(base, current) {
    if (deepEqual(base, current)) return undefined;

    const baseObj = base && typeof base === 'object' && !Array.isArray(base);
    const curObj = current && typeof current === 'object' && !Array.isArray(current);
    if (!baseObj || !curObj) return current;

    const out = {};
    const keys = new Set([...Object.keys(base || {}), ...Object.keys(current || {})]);

    for (const key of keys) {
      if (!(key in current)) {
        out[key] = null;
        continue;
      }
      const diff = buildPatch(base?.[key], current[key]);
      if (diff !== undefined) out[key] = diff;
    }

    return Object.keys(out).length ? out : undefined;
  }

  function setSignatureDom(key, dataUrl) {
    const img = document.querySelector(`img[data-signature="${key}"]`);
    const empty = document.querySelector(`[data-signature-placeholder="${key}"]`);
    if (!img) return;

    if (dataUrl) {
      img.src = dataUrl;
      img.dataset.hasSignature = '1';
      img.style.display = 'block';
      if (empty) empty.style.display = 'none';
    } else {
      img.removeAttribute('src');
      img.dataset.hasSignature = '0';
      img.style.display = 'none';
      if (empty) empty.style.display = '';
    }
  }

  function applyDom(payload, message = '') {
    if (!payload) return;
    applyingRemote = true;

    try {
      document.querySelectorAll('input[data-field]').forEach(el => {
        if (payload.fields && payload.fields[el.dataset.field] !== undefined) {
          el.value = payload.fields[el.dataset.field] ?? '';
        }
      });

      document.querySelectorAll('input[data-group]').forEach(el => {
        el.checked = !!(payload.esiti && payload.esiti[el.dataset.group] === el.dataset.value);
      });

      document.querySelectorAll('img[data-signature]').forEach(img => {
        const saved = payload.signatures?.[img.dataset.signature] || '';
        setSignatureDom(img.dataset.signature, saved);
      });

      const type = getFormType();
      if (type) {
        localStorage.setItem(`pw-collaudo-${type}`, JSON.stringify(payload));
      }

      lastLocalSnapshot = stablePayload(collectDom());
      localDirty = false;
      if (message) setStatus(message);
    } finally {
      applyingRemote = false;
    }
  }

  function resetStateForKey(key) {
    activeKey = key;
    basePayload = null;
    lastUpdatedAt = '';
    lastLocalSnapshot = stablePayload(collectDom());
    localDirty = false;
    clearTimeout(saveTimer);
  }

  async function loadCurrent(forceApply = false) {
    const type = getFormType();
    const commessa = getCommessa();
    if (!type || !commessa) return;

    const key = makeKey(type, commessa);
    const isNewKey = key !== activeKey;
    if (isNewKey) resetStateForKey(key);

    if (loadingRemote) return;
    loadingRemote = true;
    const seq = ++loadSeq;
    const snapshotBeforeLoad = stablePayload(collectDom());

    if (isNewKey) setStatus('Carico la commessa condivisa…', 0);

    try {
      const data = await api({ action: 'load', form_type: type, commessa });
      if (seq !== loadSeq || key !== activeKey) return;

      const snapshotNow = stablePayload(collectDom());
      const changedLocallyDuringLoad = snapshotNow !== snapshotBeforeLoad;

      if (data.found) {
        if (isNewKey || forceApply || (data.updated_at && data.updated_at !== lastUpdatedAt)) {
          if (!localDirty && !changedLocallyDuringLoad && !savingRemote) {
            basePayload = data.payload || {};
            lastUpdatedAt = data.updated_at || '';
            applyDom(data.payload, isNewKey ? 'Scheda condivisa caricata' : 'Aggiornata da un altro PC');
          }
        }
      } else if (isNewKey) {
        basePayload = {};
        lastUpdatedAt = '';
        lastLocalSnapshot = snapshotNow;
        setStatus('Nuova commessa condivisa');
        queueSave(120);
      }
    } catch (err) {
      const msg = String(err?.message || err);
      if (msg.includes('code_missing') || msg.includes('invalid_code')) {
        setStatus('Salvataggio online non attivo');
      } else {
        console.error('Collaudo sync load', err);
        setStatus('Offline: bozza salvata solo su questo PC');
      }
    } finally {
      loadingRemote = false;
    }
  }

  async function saveNow() {
    clearTimeout(saveTimer);
    const type = getFormType();
    const commessa = getCommessa();
    if (!type || !commessa || applyingRemote || savingRemote) return;

    const key = makeKey(type, commessa);
    if (key !== activeKey) {
      resetStateForKey(key);
      await loadCurrent(false);
      if (key !== activeKey) return;
    }

    if (basePayload === null) {
      await loadCurrent(false);
      if (basePayload === null) return;
    }

    const current = collectDom();
    const patch = buildPatch(basePayload || {}, current);

    if (!patch) {
      lastLocalSnapshot = stablePayload(current);
      localDirty = false;
      return;
    }

    savingRemote = true;
    try {
      const data = await api({ action: 'save', form_type: type, commessa, patch });
      if (key !== activeKey) return;

      basePayload = data.payload || current;
      lastUpdatedAt = data.updated_at || '';
      applyDom(basePayload);
      setStatus('Sincronizzato');
    } catch (err) {
      console.error('Collaudo sync save', err);
      localDirty = true;
      setStatus('Offline: bozza salvata solo su questo PC');
    } finally {
      savingRemote = false;
    }
  }

  function queueSave(delay = 350) {
    if (applyingRemote) return;
    localDirty = true;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveNow, Math.max(0, delay));
  }

  function checkLocalChanges() {
    const type = getFormType();
    const commessa = getCommessa();
    if (!type || !commessa || applyingRemote) return;

    const key = makeKey(type, commessa);
    if (key !== activeKey) {
      codePromptPaused = false;
      resetStateForKey(key);
      loadCurrent(false);
      return;
    }

    if (basePayload === null) return;

    const snapshot = stablePayload(collectDom());
    if (snapshot !== lastLocalSnapshot) {
      lastLocalSnapshot = snapshot;
      queueSave(250);
    }
  }

  document.addEventListener('input', e => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement)) return;

    if (el.dataset.field === 'commessa') {
      codePromptPaused = false;
      const type = getFormType();
      const commessa = getCommessa();
      const key = type && commessa ? makeKey(type, commessa) : '';
      if (key && key !== activeKey) {
        resetStateForKey(key);
        setTimeout(() => loadCurrent(false), 250);
      }
      return;
    }

    if (el.matches('input[data-field]')) queueSave(250);
  }, true);

  document.addEventListener('change', e => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement)) return;
    if (el.matches('input[data-group], input[data-field]')) queueSave(180);
  }, true);

  document.addEventListener('click', e => {
    const button = e.target.closest?.('button');
    if (!button) return;
    const text = (button.textContent || '').toLowerCase();
    if (text.includes('salva bozza')) {
      setTimeout(() => saveNow(), 0);
    }
  }, true);

  document.getElementById('formType')?.addEventListener('change', () => {
    activeKey = '';
    basePayload = null;
    lastUpdatedAt = '';
    lastLocalSnapshot = '';
    localDirty = false;
    clearTimeout(saveTimer);
    setTimeout(() => {
      const commessa = getCommessa();
      if (commessa) loadCurrent(false);
    }, 100);
  });

  window.PWCollaudoSync = {
    queueSave,
    saveNow,
    reload: () => loadCurrent(true)
  };

  setInterval(checkLocalChanges, LOCAL_SCAN_MS);
  setInterval(() => {
    if (getCommessa() && activeKey && !localDirty && !savingRemote && !loadingRemote) {
      loadCurrent(false);
    }
  }, REMOTE_POLL_MS);

  window.addEventListener('online', () => {
    setStatus('Connessione ripristinata');
    loadCurrent(false).then(() => {
      if (localDirty) saveNow();
    });
  });

  setTimeout(() => {
    const commessa = getCommessa();
    if (commessa) {
      const key = makeKey(getFormType(), commessa);
      resetStateForKey(key);
      loadCurrent(false);
    }
  }, 100);
})();
