function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var ROLE_KEY = 'pw-collaudo-role';
  var DEPT_CODE_KEY = 'pw-collaudo-access-code';
  var OFFICE_LOCAL_KEY = 'pw-collaudo-office-code';
  var OFFICE_SESSION_KEY = 'pw-collaudo-office-code-session';
  var SYNC_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  var EXPORT_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-export';
  if (String(localStorage.getItem(ROLE_KEY) || '') !== 'office') return;
  var style = document.createElement('style');
  style.textContent = "\n    .pw-archive-overlay[hidden]{display:none!important}\n    body.pw-role-office .sheet,body.pw-role-office .pw-complete-archive-btn{display:none!important}\n    body.pw-role-office .topbar>strong,body.pw-role-office .topbar>select,body.pw-role-office .topbar>button:not(.pw-archive-btn):not(.pw-office-top-switch){display:none!important}\n    body.pw-role-office .topbar{justify-content:flex-end!important;gap:10px!important;min-height:56px}\n    .pw-office-top-switch,.pw-office-switch-access,.pw-office-close-archive{border:0!important;border-radius:8px!important;padding:9px 12px!important;font-weight:700!important;cursor:pointer!important}\n    .pw-office-top-switch,.pw-office-switch-access{background:#c7a044!important;color:#111!important}.pw-office-close-archive{background:#fff!important;color:#111!important}\n    .pw-office-head-actions{display:flex;gap:8px;align-items:center;justify-content:flex-end;flex-wrap:wrap}\n    .pw-office-open-pdf,.pw-office-export{border:1px solid #c7a044!important;background:#c7a044!important;color:#111!important;border-radius:8px!important;padding:9px 12px!important;font-weight:700!important;cursor:pointer!important;white-space:nowrap!important}\n    .pw-office-delete{width:40px!important;min-width:40px!important;height:38px!important;border:1px solid #b42318!important;background:#fff!important;color:#b42318!important;border-radius:8px!important;font-size:18px!important;cursor:pointer!important;padding:0!important;display:inline-flex!important;align-items:center!important;justify-content:center!important}\n    .pw-archive-row{grid-template-columns:minmax(150px,1fr) minmax(105px,.65fr) minmax(140px,.75fr) auto auto auto!important}\n    @media(max-width:700px){.pw-archive-row{grid-template-columns:1fr!important}.pw-office-open-pdf,.pw-office-export,.pw-office-delete{width:100%!important;min-width:100%!important;min-height:42px!important;margin-top:4px}.pw-office-head-actions{width:100%}}\n  ";
  document.head.appendChild(style);
  document.body.classList.add('pw-role-office');
  function officeCode() {
    var code = String(localStorage.getItem(OFFICE_LOCAL_KEY) || sessionStorage.getItem(OFFICE_SESSION_KEY) || '').trim();
    if (code && !sessionStorage.getItem(OFFICE_SESSION_KEY)) sessionStorage.setItem(OFFICE_SESSION_KEY, code);
    return code;
  }
  function rowCommessa(row) {
    var _row$querySelector;
    return String(((_row$querySelector = row.querySelector('.pw-archive-commessa')) === null || _row$querySelector === void 0 ? void 0 : _row$querySelector.textContent) || '').replace(/^\s*Commessa\s*/i, '').trim();
  }
  function changeAccess() {
    if (!confirm('Vuoi uscire dall’area Ufficio e inserire un altro codice di accesso?')) return;
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(DEPT_CODE_KEY);
    localStorage.removeItem(OFFICE_LOCAL_KEY);
    sessionStorage.removeItem(OFFICE_SESSION_KEY);
    location.replace(location.pathname + '?access=' + Date.now());
  }
  function closeArchive() {
    var _document$querySelect;
    (_document$querySelect = document.querySelector('.pw-archive-overlay')) === null || _document$querySelect === void 0 || _document$querySelect.remove();
  }
  function installTopSwitch() {
    var topbar = document.querySelector('.topbar');
    if (!topbar || topbar.querySelector('.pw-office-top-switch')) return;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'pw-office-top-switch';
    b.textContent = 'Cambia accesso';
    b.addEventListener('click', changeAccess);
    topbar.appendChild(b);
  }
  function installArchiveHeader() {
    var _head$querySelector;
    var overlay = document.querySelector('.pw-archive-overlay'),
      head = overlay === null || overlay === void 0 ? void 0 : overlay.querySelector('.pw-archive-head');
    if (!overlay || !head || head.querySelector('.pw-office-head-actions')) return;
    (_head$querySelector = head.querySelector('.pw-archive-close')) === null || _head$querySelector === void 0 || _head$querySelector.remove();
    var actions = document.createElement('div');
    actions.className = 'pw-office-head-actions';
    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'pw-office-close-archive';
    close.textContent = 'Chiudi archivio';
    close.addEventListener('click', closeArchive);
    var change = document.createElement('button');
    change.type = 'button';
    change.className = 'pw-office-switch-access';
    change.textContent = 'Cambia accesso';
    change.addEventListener('click', changeAccess);
    actions.append(close, change);
    head.appendChild(actions);
  }
  function filenameFromDisposition(v, fallback) {
    var m = String(v || '').match(/filename="?([^";]+)"?/i);
    return (m === null || m === void 0 ? void 0 : m[1]) || fallback;
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
            if (!(!code || !commessa)) {
              _context.n = 2;
              break;
            }
            throw new Error('missing_data');
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
            throw new Error(((_data = data) === null || _data === void 0 ? void 0 : _data.error) || "list_".concat(res.status));
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
  function requestFile(_x2, _x3) {
    return _requestFile.apply(this, arguments);
  }
  function _requestFile() {
    _requestFile = _asyncToGenerator(_regenerator().m(function _callee2(id, action) {
      var code, res, _data2, _data3, data, fallback, _t2, _t3, _t4;
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
            return fetch("".concat(EXPORT_URL, "?v=approved-layout-zip-1&t=").concat(Date.now()), {
              method: 'POST',
              cache: 'no-store',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                action: action,
                office_code: code,
                id: id,
                nonce: Date.now()
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
            throw new Error("".concat(((_data2 = data) === null || _data2 === void 0 ? void 0 : _data2.error) || 'export_error').concat((_data3 = data) !== null && _data3 !== void 0 && _data3.detail ? ': ' + data.detail : '', " [").concat(res.status, "]"));
          case 7:
            fallback = action === 'zip' ? 'Collaudo_PW.zip' : 'Collaudo_PW.pdf';
            _context2.n = 8;
            return res.blob();
          case 8:
            _t3 = _context2.v;
            _t4 = filenameFromDisposition(res.headers.get('Content-Disposition'), fallback);
            return _context2.a(2, {
              blob: _t3,
              name: _t4
            });
        }
      }, _callee2, null, [[3, 5]]);
    }));
    return _requestFile.apply(this, arguments);
  }
  function downloadFile(file) {
    if (!(file !== null && file !== void 0 && file.blob)) return;
    var url = URL.createObjectURL(file.blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () {
      return URL.revokeObjectURL(url);
    }, 15000);
  }
  function openPdf(_x4, _x5) {
    return _openPdf.apply(this, arguments);
  }
  function _openPdf() {
    _openPdf = _asyncToGenerator(_regenerator().m(function _callee3(row, btn) {
      var popup, old, id, file, url, _t5;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            popup = window.open('', '_blank');
            old = btn.textContent;
            btn.disabled = true;
            btn.textContent = 'APRO…';
            _context3.p = 1;
            _context3.n = 2;
            return resolveId(row);
          case 2:
            id = _context3.v;
            _context3.n = 3;
            return requestFile(id, 'pdf');
          case 3:
            file = _context3.v;
            url = URL.createObjectURL(file.blob);
            if (popup) popup.location.href = url;else window.open(url, '_blank');
            setTimeout(function () {
              return URL.revokeObjectURL(url);
            }, 60000);
            _context3.n = 5;
            break;
          case 4:
            _context3.p = 4;
            _t5 = _context3.v;
            if (popup) popup.close();
            console.error(_t5);
            alert('Errore apertura PDF: ' + String((_t5 === null || _t5 === void 0 ? void 0 : _t5.message) || _t5));
          case 5:
            _context3.p = 5;
            btn.disabled = false;
            btn.textContent = old;
            return _context3.f(5);
          case 6:
            return _context3.a(2);
        }
      }, _callee3, null, [[1, 4, 5, 6]]);
    }));
    return _openPdf.apply(this, arguments);
  }
  function exportZip(_x6, _x7) {
    return _exportZip.apply(this, arguments);
  }
  function _exportZip() {
    _exportZip = _asyncToGenerator(_regenerator().m(function _callee4(row, btn) {
      var old, id, file, _t6;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            old = btn.textContent;
            btn.disabled = true;
            btn.textContent = 'PREPARO ZIP…';
            _context4.p = 1;
            _context4.n = 2;
            return resolveId(row);
          case 2:
            id = _context4.v;
            _context4.n = 3;
            return requestFile(id, 'zip');
          case 3:
            file = _context4.v;
            downloadFile(file);
            btn.textContent = 'ZIP SCARICATO ✓';
            setTimeout(function () {
              return btn.textContent = old;
            }, 2200);
            _context4.n = 5;
            break;
          case 4:
            _context4.p = 4;
            _t6 = _context4.v;
            console.error('Esportazione ZIP', _t6);
            alert('Errore esportazione ZIP: ' + String((_t6 === null || _t6 === void 0 ? void 0 : _t6.message) || _t6));
            btn.textContent = old;
          case 5:
            _context4.p = 5;
            btn.disabled = false;
            return _context4.f(5);
          case 6:
            return _context4.a(2);
        }
      }, _callee4, null, [[1, 4, 5, 6]]);
    }));
    return _exportZip.apply(this, arguments);
  }
  function deleteArchive(_x8, _x9) {
    return _deleteArchive.apply(this, arguments);
  }
  function _deleteArchive() {
    _deleteArchive = _asyncToGenerator(_regenerator().m(function _callee5(row, btn) {
      var commessa, _data4, id, code, res, data, _t7, _t8;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            commessa = rowCommessa(row) || 'questa commessa';
            if (confirm("Vuoi eliminare definitivamente la commessa ".concat(commessa, " dall\u2019archivio collaudi?"))) {
              _context5.n = 1;
              break;
            }
            return _context5.a(2);
          case 1:
            btn.disabled = true;
            _context5.p = 2;
            _context5.n = 3;
            return resolveId(row);
          case 3:
            id = _context5.v;
            code = officeCode();
            _context5.n = 4;
            return fetch(SYNC_URL, {
              method: 'POST',
              cache: 'no-store',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                action: 'archive_delete',
                office_code: code,
                id: id
              })
            });
          case 4:
            res = _context5.v;
            data = {};
            _context5.p = 5;
            _context5.n = 6;
            return res.json();
          case 6:
            data = _context5.v;
            _context5.n = 8;
            break;
          case 7:
            _context5.p = 7;
            _t7 = _context5.v;
          case 8:
            if (res.ok) {
              _context5.n = 9;
              break;
            }
            throw new Error(((_data4 = data) === null || _data4 === void 0 ? void 0 : _data4.error) || "delete_".concat(res.status));
          case 9:
            row.remove();
            _context5.n = 11;
            break;
          case 10:
            _context5.p = 10;
            _t8 = _context5.v;
            console.error(_t8);
            btn.disabled = false;
            alert('Non è stato possibile eliminare il collaudo. Riprova.');
          case 11:
            return _context5.a(2);
        }
      }, _callee5, null, [[5, 7], [2, 10]]);
    }));
    return _deleteArchive.apply(this, arguments);
  }
  function enhanceRows() {
    installTopSwitch();
    installArchiveHeader();
    document.querySelectorAll('.pw-archive-row').forEach(function (row) {
      var open = row.querySelector('.pw-archive-open');
      if (!open) return;
      if (open.dataset.officeApproved !== '2') {
        var fresh = open.cloneNode(true);
        open.replaceWith(fresh);
        open = fresh;
        open.dataset.officeApproved = '2';
        open.classList.add('pw-office-open-pdf');
        open.textContent = 'APRI PDF';
        open.addEventListener('click', function () {
          return openPdf(row, open);
        });
      }
      var exp = row.querySelector('.pw-office-export');
      if (!exp) {
        exp = document.createElement('button');
        exp.type = 'button';
        exp.className = 'pw-office-export';
        exp.dataset.officeApproved = '2';
        exp.textContent = 'ESPORTA ZIP';
        exp.title = 'Scarica sul PC uno ZIP con rapportino PDF e DDT allegato';
        exp.addEventListener('click', function () {
          return exportZip(row, exp);
        });
        open.insertAdjacentElement('afterend', exp);
      } else if (exp.dataset.officeApproved !== '2') {
        var _fresh = exp.cloneNode(true);
        exp.replaceWith(_fresh);
        exp = _fresh;
        exp.dataset.officeApproved = '2';
        exp.textContent = 'ESPORTA ZIP';
        exp.title = 'Scarica sul PC uno ZIP con rapportino PDF e DDT allegato';
        exp.addEventListener('click', function () {
          return exportZip(row, exp);
        });
      }
      if (!row.querySelector('.pw-office-delete')) {
        var del = document.createElement('button');
        del.type = 'button';
        del.className = 'pw-office-delete';
        del.textContent = '🗑';
        del.title = 'Elimina questa commessa dall’archivio';
        del.addEventListener('click', function () {
          return deleteArchive(row, del);
        });
        exp.insertAdjacentElement('afterend', del);
      }
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeArchive();
  });
  var observer = new MutationObserver(enhanceRows);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  enhanceRows();
  installTopSwitch();
  setInterval(enhanceRows, 500);
})();