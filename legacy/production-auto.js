function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function (_document$getElementB2) {
  'use strict';
  if (localStorage.getItem('pw-collaudo-role') !== 'production') return;
  var ENDPOINT = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  var DEFAULTS = {
    pvc: ['GHIDONI PIERLUIGI', 'GHIDONI PIERLUIGI', 'JHINAOUI RIADH', 'ANGELO IDONE', "D'ALESSANDRO DANIELE", 'GOZZI ANDREA', 'GOZZI ANDREA'],
    pvc_speciali: ['GHIDONI PIERLUIGI', 'GHIDONI PIERLUIGI', 'JHINAOUI RIADH', 'FURLANI ROBERTO', 'FURLANI ROBERTO', 'GOZZI ANDREA', 'GOZZI ANDREA'],
    pvc_vie_fuga: ['GHIDONI PIERLUIGI', 'GHIDONI PIERLUIGI', 'JHINAOUI RIADH', 'FURLANI ROBERTO', 'FURLANI ROBERTO', 'GOZZI ANDREA', 'GOZZI ANDREA'],
    alu: ['GHIDONI PIERLUIGI', 'GHIDONI PIERLUIGI', 'JHINAOUI RIADH', 'ANGELO IDONE', "D'ALESSANDRO DANIELE", 'GOZZI ANDREA', 'GOZZI ANDREA'],
    alu_speciali: ['GHIDONI PIERLUIGI', 'GHIDONI PIERLUIGI', 'JHINAOUI RIADH', 'FURLANI ROBERTO', 'FURLANI ROBERTO', 'GOZZI ANDREA', 'GOZZI ANDREA'],
    alu_vie_fuga: ['GHIDONI PIERLUIGI', 'GHIDONI PIERLUIGI', 'JHINAOUI RIADH', 'FURLANI ROBERTO', 'FURLANI ROBERTO', 'GOZZI ANDREA', 'GOZZI ANDREA']
  };
  var style = document.createElement('style');
  style.textContent = "\n    .signature-actions,.pw-signature-plus-proxy,.pw-use-official-signature,.pw-alu-signature-plus{display:none!important}\n    .pw-alu-operator-block .pw-operator-row{display:flex;gap:6px;align-items:center;margin:3px 0}\n    .pw-alu-operator-block .pw-operator-name{flex:1;padding:7px;border:1px solid #bbb;border-radius:5px;font-size:12px;font-weight:600}\n    .pw-alu-operator-block .pw-change-operator{border:1px solid #bbb;border-radius:5px;background:#fff;padding:6px;cursor:pointer}\n    .pw-alu-operator-block .pw-alu-operator-select{display:none}\n    .inlinechecks{flex-wrap:wrap}\n    @media print{\n      .pw-alu-operator-block .pw-change-operator,.pw-alu-operator-block .pw-alu-operator-select{display:none!important}\n      .pw-alu-operator-block .pw-operator-name{border:0;padding:0}\n      .pw-manual-pdf-btn{display:none!important}\n    }";
  document.head.appendChild(style);
  var signatures = {};
  var signaturesLoading = false;
  var lastSignatureAttempt = 0;
  var activeForm = '';
  var activeCommessa = '';
  var commessaChangedAt = Date.now();
  var formType = function formType() {
    var _document$getElementB;
    return ((_document$getElementB = document.getElementById('formType')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value) || '';
  };
  var commessa = function commessa() {
    var _document$querySelect;
    return String(((_document$querySelect = document.querySelector('[data-field="commessa"]')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.value) || '').trim();
  };
  function fetchSignatures() {
    return _fetchSignatures.apply(this, arguments);
  }
  function _fetchSignatures() {
    _fetchSignatures = _asyncToGenerator(_regenerator().m(function _callee() {
      var code, response, data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (!(signaturesLoading || Object.keys(signatures).length || Date.now() - lastSignatureAttempt < 5000)) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            code = String(localStorage.getItem('pw-collaudo-access-code') || '').trim();
            if (code) {
              _context.n = 2;
              break;
            }
            return _context.a(2);
          case 2:
            lastSignatureAttempt = Date.now();
            signaturesLoading = true;
            _context.p = 3;
            _context.n = 4;
            return fetch(ENDPOINT, {
              method: 'POST',
              cache: 'no-store',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                action: 'signatures',
                code: code
              })
            });
          case 4:
            response = _context.v;
            if (!response.ok) {
              _context.n = 6;
              break;
            }
            _context.n = 5;
            return response.json();
          case 5:
            data = _context.v;
            signatures = data.signatures || {};
            refresh();
          case 6:
            _context.n = 8;
            break;
          case 7:
            _context.p = 7;
            _t = _context.v;
            console.warn('Firme ufficiali non disponibili', _t);
          case 8:
            _context.p = 8;
            signaturesLoading = false;
            return _context.f(8);
          case 9:
            return _context.a(2);
        }
      }, _callee, null, [[3, 7, 8, 9]]);
    }));
    return _fetchSignatures.apply(this, arguments);
  }
  function persist(input) {
    var _window$PWCollaudoSyn;
    input.dispatchEvent(new Event('input', {
      bubbles: true
    }));
    if (typeof autoSave === 'function') autoSave();
    if ((_window$PWCollaudoSyn = window.PWCollaudoSync) !== null && _window$PWCollaudoSyn !== void 0 && _window$PWCollaudoSyn.queueSave) window.PWCollaudoSync.queueSave(250);
  }
  function ensureManualFlag(row, index) {
    var input = row.querySelector('input[data-field="phase_manual_operator_' + index + '"]');
    if (!input) {
      var _row$querySelector;
      input = document.createElement('input');
      input.type = 'hidden';
      input.dataset.field = 'phase_manual_operator_' + index;
      (_row$querySelector = row.querySelector('.resultbox')) === null || _row$querySelector === void 0 || _row$querySelector.appendChild(input);
    }
    return input;
  }
  function decorateAlu(row, index) {
    var _DEFAULTS$formType;
    var block = row.querySelector('.pw-alu-operator-block');
    if (!block || block.dataset.pwAutoDecorated === '1') return;
    var select = block.querySelector('.pw-alu-operator-select');
    if (!select) return;
    block.dataset.pwAutoDecorated = '1';
    var panel = document.createElement('div');
    panel.className = 'pw-operator-row';
    var label = document.createElement('div');
    label.className = 'pw-operator-name';
    label.textContent = select.value || ((_DEFAULTS$formType = DEFAULTS[formType()]) === null || _DEFAULTS$formType === void 0 ? void 0 : _DEFAULTS$formType[index]) || '';
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'pw-change-operator';
    button.textContent = 'Cambia operatore';
    panel.append(label, button);
    select.parentNode.insertBefore(panel, select);
    button.addEventListener('click', function () {
      select.style.setProperty('display', select.style.display === 'block' ? 'none' : 'block');
      if (select.style.display === 'block') select.focus();
    });
    select.addEventListener('change', function () {
      label.textContent = select.value || '';
      select.style.setProperty('display', 'none');
      var marker = ensureManualFlag(row, index);
      marker.value = '1';
      persist(marker);
    });
  }
  function updateOperator(row, index) {
    var _DEFAULTS$type;
    var type = formType();
    var expected = (_DEFAULTS$type = DEFAULTS[type]) === null || _DEFAULTS$type === void 0 ? void 0 : _DEFAULTS$type[index];
    if (!expected) return;
    decorateAlu(row, index);
    var hidden = row.querySelector('input[data-field="phase_operator_' + index + '"]');
    if (!hidden) return;
    var marker = ensureManualFlag(row, index);
    var current = String(hidden.value || '').trim();
    var aluSelect = row.querySelector('.pw-alu-operator-select');
    var pvcSelect = row.querySelector('.pw-operator-select');
    var select = aluSelect || pvcSelect;
    var name = row.querySelector('.pw-operator-name');
    var outcome = row.querySelector('input[data-group="esito_' + index + '"]:checked');
    var storedBlankApollo = type === 'pvc' && index === 3 && current === 'APOLLO FRANCESCO' && !marker.value && !outcome;
    if ((!current || storedBlankApollo) && !marker.value) {
      hidden.value = expected;
      if (select) select.value = expected;
      if (name) name.textContent = expected;
      if (storedBlankApollo && typeof setSignatureImage === 'function') {
        setSignatureImage('phase_sign_' + index, '');
      }
      if (commessa()) persist(hidden);
    } else {
      if (select && select.value !== current) select.value = current;
      if (name && name.textContent !== current) name.textContent = current;
    }
  }
  function refreshSignature(row, index) {
    var _row$querySelector2, _window$PWCollaudoSyn2;
    if (!commessa()) return;
    if (Date.now() - commessaChangedAt < 1700) return;
    var operator = String(((_row$querySelector2 = row.querySelector('input[data-field="phase_operator_' + index + '"]')) === null || _row$querySelector2 === void 0 ? void 0 : _row$querySelector2.value) || '').trim();
    if (!operator) return;
    var official = signatures[operator] || (operator === 'APOLLO FRANCESCO' ? 'apollo-francesco-signature.svg?v=1' : '');
    if (!official || typeof setSignatureImage !== 'function') return;
    var img = row.querySelector('img[data-signature="phase_sign_' + index + '"]');
    if (!img) return;
    var existing = String(img.getAttribute('src') || '');
    if (existing && img.dataset.hasSignature === '1') {
      var officialOfOther = Object.entries(signatures).some(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          name = _ref2[0],
          value = _ref2[1];
        return name !== operator && value === existing;
      });
      if (!officialOfOther && !(existing.includes('apollo-francesco-signature.svg') && operator !== 'APOLLO FRANCESCO')) return;
    }
    if (existing === official) return;
    setSignatureImage('phase_sign_' + index, official);
    if (typeof autoSave === 'function') autoSave();
    if ((_window$PWCollaudoSyn2 = window.PWCollaudoSync) !== null && _window$PWCollaudoSyn2 !== void 0 && _window$PWCollaudoSyn2.queueSave) window.PWCollaudoSync.queueSave(400);
  }
  function refresh() {
    var type = formType();
    var current = commessa();
    if (type !== activeForm || current !== activeCommessa) {
      activeForm = type;
      activeCommessa = current;
      commessaChangedAt = Date.now();
    }
    if (!DEFAULTS[type]) return;
    var rows = document.querySelectorAll('#formArea tbody tr');
    rows.forEach(function (row, i) {
      var _row$querySelector3;
      updateOperator(row, i);
      refreshSignature(row, i);
      var label = (_row$querySelector3 = row.querySelector('.signature-wrap')) === null || _row$querySelector3 === void 0 ? void 0 : _row$querySelector3.previousElementSibling;
      if ((label === null || label === void 0 ? void 0 : label.tagName) === 'LABEL' && String(label.textContent || '').includes('Firma')) {
        label.textContent = 'Firma operatore associata';
      }
      row.querySelectorAll('.inlinechecks .choice').forEach(function (choice) {
        var input = choice.querySelector('input[data-value]');
        if (input && !choice.dataset.pwLabels) {
          var caption = input.dataset.value === 'NC' ? 'Non conforme' : 'Conforme';
          for (var _i = 0, _arr = _toConsumableArray(choice.childNodes); _i < _arr.length; _i++) {
            var node = _arr[_i];
            if (node.nodeType === 3) node.textContent = '';
          }
          choice.appendChild(document.createTextNode(' ' + caption));
          choice.dataset.pwLabels = '1';
        }
      });
    });
  }
  document.addEventListener('change', function (e) {
    var _el$matches;
    var el = e.target;
    var type = formType();
    if (!DEFAULTS[type]) return;
    if (el !== null && el !== void 0 && (_el$matches = el.matches) !== null && _el$matches !== void 0 && _el$matches.call(el, '.pw-operator-select,.pw-alu-operator-select')) {
      var row = el.closest('tr');
      var index = Array.from(document.querySelectorAll('#formArea tbody tr')).indexOf(row);
      if (index >= 0) {
        var marker = ensureManualFlag(row, index);
        marker.value = '1';
        persist(marker);
        setTimeout(refresh, 220);
      }
    }
    if (el instanceof HTMLInputElement && el.matches('input[data-group][data-value]') && el.checked) {
      var _row = el.closest('tr');
      var _index = Array.from(document.querySelectorAll('#formArea tbody tr')).indexOf(_row);
      var date = _row === null || _row === void 0 ? void 0 : _row.querySelector('input[data-field="phase_date_' + _index + '"]');
      if (date && !date.value) {
        var now = new Date();
        date.value = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
        persist(date);
      }
    }
  }, true);
  function addManualPdfButton() {
    var footer = document.querySelector('.footer-actions');
    if (!footer || footer.querySelector('.pw-manual-pdf-btn')) return;
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'pw-manual-pdf-btn';
    button.textContent = 'Esporta PDF ora';
    button.title = 'Stampa o salva la scheda corrente in PDF';
    button.addEventListener('click', function () {
      return window.print();
    });
    footer.appendChild(button);
  }
  (_document$getElementB2 = document.getElementById('formType')) === null || _document$getElementB2 === void 0 || _document$getElementB2.addEventListener('change', function () {
    return setTimeout(refresh, 120);
  });
  setInterval(function () {
    fetchSignatures();
    refresh();
    addManualPdfButton();
  }, 900);
  fetchSignatures();
  refresh();
  addManualPdfButton();
})();