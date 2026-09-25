function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var SIGNATURES_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  var CODE_KEY = 'pw-collaudo-access-code';
  var MOBILE_QUERY = '(max-width: 850px)';
  var signaturesCache = null;
  function isMobile() {
    return window.matchMedia(MOBILE_QUERY).matches;
  }
  function isPvc() {
    var _document$getElementB;
    return String(((_document$getElementB = document.getElementById('formType')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value) || '').startsWith('pvc');
  }
  function getOperator(row, index) {
    var _row$querySelector;
    return String(((_row$querySelector = row.querySelector("input[data-field=\"phase_operator_".concat(index, "\"]"))) === null || _row$querySelector === void 0 ? void 0 : _row$querySelector.value) || '').trim();
  }
  function getOrAskCode() {
    var code = String(localStorage.getItem(CODE_KEY) || '').trim();
    if (code) return code;
    code = String(prompt('Inserisci il codice reparto per caricare le firme operatori:') || '').trim().toUpperCase();
    if (code) localStorage.setItem(CODE_KEY, code);
    return code;
  }
  function fetchSignatures() {
    return _fetchSignatures.apply(this, arguments);
  }
  function _fetchSignatures() {
    _fetchSignatures = _asyncToGenerator(_regenerator().m(function _callee2() {
      var force,
        code,
        _data,
        res,
        data,
        _args2 = arguments,
        _t,
        _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            force = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : false;
            if (!(signaturesCache && !force)) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2, signaturesCache);
          case 1:
            code = getOrAskCode();
            if (code) {
              _context2.n = 2;
              break;
            }
            return _context2.a(2, null);
          case 2:
            _context2.p = 2;
            _context2.n = 3;
            return fetch(SIGNATURES_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                action: 'signatures',
                code: code
              })
            });
          case 3:
            res = _context2.v;
            data = {};
            _context2.p = 4;
            _context2.n = 5;
            return res.json();
          case 5:
            data = _context2.v;
            _context2.n = 7;
            break;
          case 6:
            _context2.p = 6;
            _t = _context2.v;
          case 7:
            if (!(res.status === 401)) {
              _context2.n = 8;
              break;
            }
            localStorage.removeItem(CODE_KEY);
            signaturesCache = null;
            alert('Codice reparto non corretto. Premi di nuovo + e reinseriscilo.');
            return _context2.a(2, null);
          case 8:
            if (res.ok) {
              _context2.n = 9;
              break;
            }
            alert('Non riesco a caricare le firme. Riprova tra un momento.');
            return _context2.a(2, null);
          case 9:
            signaturesCache = ((_data = data) === null || _data === void 0 ? void 0 : _data.signatures) || {};
            return _context2.a(2, signaturesCache);
          case 10:
            _context2.p = 10;
            _t2 = _context2.v;
            console.error('Caricamento firme mobile', _t2);
            alert('Connessione non disponibile. Controlla internet e riprova.');
            return _context2.a(2, null);
        }
      }, _callee2, null, [[4, 6], [2, 10]]);
    }));
    return _fetchSignatures.apply(this, arguments);
  }
  function ensureMarker(row, index, operator) {
    var fieldName = "phase_signature_plus_v3_".concat(index);
    var input = row.querySelector("input[data-field=\"".concat(fieldName, "\"]"));
    if (!input) {
      var _row$querySelector2;
      input = document.createElement('input');
      input.type = 'hidden';
      input.dataset.field = fieldName;
      (_row$querySelector2 = row.querySelector('.resultbox')) === null || _row$querySelector2 === void 0 || _row$querySelector2.appendChild(input);
    }
    input.value = "v3:".concat(operator);
    input.dispatchEvent(new Event('input', {
      bubbles: true
    }));
    return input;
  }
  function showSignature(row, index, operator, dataUrl) {
    var _window$PWCollaudoSyn;
    ensureMarker(row, index, operator);
    var key = "phase_sign_".concat(index);
    if (typeof setSignatureImage === 'function') {
      setSignatureImage(key, dataUrl);
    } else {
      var _img = row.querySelector("img[data-signature=\"".concat(key, "\"]"));
      if (_img) {
        _img.src = dataUrl;
        _img.dataset.hasSignature = '1';
      }
    }
    var preview = row.querySelector('.signature-preview');
    if (preview) preview.classList.remove('pw-signature-awaiting-plus');
    var img = row.querySelector("img[data-signature=\"".concat(key, "\"]"));
    if (img) {
      img.dataset.hasSignature = '1';
      img.style.setProperty('display', 'block', 'important');
      img.style.setProperty('visibility', 'visible', 'important');
      img.style.setProperty('opacity', '1', 'important');
      img.style.setProperty('max-width', '100%', 'important');
      img.style.setProperty('max-height', '100%', 'important');
      img.style.setProperty('object-fit', 'contain', 'important');
    }
    if (typeof autoSave === 'function') autoSave();
    if ((_window$PWCollaudoSyn = window.PWCollaudoSync) !== null && _window$PWCollaudoSyn !== void 0 && _window$PWCollaudoSyn.queueSave) window.PWCollaudoSync.queueSave(120);
  }
  document.addEventListener('click', function () {
    var _ref = _asyncToGenerator(_regenerator().m(function _callee(event) {
      var _event$target$closest, _event$target;
      var button, row, rows, index, operator, oldText, _signatures, signatures, signature, _signatures2;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            button = (_event$target$closest = (_event$target = event.target).closest) === null || _event$target$closest === void 0 ? void 0 : _event$target$closest.call(_event$target, '.pw-signature-plus-proxy');
            if (!(!button || !isMobile() || !isPvc())) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            event.preventDefault();
            event.stopImmediatePropagation();
            row = button.closest('tr');
            if (row) {
              _context.n = 2;
              break;
            }
            return _context.a(2);
          case 2:
            rows = Array.from(document.querySelectorAll('#formArea tbody tr'));
            index = rows.indexOf(row);
            if (!(index < 0)) {
              _context.n = 3;
              break;
            }
            return _context.a(2);
          case 3:
            operator = getOperator(row, index);
            if (operator) {
              _context.n = 4;
              break;
            }
            return _context.a(2);
          case 4:
            button.disabled = true;
            oldText = button.textContent;
            button.textContent = '…';
            _context.p = 5;
            _context.n = 6;
            return fetchSignatures(false);
          case 6:
            signatures = _context.v;
            signature = ((_signatures = signatures) === null || _signatures === void 0 ? void 0 : _signatures[operator]) || '';
            if (signature) {
              _context.n = 8;
              break;
            }
            _context.n = 7;
            return fetchSignatures(true);
          case 7:
            signatures = _context.v;
            signature = ((_signatures2 = signatures) === null || _signatures2 === void 0 ? void 0 : _signatures2[operator]) || '';
          case 8:
            if (signature) {
              _context.n = 9;
              break;
            }
            alert("Firma non ancora disponibile per ".concat(operator, "."));
            return _context.a(2);
          case 9:
            showSignature(row, index, operator, signature);
          case 10:
            _context.p = 10;
            button.disabled = false;
            button.textContent = oldText || '+';
            return _context.f(10);
          case 11:
            return _context.a(2);
        }
      }, _callee, null, [[5,, 10, 11]]);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), true);
  window.addEventListener('pageshow', function () {
    signaturesCache = null;
  });
})();