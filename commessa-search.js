(() => {
  const SYNC_URL='https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  const OFFICE_PREP_URL='https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-office-prep';
  const CODE_KEY='pw-collaudo-access-code';
  const LABELS={pvc:'PVC',pvc_speciali:'PVC - Pezzi speciali',pvc_vie_fuga:'PVC - Vie di fuga',alu:'Alluminio',alu_speciali:'Alluminio - Pezzi speciali',alu_vie_fuga:'Alluminio - Vie di fuga'};

  function setStatus(message,ms=2600){const el=document.getElementById('status');if(!el)return;el.textContent=message;if(ms>0)setTimeout(()=>{if(el.textContent===message)el.textContent=''},ms)}
  function getAccessCode(forcePrompt=false){if(!forcePrompt){const saved=String(localStorage.getItem(CODE_KEY)||'').trim();if(saved)return saved}const code=String(prompt('Inserisci il codice reparto Collaudo PW:')||'').trim().toUpperCase();if(code)localStorage.setItem(CODE_KEY,code);return code}
  function setSignature(key,dataUrl){if(typeof window.setSignatureImage==='function'){window.setSignatureImage(key,dataUrl||'');return}const img=document.querySelector(`img[data-signature="${key}"]`),empty=document.querySelector(`[data-signature-placeholder="${key}"]`);if(!img)return;if(dataUrl){img.src=dataUrl;img.dataset.hasSignature='1';img.style.display='block';if(empty)empty.style.display='none'}else{img.removeAttribute('src');img.dataset.hasSignature='0';img.style.display='none';if(empty)empty.style.display=''}}
  function applyPayload(payload){const fields=payload?.fields||{},esiti=payload?.esiti||{},signatures=payload?.signatures||{};document.querySelectorAll('input[data-field]').forEach(input=>{const key=input.dataset.field;if(Object.prototype.hasOwnProperty.call(fields,key))input.value=fields[key]??''});document.querySelectorAll('input[data-group]').forEach(input=>{input.checked=esiti[input.dataset.group]===input.dataset.value});document.querySelectorAll('img[data-signature]').forEach(img=>setSignature(img.dataset.signature,signatures[img.dataset.signature]||''))}
  async function requestShared(type,commessa,code){const res=await fetch(SYNC_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'load',code,form_type:type,commessa})});let data={};try{data=await res.json()}catch(_){ }return{res,data}}
  async function requestOfficePrep(commessa,code){const res=await fetch(OFFICE_PREP_URL,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'get',access_code:code,commessa})});let data={};try{data=await res.json()}catch(_){ }return{res,data}}
  function ensureTypeOption(type){const select=document.getElementById('formType');if(!select)return null;if(!select.querySelector(`option[value="${type}"]`)){const option=document.createElement('option');option.value=type;option.textContent=LABELS[type]||type;select.appendChild(option)}return select}
  async function switchToType(type,commessa){const select=ensureTypeOption(type);if(!select)return false;if(select.value!==type){select.value=type;select.dispatchEvent(new Event('change',{bubbles:true}));await new Promise(r=>setTimeout(r,140))}const input=document.querySelector('input[data-field="commessa"]');if(!input)return false;input.value=commessa;input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));return true}

  async function searchGenericCommessa(button){
    const firstInput=document.querySelector('input[data-field="commessa"]');
    const commessa=String(firstInput?.value||'').trim().toUpperCase().replace(/\s+/g,' ');
    if(!firstInput)return;
    if(!commessa){alert('Inserisci prima il numero della commessa.');firstInput.focus();return}

    const oldText=button.textContent;button.disabled=true;button.textContent='CERCO…';setStatus('Cerco la commessa preparata dall’Ufficio…',0);
    try{
      let code=getAccessCode(false);if(!code)return;
      let prep=await requestOfficePrep(commessa,code);
      if(prep.res.status===401){localStorage.removeItem(CODE_KEY);code=getAccessCode(true);if(!code)return;prep=await requestOfficePrep(commessa,code)}
      if(!prep.res.ok)throw new Error(prep.data?.error||`office_prep_${prep.res.status}`);
      if(!prep.data?.found||!prep.data?.item?.form_type){setStatus('Commessa non trovata nei dati Ufficio',3500);alert(`La commessa “${commessa}” non risulta ancora preparata dall’Ufficio.`);return}

      const type=String(prep.data.item.form_type||'');
      if(!LABELS[type])throw new Error('invalid_office_form_type');
      const switched=await switchToType(type,commessa);if(!switched)throw new Error('switch_failed');
      setStatus(`Commessa trovata — ${LABELS[type]}`,0);

      const shared=await requestShared(type,commessa,code);
      if(shared.res.ok&&shared.data?.found){const payload=shared.data.payload||{};applyPayload(payload);const currentInput=document.querySelector('input[data-field="commessa"]');if(currentInput)currentInput.value=commessa;localStorage.setItem(`pw-collaudo-${type}`,JSON.stringify(payload));setStatus(`Aperta ${LABELS[type]} — dati Ufficio e bozza caricati`,4500);setTimeout(()=>{if(window.PWCollaudoSync?.reload)window.PWCollaudoSync.reload()},150)}
      else{const currentInput=document.querySelector('input[data-field="commessa"]');if(currentInput){currentInput.value=commessa;currentInput.dispatchEvent(new Event('input',{bubbles:true}));currentInput.dispatchEvent(new Event('change',{bubbles:true}))}setStatus(`Aperta ${LABELS[type]} — dati Ufficio caricati`,4500)}
    }catch(err){console.error('Ricerca generica commessa',err);setStatus('Errore durante la ricerca della commessa',3500);alert('Non sono riuscito a caricare la commessa. Controlla la connessione e riprova.')}
    finally{button.disabled=false;button.textContent=oldText}
  }

  function installSearchButton(){
    const input=document.querySelector('input[data-field="commessa"]');if(!input)return;const cell=input.parentElement;if(!cell||cell.querySelector('.pw-commessa-search-btn'))return;
    cell.classList.add('pw-commessa-search-cell');input.classList.add('pw-commessa-input');
    const button=document.createElement('button');button.type='button';button.className='pw-commessa-search-btn';button.textContent='N° COMMESSA';button.title='Inserisci il numero di commessa e apri automaticamente il reparto corretto';button.addEventListener('click',()=>searchGenericCommessa(button));cell.appendChild(button);
    input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();button.click()}});
  }

  const style=document.createElement('style');style.textContent=`
    .pw-commessa-search-cell{display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;gap:6px!important;align-items:center!important}.pw-commessa-search-cell .pw-commessa-input{min-width:0!important;width:100%!important}.pw-commessa-search-btn{white-space:nowrap;min-height:34px;padding:6px 10px!important;font-size:11px!important;font-weight:700!important;background:#c7a044!important;color:#111!important;border:1px solid #c7a044!important;border-radius:6px!important}@media(max-width:700px){.pw-commessa-search-btn{min-height:38px;padding:7px 9px!important}}@media print{.pw-commessa-search-btn{display:none!important}.pw-commessa-search-cell{display:block!important}}
  `;document.head.appendChild(style);
  installSearchButton();setTimeout(installSearchButton,0);document.getElementById('formType')?.addEventListener('change',()=>setTimeout(installSearchButton,0));const observer=new MutationObserver(installSearchButton);observer.observe(document.body,{childList:true,subtree:true});

  if(!document.querySelector('script[data-pw-draft-chain]')){const chain=document.createElement('script');chain.src='draft-chain.js?v=1';chain.async=false;chain.dataset.pwDraftChain='1';document.head.appendChild(chain)}
})();
