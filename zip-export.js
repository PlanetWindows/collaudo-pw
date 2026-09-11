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

  function makeZip(files) {
    const enc = new TextEncoder();
    const localParts = [];
    const centralParts = [];
    let offset = 0;

    const now = new Date();
    const year = Math.max(1980, now.getFullYear());
    const dosTime = ((now.getHours() & 31) << 11) | ((now.getMinutes() & 63) << 5) | ((Math.floor(now.getSeconds() / 2)) & 31);
    const dosDate = (((year - 1980) & 127) << 9) | (((now.getMonth() + 1) & 15) << 5) | (now.getDate() & 31);

    for (const file of files) {
      const name = enc.encode(file.name);
      const data = file.data instanceof Uint8Array ? file.data : enc.encode(String(file.data ?? ''));
      const crc = crc32(data);

      const localHeader = new Uint8Array(30 + name.length);
      const localView = new DataView(localHeader.buffer);
      localView.setUint32(0, 0x04034b50, true);
      localView.setUint16(4, 20, true);
      localView.setUint16(6, 0x0800, true);
      localView.setUint16(8, 0, true);
      localView.setUint16(10, dosTime, true);
      localView.setUint16(12, dosDate, true);
      localView.setUint32(14, crc, true);
      localView.setUint32(18, data.length, true);
      localView.setUint32(22, data.length, true);
      localView.setUint16(26, name.length, true);
      localView.setUint16(28, 0, true);
      localHeader.set(name, 30);
      localParts.push(localHeader, data);

      const centralHeader = new Uint8Array(46 + name.length);
      const centralView = new DataView(centralHeader.buffer);
      centralView.setUint32(0, 0x02014b50, true);
      centralView.setUint16(4, 20, true);
      centralView.setUint16(6, 20, true);
      centralView.setUint16(8, 0x0800, true);
      centralView.setUint16(10, 0, true);
      centralView.setUint16(12, dosTime, true);
      centralView.setUint16(14, dosDate, true);
      centralView.setUint32(16, crc, true);
      centralView.setUint32(20, data.length, true);
      centralView.setUint32(24, data.length, true);
      centralView.setUint16(28, name.length, true);
      centralView.setUint16(30, 0, true);
      centralView.setUint16(32, 0, true);
      centralView.setUint16(34, 0, true);
      centralView.setUint16(36, 0, true);
      centralView.setUint32(38, 0, true);
      centralView.setUint32(42, offset, true);
      centralHeader.set(name, 46);
      centralParts.push(centralHeader);

      offset += localHeader.length + data.length;
    }

    const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
    const end = new Uint8Array(22);
    const endView = new DataView(end.buffer);
    endView.setUint32(0, 0x06054b50, true);
    endView.setUint16(4, 0, true);
    endView.setUint16(6, 0, true);
    endView.setUint16(8, files.length, true);
    endView.setUint16(10, files.length, true);
    endView.setUint32(12, centralSize, true);
    endView.setUint32(16, offset, true);
    endView.setUint16(20, 0, true);

    return new Blob([...localParts, ...centralParts, end], { type: 'application/zip' });
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
