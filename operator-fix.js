(() => {
  const mobileStyle = document.createElement('link');
  mobileStyle.rel = 'stylesheet';
  mobileStyle.href = 'mobile.css?v=2';
  document.head.appendChild(mobileStyle);

  const archiveScript = document.createElement('script');
  archiveScript.src = 'archive.js?v=1';
  archiveScript.async = false;
  document.head.appendChild(archiveScript);

  const archiveCloseFixScript = document.createElement('script');
  archiveCloseFixScript.src = 'archive-close-fix.js?v=1';
  archiveCloseFixScript.async = false;
  document.head.appendChild(archiveCloseFixScript);

  const accessScript = document.createElement('script');
  accessScript.src = 'access-session.js?v=1';
  accessScript.async = false;
  document.head.appendChild(accessScript);

  const zipScript = document.createElement('script');
  zipScript.src = 'zip-export.js?v=5';
  zipScript.async = false;
  document.head.appendChild(zipScript);

  const aluExtensionScript = document.createElement('script');
  aluExtensionScript.src = 'alu-extension.js?v=2';
  aluExtensionScript.async = false;
  document.head.appendChild(aluExtensionScript);

  const positionScript = document.createElement('script');
  positionScript.src = 'fire-escape-position.js?v=2';
  positionScript.async = false;
  document.head.appendChild(positionScript);

  const apolloSignatureScript = document.createElement('script');
  apolloSignatureScript.src = 'apollo-signature.js?v=2';
  apolloSignatureScript.async = false;
  document.head.appendChild(apolloSignatureScript);

  const officePrepProductionScript = document.createElement('script');
  officePrepProductionScript.src = 'production-office-prep.js?v=4';
  officePrepProductionScript.async = false;
  document.head.appendChild(officePrepProductionScript);

  const TARGET_TYPE = 'pvc';
  const TARGET_INDEX = 3;
  const LEGACY_DEFAULT = 'ANGELO IDONE';
  const NEW_DEFAULT = 'APOLLO FRANCESCO';

  function isTargetForm() {
    return (document.getElementById('formType')?.value || '') === TARGET_TYPE;
  }

  function enforceApolloDefault() {
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

    if (!Array.from(select.options).some(option => option.value === NEW_DEFAULT)) {
      const option = document.createElement('option');
      option.value = NEW_DEFAULT;
      option.textContent = NEW_DEFAULT;
      select.appendChild(option);
    }

    const current = String(hiddenInput.value || '').trim();
    if (!current || current === LEGACY_DEFAULT) {
      hiddenInput.value = NEW_DEFAULT;
      nameEl.textContent = NEW_DEFAULT;
      select.value = NEW_DEFAULT;
      hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
      if (typeof autoSave === 'function') autoSave();
      if (window.PWCollaudoSync?.queueSave) window.PWCollaudoSync.queueSave(100);
    }
  }

  document.getElementById('formType')?.addEventListener('change', () => setTimeout(enforceApolloDefault, 60));
  setTimeout(enforceApolloDefault, 0);
  setInterval(enforceApolloDefault, 500);
})();
