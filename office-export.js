(() => {
  const ROLE_KEY = 'pw-collaudo-role';
  const OFFICE_LOCAL_KEY = 'pw-collaudo-office-code';
  const OFFICE_SESSION_KEY = 'pw-collaudo-office-code-session';
  const EXPORT_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-export';

  if (String(localStorage.getItem(ROLE_KEY) || '') !== 'office') return;

  const style = document.createElement('style');
  style.textContent = `
    .pw-office-export {
      border: 1px solid #c7a044 !important;
      background: #c7a044 !important;
      color: #111 !important;
      border-radius: 8px !important;
      padding: 9px 12px !important;
      font-weight: 700 !important;
      cursor: pointer !important;
      white-space: nowrap !important;
    }
    .pw-archive-row {
      grid-template-columns: minmax(160px, 1fr) minmax(150px, .8fr) minmax(150px, .8fr) auto auto !important;
    }
    @media (max-width: 700px) {
      .pw-archive-row { grid-template-columns: 1fr !important; }
      .pw-office-export { width: 100%; margin-top: 4px; min-height: 42px; }
    }
  `;
  document.head.appendChild(style);

  function officeCode() {
    const code = String(localStorage.getItem(OFFICE_LOCAL_KEY) || sessionStorage.getItem(OFFICE_SESSION_KEY) || '').trim();
    if (code && !sessionStorage.getItem(OFFICE_SESSION_KEY)) sessionStorage.setItem(OFFICE_SESSION_KEY, code);
    return code;
  }

  function filenameFromDisposition(value) {
    const m = String(value || '').match(/filename="?([^";]+)"?/i);
    return m ? m[1] : 'Collaudo_PW.zip';
  }

  async function downloadArchive(id, button) {
    const code = officeCode();
    if (!code) {
      alert('Codice Ufficio non disponibile. Usa “Cambia accesso” e rientra.');
      return;
    }

    const old = button.textContent;
    button.disabled = true;
    button.textContent = 'ESPORTO…';
    try {
      const res = await fetch(EXPORT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'export', office_code: code, id })
      });
      if (!res.ok) {
        let data = {};
        try { data = await res.json(); } catch (_) {}
        if (res.status === 401 || data?.error === 'invalid_office_code') {
          alert('Codice Ufficio non valido. Usa “Cambia accesso” e rientra.');
          return;
        }
        throw new Error(data?.error || `export_${res.status}`);
      }

      const blob = await res.blob();
      const name = filenameFromDisposition(res.headers.get('Content-Disposition'));
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch (err) {
      console.error('Esportazione archivio', err);
      alert('Non è stato possibile esportare il collaudo sul PC. Riprova.');
    } finally {
      button.disabled = false;
      button.textContent = old;
    }
  }

  function enhanceRows() {
    document.querySelectorAll('.pw-archive-row').forEach(row => {
      if (row.querySelector('.pw-office-export')) return;
      const open = row.querySelector('.pw-archive-open');
      if (!open) return;

      const commessaText = row.querySelector('.pw-archive-commessa')?.textContent || '';
      const commessa = commessaText.replace(/^\s*Commessa\s*/i, '').trim();

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pw-office-export';
      btn.textContent = 'ESPORTA SUL PC';
      btn.title = 'Scarica il collaudo in PDF sul computer';

      // Recupera l'id già associato alla riga intercettando la chiamata usata da "Apri".
      // Se non è disponibile, usa il bottone Apri una sola volta per ottenere l'item e poi esporta.
      btn.addEventListener('click', async () => {
        const id = row.dataset.archiveId;
        if (id) {
          await downloadArchive(id, btn);
          return;
        }
        alert(`Per la commessa ${commessa || ''}, aggiorna l'archivio una volta e riprova l'esportazione.`);
      });
      open.insertAdjacentElement('afterend', btn);
    });
  }

  // Intercetta le risposte dell'archivio per associare l'id alle righe senza modificare archive.js.
  const originalFetch = window.fetch.bind(window);
  window.fetch = async (...args) => {
    const res = await originalFetch(...args);
    try {
      const url = String(args[0] || '');
      const init = args[1] || {};
      if (url.includes('/collaudo-sync') && String(init?.body || '').includes('archive_list')) {
        const clone = res.clone();
        const data = await clone.json();
        const items = Array.isArray(data?.items) ? data.items : [];
        setTimeout(() => {
          const rows = [...document.querySelectorAll('.pw-archive-row')];
          rows.forEach((row, i) => {
            if (items[i]?.id) row.dataset.archiveId = String(items[i].id);
          });
          enhanceRows();
        }, 0);
      }
    } catch (_) {}
    return res;
  };

  const observer = new MutationObserver(enhanceRows);
  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(enhanceRows, 100);
})();
