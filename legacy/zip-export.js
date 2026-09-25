function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var API_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  var EXPORT_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-export';
  var OFFICE_LOCAL_KEY = 'pw-collaudo-office-code';
  var OFFICE_SESSION_KEY = 'pw-collaudo-office-code-session';
  var style = document.createElement('style');
  style.textContent = "\n    .pw-archive-actions{display:flex;gap:7px;align-items:center;justify-content:flex-end;flex-wrap:wrap}\n    .pw-archive-zip{border:1px solid #111;background:#111;color:#fff;border-radius:8px;padding:9px 12px;font-weight:700;cursor:pointer;white-space:nowrap}\n    @media(max-width:700px){.pw-archive-actions{display:grid;grid-template-columns:1fr;gap:6px}.pw-archive-zip{width:100%;min-height:42px}}\n  ";
  document.head.appendChild(style);
  function getOfficeCode() {
    return String(localStorage.getItem(OFFICE_LOCAL_KEY) || sessionStorage.getItem(OFFICE_SESSION_KEY) || '').trim();
  }
  function apiJson(_x) {
    return _apiJson.apply(this, arguments);
  }
  function _apiJson() {
    _apiJson = _asyncToGenerator(_regenerator().m(function _callee(body) {
      var res, json, _t;
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
            throw new Error(json.error || "http_".concat(res.status));
          case 6:
            return _context.a(2, json);
        }
      }, _callee, null, [[2, 4]]);
    }));
    return _apiJson.apply(this, arguments);
  }
  function typeFromLabel(label) {
    var value = String(label || '').trim().toLowerCase();
    if (value === 'pvc') return 'pvc';
    if (value.includes('pezzi speciali')) return 'pvc_speciali';
    if (value.includes('pvc') && value.includes('vie di fuga')) return 'pvc_vie_fuga';
    if (value === 'alluminio') return 'alu';
    if (value.includes('alluminio') && value.includes('vie di fuga')) return 'alu_vie_fuga';
    return '';
  }
  function safeName(value) {
    return String(value || 'collaudo').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9._-]+/g, '_').replace(/^_+|_+$/g, '') || 'collaudo';
  }
  function exportZip(_x2, _x3) {
    return _exportZip.apply(this, arguments);
  }
  function _exportZip() {
    _exportZip = _asyncToGenerator(_regenerator().m(function _callee2(row, button) {
      var _row$querySelector, _row$querySelector2;
      var officeCode, commessa, formType, old, list, exact, res, json, blob, base, href, a, _t2, _t3;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            officeCode = getOfficeCode();
            if (officeCode) {
              _context2.n = 1;
              break;
            }
            alert('Apri prima l’Archivio ufficio inserendo il codice Ufficio.');
            return _context2.a(2);
          case 1:
            commessa = String(((_row$querySelector = row.querySelector('.pw-archive-commessa')) === null || _row$querySelector === void 0 ? void 0 : _row$querySelector.textContent) || '').replace(/^Commessa\s+/i, '').trim();
            formType = typeFromLabel(((_row$querySelector2 = row.querySelector('.pw-archive-type')) === null || _row$querySelector2 === void 0 ? void 0 : _row$querySelector2.textContent) || '');
            if (!(!commessa || !formType)) {
              _context2.n = 2;
              break;
            }
            alert('Non riesco a identificare questa scheda. Ricarica l’archivio e riprova.');
            return _context2.a(2);
          case 2:
            old = button.textContent;
            button.disabled = true;
            button.textContent = 'Creo ZIP…';
            _context2.p = 3;
            _context2.n = 4;
            return apiJson({
              action: 'archive_list',
              office_code: officeCode,
              search: commessa,
              form_type: formType
            });
          case 4:
            list = _context2.v;
            exact = (Array.isArray(list.items) ? list.items : []).find(function (x) {
              return String(x.commessa || '').trim().toUpperCase() === commessa.toUpperCase() && x.form_type === formType;
            });
            if (exact) {
              _context2.n = 5;
              break;
            }
            throw new Error('not_found');
          case 5:
            _context2.n = 6;
            return fetch(EXPORT_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                office_code: officeCode,
                id: exact.id
              })
            });
          case 6:
            res = _context2.v;
            if (res.ok) {
              _context2.n = 11;
              break;
            }
            json = {};
            _context2.p = 7;
            _context2.n = 8;
            return res.json();
          case 8:
            json = _context2.v;
            _context2.n = 10;
            break;
          case 9:
            _context2.p = 9;
            _t2 = _context2.v;
          case 10:
            throw new Error(json.error || "http_".concat(res.status));
          case 11:
            _context2.n = 12;
            return res.blob();
          case 12:
            blob = _context2.v;
            if (!(!blob || blob.size < 100 || !String(blob.type || '').includes('zip'))) {
              _context2.n = 13;
              break;
            }
            throw new Error('invalid_zip_response');
          case 13:
            base = safeName("Collaudo_".concat(commessa));
            href = URL.createObjectURL(blob);
            a = document.createElement('a');
            a.href = href;
            a.download = "".concat(base, ".zip");
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
              URL.revokeObjectURL(href);
              a.remove();
            }, 3000);
            button.textContent = 'ZIP scaricato ✓';
            setTimeout(function () {
              return button.textContent = old;
            }, 1800);
            _context2.n = 15;
            break;
          case 14:
            _context2.p = 14;
            _t3 = _context2.v;
            console.error('Esporta ZIP archivio', _t3);
            alert('Non è stato possibile scaricare lo ZIP. Riprova.');
            button.textContent = old;
          case 15:
            _context2.p = 15;
            button.disabled = false;
            return _context2.f(15);
          case 16:
            return _context2.a(2);
        }
      }, _callee2, null, [[7, 9], [3, 14, 15, 16]]);
    }));
    return _exportZip.apply(this, arguments);
  }
  function enhanceRows() {
    document.querySelectorAll('.pw-archive-row').forEach(function (row) {
      if (row.querySelector('.pw-archive-zip')) return;
      var open = row.querySelector('.pw-archive-open');
      if (!open) return;
      open.textContent = 'Apri / PDF';
      var actions = row.querySelector('.pw-archive-actions');
      if (!actions) {
        actions = document.createElement('div');
        actions.className = 'pw-archive-actions';
        open.parentNode.insertBefore(actions, open);
        actions.appendChild(open);
      }
      var zipButton = document.createElement('button');
      zipButton.type = 'button';
      zipButton.className = 'pw-archive-zip';
      zipButton.textContent = 'Esporta ZIP';
      zipButton.addEventListener('click', function () {
        return exportZip(row, zipButton);
      });
      actions.appendChild(zipButton);
    });
  }
  var observer = new MutationObserver(enhanceRows);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  enhanceRows();
  setInterval(enhanceRows, 700);
})();