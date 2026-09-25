function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function (_document$getElementB2) {
  var ALU_TYPES = new Set(['alu', 'alu_speciali', 'alu_vie_fuga']);
  var OPERATOR_LIST = ['GHIDONI PIERLUIGI', 'JHINAOUI RIADH', 'ANGELO IDONE', 'APOLLO FRANCESCO', "D'ALESSANDRO DANIELE", 'FURLANI ROBERTO', 'GOZZI ANDREA'];
  var SIGNATURES_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  var CODE_KEY = 'pw-collaudo-access-code';
  var signatures = {};
  var signaturesLoading = false;
  var style = document.createElement('style');
  style.textContent = "\n    .pw-alu-operator-block{margin:8px 0 10px}\n    .pw-alu-operator-select{\n      width:100%;box-sizing:border-box;padding:8px 10px;border:1px solid #bbb;\n      border-radius:6px;background:#fff;font:inherit;font-size:12px;font-weight:600\n    }\n    .pw-alu-signature-plus{\n      min-width:30px;padding:3px 8px!important;font-size:18px!important;\n      line-height:1!important;font-weight:700!important;cursor:pointer!important\n    }\n    @media print{\n      .pw-alu-operator-select{border:.2mm solid #aaa;border-radius:0;padding:1.5mm 2mm}\n      .pw-alu-signature-plus{display:none!important}\n    }\n  ";
  document.head.appendChild(style);
  function escHtml(value) {
    return String(value !== null && value !== void 0 ? value : '').replace(/[&<>"']/g, function (ch) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[ch];
    });
  }
  function currentType() {
    var _document$getElementB;
    return String(((_document$getElementB = document.getElementById('formType')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value) || '');
  }
  function isAluType() {
    return ALU_TYPES.has(currentType());
  }
  function addAluSpecialForm() {
    if (typeof FORMS === 'undefined' || !FORMS.alu) return;
    if (!FORMS.alu_speciali) {
      FORMS.alu_speciali = JSON.parse(JSON.stringify(FORMS.alu));
      FORMS.alu_speciali.title = 'SCHEDA COLLAUDO - ALLUMINIO - PEZZI SPECIALI';
    }
    var formType = document.getElementById('formType');
    if (!formType || formType.querySelector('option[value="alu_speciali"]')) return;
    var option = document.createElement('option');
    option.value = 'alu_speciali';
    option.textContent = 'Alluminio - Pezzi speciali';
    var aluOption = formType.querySelector('option[value="alu"]');
    var fugaOption = formType.querySelector('option[value="alu_vie_fuga"]');
    if (fugaOption) formType.insertBefore(option, fugaOption);else if (aluOption !== null && aluOption !== void 0 && aluOption.nextSibling) formType.insertBefore(option, aluOption.nextSibling);else formType.appendChild(option);
  }
  function loadSignatures() {
    return _loadSignatures.apply(this, arguments);
  }
  function _loadSignatures() {
    _loadSignatures = _asyncToGenerator(_regenerator().m(function _callee2() {
      var code, res, data, _t;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            if (!(signaturesLoading || Object.keys(signatures).length)) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            code = String(localStorage.getItem(CODE_KEY) || '').trim();
            if (code) {
              _context2.n = 2;
              break;
            }
            return _context2.a(2);
          case 2:
            signaturesLoading = true;
            _context2.p = 3;
            _context2.n = 4;
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
          case 4:
            res = _context2.v;
            if (res.ok) {
              _context2.n = 5;
              break;
            }
            return _context2.a(2);
          case 5:
            _context2.n = 6;
            return res.json();
          case 6:
            data = _context2.v;
            signatures = (data === null || data === void 0 ? void 0 : data.signatures) || {};
            _context2.n = 8;
            break;
          case 7:
            _context2.p = 7;
            _t = _context2.v;
            console.error('Caricamento firme operatori alluminio', _t);
          case 8:
            _context2.p = 8;
            signaturesLoading = false;
            return _context2.f(8);
          case 9:
            return _context2.a(2);
        }
      }, _callee2, null, [[3, 7, 8, 9]]);
    }));
    return _loadSignatures.apply(this, arguments);
  }
  function getLocalSavedOperator(type, index) {
    try {
      var _data$fields;
      var raw = localStorage.getItem("pw-collaudo-".concat(type));
      if (!raw) return '';
      var data = JSON.parse(raw);
      var value = String((data === null || data === void 0 || (_data$fields = data.fields) === null || _data$fields === void 0 ? void 0 : _data$fields["phase_operator_".concat(index)]) || '').trim();
      return OPERATOR_LIST.includes(value) ? value : '';
    } catch (_) {
      return '';
    }
  }
  function saveOperator(hiddenInput) {
    var _window$PWCollaudoSyn;
    hiddenInput.dispatchEvent(new Event('input', {
      bubbles: true
    }));
    if (typeof autoSave === 'function') autoSave();
    if ((_window$PWCollaudoSyn = window.PWCollaudoSync) !== null && _window$PWCollaudoSyn !== void 0 && _window$PWCollaudoSyn.queueSave) window.PWCollaudoSync.queueSave(100);
  }
  function clearSignatureFor(index) {
    var key = "phase_sign_".concat(index);
    if (typeof setSignatureImage === 'function') setSignatureImage(key, '');
    var input = document.querySelector("input[data-signature-input=\"".concat(key, "\"]"));
    if (input) input.value = '';
  }
  function applyOperatorSelectors() {
    if (!isAluType()) return;
    var type = currentType();
    document.querySelectorAll('#formArea tbody tr').forEach(function (row, index) {
      var resultBox = row.querySelector('.resultbox');
      if (!resultBox) return;
      if (resultBox.querySelector('.pw-alu-operator-block')) return;
      var signatureLabel = Array.from(resultBox.querySelectorAll('label')).find(function (label) {
        return (label.textContent || '').trim().toLowerCase() === 'firma operatore';
      });
      if (!signatureLabel) return;
      var fieldName = "phase_operator_".concat(index);
      var saved = getLocalSavedOperator(type, index);
      var block = document.createElement('div');
      block.className = 'pw-alu-operator-block';
      block.dataset.operatorIndex = String(index);
      block.innerHTML = "\n        <label>Operatore associato</label>\n        <select class=\"pw-alu-operator-select\" aria-label=\"Scegli operatore\">\n          <option value=\"\">Scegli operatore</option>\n          ".concat(OPERATOR_LIST.map(function (name) {
        return "<option value=\"".concat(escHtml(name), "\"").concat(name === saved ? ' selected' : '', ">").concat(escHtml(name), "</option>");
      }).join(''), "\n        </select>\n        <input type=\"hidden\" data-field=\"").concat(fieldName, "\" value=\"").concat(escHtml(saved), "\">\n      ");
      var select = block.querySelector('.pw-alu-operator-select');
      var hidden = block.querySelector("input[data-field=\"".concat(fieldName, "\"]"));
      select.addEventListener('change', function () {
        hidden.value = select.value || '';
        clearSignatureFor(index);
        saveOperator(hidden);
      });
      resultBox.insertBefore(block, signatureLabel);
    });
  }
  function addSignatureButtons() {
    if (!isAluType()) return;
    document.querySelectorAll('#formArea tbody tr').forEach(function (row, index) {
      var resultBox = row.querySelector('.resultbox');
      var actions = resultBox === null || resultBox === void 0 ? void 0 : resultBox.querySelector('.signature-actions');
      if (!actions || actions.querySelector('.pw-alu-signature-plus')) return;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pw-alu-signature-plus';
      btn.textContent = '+';
      btn.title = 'Inserisci la firma associata all’operatore scelto';
      btn.setAttribute('aria-label', 'Inserisci firma operatore');
      btn.addEventListener('click', _asyncToGenerator(_regenerator().m(function _callee() {
        var _window$PWCollaudoSyn2;
        var hidden, operator, dataUrl;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              hidden = row.querySelector("input[data-field=\"phase_operator_".concat(index, "\"]"));
              operator = String((hidden === null || hidden === void 0 ? void 0 : hidden.value) || '').trim();
              if (operator) {
                _context.n = 1;
                break;
              }
              alert('Scegli prima un operatore.');
              return _context.a(2);
            case 1:
              if (Object.keys(signatures).length) {
                _context.n = 2;
                break;
              }
              _context.n = 2;
              return loadSignatures();
            case 2:
              dataUrl = signatures[operator] || '';
              if (dataUrl) {
                _context.n = 3;
                break;
              }
              alert("Firma non ancora disponibile per ".concat(operator, "."));
              return _context.a(2);
            case 3:
              if (!(typeof setSignatureImage !== 'function')) {
                _context.n = 4;
                break;
              }
              return _context.a(2);
            case 4:
              setSignatureImage("phase_sign_".concat(index), dataUrl);
              if (typeof autoSave === 'function') autoSave();
              if ((_window$PWCollaudoSyn2 = window.PWCollaudoSync) !== null && _window$PWCollaudoSyn2 !== void 0 && _window$PWCollaudoSyn2.queueSave) window.PWCollaudoSync.queueSave(120);
            case 5:
              return _context.a(2);
          }
        }, _callee);
      })));
      actions.insertBefore(btn, actions.firstChild);
    });
  }
  function syncSavedOperators() {
    if (!isAluType()) return;
    var type = currentType();
    document.querySelectorAll('.pw-alu-operator-block').forEach(function (block) {
      var index = Number(block.dataset.operatorIndex);
      var select = block.querySelector('.pw-alu-operator-select');
      var hidden = block.querySelector("input[data-field=\"phase_operator_".concat(index, "\"]"));
      if (!select || !hidden) return;
      var local = getLocalSavedOperator(type, index);
      var value = OPERATOR_LIST.includes(hidden.value) ? hidden.value : local;
      if (hidden.value !== value) hidden.value = value;
      if (select.value !== value) select.value = value;
    });
  }
  function refresh() {
    addAluSpecialForm();
    if (!isAluType()) return;
    applyOperatorSelectors();
    syncSavedOperators();
    addSignatureButtons();
    loadSignatures();
  }
  addAluSpecialForm();
  refresh();
  setTimeout(refresh, 0);
  (_document$getElementB2 = document.getElementById('formType')) === null || _document$getElementB2 === void 0 || _document$getElementB2.addEventListener('change', function () {
    return setTimeout(refresh, 20);
  });
  setInterval(refresh, 900);
})();