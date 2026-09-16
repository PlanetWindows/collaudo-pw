(() => {
  const ROLE_KEY = 'pw-collaudo-role';
  const DEPT_CODE_KEY = 'pw-collaudo-access-code';
  const OFFICE_LOCAL_KEY = 'pw-collaudo-office-code';
  const OFFICE_SESSION_KEY = 'pw-collaudo-office-code-session';
  const SYNC_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  const EXPORT_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-export';
  const PDF_VERSION = '20260916-NEW-LAYOUT';

  if (String(localStorage.getItem(ROLE_KEY) || '') !== 'office') return;

  let openedOnce = false;

  const style = document.createElement('style');
  style.textContent = `
    .pw-archive-overlay[hidden]{display:none!important}
    body.pw-role-office .sheet,
    body.pw-role-office .pw-complete-archive-btn{display:none!important}
    body.pw-role-office .topbar>strong,
    body.pw-role-office .topbar>select,
    body.pw-role-office .topbar>button:not(.pw-archive-btn):not(.pw-office-top-switch){display:none!important}
    body.pw-role-office .topbar{justify-content:flex-end!important;min-height:56px}
    .pw-office-top-switch,.pw-office-switch-access,.pw-office-close-archive{
      border:0!important;border-radius:8px!important;padding:9px 12px!important;font-weight:700!important;cursor:pointer!important
    }
    .pw-office-top-switch,.pw-office-switch-access{background:#c7a044!important;color:#111!important}
    .pw-office-close-archive{background:#fff!important;color:#111!important}
    .pw-office-head-actions{display:flex;gap:8px;align-items:center;justify-content:flex-end;flex-wrap:wrap}
    .pw-office-open-pdf,.pw-office-export{
      border:1px solid #c7a044!important;background:#c7a044!important;color:#111!important;border-radius:8px!important;padding:9px 12px!important;font-weight:700!important;cursor:pointer!important;white-space:nowrap!important
    }
    .pw-office-delete{
      width:40px!important;min-width:40px!important;height:38px!important;border:1px solid #b42318!important;background:#fff!important;color:#b42318!important;border-radius:8px!important;font-size:18px!important;cursor:pointer!important;padding:0!important;display:inline-flex!important;align-items:center!important;justify-content:center!important
    }
    .pw-office-delete:hover{background:#fff3f2!important}
    .pw-archive-row{grid-template-columns:minmax(150px,1fr) minmax(105px,.65fr) minmax(140px,.75fr) auto auto auto!important}
    @media(max-width:700px){
      .pw-archive-row{grid-template-columns:1fr!important}
      .pw-office-open-pdf,.pw-office-export,.pw-office-delete{width:100%!important;min-width:100%!important;min-height:42px!important;margin-top:4px}
      .pw-archive-head{align-items:flex-start!important;flex-wrap:wrap!important}
      .pw-office-head-actions{width:100%}
      .pw-office-close-archive,.pw-office-switch-access{flex:1 1 auto}
    }
  `;
  document.head.appendChild(style);
  document.body.classList.add('pw-role-office');

  function officeCode(){
    const code=String(localStorage.getItem(OFFICE_LOCAL_KEY)||sessionStorage.getItem(OFFICE_SESSION_KEY)||'').trim();
    if(code&&!sessionStorage.getItem(OFFICE_SESSION_KEY)) sessionStorage.setItem(OFFICE_SESSION_KEY,code);
    return code;
  }

  function changeAccess(){
    if(!confirm('Vuoi uscire dall’area Ufficio e inserire un altro codice di accesso?')) return;
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(DEPT_CODE_KEY);
    localStorage.removeItem(OFFICE_LOCAL_KEY);
    sessionStorage.removeItem(OFFICE_SESSION_KEY);
    const base=location.pathname;
    location.replace(base+'?access='+Date.now());
  }

  function installTopSwitch(){
    const topbar=document.querySelector('.topbar');
    if(!topbar||topbar.querySelector('.pw-office-top-switch')) return;
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='pw-office-top-switch';
    btn.textContent='Cambia accesso';
    btn.addEventListener('click',changeAccess);
    topbar.appendChild(btn);
  }

  function closeArchive(){
    const overlay=document.querySelector('.pw-archive-overlay');
    if(overlay) overlay.remove();
  }

  function installArchiveHeader(){
    const overlay=document.querySelector('.pw-archive-overlay');
    const head=overlay?.querySelector('.pw-archive-head');
    if(!overlay||!head) return;
    if(head.querySelector('.pw-office-head-actions')) return;

    const oldClose=head.querySelector('.pw-archive-close');
    if(oldClose) oldClose.remove();

    const actions=document.createElement('div');
    actions.className='pw-office-head-actions';

    const close=document.createElement('button');
    close.type='button';
    close.className='pw-office-close-archive';
    close.textContent='Chiudi archivio';
    close.addEventListener('click',closeArchive);

    const change=document.createElement('button');
    change.type='button';
    change.className='pw-office-switch-access';
    change.textContent='Cambia accesso';
    change.addEventListener('click',changeAccess);

    actions.append(close,change);
    head.appendChild(actions);
  }

  function rowCommessa(row){
    const text=row.querySelector('.pw-archive-commessa')?.textContent||'';
    return text.replace(/^\s*Commessa\s*/i,'').trim();
  }

  async function resolveId(row){
    if(row.dataset.archiveId) return row.dataset.archiveId;
    const code=officeCode();
    const commessa=rowCommessa(row);
    if(!code||!commessa) throw new Error('missing_data');

    const res=await fetch(SYNC_URL,{
      method:'POST',
      cache:'no-store',
      headers:{'Content-Type':'application/json','Cache-Control':'no-cache'},
      body:JSON.stringify({action:'archive_list',office_code:code,search:commessa})
    });
    let data={}; try{data=await res.json()}catch(_){ }
    if(!res.ok) throw new Error(data?.error||`list_${res.status}`);
    const wanted=commessa.toUpperCase().replace(/\s+/g,' ');
    const item=(data.items||[]).find(x=>String(x.commessa||'').trim().toUpperCase().replace(/\s+/g,' ')===wanted)||(data.items||[])[0];
    if(!item?.id) throw new Error('archive_not_found');
    row.dataset.archiveId=String(item.id);
    return row.dataset.archiveId;
  }

  async function getPdf(id){
    const code=officeCode();
    if(!code) throw new Error('office_code_missing');
    const url=`${EXPORT_URL}?v=${encodeURIComponent(PDF_VERSION)}&t=${Date.now()}`;
    const res=await fetch(url,{
      method:'POST',
      cache:'no-store',
      headers:{'Content-Type':'application/json','Cache-Control':'no-cache, no-store, must-revalidate','Pragma':'no-cache'},
      body:JSON.stringify({action:'pdf',office_code:code,id,pdf_version:PDF_VERSION,nonce:Date.now()})
    });
    if(!res.ok){let data={};try{data=await res.json()}catch(_){ } throw new Error(data?.error||`pdf_${res.status}`)}
    return {blob:await res.blob()};
  }

  async function openPdf(row,btn){
    const popup=window.open('','_blank');
    const old=btn.textContent; btn.disabled=true; btn.textContent='APRO…';
    try{
      const id=await resolveId(row);
      const {blob}=await getPdf(id);
      const url=URL.createObjectURL(blob);
      if(popup) popup.location.href=url;
      else {const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener';document.body.appendChild(a);a.click();a.remove()}
      setTimeout(()=>URL.revokeObjectURL(url),60000);
    }catch(err){if(popup)popup.close();console.error(err);alert('Non è stato possibile aprire il PDF. Riprova.')}finally{btn.disabled=false;btn.textContent=old}
  }

  async function exportPdf(row,btn){
    const old=btn.textContent; btn.disabled=true; btn.textContent='ESPORTO…';
    try{
      const id=await resolveId(row);
      const {blob}=await getPdf(id);
      const url=URL.createObjectURL(blob);
      const commessa=(rowCommessa(row)||'PW').replace(/[^a-zA-Z0-9._-]+/g,'_');
      const stamp=new Date().toISOString().replace(/[:.]/g,'-');
      const a=document.createElement('a');
      a.href=url;
      a.download=`Collaudo_${commessa}_AGGIORNATO_${stamp}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(()=>URL.revokeObjectURL(url),4000);
    }catch(err){console.error(err);alert('Non è stato possibile esportare il PDF sul PC. Riprova.')}finally{btn.disabled=false;btn.textContent=old}
  }

  async function deleteArchive(row,btn){
    const commessa=rowCommessa(row)||'questa commessa';
    if(!confirm(`Vuoi eliminare definitivamente la commessa ${commessa} dall’archivio collaudi?`)) return;
    btn.disabled=true;
    try{
      const id=await resolveId(row); const code=officeCode();
      const res=await fetch(SYNC_URL,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'archive_delete',office_code:code,id})});
      let data={};try{data=await res.json()}catch(_){ }
      if(!res.ok) throw new Error(data?.error||`delete_${res.status}`);
      row.remove();
      const list=document.querySelector('.pw-archive-list');
      if(list&&!list.querySelector('.pw-archive-row')) list.innerHTML='<div class="pw-archive-empty">Nessun collaudo archiviato.</div>';
    }catch(err){console.error(err);btn.disabled=false;alert('Non è stato possibile eliminare il collaudo. Riprova.')}
  }

  function enhanceRows(){
    installTopSwitch();
    installArchiveHeader();
    document.querySelectorAll('.pw-archive-row').forEach(row=>{
      let open=row.querySelector('.pw-archive-open');
      if(!open) return;
      if(open.dataset.office20260916!=='1'){
        const fresh=open.cloneNode(true); open.replaceWith(fresh); open=fresh;
        open.dataset.office20260916='1'; open.classList.add('pw-office-open-pdf'); open.textContent='APRI PDF';
        open.addEventListener('click',()=>openPdf(row,open));
      }
      let exp=row.querySelector('.pw-office-export');
      if(!exp){exp=document.createElement('button');exp.type='button';exp.className='pw-office-export';exp.textContent='ESPORTA PDF';exp.addEventListener('click',()=>exportPdf(row,exp));open.insertAdjacentElement('afterend',exp)}
      if(!row.querySelector('.pw-office-delete')){const del=document.createElement('button');del.type='button';del.className='pw-office-delete';del.textContent='🗑';del.title='Elimina questa commessa dall’archivio';del.addEventListener('click',()=>deleteArchive(row,del));exp.insertAdjacentElement('afterend',del)}
    });
  }

  document.addEventListener('keydown',e=>{if(e.key==='Escape') closeArchive()});
  const observer=new MutationObserver(enhanceRows); observer.observe(document.body,{childList:true,subtree:true});
  enhanceRows();

  const timer=setInterval(()=>{
    enhanceRows();
    if(!openedOnce){const btn=document.querySelector('.pw-archive-btn');if(btn){openedOnce=true;btn.textContent='Archivio collaudi';btn.click()}}
  },120);
  setTimeout(()=>clearInterval(timer),5000);
})();
