function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var ROLE_KEY = 'pw-collaudo-role';
  var DEPT_CODE_KEY = 'pw-collaudo-access-code';
  var OFFICE_LOCAL_KEY = 'pw-collaudo-office-code';
  var OFFICE_SESSION_KEY = 'pw-collaudo-office-code-session';
  var API = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-office-prep';
  var LOTTO_API = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-office-lotto';
  var ESCAPE_TYPES = new Set(['pvc_vie_fuga', 'alu_vie_fuga']);
  var ESCAPE_ARTICLES = {
    '1 anta': ['Art. 455/T', 'Art. 403/T', 'Art. 1100/1/R', 'Art. 1090'],
    '2 ante': ['Art. 450/T', 'Art. 402/T', 'Art. 455/T', 'Art. 403/T', 'Art. 1100/1/R', 'Art. 1090']
  };
  if (String(localStorage.getItem(ROLE_KEY) || '') !== 'office') return;
  document.body.classList.add('pw-role-office');
  var style = document.createElement('style');
  style.textContent = "\n    body.pw-role-office .sheet,\n    body.pw-role-office .pw-complete-archive-btn{display:none!important}\n    body.pw-role-office .topbar>strong,\n    body.pw-role-office .topbar>select,\n    body.pw-role-office .topbar>button:not(.pw-archive-btn):not(.pw-office-top-switch){display:none!important}\n    body.pw-role-office .topbar{justify-content:flex-end!important;gap:10px!important;min-height:56px}\n    body.pw-role-office .pw-archive-btn{display:inline-flex!important}\n    .pw-office-top-switch{border:0!important;border-radius:8px!important;padding:9px 12px!important;font-weight:700!important;cursor:pointer!important;background:#c7a044!important;color:#111!important}\n    .pw-office-prep{max-width:980px;margin:26px auto;padding:0 18px 30px;box-sizing:border-box}\n    .pw-office-prep-card{background:#fff;border:1px solid #ddd;border-radius:14px;box-shadow:0 8px 28px rgba(0,0,0,.08);padding:22px}\n    .pw-office-prep h2{margin:0 0 5px;font-size:22px}.pw-office-prep .sub{color:#666;font-size:13px;margin-bottom:20px;line-height:1.45}\n    .pw-office-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.pw-office-field label{display:block;font-size:12px;font-weight:700;margin-bottom:6px}\n    .pw-office-field input,.pw-office-field select{width:100%;box-sizing:border-box;border:1px solid #bbb;border-radius:8px;padding:11px 12px;font-size:14px;background:#fff}\n    .pw-office-escape-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px}.pw-office-escape-row[hidden]{display:none!important}\n    .pw-office-actions{display:flex;gap:9px;align-items:center;flex-wrap:wrap;margin-top:16px}\n    .pw-office-actions button,.pw-ddt-actions button{border:0;border-radius:8px;padding:10px 13px;font-weight:700;cursor:pointer}\n    .pw-office-save,.pw-ddt-add,.pw-ddt-replace{background:#c7a044;color:#111}.pw-office-load,.pw-ddt-open{background:#111;color:#fff}.pw-ddt-delete{background:#fff1f0;color:#a31818;border:1px solid #dba6a2!important}\n    .pw-office-status{font-size:12px;color:#555;min-height:18px;margin-top:8px}.pw-office-status.err{color:#a31818}\n    .pw-ddt-box{margin-top:20px;border:1px dashed #bbb;border-radius:10px;padding:15px;background:#fafafa}\n    .pw-ddt-title{font-size:13px;font-weight:700;margin-bottom:7px}.pw-ddt-meta{font-size:12px;color:#555;margin-bottom:10px}.pw-ddt-actions{display:flex;gap:8px;flex-wrap:wrap}\n    @media(max-width:700px){.pw-office-grid,.pw-office-escape-row{grid-template-columns:1fr}.pw-office-prep{margin-top:14px;padding:0 10px 24px}.pw-office-prep-card{padding:16px}.pw-office-actions button,.pw-ddt-actions button{width:100%;min-height:42px}}\n  ";
  document.head.appendChild(style);
  function changeAccess() {
    if (!confirm('Vuoi uscire dall’area Ufficio e inserire un altro codice di accesso?')) return;
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(DEPT_CODE_KEY);
    localStorage.removeItem(OFFICE_LOCAL_KEY);
    sessionStorage.removeItem(OFFICE_SESSION_KEY);
    location.replace(location.pathname + '?access=' + Date.now());
  }
  function installOfficeTopbar() {
    var topbar = document.querySelector('.topbar');
    if (!topbar) return;
    var archive = topbar.querySelector('.pw-archive-btn');
    if (archive) archive.textContent = 'Archivio ufficio';
    if (!topbar.querySelector('.pw-office-top-switch')) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pw-office-top-switch';
      btn.textContent = 'Cambia accesso';
      btn.addEventListener('click', changeAccess);
      topbar.appendChild(btn);
    }
  }
  installOfficeTopbar();
  setTimeout(installOfficeTopbar, 200);
  var wrap = document.createElement('div');
  wrap.className = 'pw-office-prep';
  wrap.innerHTML = "\n    <div class=\"pw-office-prep-card\">\n      <h2>Preparazione commessa</h2>\n      <div class=\"sub\">Seleziona prima il reparto/tipo di collaudo e inserisci il numero di commessa. In Produzione sar\xE0 sufficiente cercare il numero di commessa: il sistema aprir\xE0 automaticamente la scheda corretta e caricher\xE0 i dati Ufficio in sola lettura.</div>\n      <div class=\"pw-office-grid\">\n        <div class=\"pw-office-field\"><label>TIPO DI COLLAUDO</label><select id=\"pwOfficeFormType\"><option value=\"\">Seleziona tipo</option><option value=\"pvc\">PVC</option><option value=\"pvc_speciali\">PVC - Pezzi speciali</option><option value=\"pvc_vie_fuga\">PVC - Vie di fuga</option><option value=\"alu\">Alluminio</option><option value=\"alu_speciali\">Alluminio - Pezzi speciali</option><option value=\"alu_vie_fuga\">Alluminio - Vie di fuga</option></select></div>\n        <div class=\"pw-office-field\"><label>NUMERO DI COMMESSA</label><input id=\"pwOfficeCommessa\" type=\"text\" autocomplete=\"off\" placeholder=\"Es. 2222\"></div>\n        <div class=\"pw-office-field\"><label>NUMERO LOTTO</label><input id=\"pwOfficeLotto\" type=\"text\" autocomplete=\"off\" placeholder=\"Inserisci numero lotto\"></div>\n      </div>\n      <div class=\"pw-office-escape-row\" id=\"pwOfficeEscapeRow\" hidden>\n        <div class=\"pw-office-field\"><label>TIPOLOGIA</label><select id=\"pwOfficeTipologia\"><option value=\"\">Seleziona tipologia</option><option value=\"1 anta\">1 anta</option><option value=\"2 ante\">2 ante</option></select></div>\n        <div class=\"pw-office-field\"><label>MANIGLIONE</label><input id=\"pwOfficeManiglione\" type=\"text\" autocomplete=\"off\" readonly aria-readonly=\"true\" placeholder=\"Seleziona prima 1 anta o 2 ante\"></div>\n      </div>\n      <div class=\"pw-office-actions\"><button type=\"button\" class=\"pw-office-load\" id=\"pwOfficeLoad\">Carica commessa</button><button type=\"button\" class=\"pw-office-save\" id=\"pwOfficeSave\">Salva dati Ufficio</button></div>\n      <div class=\"pw-office-status\" id=\"pwOfficeStatus\"></div>\n      <div class=\"pw-ddt-box\"><div class=\"pw-ddt-title\">DDT <span style=\"font-weight:400\">(facoltativo)</span></div><div class=\"pw-ddt-meta\" id=\"pwDdtMeta\">Nessun DDT allegato.</div><div class=\"pw-ddt-actions\" id=\"pwDdtActions\"><button type=\"button\" class=\"pw-ddt-add\" id=\"pwDdtAdd\">+ Allega DDT</button></div><input id=\"pwDdtFile\" type=\"file\" accept=\"application/pdf,image/*\" hidden></div>\n    </div>";
  var topbar = document.querySelector('.topbar');
  if (topbar !== null && topbar !== void 0 && topbar.parentNode) topbar.insertAdjacentElement('afterend', wrap);else document.body.prepend(wrap);
  var formTypeEl = wrap.querySelector('#pwOfficeFormType');
  var commessaEl = wrap.querySelector('#pwOfficeCommessa');
  var lottoEl = wrap.querySelector('#pwOfficeLotto');
  var escapeRow = wrap.querySelector('#pwOfficeEscapeRow');
  var tipologiaEl = wrap.querySelector('#pwOfficeTipologia');
  var maniglioneEl = wrap.querySelector('#pwOfficeManiglione');
  var statusEl = wrap.querySelector('#pwOfficeStatus');
  var ddtMeta = wrap.querySelector('#pwDdtMeta');
  var ddtActions = wrap.querySelector('#pwDdtActions');
  var fileEl = wrap.querySelector('#pwDdtFile');
  var current = null,
    loadTimer = 0;
  function officeCode() {
    var code = String(localStorage.getItem(OFFICE_LOCAL_KEY) || sessionStorage.getItem(OFFICE_SESSION_KEY) || '').trim();
    if (code && !sessionStorage.getItem(OFFICE_SESSION_KEY)) sessionStorage.setItem(OFFICE_SESSION_KEY, code);
    return code;
  }
  function commessa() {
    return String(commessaEl.value || '').trim().toUpperCase().replace(/\s+/g, ' ');
  }
  function lotto() {
    return String(lottoEl.value || '').trim();
  }
  function formType() {
    return String(formTypeEl.value || '').trim();
  }
  function isEscape() {
    return ESCAPE_TYPES.has(formType());
  }
  function setStatus(text) {
    var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    statusEl.textContent = text || '';
    statusEl.classList.toggle('err', !!error);
  }
  function automaticArticles() {
    return (ESCAPE_ARTICLES[String(tipologiaEl.value || '')] || []).join(' · ');
  }
  function updateAutomaticArticles() {
    maniglioneEl.value = isEscape() ? automaticArticles() : '';
  }
  function updateConditionalFields() {
    var yes = isEscape();
    escapeRow.hidden = !yes;
    if (!yes) {
      tipologiaEl.value = '';
      maniglioneEl.value = '';
    } else {
      updateAutomaticArticles();
    }
  }
  function call(_x) {
    return _call.apply(this, arguments);
  }
  function _call() {
    _call = _asyncToGenerator(_regenerator().m(function _callee(body) {
      var _data;
      var res, data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.n = 1;
            return fetch(API, {
              method: 'POST',
              cache: 'no-store',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(_objectSpread(_objectSpread({}, body), {}, {
                access_code: officeCode()
              }))
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
            if (res.ok) {
              _context.n = 6;
              break;
            }
            throw new Error(((_data = data) === null || _data === void 0 ? void 0 : _data.error) || "request_".concat(res.status));
          case 6:
            return _context.a(2, data);
        }
      }, _callee, null, [[2, 4]]);
    }));
    return _call.apply(this, arguments);
  }
  function callLotto(_x2) {
    return _callLotto.apply(this, arguments);
  }
  function _callLotto() {
    _callLotto = _asyncToGenerator(_regenerator().m(function _callee2(body) {
      var _data2;
      var res, data, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.n = 1;
            return fetch(LOTTO_API, {
              method: 'POST',
              cache: 'no-store',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(_objectSpread(_objectSpread({}, body), {}, {
                access_code: officeCode()
              }))
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
            if (res.ok) {
              _context2.n = 6;
              break;
            }
            throw new Error(((_data2 = data) === null || _data2 === void 0 ? void 0 : _data2.error) || "lotto_".concat(res.status));
          case 6:
            return _context2.a(2, data);
        }
      }, _callee2, null, [[2, 4]]);
    }));
    return _callLotto.apply(this, arguments);
  }
  function renderDdt(item) {
    current = item || null;
    var name = String((item === null || item === void 0 ? void 0 : item.ddt_name) || '');
    if (!name) {
      ddtMeta.textContent = 'Nessun DDT allegato.';
      ddtActions.innerHTML = '<button type="button" class="pw-ddt-add" id="pwDdtAdd">+ Allega DDT</button>';
      ddtActions.querySelector('#pwDdtAdd').addEventListener('click', function () {
        return fileEl.click();
      });
      return;
    }
    var size = item !== null && item !== void 0 && item.ddt_size ? " \xB7 ".concat((Number(item.ddt_size) / 1024 / 1024).toFixed(2), " MB") : '';
    ddtMeta.textContent = "".concat(name).concat(size);
    ddtActions.innerHTML = '<button type="button" class="pw-ddt-open">Apri DDT</button><button type="button" class="pw-ddt-replace">Sostituisci</button><button type="button" class="pw-ddt-delete">Elimina</button>';
    ddtActions.querySelector('.pw-ddt-open').addEventListener('click', openDdt);
    ddtActions.querySelector('.pw-ddt-replace').addEventListener('click', function () {
      return fileEl.click();
    });
    ddtActions.querySelector('.pw-ddt-delete').addEventListener('click', deleteDdt);
  }
  function load() {
    return _load.apply(this, arguments);
  }
  function _load() {
    _load = _asyncToGenerator(_regenerator().m(function _callee3() {
      var c, data, item, lot, _t3, _t4;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            c = commessa();
            if (c) {
              _context3.n = 1;
              break;
            }
            setStatus('Inserisci il numero di commessa.', true);
            return _context3.a(2);
          case 1:
            commessaEl.value = c;
            setStatus('Caricamento…');
            _context3.p = 2;
            _context3.n = 3;
            return call({
              action: 'get',
              commessa: c
            });
          case 3:
            data = _context3.v;
            item = (data === null || data === void 0 ? void 0 : data.item) || null;
            if (item !== null && item !== void 0 && item.form_type) formTypeEl.value = item.form_type;
            tipologiaEl.value = String((item === null || item === void 0 ? void 0 : item.tipologia) || '');
            updateConditionalFields();
            renderDdt(item);
            _context3.p = 4;
            _context3.n = 5;
            return callLotto({
              action: 'get',
              commessa: c
            });
          case 5:
            lot = _context3.v;
            lottoEl.value = String((lot === null || lot === void 0 ? void 0 : lot.lotto) || '');
            _context3.n = 7;
            break;
          case 6:
            _context3.p = 6;
            _t3 = _context3.v;
            console.error('Numero lotto', _t3);
            lottoEl.value = '';
          case 7:
            setStatus(item ? 'Dati Ufficio caricati.' : 'Commessa nuova: seleziona il tipo di collaudo e compila i dati.');
            _context3.n = 9;
            break;
          case 8:
            _context3.p = 8;
            _t4 = _context3.v;
            console.error(_t4);
            setStatus('Non è stato possibile caricare la commessa.', true);
          case 9:
            return _context3.a(2);
        }
      }, _callee3, null, [[4, 6], [2, 8]]);
    }));
    return _load.apply(this, arguments);
  }
  function save() {
    return _save.apply(this, arguments);
  }
  function _save() {
    _save = _asyncToGenerator(_regenerator().m(function _callee4() {
      var c, t, data, _t5, _t6;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            c = commessa(), t = formType();
            if (c) {
              _context4.n = 1;
              break;
            }
            setStatus('Inserisci il numero di commessa.', true);
            return _context4.a(2);
          case 1:
            if (t) {
              _context4.n = 2;
              break;
            }
            setStatus('Seleziona il tipo di collaudo.', true);
            formTypeEl.focus();
            return _context4.a(2);
          case 2:
            if (!(isEscape() && !tipologiaEl.value)) {
              _context4.n = 3;
              break;
            }
            setStatus('Per le vie di fuga seleziona la tipologia: 1 anta o 2 ante.', true);
            tipologiaEl.focus();
            return _context4.a(2);
          case 3:
            commessaEl.value = c;
            setStatus('Salvataggio…');
            _context4.p = 4;
            _context4.n = 5;
            return call({
              action: 'save',
              commessa: c,
              form_type: t,
              tipologia: isEscape() ? tipologiaEl.value : '',
              maniglione: isEscape() ? maniglioneEl.value : ''
            });
          case 5:
            data = _context4.v;
            renderDdt((data === null || data === void 0 ? void 0 : data.item) || current);
            _context4.p = 6;
            _context4.n = 7;
            return callLotto({
              action: 'save',
              commessa: c,
              lotto: lotto()
            });
          case 7:
            _context4.n = 9;
            break;
          case 8:
            _context4.p = 8;
            _t5 = _context4.v;
            console.error('Numero lotto', _t5);
            setStatus('Dati Ufficio salvati, ma il numero lotto non è stato salvato.', true);
            return _context4.a(2);
          case 9:
            setStatus('Dati Ufficio salvati. In Produzione basta cercare questa commessa.');
            _context4.n = 11;
            break;
          case 10:
            _context4.p = 10;
            _t6 = _context4.v;
            console.error(_t6);
            setStatus('Non è stato possibile salvare.', true);
          case 11:
            return _context4.a(2);
        }
      }, _callee4, null, [[6, 8], [4, 10]]);
    }));
    return _save.apply(this, arguments);
  }
  function fileBase64(file) {
    return new Promise(function (resolve, reject) {
      var r = new FileReader();
      r.onload = function () {
        return resolve(String(r.result || '').split(',')[1] || '');
      };
      r.onerror = reject;
      r.readAsDataURL(file);
    });
  }
  function uploadDdt(_x3) {
    return _uploadDdt.apply(this, arguments);
  }
  function _uploadDdt() {
    _uploadDdt = _asyncToGenerator(_regenerator().m(function _callee5(file) {
      var c, t, b64, data, _t7;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            c = commessa(), t = formType();
            if (!(!c || !t)) {
              _context5.n = 1;
              break;
            }
            setStatus('Inserisci commessa e tipo di collaudo prima di allegare il DDT.', true);
            fileEl.value = '';
            return _context5.a(2);
          case 1:
            if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
              _context5.n = 2;
              break;
            }
            setStatus('Il DDT deve essere un PDF o un’immagine.', true);
            fileEl.value = '';
            return _context5.a(2);
          case 2:
            if (!(file.size > 15 * 1024 * 1024)) {
              _context5.n = 3;
              break;
            }
            setStatus('Il DDT supera il limite di 15 MB.', true);
            fileEl.value = '';
            return _context5.a(2);
          case 3:
            setStatus('Caricamento DDT…');
            _context5.p = 4;
            _context5.n = 5;
            return fileBase64(file);
          case 5:
            b64 = _context5.v;
            _context5.n = 6;
            return call({
              action: 'upload_ddt',
              commessa: c,
              form_type: t,
              tipologia: isEscape() ? tipologiaEl.value : '',
              maniglione: isEscape() ? maniglioneEl.value : '',
              file_name: file.name,
              file_type: file.type,
              file_base64: b64
            });
          case 6:
            data = _context5.v;
            renderDdt((data === null || data === void 0 ? void 0 : data.item) || null);
            setStatus('DDT allegato correttamente.');
            _context5.n = 8;
            break;
          case 7:
            _context5.p = 7;
            _t7 = _context5.v;
            console.error(_t7);
            setStatus('Non è stato possibile allegare il DDT.', true);
          case 8:
            _context5.p = 8;
            fileEl.value = '';
            return _context5.f(8);
          case 9:
            return _context5.a(2);
        }
      }, _callee5, null, [[4, 7, 8, 9]]);
    }));
    return _uploadDdt.apply(this, arguments);
  }
  function openDdt() {
    return _openDdt.apply(this, arguments);
  }
  function _openDdt() {
    _openDdt = _asyncToGenerator(_regenerator().m(function _callee6() {
      var c, popup, res, blob, url, _t8;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            c = commessa();
            if (c) {
              _context6.n = 1;
              break;
            }
            return _context6.a(2);
          case 1:
            popup = window.open('', '_blank');
            _context6.p = 2;
            _context6.n = 3;
            return fetch(API, {
              method: 'POST',
              cache: 'no-store',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                action: 'download_ddt',
                access_code: officeCode(),
                commessa: c,
                download: false
              })
            });
          case 3:
            res = _context6.v;
            if (res.ok) {
              _context6.n = 4;
              break;
            }
            throw new Error('download_failed');
          case 4:
            _context6.n = 5;
            return res.blob();
          case 5:
            blob = _context6.v;
            url = URL.createObjectURL(blob);
            if (popup) popup.location.href = url;else window.open(url, '_blank');
            setTimeout(function () {
              return URL.revokeObjectURL(url);
            }, 60000);
            _context6.n = 7;
            break;
          case 6:
            _context6.p = 6;
            _t8 = _context6.v;
            if (popup) popup.close();
            console.error(_t8);
            setStatus('Non è stato possibile aprire il DDT.', true);
          case 7:
            return _context6.a(2);
        }
      }, _callee6, null, [[2, 6]]);
    }));
    return _openDdt.apply(this, arguments);
  }
  function deleteDdt() {
    return _deleteDdt.apply(this, arguments);
  }
  function _deleteDdt() {
    _deleteDdt = _asyncToGenerator(_regenerator().m(function _callee7() {
      var c, data, _t9;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.p = _context7.n) {
          case 0:
            c = commessa();
            if (!(!c || !confirm('Eliminare il DDT allegato a questa commessa?'))) {
              _context7.n = 1;
              break;
            }
            return _context7.a(2);
          case 1:
            setStatus('Eliminazione DDT…');
            _context7.p = 2;
            _context7.n = 3;
            return call({
              action: 'delete_ddt',
              commessa: c
            });
          case 3:
            data = _context7.v;
            renderDdt((data === null || data === void 0 ? void 0 : data.item) || {
              form_type: formType(),
              tipologia: tipologiaEl.value,
              maniglione: maniglioneEl.value
            });
            setStatus('DDT eliminato.');
            _context7.n = 5;
            break;
          case 4:
            _context7.p = 4;
            _t9 = _context7.v;
            console.error(_t9);
            setStatus('Non è stato possibile eliminare il DDT.', true);
          case 5:
            return _context7.a(2);
        }
      }, _callee7, null, [[2, 4]]);
    }));
    return _deleteDdt.apply(this, arguments);
  }
  formTypeEl.addEventListener('change', updateConditionalFields);
  tipologiaEl.addEventListener('change', updateAutomaticArticles);
  wrap.querySelector('#pwOfficeLoad').addEventListener('click', load);
  wrap.querySelector('#pwOfficeSave').addEventListener('click', save);
  wrap.querySelector('#pwDdtAdd').addEventListener('click', function () {
    return fileEl.click();
  });
  fileEl.addEventListener('change', function () {
    var _fileEl$files;
    var f = (_fileEl$files = fileEl.files) === null || _fileEl$files === void 0 ? void 0 : _fileEl$files[0];
    if (f) uploadDdt(f);
  });
  commessaEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      load();
    }
  });
  commessaEl.addEventListener('input', function () {
    clearTimeout(loadTimer);
    loadTimer = setTimeout(function () {
      if (commessa().length >= 2) load();
    }, 700);
  });
  updateConditionalFields();
})();