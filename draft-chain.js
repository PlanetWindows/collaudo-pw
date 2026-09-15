(() => {
  const SYNC_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  const CODE_KEY = 'pw-collaudo-access-code';

  let saveTimer = null;
  let saving = false;
  let pending = false;
  let lastSentSnapshot = '';

  function setStatus(message, ms = 2600) {
    const el = document.getElementById('status');
    if (!el) return;
    el.textContent = message;
    if (ms > 0) {
      setTimeout(() => {
        if (el.textContent === message) el.textContent = '';
      }, ms);
    }
  }

  function getType() {
    return document.getElementById('formType')?.value || '';
  }

  function getCommessa() {
    return String(document.querySelector('input[data-field="commessa"]')?.value || '').trim();
  }

  function collectDraft() {
    let payload = null;

    try {
      if (typeof window.collect === 'function') payload = window.collect();
    } catch (_) {}

    if (!payload || typeof payload !== 'object') {
      payload = {
        type: getType(),
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
        payload.signatures[img.dataset.signature] = img.dataset.hasSignature === '1' && img.getAttribute('src')
          ? img.src
          : '';
      });
    }

    payload.workflow_status = 'draft';
    return payload;
  }

  function getCode(forcePrompt = false) {
    if (!forcePrompt) {
      const saved = String(localStorage.getItem(CODE_KEY) || '').trim();
      if (saved) return saved;
    }

    const code = String(prompt('Inserisci il codice reparto Collaudo PW:') || '')
      .trim()
      .toUpperCase();

    if (code) localStorage.setItem(CODE_KEY, code);
    return code;
  }

  async function sendDraft(code, type, commessa, payload) {
    const res = await fetch(SYNC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'save',
        code,
        form_type: type,
        commessa,
        patch: payload
      })
    });

    let data = {};
    try { data = await res.json(); } catch (_) {}
    return { res, data };
  }

  async function saveSharedDraft(showMessage = false, force = false) {
    clearTimeout(saveTimer);

    const type = getType();
    const commessa = getCommessa();
    if (!type || !commessa) {
      if (showMessage) setStatus('Inserisci prima la commessa', 2500);
      return false;
    }

    const payload = collectDraft();
    const snapshot = JSON.stringify(payload);
    if (!force && snapshot === lastSentSnapshot) {
      if (showMessage) setStatus('Bozza condivisa già aggiornata', 2200);
      return true;
    }

    if (saving) {
      pending = true;
      return false;
    }

    saving = true;
    try {
      let code = getCode(false);
      if (!code) return false;

      let { res, data } = await sendDraft(code, type, commessa, payload);

      if (res.status === 401 && data?.error === 'invalid_code') {
        localStorage.removeItem(CODE_KEY);
        code = getCode(true);
        if (!code) return false;
        ({ res, data } = await sendDraft(code, type, commessa, payload));
      }

      if (!res.ok) throw new Error(data?.error || `draft_${res.status}`);

      lastSentSnapshot = snapshot;
      localStorage.setItem(`pw-collaudo-${type}`, JSON.stringify(data?.payload || payload));

      if (showMessage) {
        setStatus('Bozza condivisa online — pronta per il collega', 4000);
      }
      return true;
    } catch (err) {
      console.error('Salvataggio bozza condivisa', err);
      if (showMessage) setStatus('Bozza locale salvata, ma non ancora condivisa online', 4000);
      return false;
    } finally {
      saving = false;
      if (pending) {
        pending = false;
        scheduleSave(100);
      }
    }
  }

  function scheduleSave(delay = 500) {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => saveSharedDraft(false, false), delay);
  }

  function renameDraftButtons() {
    document.querySelectorAll('button').forEach(button => {
      const text = String(button.textContent || '').trim();
      if (text === 'Salva bozza') button.textContent = 'Salva bozza condivisa';
      if (text === '💾 Salva bozza sul dispositivo') button.textContent = '💾 Salva bozza condivisa';
    });
  }

  const originalSaveDraft = typeof window.saveDraft === 'function' ? window.saveDraft : null;
  if (originalSaveDraft) {
    window.saveDraft = function(show = true) {
      const result = originalSaveDraft.apply(this, arguments);
      if (show) saveSharedDraft(true, true);
      else scheduleSave(450);
      return result;
    };
  }

  document.addEventListener('input', event => {
    const el = event.target;
    if (!(el instanceof HTMLInputElement)) return;
    if (el.matches('input[data-field], input[data-group]')) scheduleSave(el.dataset.field === 'commessa' ? 650 : 450);
  }, true);

  document.addEventListener('change', event => {
    const el = event.target;
    if (!(el instanceof HTMLInputElement)) return;
    if (el.matches('input[data-field], input[data-group]')) scheduleSave(250);
  }, true);

  document.addEventListener('click', event => {
    const button = event.target.closest?.('button');
    if (!button) return;
    const text = String(button.textContent || '').toLowerCase();
    if (text.includes('salva bozza')) {
      setTimeout(() => saveSharedDraft(true, true), 0);
    }
  }, true);

  const signatureObserver = new MutationObserver(mutations => {
    if (mutations.some(m => m.target instanceof HTMLImageElement && m.target.matches('img[data-signature]'))) {
      scheduleSave(250);
    }
  });

  signatureObserver.observe(document.body, {
    subtree: true,
    attributes: true,
    attributeFilter: ['src', 'data-has-signature']
  });

  renameDraftButtons();
  setTimeout(renameDraftButtons, 0);
  document.getElementById('formType')?.addEventListener('change', () => {
    lastSentSnapshot = '';
    setTimeout(renameDraftButtons, 0);
  });

  window.PWCollaudoDraftChain = {
    saveNow: () => saveSharedDraft(true, true),
    scheduleSave
  };
})();