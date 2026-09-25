function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var API_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  var DEPT_CODE_KEY = 'pw-collaudo-access-code';
  var OFFICE_CODE_KEY = 'pw-collaudo-office-code-session';
  var style = document.createElement('style');
  style.textContent = "\n    .pw-archive-btn,\n    .pw-complete-archive-btn {\n      cursor: pointer;\n    }\n    .pw-complete-archive-btn {\n      background: #c7a044 !important;\n      border-color: #c7a044 !important;\n      color: #111 !important;\n      font-weight: 700 !important;\n    }\n    .pw-archive-overlay {\n      position: fixed;\n      inset: 0;\n      z-index: 99999;\n      background: rgba(0,0,0,.62);\n      display: flex;\n      align-items: flex-start;\n      justify-content: center;\n      padding: 24px;\n      box-sizing: border-box;\n      overflow: auto;\n    }\n    .pw-archive-panel {\n      width: min(980px, 100%);\n      margin: 20px auto;\n      background: #fff;\n      border-radius: 12px;\n      box-shadow: 0 18px 50px rgba(0,0,0,.28);\n      overflow: hidden;\n      font-family: 'Poppins', Arial, sans-serif;\n    }\n    .pw-archive-head {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 12px;\n      padding: 18px 20px;\n      background: #111;\n      color: #fff;\n    }\n    .pw-archive-head h2 {\n      margin: 0;\n      font-size: 20px;\n    }\n    .pw-archive-close {\n      border: 0;\n      background: #fff;\n      color: #111;\n      border-radius: 8px;\n      padding: 8px 12px;\n      cursor: pointer;\n      font-weight: 600;\n    }\n    .pw-archive-tools {\n      display: grid;\n      grid-template-columns: 1fr 240px;\n      gap: 10px;\n      padding: 16px 20px;\n      border-bottom: 1px solid #ddd;\n      background: #fafafa;\n    }\n    .pw-archive-tools input,\n    .pw-archive-tools select {\n      width: 100%;\n      box-sizing: border-box;\n      padding: 10px 12px;\n      min-height: 42px;\n      border: 1px solid #bbb;\n      border-radius: 8px;\n      font: inherit;\n    }\n    .pw-archive-list {\n      padding: 14px 20px 20px;\n      display: grid;\n      gap: 10px;\n    }\n    .pw-archive-empty {\n      padding: 24px;\n      text-align: center;\n      color: #666;\n    }\n    .pw-archive-row {\n      display: grid;\n      grid-template-columns: minmax(160px, 1fr) minmax(150px, .8fr) minmax(150px, .8fr) auto;\n      align-items: center;\n      gap: 12px;\n      border: 1px solid #ddd;\n      border-radius: 10px;\n      padding: 12px 14px;\n      background: #fff;\n    }\n    .pw-archive-commessa {\n      font-weight: 700;\n      font-size: 15px;\n    }\n    .pw-archive-type,\n    .pw-archive-date {\n      font-size: 12px;\n      color: #555;\n    }\n    .pw-archive-open {\n      border: 1px solid #c7a044;\n      background: #c7a044;\n      color: #111;\n      border-radius: 8px;\n      padding: 9px 12px;\n      font-weight: 700;\n      cursor: pointer;\n      white-space: nowrap;\n    }\n    @media (max-width: 700px) {\n      .pw-archive-overlay { padding: 8px; }\n      .pw-archive-panel { margin: 8px auto; border-radius: 9px; }\n      .pw-archive-tools { grid-template-columns: 1fr; padding: 12px; }\n      .pw-archive-list { padding: 10px 12px 14px; }\n      .pw-archive-row {\n        grid-template-columns: 1fr;\n        gap: 5px;\n      }\n      .pw-archive-open {\n        width: 100%;\n        margin-top: 6px;\n        min-height: 42px;\n      }\n    }\n    @media print {\n      .pw-archive-btn,\n      .pw-complete-archive-btn,\n      .pw-archive-overlay { display: none !important; }\n    }\n  ";
  document.head.appendChild(style);
  function esc(value) {
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
  function getType() {
    var _document$getElementB;
    return ((_document$getElementB = document.getElementById('formType')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value) || '';
  }
  function getCommessa() {
    var _document$querySelect;
    return String(((_document$querySelect = document.querySelector('[data-field="commessa"]')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.value) || '').trim();
  }
  function getDeptCode() {
    var code = String(localStorage.getItem(DEPT_CODE_KEY) || '').trim();
    if (code) return code;
    code = String(prompt('Inserisci il codice reparto:') || '').trim().toUpperCase();
    if (code) localStorage.setItem(DEPT_CODE_KEY, code);
    return code;
  }
  function getOfficeCode() {
    var forcePrompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (!forcePrompt) {
      var saved = String(sessionStorage.getItem(OFFICE_CODE_KEY) || '').trim();
      if (saved) return saved;
    }
    var code = String(prompt('Inserisci il codice Ufficio per accedere all’archivio:') || '').trim().toUpperCase();
    if (code) sessionStorage.setItem(OFFICE_CODE_KEY, code);
    return code;
  }
  function api(_x) {
    return _api.apply(this, arguments);
  }
  function _api() {
    _api = _asyncToGenerator(_regenerator().m(function _callee(body) {
      var res, json, err, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.n = 1;
            return fetch(API_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
            });
          case 1:
            res = _context.v;
            json = {};
            _context.p = 2;
            _context.n = 3;
            return res.json();
          case 3:
            json = _context.v;
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
            err = new Error(json.error || "http_".concat(res.status));
            err.status = res.status;
            throw err;
          case 6:
            return _context.a(2, json);
        }
      }, _callee, null, [[2, 4]]);
    }));
    return _api.apply(this, arguments);
  }
  function collectPayload() {
    var payload = {
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
      payload.signatures[img.dataset.signature] = img.dataset.hasSignature === '1' && img.getAttribute('src') ? img.getAttribute('src') : '';
    });
    return payload;
  }
  function makeArchiveSnapshot() {
    var sheet = document.querySelector('.sheet');
    if (!sheet) return '';
    var clone = sheet.cloneNode(true);
    clone.querySelectorAll('.notice,.footer-actions,.hint,.signature-actions,.pw-change-operator,.pw-operator-select,.pw-signature-plus-proxy').forEach(function (el) {
      return el.remove();
    });
    clone.querySelectorAll('input[type="file"],input[type="hidden"]').forEach(function (el) {
      return el.remove();
    });
    clone.querySelectorAll('input').forEach(function (input) {
      var type = String(input.type || '').toLowerCase();
      if (type === 'checkbox' || type === 'radio') {
        var _span = document.createElement('span');
        _span.className = 'pw-archive-check';
        _span.textContent = input.checked ? '☒' : '☐';
        input.replaceWith(_span);
        return;
      }
      var span = document.createElement('span');
      span.className = 'pw-archive-value';
      span.textContent = input.value || '—';
      input.replaceWith(span);
    });
    clone.querySelectorAll('select').forEach(function (select) {
      var _select$options;
      var span = document.createElement('span');
      span.className = 'pw-archive-value';
      span.textContent = ((_select$options = select.options) === null || _select$options === void 0 || (_select$options = _select$options[select.selectedIndex]) === null || _select$options === void 0 ? void 0 : _select$options.text) || select.value || '—';
      select.replaceWith(span);
    });
    clone.querySelectorAll('button').forEach(function (button) {
      return button.remove();
    });
    clone.querySelectorAll('.signature-preview').forEach(function (preview) {
      var img = preview.querySelector('img[data-signature]');
      if (img && img.getAttribute('src')) {
        img.style.display = 'block';
      } else {
        preview.innerHTML = '';
      }
    });
    return clone.outerHTML;
  }
  function setStatus(message) {
    var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2600;
    var el = document.getElementById('status');
    if (!el) return;
    el.textContent = message;
    if (ms) setTimeout(function () {
      if (el.textContent === message) el.textContent = '';
    }, ms);
  }
  function completeAndArchive(_x2) {
    return _completeAndArchive.apply(this, arguments);
  }
  function _completeAndArchive() {
    _completeAndArchive = _asyncToGenerator(_regenerator().m(function _callee2(button) {
      var commessa, formType, code, oldText, _window$PWCollaudoSyn, payload, _t2, _t3;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            commessa = getCommessa();
            formType = getType();
            if (commessa) {
              _context2.n = 1;
              break;
            }
            alert('Inserisci prima il numero di commessa.');
            return _context2.a(2);
          case 1:
            if (confirm("Confermi che il collaudo della commessa ".concat(commessa, " \xE8 completato e pronto per l\u2019archivio?"))) {
              _context2.n = 2;
              break;
            }
            return _context2.a(2);
          case 2:
            code = getDeptCode();
            if (code) {
              _context2.n = 3;
              break;
            }
            return _context2.a(2);
          case 3:
            oldText = button.textContent;
            button.disabled = true;
            button.textContent = 'Archiviazione…';
            _context2.p = 4;
            if (!((_window$PWCollaudoSyn = window.PWCollaudoSync) !== null && _window$PWCollaudoSyn !== void 0 && _window$PWCollaudoSyn.saveNow)) {
              _context2.n = 8;
              break;
            }
            _context2.p = 5;
            _context2.n = 6;
            return window.PWCollaudoSync.saveNow();
          case 6:
            _context2.n = 8;
            break;
          case 7:
            _context2.p = 7;
            _t2 = _context2.v;
          case 8:
            payload = collectPayload();
            payload.archive_html = makeArchiveSnapshot();
            payload.archived_at = new Date().toISOString();
            _context2.n = 9;
            return api({
              action: 'archive_complete',
              code: code,
              form_type: formType,
              commessa: commessa,
              payload: payload
            });
          case 9:
            button.textContent = 'Archiviato ✓';
            setStatus('Collaudo salvato nell’archivio ✓', 3500);
            setTimeout(function () {
              button.disabled = false;
              button.textContent = oldText;
            }, 2500);
            _context2.n = 11;
            break;
          case 10:
            _context2.p = 10;
            _t3 = _context2.v;
            console.error('Archivio collaudo', _t3);
            if (String(_t3.message).includes('invalid_code')) {
              localStorage.removeItem(DEPT_CODE_KEY);
              alert('Codice reparto non corretto. Riprova.');
            } else {
              alert('Non è stato possibile archiviare il collaudo. Riprova.');
            }
            button.disabled = false;
            button.textContent = oldText;
          case 11:
            return _context2.a(2);
        }
      }, _callee2, null, [[5, 7], [4, 10]]);
    }));
    return _completeAndArchive.apply(this, arguments);
  }
  function formatType(type) {
    return {
      pvc: 'PVC',
      pvc_speciali: 'PVC - Pezzi speciali',
      pvc_vie_fuga: 'PVC - Vie di fuga',
      alu: 'Alluminio',
      alu_vie_fuga: 'Alluminio - Vie di fuga'
    }[type] || type;
  }
  function formatDate(value) {
    var d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value || '');
    return new Intl.DateTimeFormat('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(d);
  }
  function printCss() {
    return "\n      *{box-sizing:border-box}\n      body{font-family:Arial,Helvetica,sans-serif;color:#111;margin:0;background:#eee}\n      .pw-print-toolbar{position:sticky;top:0;z-index:10;background:#111;color:#fff;padding:12px;display:flex;gap:8px;justify-content:center}\n      .pw-print-toolbar button{border:0;border-radius:7px;padding:10px 16px;font-weight:700;cursor:pointer}\n      .pw-print-toolbar .main{background:#c7a044;color:#111}\n      .sheet{width:210mm;max-width:100%;margin:16px auto;background:#fff;padding:7mm}\n      .header-grid{display:grid;grid-template-columns:28mm 1fr 36mm;border:1px solid #111}\n      .header-grid>div{padding:6px;border-right:1px solid #111;display:flex;align-items:center;justify-content:center;text-align:center;min-height:52px}\n      .header-grid>div:last-child{border-right:0}\n      .header-grid .rev{font-size:12px}\n      .logo{max-width:90px;max-height:45px;object-fit:contain}\n      .title{font-size:18px;font-weight:700}\n      .meta{display:grid;grid-template-columns:28mm 1fr 36mm 36mm;border-left:1px solid #111;border-right:1px solid #111;border-bottom:1px solid #111}\n      .meta .cell{padding:7px;border-right:1px solid #111;min-height:48px}\n      .meta .cell:last-child{border-right:0}\n      .meta label,.resultbox label{display:block;font-weight:700;font-size:11px;margin-bottom:3px}\n      .pw-archive-value{display:block;min-height:22px;padding:4px 2px;font-size:12px}\n      table{width:100%;border-collapse:collapse;margin-top:9px;font-size:10px;table-layout:fixed}\n      th,td{border:1px solid #222;padding:5px;vertical-align:top;overflow-wrap:anywhere}\n      th:nth-child(1){width:17%} th:nth-child(2){width:48%} th:nth-child(3){width:13%} th:nth-child(4){width:22%}\n      .phase{font-weight:700}\n      .resultbox{display:grid;gap:5px}\n      .inlinechecks{display:flex;gap:7px;align-items:center}\n      .choice{display:inline-flex;gap:3px;align-items:center}\n      .pw-associated-operator{margin:4px 0}\n      .pw-operator-name{font-weight:700;border:1px solid #aaa;padding:4px}\n      .signature-preview{width:100%;height:52px;border:1px solid #aaa;display:flex;align-items:center;justify-content:center;overflow:hidden}\n      .signature-image{display:block;max-width:100%;max-height:100%;object-fit:contain}\n      .extra{margin-top:10px;border:1px solid #222}\n      .extra-row{display:grid;grid-template-columns:52mm 1fr;border-bottom:1px solid #222}\n      .extra-row:last-child{border-bottom:0}.extra-row>div{padding:6px}.extra-row .lbl{font-weight:700;border-right:1px solid #222}\n      @page{size:A4 portrait;margin:7mm}\n      @media print{\n        body{background:#fff}\n        .pw-print-toolbar{display:none!important}\n        .sheet{width:100%;margin:0;padding:0}\n        tr{break-inside:avoid;page-break-inside:avoid}\n      }\n    ";
  }
  function openPrintWindow(item) {
    var _item$payload;
    var archivedHtml = (item === null || item === void 0 || (_item$payload = item.payload) === null || _item$payload === void 0 ? void 0 : _item$payload.archive_html) || '';
    if (!archivedHtml) {
      alert('Questa voce non contiene ancora un’anteprima stampabile.');
      return;
    }
    var w = window.open('', '_blank');
    if (!w) {
      alert('Il browser ha bloccato la finestra di stampa. Consenti i popup per questo sito.');
      return;
    }
    w.document.open();
    w.document.write("<!doctype html><html lang=\"it\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Collaudo ".concat(esc(item.commessa), "</title><style>").concat(printCss(), "</style></head><body><div class=\"pw-print-toolbar\"><button class=\"main\" onclick=\"window.print()\">Stampa / Salva PDF</button><button onclick=\"window.close()\">Chiudi</button></div>").concat(archivedHtml, "</body></html>"));
    w.document.close();
  }
  function ensureArchiveModal() {
    var overlay = document.querySelector('.pw-archive-overlay');
    if (overlay) return overlay;
    overlay = document.createElement('div');
    overlay.className = 'pw-archive-overlay';
    overlay.hidden = true;
    overlay.innerHTML = "\n      <div class=\"pw-archive-panel\" role=\"dialog\" aria-modal=\"true\" aria-label=\"Archivio collaudi\">\n        <div class=\"pw-archive-head\">\n          <h2>Archivio collaudi</h2>\n          <button type=\"button\" class=\"pw-archive-close\">Chiudi</button>\n        </div>\n        <div class=\"pw-archive-tools\">\n          <input type=\"search\" class=\"pw-archive-search\" placeholder=\"Cerca numero commessa\u2026\">\n          <select class=\"pw-archive-filter\" aria-label=\"Filtra tipo scheda\">\n            <option value=\"\">Tutti i tipi</option>\n            <option value=\"pvc\">PVC</option>\n            <option value=\"pvc_speciali\">PVC - Pezzi speciali</option>\n            <option value=\"pvc_vie_fuga\">PVC - Vie di fuga</option>\n            <option value=\"alu\">Alluminio</option>\n            <option value=\"alu_vie_fuga\">Alluminio - Vie di fuga</option>\n          </select>\n        </div>\n        <div class=\"pw-archive-list\"><div class=\"pw-archive-empty\">Caricamento\u2026</div></div>\n      </div>";
    document.body.appendChild(overlay);
    overlay.querySelector('.pw-archive-close').addEventListener('click', function () {
      overlay.hidden = true;
    });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) overlay.hidden = true;
    });
    var timer;
    var reload = function reload() {
      clearTimeout(timer);
      timer = setTimeout(function () {
        return loadArchiveList(overlay);
      }, 250);
    };
    overlay.querySelector('.pw-archive-search').addEventListener('input', reload);
    overlay.querySelector('.pw-archive-filter').addEventListener('change', reload);
    return overlay;
  }
  function loadArchiveList(_x3) {
    return _loadArchiveList.apply(this, arguments);
  }
  function _loadArchiveList() {
    _loadArchiveList = _asyncToGenerator(_regenerator().m(function _callee4(overlay) {
      var forceOfficePrompt,
        list,
        officeCode,
        search,
        formType,
        data,
        items,
        _args4 = arguments,
        _t5;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            forceOfficePrompt = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : false;
            list = overlay.querySelector('.pw-archive-list');
            list.innerHTML = '<div class="pw-archive-empty">Caricamento…</div>';
            officeCode = getOfficeCode(forceOfficePrompt);
            if (officeCode) {
              _context4.n = 1;
              break;
            }
            overlay.hidden = true;
            return _context4.a(2);
          case 1:
            search = overlay.querySelector('.pw-archive-search').value.trim();
            formType = overlay.querySelector('.pw-archive-filter').value;
            _context4.p = 2;
            _context4.n = 3;
            return api({
              action: 'archive_list',
              office_code: officeCode,
              search: search,
              form_type: formType
            });
          case 3:
            data = _context4.v;
            items = Array.isArray(data.items) ? data.items : [];
            if (items.length) {
              _context4.n = 4;
              break;
            }
            list.innerHTML = '<div class="pw-archive-empty">Nessun collaudo archiviato.</div>';
            return _context4.a(2);
          case 4:
            list.innerHTML = '';
            items.forEach(function (item) {
              var row = document.createElement('div');
              row.className = 'pw-archive-row';
              row.innerHTML = "\n          <div><div class=\"pw-archive-commessa\">Commessa ".concat(esc(item.commessa), "</div></div>\n          <div class=\"pw-archive-type\">").concat(esc(formatType(item.form_type)), "</div>\n          <div class=\"pw-archive-date\">").concat(esc(formatDate(item.completed_at)), "</div>\n          <button type=\"button\" class=\"pw-archive-open\">Apri / Esporta PDF</button>");
              row.querySelector('.pw-archive-open').addEventListener('click', function () {
                var _ref = _asyncToGenerator(_regenerator().m(function _callee3(buttonEvent) {
                  var button, old, full, _t4;
                  return _regenerator().w(function (_context3) {
                    while (1) switch (_context3.p = _context3.n) {
                      case 0:
                        button = buttonEvent.currentTarget;
                        old = button.textContent;
                        button.disabled = true;
                        button.textContent = 'Apertura…';
                        _context3.p = 1;
                        _context3.n = 2;
                        return api({
                          action: 'archive_get',
                          office_code: officeCode,
                          id: item.id
                        });
                      case 2:
                        full = _context3.v;
                        if (full.found && full.item) openPrintWindow(full.item);
                        _context3.n = 4;
                        break;
                      case 3:
                        _context3.p = 3;
                        _t4 = _context3.v;
                        console.error('Apertura archivio', _t4);
                        alert('Non è stato possibile aprire il collaudo.');
                      case 4:
                        _context3.p = 4;
                        button.disabled = false;
                        button.textContent = old;
                        return _context3.f(4);
                      case 5:
                        return _context3.a(2);
                    }
                  }, _callee3, null, [[1, 3, 4, 5]]);
                }));
                return function (_x4) {
                  return _ref.apply(this, arguments);
                };
              }());
              list.appendChild(row);
            });
            _context4.n = 6;
            break;
          case 5:
            _context4.p = 5;
            _t5 = _context4.v;
            console.error('Archivio ufficio', _t5);
            if (String(_t5.message).includes('invalid_office_code')) {
              sessionStorage.removeItem(OFFICE_CODE_KEY);
              if (forceOfficePrompt) {
                alert('Codice Ufficio non corretto.');
                overlay.hidden = true;
              } else {
                loadArchiveList(overlay, true);
              }
            } else {
              list.innerHTML = '<div class="pw-archive-empty">Archivio momentaneamente non disponibile.</div>';
            }
          case 6:
            return _context4.a(2);
        }
      }, _callee4, null, [[2, 5]]);
    }));
    return _loadArchiveList.apply(this, arguments);
  }
  function openArchive() {
    return _openArchive.apply(this, arguments);
  }
  function _openArchive() {
    _openArchive = _asyncToGenerator(_regenerator().m(function _callee5() {
      var overlay;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            overlay = ensureArchiveModal();
            overlay.hidden = false;
            _context5.n = 1;
            return loadArchiveList(overlay);
          case 1:
            return _context5.a(2);
        }
      }, _callee5);
    }));
    return _openArchive.apply(this, arguments);
  }
  function installButtons() {
    var topbar = document.querySelector('.topbar');
    if (topbar && !topbar.querySelector('.pw-archive-btn')) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pw-archive-btn';
      btn.textContent = 'Archivio ufficio';
      btn.addEventListener('click', openArchive);
      var status = topbar.querySelector('.status');
      if (status) topbar.insertBefore(btn, status);else topbar.appendChild(btn);
    }
    var footer = document.querySelector('.footer-actions');
    if (footer && !footer.querySelector('.pw-complete-archive-btn')) {
      var _btn = document.createElement('button');
      _btn.type = 'button';
      _btn.className = 'pw-complete-archive-btn';
      _btn.textContent = '✓ Completa e archivia';
      _btn.addEventListener('click', function () {
        return completeAndArchive(_btn);
      });
      footer.appendChild(_btn);
    }
  }
  var observer = new MutationObserver(installButtons);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  installButtons();
  setTimeout(installButtons, 0);
})();