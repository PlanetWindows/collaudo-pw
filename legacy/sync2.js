function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function (_document$getElementB2) {
  var SYNC_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  var CODE_KEY = 'pw-collaudo-access-code';
  var LOCAL_SCAN_MS = 700;
  var REMOTE_POLL_MS = 3000;
  var activeKey = '';
  var basePayload = null;
  var lastUpdatedAt = '';
  var lastLocalSnapshot = '';
  var localDirty = false;
  var applyingRemote = false;
  var savingRemote = false;
  var loadingRemote = false;
  var codePromptPaused = false;
  var saveTimer = null;
  var loadSeq = 0;
  function setStatus(message) {
    var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2200;
    var el = document.getElementById('status');
    if (!el) return;
    el.textContent = message;
    if (ms > 0) {
      setTimeout(function () {
        if (el.textContent === message) el.textContent = '';
      }, ms);
    }
  }
  function getFormType() {
    var _document$getElementB;
    return ((_document$getElementB = document.getElementById('formType')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value) || '';
  }
  function getCommessa() {
    var _document$querySelect;
    return (((_document$querySelect = document.querySelector('[data-field="commessa"]')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.value) || '').trim();
  }
  function normalizeCommessa(value) {
    return String(value || '').trim().toUpperCase().replace(/\s+/g, ' ');
  }
  function makeKey(type, commessa) {
    return "".concat(type, "::").concat(normalizeCommessa(commessa));
  }
  function getAccessCode() {
    var code = localStorage.getItem(CODE_KEY) || '';
    if (code) return code;
    if (codePromptPaused) return '';
    code = (prompt('Inserisci il codice reparto per condividere le schede Collaudo PW tra i PC:') || '').trim().toUpperCase();
    if (code) localStorage.setItem(CODE_KEY, code);else codePromptPaused = true;
    return code;
  }
  function api(_x) {
    return _api.apply(this, arguments);
  }
  function _api() {
    _api = _asyncToGenerator(_regenerator().m(function _callee(body) {
      var code, res, json, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            code = getAccessCode();
            if (code) {
              _context.n = 1;
              break;
            }
            throw new Error('code_missing');
          case 1:
            _context.n = 2;
            return fetch(SYNC_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(_objectSpread(_objectSpread({}, body), {}, {
                code: code
              }))
            });
          case 2:
            res = _context.v;
            json = {};
            _context.p = 3;
            _context.n = 4;
            return res.json();
          case 4:
            json = _context.v;
            _context.n = 6;
            break;
          case 5:
            _context.p = 5;
            _t = _context.v;
          case 6:
            if (!(res.status === 401 && json.error === 'invalid_code')) {
              _context.n = 7;
              break;
            }
            localStorage.removeItem(CODE_KEY);
            codePromptPaused = true;
            alert('Codice reparto non corretto. Reinseriscilo modificando di nuovo la commessa.');
            throw new Error('invalid_code');
          case 7:
            if (res.ok) {
              _context.n = 8;
              break;
            }
            throw new Error(json.error || "sync_".concat(res.status));
          case 8:
            return _context.a(2, json);
        }
      }, _callee, null, [[3, 5]]);
    }));
    return _api.apply(this, arguments);
  }
  function collectDom() {
    var payload = {
      type: getFormType(),
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
      var key = img.dataset.signature;
      payload.signatures[key] = img.dataset.hasSignature === '1' && img.getAttribute('src') ? img.src : '';
    });
    return payload;
  }
  function stablePayload(payload) {
    if (!payload) return '';
    return JSON.stringify({
      type: payload.type || '',
      fields: payload.fields || {},
      esiti: payload.esiti || {},
      signatures: payload.signatures || {}
    });
  }
  function payloadScore(payload) {
    if (!payload) return 0;
    var score = 0;
    var fields = payload.fields || {};
    Object.entries(fields).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
      if (key !== 'commessa' && String(value || '').trim()) score += 1;
    });
    score += Object.keys(payload.esiti || {}).length;
    score += Object.values(payload.signatures || {}).filter(Boolean).length;
    return score;
  }
  function deepEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  function buildPatch(base, current) {
    if (deepEqual(base, current)) return undefined;
    var baseObj = base && _typeof(base) === 'object' && !Array.isArray(base);
    var curObj = current && _typeof(current) === 'object' && !Array.isArray(current);
    if (!baseObj || !curObj) return current;
    var out = {};
    var keys = new Set([].concat(_toConsumableArray(Object.keys(base || {})), _toConsumableArray(Object.keys(current || {}))));
    var _iterator = _createForOfIteratorHelper(keys),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var key = _step.value;
        if (!(key in current)) {
          out[key] = null;
          continue;
        }
        var diff = buildPatch(base === null || base === void 0 ? void 0 : base[key], current[key]);
        if (diff !== undefined) out[key] = diff;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return Object.keys(out).length ? out : undefined;
  }
  function setSignatureDom(key, dataUrl) {
    var img = document.querySelector("img[data-signature=\"".concat(key, "\"]"));
    var empty = document.querySelector("[data-signature-placeholder=\"".concat(key, "\"]"));
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
  function applyDom(payload) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    if (!payload) return;
    applyingRemote = true;
    try {
      document.querySelectorAll('input[data-field]').forEach(function (el) {
        if (payload.fields && payload.fields[el.dataset.field] !== undefined) {
          var _payload$fields$el$da;
          el.value = (_payload$fields$el$da = payload.fields[el.dataset.field]) !== null && _payload$fields$el$da !== void 0 ? _payload$fields$el$da : '';
        }
      });
      var currentKey = makeKey(getFormType(), getCommessa());
      var keepBlank = !!window.PWCollaudoBlankOutcomeKey && window.PWCollaudoBlankOutcomeKey === currentKey;
      document.querySelectorAll('input[data-group]').forEach(function (el) {
        el.checked = keepBlank ? false : !!(payload.esiti && payload.esiti[el.dataset.group] === el.dataset.value);
      });
      document.querySelectorAll('img[data-signature]').forEach(function (img) {
        var _payload$signatures;
        var saved = ((_payload$signatures = payload.signatures) === null || _payload$signatures === void 0 ? void 0 : _payload$signatures[img.dataset.signature]) || '';
        setSignatureDom(img.dataset.signature, saved);
      });
      var type = getFormType();
      if (type) {
        localStorage.setItem("pw-collaudo-".concat(type), JSON.stringify(payload));
      }
      lastLocalSnapshot = stablePayload(collectDom());
      localDirty = false;
      if (message) setStatus(message);
    } finally {
      applyingRemote = false;
    }
  }
  function resetStateForKey(key) {
    activeKey = key;
    basePayload = null;
    lastUpdatedAt = '';
    lastLocalSnapshot = stablePayload(collectDom());
    localDirty = false;
    clearTimeout(saveTimer);
  }
  function loadCurrent() {
    return _loadCurrent.apply(this, arguments);
  }
  function _loadCurrent() {
    _loadCurrent = _asyncToGenerator(_regenerator().m(function _callee2() {
      var forceApply,
        type,
        commessa,
        key,
        isNewKey,
        seq,
        snapshotBeforeLoad,
        data,
        snapshotNow,
        changedLocallyDuringLoad,
        remotePayload,
        remoteChanged,
        canApply,
        localPayload,
        remoteScore,
        localScore,
        msg,
        _args2 = arguments,
        _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            forceApply = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : false;
            type = getFormType();
            commessa = getCommessa();
            if (!(!type || !commessa)) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            key = makeKey(type, commessa);
            isNewKey = key !== activeKey;
            if (isNewKey) resetStateForKey(key);
            if (!loadingRemote) {
              _context2.n = 2;
              break;
            }
            return _context2.a(2);
          case 2:
            loadingRemote = true;
            seq = ++loadSeq;
            snapshotBeforeLoad = stablePayload(collectDom());
            if (isNewKey) setStatus('Carico la commessa condivisa…', 0);
            _context2.p = 3;
            _context2.n = 4;
            return api({
              action: 'load',
              form_type: type,
              commessa: commessa
            });
          case 4:
            data = _context2.v;
            if (!(seq !== loadSeq || key !== activeKey)) {
              _context2.n = 5;
              break;
            }
            return _context2.a(2);
          case 5:
            snapshotNow = stablePayload(collectDom());
            changedLocallyDuringLoad = snapshotNow !== snapshotBeforeLoad;
            if (data.found) {
              remotePayload = data.payload || {};
              remoteChanged = data.updated_at && data.updated_at !== lastUpdatedAt;
              canApply = !localDirty && !changedLocallyDuringLoad && !savingRemote;
              if (isNewKey) {
                localPayload = collectDom();
                remoteScore = payloadScore(remotePayload);
                localScore = payloadScore(localPayload);
                basePayload = remotePayload;
                lastUpdatedAt = data.updated_at || '';
                if (remoteScore === 0 && localScore > 0) {
                  lastLocalSnapshot = stablePayload(localPayload);
                  localDirty = true;
                  setStatus('Recupero dati locali e sincronizzo…', 0);
                  queueSave(0);
                } else if (canApply) {
                  applyDom(remotePayload, 'Scheda condivisa caricata');
                }
              } else if ((forceApply || remoteChanged) && canApply) {
                basePayload = remotePayload;
                lastUpdatedAt = data.updated_at || '';
                applyDom(remotePayload, 'Aggiornata da un altro PC');
              }
            } else if (isNewKey) {
              basePayload = {};
              lastUpdatedAt = '';
              lastLocalSnapshot = snapshotNow;
              setStatus('Nuova commessa condivisa');
              queueSave(120);
            }
            _context2.n = 7;
            break;
          case 6:
            _context2.p = 6;
            _t2 = _context2.v;
            msg = String((_t2 === null || _t2 === void 0 ? void 0 : _t2.message) || _t2);
            if (msg.includes('code_missing') || msg.includes('invalid_code')) {
              setStatus('Salvataggio online non attivo');
            } else {
              console.error('Collaudo sync load', _t2);
              setStatus('Offline: bozza salvata solo su questo PC');
            }
          case 7:
            _context2.p = 7;
            loadingRemote = false;
            return _context2.f(7);
          case 8:
            return _context2.a(2);
        }
      }, _callee2, null, [[3, 6, 7, 8]]);
    }));
    return _loadCurrent.apply(this, arguments);
  }
  function saveNow() {
    return _saveNow.apply(this, arguments);
  }
  function _saveNow() {
    _saveNow = _asyncToGenerator(_regenerator().m(function _callee3() {
      var type, commessa, key, current, patch, data, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            clearTimeout(saveTimer);
            type = getFormType();
            commessa = getCommessa();
            if (!(!type || !commessa || applyingRemote || savingRemote)) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2);
          case 1:
            if (!(typeof window.PWValidateNcPositions === 'function' && !window.PWValidateNcPositions(false))) {
              _context3.n = 2;
              break;
            }
            return _context3.a(2);
          case 2:
            key = makeKey(type, commessa);
            if (!(key !== activeKey)) {
              _context3.n = 4;
              break;
            }
            resetStateForKey(key);
            _context3.n = 3;
            return loadCurrent(false);
          case 3:
            if (!(key !== activeKey)) {
              _context3.n = 4;
              break;
            }
            return _context3.a(2);
          case 4:
            if (!(basePayload === null)) {
              _context3.n = 6;
              break;
            }
            _context3.n = 5;
            return loadCurrent(false);
          case 5:
            if (!(basePayload === null)) {
              _context3.n = 6;
              break;
            }
            return _context3.a(2);
          case 6:
            current = collectDom();
            patch = buildPatch(basePayload || {}, current);
            if (patch) {
              _context3.n = 7;
              break;
            }
            lastLocalSnapshot = stablePayload(current);
            localDirty = false;
            return _context3.a(2);
          case 7:
            savingRemote = true;
            _context3.p = 8;
            _context3.n = 9;
            return api({
              action: 'save',
              form_type: type,
              commessa: commessa,
              patch: patch
            });
          case 9:
            data = _context3.v;
            if (!(key !== activeKey)) {
              _context3.n = 10;
              break;
            }
            return _context3.a(2);
          case 10:
            basePayload = data.payload || current;
            lastUpdatedAt = data.updated_at || '';
            applyDom(basePayload);
            setStatus('Sincronizzato');
            _context3.n = 12;
            break;
          case 11:
            _context3.p = 11;
            _t3 = _context3.v;
            console.error('Collaudo sync save', _t3);
            localDirty = true;
            setStatus('Offline: bozza salvata solo su questo PC');
          case 12:
            _context3.p = 12;
            savingRemote = false;
            return _context3.f(12);
          case 13:
            return _context3.a(2);
        }
      }, _callee3, null, [[8, 11, 12, 13]]);
    }));
    return _saveNow.apply(this, arguments);
  }
  function queueSave() {
    var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 350;
    if (applyingRemote) return;
    localDirty = true;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveNow, Math.max(0, delay));
  }
  function checkLocalChanges() {
    var type = getFormType();
    var commessa = getCommessa();
    if (!type || !commessa || applyingRemote) return;
    var key = makeKey(type, commessa);
    if (key !== activeKey) {
      codePromptPaused = false;
      resetStateForKey(key);
      loadCurrent(false);
      return;
    }
    if (basePayload === null) return;
    var snapshot = stablePayload(collectDom());
    if (snapshot !== lastLocalSnapshot) {
      lastLocalSnapshot = snapshot;
      queueSave(250);
    }
  }
  document.addEventListener('input', function (e) {
    var el = e.target;
    if (!(el instanceof HTMLInputElement)) return;
    if (el.dataset.field === 'commessa') {
      codePromptPaused = false;
      var type = getFormType();
      var commessa = getCommessa();
      var key = type && commessa ? makeKey(type, commessa) : '';
      if (key && key !== activeKey) {
        resetStateForKey(key);
        setTimeout(function () {
          return loadCurrent(false);
        }, 250);
      }
      return;
    }
    if (el.matches('input[data-field]')) queueSave(250);
  }, true);
  document.addEventListener('change', function (e) {
    var el = e.target;
    if (!(el instanceof HTMLInputElement)) return;
    if (el.matches('input[data-group]')) {
      var key = makeKey(getFormType(), getCommessa());
      if (window.PWCollaudoBlankOutcomeKey === key) window.PWCollaudoBlankOutcomeKey = '';
      queueSave(180);
      return;
    }
    if (el.matches('input[data-field]')) queueSave(180);
  }, true);
  document.addEventListener('click', function (e) {
    var _e$target$closest, _e$target;
    var button = (_e$target$closest = (_e$target = e.target).closest) === null || _e$target$closest === void 0 ? void 0 : _e$target$closest.call(_e$target, 'button');
    if (!button) return;
    var text = (button.textContent || '').toLowerCase();
    if (text.includes('salva bozza')) {
      setTimeout(function () {
        return saveNow();
      }, 0);
    }
  }, true);
  (_document$getElementB2 = document.getElementById('formType')) === null || _document$getElementB2 === void 0 || _document$getElementB2.addEventListener('change', function () {
    activeKey = '';
    basePayload = null;
    lastUpdatedAt = '';
    lastLocalSnapshot = '';
    localDirty = false;
    clearTimeout(saveTimer);
    setTimeout(function () {
      var commessa = getCommessa();
      if (commessa) loadCurrent(false);
    }, 100);
  });
  window.PWCollaudoSync = {
    queueSave: queueSave,
    saveNow: saveNow,
    reload: function reload() {
      return loadCurrent(true);
    }
  };
  setInterval(checkLocalChanges, LOCAL_SCAN_MS);
  setInterval(function () {
    if (getCommessa() && activeKey && !localDirty && !savingRemote && !loadingRemote) {
      loadCurrent(false);
    }
  }, REMOTE_POLL_MS);
  window.addEventListener('online', function () {
    setStatus('Connessione ripristinata');
    loadCurrent(false).then(function () {
      if (localDirty) saveNow();
    });
  });
  setTimeout(function () {
    var commessa = getCommessa();
    if (commessa) {
      var key = makeKey(getFormType(), commessa);
      resetStateForKey(key);
      loadCurrent(false);
    }
  }, 100);
})();