(() => {
  const ROLE_KEY='pw-collaudo-role';
  const DEPT_CODE_KEY='pw-collaudo-access-code';
  const OFFICE_LOCAL_KEY='pw-collaudo-office-code';
  const OFFICE_SESSION_KEY='pw-collaudo-office-code-session';
  const SYNC_URL='https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  const EXPORT_URL='https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-export';
  if(String(localStorage.getItem(ROLE_KEY)||'')!=='office')return;

  const style=document.createElement('style');
  style.textContent=`
    .pw-archive-overlay[hidden]{display:none!important}
    body.pw-role-office .sheet,body.pw-role-office .pw-complete-archive-btn{display:none!important}
    body.pw-role-office .topbar>strong,body.pw-role-office .topbar>select,body.pw-role-office .topbar>button:not(.pw-archive-btn):not(.pw-office-top-switch){display:none!important}
    body.pw-role-office .topbar{justify-content:flex-end!important;gap:10px!important;min-height:56px}
    .pw-office-top-switch,.pw-office-switch-access,.pw-office-close-archive{border:0!important;border-radius:8px!important;padding:9px 12px!important;font-weight:700!important;cursor:pointer!important}
    .pw-office-top-switch,.pw-office-switch-access{background:#c7a044!important;color:#111!important}.pw-office-close-archive{background:#fff!important;color:#111!important}
    .pw-office-head-actions{display:flex;gap:8px;align-items:center;justify-content:flex-end;flex-wrap:wrap}
    .pw-office-open-pdf,.pw-office-export{border:1px solid #c7a044!important;background:#c7a044!important;color:#111!important;border-radius:8px!important;padding:9px 12px!important;font-weight:700!important;cursor:pointer!important;white-space:nowrap!important}
    .pw-office-delete{width:40px!important;min-width:40px!important;height:38px!important;border:1px solid #b42318!important;background:#fff!important;color:#b42318!important;border-radius:8px!important;font-size:18px!important;cursor:pointer!important;padding:0!important;display:inline-flex!important;align-items:center!important;justify-content:center!important}
    .pw-archive-row{grid-template-columns:minmax(150px,1fr) minmax(105px,.65fr) minmax(140px,.75fr) auto auto auto!important}
    @media(max-width:700px){.pw-archive-row{grid-template-columns:1fr!important}.pw-office-open-pdf,.pw-office-export,.pw-office-delete{width:100%!important;min-width:100%!important;min-height:42px!important;margin-top:4px}.pw-office-head-actions{width:100%}}
  `;
  document.head.appendChild(style);
  document.body.classList.add('pw-role-office');

  function officeCode(){const code=String(localStorage.getItem(OFFICE_LOCAL_KEY)||sessionStorage.getItem(OFFICE_SESSION_KEY)||'').trim();if(code&&!sessionStorage.getItem(OFFICE_SESSION_KEY))sessionStorage.setItem(OFFICE_SESSION_KEY,code);return code}
  function rowCommessa(row){return String(row.querySelector('.pw-archive-commessa')?.textContent||'').replace(/^\s*Commessa\s*/i,'').trim()}
  function changeAccess(){if(!confirm('Vuoi uscire dall’area Ufficio e inserire un altro codice di accesso?'))return;localStorage.removeItem(ROLE_KEY);localStorage.removeItem(DEPT_CODE_KEY);localStorage.removeItem(OFFICE_LOCAL_KEY);sessionStorage.removeItem(OFFICE_SESSION_KEY);location.replace(location.pathname+'?access='+Date.now())}
  function closeArchive(){document.querySelector('.pw-archive-overlay')?.remove()}
  function installTopSwitch(){const topbar=document.querySelector('.topbar');if(!topbar||topbar.querySelector('.pw-office-top-switch'))return;const b=document.createElement('button');b.type='button';b.className='pw-office-top-switch';b.textContent='Cambia accesso';b.addEventListener('click',changeAccess);topbar.appendChild(b)}
  function installArchiveHeader(){const overlay=document.querySelector('.pw-archive-overlay'),head=overlay?.querySelector('.pw-archive-head');if(!overlay||!head||head.querySelector('.pw-office-head-actions'))return;head.querySelector('.pw-archive-close')?.remove();const actions=document.createElement('div');actions.className='pw-office-head-actions';const close=document.createElement('button');close.type='button';close.className='pw-office-close-archive';close.textContent='Chiudi archivio';close.addEventListener('click',closeArchive);const change=document.createElement('button');change.type='button';change.className='pw-office-switch-access';change.textContent='Cambia accesso';change.addEventListener('click',changeAccess);actions.append(close,change);head.appendChild(actions)}
  function filenameFromDisposition(v,fallback){const m=String(v||'').match(/filename="?([^";]+)"?/i);return m?.[1]||fallback}

  async function resolveId(row){
    if(row.dataset.archiveId)return row.dataset.archiveId;
    const code=officeCode(),commessa=rowCommessa(row);if(!code||!commessa)throw new Error('missing_data');
    const res=await fetch(SYNC_URL,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'archive_list',office_code:code,search:commessa})});
    let data={};try{data=await res.json()}catch(_){ }
    if(!res.ok)throw new Error(data?.error||`list_${res.status}`);
    const wanted=commessa.toUpperCase().replace(/\s+/g,' ');
    const item=(data.items||[]).find(x=>String(x.commessa||'').trim().toUpperCase().replace(/\s+/g,' ')===wanted)||(data.items||[])[0];
    if(!item?.id)throw new Error('archive_not_found');row.dataset.archiveId=String(item.id);return row.dataset.archiveId;
  }

  async function requestFile(id,action){
    const code=officeCode();if(!code)throw new Error('office_code_missing');
    const res=await fetch(`${EXPORT_URL}?v=approved-layout-2&t=${Date.now()}`,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,office_code:code,id,nonce:Date.now()})});
    if(action==='ddt'&&res.status===404)return null;
    if(!res.ok){let data={};try{data=await res.json()}catch(_){ }throw new Error(`${data?.error||'export_error'}${data?.detail?': '+data.detail:''} [${res.status}]`)}
    return {blob:await res.blob(),name:filenameFromDisposition(res.headers.get('Content-Disposition'),action==='ddt'?'DDT.pdf':'Collaudo_PW.pdf'),hasDdt:res.headers.get('X-PW-Has-DDT')==='1'};
  }

  function downloadFiles(files){
    const anchors=[];
    for(const file of files){
      if(!file?.blob)continue;
      const url=URL.createObjectURL(file.blob);
      const a=document.createElement('a');a.href=url;a.download=file.name;document.body.appendChild(a);anchors.push({a,url});
    }
    anchors.forEach(({a})=>a.click());
    anchors.forEach(({a,url})=>{a.remove();setTimeout(()=>URL.revokeObjectURL(url),15000)});
  }

  async function openPdf(row,btn){
    const popup=window.open('','_blank');const old=btn.textContent;btn.disabled=true;btn.textContent='APRO…';
    try{const id=await resolveId(row);const file=await requestFile(id,'pdf');const url=URL.createObjectURL(file.blob);if(popup)popup.location.href=url;else window.open(url,'_blank');setTimeout(()=>URL.revokeObjectURL(url),60000)}
    catch(err){if(popup)popup.close();console.error(err);alert('Errore apertura PDF: '+String(err?.message||err))}
    finally{btn.disabled=false;btn.textContent=old}
  }

  async function exportSeparate(row,btn){
    const old=btn.textContent;btn.disabled=true;btn.textContent='PREPARO I FILE…';
    try{
      const id=await resolveId(row);
      const pdf=await requestFile(id,'pdf');
      const ddt=pdf.hasDdt?await requestFile(id,'ddt'):null;
      downloadFiles(ddt?[pdf,ddt]:[pdf]);
      btn.textContent=ddt?'PDF + DDT SCARICATI ✓':'PDF SCARICATO ✓';
      setTimeout(()=>btn.textContent=old,2200);
    }catch(err){console.error('Esportazione',err);alert('Errore esportazione: '+String(err?.message||err));btn.textContent=old}
    finally{btn.disabled=false}
  }

  async function deleteArchive(row,btn){
    const commessa=rowCommessa(row)||'questa commessa';if(!confirm(`Vuoi eliminare definitivamente la commessa ${commessa} dall’archivio collaudi?`))return;btn.disabled=true;
    try{const id=await resolveId(row),code=officeCode();const res=await fetch(SYNC_URL,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'archive_delete',office_code:code,id})});let data={};try{data=await res.json()}catch(_){ }if(!res.ok)throw new Error(data?.error||`delete_${res.status}`);row.remove()}
    catch(err){console.error(err);btn.disabled=false;alert('Non è stato possibile eliminare il collaudo. Riprova.')}
  }

  function enhanceRows(){
    installTopSwitch();installArchiveHeader();
    document.querySelectorAll('.pw-archive-row').forEach(row=>{
      let open=row.querySelector('.pw-archive-open');if(!open)return;
      if(open.dataset.officeApproved!=='1'){const fresh=open.cloneNode(true);open.replaceWith(fresh);open=fresh;open.dataset.officeApproved='1';open.classList.add('pw-office-open-pdf');open.textContent='APRI PDF';open.addEventListener('click',()=>openPdf(row,open))}
      let exp=row.querySelector('.pw-office-export');
      if(!exp){exp=document.createElement('button');exp.type='button';exp.className='pw-office-export';exp.dataset.officeApproved='1';exp.textContent='ESPORTA PDF + DDT';exp.title='Scarica direttamente sul PC il rapportino PDF e il DDT allegato';exp.addEventListener('click',()=>exportSeparate(row,exp));open.insertAdjacentElement('afterend',exp)}
      else if(exp.dataset.officeApproved!=='1'){const fresh=exp.cloneNode(true);exp.replaceWith(fresh);exp=fresh;exp.dataset.officeApproved='1';exp.textContent='ESPORTA PDF + DDT';exp.addEventListener('click',()=>exportSeparate(row,exp))}
      if(!row.querySelector('.pw-office-delete')){const del=document.createElement('button');del.type='button';del.className='pw-office-delete';del.textContent='🗑';del.title='Elimina questa commessa dall’archivio';del.addEventListener('click',()=>deleteArchive(row,del));exp.insertAdjacentElement('afterend',del)}
    })
  }

  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeArchive()});
  const observer=new MutationObserver(enhanceRows);observer.observe(document.body,{childList:true,subtree:true});
  enhanceRows();installTopSwitch();setInterval(enhanceRows,500);
})();
