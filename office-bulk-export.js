/* PW Collaudo — esportazioni multiple, solo area Ufficio (10/11/2026) */
(() => {
  'use strict';
  if (localStorage.getItem('pw-collaudo-role') !== 'office') return;

  const SYNC_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  const EXPORT_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-export';
  const PAGE_SIZE = 500;
  let exporting = false;
  let cancelled = false;
  let activeController = null;
  let cachedWeeks = null;
  const encoder = new TextEncoder();
  const types = {
    pvc: 'PVC', pvc_speciali: 'PVC - Pezzi speciali',
    pvc_vie_fuga: 'PVC - Vie di fuga', alu: 'Alluminio',
    alu_speciali: 'Alluminio - Pezzi speciali', alu_vie_fuga: 'Alluminio - Vie di fuga'
  };

  const style = document.createElement('style');
  style.textContent = [
    '.pw-archive-panel{overflow:visible!important}',
    '.pw-office-bulk-wrap{position:relative;z-index:3;display:inline-flex;align-items:center}',
    '.pw-office-bulk-trigger,.pw-office-pdf-direct{border:1px solid #c7a044;background:#c7a044;color:#111;border-radius:8px;padding:9px 12px;font-weight:700;cursor:pointer;white-space:nowrap}',
    '.pw-office-bulk-menu{position:absolute;right:0;top:calc(100% + 8px);z-index:3000;background:#fff;border:1px solid #d7c6a3;border-radius:12px;box-shadow:0 12px 32px rgba(0,0,0,.2);padding:14px;min-width:290px;max-width:min(94vw,390px);color:#161616;text-align:left}',
    '.pw-office-bulk-menu[hidden]{display:none!important}',
    '.pw-office-bulk-menu strong{display:block;margin-bottom:12px;font-size:15px}',
    '.pw-office-bulk-menu button:not(.pw-office-bulk-cancel){display:block;width:100%;margin:7px 0;border:1px solid #d8c9a9;border-radius:7px;background:#f8f5ee;color:#111;text-align:left;padding:10px;font-weight:700;cursor:pointer}',
    '.pw-office-bulk-menu button:disabled{opacity:.5;cursor:not-allowed}',
    '.pw-office-bulk-menu select{width:100%;padding:9px;border:1px solid #c8c8c8;border-radius:7px;background:#fff}',
    '.pw-office-bulk-status{font-size:12px;line-height:1.5;min-height:20px;margin-top:9px}',
    '.pw-office-bulk-cancel{background:#fff;border:1px solid #a33;border-radius:7px;color:#a22;padding:8px 10px;cursor:pointer;margin-top:7px}',
    '.pw-office-bulk-cancel[hidden]{display:none!important}',
    '.pw-office-select-label{display:flex;gap:8px;align-items:center;min-width:0}',
    '.pw-office-select{width:17px;height:17px;flex:none;accent-color:#b28b39;cursor:pointer}',
    '.pw-office-select-all{display:flex;gap:7px;align-items:center;font-size:13px;font-weight:600;margin:0 4px 0 0}',
    '.pw-archive-tools{grid-template-columns:minmax(200px,1fr) minmax(180px,240px) auto!important}',
    '.pw-archive-tools .pw-office-select-all input{width:17px!important;height:17px!important;min-height:0!important;padding:0!important;flex:none}',
    '.pw-archive-row{grid-template-columns:minmax(135px,1fr) minmax(100px,.65fr) minmax(125px,.8fr) auto auto auto auto!important}',
    '.pw-office-pdf-direct{background:#fff!important;padding:9px 11px!important}',
    '@media(max-width:800px){.pw-archive-tools{grid-template-columns:1fr!important}.pw-archive-row{grid-template-columns:1fr!important}.pw-office-pdf-direct{width:100%!important;min-height:42px!important;margin-top:4px}.pw-office-bulk-menu{right:-90px;min-width:275px}.pw-office-select-all{padding:6px}}'
  ].join('\n');
  document.head.appendChild(style);

  function officeCode() {
    return String(localStorage.getItem('pw-collaudo-office-code') ||
      sessionStorage.getItem('pw-collaudo-office-code-session') || '').trim();
  }
  function normalize(value) {
    return String(value || '').trim().toUpperCase().replace(/\s+/g, ' ');
  }
  function safe(value) {
    return String(value || 'collaudo').normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9._-]+/g, '_')
      .replace(/^_+|_+$/g, '').slice(0,90) || 'collaudo';
  }
  function dateLabel(value) {
    const date = new Date(value);
    if (!Number.isFinite(date.getTime())) return String(value || '');
    return new Intl.DateTimeFormat('it-IT', {
      day:'2-digit', month:'2-digit', year:'numeric',
      hour:'2-digit', minute:'2-digit'
    }).format(date);
  }
  function weekKey(value) {
    const date = new Date(value);
    if (!Number.isFinite(date.getTime())) return '';
    const day = new Date(Date.UTC(date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDate()));
    day.setUTCDate(day.getUTCDate() + 4 - (day.getUTCDay() || 7));
    const year = day.getUTCFullYear();
    const first = new Date(Date.UTC(year,0,1));
    const week = Math.ceil((((day - first) / 86400000) + 1) / 7);
    return year + '-W' + String(week).padStart(2,'0');
  }
  function weekLabel(key) {
    return key ? 'Settimana ' + key.slice(-2) + ' · ' + key.slice(0,4) : 'Data non disponibile';
  }
  function rowKey(row) {
    const commessa = String(row.querySelector('.pw-archive-commessa')?.textContent || '').replace(/^\s*Commessa\s*/i,'');
    return [normalize(commessa),
      normalize(row.querySelector('.pw-archive-type')?.textContent),
      normalize(row.querySelector('.pw-archive-date')?.textContent)].join('|');
  }
  function itemKey(item) {
    return [normalize(item.commessa),normalize(types[item.form_type] || item.form_type),
      normalize(dateLabel(item.completed_at))].join('|');
  }
  function rowItemsMatch(rows, items) {
    const byKey = new Map();
    items.forEach(item => {
      const key = itemKey(item);
      if (!byKey.has(key)) byKey.set(key,[]);
      byKey.get(key).push(item);
    });
    return rows.map(row => {
      const matches = byKey.get(rowKey(row)) || [];
      const id = row.dataset.archiveId;
      const index = id ? matches.findIndex(item => String(item.id) === id) : -1;
      return index >= 0 ? matches.splice(index,1)[0] : matches.shift();
    });
  }

  async function fetchPage(search = '', formType = '', offset = 0) {
    const code = officeCode();
    if (!code) throw new Error('Codice Ufficio mancante: esci e accedi nuovamente.');
    const response = await fetch(SYNC_URL, {
      method:'POST', cache:'no-store', headers:{'Content-Type':'application/json'},
      body:JSON.stringify({action:'archive_list',office_code:code,search,form_type:formType,offset,limit:PAGE_SIZE})
    });
    let body = {};
    try { body = await response.json(); } catch (_) {}
    if (!response.ok) throw new Error(body.error || ('Archivio non disponibile (' + response.status + ')'));
    return Array.isArray(body.items) ? body.items : [];
  }

  async function fetchAll() {
    const items = [], seen = new Set();
    for (let offset=0; offset<100000; offset+=PAGE_SIZE) {
      if (cancelled) throw new Error('Esportazione annullata.');
      const batch = await fetchPage('','',offset);
      if (batch.length && seen.has(String(batch[0].id)))
        throw new Error('Il server non supporta ancora tutte le pagine dell’archivio.');
      batch.forEach(item => {
        const id = String(item.id || '');
        if (id && !seen.has(id)) { seen.add(id); items.push(item); }
      });
      if (batch.length < PAGE_SIZE) return items;
    }
    throw new Error('Archivio troppo grande: riprova esportando una settimana.');
  }

  function download(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href=url; a.download=filename; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url),60000);
  }

  async function fetchPdf(id) {
    const controller = new AbortController();
    activeController = controller;
    try {
      const response = await fetch(EXPORT_URL + '?bulk=' + Date.now(), {
        method:'POST',cache:'no-store',signal:controller.signal,
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({action:'pdf',office_code:officeCode(),id,nonce:Date.now()})
      });
      if (!response.ok) {
        let body = {};
        try { body = await response.json(); } catch (_) {}
        throw new Error(body.error || ('PDF non disponibile (' + response.status + ')'));
      }
      const blob = await response.blob();
      if (!blob.size || !(response.headers.get('Content-Type') || '').toLowerCase().includes('pdf'))
        throw new Error('Risposta PDF non valida');
      return blob;
    } finally {
      if (activeController === controller) activeController = null;
    }
  }

  // ZIP standard senza compressione: i PDF sono gia compressi, nessuna libreria esterna.
  const crcTable = (() => {
    const t = [];
    for (let n=0;n<256;n++) {
      let c=n;
      for (let k=0;k<8;k++) c=c&1 ? 0xedb88320^(c>>>1) : c>>>1;
      t[n]=c>>>0;
    }
    return t;
  })();
  function crc32(bytes) {
    let c=0xffffffff;
    for (let i=0;i<bytes.length;i++) c=crcTable[(c^bytes[i])&255]^(c>>>8);
    return (c^0xffffffff)>>>0;
  }
  function dosDateTime(value) {
    const d=new Date(value);
    const date=Number.isFinite(d.getTime()) ? d : new Date();
    const year=Math.max(1980,Math.min(2107,date.getFullYear()));
    return {date:((year-1980)<<9)|((date.getMonth()+1)<<5)|date.getDate(),
      time:(date.getHours()<<11)|(date.getMinutes()<<5)|(date.getSeconds()>>>1)};
  }
  function zipFile(entries) {
    if (entries.length > 65535) throw new Error('Troppi file nello ZIP.');
    const chunks=[], directory=[];
    let offset=0, centralSize=0;
    entries.forEach(entry => {
      const name=encoder.encode(entry.name);
      const data=entry.bytes;
      if (name.length>65535 || data.length>0xffffffff) throw new Error('File troppo grande.');
      const stamp=dosDateTime(entry.date);
      const crc=crc32(data);
      const local=new Uint8Array(30+name.length), l=new DataView(local.buffer);
      l.setUint32(0,0x04034b50,true);l.setUint16(4,20,true);l.setUint16(6,0x800,true);
      l.setUint16(8,0,true);l.setUint16(10,stamp.time,true);l.setUint16(12,stamp.date,true);
      l.setUint32(14,crc,true);l.setUint32(18,data.length,true);l.setUint32(22,data.length,true);
      l.setUint16(26,name.length,true);local.set(name,30);
      const central=new Uint8Array(46+name.length), c=new DataView(central.buffer);
      c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);
      c.setUint16(8,0x800,true);c.setUint16(10,0,true);
      c.setUint16(12,stamp.time,true);c.setUint16(14,stamp.date,true);
      c.setUint32(16,crc,true);c.setUint32(20,data.length,true);c.setUint32(24,data.length,true);
      c.setUint16(28,name.length,true);c.setUint32(42,offset,true);central.set(name,46);
      chunks.push(local,data);directory.push(central);offset+=local.length+data.length;
      centralSize+=central.length;
    });
    if (offset+centralSize>0xffffffff) throw new Error('ZIP troppo grande: esporta per settimana.');
    const end=new Uint8Array(22), e=new DataView(end.buffer);
    e.setUint32(0,0x06054b50,true);
    e.setUint16(8,entries.length,true);e.setUint16(10,entries.length,true);
    e.setUint32(12,centralSize,true);e.setUint32(16,offset,true);
    return new Blob([...chunks,...directory,end],{type:'application/zip'});
  }

  function ui() {
    return document.querySelector('.pw-office-bulk-menu');
  }
  function setStatus(message) {
    const el=ui()?.querySelector('.pw-office-bulk-status');
    if (el) el.textContent=message;
  }
  function selection() {
    return Array.from(document.querySelectorAll('.pw-archive-overlay:not([hidden]) .pw-archive-row'))
      .filter(row => row.querySelector('.pw-office-select')?.checked);
  }
  function updateSelection() {
    const count=selection().length;
    const button=ui()?.querySelector('[data-export="selected"]');
    if (button) {
      button.disabled=exporting || !count;
      button.textContent='Esporta selezionati (' + count + ')';
    }
    const selectAll=document.querySelector('.pw-office-select-all input');
    const checks=Array.from(document.querySelectorAll('.pw-archive-overlay:not([hidden]) .pw-office-select'));
    if (selectAll) {
      selectAll.checked=!!checks.length && checks.every(c=>c.checked);
      selectAll.indeterminate=checks.some(c=>c.checked) && !selectAll.checked;
    }
  }
  function setBusy(value) {
    exporting=value;
    const menu=ui();
    if (!menu) return;
    menu.querySelectorAll('button[data-export]').forEach(b=>b.disabled=value);
    const week=menu.querySelector('select');
    if (week) week.disabled=value;
    const cancel=menu.querySelector('.pw-office-bulk-cancel');
    if (cancel) cancel.hidden=!value;
    updateSelection();
  }
  async function populateWeeks() {
    const select=ui()?.querySelector('.pw-office-week');
    if (!select) return;
    if (!cachedWeeks) {
      select.innerHTML='<option value="">Caricamento settimane…</option>';
      try {
        const items=await fetchAll();
        cachedWeeks=[...new Set(items.map(item=>weekKey(item.completed_at)).filter(Boolean))].sort().reverse();
      } catch (err) {
        select.innerHTML='<option value="">Settimane non disponibili</option>';
        setStatus('Errore caricamento settimane: ' + err.message);
        return;
      }
    }
    if (!document.contains(select)) return;
    select.replaceChildren();
    cachedWeeks.forEach(key => {
      const option=document.createElement('option');option.value=key;option.textContent=weekLabel(key);
      select.appendChild(option);
    });
    if (!cachedWeeks.length) {
      const option=document.createElement('option');option.textContent='Nessuna settimana';option.value='';
      select.appendChild(option);
    }
  }
  async function selectedItems() {
    const rows=selection();
    if (!rows.length) return [];
    const overlay=document.querySelector('.pw-archive-overlay:not([hidden])');
    const search=overlay?.querySelector('.pw-archive-search')?.value.trim() || '';
    const formType=overlay?.querySelector('.pw-archive-filter')?.value || '';
    const items=await fetchPage(search,formType,0);
    const visible=Array.from(overlay.querySelectorAll('.pw-archive-row'));
    const matched=rowItemsMatch(visible,items);
    return rows.map(row=>matched[visible.indexOf(row)]).filter(Boolean);
  }
  async function runBulk(kind) {
    if (exporting) return;
    cancelled=false;
    const week = ui()?.querySelector('.pw-office-week')?.value || '';
    if (kind === 'week' && !week) {
      setStatus('Seleziona prima una settimana.'); return;
    }
    setBusy(true);
    let count=0;
    try {
      setStatus('Caricamento elenco collaudi…');
      let items = kind === 'selected' ? await selectedItems() : await fetchAll();
      if (kind === 'week') items=items.filter(item=>weekKey(item.completed_at)===week);
      if (!items.length) { setStatus('Nessun collaudo da esportare.'); return; }
      if (kind === 'selected' && items.length !== selection().length)
        throw new Error('Selezione modificata: riapri l’archivio e riprova.');
      if (items.length > 50 && !confirm('Preparare un unico ZIP con ' + items.length +
        ' PDF? Il download inizierà al termine.')) {
        setStatus('Esportazione non avviata.'); return;
      }
      const files=[];
      for (const item of items) {
        if (cancelled) throw new Error('Esportazione annullata.');
        count++;
        setStatus('Preparazione PDF ' + count + ' di ' + items.length + ' — Commessa ' + item.commessa);
        let blob;
        try { blob=await fetchPdf(String(item.id)); }
        catch (err) { if (cancelled) throw new Error('Esportazione annullata.');
          throw new Error('Commessa ' + item.commessa + ': ' + err.message); }
        files.push({
          name:'Collaudo_' + safe(item.commessa) + '_' + safe(item.form_type) +
            '_' + safe(String(item.id).slice(0,8)) + '.pdf',
          bytes:new Uint8Array(await blob.arrayBuffer()),
          date:item.completed_at
        });
      }
      if (cancelled) throw new Error('Esportazione annullata.');
      setStatus('Creazione ZIP con ' + files.length + ' PDF…');
      const zip=zipFile(files);
      const mode=kind==='week' ? week : kind==='selected' ? 'Selezionati' : 'Tutti';
      const today=new Date().toISOString().slice(0,10);
      download(zip,'Collaudi_PW_' + safe(mode) + '_' + today + '.zip');
      setStatus('ZIP scaricato: ' + files.length + ' collaudi.');
    } catch (err) {
      console.error('Esportazione multipla PW Collaudo',err);
      setStatus(err.message || 'Errore esportazione.');
      if (!cancelled) alert('Non è stato possibile completare l’esportazione: ' + err.message);
    } finally {
      activeController=null;
      setBusy(false);
    }
  }
  async function runSingle(row,button) {
    if (button.disabled) return;
    button.disabled=true;
    const label=button.textContent;
    button.textContent='PREPARO PDF…';
    try {
      let id=row.dataset.archiveId;
      if (!id) {
        const overlay=row.closest('.pw-archive-overlay');
        const search=overlay?.querySelector('.pw-archive-search')?.value.trim() || '';
        const formType=overlay?.querySelector('.pw-archive-filter')?.value || '';
        const items=await fetchPage(search,formType,0);
        const visible=Array.from(overlay.querySelectorAll('.pw-archive-row'));
        const match=rowItemsMatch(visible,items)[visible.indexOf(row)];
        if (!match?.id) throw new Error('Collaudo non trovato.');
        id=String(match.id);
      }
      const blob=await fetchPdf(id);
      const commessa=String(row.querySelector('.pw-archive-commessa')?.textContent || '').replace(/^\s*Commessa\s*/i,'');
      download(blob,'Collaudo_' + safe(commessa) + '.pdf');
      button.textContent='PDF SCARICATO ✓';
    } catch (err) {
      console.error('PDF singolo',err);
      alert('Errore esportazione PDF: ' + err.message);
    } finally {
      setTimeout(()=>{button.textContent=label;button.disabled=false;},1400);
    }
  }

  function installHeader() {
    const overlay=document.querySelector('.pw-archive-overlay:not([hidden])');
    const actions=overlay?.querySelector('.pw-office-head-actions');
    if (!actions || actions.querySelector('.pw-office-bulk-wrap')) return;
    const wrap=document.createElement('div');wrap.className='pw-office-bulk-wrap';
    const trigger=document.createElement('button');trigger.type='button';
    trigger.className='pw-office-bulk-trigger';trigger.textContent='Esporta ▾';
    const menu=document.createElement('div');menu.className='pw-office-bulk-menu';menu.hidden=true;
    menu.innerHTML=[
      '<strong>Esporta collaudi</strong>',
      '<button type="button" data-export="all">Esporta tutti (ZIP PDF)</button>',
      '<button type="button" data-export="selected">Esporta selezionati (0)</button>',
      '<label for="pw-office-week">Esporta per settimana</label>',
      '<select id="pw-office-week" class="pw-office-week"></select>',
      '<button type="button" data-export="week">Esporta settimana (ZIP PDF)</button>',
      '<div class="pw-office-bulk-status" aria-live="polite"></div>',
      '<button type="button" class="pw-office-bulk-cancel" hidden>Annulla esportazione</button>'
    ].join('');
    trigger.addEventListener('click',async () => {
      if (exporting) return;
      menu.hidden=!menu.hidden;
      if (!menu.hidden) { updateSelection(); await populateWeeks(); }
    });
    menu.querySelectorAll('[data-export]').forEach(b =>
      b.addEventListener('click',()=>runBulk(b.dataset.export)));
    menu.querySelector('.pw-office-bulk-cancel').addEventListener('click',()=>{
      cancelled=true; activeController?.abort();setStatus('Annullamento…');
    });
    wrap.append(trigger,menu);
    actions.insertBefore(wrap,actions.firstChild);
    const tools=overlay.querySelector('.pw-archive-tools');
    if (tools && !tools.querySelector('.pw-office-select-all')) {
      const select=document.createElement('label');select.className='pw-office-select-all';
      select.innerHTML='<input type="checkbox" aria-label="Seleziona tutti i collaudi visibili"> Seleziona tutti i visibili';
      select.querySelector('input').addEventListener('change',e=>{
        overlay.querySelectorAll('.pw-office-select').forEach(c=>c.checked=e.target.checked);
        updateSelection();
      });
      tools.appendChild(select);
    }
    updateSelection();
  }

  function installRows() {
    const overlay=document.querySelector('.pw-archive-overlay:not([hidden])');
    if (!overlay) return;
    overlay.querySelectorAll('.pw-archive-row').forEach(row => {
      if (!row.querySelector('.pw-office-select')) {
        const first=row.firstElementChild;
        if (first) {
          first.classList.add('pw-office-select-label');
          const check=document.createElement('input');check.type='checkbox';
          check.className='pw-office-select';
          check.setAttribute('aria-label','Seleziona ' +
            String(row.querySelector('.pw-archive-commessa')?.textContent || 'collaudo'));
          check.addEventListener('change',updateSelection);
          first.insertBefore(check,first.firstChild);
        }
      }
      if (!row.querySelector('.pw-office-pdf-direct')) {
        const button=document.createElement('button');button.type='button';
        button.className='pw-office-pdf-direct';button.textContent='PDF ↓';
        button.title='Esporta il PDF di questo collaudo';
        button.addEventListener('click',()=>runSingle(row,button));
        const del=row.querySelector('.pw-office-delete');
        if (del) del.insertAdjacentElement('beforebegin',button);
        else row.appendChild(button);
      }
    });
  }

  let lastOverlay=null, lastRows=-1;
  function install() {
    const overlay=document.querySelector('.pw-archive-overlay:not([hidden])');
    if (!overlay) { lastOverlay=null;lastRows=-1;cachedWeeks=null;return; }
    if (overlay !== lastOverlay) { lastOverlay=overlay;lastRows=-1;cachedWeeks=null; }
    installHeader();
    installRows();
    const n=overlay.querySelectorAll('.pw-archive-row').length;
    if (n!==lastRows) lastRows=n;
    updateSelection();
  }
  const observer=new MutationObserver(install);
  observer.observe(document.body,{childList:true,subtree:true});
  install();
  setInterval(install,800);
})();
