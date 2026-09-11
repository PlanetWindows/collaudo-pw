(() => {
  const API_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  const OFFICE_LOCAL_KEY = 'pw-collaudo-office-code';
  const OFFICE_SESSION_KEY = 'pw-collaudo-office-code-session';

  const style = document.createElement('style');
  style.textContent = `
    .pw-archive-actions{display:flex;gap:7px;align-items:center;justify-content:flex-end;flex-wrap:wrap}
    .pw-archive-zip{border:1px solid #111;background:#111;color:#fff;border-radius:8px;padding:9px 12px;font-weight:700;cursor:pointer;white-space:nowrap}
    @media(max-width:700px){.pw-archive-actions{display:grid;grid-template-columns:1fr;gap:6px}.pw-archive-zip{width:100%;min-height:42px}}
  `;
  document.head.appendChild(style);

  function getOfficeCode() {
    return String(localStorage.getItem(OFFICE_LOCAL_KEY) || sessionStorage.getItem(OFFICE_SESSION_KEY) || '').trim();
  }

  async function apiJson(body) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    let json = {};
    try { json = await res.json(); } catch (_) {}
    if (!res.ok) throw new Error(json.error || `http_${res.status}`);
    return json;
  }

  function typeFromLabel(label) {
    const value = String(label || '').trim().toLowerCase();
    if (value === 'pvc') return 'pvc';
    if (value.includes('pezzi speciali')) return 'pvc_speciali';
    if (value.includes('pvc') && value.includes('vie di fuga')) return 'pvc_vie_fuga';
    if (value === 'alluminio') return 'alu';
    if (value.includes('alluminio') && value.includes('vie di fuga')) return 'alu_vie_fuga';
    return '';
  }

  function safeName(value) {
    return String(value || 'collaudo')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9._-]+/g, '_')
      .replace(/^_+|_+$/g, '') || 'collaudo';
  }

  async function exportZip(row, button) {
    const officeCode = getOfficeCode();
    if (!officeCode) {
      alert('Apri prima l’Archivio ufficio inserendo il codice Ufficio.');
      return;
    }

    const commessa = String(row.querySelector('.pw-archive-commessa')?.textContent || '').replace(/^Commessa\s+/i, '').trim();
    const formType = typeFromLabel(row.querySelector('.pw-archive-type')?.textContent || '');
    if (!commessa || !formType) {
      alert('Non riesco a identificare questa scheda. Ricarica l’archivio e riprova.');
      return;
    }

    const old = button.textContent;
    button.disabled = true;
    button.textContent = 'Creo ZIP…';

    try {
      const list = await apiJson({ action: 'archive_list', office_code: officeCode, search: commessa, form_type: formType });
      const exact = (Array.isArray(list.items) ? list.items : []).find(x =>
        String(x.commessa || '').trim().toUpperCase() === commessa.toUpperCase() && x.form_type === formType
      );
      if (!exact) throw new Error('not_found');

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'archive_zip', office_code: officeCode, id: exact.id })
      });

      if (!res.ok) {
        let json = {};
        try { json = await res.json(); } catch (_) {}
        throw new Error(json.error || `http_${res.status}`);
      }

      const blob = await res.blob();
      if (!blob || blob.size < 100 || !String(blob.type || '').includes('zip')) throw new Error('invalid_zip_response');

      const base = safeName(`Collaudo_${commessa}`);
      const href = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = href;
      a.download = `${base}.zip`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        URL.revokeObjectURL(href);
        a.remove();
      }, 3000);

      button.textContent = 'ZIP scaricato ✓';
      setTimeout(() => button.textContent = old, 1800);
    } catch (err) {
      console.error('Esporta ZIP archivio', err);
      alert('Non è stato possibile scaricare lo ZIP. Riprova.');
      button.textContent = old;
    } finally {
      button.disabled = false;
    }
  }

  function enhanceRows() {
    document.querySelectorAll('.pw-archive-row').forEach(row => {
      if (row.querySelector('.pw-archive-zip')) return;
      const open = row.querySelector('.pw-archive-open');
      if (!open) return;
      open.textContent = 'Apri / PDF';

      let actions = row.querySelector('.pw-archive-actions');
      if (!actions) {
        actions = document.createElement('div');
        actions.className = 'pw-archive-actions';
        open.parentNode.insertBefore(actions, open);
        actions.appendChild(open);
      }

      const zipButton = document.createElement('button');
      zipButton.type = 'button';
      zipButton.className = 'pw-archive-zip';
      zipButton.textContent = 'Esporta ZIP';
      zipButton.addEventListener('click', () => exportZip(row, zipButton));
      actions.appendChild(zipButton);
    });
  }

  const observer = new MutationObserver(enhanceRows);
  observer.observe(document.body, { childList: true, subtree: true });
  enhanceRows();
  setInterval(enhanceRows, 700);
})();
