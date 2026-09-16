(() => {
  const ROLE_KEY='pw-collaudo-role';
  const OFFICE_LOCAL_KEY='pw-collaudo-office-code';
  const OFFICE_SESSION_KEY='pw-collaudo-office-code-session';
  const SYNC_URL='https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  const EXPORT_URL='https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-export';
  const PREP_URL='https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-office-prep';
  if(String(localStorage.getItem(ROLE_KEY)||'')!=='office')return;

  function officeCode(){return String(localStorage.getItem(OFFICE_LOCAL_KEY)||sessionStorage.getItem(OFFICE_SESSION_KEY)||'').trim()}
  function rowCommessa(row){return String(row.querySelector('.pw-archive-commessa')?.textContent||'').replace(/^\s*Commessa\s*/i,'').trim()}
  function safe(v){return String(v||'PW').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9._-]+/g,'_').replace(/^_+|_+$/g,'')||'PW'}
  async function resolveId(row){
    if(row.dataset.archiveId)return row.dataset.archiveId;
    const code=officeCode(),commessa=rowCommessa(row);
    const res=await fetch(SYNC_URL,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'archive_list',office_code:code,search:commessa})});
    const data=await res.json();if(!res.ok)throw new Error(data?.error||'archive_list_failed');
    const wanted=commessa.toUpperCase().replace(/\s+/g,' ');
    const item=(data.items||[]).find(x=>String(x.commessa||'').trim().toUpperCase().replace(/\s+/g,' ')===wanted)||(data.items||[])[0];
    if(!item?.id)throw new Error('archive_not_found');row.dataset.archiveId=String(item.id);return row.dataset.archiveId;
  }
  function saveBlob(blob,name){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000)}
  async function getReport(id){
    const res=await fetch(`${EXPORT_URL}?v=20260916-DDT&t=${Date.now()}`,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json','Cache-Control':'no-cache, no-store'},body:JSON.stringify({action:'pdf',office_code:officeCode(),id,nonce:Date.now()})});
    if(!res.ok)throw new Error('report_download_failed');return res.blob();
  }
  async function getPrep(commessa){
    const res=await fetch(PREP_URL,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'get',access_code:officeCode(),commessa})});
    let data={};try{data=await res.json()}catch(_){ }
    if(!res.ok)throw new Error(data?.error||'prep_get_failed');return data?.item||null;
  }
  async function getDdt(commessa){
    const res=await fetch(PREP_URL,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'download_ddt',access_code:officeCode(),commessa,download:true})});
    if(!res.ok)throw new Error('ddt_download_failed');return res.blob();
  }
  async function exportBoth(row,btn){
    const old=btn.textContent;btn.disabled=true;btn.textContent='ESPORTO…';
    try{
      const commessa=rowCommessa(row);const id=await resolveId(row);const report=await getReport(id);
      const stamp=new Date().toISOString().replace(/[:.]/g,'-');
      saveBlob(report,`Collaudo_${safe(commessa)}_${stamp}.pdf`);
      const prep=await getPrep(commessa);
      if(prep?.ddt_name){const ddt=await getDdt(commessa);setTimeout(()=>saveBlob(ddt,`DDT_${safe(commessa)}_${safe(prep.ddt_name)}`),250)}
      btn.textContent=prep?.ddt_name?'RAPPORTINO + DDT ✓':'PDF ESPORTATO ✓';
      setTimeout(()=>btn.textContent=old,1700);
    }catch(err){console.error(err);alert('Non è stato possibile esportare rapportino e DDT. Riprova.');btn.textContent=old}
    finally{btn.disabled=false}
  }

  document.addEventListener('click',e=>{
    const btn=e.target?.closest?.('.pw-office-export');if(!btn)return;
    const row=btn.closest('.pw-archive-row');if(!row)return;
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();exportBoth(row,btn);
  },true);

  // La schermata Ufficio apre sulla preparazione commessa; l'archivio resta disponibile dal relativo pulsante.
  setTimeout(()=>document.querySelector('.pw-archive-overlay')?.remove(),900);
})();
