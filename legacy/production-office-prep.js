function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function (_document$getElementB2) {
  var ROLE_KEY = 'pw-collaudo-role';
  var CODE_KEY = 'pw-collaudo-access-code';
  var API = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-office-prep';
  var LOTTO_API = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-office-lotto';
  var LABELS = {
    pvc: 'PVC',
    pvc_speciali: 'PVC - Pezzi speciali',
    pvc_vie_fuga: 'PVC - Vie di fuga',
    alu: 'Alluminio',
    alu_speciali: 'Alluminio - Pezzi speciali',
    alu_vie_fuga: 'Alluminio - Vie di fuga'
  };
  if (String(localStorage.getItem(ROLE_KEY) || '') !== 'production') return;
  var style = document.createElement('style');
  style.textContent = "\n    .pw-office-readonly{margin:12px 0 16px;border:1px solid #d7c183;border-radius:9px;background:#fffaf0;padding:12px 14px}\n    .pw-office-readonly-title{font-weight:700;font-size:13px;margin-bottom:5px}.pw-office-readonly-text{font-size:12px;color:#555;line-height:1.5}\n    .pw-office-readonly-row{margin-top:3px}.pw-office-readonly-row:first-child{margin-top:0}\n    .pw-office-readonly-ddt{margin-top:9px;display:flex;gap:8px;align-items:center;flex-wrap:wrap}.pw-office-readonly-ddt button{border:0;border-radius:7px;background:#111;color:#fff;padding:8px 11px;font-weight:700;cursor:pointer}\n    .pw-office-readonly-ddt .pw-ddt-name{font-size:12px;color:#333;overflow-wrap:anywhere}\n    input.pw-office-locked{background:#f1f1f1!important;color:#444!important;cursor:not-allowed!important}\n    .pw-office-lock-note{display:block;margin-top:4px;font-size:10px;color:#8b6c1e;font-weight:700}\n    @media print{.pw-office-readonly{display:none!important}.pw-office-lock-note{display:none!important}input.pw-office-locked{background:#fff!important;color:#111!important}}\n  ";
  document.head.appendChild(style);
  var currentCommessa = '',
    currentItem = null,
    currentLotto = '',
    timer = 0,
    requestSeq = 0;
  function code() {
    return String(localStorage.getItem(CODE_KEY) || '').trim();
  }
  function commessa() {
    var _document$querySelect;
    return String(((_document$querySelect = document.querySelector('[data-field="commessa"]')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.value) || '').trim().toUpperCase().replace(/\s+/g, ' ');
  }
  function currentType() {
    var _document$getElementB;
    return String(((_document$getElementB = document.getElementById('formType')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value) || '');
  }
  function isEscape() {
    return ['pvc_vie_fuga', 'alu_vie_fuga'].includes(currentType());
  }
  function getPrep(_x) {
    return _getPrep.apply(this, arguments);
  }
  function _getPrep() {
    _getPrep = _asyncToGenerator(_regenerator().m(function _callee(c) {
      var _data, _data2;
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
              body: JSON.stringify({
                action: 'get',
                access_code: code(),
                commessa: c
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
            if (res.ok) {
              _context.n = 6;
              break;
            }
            throw new Error(((_data = data) === null || _data === void 0 ? void 0 : _data.error) || "prep_".concat(res.status));
          case 6:
            return _context.a(2, ((_data2 = data) === null || _data2 === void 0 ? void 0 : _data2.item) || null);
        }
      }, _callee, null, [[2, 4]]);
    }));
    return _getPrep.apply(this, arguments);
  }
  function getLotto(_x2) {
    return _getLotto.apply(this, arguments);
  }
  function _getLotto() {
    _getLotto = _asyncToGenerator(_regenerator().m(function _callee2(c) {
      var _data3, _data4;
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
              body: JSON.stringify({
                action: 'get',
                access_code: code(),
                commessa: c
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
            if (res.ok) {
              _context2.n = 6;
              break;
            }
            throw new Error(((_data3 = data) === null || _data3 === void 0 ? void 0 : _data3.error) || "lotto_".concat(res.status));
          case 6:
            return _context2.a(2, String(((_data4 = data) === null || _data4 === void 0 ? void 0 : _data4.lotto) || ''));
        }
      }, _callee2, null, [[2, 4]]);
    }));
    return _getLotto.apply(this, arguments);
  }
  function lockManiglione() {
    var _currentItem;
    if (!isEscape()) return;
    var input = document.querySelector('input[data-field="extra_0"]');
    if (!input) return;
    var wanted = String(((_currentItem = currentItem) === null || _currentItem === void 0 ? void 0 : _currentItem.maniglione) || '');
    if (input.value !== wanted) {
      input.value = wanted;
      input.dispatchEvent(new Event('input', {
        bubbles: true
      }));
    }
    input.readOnly = true;
    input.setAttribute('aria-readonly', 'true');
    input.classList.add('pw-office-locked');
    input.title = 'Dato gestito esclusivamente dall’Ufficio';
    var row = input.closest('.extra-row');
    if (row && !row.querySelector('.pw-office-lock-note')) {
      var note = document.createElement('span');
      note.className = 'pw-office-lock-note';
      note.textContent = 'Compilato dall’Ufficio · sola lettura';
      input.insertAdjacentElement('afterend', note);
    }
    if (input.dataset.officeLock !== '1') {
      input.dataset.officeLock = '1';
      ['beforeinput', 'paste', 'drop'].forEach(function (ev) {
        return input.addEventListener(ev, function (e) {
          return e.preventDefault();
        });
      });
      input.addEventListener('keydown', function (e) {
        if (!['Tab', 'Shift'].includes(e.key)) e.preventDefault();
      });
      input.addEventListener('input', function () {
        var _currentItem2;
        var v = String(((_currentItem2 = currentItem) === null || _currentItem2 === void 0 ? void 0 : _currentItem2.maniglione) || '');
        if (input.value !== v) input.value = v;
      });
    }
  }
  function ensurePanel() {
    var panel = document.querySelector('.pw-office-readonly');
    var meta = document.querySelector('.meta');
    if (!meta) return null;
    if (!panel) {
      panel = document.createElement('div');
      panel.className = 'pw-office-readonly';
      meta.insertAdjacentElement('afterend', panel);
    }
    return panel;
  }
  function escapeHtml(v) {
    return String(v !== null && v !== void 0 ? v : '').replace(/[&<>"']/g, function (ch) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot',
        "'": '&#039;'
      }[ch];
    });
  }
  function render() {
    var _currentItem3, _currentItem4, _currentItem5, _currentItem6, _currentItem7;
    lockManiglione();
    var panel = ensurePanel();
    if (!panel) return;
    if (!currentCommessa) {
      panel.style.display = 'none';
      return;
    }
    panel.style.display = 'block';
    var itemType = String(((_currentItem3 = currentItem) === null || _currentItem3 === void 0 ? void 0 : _currentItem3.form_type) || currentType()),
      maniglione = String(((_currentItem4 = currentItem) === null || _currentItem4 === void 0 ? void 0 : _currentItem4.maniglione) || ''),
      tipologia = String(((_currentItem5 = currentItem) === null || _currentItem5 === void 0 ? void 0 : _currentItem5.tipologia) || ''),
      ddt = String(((_currentItem6 = currentItem) === null || _currentItem6 === void 0 ? void 0 : _currentItem6.ddt_name) || '');
    var size = (_currentItem7 = currentItem) !== null && _currentItem7 !== void 0 && _currentItem7.ddt_size ? " \xB7 ".concat((Number(currentItem.ddt_size) / 1024 / 1024).toFixed(2), " MB") : '';
    var escape = ['pvc_vie_fuga', 'alu_vie_fuga'].includes(itemType);
    var html = "<div class=\"pw-office-readonly-title\">Dati Ufficio \xB7 sola lettura</div><div class=\"pw-office-readonly-text\"><div class=\"pw-office-readonly-row\">Tipo collaudo: <b>".concat(escapeHtml(LABELS[itemType] || itemType || '-'), "</b></div><div class=\"pw-office-readonly-row\">Numero lotto: <b>").concat(escapeHtml(currentLotto || 'non ancora inserito'), "</b></div>").concat(escape ? "<div class=\"pw-office-readonly-row\">Tipologia: <b>".concat(escapeHtml(tipologia || 'non ancora inserita'), "</b></div><div class=\"pw-office-readonly-row\">Maniglione: <b>").concat(escapeHtml(maniglione || 'non ancora inserito'), "</b></div>") : '', "</div><div class=\"pw-office-readonly-ddt\">").concat(ddt ? "<span class=\"pw-ddt-name\">DDT: <b>".concat(escapeHtml(ddt), "</b>").concat(size, "</span><button type=\"button\" class=\"pw-open-ddt\">Apri DDT</button>") : '<span class="pw-ddt-name">Nessun DDT allegato dall’Ufficio.</span>', "</div>");
    if (panel.dataset.renderKey !== html) {
      var _panel$querySelector;
      panel.innerHTML = html;
      panel.dataset.renderKey = html;
      (_panel$querySelector = panel.querySelector('.pw-open-ddt')) === null || _panel$querySelector === void 0 || _panel$querySelector.addEventListener('click', openDdt);
    }
  }
  function openDdt() {
    return _openDdt.apply(this, arguments);
  }
  function _openDdt() {
    _openDdt = _asyncToGenerator(_regenerator().m(function _callee3() {
      var _currentItem8;
      var popup, res, blob, url, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (!(!currentCommessa || !((_currentItem8 = currentItem) !== null && _currentItem8 !== void 0 && _currentItem8.ddt_name))) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2);
          case 1:
            popup = window.open('', '_blank');
            _context3.p = 2;
            _context3.n = 3;
            return fetch(API, {
              method: 'POST',
              cache: 'no-store',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                action: 'download_ddt',
                access_code: code(),
                commessa: currentCommessa,
                download: false
              })
            });
          case 3:
            res = _context3.v;
            if (res.ok) {
              _context3.n = 4;
              break;
            }
            throw new Error('ddt_download_failed');
          case 4:
            _context3.n = 5;
            return res.blob();
          case 5:
            blob = _context3.v;
            url = URL.createObjectURL(blob);
            if (popup) popup.location.href = url;else window.open(url, '_blank');
            setTimeout(function () {
              return URL.revokeObjectURL(url);
            }, 60000);
            _context3.n = 7;
            break;
          case 6:
            _context3.p = 6;
            _t3 = _context3.v;
            if (popup) popup.close();
            console.error(_t3);
            alert('Non è stato possibile aprire il DDT.');
          case 7:
            return _context3.a(2);
        }
      }, _callee3, null, [[2, 6]]);
    }));
    return _openDdt.apply(this, arguments);
  }
  function load() {
    return _load.apply(this, arguments);
  }
  function _load() {
    _load = _asyncToGenerator(_regenerator().m(function _callee4() {
      var force,
        c,
        seq,
        _window$PWCollaudoSyn,
        _yield$Promise$all,
        _yield$Promise$all2,
        item,
        lotto,
        _args4 = arguments,
        _t4;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            force = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : false;
            c = commessa();
            if (c) {
              _context4.n = 1;
              break;
            }
            currentCommessa = '';
            currentItem = null;
            currentLotto = '';
            render();
            return _context4.a(2);
          case 1:
            if (!(!force && c === currentCommessa)) {
              _context4.n = 2;
              break;
            }
            render();
            return _context4.a(2);
          case 2:
            currentCommessa = c;
            seq = ++requestSeq;
            _context4.p = 3;
            _context4.n = 4;
            return Promise.all([getPrep(c), getLotto(c)]);
          case 4:
            _yield$Promise$all = _context4.v;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
            item = _yield$Promise$all2[0];
            lotto = _yield$Promise$all2[1];
            if (!(seq !== requestSeq)) {
              _context4.n = 5;
              break;
            }
            return _context4.a(2);
          case 5:
            currentItem = item;
            currentLotto = lotto;
            render();
            if ((_window$PWCollaudoSyn = window.PWCollaudoSync) !== null && _window$PWCollaudoSyn !== void 0 && _window$PWCollaudoSyn.queueSave && isEscape()) window.PWCollaudoSync.queueSave(120);
            _context4.n = 8;
            break;
          case 6:
            _context4.p = 6;
            _t4 = _context4.v;
            if (!(seq !== requestSeq)) {
              _context4.n = 7;
              break;
            }
            return _context4.a(2);
          case 7:
            console.error('Dati Ufficio', _t4);
            currentItem = null;
            currentLotto = '';
            render();
          case 8:
            return _context4.a(2);
        }
      }, _callee4, null, [[3, 6]]);
    }));
    return _load.apply(this, arguments);
  }
  function bind() {
    var field = document.querySelector('[data-field="commessa"]');
    if (field && field.dataset.officePrepWatch !== '1') {
      field.dataset.officePrepWatch = '1';
      field.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          return load(true);
        }, 350);
      });
      field.addEventListener('change', function () {
        return load(true);
      });
      field.addEventListener('blur', function () {
        return load(true);
      });
    }
    lockManiglione();
  }
  function refresh() {
    bind();
    load(false);
    render();
  }
  (_document$getElementB2 = document.getElementById('formType')) === null || _document$getElementB2 === void 0 || _document$getElementB2.addEventListener('change', function () {
    currentItem = null;
    setTimeout(function () {
      return load(true);
    }, 100);
  });
  var observer = new MutationObserver(function () {
    bind();
    lockManiglione();
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  refresh();
  setInterval(refresh, 900);
})();