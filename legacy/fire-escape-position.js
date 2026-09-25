(function (_document$getElementB2) {
  var TARGET_TYPES = new Set(['pvc_vie_fuga', 'alu_vie_fuga']);
  var FIELD_NAME = 'posizione';
  var style = document.createElement('style');
  style.textContent = "\n    .pw-position-wrap{margin-top:7px;padding-top:6px;border-top:1px solid #ddd}\n    .pw-position-wrap label{display:block;font-size:11px;font-weight:700;margin-bottom:3px}\n    .pw-position-wrap input{width:100%;box-sizing:border-box;max-width:120px}\n    @media print{\n      .pw-position-wrap{margin-top:1mm;padding-top:1mm;border-top:.2mm solid #aaa}\n      .pw-position-wrap input{max-width:28mm!important}\n    }\n  ";
  document.head.appendChild(style);
  function currentType() {
    var _document$getElementB;
    return String(((_document$getElementB = document.getElementById('formType')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value) || '');
  }
  function savedPosition(type) {
    try {
      var _data$fields;
      var raw = localStorage.getItem("pw-collaudo-".concat(type));
      if (!raw) return '';
      var data = JSON.parse(raw);
      return String((data === null || data === void 0 || (_data$fields = data.fields) === null || _data$fields === void 0 ? void 0 : _data$fields[FIELD_NAME]) || '').trim();
    } catch (_) {
      return '';
    }
  }
  function savePosition(input) {
    var _window$PWCollaudoSyn;
    input.dispatchEvent(new Event('input', {
      bubbles: true
    }));
    if (typeof autoSave === 'function') autoSave();
    if ((_window$PWCollaudoSyn = window.PWCollaudoSync) !== null && _window$PWCollaudoSyn !== void 0 && _window$PWCollaudoSyn.queueSave) window.PWCollaudoSync.queueSave(100);
  }
  function install() {
    var _window$PWCollaudoSyn2;
    var type = currentType();
    var existing = document.querySelector('.pw-position-wrap');
    if (!TARGET_TYPES.has(type)) {
      if (existing) existing.remove();
      return;
    }
    var commessa = document.querySelector('input[data-field="commessa"]');
    if (!commessa) return;
    var cell = commessa.closest('.cell') || commessa.parentElement;
    if (!cell) return;
    if (existing && existing.closest('.cell') === cell) return;
    if (existing) existing.remove();
    var wrap = document.createElement('div');
    wrap.className = 'pw-position-wrap';
    wrap.innerHTML = "\n      <label for=\"pw-position-input\">POS.</label>\n      <input id=\"pw-position-input\" type=\"text\" inputmode=\"numeric\" pattern=\"[0-9]*\" autocomplete=\"off\" data-field=\"".concat(FIELD_NAME, "\" placeholder=\"N\xB0\">\n    ");
    var input = wrap.querySelector('input');
    input.value = savedPosition(type);
    input.addEventListener('input', function () {
      input.value = input.value.replace(/[^0-9]/g, '');
      savePosition(input);
    });
    cell.appendChild(wrap);
    if (commessa.value && (_window$PWCollaudoSyn2 = window.PWCollaudoSync) !== null && _window$PWCollaudoSyn2 !== void 0 && _window$PWCollaudoSyn2.reload) {
      setTimeout(function () {
        return window.PWCollaudoSync.reload();
      }, 80);
    }
  }
  (_document$getElementB2 = document.getElementById('formType')) === null || _document$getElementB2 === void 0 || _document$getElementB2.addEventListener('change', function () {
    return setTimeout(install, 20);
  });
  var observer = new MutationObserver(function () {
    return install();
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  install();
  setTimeout(install, 0);
})();