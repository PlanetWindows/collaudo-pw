(() => {
  const API_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  const DEPT_CODE_KEY = 'pw-collaudo-access-code';
  const OFFICE_CODE_KEY = 'pw-collaudo-office-code-session';

  const style = document.createElement('style');
  style.textContent = `
    .pw-archive-btn,
    .pw-complete-archive-btn {
      cursor: pointer;
    }
    .pw-complete-archive-btn {
      background: #c7a044 !important;
      border-color: #c7a044 !important;
      color: #111 !important;
      font-weight: 700 !important;
    }
    .pw-archive-overlay {
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: rgba(0,0,0,.62);
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 24px;
      box-sizing: border-box;
      overflow: auto;
    }
    .pw-archive-panel {
      width: min(980px, 100%);
      margin: 20px auto;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 18px 50px rgba(0,0,0,.28);
      overflow: hidden;
      font-family: 'Poppins', Arial, sans-serif;
    }
    .pw-archive-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 18px 20px;
      background: #111;
      color: #fff;
    }
    .pw-archive-head h2 {
      margin: 0;
      font-size: 20px;
    }
    .pw-archive-close {
      border: 0;
      background: #fff;
      color: #111;
      border-radius: 8px;
      padding: 8px 12px;
      cursor: pointer;
      font-weight: 600;
    }
    .pw-archive-tools {
      display: grid;
      grid-template-columns: 1fr 240px;
      gap: 10px;
      padding: 16px 20px;
      border-bottom: 1px solid #ddd;
      background: #fafafa;
    }
    .pw-archive-tools input,
    .pw-archive-tools select {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 12px;
      min-height: 42px;
      border: 1px solid #bbb;
      border-radius: 8px;
      font: inherit;
    }
    .pw-archive-list {
      padding: 14px 20px 20px;
      display: grid;
      gap: 10px;
    }
    .pw-archive-empty {
      padding: 24px;
      text-align: center;
      color: #666;
    }
    .pw-archive-row {
      display: grid;
      grid-template-columns: minmax(160px, 1fr) minmax(150px, .8fr) minmax(150px, .8fr) auto;
      align-items: center;
      gap: 12px;
      border: 1px solid #ddd;
      border-radius: 10px;
      padding: 12px 14px;
      background: #fff;
    }
    .pw-archive-commessa {
      font-weight: 700;
      font-size: 15px;
    }
    .pw-archive-type,
    .pw-archive-date {
      font-size: 12px;
      color: #555;
    }
    .pw-archive-open {
      border: 1px solid #c7a044;
      background: #c7a044;
      color: #111;
      border-radius: 8px;
      padding: 9px 12px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
    }
    @media (max-width: 700px) {
      .pw-archive-overlay { padding: 8px; }
      .pw-archive-panel { margin: 8px auto; border-radius: 9px; }
      .pw-archive-tools { grid-template-columns: 1fr; padding: 12px; }
      .pw-archive-list { padding: 10px 12px 14px; }
      .pw-archive-row {
        grid-template-columns: 1fr;
        gap: 5px;
      }
      .pw-archive-open {
        width: 100%;
        margin-top: 6px;
        min-height: 42px;
      }
    }
    @media print {
      .pw-archive-btn,
      .pw-complete-archive-btn,
      .pw-archive-overlay { display: none !important; }
    }
  `;
  document.head.appendChild(style);

  function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({
      '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;'
    })[ch]);
  }

  function getType() {
    return document.getElementById('formType')?.value || '';
  }

  function getCommessa() {
    return String(document.querySelector('[data-field="commessa"]')?.value || '').trim();
  }

  function getDeptCode() {
    let code = String(localStorage.getItem(DEPT_CODE_KEY) || '').trim();
    if (code) return code;
    code = String(prompt('Inserisci il codice reparto:') || '').trim().toUpperCase();
    if (code) localStorage.setItem(DEPT_CODE_KEY, code);
    return code;
  }

  function getOfficeCode(forcePrompt = false) {
    if (!forcePrompt) {
      const saved = String(sessionStorage.getItem(OFFICE_CODE_KEY) || '').trim();
      if (saved) return saved;
    }
    const code = String(prompt('Inserisci il codice Ufficio per accedere all’archivio:') || '').trim().toUpperCase();
    if (code) sessionStorage.setItem(OFFICE_CODE_KEY, code);
    return code;
  }

  async function api(body) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    let json = {};
    try { json = await res.json(); } catch (_) {}
    if (!res.ok) {
      const err = new Error(json.error || `http_${res.status}`);
      err.status = res.status;
      throw err;
    }
    return json;
  }

  function collectPayload() {
    const payload = {
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
        ? img.getAttribute('src')
        : '';
    });

    return payload;
  }

  function makeArchiveSnapshot() {
    const sheet = document.querySelector('.sheet');
    if (!sheet) return '';

    const clone = sheet.cloneNode(true);
    clone.querySelectorAll('.notice,.footer-actions,.hint,.signature-actions,.pw-change-operator,.pw-operator-select,.pw-signature-plus-proxy').forEach(el => el.remove());
    clone.querySelectorAll('input[type="file"],input[type="hidden"]').forEach(el => el.remove());

    clone.querySelectorAll('input').forEach(input => {
      const type = String(input.type || '').toLowerCase();
      if (type === 'checkbox' || type === 'radio') {
        const span = document.createElement('span');
        span.className = 'pw-archive-check';
        span.textContent = input.checked ? '☒' : '☐';
        input.replaceWith(span);
        return;
      }
      const span = document.createElement('span');
      span.className = 'pw-archive-value';
      span.textContent = input.value || '—';
      input.replaceWith(span);
    });

    clone.querySelectorAll('select').forEach(select => {
      const span = document.createElement('span');
      span.className = 'pw-archive-value';
      span.textContent = select.options?.[select.selectedIndex]?.text || select.value || '—';
      select.replaceWith(span);
    });

    clone.querySelectorAll('button').forEach(button => button.remove());
    clone.querySelectorAll('.signature-preview').forEach(preview => {
      const img = preview.querySelector('img[data-signature]');
      if (img && img.getAttribute('src')) {
        img.style.display = 'block';
      } else {
        preview.innerHTML = '';
      }
    });

    return clone.outerHTML;
  }

  function setStatus(message, ms = 2600) {
    const el = document.getElementById('status');
    if (!el) return;
    el.textContent = message;
    if (ms) setTimeout(() => { if (el.textContent === message) el.textContent = ''; }, ms);
  }

  async function completeAndArchive(button) {
    const commessa = getCommessa();
    const formType = getType();
    if (!commessa) {
      alert('Inserisci prima il numero di commessa.');
      return;
    }

    if (!confirm(`Confermi che il collaudo della commessa ${commessa} è completato e pronto per l’archivio?`)) return;

    const code = getDeptCode();
    if (!code) return;

    const oldText = button.textContent;
    button.disabled = true;
    button.textContent = 'Archiviazione…';

    try {
      if (window.PWCollaudoSync?.saveNow) {
        try { await window.PWCollaudoSync.saveNow(); } catch (_) {}
      }

      const payload = collectPayload();
      payload.archive_html = makeArchiveSnapshot();
      payload.archived_at = new Date().toISOString();

      await api({
        action: 'archive_complete',
        code,
        form_type: formType,
        commessa,
        payload
      });

      button.textContent = 'Archiviato ✓';
      setStatus('Collaudo salvato nell’archivio ✓', 3500);
      setTimeout(() => {
        button.disabled = false;
        button.textContent = oldText;
      }, 2500);
    } catch (err) {
      console.error('Archivio collaudo', err);
      if (String(err.message).includes('invalid_code')) {
        localStorage.removeItem(DEPT_CODE_KEY);
        alert('Codice reparto non corretto. Riprova.');
      } else {
        alert('Non è stato possibile archiviare il collaudo. Riprova.');
      }
      button.disabled = false;
      button.textContent = oldText;
    }
  }

  function formatType(type) {
    return ({
      pvc: 'PVC',
      pvc_speciali: 'PVC - Pezzi speciali',
      pvc_vie_fuga: 'PVC - Vie di fuga',
      alu: 'Alluminio',
      alu_vie_fuga: 'Alluminio - Vie di fuga'
    })[type] || type;
  }

  function formatDate(value) {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value || '');
    return new Intl.DateTimeFormat('it-IT', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(d);
  }

  function printCss() {
    return `
      *{box-sizing:border-box}
      body{font-family:Arial,Helvetica,sans-serif;color:#111;margin:0;background:#eee}
      .pw-print-toolbar{position:sticky;top:0;z-index:10;background:#111;color:#fff;padding:12px;display:flex;gap:8px;justify-content:center}
      .pw-print-toolbar button{border:0;border-radius:7px;padding:10px 16px;font-weight:700;cursor:pointer}
      .pw-print-toolbar .main{background:#c7a044;color:#111}
      .sheet{width:210mm;max-width:100%;margin:16px auto;background:#fff;padding:7mm}
      .header-grid{display:grid;grid-template-columns:28mm 1fr 36mm;border:1px solid #111}
      .header-grid>div{padding:6px;border-right:1px solid #111;display:flex;align-items:center;justify-content:center;text-align:center;min-height:52px}
      .header-grid>div:last-child{border-right:0}
      .header-grid .rev{font-size:12px}
      .logo{max-width:90px;max-height:45px;object-fit:contain}
      .title{font-size:18px;font-weight:700}
      .meta{display:grid;grid-template-columns:28mm 1fr 36mm 36mm;border-left:1px solid #111;border-right:1px solid #111;border-bottom:1px solid #111}
      .meta .cell{padding:7px;border-right:1px solid #111;min-height:48px}
      .meta .cell:last-child{border-right:0}
      .meta label,.resultbox label{display:block;font-weight:700;font-size:11px;margin-bottom:3px}
      .pw-archive-value{display:block;min-height:22px;padding:4px 2px;font-size:12px}
      table{width:100%;border-collapse:collapse;margin-top:9px;font-size:10px;table-layout:fixed}
      th,td{border:1px solid #222;padding:5px;vertical-align:top;overflow-wrap:anywhere}
      th:nth-child(1){width:17%} th:nth-child(2){width:48%} th:nth-child(3){width:13%} th:nth-child(4){width:22%}
      .phase{font-weight:700}
      .resultbox{display:grid;gap:5px}
      .inlinechecks{display:flex;gap:7px;align-items:center}
      .choice{display:inline-flex;gap:3px;align-items:center}
      .pw-associated-operator{margin:4px 0}
      .pw-operator-name{font-weight:700;border:1px solid #aaa;padding:4px}
      .signature-preview{width:100%;height:52px;border:1px solid #aaa;display:flex;align-items:center;justify-content:center;overflow:hidden}
      .signature-image{display:block;max-width:100%;max-height:100%;object-fit:contain}
      .extra{margin-top:10px;border:1px solid #222}
      .extra-row{display:grid;grid-template-columns:52mm 1fr;border-bottom:1px solid #222}
      .extra-row:last-child{border-bottom:0}.extra-row>div{padding:6px}.extra-row .lbl{font-weight:700;border-right:1px solid #222}
      @page{size:A4 portrait;margin:7mm}
      @media print{
        body{background:#fff}
        .pw-print-toolbar{display:none!important}
        .sheet{width:100%;margin:0;padding:0}
        tr{break-inside:avoid;page-break-inside:avoid}
      }
    `;
  }

  function openPrintWindow(item) {
    const archivedHtml = item?.payload?.archive_html || '';
    if (!archivedHtml) {
      alert('Questa voce non contiene ancora un’anteprima stampabile.');
      return;
    }

    const w = window.open('', '_blank');
    if (!w) {
      alert('Il browser ha bloccato la finestra di stampa. Consenti i popup per questo sito.');
      return;
    }

    w.document.open();
    w.document.write(`<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Collaudo ${esc(item.commessa)}</title><style>${printCss()}</style></head><body><div class="pw-print-toolbar"><button class="main" onclick="window.print()">Stampa / Salva PDF</button><button onclick="window.close()">Chiudi</button></div>${archivedHtml}</body></html>`);
    w.document.close();
  }

  function ensureArchiveModal() {
    let overlay = document.querySelector('.pw-archive-overlay');
    if (overlay) return overlay;

    overlay = document.createElement('div');
    overlay.className = 'pw-archive-overlay';
    overlay.hidden = true;
    overlay.innerHTML = `
      <div class="pw-archive-panel" role="dialog" aria-modal="true" aria-label="Archivio collaudi">
        <div class="pw-archive-head">
          <h2>Archivio collaudi</h2>
          <button type="button" class="pw-archive-close">Chiudi</button>
        </div>
        <div class="pw-archive-tools">
          <input type="search" class="pw-archive-search" placeholder="Cerca numero commessa…">
          <select class="pw-archive-filter" aria-label="Filtra tipo scheda">
            <option value="">Tutti i tipi</option>
            <option value="pvc">PVC</option>
            <option value="pvc_speciali">PVC - Pezzi speciali</option>
            <option value="pvc_vie_fuga">PVC - Vie di fuga</option>
            <option value="alu">Alluminio</option>
            <option value="alu_vie_fuga">Alluminio - Vie di fuga</option>
          </select>
        </div>
        <div class="pw-archive-list"><div class="pw-archive-empty">Caricamento…</div></div>
      </div>`;
    document.body.appendChild(overlay);

    overlay.querySelector('.pw-archive-close').addEventListener('click', () => { overlay.hidden = true; });
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.hidden = true; });

    let timer;
    const reload = () => {
      clearTimeout(timer);
      timer = setTimeout(() => loadArchiveList(overlay), 250);
    };
    overlay.querySelector('.pw-archive-search').addEventListener('input', reload);
    overlay.querySelector('.pw-archive-filter').addEventListener('change', reload);
    return overlay;
  }

  async function loadArchiveList(overlay, forceOfficePrompt = false) {
    const list = overlay.querySelector('.pw-archive-list');
    list.innerHTML = '<div class="pw-archive-empty">Caricamento…</div>';

    const officeCode = getOfficeCode(forceOfficePrompt);
    if (!officeCode) {
      overlay.hidden = true;
      return;
    }

    const search = overlay.querySelector('.pw-archive-search').value.trim();
    const formType = overlay.querySelector('.pw-archive-filter').value;

    try {
      const data = await api({ action: 'archive_list', office_code: officeCode, search, form_type: formType });
      const items = Array.isArray(data.items) ? data.items : [];
      if (!items.length) {
        list.innerHTML = '<div class="pw-archive-empty">Nessun collaudo archiviato.</div>';
        return;
      }

      list.innerHTML = '';
      items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'pw-archive-row';
        row.innerHTML = `
          <div><div class="pw-archive-commessa">Commessa ${esc(item.commessa)}</div></div>
          <div class="pw-archive-type">${esc(formatType(item.form_type))}</div>
          <div class="pw-archive-date">${esc(formatDate(item.completed_at))}</div>
          <button type="button" class="pw-archive-open">Apri / Esporta PDF</button>`;
        row.querySelector('.pw-archive-open').addEventListener('click', async buttonEvent => {
          const button = buttonEvent.currentTarget;
          const old = button.textContent;
          button.disabled = true;
          button.textContent = 'Apertura…';
          try {
            const full = await api({ action: 'archive_get', office_code: officeCode, id: item.id });
            if (full.found && full.item) openPrintWindow(full.item);
          } catch (err) {
            console.error('Apertura archivio', err);
            alert('Non è stato possibile aprire il collaudo.');
          } finally {
            button.disabled = false;
            button.textContent = old;
          }
        });
        list.appendChild(row);
      });
    } catch (err) {
      console.error('Archivio ufficio', err);
      if (String(err.message).includes('invalid_office_code')) {
        sessionStorage.removeItem(OFFICE_CODE_KEY);
        if (forceOfficePrompt) {
          alert('Codice Ufficio non corretto.');
          overlay.hidden = true;
        } else {
          loadArchiveList(overlay, true);
        }
      } else {
        list.innerHTML = '<div class="pw-archive-empty">Archivio momentaneamente non disponibile.</div>';
      }
    }
  }

  async function openArchive() {
    const overlay = ensureArchiveModal();
    overlay.hidden = false;
    await loadArchiveList(overlay);
  }

  function installButtons() {
    const topbar = document.querySelector('.topbar');
    if (topbar && !topbar.querySelector('.pw-archive-btn')) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pw-archive-btn';
      btn.textContent = 'Archivio ufficio';
      btn.addEventListener('click', openArchive);
      const status = topbar.querySelector('.status');
      if (status) topbar.insertBefore(btn, status);
      else topbar.appendChild(btn);
    }

    const footer = document.querySelector('.footer-actions');
    if (footer && !footer.querySelector('.pw-complete-archive-btn')) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pw-complete-archive-btn';
      btn.textContent = '✓ Completa e archivia';
      btn.addEventListener('click', () => completeAndArchive(btn));
      footer.appendChild(btn);
    }
  }

  const observer = new MutationObserver(installButtons);
  observer.observe(document.body, { childList: true, subtree: true });
  installButtons();
  setTimeout(installButtons, 0);
})();
