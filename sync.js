(() => {
  const SYNC_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  const CODE_KEY = 'pw-collaudo-access-code';
  const POLL_MS = 5000;

  let activeKey = '';
  let lastPayload = null;
  let lastUpdatedAt = '';
  let localDirty = false;
  let applyingRemote = false;
  let savingRemote = false;
  let loadSeq = 0;
  let saveTimer = null;
  let pollTimer = null;

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  function setStatus(message, ms = 2200) {
    const el = document.getElementById('status');
    if (!el) return;
    el.textContent = message;
    if (ms > 0) setTimeout(() => {
      if (el.textContent === message) el.textContent = '';
    }, ms);
  }

  function getFormType() {
    return document.getElementById('formType')?.value || '';
  }

  function getCommessa() {
    return (document.querySelector('[data-field="commessa"]')?.value || '').trim();
  }

  function makeKey(type, commessa) {
    return `${type}::${commessa.trim().toUpperCase().replace(/\s+/g, ' ')}`;
  }

  function hasMeaningfulData(payload) {
    if (!payload) return false;
    const f = payload.fields || {};
    const hasField = Object.entries(f).some(([k, v]) => k !== 'commessa' && String(v || '').trim());
    return hasField || Object.keys(payload.esiti || {}).length > 0 || Object.values(payload.signatures || {}).some(Boolean);
  }

  function getAccessCode() {
    let code = localStorage.getItem(CODE_KEY) || '';
    if (code) return code;
    code = (prompt('Inserisci il codice reparto per condividere le schede Collaudo PW tra i PC:') || '').trim().toUpperCase();
    if (code) localStorage.setItem(CODE_KEY, code);
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
      alert('Codice reparto non corretto. Reinseriscilo al prossimo tentativo.');
      throw new Error('invalid_code');
    }
    if (!res.ok) throw new Error(json.error || `sync_${res.status}`);
    return json;
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
      const d = buildPatch(base?.[key], current[key]);
      if (d !== undefined) out[key] = d;
    }
    return Object.keys(out).length ? out : undefined;
  }

  function applyRemotePayload(payload, message = '') {
    if (!payload || typeof window.apply !== 'function') return;
    applyingRemote = true;
    try {
      window.apply(payload);
      localStorage.setItem(`pw-collaudo-${getFormType()}`, JSON.stringify(payload));
      if (message) setStatus(message);
    } finally {
      applyingRemote = false;
    }
  }

  async function loadCurrent(forceApply = false) {
    const type = getFormType();
    const commessa = getCommessa();
    if (!type || !commessa) {
      activeKey = '';
      lastPayload = null;
      lastUpdatedAt = '';
      return;
    }

    const seq = ++loadSeq;
    const key = makeKey(type, commessa);
    const firstForKey = key !== activeKey;
    if (firstForKey) {
      activeKey = key;
      lastPayload = null;
      lastUpdatedAt = '';
      localDirty = false;
      setStatus('Carico la commessa condivisa…', 0);
    }

    try {
      const data = await api({ action: 'load', form_type: type, commessa });
      if (seq !== loadSeq || key !== activeKey) return;

      if (data.found) {
        const changed = data.updated_at && data.updated_at !== lastUpdatedAt;
        lastPayload = data.payload || {};
        lastUpdatedAt = data.updated_at || '';

        if ((firstForKey || forceApply || changed) && !localDirty && !savingRemote) {
          applyRemotePayload(data.payload, firstForKey ? 'Scheda condivisa caricata' : 'Aggiornata da un altro PC');
        }
      } else if (firstForKey) {
        lastPayload = {};
        lastUpdatedAt = '';
        setStatus('Nuova commessa condivisa');
        scheduleSave(150);
      }
    } catch (err) {
      if (String(err.message).includes('code_missing') || String(err.message).includes('invalid_code')) {
        setStatus('Salvataggio online non attivo');
      } else {
        console.error('Collaudo sync load', err);
        setStatus('Offline: bozza salvata solo su questo PC');
      }
    }
  }

  async function saveCurrent() {
    clearTimeout(saveTimer);
    const type = getFormType();
    const commessa = getCommessa();
    if (!type || !commessa || applyingRemote || typeof window.collect !== 'function') return;

    const key = makeKey(type, commessa);
    if (key !== activeKey) {
      await loadCurrent(false);
      if (key !== activeKey) return;
    }

    const current = window.collect();
    const patch = buildPatch(lastPayload || {}, current);
    if (!patch) {
      localDirty = false;
      return;
    }

    savingRemote = true;
    try {
      const data = await api({ action: 'save', form_type: type, commessa, patch });
      if (key !== activeKey) return;
      lastPayload = data.payload || current;
      lastUpdatedAt = data.updated_at || '';
      localDirty = false;
      applyRemotePayload(lastPayload);
      setStatus('Sincronizzato');
    } catch (err) {
      console.error('Collaudo sync save', err);
      setStatus('Offline: bozza salvata solo su questo PC');
    } finally {
      savingRemote = false;
    }
  }

  function scheduleSave(delay = 800) {
    if (applyingRemote) return;
    localDirty = true;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveCurrent, delay);
  }

  function bindCommessa() {
    const input = document.querySelector('[data-field="commessa"]');
    if (!input || input.dataset.syncBound === '1') return;
    input.dataset.syncBound = '1';
    input.addEventListener('input', () => {
      localDirty = false;
      clearTimeout(saveTimer);
      setTimeout(() => loadCurrent(false), 500);
    });
    if (input.value.trim()) setTimeout(() => loadCurrent(false), 120);
  }

  document.addEventListener('input', e => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement)) return;
    if (el.dataset.field === 'commessa') return;
    if (el.matches('input[data-field]')) scheduleSave();
  }, true);

  document.addEventListener('change', e => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement)) return;
    if (el.matches('input[data-group]')) scheduleSave(250);
  }, true);

  const originalSetSignatureImage = window.setSignatureImage;
  if (typeof originalSetSignatureImage === 'function') {
    window.setSignatureImage = function(key, dataUrl) {
      const r = originalSetSignatureImage.apply(this, arguments);
      if (!applyingRemote && activeKey) scheduleSave(350);
      return r;
    };
  }

  const originalSaveDraft = window.saveDraft;
  if (typeof originalSaveDraft === 'function') {
    window.saveDraft = function(show = true) {
      const r = originalSaveDraft.apply(this, arguments);
      if (!applyingRemote) scheduleSave(100);
      return r;
    };
  }

  const area = document.getElementById('formArea');
  if (area) {
    new MutationObserver(() => {
      activeKey = '';
      lastPayload = null;
      lastUpdatedAt = '';
      localDirty = false;
      setTimeout(bindCommessa, 0);
    }).observe(area, { childList: true, subtree: false });
  }

  document.getElementById('formType')?.addEventListener('change', () => {
    activeKey = '';
    lastPayload = null;
    lastUpdatedAt = '';
    localDirty = false;
    setTimeout(bindCommessa, 50);
  });

  bindCommessa();
  pollTimer = setInterval(() => {
    if (getCommessa() && activeKey && !savingRemote) loadCurrent(false);
  }, POLL_MS);

  window.addEventListener('online', () => {
    setStatus('Connessione ripristinata');
    loadCurrent(false).then(() => {
      if (localDirty) saveCurrent();
    });
  });

  window.addEventListener('beforeunload', () => {
    clearInterval(pollTimer);
    clearTimeout(saveTimer);
  });
})();
