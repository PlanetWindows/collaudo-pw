(() => {
  const TARGET_TYPES = new Set(['pvc_vie_fuga', 'alu_vie_fuga']);
  const FIELD_NAME = 'posizione';

  const style = document.createElement('style');
  style.textContent = `
    .pw-position-wrap{margin-top:7px;padding-top:6px;border-top:1px solid #ddd}
    .pw-position-wrap label{display:block;font-size:11px;font-weight:700;margin-bottom:3px}
    .pw-position-wrap input{width:100%;box-sizing:border-box;max-width:120px}
    @media print{
      .pw-position-wrap{margin-top:1mm;padding-top:1mm;border-top:.2mm solid #aaa}
      .pw-position-wrap input{max-width:28mm!important}
    }
  `;
  document.head.appendChild(style);

  function currentType(){
    return String(document.getElementById('formType')?.value || '');
  }

  function savedPosition(type){
    try {
      const raw = localStorage.getItem(`pw-collaudo-${type}`);
      if (!raw) return '';
      const data = JSON.parse(raw);
      return String(data?.fields?.[FIELD_NAME] || '').trim();
    } catch (_) {
      return '';
    }
  }

  function savePosition(input){
    input.dispatchEvent(new Event('input', {bubbles:true}));
    if (typeof autoSave === 'function') autoSave();
    if (window.PWCollaudoSync?.queueSave) window.PWCollaudoSync.queueSave(100);
  }

  function install(){
    const type = currentType();
    const existing = document.querySelector('.pw-position-wrap');

    if (!TARGET_TYPES.has(type)) {
      if (existing) existing.remove();
      return;
    }

    const commessa = document.querySelector('input[data-field="commessa"]');
    if (!commessa) return;
    const cell = commessa.closest('.cell') || commessa.parentElement;
    if (!cell) return;

    if (existing && existing.closest('.cell') === cell) return;
    if (existing) existing.remove();

    const wrap = document.createElement('div');
    wrap.className = 'pw-position-wrap';
    wrap.innerHTML = `
      <label for="pw-position-input">POS.</label>
      <input id="pw-position-input" type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="off" data-field="${FIELD_NAME}" placeholder="N°">
    `;

    const input = wrap.querySelector('input');
    input.value = savedPosition(type);
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^0-9]/g, '');
      savePosition(input);
    });

    cell.appendChild(wrap);

    if (commessa.value && window.PWCollaudoSync?.reload) {
      setTimeout(() => window.PWCollaudoSync.reload(), 80);
    }
  }

  document.getElementById('formType')?.addEventListener('change', () => setTimeout(install, 20));
  const observer = new MutationObserver(() => install());
  observer.observe(document.body, {childList:true, subtree:true});
  install();
  setTimeout(install, 0);
})();