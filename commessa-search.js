(() => {
  const SYNC_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  const CODE_KEY = 'pw-collaudo-access-code';

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

  function getAccessCode() {
    let code = String(localStorage.getItem(CODE_KEY) || '').trim();
    if (code) return code;

    code = String(prompt('Inserisci il codice reparto Collaudo PW:') || '')
      .trim()
      .toUpperCase();

    if (code) localStorage.setItem(CODE_KEY, code);
    return code;
  }

  function setSignature(key, dataUrl) {
    if (typeof window.setSignatureImage === 'function') {
      window.setSignatureImage(key, dataUrl || '');
      return;
    }

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

  function applyPayload(payload) {
    const fields = payload?.fields || {};
    const esiti = payload?.esiti || {};
    const signatures = payload?.signatures || {};

    document.querySelectorAll('input[data-field]').forEach(input => {
      const key = input.dataset.field;
      if (Object.prototype.hasOwnProperty.call(fields, key)) {
        input.value = fields[key] ?? '';
      }
    });

    document.querySelectorAll('input[data-group]').forEach(input => {
      input.checked = esiti[input.dataset.group] === input.dataset.value;
    });

    document.querySelectorAll('img[data-signature]').forEach(img => {
      const key = img.dataset.signature;
      setSignature(key, signatures[key] || '');
    });
  }

  async function searchSharedCommessa(button) {
    const type = document.getElementById('formType')?.value || '';
    const input = document.querySelector('input[data-field="commessa"]');
    const commessa = String(input?.value || '').trim();

    if (!type || !input) return;
    if (!commessa) {
      alert('Inserisci prima il numero della commessa.');
      input.focus();
      return;
    }

    const code = getAccessCode();
    if (!code) return;

    const oldText = button.textContent;
    button.disabled = true;
    button.textContent = 'CERCO…';
    setStatus('Cerco la commessa condivisa…', 0);

    try {
      const res = await fetch(SYNC_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'load',
          code,
          form_type: type,
          commessa
        })
      });

      let data = {};
      try { data = await res.json(); } catch (_) {}

      if (res.status === 401 && data?.error === 'invalid_code') {
        localStorage.removeItem(CODE_KEY);
        setStatus('Codice reparto non corretto', 3000);
        alert('Codice reparto non corretto. Inserisci il nuovo codice operatori e riprova.');
        return;
      }

      if (!res.ok) throw new Error(data?.error || `search_${res.status}`);

      if (!data?.found) {
        setStatus('Commessa non trovata', 3500);
        alert(`La commessa “${commessa}” non risulta ancora salvata online per questo tipo di scheda.`);
        return;
      }

      const payload = data.payload || {};
      applyPayload(payload);
      localStorage.setItem(`pw-collaudo-${type}`, JSON.stringify(payload));
      setStatus('Commessa trovata: lavoro del collega caricato', 4000);

      setTimeout(() => {
        if (window.PWCollaudoSync?.reload) window.PWCollaudoSync.reload();
      }, 150);
    } catch (err) {
      console.error('Ricerca commessa condivisa', err);
      setStatus('Errore durante la ricerca della commessa', 3500);
      alert('Non sono riuscito a cercare la commessa. Controlla la connessione e riprova.');
    } finally {
      button.disabled = false;
      button.textContent = oldText;
    }
  }

  function installSearchButton() {
    const input = document.querySelector('input[data-field="commessa"]');
    if (!input) return;

    const cell = input.parentElement;
    if (!cell || cell.querySelector('.pw-commessa-search-btn')) return;

    cell.classList.add('pw-commessa-search-cell');
    input.classList.add('pw-commessa-input');

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'pw-commessa-search-btn';
    button.textContent = 'CERCA';
    button.title = 'Cerca e carica la commessa condivisa già compilata da un collega';
    button.addEventListener('click', () => searchSharedCommessa(button));
    cell.appendChild(button);

    input.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        button.click();
      }
    });
  }

  const style = document.createElement('style');
  style.textContent = `
    .pw-commessa-search-cell {
      display: grid !important;
      grid-template-columns: minmax(0, 1fr) auto !important;
      gap: 6px !important;
      align-items: center !important;
    }
    .pw-commessa-search-cell .pw-commessa-input {
      min-width: 0 !important;
      width: 100% !important;
    }
    .pw-commessa-search-btn {
      white-space: nowrap;
      min-height: 34px;
      padding: 6px 10px !important;
      font-size: 11px !important;
      font-weight: 700 !important;
    }
    @media (max-width: 700px) {
      .pw-commessa-search-cell {
        grid-template-columns: minmax(0, 1fr) auto !important;
      }
      .pw-commessa-search-btn {
        min-height: 38px;
        padding: 7px 9px !important;
      }
    }
    @media print {
      .pw-commessa-search-btn { display: none !important; }
      .pw-commessa-search-cell { display: block !important; }
    }
  `;
  document.head.appendChild(style);

  installSearchButton();
  setTimeout(installSearchButton, 0);

  document.getElementById('formType')?.addEventListener('change', () => {
    setTimeout(installSearchButton, 0);
  });

  const observer = new MutationObserver(installSearchButton);
  observer.observe(document.body, { childList: true, subtree: true });
})();
