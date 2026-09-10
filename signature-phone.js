(() => {
  const SIGNATURES_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  const CODE_KEY = 'pw-collaudo-access-code';
  const MOBILE_QUERY = '(max-width: 850px)';
  let signaturesCache = null;

  function isMobile() {
    return window.matchMedia(MOBILE_QUERY).matches;
  }

  function isPvc() {
    return String(document.getElementById('formType')?.value || '').startsWith('pvc');
  }

  function getOperator(row, index) {
    return String(row.querySelector(`input[data-field="phase_operator_${index}"]`)?.value || '').trim();
  }

  function getOrAskCode() {
    let code = String(localStorage.getItem(CODE_KEY) || '').trim();
    if (code) return code;

    code = String(prompt('Inserisci il codice reparto per caricare le firme operatori:') || '')
      .trim()
      .toUpperCase();

    if (code) localStorage.setItem(CODE_KEY, code);
    return code;
  }

  async function fetchSignatures(force = false) {
    if (signaturesCache && !force) return signaturesCache;

    const code = getOrAskCode();
    if (!code) return null;

    try {
      const res = await fetch(SIGNATURES_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'signatures', code })
      });

      let data = {};
      try { data = await res.json(); } catch (_) {}

      if (res.status === 401) {
        localStorage.removeItem(CODE_KEY);
        signaturesCache = null;
        alert('Codice reparto non corretto. Premi di nuovo + e reinseriscilo.');
        return null;
      }

      if (!res.ok) {
        alert('Non riesco a caricare le firme. Riprova tra un momento.');
        return null;
      }

      signaturesCache = data?.signatures || {};
      return signaturesCache;
    } catch (err) {
      console.error('Caricamento firme mobile', err);
      alert('Connessione non disponibile. Controlla internet e riprova.');
      return null;
    }
  }

  function ensureMarker(row, index, operator) {
    const fieldName = `phase_signature_plus_v3_${index}`;
    let input = row.querySelector(`input[data-field="${fieldName}"]`);
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.dataset.field = fieldName;
      row.querySelector('.resultbox')?.appendChild(input);
    }
    input.value = `v3:${operator}`;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    return input;
  }

  function showSignature(row, index, operator, dataUrl) {
    ensureMarker(row, index, operator);

    const key = `phase_sign_${index}`;
    if (typeof setSignatureImage === 'function') {
      setSignatureImage(key, dataUrl);
    } else {
      const img = row.querySelector(`img[data-signature="${key}"]`);
      if (img) {
        img.src = dataUrl;
        img.dataset.hasSignature = '1';
      }
    }

    const preview = row.querySelector('.signature-preview');
    if (preview) preview.classList.remove('pw-signature-awaiting-plus');

    const img = row.querySelector(`img[data-signature="${key}"]`);
    if (img) {
      img.dataset.hasSignature = '1';
      img.style.setProperty('display', 'block', 'important');
      img.style.setProperty('visibility', 'visible', 'important');
      img.style.setProperty('opacity', '1', 'important');
      img.style.setProperty('max-width', '100%', 'important');
      img.style.setProperty('max-height', '100%', 'important');
      img.style.setProperty('object-fit', 'contain', 'important');
    }

    if (typeof autoSave === 'function') autoSave();
    if (window.PWCollaudoSync?.queueSave) window.PWCollaudoSync.queueSave(120);
  }

  document.addEventListener('click', async event => {
    const button = event.target.closest?.('.pw-signature-plus-proxy');
    if (!button || !isMobile() || !isPvc()) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    const row = button.closest('tr');
    if (!row) return;

    const rows = Array.from(document.querySelectorAll('#formArea tbody tr'));
    const index = rows.indexOf(row);
    if (index < 0) return;

    const operator = getOperator(row, index);
    if (!operator) return;

    button.disabled = true;
    const oldText = button.textContent;
    button.textContent = '…';

    try {
      let signatures = await fetchSignatures(false);
      let signature = signatures?.[operator] || '';

      if (!signature) {
        signatures = await fetchSignatures(true);
        signature = signatures?.[operator] || '';
      }

      if (!signature) {
        alert(`Firma non ancora disponibile per ${operator}.`);
        return;
      }

      showSignature(row, index, operator, signature);
    } finally {
      button.disabled = false;
      button.textContent = oldText || '+';
    }
  }, true);

  window.addEventListener('pageshow', () => {
    signaturesCache = null;
  });
})();