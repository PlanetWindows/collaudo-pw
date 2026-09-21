(() => {
  const ROLE_KEY = 'pw-collaudo-role';
  if (String(localStorage.getItem(ROLE_KEY) || '') !== 'production') return;

  const ESCAPE_TYPES = new Set(['pvc_vie_fuga', 'alu_vie_fuga']);

  const style = document.createElement('style');
  style.textContent = `
    .pw-nc-position-wrap{display:inline-flex;align-items:center;gap:4px;margin-left:2px;font-size:10px;font-weight:700;white-space:nowrap}
    .pw-nc-position-wrap[hidden]{display:none!important}
    .pw-nc-position-wrap input{width:58px!important;min-width:58px!important;max-width:58px!important;padding:4px 5px!important;border:1px solid #bbb!important;border-radius:5px!important;font-size:11px!important;box-sizing:border-box!important}
    @media print{
      .pw-nc-position-wrap{font-size:7pt!important;gap:1mm!important;margin-left:1mm!important}
      .pw-nc-position-wrap input{width:16mm!important;min-width:16mm!important;max-width:16mm!important;padding:.7mm 1mm!important;border:.2mm solid #aaa!important;border-radius:0!important;font-size:7pt!important}
    }
  `;
  document.head.appendChild(style);

  function currentType() {
    return String(document.getElementById('formType')?.value || '');
  }

  function isEscapeType(type = currentType()) {
    return ESCAPE_TYPES.has(type) || type.includes('vie_fuga');
  }

  function currentCommessa() {
    return String(document.querySelector('input[data-field="commessa"]')?.value || '').trim();
  }

  function savedPosition(type, index) {
    try {
      const raw = localStorage.getItem(`pw-collaudo-${type}`);
      if (!raw) return '';
      const data = JSON.parse(raw);
      const savedCommessa = String(data?.fields?.commessa || '').trim();
      if (savedCommessa && currentCommessa() && savedCommessa !== currentCommessa()) return '';
      return String(data?.fields?.[`nc_position_${index}`] || '').trim();
    } catch (_) {
      return '';
    }
  }

  function persistInput(input) {
    input.dispatchEvent(new Event('input', { bubbles: true }));
    if (typeof autoSave === 'function') autoSave();
    if (window.PWCollaudoSync?.queueSave) window.PWCollaudoSync.queueSave(120);
  }

  function ensureRow(row, index) {
    if (isEscapeType()) {
      row.querySelector('.pw-nc-position-wrap')?.remove();
      return;
    }

    const nc = row.querySelector(`input[data-group="esito_${index}"][data-value="NC"]`);
    if (!nc) return;
    const checks = nc.closest('.inlinechecks');
    if (!checks) return;

    let wrap = checks.querySelector('.pw-nc-position-wrap');
    if (!wrap) {
      wrap = document.createElement('span');
      wrap.className = 'pw-nc-position-wrap';
      wrap.innerHTML = `<span>Pos.</span><input type="text" autocomplete="off" data-field="nc_position_${index}" aria-label="Posizione non conformità ${index + 1}">`;
      checks.appendChild(wrap);
      const input = wrap.querySelector('input');
      input.value = savedPosition(currentType(), index);
      input.addEventListener('input', () => {
        if (typeof autoSave === 'function') autoSave();
      });
    }

    const input = wrap.querySelector('input');
    const active = !!nc.checked;
    wrap.hidden = !active;
    input.required = active;
    input.setAttribute('aria-required', active ? 'true' : 'false');

    if (!active && input.value) {
      input.value = '';
      persistInput(input);
    }
  }

  function install() {
    const rows = document.querySelectorAll('#formArea tbody tr');
    rows.forEach((row, index) => ensureRow(row, index));
  }

  function firstMissingPosition() {
    if (isEscapeType()) return null;
    const rows = document.querySelectorAll('#formArea tbody tr');
    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      const nc = row.querySelector(`input[data-group="esito_${index}"][data-value="NC"]`);
      if (!nc?.checked) continue;
      const input = row.querySelector(`input[data-field="nc_position_${index}"]`);
      if (!input || !String(input.value || '').trim()) return input || nc;
    }
    return null;
  }

  function validateBeforeExplicitSave() {
    install();
    const missing = firstMissingPosition();
    if (!missing) return true;
    alert('Hai selezionato NC. Inserisci la posizione della non conformità prima di salvare il collaudo.');
    const input = missing.matches?.('input[data-field^="nc_position_"]') ? missing : missing.closest('tr')?.querySelector('input[data-field^="nc_position_"]');
    if (input) {
      input.closest('.pw-nc-position-wrap').hidden = false;
      input.focus();
    }
    return false;
  }

  document.addEventListener('change', e => {
    const input = e.target;
    if (!(input instanceof HTMLInputElement) || !input.matches('input[data-group]')) return;
    setTimeout(install, 0);
  }, true);

  document.addEventListener('click', e => {
    const button = e.target.closest?.('button');
    if (!button) return;
    const text = String(button.textContent || '').toLowerCase();
    if (!text.includes('salva bozza') && !text.includes('completa e archivia')) return;
    if (validateBeforeExplicitSave()) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }, true);

  document.getElementById('formType')?.addEventListener('change', () => setTimeout(install, 0));
  const observer = new MutationObserver(() => install());
  observer.observe(document.getElementById('formArea') || document.body, { childList: true, subtree: true });

  install();
  setTimeout(install, 0);
  setInterval(install, 500);
})();
