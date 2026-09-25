function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';
  document.head.appendChild(fontLink);
  var fontStyle = document.createElement('style');
  fontStyle.textContent = "\n    html, body, body *, input, select, button, textarea {\n      font-family: 'Poppins', Arial, Helvetica, sans-serif !important;\n    }\n    .pw-associated-operator {\n      margin: 8px 0 10px;\n    }\n    .pw-operator-row {\n      display: flex;\n      gap: 5px;\n      align-items: center;\n    }\n    .pw-associated-operator .pw-operator-name {\n      flex: 1;\n      border: 1px solid #bbb;\n      border-radius: 6px;\n      background: #f7f7f7;\n      padding: 8px 10px;\n      font-weight: 600;\n      line-height: 1.2;\n      min-width: 0;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n    .pw-change-operator {\n      flex: 0 0 auto;\n      white-space: nowrap;\n      padding: 3px 6px;\n      font-size: 9px;\n      line-height: 1.1;\n      min-height: 0;\n    }\n    .pw-operator-select {\n      width: 100%;\n      margin-top: 6px;\n      padding: 7px 8px;\n      border: 1px solid #bbb;\n      border-radius: 6px;\n      background: #fff;\n      font-size: 12px;\n    }\n    .pw-use-official-signature {\n      min-width: 30px;\n      padding: 3px 8px !important;\n      font-size: 18px !important;\n      line-height: 1 !important;\n      font-weight: 700;\n      cursor: pointer;\n    }\n    @media print {\n      .pw-associated-operator {\n        margin: 2mm 0 2mm;\n      }\n      .pw-associated-operator .pw-operator-name {\n        border: 0.2mm solid #aaa;\n        border-radius: 0;\n        background: #fff;\n        padding: 1.5mm 2mm;\n        white-space: nowrap;\n        overflow: visible;\n        text-overflow: clip;\n      }\n      .pw-change-operator,\n      .pw-operator-select,\n      .pw-use-official-signature {\n        display: none !important;\n      }\n    }\n  ";
  document.head.appendChild(fontStyle);
  var PVC_OPERATORS = {
    pvc: ['GHIDONI PIERLUIGI', 'GHIDONI PIERLUIGI', 'JHINAOUI RIADH', 'APOLLO FRANCESCO', "D'ALESSANDRO DANIELE", 'GOZZI ANDREA', 'GOZZI ANDREA'],
    pvc_speciali: ['GHIDONI PIERLUIGI', 'GHIDONI PIERLUIGI', 'JHINAOUI RIADH', 'FURLANI ROBERTO', 'FURLANI ROBERTO', 'GOZZI ANDREA', 'GOZZI ANDREA'],
    pvc_vie_fuga: ['GHIDONI PIERLUIGI', 'GHIDONI PIERLUIGI', 'JHINAOUI RIADH', 'FURLANI ROBERTO', 'FURLANI ROBERTO', 'GOZZI ANDREA', 'GOZZI ANDREA']
  };
  var PVC_OPERATOR_LIST = ['GHIDONI PIERLUIGI', 'JHINAOUI RIADH', 'ANGELO IDONE', 'APOLLO FRANCESCO', "D'ALESSANDRO DANIELE", 'FURLANI ROBERTO', 'GOZZI ANDREA'];
  var SIGNATURES_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  var APOLLO_SIGNATURE_FALLBACK = 'apollo-francesco-signature.svg?v=1';
  var CODE_KEY = 'pw-collaudo-access-code';
  var OPERATOR_SIGNATURES = {};
  var signaturesLoading = false;
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
  function loadOperatorSignatures() {
    return _loadOperatorSignatures.apply(this, arguments);
  }
  function _loadOperatorSignatures() {
    _loadOperatorSignatures = _asyncToGenerator(_regenerator().m(function _callee2() {
      var code, res, data, _t;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            if (!(signaturesLoading || Object.keys(OPERATOR_SIGNATURES).length)) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            code = (localStorage.getItem(CODE_KEY) || '').trim();
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
            OPERATOR_SIGNATURES = (data === null || data === void 0 ? void 0 : data.signatures) || {};
            _context2.n = 8;
            break;
          case 7:
            _context2.p = 7;
            _t = _context2.v;
            console.error('Caricamento firme operatori', _t);
          case 8:
            _context2.p = 8;
            signaturesLoading = false;
            return _context2.f(8);
          case 9:
            return _context2.a(2);
        }
      }, _callee2, null, [[3, 7, 8, 9]]);
    }));
    return _loadOperatorSignatures.apply(this, arguments);
  }
  function setOfficialSignature(index, operator) {
    var _window$PWCollaudoSyn;
    var key = "phase_sign_".concat(index);
    var dataUrl = OPERATOR_SIGNATURES[operator] || (operator === 'APOLLO FRANCESCO' ? APOLLO_SIGNATURE_FALLBACK : '');
    if (!dataUrl) {
      alert("Firma non ancora disponibile per ".concat(operator, "."));
      return;
    }
    if (typeof setSignatureImage !== 'function') return;
    setSignatureImage(key, dataUrl);
    if (typeof autoSave === 'function') autoSave();
    if ((_window$PWCollaudoSyn = window.PWCollaudoSync) !== null && _window$PWCollaudoSyn !== void 0 && _window$PWCollaudoSyn.queueSave) window.PWCollaudoSync.queueSave(120);
  }
  function clearPhaseSignature(index) {
    var _window$PWCollaudoSyn2;
    var key = "phase_sign_".concat(index);
    if (typeof setSignatureImage !== 'function') return;
    setSignatureImage(key, '');
    if (typeof autoSave === 'function') autoSave();
    if ((_window$PWCollaudoSyn2 = window.PWCollaudoSync) !== null && _window$PWCollaudoSyn2 !== void 0 && _window$PWCollaudoSyn2.queueSave) window.PWCollaudoSync.queueSave(120);
  }
  function addSignaturePlusButtons() {
    var _document$getElementB;
    var type = ((_document$getElementB = document.getElementById('formType')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value) || '';
    if (!PVC_OPERATORS[type]) return;
    document.querySelectorAll('#formArea tbody tr').forEach(function (row, index) {
      var resultBox = row.querySelector('.resultbox');
      if (!resultBox) return;
      var actions = resultBox.querySelector('.signature-actions');
      if (!actions || actions.querySelector('.pw-use-official-signature')) return;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pw-use-official-signature';
      btn.textContent = '+';
      btn.title = 'Inserisci firma associata all\'operatore';
      btn.setAttribute('aria-label', 'Inserisci firma associata all\'operatore');
      btn.addEventListener('click', _asyncToGenerator(_regenerator().m(function _callee() {
        var _PVC_OPERATORS$type;
        var hiddenInput, operator;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (Object.keys(OPERATOR_SIGNATURES).length) {
                _context.n = 1;
                break;
              }
              _context.n = 1;
              return loadOperatorSignatures();
            case 1:
              hiddenInput = row.querySelector("input[data-field=\"phase_operator_".concat(index, "\"]"));
              operator = String((hiddenInput === null || hiddenInput === void 0 ? void 0 : hiddenInput.value) || ((_PVC_OPERATORS$type = PVC_OPERATORS[type]) === null || _PVC_OPERATORS$type === void 0 ? void 0 : _PVC_OPERATORS$type[index]) || '').trim();
              if (operator) {
                _context.n = 2;
                break;
              }
              return _context.a(2);
            case 2:
              setOfficialSignature(index, operator);
            case 3:
              return _context.a(2);
          }
        }, _callee);
      })));
      actions.insertBefore(btn, actions.firstChild);
    });
  }
  function addPvcSpecialForm() {
    if (typeof FORMS === 'undefined' || !FORMS.pvc) return;
    if (!FORMS.pvc_speciali) {
      FORMS.pvc_speciali = JSON.parse(JSON.stringify(FORMS.pvc));
      FORMS.pvc_speciali.title = 'SCHEDA COLLAUDO - PVC - PEZZI SPECIALI';
    }
    var formType = document.getElementById('formType');
    if (!formType || formType.querySelector('option[value="pvc_speciali"]')) return;
    var option = document.createElement('option');
    option.value = 'pvc_speciali';
    option.textContent = 'PVC - Pezzi speciali';
    var pvcOption = formType.querySelector('option[value="pvc"]');
    if (pvcOption && pvcOption.nextSibling) {
      formType.insertBefore(option, pvcOption.nextSibling);
    } else {
      formType.appendChild(option);
    }
  }
  function updatePvcPhaseNames() {
    if (typeof FORMS === 'undefined') return;
    ['pvc', 'pvc_speciali', 'pvc_vie_fuga'].forEach(function (key) {
      var phases = FORMS[key] && FORMS[key].phases;
      if (!Array.isArray(phases)) return;
      phases.forEach(function (phase) {
        if (phase[0] === 'MONTAGGIO FERRAMENTA') {
          phase[0] = 'MONTAGGIO FERRAMENTA ANTE';
        } else if (phase[0] === 'INSERIMENTO GUARNIZIONI') {
          phase[0] = 'MONTAGGIO FERRAMENTA TELAI';
        }
      });
    });
  }
  function updateVisiblePvcPhaseNames() {
    var typeSel = document.getElementById('formType');
    if (!typeSel || !String(typeSel.value).startsWith('pvc')) return;
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while (node = walker.nextNode()) {
      var text = node.nodeValue.trim();
      if (text === 'MONTAGGIO FERRAMENTA') {
        node.nodeValue = node.nodeValue.replace('MONTAGGIO FERRAMENTA', 'MONTAGGIO FERRAMENTA ANTE');
      } else if (text === 'INSERIMENTO GUARNIZIONI') {
        node.nodeValue = node.nodeValue.replace('INSERIMENTO GUARNIZIONI', 'MONTAGGIO FERRAMENTA TELAI');
      }
    }
  }
  function getLocalSavedOperator(type, index) {
    try {
      var _data$fields;
      var raw = localStorage.getItem("pw-collaudo-".concat(type));
      if (!raw) return '';
      var data = JSON.parse(raw);
      return String((data === null || data === void 0 || (_data$fields = data.fields) === null || _data$fields === void 0 ? void 0 : _data$fields["phase_operator_".concat(index)]) || '').trim();
    } catch (_) {
      return '';
    }
  }
  function saveOperatorChange(hiddenInput) {
    var _window$PWCollaudoSyn3;
    hiddenInput.dispatchEvent(new Event('input', {
      bubbles: true
    }));
    if (typeof autoSave === 'function') autoSave();
    if ((_window$PWCollaudoSyn3 = window.PWCollaudoSync) !== null && _window$PWCollaudoSyn3 !== void 0 && _window$PWCollaudoSyn3.queueSave) window.PWCollaudoSync.queueSave(100);
  }
  function applyPvcOperators() {
    var typeSel = document.getElementById('formType');
    var type = (typeSel === null || typeSel === void 0 ? void 0 : typeSel.value) || '';
    var operators = PVC_OPERATORS[type];
    if (!operators) return;
    var rows = document.querySelectorAll('#formArea tbody tr');
    rows.forEach(function (row, index) {
      var defaultOperator = operators[index];
      var resultBox = row.querySelector('.resultbox');
      if (!defaultOperator || !resultBox) return;
      var existing = resultBox.querySelector('.pw-associated-operator');
      if (existing) return;
      var signatureLabel = Array.from(resultBox.querySelectorAll('label')).find(function (label) {
        return (label.textContent || '').trim().toLowerCase() === 'firma operatore';
      });
      if (!signatureLabel) return;
      var fieldName = "phase_operator_".concat(index);
      var savedOperator = getLocalSavedOperator(type, index);
      var currentOperator = PVC_OPERATOR_LIST.includes(savedOperator) ? savedOperator : defaultOperator;
      var block = document.createElement('div');
      block.className = 'pw-associated-operator';
      block.dataset.operatorIndex = String(index);
      block.dataset.defaultOperator = defaultOperator;
      block.innerHTML = "\n        <label>Operatore associato</label>\n        <div class=\"pw-operator-row\">\n          <div class=\"pw-operator-name\">".concat(escHtml(currentOperator), "</div>\n          <button type=\"button\" class=\"pw-change-operator\">Cambia operatore</button>\n        </div>\n        <select class=\"pw-operator-select\" hidden aria-label=\"Cambia operatore\">\n          ").concat(PVC_OPERATOR_LIST.map(function (name) {
        return "<option value=\"".concat(escHtml(name), "\"").concat(name === currentOperator ? ' selected' : '', ">").concat(escHtml(name), "</option>");
      }).join(''), "\n        </select>\n        <input type=\"hidden\" data-field=\"").concat(fieldName, "\" value=\"").concat(escHtml(currentOperator), "\">\n      ");
      var button = block.querySelector('.pw-change-operator');
      var select = block.querySelector('.pw-operator-select');
      var nameEl = block.querySelector('.pw-operator-name');
      var hiddenInput = block.querySelector("input[data-field=\"".concat(fieldName, "\"]"));
      button.addEventListener('click', function () {
        select.hidden = !select.hidden;
        if (!select.hidden) select.focus();
      });
      select.addEventListener('change', function () {
        var selected = select.value || defaultOperator;
        nameEl.textContent = selected;
        hiddenInput.value = selected;
        select.hidden = true;
        clearPhaseSignature(index);
        saveOperatorChange(hiddenInput);
      });
      resultBox.insertBefore(block, signatureLabel);
    });
  }
  function syncOperatorDisplays() {
    var _document$getElementB2;
    var type = ((_document$getElementB2 = document.getElementById('formType')) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.value) || '';
    if (!PVC_OPERATORS[type]) return;
    document.querySelectorAll('.pw-associated-operator').forEach(function (block) {
      var _PVC_OPERATORS$type2;
      var index = Number(block.dataset.operatorIndex);
      var defaultOperator = ((_PVC_OPERATORS$type2 = PVC_OPERATORS[type]) === null || _PVC_OPERATORS$type2 === void 0 ? void 0 : _PVC_OPERATORS$type2[index]) || block.dataset.defaultOperator || '';
      var hiddenInput = block.querySelector("input[data-field=\"phase_operator_".concat(index, "\"]"));
      var nameEl = block.querySelector('.pw-operator-name');
      var select = block.querySelector('.pw-operator-select');
      if (!hiddenInput || !nameEl || !select) return;
      var value = PVC_OPERATOR_LIST.includes(hiddenInput.value) ? hiddenInput.value : defaultOperator;
      if (hiddenInput.value !== value) hiddenInput.value = value;
      if (nameEl.textContent !== value) nameEl.textContent = value;
      if (select.value !== value) select.value = value;
    });
  }
  function refreshPvcUi() {
    updateVisiblePvcPhaseNames();
    applyPvcOperators();
    syncOperatorDisplays();
    addSignaturePlusButtons();
    loadOperatorSignatures();
  }
  addPvcSpecialForm();
  updatePvcPhaseNames();
  refreshPvcUi();
  setTimeout(refreshPvcUi, 0);
  var formType = document.getElementById('formType');
  if (formType) {
    formType.addEventListener('change', function () {
      return setTimeout(refreshPvcUi, 0);
    });
  }
  setInterval(function () {
    syncOperatorDisplays();
    addSignaturePlusButtons();
    if (!Object.keys(OPERATOR_SIGNATURES).length) loadOperatorSignatures();
  }, 900);
  var script = document.createElement('script');
  script.src = 'sync2.js?v=4';
  script.async = false;
  document.head.appendChild(script);
})();