(function (_document$getElementB2) {
  var mobileStyle = document.createElement('link');
  mobileStyle.rel = 'stylesheet';
  mobileStyle.href = 'mobile.css?v=2';
  document.head.appendChild(mobileStyle);
  var archiveScript = document.createElement('script');
  archiveScript.src = 'archive.js?v=1';
  archiveScript.async = false;
  document.head.appendChild(archiveScript);
  var archiveCloseFixScript = document.createElement('script');
  archiveCloseFixScript.src = 'archive-close-fix.js?v=1';
  archiveCloseFixScript.async = false;
  document.head.appendChild(archiveCloseFixScript);
  var accessScript = document.createElement('script');
  accessScript.src = 'access-session.js?v=1';
  accessScript.async = false;
  document.head.appendChild(accessScript);
  var zipScript = document.createElement('script');
  zipScript.src = 'zip-export.js?v=5';
  zipScript.async = false;
  document.head.appendChild(zipScript);
  var aluExtensionScript = document.createElement('script');
  aluExtensionScript.src = 'alu-extension.js?v=2';
  aluExtensionScript.async = false;
  document.head.appendChild(aluExtensionScript);
  var positionScript = document.createElement('script');
  positionScript.src = 'fire-escape-position.js?v=2';
  positionScript.async = false;
  document.head.appendChild(positionScript);
  var apolloSignatureScript = document.createElement('script');
  apolloSignatureScript.src = 'apollo-signature.js?v=2';
  apolloSignatureScript.async = false;
  document.head.appendChild(apolloSignatureScript);
  var officePrepProductionScript = document.createElement('script');
  officePrepProductionScript.src = 'production-office-prep.js?v=5';
  officePrepProductionScript.async = false;
  document.head.appendChild(officePrepProductionScript);
  var TARGET_TYPE = 'pvc';
  var TARGET_INDEX = 3;
  var LEGACY_DEFAULT = 'ANGELO IDONE';
  var NEW_DEFAULT = 'APOLLO FRANCESCO';
  function isTargetForm() {
    var _document$getElementB;
    return (((_document$getElementB = document.getElementById('formType')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value) || '') === TARGET_TYPE;
  }
  function enforceApolloDefault() {
    if (!isTargetForm()) return;
    var rows = document.querySelectorAll('#formArea tbody tr');
    var row = rows[TARGET_INDEX];
    if (!row) return;
    var block = row.querySelector('.pw-associated-operator');
    if (!block) return;
    var hiddenInput = block.querySelector("input[data-field=\"phase_operator_".concat(TARGET_INDEX, "\"]"));
    var nameEl = block.querySelector('.pw-operator-name');
    var select = block.querySelector('.pw-operator-select');
    if (!hiddenInput || !nameEl || !select) return;
    if (!Array.from(select.options).some(function (option) {
      return option.value === NEW_DEFAULT;
    })) {
      var option = document.createElement('option');
      option.value = NEW_DEFAULT;
      option.textContent = NEW_DEFAULT;
      select.appendChild(option);
    }
    var current = String(hiddenInput.value || '').trim();
    if (!current || current === LEGACY_DEFAULT) {
      var _window$PWCollaudoSyn;
      hiddenInput.value = NEW_DEFAULT;
      nameEl.textContent = NEW_DEFAULT;
      select.value = NEW_DEFAULT;
      hiddenInput.dispatchEvent(new Event('input', {
        bubbles: true
      }));
      if (typeof autoSave === 'function') autoSave();
      if ((_window$PWCollaudoSyn = window.PWCollaudoSync) !== null && _window$PWCollaudoSyn !== void 0 && _window$PWCollaudoSyn.queueSave) window.PWCollaudoSync.queueSave(100);
    }
  }
  (_document$getElementB2 = document.getElementById('formType')) === null || _document$getElementB2 === void 0 || _document$getElementB2.addEventListener('change', function () {
    return setTimeout(enforceApolloDefault, 60);
  });
  setTimeout(enforceApolloDefault, 0);
  setInterval(enforceApolloDefault, 500);
})();