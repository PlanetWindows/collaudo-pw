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
  var archiveItems = [];
  var style = document.createElement('style');
  style.textContent = "\n    .pw-archive-overlay[hidden] { display: none !important; }\n\n    .pw-office-export,\n    .pw-office-open-pdf {\n      border: 1px solid #c7a044 !important;\n      background: #c7a044 !important;\n      color: #111 !important;\n      border-radius: 8px !important;\n      padding: 9px 12px !important;\n      font-weight: 700 !important;\n      cursor: pointer !important;\n      white-space: nowrap !important;\n    }\n\n    .pw-office-delete {\n      width: 40px !important;\n      min-width: 40px !important;\n      height: 38px !important;\n      border: 1px solid #b42318 !important;\n      background: #fff !important;\n      color: #b42318 !important;\n      border-radius: 8px !important;\n      font-size: 18px !important;\n      line-height: 1 !important;\n      cursor: pointer !important;\n      display: inline-flex !important;\n      align-items: center !important;\n      justify-content: center !important;\n      padding: 0 !important;\n    }\n\n    .pw-office-delete:hover {\n      background: #fff3f2 !important;\n    }\n\n    .pw-archive-row {\n      grid-template-columns: minmax(160px, 1fr) minmax(150px, .8fr) minmax(150px, .8fr) auto auto auto !important;\n    }\n\n    .pw-office-head-actions {\n      display: flex;\n      align-items: center;\n      justify-content: flex-end;\n      gap: 8px;\n      flex-wrap: wrap;\n    }\n\n    .pw-office-close-archive,\n    .pw-office-switch-access {\n      border: 0 !important;\n      border-radius: 8px !important;\n      padding: 9px 12px !important;\n      font-weight: 700 !important;\n      cursor: pointer !important;\n      white-space: nowrap !important;\n    }\n\n    .pw-office-close-archive {\n      background: #fff !important;\n      color: #111 !important;\n    }\n\n    .pw-office-switch-access {\n      background: #c7a044 !important;\n      color: #111 !important;\n    }\n\n    @media (max-width: 700px) {\n      .pw-archive-row { grid-template-columns: 1fr !important; }\n      .pw-office-export,\n      .pw-office-open-pdf { width: 100%; margin-top: 4px; min-height: 42px; }\n      .pw-office-delete { width: 100% !important; min-width: 100% !important; height: 42px !important; margin-top: 4px; }\n      .pw-archive-head { align-items: flex-start !important; }\n      .pw-office-head-actions { width: 100%; }\n      .pw-office-close-archive,\n      .pw-office-switch-access { flex: 1 1 auto; }\n    }\n  ";
  document.head.appendChild(style);
  function officeCode() {
    var code = String(localStorage.getItem(OFFICE_LOCAL_KEY) || sessionStorage.getItem(OFFICE_SESSION_KEY) || '').trim();
    if (code && !sessionStorage.getItem(OFFICE_SESSION_KEY)) sessionStorage.setItem(OFFICE_SESSION_KEY, code);
    return code;
  }
  function normalize(value) {
    return String(value || '').trim().toUpperCase().replace(/\s+/g, ' ');
  }
  function rowCommessa(row) {
    var _row$querySelector;
    var text = ((_row$querySelector = row.querySelector('.pw-archive-commessa')) === null || _row$querySelector === void 0 ? void 0 : _row$querySelector.textContent) || '';
    return text.replace(/^\s*Commessa\s*/i, '').trim();
  }
  function filenameFromDisposition(value) {
    var m = String(value || '').match(/filename="?([^";]+)"?/i);
    return m ? m[1] : 'Collaudo_PW.pdf';
  }
  function changeAccess() {
    if (!confirm('Vuoi uscire dall’area Ufficio e inserire un altro codice di accesso?')) return;
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(DEPT_CODE_KEY);
    localStorage.removeItem(OFFICE_LOCAL_KEY);
    sessionStorage.removeItem(OFFICE_SESSION_KEY);
    location.reload();
  }
  function enhanceArchiveHeader() {
    var overlay = document.querySelector('.pw-archive-overlay');
    var head = overlay === null || overlay === void 0 ? void 0 : overlay.querySelector('.pw-archive-head');
    if (!overlay || !head) return;
    var actions = head.querySelector('.pw-office-head-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'pw-office-head-actions';
      var oldClose = head.querySelector('.pw-archive-close');
      if (oldClose) {
        oldClose.textContent = 'Chiudi archivio';
        oldClose.classList.add('pw-office-close-archive');
        oldClose.addEventListener('click', function () {
          overlay.hidden = true;
        });
        actions.appendChild(oldClose);
      } else {
        var close = document.createElement('button');
        close.type = 'button';
        close.className = 'pw-office-close-archive';
        close.textContent = 'Chiudi archivio';
        close.addEventListener('click', function () {
          overlay.hidden = true;
        });
        actions.appendChild(close);
      }
      var change = document.createElement('button');
      change.type = 'button';
      change.className = 'pw-office-switch-access';
      change.textContent = 'Cambia accesso';
      change.addEventListener('click', changeAccess);
      actions.appendChild(change);
      head.appendChild(actions);
    }
  }
  function applyItemsToRows(items) {
    archiveItems = Array.isArray(items) ? items : [];
    var byCommessa = new Map(archiveItems.map(function (item) {
      return [normalize(item === null || item === void 0 ? void 0 : item.commessa), item];
    }));
    document.querySelectorAll('.pw-archive-row').forEach(function (row) {
      var item = byCommessa.get(normalize(rowCommessa(row)));
      if (item !== null && item !== void 0 && item.id) row.dataset.archiveId = String(item.id);
    });
  }
  function fetchArchiveItems() {
    return _fetchArchiveItems.apply(this, arguments);
  }
  function _fetchArchiveItems() {
    _fetchArchiveItems = _asyncToGenerator(_regenerator().m(function _callee2() {
      var _data, _data2;
      var search,
        code,
        res,
        data,
        items,
        _args2 = arguments,
        _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            search = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : '';
            code = officeCode();
            if (code) {
              _context2.n = 1;
              break;
            }
            throw new Error('office_code_missing');
          case 1:
            _context2.n = 2;
            return fetch(SYNC_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                action: 'archive_list',
                office_code: code,
                search: search
              })
            });
          case 2:
            res = _context2.v;
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
            if (res.ok) {
              _context2.n = 7;
              break;
            }
            throw new Error(((_data = data) === null || _data === void 0 ? void 0 : _data.error) || "archive_list_".concat(res.status));
          case 7:
            items = Array.isArray((_data2 = data) === null || _data2 === void 0 ? void 0 : _data2.items) ? data.items : [];
            if (!search) applyItemsToRows(items);
            return _context2.a(2, items);
        }
      }, _callee2, null, [[3, 5]]);
    }));
    return _fetchArchiveItems.apply(this, arguments);
  }
  function resolveArchiveId(_x) {
    return _resolveArchiveId.apply(this, arguments);
  }
  function _resolveArchiveId() {
    _resolveArchiveId = _asyncToGenerator(_regenerator().m(function _callee3(row) {
      var commessa, wanted, cached, items, exact;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            if (!row.dataset.archiveId) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2, row.dataset.archiveId);
          case 1:
            commessa = rowCommessa(row);
            wanted = normalize(commessa);
            cached = archiveItems.find(function (item) {
              return normalize(item === null || item === void 0 ? void 0 : item.commessa) === wanted;
            });
            if (!(cached !== null && cached !== void 0 && cached.id)) {
              _context3.n = 2;
              break;
            }
            row.dataset.archiveId = String(cached.id);
            return _context3.a(2, row.dataset.archiveId);
          case 2:
            _context3.n = 3;
            return fetchArchiveItems(commessa);
          case 3:
            items = _context3.v;
            exact = items.find(function (item) {
              return normalize(item === null || item === void 0 ? void 0 : item.commessa) === wanted;
            }) || items[0];
            if (exact !== null && exact !== void 0 && exact.id) {
              _context3.n = 4;
              break;
            }
            throw new Error('archive_id_not_found');
          case 4:
            row.dataset.archiveId = String(exact.id);
            return _context3.a(2, row.dataset.archiveId);
        }
      }, _callee3);
    }));
    return _resolveArchiveId.apply(this, arguments);
  }
  function fetchPdf(_x2) {
    return _fetchPdf.apply(this, arguments);
  }
  function _fetchPdf() {
    _fetchPdf = _asyncToGenerator(_regenerator().m(function _callee4(id) {
      var code, res, _data3, _data4, data, _t3, _t4, _t5;
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
            return fetch(EXPORT_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                action: 'pdf',
                office_code: code,
                id: id
              })
            });
          case 2:
            res = _context4.v;
            if (res.ok) {
              _context4.n = 8;
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
            _t3 = _context4.v;
          case 6:
            if (!(res.status === 401 || ((_data3 = data) === null || _data3 === void 0 ? void 0 : _data3.error) === 'invalid_office_code')) {
              _context4.n = 7;
              break;
            }
            throw new Error('invalid_office_code');
          case 7:
            throw new Error(((_data4 = data) === null || _data4 === void 0 ? void 0 : _data4.error) || "pdf_".concat(res.status));
          case 8:
            _context4.n = 9;
            return res.blob();
          case 9:
            _t4 = _context4.v;
            _t5 = filenameFromDisposition(res.headers.get('Content-Disposition'));
            return _context4.a(2, {
              blob: _t4,
              name: _t5
            });
        }
      }, _callee4, null, [[3, 5]]);
    }));
    return _fetchPdf.apply(this, arguments);
  }
  function openPdf(_x3, _x4) {
    return _openPdf.apply(this, arguments);
  }
  function _openPdf() {
    _openPdf = _asyncToGenerator(_regenerator().m(function _callee5(row, button) {
      var popup, old, id, _yield$fetchPdf, blob, url, a, _t6;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            popup = window.open('', '_blank');
            if (popup) {
              try {
                popup.document.title = 'Apertura PDF…';
                popup.document.body.innerHTML = '<div style="font-family:Arial,sans-serif;padding:24px">Apertura PDF…</div>';
              } catch (_) {}
            }
            old = button.textContent;
            button.disabled = true;
            button.textContent = 'APRO…';
            _context5.p = 1;
            _context5.n = 2;
            return resolveArchiveId(row);
          case 2:
            id = _context5.v;
            _context5.n = 3;
            return fetchPdf(id);
          case 3:
            _yield$fetchPdf = _context5.v;
            blob = _yield$fetchPdf.blob;
            url = URL.createObjectURL(blob);
            if (popup) {
              popup.location.href = url;
            } else {
              a = document.createElement('a');
              a.href = url;
              a.target = '_blank';
              a.rel = 'noopener';
              document.body.appendChild(a);
              a.click();
              a.remove();
            }
            setTimeout(function () {
              return URL.revokeObjectURL(url);
            }, 60000);
            _context5.n = 5;
            break;
          case 4:
            _context5.p = 4;
            _t6 = _context5.v;
            if (popup) popup.close();
            console.error('Apertura PDF archivio', _t6);
            if (String((_t6 === null || _t6 === void 0 ? void 0 : _t6.message) || _t6).includes('invalid_office_code')) {
              alert('Codice Ufficio non valido. Usa “Cambia accesso” e rientra.');
            } else {
              alert('Non è stato possibile aprire il PDF. Riprova.');
            }
          case 5:
            _context5.p = 5;
            button.disabled = false;
            button.textContent = old;
            return _context5.f(5);
          case 6:
            return _context5.a(2);
        }
      }, _callee5, null, [[1, 4, 5, 6]]);
    }));
    return _openPdf.apply(this, arguments);
  }
  function downloadPdf(_x5, _x6) {
    return _downloadPdf.apply(this, arguments);
  }
  function _downloadPdf() {
    _downloadPdf = _asyncToGenerator(_regenerator().m(function _callee6(row, button) {
      var old, id, _yield$fetchPdf2, blob, name, url, a, _t7;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            old = button.textContent;
            button.disabled = true;
            button.textContent = 'ESPORTO…';
            _context6.p = 1;
            _context6.n = 2;
            return resolveArchiveId(row);
          case 2:
            id = _context6.v;
            _context6.n = 3;
            return fetchPdf(id);
          case 3:
            _yield$fetchPdf2 = _context6.v;
            blob = _yield$fetchPdf2.blob;
            name = _yield$fetchPdf2.name;
            url = URL.createObjectURL(blob);
            a = document.createElement('a');
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(function () {
              return URL.revokeObjectURL(url);
            }, 4000);
            _context6.n = 5;
            break;
          case 4:
            _context6.p = 4;
            _t7 = _context6.v;
            console.error('Esportazione PDF archivio', _t7);
            if (String((_t7 === null || _t7 === void 0 ? void 0 : _t7.message) || _t7).includes('invalid_office_code')) {
              alert('Codice Ufficio non valido. Usa “Cambia accesso” e rientra.');
            } else {
              alert('Non è stato possibile esportare il PDF sul PC. Riprova.');
            }
          case 5:
            _context6.p = 5;
            button.disabled = false;
            button.textContent = old;
            return _context6.f(5);
          case 6:
            return _context6.a(2);
        }
      }, _callee6, null, [[1, 4, 5, 6]]);
    }));
    return _downloadPdf.apply(this, arguments);
  }
  function deleteArchive(_x7, _x8) {
    return _deleteArchive.apply(this, arguments);
  }
  function _deleteArchive() {
    _deleteArchive = _asyncToGenerator(_regenerator().m(function _callee7(row, button) {
      var commessa, old, id, code, res, data, _data5, _data6, list, _t8, _t9;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.p = _context7.n) {
          case 0:
            commessa = rowCommessa(row) || 'questa commessa';
            if (confirm("Vuoi eliminare definitivamente la commessa ".concat(commessa, " dall\u2019archivio collaudi?"))) {
              _context7.n = 1;
              break;
            }
            return _context7.a(2);
          case 1:
            old = button.textContent;
            button.disabled = true;
            button.textContent = '…';
            _context7.p = 2;
            _context7.n = 3;
            return resolveArchiveId(row);
          case 3:
            id = _context7.v;
            code = officeCode();
            if (code) {
              _context7.n = 4;
              break;
            }
            throw new Error('office_code_missing');
          case 4:
            _context7.n = 5;
            return fetch(SYNC_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                action: 'archive_delete',
                office_code: code,
                id: id
              })
            });
          case 5:
            res = _context7.v;
            data = {};
            _context7.p = 6;
            _context7.n = 7;
            return res.json();
          case 7:
            data = _context7.v;
            _context7.n = 9;
            break;
          case 8:
            _context7.p = 8;
            _t8 = _context7.v;
          case 9:
            if (res.ok) {
              _context7.n = 11;
              break;
            }
            if (!(res.status === 401 || ((_data5 = data) === null || _data5 === void 0 ? void 0 : _data5.error) === 'invalid_office_code')) {
              _context7.n = 10;
              break;
            }
            throw new Error('invalid_office_code');
          case 10:
            throw new Error(((_data6 = data) === null || _data6 === void 0 ? void 0 : _data6.error) || "archive_delete_".concat(res.status));
          case 11:
            archiveItems = archiveItems.filter(function (item) {
              return String((item === null || item === void 0 ? void 0 : item.id) || '') !== String(id);
            });
            row.remove();
            list = document.querySelector('.pw-archive-list');
            if (list && !list.querySelector('.pw-archive-row')) {
              list.innerHTML = '<div class="pw-archive-empty">Nessun collaudo archiviato.</div>';
            }
            _context7.n = 13;
            break;
          case 12:
            _context7.p = 12;
            _t9 = _context7.v;
            console.error('Eliminazione archivio', _t9);
            if (String((_t9 === null || _t9 === void 0 ? void 0 : _t9.message) || _t9).includes('invalid_office_code')) {
              alert('Codice Ufficio non valido. Usa “Cambia accesso” e rientra.');
            } else {
              alert('Non è stato possibile eliminare il collaudo. Riprova.');
            }
            button.disabled = false;
            button.textContent = old;
          case 13:
            return _context7.a(2);
        }
      }, _callee7, null, [[6, 8], [2, 12]]);
    }));
    return _deleteArchive.apply(this, arguments);
  }
  function enhanceRows() {
    enhanceArchiveHeader();
    document.querySelectorAll('.pw-archive-row').forEach(function (row) {
      var open = row.querySelector('.pw-archive-open');
      if (!open) return;
      if (open.dataset.pwOfficePdf !== '1') {
        var replacement = open.cloneNode(true);
        open.replaceWith(replacement);
        open = replacement;
        open.dataset.pwOfficePdf = '1';
        open.classList.add('pw-office-open-pdf');
        open.textContent = 'APRI PDF';
        open.title = 'Apri il PDF archiviato';
        open.addEventListener('click', function () {
          return openPdf(row, open);
        });
      }
      var exportBtn = row.querySelector('.pw-office-export');
      if (!exportBtn) {
        exportBtn = document.createElement('button');
        exportBtn.type = 'button';
        exportBtn.className = 'pw-office-export';
        exportBtn.textContent = 'ESPORTA PDF';
        exportBtn.title = 'Scarica direttamente il PDF sul computer';
        exportBtn.addEventListener('click', function () {
          return downloadPdf(row, exportBtn);
        });
        open.insertAdjacentElement('afterend', exportBtn);
      }
      if (!row.querySelector('.pw-office-delete')) {
        var deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'pw-office-delete';
        deleteBtn.textContent = '🗑';
        deleteBtn.title = 'Elimina questa commessa dall’archivio';
        deleteBtn.setAttribute('aria-label', 'Elimina questa commessa dall’archivio');
        deleteBtn.addEventListener('click', function () {
          return deleteArchive(row, deleteBtn);
        });
        exportBtn.insertAdjacentElement('afterend', deleteBtn);
      }
    });
    if (archiveItems.length) applyItemsToRows(archiveItems);
  }
  var originalFetch = window.fetch.bind(window);
  window.fetch = _asyncToGenerator(_regenerator().m(function _callee() {
    var res,
      url,
      init,
      clone,
      data,
      items,
      _args = arguments,
      _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.n = 1;
          return originalFetch.apply(void 0, _args);
        case 1:
          res = _context.v;
          _context.p = 2;
          url = String((_args.length <= 0 ? undefined : _args[0]) || '');
          init = (_args.length <= 1 ? undefined : _args[1]) || {};
          if (!(url.includes('/collaudo-sync') && String((init === null || init === void 0 ? void 0 : init.body) || '').includes('archive_list'))) {
            _context.n = 4;
            break;
          }
          clone = res.clone();
          _context.n = 3;
          return clone.json();
        case 3:
          data = _context.v;
          items = Array.isArray(data === null || data === void 0 ? void 0 : data.items) ? data.items : [];
          setTimeout(function () {
            applyItemsToRows(items);
            enhanceRows();
          }, 0);
        case 4:
          _context.n = 6;
          break;
        case 5:
          _context.p = 5;
          _t = _context.v;
        case 6:
          return _context.a(2, res);
      }
    }, _callee, null, [[2, 5]]);
  }));
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    var overlay = document.querySelector('.pw-archive-overlay:not([hidden])');
    if (overlay) overlay.hidden = true;
  });
  var observer = new MutationObserver(enhanceRows);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  setTimeout(enhanceRows, 100);
})();