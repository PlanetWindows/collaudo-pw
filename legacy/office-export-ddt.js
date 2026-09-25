function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var ROLE_KEY = 'pw-collaudo-role';
  var OFFICE_LOCAL_KEY = 'pw-collaudo-office-code';
  var OFFICE_SESSION_KEY = 'pw-collaudo-office-code-session';
  var SYNC_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  var EXPORT_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-export';
  var PREP_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-office-prep';
  if (String(localStorage.getItem(ROLE_KEY) || '') !== 'office') return;
  function officeCode() {
    return String(localStorage.getItem(OFFICE_LOCAL_KEY) || sessionStorage.getItem(OFFICE_SESSION_KEY) || '').trim();
  }
  function rowCommessa(row) {
    var _row$querySelector;
    return String(((_row$querySelector = row.querySelector('.pw-archive-commessa')) === null || _row$querySelector === void 0 ? void 0 : _row$querySelector.textContent) || '').replace(/^\s*Commessa\s*/i, '').trim();
  }
  function safe(v) {
    return String(v || 'PW').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9._-]+/g, '_').replace(/^_+|_+$/g, '') || 'PW';
  }
  function saveBlob(blob, name) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () {
      return URL.revokeObjectURL(url);
    }, 8000);
  }
  function resolveId(_x) {
    return _resolveId.apply(this, arguments);
  }
  function _resolveId() {
    _resolveId = _asyncToGenerator(_regenerator().m(function _callee(row) {
      var _data;
      var code, commessa, res, data, wanted, item, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (!row.dataset.archiveId) {
              _context.n = 1;
              break;
            }
            return _context.a(2, row.dataset.archiveId);
          case 1:
            code = officeCode(), commessa = rowCommessa(row);
            if (code) {
              _context.n = 2;
              break;
            }
            throw new Error('office_code_missing');
          case 2:
            _context.n = 3;
            return fetch(SYNC_URL, {
              method: 'POST',
              cache: 'no-store',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                action: 'archive_list',
                office_code: code,
                search: commessa
              })
            });
          case 3:
            res = _context.v;
            data = {};
            _context.p = 4;
            _context.n = 5;
            return res.json();
          case 5:
            data = _context.v;
            _context.n = 7;
            break;
          case 6:
            _context.p = 6;
            _t = _context.v;
          case 7:
            if (res.ok) {
              _context.n = 8;
              break;
            }
            throw new Error(((_data = data) === null || _data === void 0 ? void 0 : _data.error) || "archive_list_".concat(res.status));
          case 8:
            wanted = commessa.toUpperCase().replace(/\s+/g, ' ');
            item = (data.items || []).find(function (x) {
              return String(x.commessa || '').trim().toUpperCase().replace(/\s+/g, ' ') === wanted;
            }) || (data.items || [])[0];
            if (item !== null && item !== void 0 && item.id) {
              _context.n = 9;
              break;
            }
            throw new Error('archive_not_found');
          case 9:
            row.dataset.archiveId = String(item.id);
            return _context.a(2, row.dataset.archiveId);
        }
      }, _callee, null, [[4, 6]]);
    }));
    return _resolveId.apply(this, arguments);
  }
  function getReport(_x2) {
    return _getReport.apply(this, arguments);
  }
  function _getReport() {
    _getReport = _asyncToGenerator(_regenerator().m(function _callee2(id) {
      var code, res, _data2, data, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            code = officeCode();
            if (code) {
              _context2.n = 1;
              break;
            }
            throw new Error('office_code_missing');
          case 1:
            _context2.n = 2;
            return fetch(EXPORT_URL, {
              method: 'POST',
              cache: 'no-store',
              headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store'
              },
              body: JSON.stringify({
                action: 'pdf',
                office_code: code,
                id: id
              })
            });
          case 2:
            res = _context2.v;
            if (res.ok) {
              _context2.n = 7;
              break;
            }
            data = {};
            _context2.p = 3;
            _context2.n = 4;
            return res.json();
          case 4:
            data = _context2.v;
            _context2.n = 6;
            break;
          case 5:
            _context2.p = 5;
            _t2 = _context2.v;
          case 6:
            throw new Error(((_data2 = data) === null || _data2 === void 0 ? void 0 : _data2.error) || "report_".concat(res.status));
          case 7:
            return _context2.a(2, res.blob());
        }
      }, _callee2, null, [[3, 5]]);
    }));
    return _getReport.apply(this, arguments);
  }
  function getPrep(_x3) {
    return _getPrep.apply(this, arguments);
  }
  function _getPrep() {
    _getPrep = _asyncToGenerator(_regenerator().m(function _callee3(commessa) {
      var _data3, _data4;
      var code, res, data, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            code = officeCode();
            if (code) {
              _context3.n = 1;
              break;
            }
            throw new Error('office_code_missing');
          case 1:
            _context3.n = 2;
            return fetch(PREP_URL, {
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
          case 2:
            res = _context3.v;
            data = {};
            _context3.p = 3;
            _context3.n = 4;
            return res.json();
          case 4:
            data = _context3.v;
            _context3.n = 6;
            break;
          case 5:
            _context3.p = 5;
            _t3 = _context3.v;
          case 6:
            if (res.ok) {
              _context3.n = 7;
              break;
            }
            throw new Error(((_data3 = data) === null || _data3 === void 0 ? void 0 : _data3.error) || "prep_".concat(res.status));
          case 7:
            return _context3.a(2, ((_data4 = data) === null || _data4 === void 0 ? void 0 : _data4.item) || null);
        }
      }, _callee3, null, [[3, 5]]);
    }));
    return _getPrep.apply(this, arguments);
  }
  function getDdt(_x4) {
    return _getDdt.apply(this, arguments);
  }
  function _getDdt() {
    _getDdt = _asyncToGenerator(_regenerator().m(function _callee4(commessa) {
      var code, res, _data5, data, _t4;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            code = officeCode();
            if (code) {
              _context4.n = 1;
              break;
            }
            throw new Error('office_code_missing');
          case 1:
            _context4.n = 2;
            return fetch(PREP_URL, {
              method: 'POST',
              cache: 'no-store',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                action: 'download_ddt',
                access_code: code,
                commessa: commessa,
                download: true
              })
            });
          case 2:
            res = _context4.v;
            if (res.ok) {
              _context4.n = 7;
              break;
            }
            data = {};
            _context4.p = 3;
            _context4.n = 4;
            return res.json();
          case 4:
            data = _context4.v;
            _context4.n = 6;
            break;
          case 5:
            _context4.p = 5;
            _t4 = _context4.v;
          case 6:
            throw new Error(((_data5 = data) === null || _data5 === void 0 ? void 0 : _data5.error) || "ddt_".concat(res.status));
          case 7:
            return _context4.a(2, res.blob());
        }
      }, _callee4, null, [[3, 5]]);
    }));
    return _getDdt.apply(this, arguments);
  }
  function exportBoth(_x5, _x6) {
    return _exportBoth.apply(this, arguments);
  }
  function _exportBoth() {
    _exportBoth = _asyncToGenerator(_regenerator().m(function _callee5(row, btn) {
      var old, commessa, _prep, id, report, stamp, prep, ddt, msg, _t5, _t6, _t7;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            old = btn.textContent;
            btn.disabled = true;
            btn.textContent = 'ESPORTO…';
            commessa = rowCommessa(row);
            _context5.p = 1;
            _context5.n = 2;
            return resolveId(row);
          case 2:
            id = _context5.v;
            _context5.n = 3;
            return getReport(id);
          case 3:
            report = _context5.v;
            stamp = new Date().toISOString().replace(/[:.]/g, '-');
            saveBlob(report, "Collaudo_".concat(safe(commessa), "_").concat(stamp, ".pdf"));
            prep = null;
            _context5.p = 4;
            _context5.n = 5;
            return getPrep(commessa);
          case 5:
            prep = _context5.v;
            _context5.n = 7;
            break;
          case 6:
            _context5.p = 6;
            _t5 = _context5.v;
            console.error('Lettura DDT Ufficio', _t5);
          case 7:
            if (!((_prep = prep) !== null && _prep !== void 0 && _prep.ddt_name)) {
              _context5.n = 12;
              break;
            }
            _context5.p = 8;
            _context5.n = 9;
            return getDdt(commessa);
          case 9:
            ddt = _context5.v;
            setTimeout(function () {
              return saveBlob(ddt, "DDT_".concat(safe(commessa), "_").concat(safe(prep.ddt_name)));
            }, 350);
            btn.textContent = 'RAPPORTINO + DDT ✓';
            _context5.n = 11;
            break;
          case 10:
            _context5.p = 10;
            _t6 = _context5.v;
            console.error('Esportazione DDT', _t6);
            btn.textContent = 'RAPPORTINO ✓';
            alert('Il rapportino è stato esportato correttamente. Non è stato possibile scaricare il DDT: riprova dall’archivio.');
          case 11:
            _context5.n = 13;
            break;
          case 12:
            btn.textContent = 'PDF ESPORTATO ✓';
          case 13:
            setTimeout(function () {
              return btn.textContent = old;
            }, 1900);
            _context5.n = 15;
            break;
          case 14:
            _context5.p = 14;
            _t7 = _context5.v;
            console.error('Esportazione rapportino', _t7);
            msg = String((_t7 === null || _t7 === void 0 ? void 0 : _t7.message) || _t7);
            if (msg.includes('invalid_office_code') || msg.includes('office_code_missing')) alert('Codice Ufficio non valido. Usa “Cambia accesso” e rientra.');else alert('Non è stato possibile esportare il rapportino PDF. Riprova.');
            btn.textContent = old;
          case 15:
            _context5.p = 15;
            btn.disabled = false;
            return _context5.f(15);
          case 16:
            return _context5.a(2);
        }
      }, _callee5, null, [[8, 10], [4, 6], [1, 14, 15, 16]]);
    }));
    return _exportBoth.apply(this, arguments);
  }
  document.addEventListener('click', function (e) {
    var _e$target, _e$target$closest;
    var btn = (_e$target = e.target) === null || _e$target === void 0 || (_e$target$closest = _e$target.closest) === null || _e$target$closest === void 0 ? void 0 : _e$target$closest.call(_e$target, '.pw-office-export');
    if (!btn) return;
    var row = btn.closest('.pw-archive-row');
    if (!row) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    exportBoth(row, btn);
  }, true);
  setTimeout(function () {
    var _document$querySelect;
    return (_document$querySelect = document.querySelector('.pw-archive-overlay')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.remove();
  }, 900);
})();