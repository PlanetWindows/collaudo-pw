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

  async function api(body) {
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

  function crcTable() {
    const table = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      table[n] = c >>> 0;
    }
    return table;
  }
  const CRC_TABLE = crcTable();

  function crc32(bytes) {
    let c = 0xFFFFFFFF;
    for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  }

  function u16(n) { return [n & 255, (n >>> 8) & 255]; }
  function u32(n) { return [n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255]; }

  function makeZip(files) {
    const enc = new TextEncoder();
    const local = [];
    const central = [];
    let offset = 0;

    for (const file of files) {
      const name = enc.encode(file.name);
      const data = file.data instanceof Uint8Array ? file.data : enc.encode(String(file.data ?? ''));
      const crc = crc32(data);
      const localHeader = new Uint8Array([
        0x50,0x4b,0x03,0x04, 20,0, 0,0, 0,0, 0,0,0,0,
        ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(name.length), 0,0,
        ...name
      ]);
      local.push(localHeader, data);

      const centralHeader = new Uint8Array([
        0x50,0x4b,0x01,0x02, 20,0, 20,0, 0,0, 0,0, 0,0,0,0,
        ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(name.length), 0,0, 0,0, 0,0, 0,0,0,0, ...u32(offset),
        ...name
      ]);
      central.push(centralHeader);
      offset += localHeader.length + data.length;
    }

    const centralSize = central.reduce((sum, part) => sum + part.length, 0);
    const end = new Uint8Array([
      0x50,0x4b,0x05,0x06, 0,0, 0,0,
      ...u16(files.length), ...u16(files.length), ...u32(centralSize), ...u32(offset), 0,0
    ]);
    return new Blob([...local, ...central, end], { type: 'application/zip' });
  }

  function archiveHtml(item) {
    const body = item?.payload?.archive_html || '<p>Scheda non disponibile.</p>';
    return `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Collaudo ${String(item.commessa || '')}</title><style>
      *{box-sizing:border-box}body{font-family:Arial,Helvetica,sans-serif;color:#111;margin:0;background:#eee}.sheet{width:210mm;max-width:100%;margin:16px auto;background:#fff;padding:7mm}.header-grid{display:grid;grid-template-columns:28mm 1fr 36mm;border:1px solid #111}.header-grid>div{padding:6px;border-right:1px solid #111;display:flex;align-items:center;justify-content:center;text-align:center;min-height:52px}.header-grid>div:last-child{border-right:0}.logo{max-width:90px;max-height:45px;object-fit:contain}.title{font-size:18px;font-weight:700}.meta{display:grid;grid-template-columns:28mm 1fr 36mm 36mm;border-left:1px solid #111;border-right:1px solid #111;border-bottom:1px solid #111}.meta .cell{padding:7px;border-right:1px solid #111;min-height:48px}.meta .cell:last-child{border-right:0}table{width:100%;border-collapse:collapse;margin-top:9px;font-size:10px;table-layout:fixed}th,td{border:1px solid #222;padding:5px;vertical-align:top;overflow-wrap:anywhere}.phase{font-weight:700}.signature-preview{width:100%;height:52px;border:1px solid #aaa;display:flex;align-items:center;justify-content:center;overflow:hidden}.signature-image{display:block;max-width:100%;max-height:100%;object-fit:contain}@page{size:A4 portrait;margin:7mm}@media print{body{background:#fff}.sheet{width:100%;margin:0;padding:0}tr{break-inside:avoid;page-break-inside:avoid}}
    </style></head><body>${body}</body></html>`;
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
      const list = await api({ action: 'archive_list', office_code: officeCode, search: commessa, form_type: formType });
      const exact = (Array.isArray(list.items) ? list.items : []).find(x => String(x.commessa || '').trim().toUpperCase() === commessa.toUpperCase() && x.form_type === formType);
      if (!exact) throw new Error('not_found');
      const full = await api({ action: 'archive_get', office_code: officeCode, id: exact.id });
      if (!full.found || !full.item) throw new Error('not_found');

      const item = full.item;
      const base = safeName(`Collaudo_${item.commessa}`);
      const zip = makeZip([
        { name: `${base}.html`, data: archiveHtml(item) },
        { name: `${base}_dati.json`, data: JSON.stringify(item, null, 2) },
        { name: 'LEGGIMI.txt', data: 'Archivio Collaudo PW\n\nApri il file HTML per visualizzare la scheda e, se necessario, stamparla o salvarla in PDF.\nIl file JSON contiene una copia tecnica dei dati archiviati.\n' }
      ]);

      const a = document.createElement('a');
      a.href = URL.createObjectURL(zip);
      a.download = `${base}.zip`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
      button.textContent = 'ZIP scaricato ✓';
      setTimeout(() => button.textContent = old, 1800);
    } catch (err) {
      console.error('Esporta ZIP archivio', err);
      alert('Non è stato possibile creare lo ZIP. Riprova.');
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

      const zip = document.createElement('button');
      zip.type = 'button';
      zip.className = 'pw-archive-zip';
      zip.textContent = 'Esporta ZIP';
      zip.addEventListener('click', () => exportZip(row, zip));
      actions.appendChild(zip);
    });
  }

  const observer = new MutationObserver(enhanceRows);
  observer.observe(document.body, { childList: true, subtree: true });
  enhanceRows();
  setInterval(enhanceRows, 700);
})();
