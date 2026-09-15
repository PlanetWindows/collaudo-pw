(() => {
  const ROLE_KEY = 'pw-collaudo-role';
  const DEPT_CODE_KEY = 'pw-collaudo-access-code';
  const OFFICE_LOCAL_KEY = 'pw-collaudo-office-code';
  const OFFICE_SESSION_KEY = 'pw-collaudo-office-code-session';
  const SYNC_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  const EXPORT_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-export';

  if (String(localStorage.getItem(ROLE_KEY) || '') !== 'office') return;

  let archiveItems = [];

  const style = document.createElement('style');
  style.textContent = `
    .pw-archive-overlay[hidden] { display: none !important; }

    .pw-office-export,
    .pw-office-open-pdf {
      border: 1px solid #c7a044 !important;
      background: #c7a044 !important;
      color: #111 !important;
      border-radius: 8px !important;
      padding: 9px 12px !important;
      font-weight: 700 !important;
      cursor: pointer !important;
      white-space: nowrap !important;
    }

    .pw-office-delete {
      width: 40px !important;
      min-width: 40px !important;
      height: 38px !important;
      border: 1px solid #b42318 !important;
      background: #fff !important;
      color: #b42318 !important;
      border-radius: 8px !important;
      font-size: 18px !important;
      line-height: 1 !important;
      cursor: pointer !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 0 !important;
    }

    .pw-office-delete:hover {
      background: #fff3f2 !important;
    }

    .pw-archive-row {
      grid-template-columns: minmax(160px, 1fr) minmax(150px, .8fr) minmax(150px, .8fr) auto auto auto !important;
    }

    .pw-office-head-actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
      flex-wrap: wrap;
    }

    .pw-office-close-archive,
    .pw-office-switch-access {
      border: 0 !important;
      border-radius: 8px !important;
      padding: 9px 12px !important;
      font-weight: 700 !important;
      cursor: pointer !important;
      white-space: nowrap !important;
    }

    .pw-office-close-archive {
      background: #fff !important;
      color: #111 !important;
    }

    .pw-office-switch-access {
      background: #c7a044 !important;
      color: #111 !important;
    }

    @media (max-width: 700px) {
      .pw-archive-row { grid-template-columns: 1fr !important; }
      .pw-office-export,
      .pw-office-open-pdf { width: 100%; margin-top: 4px; min-height: 42px; }
      .pw-office-delete { width: 100% !important; min-width: 100% !important; height: 42px !important; margin-top: 4px; }
      .pw-archive-head { align-items: flex-start !important; }
      .pw-office-head-actions { width: 100%; }
      .pw-office-close-archive,
      .pw-office-switch-access { flex: 1 1 auto; }
    }
  `;
  document.head.appendChild(style);

  function officeCode() {
    const code = String(localStorage.getItem(OFFICE_LOCAL_KEY) || sessionStorage.getItem(OFFICE_SESSION_KEY) || '').trim();
    if (code && !sessionStorage.getItem(OFFICE_SESSION_KEY)) sessionStorage.setItem(OFFICE_SESSION_KEY, code);
    return code;
  }

  function normalize(value) {
    return String(value || '').trim().toUpperCase().replace(/\s+/g, ' ');
  }

  function rowCommessa(row) {
    const text = row.querySelector('.pw-archive-commessa')?.textContent || '';
    return text.replace(/^\s*Commessa\s*/i, '').trim();
  }

  function filenameFromDisposition(value) {
    const m = String(value || '').match(/filename="?([^";]+)"?/i);
    return m ? m[1] : 'Collaudo_PW.pdf';
  }

  function changeAccess() {
    if (!confirm('Vuoi uscire dall’area Ufficio e inserire un altro codice di accesso?')) return;
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(DEPT_CODE_KEY);
    localStorage.removeItem(OFFICE_LOCAL_KEY);
    sessionStorage.removeItem(OFFICE_SESSION_KEY);
    location.reload();
  }

  function enhanceArchiveHeader() {
    const overlay = document.querySelector('.pw-archive-overlay');
    const head = overlay?.querySelector('.pw-archive-head');
    if (!overlay || !head) return;

    let actions = head.querySelector('.pw-office-head-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'pw-office-head-actions';

      const oldClose = head.querySelector('.pw-archive-close');
      if (oldClose) {
        oldClose.textContent = 'Chiudi archivio';
        oldClose.classList.add('pw-office-close-archive');
        oldClose.addEventListener('click', () => { overlay.hidden = true; });
        actions.appendChild(oldClose);
      } else {
        const close = document.createElement('button');
        close.type = 'button';
        close.className = 'pw-office-close-archive';
        close.textContent = 'Chiudi archivio';
        close.addEventListener('click', () => { overlay.hidden = true; });
        actions.appendChild(close);
      }

      const change = document.createElement('button');
      change.type = 'button';
      change.className = 'pw-office-switch-access';
      change.textContent = 'Cambia accesso';
      change.addEventListener('click', changeAccess);
      actions.appendChild(change);

      head.appendChild(actions);
    }
  }

  function applyItemsToRows(items) {
    archiveItems = Array.isArray(items) ? items : [];
    const byCommessa = new Map(archiveItems.map(item => [normalize(item?.commessa), item]));
    document.querySelectorAll('.pw-archive-row').forEach(row => {
      const item = byCommessa.get(normalize(rowCommessa(row)));
      if (item?.id) row.dataset.archiveId = String(item.id);
    });
  }

  async function fetchArchiveItems(search = '') {
    const code = officeCode();
    if (!code) throw new Error('office_code_missing');

    const res = await fetch(SYNC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'archive_list', office_code: code, search })
    });

    let data = {};
    try { data = await res.json(); } catch (_) {}
    if (!res.ok) throw new Error(data?.error || `archive_list_${res.status}`);

    const items = Array.isArray(data?.items) ? data.items : [];
    if (!search) applyItemsToRows(items);
    return items;
  }

  async function resolveArchiveId(row) {
    if (row.dataset.archiveId) return row.dataset.archiveId;

    const commessa = rowCommessa(row);
    const wanted = normalize(commessa);

    const cached = archiveItems.find(item => normalize(item?.commessa) === wanted);
    if (cached?.id) {
      row.dataset.archiveId = String(cached.id);
      return row.dataset.archiveId;
    }

    const items = await fetchArchiveItems(commessa);
    const exact = items.find(item => normalize(item?.commessa) === wanted) || items[0];
    if (!exact?.id) throw new Error('archive_id_not_found');

    row.dataset.archiveId = String(exact.id);
    return row.dataset.archiveId;
  }

  async function fetchPdf(id) {
    const code = officeCode();
    if (!code) throw new Error('office_code_missing');

    const res = await fetch(EXPORT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'pdf', office_code: code, id })
    });

    if (!res.ok) {
      let data = {};
      try { data = await res.json(); } catch (_) {}
      if (res.status === 401 || data?.error === 'invalid_office_code') throw new Error('invalid_office_code');
      throw new Error(data?.error || `pdf_${res.status}`);
    }

    return {
      blob: await res.blob(),
      name: filenameFromDisposition(res.headers.get('Content-Disposition'))
    };
  }

  async function openPdf(row, button) {
    const popup = window.open('', '_blank');
    if (popup) {
      try {
        popup.document.title = 'Apertura PDF…';
        popup.document.body.innerHTML = '<div style="font-family:Arial,sans-serif;padding:24px">Apertura PDF…</div>';
      } catch (_) {}
    }

    const old = button.textContent;
    button.disabled = true;
    button.textContent = 'APRO…';

    try {
      const id = await resolveArchiveId(row);
      const { blob } = await fetchPdf(id);
      const url = URL.createObjectURL(blob);

      if (popup) {
        popup.location.href = url;
      } else {
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener';
        document.body.appendChild(a);
        a.click();
        a.remove();
      }

      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (err) {
      if (popup) popup.close();
      console.error('Apertura PDF archivio', err);
      if (String(err?.message || err).includes('invalid_office_code')) {
        alert('Codice Ufficio non valido. Usa “Cambia accesso” e rientra.');
      } else {
        alert('Non è stato possibile aprire il PDF. Riprova.');
      }
    } finally {
      button.disabled = false;
      button.textContent = old;
    }
  }

  async function downloadPdf(row, button) {
    const old = button.textContent;
    button.disabled = true;
    button.textContent = 'ESPORTO…';

    try {
      const id = await resolveArchiveId(row);
      const { blob, name } = await fetchPdf(id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    } catch (err) {
      console.error('Esportazione PDF archivio', err);
      if (String(err?.message || err).includes('invalid_office_code')) {
        alert('Codice Ufficio non valido. Usa “Cambia accesso” e rientra.');
      } else {
        alert('Non è stato possibile esportare il PDF sul PC. Riprova.');
      }
    } finally {
      button.disabled = false;
      button.textContent = old;
    }
  }

  async function deleteArchive(row, button) {
    const commessa = rowCommessa(row) || 'questa commessa';
    if (!confirm(`Vuoi eliminare definitivamente la commessa ${commessa} dall’archivio collaudi?`)) return;

    const old = button.textContent;
    button.disabled = true;
    button.textContent = '…';

    try {
      const id = await resolveArchiveId(row);
      const code = officeCode();
      if (!code) throw new Error('office_code_missing');

      const res = await fetch(SYNC_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'archive_delete', office_code: code, id })
      });

      let data = {};
      try { data = await res.json(); } catch (_) {}
      if (!res.ok) {
        if (res.status === 401 || data?.error === 'invalid_office_code') throw new Error('invalid_office_code');
        throw new Error(data?.error || `archive_delete_${res.status}`);
      }

      archiveItems = archiveItems.filter(item => String(item?.id || '') !== String(id));
      row.remove();

      const list = document.querySelector('.pw-archive-list');
      if (list && !list.querySelector('.pw-archive-row')) {
        list.innerHTML = '<div class="pw-archive-empty">Nessun collaudo archiviato.</div>';
      }
    } catch (err) {
      console.error('Eliminazione archivio', err);
      if (String(err?.message || err).includes('invalid_office_code')) {
        alert('Codice Ufficio non valido. Usa “Cambia accesso” e rientra.');
      } else {
        alert('Non è stato possibile eliminare il collaudo. Riprova.');
      }
      button.disabled = false;
      button.textContent = old;
    }
  }

  function enhanceRows() {
    enhanceArchiveHeader();

    document.querySelectorAll('.pw-archive-row').forEach(row => {
      let open = row.querySelector('.pw-archive-open');
      if (!open) return;

      if (open.dataset.pwOfficePdf !== '1') {
        const replacement = open.cloneNode(true);
        open.replaceWith(replacement);
        open = replacement;
        open.dataset.pwOfficePdf = '1';
        open.classList.add('pw-office-open-pdf');
        open.textContent = 'APRI PDF';
        open.title = 'Apri il PDF archiviato';
        open.addEventListener('click', () => openPdf(row, open));
      }

      let exportBtn = row.querySelector('.pw-office-export');
      if (!exportBtn) {
        exportBtn = document.createElement('button');
        exportBtn.type = 'button';
        exportBtn.className = 'pw-office-export';
        exportBtn.textContent = 'ESPORTA PDF';
        exportBtn.title = 'Scarica direttamente il PDF sul computer';
        exportBtn.addEventListener('click', () => downloadPdf(row, exportBtn));
        open.insertAdjacentElement('afterend', exportBtn);
      }

      if (!row.querySelector('.pw-office-delete')) {
        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'pw-office-delete';
        deleteBtn.textContent = '🗑';
        deleteBtn.title = 'Elimina questa commessa dall’archivio';
        deleteBtn.setAttribute('aria-label', 'Elimina questa commessa dall’archivio');
        deleteBtn.addEventListener('click', () => deleteArchive(row, deleteBtn));
        exportBtn.insertAdjacentElement('afterend', deleteBtn);
      }
    });

    if (archiveItems.length) applyItemsToRows(archiveItems);
  }

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
          applyItemsToRows(items);
          enhanceRows();
        }, 0);
      }
    } catch (_) {}
    return res;
  };

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const overlay = document.querySelector('.pw-archive-overlay:not([hidden])');
    if (overlay) overlay.hidden = true;
  });

  const observer = new MutationObserver(enhanceRows);
  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(enhanceRows, 100);
})();
