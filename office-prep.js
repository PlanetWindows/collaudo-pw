(() => {
  const ROLE_KEY='pw-collaudo-role';
  const OFFICE_LOCAL_KEY='pw-collaudo-office-code';
  const OFFICE_SESSION_KEY='pw-collaudo-office-code-session';
  const API='https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-office-prep';
  const ESCAPE_TYPES=new Set(['pvc_vie_fuga','alu_vie_fuga']);
  if(String(localStorage.getItem(ROLE_KEY)||'')!=='office')return;

  const style=document.createElement('style');
  style.textContent=`
    .pw-office-prep{max-width:980px;margin:26px auto;padding:0 18px 30px;box-sizing:border-box}
    .pw-office-prep-card{background:#fff;border:1px solid #ddd;border-radius:14px;box-shadow:0 8px 28px rgba(0,0,0,.08);padding:22px}
    .pw-office-prep h2{margin:0 0 5px;font-size:22px}.pw-office-prep .sub{color:#666;font-size:13px;margin-bottom:20px;line-height:1.45}
    .pw-office-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.pw-office-field label{display:block;font-size:12px;font-weight:700;margin-bottom:6px}
    .pw-office-field input,.pw-office-field select{width:100%;box-sizing:border-box;border:1px solid #bbb;border-radius:8px;padding:11px 12px;font-size:14px;background:#fff}
    .pw-office-escape-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px}.pw-office-escape-row[hidden]{display:none!important}
    .pw-office-actions{display:flex;gap:9px;align-items:center;flex-wrap:wrap;margin-top:16px}
    .pw-office-actions button,.pw-ddt-actions button{border:0;border-radius:8px;padding:10px 13px;font-weight:700;cursor:pointer}
    .pw-office-save,.pw-ddt-add,.pw-ddt-replace{background:#c7a044;color:#111}.pw-office-load,.pw-ddt-open{background:#111;color:#fff}.pw-ddt-delete{background:#fff1f0;color:#a31818;border:1px solid #dba6a2!important}
    .pw-office-status{font-size:12px;color:#555;min-height:18px;margin-top:8px}.pw-office-status.err{color:#a31818}
    .pw-ddt-box{margin-top:20px;border:1px dashed #bbb;border-radius:10px;padding:15px;background:#fafafa}
    .pw-ddt-title{font-size:13px;font-weight:700;margin-bottom:7px}.pw-ddt-meta{font-size:12px;color:#555;margin-bottom:10px}.pw-ddt-actions{display:flex;gap:8px;flex-wrap:wrap}
    @media(max-width:700px){.pw-office-grid,.pw-office-escape-row{grid-template-columns:1fr}.pw-office-prep{margin-top:14px;padding:0 10px 24px}.pw-office-prep-card{padding:16px}.pw-office-actions button,.pw-ddt-actions button{width:100%;min-height:42px}}
  `;
  document.head.appendChild(style);

  const wrap=document.createElement('div');
  wrap.className='pw-office-prep';
  wrap.innerHTML=`
    <div class="pw-office-prep-card">
      <h2>Preparazione commessa</h2>
      <div class="sub">Seleziona prima il reparto/tipo di collaudo e inserisci il numero di commessa. In Produzione sarà sufficiente cercare il numero di commessa: il sistema aprirà automaticamente la scheda corretta e caricherà i dati Ufficio in sola lettura.</div>
      <div class="pw-office-grid">
        <div class="pw-office-field"><label>TIPO DI COLLAUDO</label><select id="pwOfficeFormType"><option value="">Seleziona tipo</option><option value="pvc">PVC</option><option value="pvc_speciali">PVC - Pezzi speciali</option><option value="pvc_vie_fuga">PVC - Vie di fuga</option><option value="alu">Alluminio</option><option value="alu_speciali">Alluminio - Pezzi speciali</option><option value="alu_vie_fuga">Alluminio - Vie di fuga</option></select></div>
        <div class="pw-office-field"><label>NUMERO DI COMMESSA</label><input id="pwOfficeCommessa" type="text" autocomplete="off" placeholder="Es. 2222"></div>
      </div>
      <div class="pw-office-escape-row" id="pwOfficeEscapeRow" hidden>
        <div class="pw-office-field"><label>TIPOLOGIA</label><select id="pwOfficeTipologia"><option value="">Seleziona tipologia</option><option value="1 anta">1 anta</option><option value="2 ante">2 ante</option></select></div>
        <div class="pw-office-field"><label>MANIGLIONE</label><input id="pwOfficeManiglione" type="text" autocomplete="off" placeholder="Modello / riferimento maniglione"></div>
      </div>
      <div class="pw-office-actions"><button type="button" class="pw-office-load" id="pwOfficeLoad">Carica commessa</button><button type="button" class="pw-office-save" id="pwOfficeSave">Salva dati Ufficio</button></div>
      <div class="pw-office-status" id="pwOfficeStatus"></div>
      <div class="pw-ddt-box"><div class="pw-ddt-title">DDT <span style="font-weight:400">(facoltativo)</span></div><div class="pw-ddt-meta" id="pwDdtMeta">Nessun DDT allegato.</div><div class="pw-ddt-actions" id="pwDdtActions"><button type="button" class="pw-ddt-add" id="pwDdtAdd">+ Allega DDT</button></div><input id="pwDdtFile" type="file" accept="application/pdf,image/*" hidden></div>
    </div>`;
  const topbar=document.querySelector('.topbar');
  if(topbar?.parentNode)topbar.insertAdjacentElement('afterend',wrap);else document.body.prepend(wrap);

  const formTypeEl=wrap.querySelector('#pwOfficeFormType');
  const commessaEl=wrap.querySelector('#pwOfficeCommessa');
  const escapeRow=wrap.querySelector('#pwOfficeEscapeRow');
  const tipologiaEl=wrap.querySelector('#pwOfficeTipologia');
  const maniglioneEl=wrap.querySelector('#pwOfficeManiglione');
  const statusEl=wrap.querySelector('#pwOfficeStatus');
  const ddtMeta=wrap.querySelector('#pwDdtMeta');
  const ddtActions=wrap.querySelector('#pwDdtActions');
  const fileEl=wrap.querySelector('#pwDdtFile');
  let current=null,loadTimer=0;

  function officeCode(){const code=String(localStorage.getItem(OFFICE_LOCAL_KEY)||sessionStorage.getItem(OFFICE_SESSION_KEY)||'').trim();if(code&&!sessionStorage.getItem(OFFICE_SESSION_KEY))sessionStorage.setItem(OFFICE_SESSION_KEY,code);return code}
  function commessa(){return String(commessaEl.value||'').trim().toUpperCase().replace(/\s+/g,' ')}
  function formType(){return String(formTypeEl.value||'').trim()}
  function isEscape(){return ESCAPE_TYPES.has(formType())}
  function setStatus(text,error=false){statusEl.textContent=text||'';statusEl.classList.toggle('err',!!error)}
  function updateConditionalFields(){const yes=isEscape();escapeRow.hidden=!yes;if(!yes){tipologiaEl.value='';maniglioneEl.value=''}}
  async function call(body){const res=await fetch(API,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({...body,access_code:officeCode()})});let data={};try{data=await res.json()}catch(_){ }if(!res.ok)throw new Error(data?.error||`request_${res.status}`);return data}
  function renderDdt(item){
    current=item||null;const name=String(item?.ddt_name||'');
    if(!name){ddtMeta.textContent='Nessun DDT allegato.';ddtActions.innerHTML='<button type="button" class="pw-ddt-add" id="pwDdtAdd">+ Allega DDT</button>';ddtActions.querySelector('#pwDdtAdd').addEventListener('click',()=>fileEl.click());return}
    const size=item?.ddt_size?` · ${(Number(item.ddt_size)/1024/1024).toFixed(2)} MB`:'';ddtMeta.textContent=`${name}${size}`;
    ddtActions.innerHTML='<button type="button" class="pw-ddt-open">Apri DDT</button><button type="button" class="pw-ddt-replace">Sostituisci</button><button type="button" class="pw-ddt-delete">Elimina</button>';
    ddtActions.querySelector('.pw-ddt-open').addEventListener('click',openDdt);ddtActions.querySelector('.pw-ddt-replace').addEventListener('click',()=>fileEl.click());ddtActions.querySelector('.pw-ddt-delete').addEventListener('click',deleteDdt);
  }
  async function load(){
    const c=commessa();if(!c){setStatus('Inserisci il numero di commessa.',true);return}commessaEl.value=c;setStatus('Caricamento…');
    try{const data=await call({action:'get',commessa:c});const item=data?.item||null;if(item?.form_type)formTypeEl.value=item.form_type;updateConditionalFields();tipologiaEl.value=String(item?.tipologia||'');maniglioneEl.value=String(item?.maniglione||'');renderDdt(item);setStatus(item?'Dati Ufficio caricati.':'Commessa nuova: seleziona il tipo di collaudo e compila i dati.')}
    catch(err){console.error(err);setStatus('Non è stato possibile caricare la commessa.',true)}
  }
  async function save(){
    const c=commessa(),t=formType();if(!c){setStatus('Inserisci il numero di commessa.',true);return}if(!t){setStatus('Seleziona il tipo di collaudo.',true);formTypeEl.focus();return}
    if(isEscape()&&!tipologiaEl.value){setStatus('Per le vie di fuga seleziona la tipologia: 1 anta o 2 ante.',true);tipologiaEl.focus();return}
    commessaEl.value=c;setStatus('Salvataggio…');
    try{const data=await call({action:'save',commessa:c,form_type:t,tipologia:isEscape()?tipologiaEl.value:'',maniglione:isEscape()?maniglioneEl.value:''});renderDdt(data?.item||current);setStatus('Dati Ufficio salvati. In Produzione basta cercare questa commessa.')}
    catch(err){console.error(err);setStatus('Non è stato possibile salvare.',true)}
  }
  function fileBase64(file){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(String(r.result||'').split(',')[1]||'');r.onerror=reject;r.readAsDataURL(file)})}
  async function uploadDdt(file){
    const c=commessa(),t=formType();if(!c||!t){setStatus('Inserisci commessa e tipo di collaudo prima di allegare il DDT.',true);fileEl.value='';return}
    if(!(file.type==='application/pdf'||file.type.startsWith('image/'))){setStatus('Il DDT deve essere un PDF o un’immagine.',true);fileEl.value='';return}if(file.size>15*1024*1024){setStatus('Il DDT supera il limite di 15 MB.',true);fileEl.value='';return}
    setStatus('Caricamento DDT…');
    try{const b64=await fileBase64(file);const data=await call({action:'upload_ddt',commessa:c,form_type:t,tipologia:isEscape()?tipologiaEl.value:'',maniglione:isEscape()?maniglioneEl.value:'',file_name:file.name,file_type:file.type,file_base64:b64});renderDdt(data?.item||null);setStatus('DDT allegato correttamente.')}
    catch(err){console.error(err);setStatus('Non è stato possibile allegare il DDT.',true)}finally{fileEl.value=''}
  }
  async function openDdt(){const c=commessa();if(!c)return;const popup=window.open('','_blank');try{const res=await fetch(API,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'download_ddt',access_code:officeCode(),commessa:c,download:false})});if(!res.ok)throw new Error('download_failed');const blob=await res.blob(),url=URL.createObjectURL(blob);if(popup)popup.location.href=url;else window.open(url,'_blank');setTimeout(()=>URL.revokeObjectURL(url),60000)}catch(err){if(popup)popup.close();console.error(err);setStatus('Non è stato possibile aprire il DDT.',true)}}
  async function deleteDdt(){const c=commessa();if(!c||!confirm('Eliminare il DDT allegato a questa commessa?'))return;setStatus('Eliminazione DDT…');try{const data=await call({action:'delete_ddt',commessa:c});renderDdt(data?.item||{form_type:formType(),tipologia:tipologiaEl.value,maniglione:maniglioneEl.value});setStatus('DDT eliminato.')}catch(err){console.error(err);setStatus('Non è stato possibile eliminare il DDT.',true)}}

  formTypeEl.addEventListener('change',updateConditionalFields);
  wrap.querySelector('#pwOfficeLoad').addEventListener('click',load);wrap.querySelector('#pwOfficeSave').addEventListener('click',save);wrap.querySelector('#pwDdtAdd').addEventListener('click',()=>fileEl.click());fileEl.addEventListener('change',()=>{const f=fileEl.files?.[0];if(f)uploadDdt(f)});
  commessaEl.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();load()}});commessaEl.addEventListener('input',()=>{clearTimeout(loadTimer);loadTimer=setTimeout(()=>{if(commessa().length>=2)load()},700)});
  updateConditionalFields();
})();
