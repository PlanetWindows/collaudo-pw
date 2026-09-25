(() => {
  const ROLE_KEY='pw-collaudo-role';
  const CODE_KEY='pw-collaudo-access-code';
  const API='https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-office-prep';
  const LOTTO_API='https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-office-lotto';
  const LABELS={pvc:'PVC',pvc_speciali:'PVC - Pezzi speciali',pvc_vie_fuga:'PVC - Vie di fuga',alu:'Alluminio',alu_speciali:'Alluminio - Pezzi speciali',alu_vie_fuga:'Alluminio - Vie di fuga'};
  if(String(localStorage.getItem(ROLE_KEY)||'')!=='production')return;

  const style=document.createElement('style');
  style.textContent=`
    .pw-office-readonly{margin:12px 0 16px;border:1px solid #d7c183;border-radius:9px;background:#fffaf0;padding:12px 14px}
    .pw-office-readonly-title{font-weight:700;font-size:13px;margin-bottom:5px}.pw-office-readonly-text{font-size:12px;color:#555;line-height:1.5}
    .pw-office-readonly-row{margin-top:3px}.pw-office-readonly-row:first-child{margin-top:0}
    .pw-office-readonly-ddt{margin-top:9px;display:flex;gap:8px;align-items:center;flex-wrap:wrap}.pw-office-readonly-ddt button{border:0;border-radius:7px;background:#111;color:#fff;padding:8px 11px;font-weight:700;cursor:pointer}
    .pw-office-readonly-ddt .pw-ddt-name{font-size:12px;color:#333;overflow-wrap:anywhere}
    input.pw-office-locked{background:#f1f1f1!important;color:#444!important;cursor:not-allowed!important}
    .pw-office-lock-note{display:block;margin-top:4px;font-size:10px;color:#8b6c1e;font-weight:700}
    @media print{.pw-office-readonly{display:none!important}.pw-office-lock-note{display:none!important}input.pw-office-locked{background:#fff!important;color:#111!important}}
  `;
  document.head.appendChild(style);

  let currentCommessa='',currentItem=null,currentLotto='',timer=0,requestSeq=0;
  function code(){return String(localStorage.getItem(CODE_KEY)||'').trim()}
  function commessa(){return String(document.querySelector('[data-field="commessa"]')?.value||'').trim().toUpperCase().replace(/\s+/g,' ')}
  function currentType(){return String(document.getElementById('formType')?.value||'')}
  function isEscape(){return ['pvc_vie_fuga','alu_vie_fuga'].includes(currentType())}
  async function getPrep(c){const res=await fetch(API,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'get',access_code:code(),commessa:c})});let data={};try{data=await res.json()}catch(_){ }if(!res.ok)throw new Error(data?.error||`prep_${res.status}`);return data?.item||null}
  async function getLotto(c){const res=await fetch(LOTTO_API,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'get',access_code:code(),commessa:c})});let data={};try{data=await res.json()}catch(_){ }if(!res.ok)throw new Error(data?.error||`lotto_${res.status}`);return String(data?.lotto||'')}
  function lockManiglione(){
    if(!isEscape())return;const input=document.querySelector('input[data-field="extra_0"]');if(!input)return;
    const wanted=String(currentItem?.maniglione||'');if(input.value!==wanted){input.value=wanted;input.dispatchEvent(new Event('input',{bubbles:true}))}
    input.readOnly=true;input.setAttribute('aria-readonly','true');input.classList.add('pw-office-locked');input.title='Dato gestito esclusivamente dall’Ufficio';
    const row=input.closest('.extra-row');if(row&&!row.querySelector('.pw-office-lock-note')){const note=document.createElement('span');note.className='pw-office-lock-note';note.textContent='Compilato dall’Ufficio · sola lettura';input.insertAdjacentElement('afterend',note)}
    if(input.dataset.officeLock!=='1'){input.dataset.officeLock='1';['beforeinput','paste','drop'].forEach(ev=>input.addEventListener(ev,e=>e.preventDefault()));input.addEventListener('keydown',e=>{if(!['Tab','Shift'].includes(e.key))e.preventDefault()});input.addEventListener('input',()=>{const v=String(currentItem?.maniglione||'');if(input.value!==v)input.value=v})}
  }
  function ensurePanel(){let panel=document.querySelector('.pw-office-readonly');const meta=document.querySelector('.meta');if(!meta)return null;if(!panel){panel=document.createElement('div');panel.className='pw-office-readonly';meta.insertAdjacentElement('afterend',panel)}return panel}
  function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#039;'})[ch])}
  function render(){
    lockManiglione();const panel=ensurePanel();if(!panel)return;if(!currentCommessa){panel.style.display='none';return}panel.style.display='block';
    const itemType=String(currentItem?.form_type||currentType()),maniglione=String(currentItem?.maniglione||''),tipologia=String(currentItem?.tipologia||''),ddt=String(currentItem?.ddt_name||'');const size=currentItem?.ddt_size?` · ${(Number(currentItem.ddt_size)/1024/1024).toFixed(2)} MB`:'';
    const escape=['pvc_vie_fuga','alu_vie_fuga'].includes(itemType);
    const html=`<div class="pw-office-readonly-title">Dati Ufficio · sola lettura</div><div class="pw-office-readonly-text"><div class="pw-office-readonly-row">Tipo collaudo: <b>${escapeHtml(LABELS[itemType]||itemType||'-')}</b></div><div class="pw-office-readonly-row">Numero lotto: <b>${escapeHtml(currentLotto||'non ancora inserito')}</b></div>${escape?`<div class="pw-office-readonly-row">Tipologia: <b>${escapeHtml(tipologia||'non ancora inserita')}</b></div><div class="pw-office-readonly-row">Maniglione: <b>${escapeHtml(maniglione||'non ancora inserito')}</b></div>`:''}</div><div class="pw-office-readonly-ddt">${ddt?`<span class="pw-ddt-name">DDT: <b>${escapeHtml(ddt)}</b>${size}</span><button type="button" class="pw-open-ddt">Apri DDT</button>`:'<span class="pw-ddt-name">Nessun DDT allegato dall’Ufficio.</span>'}</div>`;
    if(panel.dataset.renderKey!==html){panel.innerHTML=html;panel.dataset.renderKey=html;panel.querySelector('.pw-open-ddt')?.addEventListener('click',openDdt)}
  }
  async function openDdt(){if(!currentCommessa||!currentItem?.ddt_name)return;const popup=window.open('','_blank');try{const res=await fetch(API,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'download_ddt',access_code:code(),commessa:currentCommessa,download:false})});if(!res.ok)throw new Error('ddt_download_failed');const blob=await res.blob(),url=URL.createObjectURL(blob);if(popup)popup.location.href=url;else window.open(url,'_blank');setTimeout(()=>URL.revokeObjectURL(url),60000)}catch(err){if(popup)popup.close();console.error(err);alert('Non è stato possibile aprire il DDT.')}}
  async function load(force=false){const c=commessa();if(!c){currentCommessa='';currentItem=null;currentLotto='';render();return}if(!force&&c===currentCommessa){render();return}currentCommessa=c;const seq=++requestSeq;try{const [item,lotto]=await Promise.all([getPrep(c),getLotto(c)]);if(seq!==requestSeq)return;currentItem=item;currentLotto=lotto;render();if(window.PWCollaudoSync?.queueSave&&isEscape())window.PWCollaudoSync.queueSave(120)}catch(err){if(seq!==requestSeq)return;console.error('Dati Ufficio',err);currentItem=null;currentLotto='';render()}}
  function bind(){const field=document.querySelector('[data-field="commessa"]');if(field&&field.dataset.officePrepWatch!=='1'){field.dataset.officePrepWatch='1';field.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(()=>load(true),350)});field.addEventListener('change',()=>load(true));field.addEventListener('blur',()=>load(true))}lockManiglione()}
  function refresh(){bind();load(false);render()}
  document.getElementById('formType')?.addEventListener('change',()=>{currentItem=null;setTimeout(()=>load(true),100)});
  const observer=new MutationObserver(()=>{bind();lockManiglione()});observer.observe(document.body,{childList:true,subtree:true});refresh();setInterval(refresh,900);
})();
