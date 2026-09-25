function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function (_document$getElementB2) {
  var SYNC_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  var CODE_KEY = 'pw-collaudo-access-code';
  var saveTimer = null;
  var saving = false;
  var pending = false;
  var lastSentSnapshot = '';
  function setStatus(message) {
    var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2600;
    var el = document.getElementById('status');
    if (!el) return;
    el.textContent = message;
    if (ms > 0) {
      setTimeout(function () {
        if (el.textContent === message) el.textContent = '';
      }, ms);
    }
  }
  function getType() {
    var _document$getElementB;
    return ((_document$getElementB = document.getElementById('formType')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value) || '';
  }
  function getCommessa() {
    var _document$querySelect;
    return String(((_document$querySelect = document.querySelector('input[data-field="commessa"]')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.value) || '').trim();
  }
  function collectDraft() {
    var payload = null;
    try {
      if (typeof window.collect === 'function') payload = window.collect();
    } catch (_) {}
    if (!payload || _typeof(payload) !== 'object') {
      payload = {
        type: getType(),
        fields: {},
        esiti: {},
        signatures: {}
      };
      document.querySelectorAll('input[data-field]').forEach(function (el) {
        payload.fields[el.dataset.field] = el.value || '';
      });
      document.querySelectorAll('input[data-group]').forEach(function (el) {
        if (el.checked) payload.esiti[el.dataset.group] = el.dataset.value;
      });
      document.querySelectorAll('img[data-signature]').forEach(function (img) {
        payload.signatures[img.dataset.signature] = img.dataset.hasSignature === '1' && img.getAttribute('src') ? img.src : '';
      });
    }
    payload.workflow_status = 'draft';
    return payload;
  }
  function getCode() {
    var forcePrompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (!forcePrompt) {
      var saved = String(localStorage.getItem(CODE_KEY) || '').trim();
      if (saved) return saved;
    }
    var code = String(prompt('Inserisci il codice reparto Collaudo PW:') || '').trim().toUpperCase();
    if (code) localStorage.setItem(CODE_KEY, code);
    return code;
  }
  function sendDraft(_x, _x2, _x3, _x4) {
    return _sendDraft.apply(this, arguments);
  }
  function _sendDraft() {
    _sendDraft = _asyncToGenerator(_regenerator().m(function _callee(code, type, commessa, payload) {
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
                action: 'save',
                code: code,
                form_type: type,
                commessa: commessa,
                patch: payload
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
    return _sendDraft.apply(this, arguments);
  }
  function saveSharedDraft() {
    return _saveSharedDraft.apply(this, arguments);
  }
  function _saveSharedDraft() {
    _saveSharedDraft = _asyncToGenerator(_regenerator().m(function _callee2() {
      var showMessage,
        force,
        type,
        commessa,
        payload,
        snapshot,
        _data,
        _data2,
        _data3,
        code,
        _yield$sendDraft,
        res,
        data,
        _yield$sendDraft2,
        _args2 = arguments,
        _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            showMessage = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : false;
            force = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;
            clearTimeout(saveTimer);
            type = getType();
            commessa = getCommessa();
            if (!(!type || !commessa)) {
              _context2.n = 1;
              break;
            }
            if (showMessage) setStatus('Inserisci prima la commessa', 2500);
            return _context2.a(2, false);
          case 1:
            payload = collectDraft();
            snapshot = JSON.stringify(payload);
            if (!(!force && snapshot === lastSentSnapshot)) {
              _context2.n = 2;
              break;
            }
            if (showMessage) setStatus('Bozza condivisa già aggiornata', 2200);
            return _context2.a(2, true);
          case 2:
            if (!saving) {
              _context2.n = 3;
              break;
            }
            pending = true;
            return _context2.a(2, false);
          case 3:
            saving = true;
            _context2.p = 4;
            code = getCode(false);
            if (code) {
              _context2.n = 5;
              break;
            }
            return _context2.a(2, false);
          case 5:
            _context2.n = 6;
            return sendDraft(code, type, commessa, payload);
          case 6:
            _yield$sendDraft = _context2.v;
            res = _yield$sendDraft.res;
            data = _yield$sendDraft.data;
            if (!(res.status === 401 && ((_data = data) === null || _data === void 0 ? void 0 : _data.error) === 'invalid_code')) {
              _context2.n = 9;
              break;
            }
            localStorage.removeItem(CODE_KEY);
            code = getCode(true);
            if (code) {
              _context2.n = 7;
              break;
            }
            return _context2.a(2, false);
          case 7:
            _context2.n = 8;
            return sendDraft(code, type, commessa, payload);
          case 8:
            _yield$sendDraft2 = _context2.v;
            res = _yield$sendDraft2.res;
            data = _yield$sendDraft2.data;
          case 9:
            if (res.ok) {
              _context2.n = 10;
              break;
            }
            throw new Error(((_data2 = data) === null || _data2 === void 0 ? void 0 : _data2.error) || "draft_".concat(res.status));
          case 10:
            lastSentSnapshot = snapshot;
            localStorage.setItem("pw-collaudo-".concat(type), JSON.stringify(((_data3 = data) === null || _data3 === void 0 ? void 0 : _data3.payload) || payload));
            if (showMessage) {
              setStatus('Bozza condivisa online — pronta per il collega', 4000);
            }
            return _context2.a(2, true);
          case 11:
            _context2.p = 11;
            _t2 = _context2.v;
            console.error('Salvataggio bozza condivisa', _t2);
            if (showMessage) setStatus('Bozza locale salvata, ma non ancora condivisa online', 4000);
            return _context2.a(2, false);
          case 12:
            _context2.p = 12;
            saving = false;
            if (pending) {
              pending = false;
              scheduleSave(100);
            }
            return _context2.f(12);
          case 13:
            return _context2.a(2);
        }
      }, _callee2, null, [[4, 11, 12, 13]]);
    }));
    return _saveSharedDraft.apply(this, arguments);
  }
  function scheduleSave() {
    var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      return saveSharedDraft(false, false);
    }, delay);
  }
  function renameDraftButtons() {
    document.querySelectorAll('button').forEach(function (button) {
      var text = String(button.textContent || '').trim();
      if (text === 'Salva bozza') button.textContent = 'Salva bozza condivisa';
      if (text === '💾 Salva bozza sul dispositivo') button.textContent = '💾 Salva bozza condivisa';
    });
  }
  var originalSaveDraft = typeof window.saveDraft === 'function' ? window.saveDraft : null;
  if (originalSaveDraft) {
    window.saveDraft = function () {
      var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var result = originalSaveDraft.apply(this, arguments);
      if (show) saveSharedDraft(true, true);else scheduleSave(450);
      return result;
    };
  }
  document.addEventListener('input', function (event) {
    var el = event.target;
    if (!(el instanceof HTMLInputElement)) return;
    if (el.matches('input[data-field], input[data-group]')) scheduleSave(el.dataset.field === 'commessa' ? 650 : 450);
  }, true);
  document.addEventListener('change', function (event) {
    var el = event.target;
    if (!(el instanceof HTMLInputElement)) return;
    if (el.matches('input[data-field], input[data-group]')) scheduleSave(250);
  }, true);
  document.addEventListener('click', function (event) {
    var _event$target$closest, _event$target;
    var button = (_event$target$closest = (_event$target = event.target).closest) === null || _event$target$closest === void 0 ? void 0 : _event$target$closest.call(_event$target, 'button');
    if (!button) return;
    var text = String(button.textContent || '').toLowerCase();
    if (text.includes('salva bozza')) {
      setTimeout(function () {
        return saveSharedDraft(true, true);
      }, 0);
    }
  }, true);
  var signatureObserver = new MutationObserver(function (mutations) {
    if (mutations.some(function (m) {
      return m.target instanceof HTMLImageElement && m.target.matches('img[data-signature]');
    })) {
      scheduleSave(250);
    }
  });
  signatureObserver.observe(document.body, {
    subtree: true,
    attributes: true,
    attributeFilter: ['src', 'data-has-signature']
  });
  renameDraftButtons();
  setTimeout(renameDraftButtons, 0);
  (_document$getElementB2 = document.getElementById('formType')) === null || _document$getElementB2 === void 0 || _document$getElementB2.addEventListener('change', function () {
    lastSentSnapshot = '';
    setTimeout(renameDraftButtons, 0);
  });
  window.PWCollaudoDraftChain = {
    saveNow: function saveNow() {
      return saveSharedDraft(true, true);
    },
    scheduleSave: scheduleSave
  };
})();