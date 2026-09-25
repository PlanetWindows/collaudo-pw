function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function (_document$getElementB2) {
  var SIGNATURE_MARKER_VERSION = 'v3';
  var style = document.createElement('style');
  style.textContent = "\n    .signature-preview {\n      position: relative !important;\n    }\n    .pw-signature-plus-proxy {\n      position: absolute !important;\n      z-index: 5;\n      width: 34px !important;\n      height: 34px !important;\n      min-width: 34px !important;\n      min-height: 34px !important;\n      padding: 0 !important;\n      border-radius: 50% !important;\n      font-size: 22px !important;\n      line-height: 32px !important;\n      font-weight: 700 !important;\n      text-align: center !important;\n      cursor: pointer;\n    }\n    .signature-preview.pw-signature-awaiting-plus .pw-signature-plus-proxy {\n      left: 50% !important;\n      top: 50% !important;\n      right: auto !important;\n      transform: translate(-50%, -50%) !important;\n    }\n    .signature-preview:not(.pw-signature-awaiting-plus) .pw-signature-plus-proxy {\n      top: 6px !important;\n      right: 6px !important;\n      left: auto !important;\n      transform: none !important;\n    }\n    .signature-preview.pw-signature-awaiting-plus img[data-signature] {\n      display: none !important;\n    }\n    .pw-signature-remove-small {\n      padding: 2px 5px !important;\n      font-size: 9px !important;\n      line-height: 1.1 !important;\n      min-height: 0 !important;\n    }\n    @media print {\n      .pw-signature-plus-proxy,\n      .pw-signature-remove-small {\n        display: none !important;\n      }\n    }\n  ";
  document.head.appendChild(style);
  function getType() {
    var _document$getElementB;
    return ((_document$getElementB = document.getElementById('formType')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value) || '';
  }
  function isPvcForm() {
    return String(getType()).startsWith('pvc');
  }
  function getOperator(row, index) {
    var _row$querySelector;
    return String(((_row$querySelector = row.querySelector("input[data-field=\"phase_operator_".concat(index, "\"]"))) === null || _row$querySelector === void 0 ? void 0 : _row$querySelector.value) || '').trim();
  }
  function markerField(index) {
    return "phase_signature_plus_v3_".concat(index);
  }
  function markerValue(operator) {
    return operator ? "".concat(SIGNATURE_MARKER_VERSION, ":").concat(operator) : '';
  }
  function getSavedMarker(type, index) {
    try {
      var _data$fields;
      var raw = localStorage.getItem("pw-collaudo-".concat(type));
      if (!raw) return '';
      var data = JSON.parse(raw);
      return String((data === null || data === void 0 || (_data$fields = data.fields) === null || _data$fields === void 0 ? void 0 : _data$fields[markerField(index)]) || '').trim();
    } catch (_) {
      return '';
    }
  }
  function ensureMarkerInput(row, index) {
    var _row$querySelector2;
    var fieldName = markerField(index);
    var input = row.querySelector("input[data-field=\"".concat(fieldName, "\"]"));
    if (input) return input;
    input = document.createElement('input');
    input.type = 'hidden';
    input.dataset.field = fieldName;
    input.value = getSavedMarker(getType(), index);
    (_row$querySelector2 = row.querySelector('.resultbox')) === null || _row$querySelector2 === void 0 || _row$querySelector2.appendChild(input);
    return input;
  }
  function saveMarker(input, value) {
    var _window$PWCollaudoSyn;
    if (!input || input.value === value) return;
    input.value = value;
    input.dispatchEvent(new Event('input', {
      bubbles: true
    }));
    if (typeof autoSave === 'function') autoSave();
    if ((_window$PWCollaudoSyn = window.PWCollaudoSync) !== null && _window$PWCollaudoSyn !== void 0 && _window$PWCollaudoSyn.queueSave) window.PWCollaudoSync.queueSave(120);
  }
  function clearSignatureDom(index) {
    var persist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var key = "phase_sign_".concat(index);
    var img = document.querySelector("img[data-signature=\"".concat(key, "\"]"));
    if (!img) return false;
    var hadSignature = img.dataset.hasSignature === '1' || !!img.getAttribute('src');
    if (!hadSignature) return false;
    if (typeof setSignatureImage === 'function') {
      setSignatureImage(key, '');
    } else {
      img.removeAttribute('src');
      img.dataset.hasSignature = '0';
      img.style.display = 'none';
      var empty = document.querySelector("[data-signature-placeholder=\"".concat(key, "\"]"));
      if (empty) empty.style.display = '';
    }
    if (persist) {
      var _window$PWCollaudoSyn2;
      if (typeof autoSave === 'function') autoSave();
      if ((_window$PWCollaudoSyn2 = window.PWCollaudoSync) !== null && _window$PWCollaudoSyn2 !== void 0 && _window$PWCollaudoSyn2.queueSave) window.PWCollaudoSync.queueSave(180);
    }
    return true;
  }
  function isExplicitlyAdded(row, index) {
    var operator = getOperator(row, index);
    var marker = ensureMarkerInput(row, index);
    return !!operator && marker.value === markerValue(operator);
  }
  function enforceSignatureState(row, index) {
    var explicit = isExplicitlyAdded(row, index);
    if (!explicit) clearSignatureDom(index, true);
    return explicit;
  }
  function refreshSignatureUi() {
    if (!isPvcForm()) return;
    document.querySelectorAll('#formArea tbody tr').forEach(function (row, index) {
      var preview = row.querySelector('.signature-preview');
      var actions = row.querySelector('.signature-actions');
      if (!preview || !actions) return;
      var explicit = enforceSignatureState(row, index);
      var img = preview.querySelector('img[data-signature]');
      var hasSignature = explicit && (img === null || img === void 0 ? void 0 : img.dataset.hasSignature) === '1' && !!img.getAttribute('src');
      var officialButton = row.querySelector('.pw-use-official-signature');
      if (officialButton) officialButton.style.display = 'none';
      var proxy = preview.querySelector('.pw-signature-plus-proxy');
      if (!proxy) {
        proxy = document.createElement('button');
        proxy.type = 'button';
        proxy.className = 'pw-signature-plus-proxy';
        proxy.textContent = '+';
        proxy.title = 'Inserisci la firma associata all’operatore';
        proxy.setAttribute('aria-label', 'Inserisci la firma associata all’operatore');
        preview.appendChild(proxy);
        proxy.addEventListener('click', _asyncToGenerator(_regenerator().m(function _callee() {
          var currentOperator, sourceButton, marker, key, currentImg, alreadyLoaded, _window$PWCollaudoSyn3;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                currentOperator = getOperator(row, index);
                if (currentOperator) {
                  _context.n = 1;
                  break;
                }
                return _context.a(2);
              case 1:
                sourceButton = row.querySelector('.pw-use-official-signature');
                if (sourceButton) {
                  _context.n = 2;
                  break;
                }
                alert('Firma associata non disponibile. Riprova tra un istante.');
                return _context.a(2);
              case 2:
                marker = ensureMarkerInput(row, index);
                saveMarker(marker, markerValue(currentOperator));
                preview.classList.remove('pw-signature-awaiting-plus');
                if (!(currentOperator === 'APOLLO FRANCESCO')) {
                  _context.n = 3;
                  break;
                }
                key = "phase_sign_".concat(index);
                currentImg = preview.querySelector('img[data-signature]');
                alreadyLoaded = (currentImg === null || currentImg === void 0 ? void 0 : currentImg.dataset.hasSignature) === '1' && !!currentImg.getAttribute('src');
                if (!alreadyLoaded && typeof setSignatureImage === 'function') {
                  setSignatureImage(key, 'apollo-francesco-signature.svg?v=1');
                  if (typeof autoSave === 'function') autoSave();
                  if ((_window$PWCollaudoSyn3 = window.PWCollaudoSync) !== null && _window$PWCollaudoSyn3 !== void 0 && _window$PWCollaudoSyn3.queueSave) window.PWCollaudoSync.queueSave(120);
                }
                setTimeout(refreshSignatureUi, 100);
                return _context.a(2);
              case 3:
                sourceButton.click();
                setTimeout(function () {
                  var currentImg = preview.querySelector('img[data-signature]');
                  var loaded = (currentImg === null || currentImg === void 0 ? void 0 : currentImg.dataset.hasSignature) === '1' && !!currentImg.getAttribute('src');
                  if (!loaded) saveMarker(marker, '');
                  refreshSignatureUi();
                }, 900);
              case 4:
                return _context.a(2);
            }
          }, _callee);
        })));
      }
      actions.querySelectorAll('button').forEach(function (button) {
        var text = (button.textContent || '').trim().toLowerCase();
        if (button.classList.contains('pw-use-official-signature') || text.includes('allega / cambia firma')) {
          button.style.display = 'none';
        } else if (text.includes('rimuovi firma')) {
          button.classList.add('pw-signature-remove-small');
          button.style.display = hasSignature ? '' : 'none';
        }
      });
      var hint = actions.querySelector('.signature-placeholder');
      if (hint) hint.style.display = 'none';
      var empty = preview.querySelector('.signature-empty');
      if (empty) empty.style.display = 'none';
      preview.classList.toggle('pw-signature-awaiting-plus', !hasSignature);
    });
  }
  document.addEventListener('change', function (e) {
    var _e$target$closest, _e$target;
    var select = (_e$target$closest = (_e$target = e.target).closest) === null || _e$target$closest === void 0 ? void 0 : _e$target$closest.call(_e$target, '.pw-operator-select');
    if (!select || !isPvcForm()) return;
    var row = select.closest('tr');
    if (!row) return;
    var rows = Array.from(document.querySelectorAll('#formArea tbody tr'));
    var index = rows.indexOf(row);
    if (index < 0) return;
    saveMarker(ensureMarkerInput(row, index), '');
    clearSignatureDom(index, true);
    setTimeout(refreshSignatureUi, 0);
  }, true);
  document.addEventListener('click', function (e) {
    var _e$target$closest2, _e$target2;
    var button = (_e$target$closest2 = (_e$target2 = e.target).closest) === null || _e$target$closest2 === void 0 ? void 0 : _e$target$closest2.call(_e$target2, 'button');
    if (!button || !isPvcForm()) return;
    var text = (button.textContent || '').trim().toLowerCase();
    if (!text.includes('rimuovi firma')) return;
    var row = button.closest('tr');
    if (!row) return;
    var rows = Array.from(document.querySelectorAll('#formArea tbody tr'));
    var index = rows.indexOf(row);
    if (index < 0) return;
    saveMarker(ensureMarkerInput(row, index), '');
    setTimeout(refreshSignatureUi, 0);
  }, true);
  (_document$getElementB2 = document.getElementById('formType')) === null || _document$getElementB2 === void 0 || _document$getElementB2.addEventListener('change', function () {
    setTimeout(refreshSignatureUi, 50);
  });
  var observer = new MutationObserver(function () {
    return refreshSignatureUi();
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src', 'data-has-signature']
  });
  setInterval(refreshSignatureUi, 350);
  setTimeout(refreshSignatureUi, 0);
})();