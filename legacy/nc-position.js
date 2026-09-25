(function (_document$getElementB2) {
  var ROLE_KEY = 'pw-collaudo-role';
  if (String(localStorage.getItem(ROLE_KEY) || '') !== 'production') return;
  var ESCAPE_TYPES = new Set(['pvc_vie_fuga', 'alu_vie_fuga']);
  var style = document.createElement('style');
  style.textContent = "\n    .pw-nc-position-wrap{display:inline-flex;align-items:center;gap:4px;margin-left:2px;font-size:10px;font-weight:700;white-space:nowrap}\n    .pw-nc-position-wrap[hidden]{display:none!important}\n    .pw-nc-position-wrap input{width:58px!important;min-width:58px!important;max-width:58px!important;padding:4px 5px!important;border:1px solid #bbb!important;border-radius:5px!important;font-size:11px!important;box-sizing:border-box!important}\n    @media print{\n      .pw-nc-position-wrap{font-size:7pt!important;gap:1mm!important;margin-left:1mm!important}\n      .pw-nc-position-wrap input{width:16mm!important;min-width:16mm!important;max-width:16mm!important;padding:.7mm 1mm!important;border:.2mm solid #aaa!important;border-radius:0!important;font-size:7pt!important}\n    }\n  ";
  document.head.appendChild(style);
  function currentType() {
    var _document$getElementB;
    return String(((_document$getElementB = document.getElementById('formType')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value) || '');
  }
  function isEscapeType() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentType();
    return ESCAPE_TYPES.has(type) || type.includes('vie_fuga');
  }
  function currentCommessa() {
    var _document$querySelect;
    return String(((_document$querySelect = document.querySelector('input[data-field="commessa"]')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.value) || '').trim();
  }
  function savedPosition(type, index) {
    try {
      var _data$fields, _data$fields2;
      var raw = localStorage.getItem("pw-collaudo-".concat(type));
      if (!raw) return '';
      var data = JSON.parse(raw);
      var savedCommessa = String((data === null || data === void 0 || (_data$fields = data.fields) === null || _data$fields === void 0 ? void 0 : _data$fields.commessa) || '').trim();
      if (savedCommessa && currentCommessa() && savedCommessa !== currentCommessa()) return '';
      return String((data === null || data === void 0 || (_data$fields2 = data.fields) === null || _data$fields2 === void 0 ? void 0 : _data$fields2["nc_position_".concat(index)]) || '').trim();
    } catch (_) {
      return '';
    }
  }
  function persistInput(input) {
    var _window$PWCollaudoSyn;
    input.dispatchEvent(new Event('input', {
      bubbles: true
    }));
    if (typeof autoSave === 'function') autoSave();
    if ((_window$PWCollaudoSyn = window.PWCollaudoSync) !== null && _window$PWCollaudoSyn !== void 0 && _window$PWCollaudoSyn.queueSave) window.PWCollaudoSync.queueSave(120);
  }
  function ensureRow(row, index) {
    if (isEscapeType()) {
      var _row$querySelector;
      (_row$querySelector = row.querySelector('.pw-nc-position-wrap')) === null || _row$querySelector === void 0 || _row$querySelector.remove();
      return;
    }
    var nc = row.querySelector("input[data-group=\"esito_".concat(index, "\"][data-value=\"NC\"]"));
    if (!nc) return;
    var checks = nc.closest('.inlinechecks');
    if (!checks) return;
    var wrap = checks.querySelector('.pw-nc-position-wrap');
    if (!wrap) {
      wrap = document.createElement('span');
      wrap.className = 'pw-nc-position-wrap';
      wrap.innerHTML = "<span>Pos.</span><input type=\"text\" autocomplete=\"off\" data-field=\"nc_position_".concat(index, "\" aria-label=\"Posizione non conformit\xE0 ").concat(index + 1, "\">");
      checks.appendChild(wrap);
      var _input = wrap.querySelector('input');
      _input.value = savedPosition(currentType(), index);
      _input.addEventListener('input', function () {
        if (typeof autoSave === 'function') autoSave();
      });
    }
    var input = wrap.querySelector('input');
    var active = !!nc.checked;
    wrap.hidden = !active;
    input.required = active;
    input.setAttribute('aria-required', active ? 'true' : 'false');
    if (!active && input.value) {
      input.value = '';
      persistInput(input);
    }
  }
  function install() {
    var rows = document.querySelectorAll('#formArea tbody tr');
    rows.forEach(function (row, index) {
      return ensureRow(row, index);
    });
  }
  function firstMissingPosition() {
    if (isEscapeType()) return null;
    var rows = document.querySelectorAll('#formArea tbody tr');
    for (var index = 0; index < rows.length; index++) {
      var row = rows[index];
      var nc = row.querySelector("input[data-group=\"esito_".concat(index, "\"][data-value=\"NC\"]"));
      if (!(nc !== null && nc !== void 0 && nc.checked)) continue;
      var input = row.querySelector("input[data-field=\"nc_position_".concat(index, "\"]"));
      if (!input || !String(input.value || '').trim()) return input || nc;
    }
    return null;
  }
  function validatePositions() {
    var showMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    install();
    var missing = firstMissingPosition();
    if (!missing) return true;
    if (showMessage) {
      var _missing$matches, _missing$closest;
      alert('Hai selezionato NC. Inserisci la posizione della non conformità prima di salvare il collaudo.');
      var input = (_missing$matches = missing.matches) !== null && _missing$matches !== void 0 && _missing$matches.call(missing, 'input[data-field^="nc_position_"]') ? missing : (_missing$closest = missing.closest('tr')) === null || _missing$closest === void 0 ? void 0 : _missing$closest.querySelector('input[data-field^="nc_position_"]');
      if (input) {
        input.closest('.pw-nc-position-wrap').hidden = false;
        input.focus();
      }
    }
    return false;
  }
  window.PWValidateNcPositions = validatePositions;
  document.addEventListener('change', function (e) {
    var input = e.target;
    if (!(input instanceof HTMLInputElement) || !input.matches('input[data-group]')) return;
    setTimeout(install, 0);
  }, true);
  document.addEventListener('click', function (e) {
    var _e$target$closest, _e$target;
    var button = (_e$target$closest = (_e$target = e.target).closest) === null || _e$target$closest === void 0 ? void 0 : _e$target$closest.call(_e$target, 'button');
    if (!button) return;
    var text = String(button.textContent || '').toLowerCase();
    if (!text.includes('salva bozza') && !text.includes('completa e archivia')) return;
    if (validatePositions(true)) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }, true);
  (_document$getElementB2 = document.getElementById('formType')) === null || _document$getElementB2 === void 0 || _document$getElementB2.addEventListener('change', function () {
    return setTimeout(install, 0);
  });
  var observer = new MutationObserver(function () {
    return install();
  });
  observer.observe(document.getElementById('formArea') || document.body, {
    childList: true,
    subtree: true
  });
  install();
  setTimeout(install, 0);
  setInterval(install, 500);
})();