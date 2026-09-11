(() => {
  const mobileStyle = document.createElement('link');
  mobileStyle.rel = 'stylesheet';
  mobileStyle.href = 'mobile.css?v=2';
  document.head.appendChild(mobileStyle);

  const archiveScript = document.createElement('script');
  archiveScript.src = 'archive.js?v=1';
  archiveScript.async = false;
  document.head.appendChild(archiveScript);

  const accessScript = document.createElement('script');
  accessScript.src = 'access-session.js?v=1';
  accessScript.async = false;
  document.head.appendChild(accessScript);

  const zipScript = document.createElement('script');
  zipScript.src = 'zip-export.js?v=1';
  zipScript.async = false;
  document.head.appendChild(zipScript);

  const TARGET_TYPE = 'pvc';
  const TARGET_INDEX = 3;
  const OLD_OPERATOR = 'APOLLO FRANCESCO';
  const NEW_OPERATOR = 'ANGELO IDONE';

  function isTargetForm() {
    return (document.getElementById('formType')?.value || '') === TARGET_TYPE;
  }

  function enforceIdone() {
    if (!isTargetForm()) return;

    const rows = document.querySelectorAll('#formArea tbody tr');
    const row = rows[TARGET_INDEX];
    if (!row) return;

    const block = row.querySelector('.pw-associated-operator');
    if (!block) return;

    const hiddenInput = block.querySelector(`input[data-field="phase_operator_${TARGET_INDEX}"]`);
    const nameEl = block.querySelector('.pw-operator-name');
    const select = block.querySelector('.pw-operator-select');
    if (!hiddenInput || !nameEl || !select) return;

    const oldOption = Array.from(select.options).find(option => option.value === OLD_OPERATOR);
    if (oldOption) oldOption.remove();

    if (!Array.from(select.options).some(option => option.value === NEW_OPERATOR)) {
      const option = document.createElement('option');
      option.value = NEW_OPERATOR;
      option.textContent = NEW_OPERATOR;
      select.insertBefore(option, select.firstChild);
    }

    if (hiddenInput.value === OLD_OPERATOR || !hiddenInput.value) {
      hiddenInput.value = NEW_OPERATOR;
      nameEl.textContent = NEW_OPERATOR;
      select.value = NEW_OPERATOR;

      if (typeof clearPhaseSignature === 'function') clearPhaseSignature(TARGET_INDEX);
      hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
      if (typeof autoSave === 'function') autoSave();
      if (window.PWCollaudoSync?.queueSave) window.PWCollaudoSync.queueSave(100);
    } else if (nameEl.textContent === OLD_OPERATOR) {
      nameEl.textContent = hiddenInput.value;
      select.value = hiddenInput.value;
    }
  }

  document.getElementById('formType')?.addEventListener('change', () => setTimeout(enforceIdone, 50));
  setTimeout(enforceIdone, 0);
  setInterval(enforceIdone, 500);
})();