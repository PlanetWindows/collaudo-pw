function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function (_document$getElementB2) {
  var SYNC_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  var OFFICE_PREP_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-office-prep';
  var CODE_KEY = 'pw-collaudo-access-code';
  var LABELS = {
    pvc: 'PVC',
    pvc_speciali: 'PVC - Pezzi speciali',
    pvc_vie_fuga: 'PVC - Vie di fuga',
    alu: 'Alluminio',
    alu_speciali: 'Alluminio - Pezzi speciali',
    alu_vie_fuga: 'Alluminio - Vie di fuga'
  };
  function setStatus(message) {
    var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2600;
    var el = document.getElementById('status');
    if (!el) return;
    el.textContent = message;
    if (ms > 0) setTimeout(function () {
      if (el.textContent === message) el.textContent = '';
    }, ms);
  }
  function getAccessCode() {
    var forcePrompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (!forcePrompt) {
      var saved = String(localStorage.getItem(CODE_KEY) || '').trim();
      if (saved) return saved;
    }
    var code = String(prompt('Inserisci il codice reparto Collaudo PW:') || '').trim().toUpperCase();
    if (code) localStorage.setItem(CODE_KEY, code);
    return code;
  }
  function setSignature(key, dataUrl) {
    if (typeof window.setSignatureImage === 'function') {
      window.setSignatureImage(key, dataUrl || '');
      return;
    }
    var img = document.querySelector("img[data-signature=\"".concat(key, "\"]")),
      empty = document.querySelector("[data-signature-placeholder=\"".concat(key, "\"]"));
    if (!img) return;
    if (dataUrl) {
      img.src = dataUrl;
      img.dataset.hasSignature = '1';
      img.style.display = 'block';
      if (empty) empty.style.display = 'none';
    } else {
      img.removeAttribute('src');
      img.dataset.hasSignature = '0';
      img.style.display = 'none';
      if (empty) empty.style.display = '';
    }
  }
  function applyPayload(payload) {
    var fields = (payload === null || payload === void 0 ? void 0 : payload.fields) || {},
      esiti = (payload === null || payload === void 0 ? void 0 : payload.esiti) || {},
      signatures = (payload === null || payload === void 0 ? void 0 : payload.signatures) || {};
    document.querySelectorAll('input[data-field]').forEach(function (input) {
      var _fields$key;
      var key = input.dataset.field;
      if (Object.prototype.hasOwnProperty.call(fields, key)) input.value = (_fields$key = fields[key]) !== null && _fields$key !== void 0 ? _fields$key : '';
    });
    document.querySelectorAll('input[data-group]').forEach(function (input) {
      input.checked = esiti[input.dataset.group] === input.dataset.value;
    });
    document.querySelectorAll('img[data-signature]').forEach(function (img) {
      return setSignature(img.dataset.signature, signatures[img.dataset.signature] || '');
    });
  }
  function requestShared(_x, _x2, _x3) {
    return _requestShared.apply(this, arguments);
  }
  function _requestShared() {
    _requestShared = _asyncToGenerator(_regenerator().m(function _callee(type, commessa, code) {
      var res, data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.n = 1;
            return fetch(SYNC_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                action: 'load',
                code: code,
                form_type: type,
                commessa: commessa
              })
            });
          case 1:
            res = _context.v;
            data = {};
            _context.p = 2;
            _context.n = 3;
            return res.json();
          case 3:
            data = _context.v;
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
          case 5:
            return _context.a(2, {
              res: res,
              data: data
            });
        }
      }, _callee, null, [[2, 4]]);
    }));
    return _requestShared.apply(this, arguments);
  }
  function requestOfficePrep(_x4, _x5) {
    return _requestOfficePrep.apply(this, arguments);
  }
  function _requestOfficePrep() {
    _requestOfficePrep = _asyncToGenerator(_regenerator().m(function _callee2(commessa, code) {
      var res, data, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.n = 1;
            return fetch(OFFICE_PREP_URL, {
              method: 'POST',
              cache: 'no-store',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                action: 'get',
                access_code: code,
                commessa: commessa
              })
            });
          case 1:
            res = _context2.v;
            data = {};
            _context2.p = 2;
            _context2.n = 3;
            return res.json();
          case 3:
            data = _context2.v;
            _context2.n = 5;
            break;
          case 4:
            _context2.p = 4;
            _t2 = _context2.v;
          case 5:
            return _context2.a(2, {
              res: res,
              data: data
            });
        }
      }, _callee2, null, [[2, 4]]);
    }));
    return _requestOfficePrep.apply(this, arguments);
  }
  function ensureTypeOption(type) {
    var select = document.getElementById('formType');
    if (!select) return null;
    if (!select.querySelector("option[value=\"".concat(type, "\"]"))) {
      var option = document.createElement('option');
      option.value = type;
      option.textContent = LABELS[type] || type;
      select.appendChild(option);
    }
    return select;
  }
  function lockType(type) {
    var select = ensureTypeOption(type);
    if (!select) return;
    select.value = type;
    select.disabled = true;
    select.dataset.officeLocked = '1';
    select.title = 'Tipo di collaudo definito dall’Ufficio';
  }
  function unlockType() {
    var select = document.getElementById('formType');
    if (select && select.dataset.officeLocked === '1') {
      select.disabled = false;
      delete select.dataset.officeLocked;
      select.title = '';
    }
  }
  function clearOutcomeSelections() {
    document.querySelectorAll('input[data-group]').forEach(function (input) {
      input.checked = false;
    });
  }
  function switchToType(_x6, _x7) {
    return _switchToType.apply(this, arguments);
  }
  function _switchToType() {
    _switchToType = _asyncToGenerator(_regenerator().m(function _callee3(type, commessa) {
      var select, input;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            select = ensureTypeOption(type);
            if (select) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2, false);
          case 1:
            select.disabled = false;
            if (!(select.value !== type)) {
              _context3.n = 2;
              break;
            }
            select.value = type;
            select.dispatchEvent(new Event('change', {
              bubbles: true
            }));
            _context3.n = 2;
            return new Promise(function (r) {
              return setTimeout(r, 180);
            });
          case 2:
            clearOutcomeSelections();
            input = document.querySelector('input[data-field="commessa"]');
            if (input) {
              _context3.n = 3;
              break;
            }
            return _context3.a(2, false);
          case 3:
            input.value = commessa;
            input.dispatchEvent(new Event('input', {
              bubbles: true
            }));
            input.dispatchEvent(new Event('change', {
              bubbles: true
            }));
            lockType(type);
            return _context3.a(2, true);
        }
      }, _callee3);
    }));
    return _switchToType.apply(this, arguments);
  }
  function openOfficeCommessa(_x8, _x9) {
    return _openOfficeCommessa.apply(this, arguments);
  }
  function _openOfficeCommessa() {
    _openOfficeCommessa = _asyncToGenerator(_regenerator().m(function _callee4(item, code) {
      var _shared$data;
      var commessa, type, shared, payload, blankPayload, currentInput, _currentInput;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            commessa = String((item === null || item === void 0 ? void 0 : item.commessa) || '').trim();
            type = String((item === null || item === void 0 ? void 0 : item.form_type) || '').trim();
            if (!(!commessa || !LABELS[type])) {
              _context4.n = 1;
              break;
            }
            throw new Error('invalid_office_commessa');
          case 1:
            window.PWCollaudoBlankOutcomeKey = "".concat(type, "::").concat(commessa.toUpperCase().replace(/\s+/g, ' '));
            _context4.n = 2;
            return switchToType(type, commessa);
          case 2:
            if (_context4.v) {
              _context4.n = 3;
              break;
            }
            throw new Error('switch_failed');
          case 3:
            _context4.n = 4;
            return requestShared(type, commessa, code);
          case 4:
            shared = _context4.v;
            if (shared.res.ok && (_shared$data = shared.data) !== null && _shared$data !== void 0 && _shared$data.found) {
              payload = shared.data.payload || {};
              blankPayload = _objectSpread(_objectSpread({}, payload), {}, {
                esiti: {}
              });
              applyPayload(blankPayload);
              clearOutcomeSelections();
              currentInput = document.querySelector('input[data-field="commessa"]');
              if (currentInput) currentInput.value = commessa;
              localStorage.setItem("pw-collaudo-".concat(type), JSON.stringify(blankPayload));
              setStatus("Commessa ".concat(commessa, " aperta \u2014 dati Ufficio e Produzione caricati"), 4500);
              setTimeout(function () {
                var _window$PWCollaudoSyn;
                if ((_window$PWCollaudoSyn = window.PWCollaudoSync) !== null && _window$PWCollaudoSyn !== void 0 && _window$PWCollaudoSyn.reload) window.PWCollaudoSync.reload();
              }, 180);
            } else {
              _currentInput = document.querySelector('input[data-field="commessa"]');
              if (_currentInput) {
                _currentInput.value = commessa;
                _currentInput.dispatchEvent(new Event('input', {
                  bubbles: true
                }));
                _currentInput.dispatchEvent(new Event('change', {
                  bubbles: true
                }));
              }
              setStatus("Commessa ".concat(commessa, " aperta \u2014 dati Ufficio caricati"), 4500);
            }
          case 5:
            return _context4.a(2);
        }
      }, _callee4);
    }));
    return _openOfficeCommessa.apply(this, arguments);
  }
  function searchGenericCommessa(_x0) {
    return _searchGenericCommessa.apply(this, arguments);
  }
  function _searchGenericCommessa() {
    _searchGenericCommessa = _asyncToGenerator(_regenerator().m(function _callee5(button) {
      var input, commessa, oldText, _prep$data, _prep$data2, _prep$data3, code, prep, item, _t3;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            input = document.querySelector('input[data-field="commessa"]');
            commessa = String((input === null || input === void 0 ? void 0 : input.value) || '').trim().toUpperCase().replace(/\s+/g, ' ');
            if (input) {
              _context5.n = 1;
              break;
            }
            return _context5.a(2);
          case 1:
            if (commessa) {
              _context5.n = 2;
              break;
            }
            alert('Inserisci prima il numero della commessa.');
            input.focus();
            return _context5.a(2);
          case 2:
            oldText = button.textContent;
            button.disabled = true;
            button.textContent = 'APRO…';
            setStatus('Cerco e apro la commessa inserita dall’Ufficio…', 0);
            _context5.p = 3;
            code = getAccessCode(false);
            if (code) {
              _context5.n = 4;
              break;
            }
            return _context5.a(2);
          case 4:
            _context5.n = 5;
            return requestOfficePrep(commessa, code);
          case 5:
            prep = _context5.v;
            if (!(prep.res.status === 401)) {
              _context5.n = 8;
              break;
            }
            localStorage.removeItem(CODE_KEY);
            code = getAccessCode(true);
            if (code) {
              _context5.n = 6;
              break;
            }
            return _context5.a(2);
          case 6:
            _context5.n = 7;
            return requestOfficePrep(commessa, code);
          case 7:
            prep = _context5.v;
          case 8:
            if (prep.res.ok) {
              _context5.n = 9;
              break;
            }
            throw new Error(((_prep$data = prep.data) === null || _prep$data === void 0 ? void 0 : _prep$data.error) || "office_prep_".concat(prep.res.status));
          case 9:
            if (!(!((_prep$data2 = prep.data) !== null && _prep$data2 !== void 0 && _prep$data2.found) || !((_prep$data3 = prep.data) !== null && _prep$data3 !== void 0 && (_prep$data3 = _prep$data3.item) !== null && _prep$data3 !== void 0 && _prep$data3.form_type))) {
              _context5.n = 10;
              break;
            }
            setStatus('Commessa non trovata nei dati Ufficio', 3500);
            alert("La commessa \u201C".concat(commessa, "\u201D non risulta ancora inserita dall\u2019Ufficio."));
            return _context5.a(2);
          case 10:
            item = _objectSpread(_objectSpread({}, prep.data.item), {}, {
              commessa: prep.data.item.commessa || commessa
            });
            _context5.n = 11;
            return openOfficeCommessa(item, code);
          case 11:
            _context5.n = 13;
            break;
          case 12:
            _context5.p = 12;
            _t3 = _context5.v;
            console.error('Apertura commessa Ufficio', _t3);
            setStatus('Errore durante l’apertura della commessa', 3500);
            alert('Non sono riuscito ad aprire la commessa. Controlla la connessione e riprova.');
          case 13:
            _context5.p = 13;
            button.disabled = false;
            button.textContent = oldText;
            return _context5.f(13);
          case 14:
            return _context5.a(2);
        }
      }, _callee5, null, [[3, 12, 13, 14]]);
    }));
    return _searchGenericCommessa.apply(this, arguments);
  }
  function installSearchButton() {
    var input = document.querySelector('input[data-field="commessa"]');
    if (!input) return;
    var cell = input.parentElement;
    if (!cell || cell.querySelector('.pw-commessa-search-btn')) return;
    cell.classList.add('pw-commessa-search-cell');
    input.classList.add('pw-commessa-input');
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'pw-commessa-search-btn';
    button.textContent = 'N° COMMESSA';
    button.title = 'Apri direttamente la commessa preparata dall’Ufficio';
    button.addEventListener('click', function () {
      return searchGenericCommessa(button);
    });
    cell.appendChild(button);
    input.dataset.pwOutcomeCommessa = String(input.value || '').trim().toUpperCase().replace(/\s+/g, ' ');
    input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        button.click();
      }
    });
    input.addEventListener('input', function () {
      var current = String(input.value || '').trim().toUpperCase().replace(/\s+/g, ' ');
      if (current !== input.dataset.pwOutcomeCommessa) {
        var _document$getElementB;
        clearOutcomeSelections();
        var type = String(((_document$getElementB = document.getElementById('formType')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value) || '').trim();
        window.PWCollaudoBlankOutcomeKey = current && type ? "".concat(type, "::").concat(current) : '';
        input.dataset.pwOutcomeCommessa = current;
      }
      unlockType();
    }, true);
  }
  var style = document.createElement('style');
  style.textContent = ".pw-commessa-search-cell{display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;gap:6px!important;align-items:center!important}.pw-commessa-search-cell .pw-commessa-input{min-width:0!important;width:100%!important}.pw-commessa-search-btn{white-space:nowrap;min-height:34px;padding:6px 10px!important;font-size:11px!important;font-weight:700!important;background:#c7a044!important;color:#111!important;border:1px solid #c7a044!important;border-radius:6px!important}@media(max-width:700px){.pw-commessa-search-btn{min-height:38px;padding:7px 9px!important}}@media print{.pw-commessa-search-btn{display:none!important}.pw-commessa-search-cell{display:block!important}}";
  document.head.appendChild(style);
  installSearchButton();
  setTimeout(installSearchButton, 0);
  (_document$getElementB2 = document.getElementById('formType')) === null || _document$getElementB2 === void 0 || _document$getElementB2.addEventListener('change', function () {
    return setTimeout(installSearchButton, 0);
  });
  var observer = new MutationObserver(installSearchButton);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  if (!document.querySelector('script[data-pw-draft-chain]')) {
    var chain = document.createElement('script');
    chain.src = 'draft-chain.js?v=1';
    chain.async = false;
    chain.dataset.pwDraftChain = '1';
    document.head.appendChild(chain);
  }
})();