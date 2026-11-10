(() => {
  const mobileStyle = document.createElement('link');
  mobileStyle.rel = 'stylesheet';
  mobileStyle.href = 'mobile.css?v=2';
  document.head.appendChild(mobileStyle);

  const archiveScript = document.createElement('script');
  archiveScript.src = 'archive.js?v=4';
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
  aluExtensionScript.src = 'alu-extension.js?v=3';
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
  officePrepProductionScript.src = 'production-office-prep.js?v=5';
  officePrepProductionScript.async = false;
  document.head.appendChild(officePrepProductionScript);


  // Aggiorna soltanto il vecchio operatore inserito automaticamente nelle bozze vuote.
  // Le schede con dati compilati e le selezioni manuali successive rimangono invariate.
  var DEFAULT_MIGRATION_KEY = 'pw-collaudo-default-angelo-20261110-v2';

  function migrateBlankApolloDefault() {
    var formType = document.getElementById('formType');
    if (!formType || formType.value !== 'pvc') return;
    if (localStorage.getItem(DEFAULT_MIGRATION_KEY) === '1') return;
    var rows = document.querySelectorAll('#formArea tbody tr');
    var row = rows[3];
    if (!row) return;
    var block = row.querySelector('.pw-associated-operator');
    if (!block) return;
    var hidden = block.querySelector('input[data-field="phase_operator_3"]');
    var nameEl = block.querySelector('.pw-operator-name');
    var select = block.querySelector('.pw-operator-select');
    if (!hidden || !nameEl || !select) return;

    var existing = null;
    try {
      var raw = localStorage.getItem('pw-collaudo-pvc');
      existing = raw ? JSON.parse(raw) : null;
    } catch (err) {}
    var fields = existing && existing.fields ? existing.fields : {};
    var filled = false;
    for (var field in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, field) &&
          !/^phase_operator_/.test(field) &&
          String(fields[field] || '').replace(/^\s+|\s+$/g, '') !== '') {
        filled = true;
        break;
      }
    }
    var outcomes = existing && existing.esiti ? existing.esiti : {};
    for (var outcome in outcomes) {
      if (Object.prototype.hasOwnProperty.call(outcomes, outcome) && outcomes[outcome]) {
        filled = true;
        break;
      }
    }
    // Non trattare la firma di Apollo come lavoro compilato: era inserita automaticamente.
    if (!filled && String(hidden.value || '').replace(/^\s+|\s+$/g, '') === 'APOLLO FRANCESCO') {
      hidden.value = 'ANGELO IDONE';
      nameEl.textContent = 'ANGELO IDONE';
      select.value = 'ANGELO IDONE';
      if (typeof setSignatureImage === 'function') setSignatureImage('phase_sign_3', '');
      var event;
      if (document.createEvent) {
        event = document.createEvent('Event');
        event.initEvent('input', true, true);
        hidden.dispatchEvent(event);
      }
      if (typeof autoSave === 'function') autoSave();
    }
    localStorage.setItem(DEFAULT_MIGRATION_KEY, '1');
  }
  setTimeout(migrateBlankApolloDefault, 200);
  var migrationAttempts = 0;
  var migrationTimer = setInterval(function () {
    migrateBlankApolloDefault();
    migrationAttempts++;
    if (localStorage.getItem(DEFAULT_MIGRATION_KEY) === '1' || migrationAttempts > 25) {
      clearInterval(migrationTimer);
    }
  }, 500);
})();
