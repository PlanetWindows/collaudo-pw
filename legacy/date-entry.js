(function (_document$getElementB) {
  'use strict';

  if (String(localStorage.getItem('pw-collaudo-role') || '') !== 'production') return;
  var style = document.createElement('style');
  style.textContent = "\n    .pw-date-entry { display:flex; align-items:center; gap:5px; flex-wrap:wrap; width:100%; }\n    .pw-date-entry .pw-date-manual { flex:1 1 120px; width:100%; min-width:0; box-sizing:border-box; padding:7px 8px; border:1px solid #b4b4b4; border-radius:5px; background:#fff; color:#111; font-size:13px; }\n    .pw-date-entry .pw-date-manual.pw-date-invalid { border:2px solid #ba3030!important; }\n    .pw-date-entry .pw-date-native { flex:0 0 auto; max-width:100%; font-size:12px; padding:4px; border:1px solid #ccc; border-radius:4px; box-sizing:border-box; }\n    .pw-date-entry .pw-date-hint { font-size:10px; color:#666; width:100%; }\n    @media print {\n      .pw-date-entry .pw-date-native,.pw-date-entry .pw-date-hint{display:none!important}\n      .pw-date-entry .pw-date-manual{font:inherit!important;border:0!important;padding:0!important}\n    }\n  ";
  document.head.appendChild(style);
  function formatItalian(iso) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(iso || ''))) return '';
    return iso.slice(8, 10) + '/' + iso.slice(5, 7) + '/' + iso.slice(0, 4);
  }
  function parseManual(raw) {
    var value = String(raw || '').trim();
    if (!value) return '';
    var day, month, year;
    var match = value.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/);
    var compact = value.match(/^(\d{2})(\d{2})(\d{4})$/);
    if (match) {
      day = Number(match[1]);
      month = Number(match[2]);
      year = Number(match[3]);
    } else if (compact) {
      day = Number(compact[1]);
      month = Number(compact[2]);
      year = Number(compact[3]);
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      year = Number(value.slice(0, 4));
      month = Number(value.slice(5, 7));
      day = Number(value.slice(8, 10));
    } else {
      return null;
    }
    if (year < 1900 || year > 2100 || month < 1 || month > 12 || day < 1 || day > 31) return null;
    var test = new Date(Date.UTC(year, month - 1, day));
    if (test.getUTCFullYear() !== year || test.getUTCMonth() !== month - 1 || test.getUTCDate() !== day) return null;
    return String(year).padStart(4, '0') + '-' + String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0');
  }
  function persistDate(native) {
    var _window$PWCollaudoSyn;
    native.dispatchEvent(new Event('input', {
      bubbles: true
    }));
    native.dispatchEvent(new Event('change', {
      bubbles: true
    }));
    if (typeof autoSave === 'function') autoSave();
    if ((_window$PWCollaudoSyn = window.PWCollaudoSync) !== null && _window$PWCollaudoSyn !== void 0 && _window$PWCollaudoSyn.queueSave) window.PWCollaudoSync.queueSave(250);
  }
  function enhanceDate(native) {
    if (native.dataset.pwEditableDate === '1') return;
    native.dataset.pwEditableDate = '1';
    var wrap = document.createElement('div');
    wrap.className = 'pw-date-entry';
    var manual = document.createElement('input');
    manual.type = 'text';
    manual.className = 'pw-date-manual';
    manual.setAttribute('inputmode', 'numeric');
    manual.setAttribute('autocomplete', 'off');
    manual.setAttribute('aria-label', 'Inserisci data nel formato giorno mese anno');
    manual.placeholder = 'gg/mm/aaaa';
    manual.maxLength = 10;
    manual.value = formatItalian(native.value);
    var hint = document.createElement('span');
    hint.className = 'pw-date-hint';
    hint.textContent = 'Scrivi la data o selezionala dal calendario';
    native.parentNode.insertBefore(wrap, native);
    native.classList.add('pw-date-native');
    native.setAttribute('aria-label', 'Seleziona dal calendario');
    wrap.appendChild(manual);
    wrap.appendChild(native);
    wrap.appendChild(hint);
    var updateFromManual = function updateFromManual() {
      var iso = parseManual(manual.value);
      manual.classList.toggle('pw-date-invalid', iso === null && manual.value.trim().length >= 8);
      if (iso === null || iso === native.value) return;
      native.value = iso;
      persistDate(native);
    };
    manual.addEventListener('input', updateFromManual);
    manual.addEventListener('change', updateFromManual);
    manual.addEventListener('blur', function () {
      var iso = parseManual(manual.value);
      if (iso === null) {
        manual.classList.add('pw-date-invalid');
        hint.textContent = 'Data non valida. Usa gg/mm/aaaa';
      } else {
        manual.classList.remove('pw-date-invalid');
        manual.value = formatItalian(iso);
        hint.textContent = 'Scrivi la data o selezionala dal calendario';
      }
    });
    native.addEventListener('input', function () {
      if (document.activeElement !== manual) manual.value = formatItalian(native.value);
    });
    native.addEventListener('change', function () {
      if (document.activeElement !== manual) manual.value = formatItalian(native.value);
    });
    wrap._pwSyncFromNative = function () {
      if (document.activeElement === manual) return;
      var value = formatItalian(native.value);
      if (manual.value !== value) {
        manual.value = value;
        manual.classList.remove('pw-date-invalid');
      }
    };
  }
  function refresh() {
    document.querySelectorAll('#formArea input[type="date"][data-field]').forEach(enhanceDate);
    document.querySelectorAll('.pw-date-entry').forEach(function (wrap) {
      var _wrap$_pwSyncFromNati;
      return (_wrap$_pwSyncFromNati = wrap._pwSyncFromNative) === null || _wrap$_pwSyncFromNati === void 0 ? void 0 : _wrap$_pwSyncFromNati.call(wrap);
    });
  }
  (_document$getElementB = document.getElementById('formType')) === null || _document$getElementB === void 0 || _document$getElementB.addEventListener('change', function () {
    return setTimeout(refresh, 0);
  });
  document.addEventListener('change', function (event) {
    var _event$target, _event$target$matches;
    if ((_event$target = event.target) !== null && _event$target !== void 0 && (_event$target$matches = _event$target.matches) !== null && _event$target$matches !== void 0 && _event$target$matches.call(_event$target, '[data-field="commessa"]')) setTimeout(refresh, 150);
  });
  setTimeout(refresh, 100);
  setInterval(refresh, 650);
})();