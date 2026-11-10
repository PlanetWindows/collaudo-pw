function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  'use strict';

  if (localStorage.getItem('pw-collaudo-role') !== 'office') return;
  var SYNC_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  var EXPORT_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-export';
  var PAGE_SIZE = 500;
  var exporting = false;
  var cancelled = false;
  var activeController = null;
  var cachedWeeks = null;
  var encoder = new TextEncoder();
  var types = {
    pvc: 'PVC',
    pvc_speciali: 'PVC - Pezzi speciali',
    pvc_vie_fuga: 'PVC - Vie di fuga',
    alu: 'Alluminio',
    alu_speciali: 'alu_speciali',
    alu_vie_fuga: 'Alluminio - Vie di fuga'
  };
  var style = document.createElement('style');
  style.textContent = ['.pw-office-bulk-wrap{position:relative;display:inline-flex;align-items:center}', '.pw-office-bulk-trigger,.pw-office-pdf-direct{border:1px solid #c7a044;background:#c7a044;color:#111;border-radius:8px;padding:9px 12px;font-weight:700;cursor:pointer;white-space:nowrap}', '.pw-office-bulk-menu{position:absolute;right:0;top:calc(100% + 8px);z-index:3000;background:#fff;border:1px solid #d7c6a3;border-radius:12px;box-shadow:0 12px 32px rgba(0,0,0,.2);padding:14px;min-width:290px;max-width:min(94vw,390px);color:#161616;text-align:left}', '.pw-office-bulk-menu[hidden]{display:none!important}', '.pw-office-bulk-menu strong{display:block;margin-bottom:12px;font-size:15px}', '.pw-office-bulk-menu button:not(.pw-office-bulk-cancel){display:block;width:100%;margin:7px 0;border:1px solid #d8c9a9;border-radius:7px;background:#f8f5ee;color:#111;text-align:left;padding:10px;font-weight:700;cursor:pointer}', '.pw-office-bulk-menu button:disabled{opacity:.5;cursor:not-allowed}', '.pw-office-bulk-menu select{width:100%;padding:9px;border:1px solid #c8c8c8;border-radius:7px;background:#fff}', '.pw-office-bulk-status{font-size:12px;line-height:1.5;min-height:20px;margin-top:9px}', '.pw-office-bulk-cancel{background:#fff;border:1px solid #a33;border-radius:7px;color:#a22;padding:8px 10px;cursor:pointer;margin-top:7px}', '.pw-office-bulk-cancel[hidden]{display:none!important}', '.pw-office-select-label{display:flex;gap:8px;align-items:center;min-width:0}', '.pw-office-select{width:17px;height:17px;flex:none;accent-color:#b28b39;cursor:pointer}', '.pw-office-select-all{display:flex;gap:7px;align-items:center;font-size:13px;font-weight:600;margin:0 4px 0 0}', '.pw-archive-row{grid-template-columns:minmax(135px,1fr) minmax(100px,.65fr) minmax(125px,.8fr) auto auto auto auto!important}', '.pw-office-pdf-direct{background:#fff!important;padding:9px 11px!important}', '@media(max-width:800px){.pw-archive-row{grid-template-columns:1fr!important}.pw-office-pdf-direct{width:100%!important;min-height:42px!important;margin-top:4px}.pw-office-bulk-menu{right:-90px;min-width:275px}.pw-office-select-all{padding:6px}}'].join('\n');
  document.head.appendChild(style);
  function officeCode() {
    return String(localStorage.getItem('pw-collaudo-office-code') || sessionStorage.getItem('pw-collaudo-office-code-session') || '').trim();
  }
  function normalize(value) {
    return String(value || '').trim().toUpperCase().replace(/\s+/g, ' ');
  }
  function safe(value) {
    return String(value || 'collaudo').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9._-]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 90) || 'collaudo';
  }
  function dateLabel(value) {
    var date = new Date(value);
    if (!Number.isFinite(date.getTime())) return String(value || '');
    return new Intl.DateTimeFormat('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
  function weekKey(value) {
    var date = new Date(value);
    if (!Number.isFinite(date.getTime())) return '';
    var day = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    day.setUTCDate(day.getUTCDate() + 4 - (day.getUTCDay() || 7));
    var year = day.getUTCFullYear();
    var first = new Date(Date.UTC(year, 0, 1));
    var week = Math.ceil(((day - first) / 86400000 + 1) / 7);
    return year + '-W' + String(week).padStart(2, '0');
  }
  function weekLabel(key) {
    return key ? 'Settimana ' + key.slice(-2) + ' · ' + key.slice(0, 4) : 'Data non disponibile';
  }
  function rowKey(row) {
    var _row$querySelector, _row$querySelector2, _row$querySelector3;
    var commessa = String(((_row$querySelector = row.querySelector('.pw-archive-commessa')) === null || _row$querySelector === void 0 ? void 0 : _row$querySelector.textContent) || '').replace(/^\s*Commessa\s*/i, '');
    return [normalize(commessa), normalize((_row$querySelector2 = row.querySelector('.pw-archive-type')) === null || _row$querySelector2 === void 0 ? void 0 : _row$querySelector2.textContent), normalize((_row$querySelector3 = row.querySelector('.pw-archive-date')) === null || _row$querySelector3 === void 0 ? void 0 : _row$querySelector3.textContent)].join('|');
  }
  function itemKey(item) {
    return [normalize(item.commessa), normalize(types[item.form_type] || item.form_type), normalize(dateLabel(item.completed_at))].join('|');
  }
  function rowItemsMatch(rows, items) {
    var byKey = new Map();
    items.forEach(function (item) {
      var key = itemKey(item);
      if (!byKey.has(key)) byKey.set(key, []);
      byKey.get(key).push(item);
    });
    return rows.map(function (row) {
      var matches = byKey.get(rowKey(row)) || [];
      var id = row.dataset.archiveId;
      var index = id ? matches.findIndex(function (item) {
        return String(item.id) === id;
      }) : -1;
      return index >= 0 ? matches.splice(index, 1)[0] : matches.shift();
    });
  }
  function fetchPage() {
    return _fetchPage.apply(this, arguments);
  }
  function _fetchPage() {
    _fetchPage = _asyncToGenerator(_regenerator().m(function _callee2() {
      var search,
        formType,
        offset,
        code,
        response,
        body,
        _args2 = arguments,
        _t;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            search = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : '';
            formType = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : '';
            offset = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 0;
            code = officeCode();
            if (code) {
              _context2.n = 1;
              break;
            }
            throw new Error('Codice Ufficio mancante: esci e accedi nuovamente.');
          case 1:
            _context2.n = 2;
            return fetch(SYNC_URL, {
              method: 'POST',
              cache: 'no-store',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                action: 'archive_list',
                office_code: code,
                search: search,
                form_type: formType,
                offset: offset,
                limit: PAGE_SIZE
              })
            });
          case 2:
            response = _context2.v;
            body = {};
            _context2.p = 3;
            _context2.n = 4;
            return response.json();
          case 4:
            body = _context2.v;
            _context2.n = 6;
            break;
          case 5:
            _context2.p = 5;
            _t = _context2.v;
          case 6:
            if (response.ok) {
              _context2.n = 7;
              break;
            }
            throw new Error(body.error || 'Archivio non disponibile (' + response.status + ')');
          case 7:
            return _context2.a(2, Array.isArray(body.items) ? body.items : []);
        }
      }, _callee2, null, [[3, 5]]);
    }));
    return _fetchPage.apply(this, arguments);
  }
  function fetchAll() {
    return _fetchAll.apply(this, arguments);
  }
  function _fetchAll() {
    _fetchAll = _asyncToGenerator(_regenerator().m(function _callee3() {
      var items, seen, offset, batch;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            items = [], seen = new Set();
            offset = 0;
          case 1:
            if (!(offset < 100000)) {
              _context3.n = 6;
              break;
            }
            if (!cancelled) {
              _context3.n = 2;
              break;
            }
            throw new Error('Esportazione annullata.');
          case 2:
            _context3.n = 3;
            return fetchPage('', '', offset);
          case 3:
            batch = _context3.v;
            if (!(batch.length && seen.has(String(batch[0].id)))) {
              _context3.n = 4;
              break;
            }
            throw new Error('Il server non supporta ancora tutte le pagine dell’archivio.');
          case 4:
            batch.forEach(function (item) {
              var id = String(item.id || '');
              if (id && !seen.has(id)) {
                seen.add(id);
                items.push(item);
              }
            });
            if (!(batch.length < PAGE_SIZE)) {
              _context3.n = 5;
              break;
            }
            return _context3.a(2, items);
          case 5:
            offset += PAGE_SIZE;
            _context3.n = 1;
            break;
          case 6:
            throw new Error('Archivio troppo grande: riprova esportando una settimana.');
          case 7:
            return _context3.a(2);
        }
      }, _callee3);
    }));
    return _fetchAll.apply(this, arguments);
  }
  function download(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () {
      return URL.revokeObjectURL(url);
    }, 60000);
  }
  function fetchPdf(_x) {
    return _fetchPdf.apply(this, arguments);
  }
  function _fetchPdf() {
    _fetchPdf = _asyncToGenerator(_regenerator().m(function _callee4(id) {
      var controller, response, body, blob, _t2;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            controller = new AbortController();
            activeController = controller;
            _context4.p = 1;
            _context4.n = 2;
            return fetch(EXPORT_URL + '?bulk=' + Date.now(), {
              method: 'POST',
              cache: 'no-store',
              signal: controller.signal,
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                action: 'pdf',
                office_code: officeCode(),
                id: id,
                nonce: Date.now()
              })
            });
          case 2:
            response = _context4.v;
            if (response.ok) {
              _context4.n = 7;
              break;
            }
            body = {};
            _context4.p = 3;
            _context4.n = 4;
            return response.json();
          case 4:
            body = _context4.v;
            _context4.n = 6;
            break;
          case 5:
            _context4.p = 5;
            _t2 = _context4.v;
          case 6:
            throw new Error(body.error || 'PDF non disponibile (' + response.status + ')');
          case 7:
            _context4.n = 8;
            return response.blob();
          case 8:
            blob = _context4.v;
            if (!(!blob.size || !(response.headers.get('Content-Type') || '').toLowerCase().includes('pdf'))) {
              _context4.n = 9;
              break;
            }
            throw new Error('Risposta PDF non valida');
          case 9:
            return _context4.a(2, blob);
          case 10:
            _context4.p = 10;
            if (activeController === controller) activeController = null;
            return _context4.f(10);
          case 11:
            return _context4.a(2);
        }
      }, _callee4, null, [[3, 5], [1,, 10, 11]]);
    }));
    return _fetchPdf.apply(this, arguments);
  }
  var crcTable = function () {
    var t = [];
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ c >>> 1 : c >>> 1;
      t[n] = c >>> 0;
    }
    return t;
  }();
  function crc32(bytes) {
    var c = 0xffffffff;
    for (var i = 0; i < bytes.length; i++) c = crcTable[(c ^ bytes[i]) & 255] ^ c >>> 8;
    return (c ^ 0xffffffff) >>> 0;
  }
  function dosDateTime(value) {
    var d = new Date(value);
    var date = Number.isFinite(d.getTime()) ? d : new Date();
    var year = Math.max(1980, Math.min(2107, date.getFullYear()));
    return {
      date: year - 1980 << 9 | date.getMonth() + 1 << 5 | date.getDate(),
      time: date.getHours() << 11 | date.getMinutes() << 5 | date.getSeconds() >>> 1
    };
  }
  function zipFile(entries) {
    if (entries.length > 65535) throw new Error('Troppi file nello ZIP.');
    var chunks = [],
      directory = [];
    var offset = 0,
      centralSize = 0;
    entries.forEach(function (entry) {
      var name = encoder.encode(entry.name);
      var data = entry.bytes;
      if (name.length > 65535 || data.length > 0xffffffff) throw new Error('File troppo grande.');
      var stamp = dosDateTime(entry.date);
      var crc = crc32(data);
      var local = new Uint8Array(30 + name.length),
        l = new DataView(local.buffer);
      l.setUint32(0, 0x04034b50, true);
      l.setUint16(4, 20, true);
      l.setUint16(6, 0x800, true);
      l.setUint16(8, 0, true);
      l.setUint16(10, stamp.time, true);
      l.setUint16(12, stamp.date, true);
      l.setUint32(14, crc, true);
      l.setUint32(18, data.length, true);
      l.setUint32(22, data.length, true);
      l.setUint16(26, name.length, true);
      local.set(name, 30);
      var central = new Uint8Array(46 + name.length),
        c = new DataView(central.buffer);
      c.setUint32(0, 0x02014b50, true);
      c.setUint16(4, 20, true);
      c.setUint16(6, 20, true);
      c.setUint16(8, 0x800, true);
      c.setUint16(10, 0, true);
      c.setUint16(12, stamp.time, true);
      c.setUint16(14, stamp.date, true);
      c.setUint32(16, crc, true);
      c.setUint32(20, data.length, true);
      c.setUint32(24, data.length, true);
      c.setUint16(28, name.length, true);
      c.setUint32(42, offset, true);
      central.set(name, 46);
      chunks.push(local, data);
      directory.push(central);
      offset += local.length + data.length;
      centralSize += central.length;
    });
    if (offset + centralSize > 0xffffffff) throw new Error('ZIP troppo grande: esporta per settimana.');
    var end = new Uint8Array(22),
      e = new DataView(end.buffer);
    e.setUint32(0, 0x06054b50, true);
    e.setUint16(8, entries.length, true);
    e.setUint16(10, entries.length, true);
    e.setUint32(12, centralSize, true);
    e.setUint32(16, offset, true);
    return new Blob([].concat(chunks, directory, [end]), {
      type: 'application/zip'
    });
  }
  function ui() {
    return document.querySelector('.pw-office-bulk-menu');
  }
  function setStatus(message) {
    var _ui;
    var el = (_ui = ui()) === null || _ui === void 0 ? void 0 : _ui.querySelector('.pw-office-bulk-status');
    if (el) el.textContent = message;
  }
  function selection() {
    return Array.from(document.querySelectorAll('.pw-archive-overlay:not([hidden]) .pw-archive-row')).filter(function (row) {
      var _row$querySelector4;
      return (_row$querySelector4 = row.querySelector('.pw-office-select')) === null || _row$querySelector4 === void 0 ? void 0 : _row$querySelector4.checked;
    });
  }
  function updateSelection() {
    var _ui2;
    var count = selection().length;
    var button = (_ui2 = ui()) === null || _ui2 === void 0 ? void 0 : _ui2.querySelector('[data-export="selected"]');
    if (button) {
      button.disabled = exporting || !count;
      button.textContent = 'Esporta selezionati (' + count + ')';
    }
    var selectAll = document.querySelector('.pw-office-select-all input');
    var checks = Array.from(document.querySelectorAll('.pw-archive-overlay:not([hidden]) .pw-office-select'));
    if (selectAll) {
      selectAll.checked = !!checks.length && checks.every(function (c) {
        return c.checked;
      });
      selectAll.indeterminate = checks.some(function (c) {
        return c.checked;
      }) && !selectAll.checked;
    }
  }
  function setBusy(value) {
    exporting = value;
    var menu = ui();
    if (!menu) return;
    menu.querySelectorAll('button[data-export]').forEach(function (b) {
      return b.disabled = value;
    });
    var week = menu.querySelector('select');
    if (week) week.disabled = value;
    var cancel = menu.querySelector('.pw-office-bulk-cancel');
    if (cancel) cancel.hidden = !value;
    updateSelection();
  }
  function populateWeeks() {
    return _populateWeeks.apply(this, arguments);
  }
  function _populateWeeks() {
    _populateWeeks = _asyncToGenerator(_regenerator().m(function _callee5() {
      var _ui3;
      var select, items, option, _t3;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            select = (_ui3 = ui()) === null || _ui3 === void 0 ? void 0 : _ui3.querySelector('.pw-office-week');
            if (select) {
              _context5.n = 1;
              break;
            }
            return _context5.a(2);
          case 1:
            if (cachedWeeks) {
              _context5.n = 5;
              break;
            }
            select.innerHTML = '<option value="">Caricamento settimane…</option>';
            _context5.p = 2;
            _context5.n = 3;
            return fetchAll();
          case 3:
            items = _context5.v;
            cachedWeeks = _toConsumableArray(new Set(items.map(function (item) {
              return weekKey(item.completed_at);
            }).filter(Boolean))).sort().reverse();
            _context5.n = 5;
            break;
          case 4:
            _context5.p = 4;
            _t3 = _context5.v;
            select.innerHTML = '<option value="">Settimane non disponibili</option>';
            setStatus('Errore caricamento settimane: ' + _t3.message);
            return _context5.a(2);
          case 5:
            if (document.contains(select)) {
              _context5.n = 6;
              break;
            }
            return _context5.a(2);
          case 6:
            select.replaceChildren();
            cachedWeeks.forEach(function (key) {
              var option = document.createElement('option');
              option.value = key;
              option.textContent = weekLabel(key);
              select.appendChild(option);
            });
            if (!cachedWeeks.length) {
              option = document.createElement('option');
              option.textContent = 'Nessuna settimana';
              option.value = '';
              select.appendChild(option);
            }
          case 7:
            return _context5.a(2);
        }
      }, _callee5, null, [[2, 4]]);
    }));
    return _populateWeeks.apply(this, arguments);
  }
  function selectedItems() {
    return _selectedItems.apply(this, arguments);
  }
  function _selectedItems() {
    _selectedItems = _asyncToGenerator(_regenerator().m(function _callee6() {
      var _overlay$querySelecto, _overlay$querySelecto2;
      var rows, overlay, search, formType, items, visible, matched;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            rows = selection();
            if (rows.length) {
              _context6.n = 1;
              break;
            }
            return _context6.a(2, []);
          case 1:
            overlay = document.querySelector('.pw-archive-overlay:not([hidden])');
            search = (overlay === null || overlay === void 0 || (_overlay$querySelecto = overlay.querySelector('.pw-archive-search')) === null || _overlay$querySelecto === void 0 ? void 0 : _overlay$querySelecto.value.trim()) || '';
            formType = (overlay === null || overlay === void 0 || (_overlay$querySelecto2 = overlay.querySelector('.pw-archive-filter')) === null || _overlay$querySelecto2 === void 0 ? void 0 : _overlay$querySelecto2.value) || '';
            _context6.n = 2;
            return fetchPage(search, formType, 0);
          case 2:
            items = _context6.v;
            visible = Array.from(overlay.querySelectorAll('.pw-archive-row'));
            matched = rowItemsMatch(visible, items);
            return _context6.a(2, rows.map(function (row) {
              return matched[visible.indexOf(row)];
            }).filter(Boolean));
        }
      }, _callee6);
    }));
    return _selectedItems.apply(this, arguments);
  }
  function runBulk(_x2) {
    return _runBulk.apply(this, arguments);
  }
  function _runBulk() {
    _runBulk = _asyncToGenerator(_regenerator().m(function _callee7(kind) {
      var _ui4;
      var week, count, items, files, _iterator, _step, item, blob, zip, mode, today, _t4, _t5, _t6, _t7, _t8, _t9, _t0, _t1, _t10, _t11;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.p = _context7.n) {
          case 0:
            if (!exporting) {
              _context7.n = 1;
              break;
            }
            return _context7.a(2);
          case 1:
            cancelled = false;
            week = ((_ui4 = ui()) === null || _ui4 === void 0 || (_ui4 = _ui4.querySelector('.pw-office-week')) === null || _ui4 === void 0 ? void 0 : _ui4.value) || '';
            if (!(kind === 'week' && !week)) {
              _context7.n = 2;
              break;
            }
            setStatus('Seleziona prima una settimana.');
            return _context7.a(2);
          case 2:
            setBusy(true);
            count = 0;
            _context7.p = 3;
            setStatus('Caricamento elenco collaudi…');
            if (!(kind === 'selected')) {
              _context7.n = 5;
              break;
            }
            _context7.n = 4;
            return selectedItems();
          case 4:
            _t4 = _context7.v;
            _context7.n = 7;
            break;
          case 5:
            _context7.n = 6;
            return fetchAll();
          case 6:
            _t4 = _context7.v;
          case 7:
            items = _t4;
            if (kind === 'week') items = items.filter(function (item) {
              return weekKey(item.completed_at) === week;
            });
            if (items.length) {
              _context7.n = 8;
              break;
            }
            setStatus('Nessun collaudo da esportare.');
            return _context7.a(2);
          case 8:
            if (!(kind === 'selected' && items.length !== selection().length)) {
              _context7.n = 9;
              break;
            }
            throw new Error('Selezione modificata: riapri l’archivio e riprova.');
          case 9:
            if (!(items.length > 50 && !confirm('Preparare un unico ZIP con ' + items.length + ' PDF? Il download inizierà al termine.'))) {
              _context7.n = 10;
              break;
            }
            setStatus('Esportazione non avviata.');
            return _context7.a(2);
          case 10:
            files = [];
            _iterator = _createForOfIteratorHelper(items);
            _context7.p = 11;
            _iterator.s();
          case 12:
            if ((_step = _iterator.n()).done) {
              _context7.n = 21;
              break;
            }
            item = _step.value;
            if (!cancelled) {
              _context7.n = 13;
              break;
            }
            throw new Error('Esportazione annullata.');
          case 13:
            count++;
            setStatus('Preparazione PDF ' + count + ' di ' + items.length + ' — Commessa ' + item.commessa);
            blob = void 0;
            _context7.p = 14;
            _context7.n = 15;
            return fetchPdf(String(item.id));
          case 15:
            blob = _context7.v;
            _context7.n = 18;
            break;
          case 16:
            _context7.p = 16;
            _t5 = _context7.v;
            if (!cancelled) {
              _context7.n = 17;
              break;
            }
            throw new Error('Esportazione annullata.');
          case 17:
            throw new Error('Commessa ' + item.commessa + ': ' + _t5.message);
          case 18:
            _t6 = files;
            _t7 = 'Collaudo_' + safe(item.commessa) + '_' + safe(item.form_type) + '_' + safe(String(item.id).slice(0, 8)) + '.pdf';
            _t8 = Uint8Array;
            _context7.n = 19;
            return blob.arrayBuffer();
          case 19:
            _t9 = _context7.v;
            _t0 = new _t8(_t9);
            _t1 = item.completed_at;
            _t6.push.call(_t6, {
              name: _t7,
              bytes: _t0,
              date: _t1
            });
          case 20:
            _context7.n = 12;
            break;
          case 21:
            _context7.n = 23;
            break;
          case 22:
            _context7.p = 22;
            _t10 = _context7.v;
            _iterator.e(_t10);
          case 23:
            _context7.p = 23;
            _iterator.f();
            return _context7.f(23);
          case 24:
            if (!cancelled) {
              _context7.n = 25;
              break;
            }
            throw new Error('Esportazione annullata.');
          case 25:
            setStatus('Creazione ZIP con ' + files.length + ' PDF…');
            zip = zipFile(files);
            mode = kind === 'week' ? week : kind === 'selected' ? 'Selezionati' : 'Tutti';
            today = new Date().toISOString().slice(0, 10);
            download(zip, 'Collaudi_PW_' + safe(mode) + '_' + today + '.zip');
            setStatus('ZIP scaricato: ' + files.length + ' collaudi.');
            _context7.n = 27;
            break;
          case 26:
            _context7.p = 26;
            _t11 = _context7.v;
            console.error('Esportazione multipla PW Collaudo', _t11);
            setStatus(_t11.message || 'Errore esportazione.');
            if (!cancelled) alert('Non è stato possibile completare l’esportazione: ' + _t11.message);
          case 27:
            _context7.p = 27;
            activeController = null;
            setBusy(false);
            return _context7.f(27);
          case 28:
            return _context7.a(2);
        }
      }, _callee7, null, [[14, 16], [11, 22, 23, 24], [3, 26, 27, 28]]);
    }));
    return _runBulk.apply(this, arguments);
  }
  function runSingle(_x3, _x4) {
    return _runSingle.apply(this, arguments);
  }
  function _runSingle() {
    _runSingle = _asyncToGenerator(_regenerator().m(function _callee8(row, button) {
      var label, _row$querySelector6, id, _overlay$querySelecto3, _overlay$querySelecto4, overlay, search, formType, items, visible, match, blob, commessa, _t12;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.p = _context8.n) {
          case 0:
            if (!button.disabled) {
              _context8.n = 1;
              break;
            }
            return _context8.a(2);
          case 1:
            button.disabled = true;
            label = button.textContent;
            button.textContent = 'PREPARO PDF…';
            _context8.p = 2;
            id = row.dataset.archiveId;
            if (id) {
              _context8.n = 5;
              break;
            }
            overlay = row.closest('.pw-archive-overlay');
            search = (overlay === null || overlay === void 0 || (_overlay$querySelecto3 = overlay.querySelector('.pw-archive-search')) === null || _overlay$querySelecto3 === void 0 ? void 0 : _overlay$querySelecto3.value.trim()) || '';
            formType = (overlay === null || overlay === void 0 || (_overlay$querySelecto4 = overlay.querySelector('.pw-archive-filter')) === null || _overlay$querySelecto4 === void 0 ? void 0 : _overlay$querySelecto4.value) || '';
            _context8.n = 3;
            return fetchPage(search, formType, 0);
          case 3:
            items = _context8.v;
            visible = Array.from(overlay.querySelectorAll('.pw-archive-row'));
            match = rowItemsMatch(visible, items)[visible.indexOf(row)];
            if (match !== null && match !== void 0 && match.id) {
              _context8.n = 4;
              break;
            }
            throw new Error('Collaudo non trovato.');
          case 4:
            id = String(match.id);
          case 5:
            _context8.n = 6;
            return fetchPdf(id);
          case 6:
            blob = _context8.v;
            commessa = String(((_row$querySelector6 = row.querySelector('.pw-archive-commessa')) === null || _row$querySelector6 === void 0 ? void 0 : _row$querySelector6.textContent) || '').replace(/^\s*Commessa\s*/i, '');
            download(blob, 'Collaudo_' + safe(commessa) + '.pdf');
            button.textContent = 'PDF SCARICATO ✓';
            _context8.n = 8;
            break;
          case 7:
            _context8.p = 7;
            _t12 = _context8.v;
            console.error('PDF singolo', _t12);
            alert('Errore esportazione PDF: ' + _t12.message);
          case 8:
            _context8.p = 8;
            setTimeout(function () {
              button.textContent = label;
              button.disabled = false;
            }, 1400);
            return _context8.f(8);
          case 9:
            return _context8.a(2);
        }
      }, _callee8, null, [[2, 7, 8, 9]]);
    }));
    return _runSingle.apply(this, arguments);
  }
  function installHeader() {
    var overlay = document.querySelector('.pw-archive-overlay:not([hidden])');
    var actions = overlay === null || overlay === void 0 ? void 0 : overlay.querySelector('.pw-office-head-actions');
    if (!actions || actions.querySelector('.pw-office-bulk-wrap')) return;
    var wrap = document.createElement('div');
    wrap.className = 'pw-office-bulk-wrap';
    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'pw-office-bulk-trigger';
    trigger.textContent = 'Esporta ▾';
    var menu = document.createElement('div');
    menu.className = 'pw-office-bulk-menu';
    menu.hidden = true;
    menu.innerHTML = ['<strong>Esporta collaudi</strong>', '<button type="button" data-export="all">Esporta tutti (ZIP PDF)</button>', '<button type="button" data-export="selected">Esporta selezionati (0)</button>', '<label for="pw-office-week">Esporta per settimana</label>', '<select id="pw-office-week" class="pw-office-week"></select>', '<button type="button" data-export="week">Esporta settimana (ZIP PDF)</button>', '<div class="pw-office-bulk-status" aria-live="polite"></div>', '<button type="button" class="pw-office-bulk-cancel" hidden>Annulla esportazione</button>'].join('');
    trigger.addEventListener('click', _asyncToGenerator(_regenerator().m(function _callee() {
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            if (!exporting) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            menu.hidden = !menu.hidden;
            if (menu.hidden) {
              _context.n = 2;
              break;
            }
            updateSelection();
            _context.n = 2;
            return populateWeeks();
          case 2:
            return _context.a(2);
        }
      }, _callee);
    })));
    menu.querySelectorAll('[data-export]').forEach(function (b) {
      return b.addEventListener('click', function () {
        return runBulk(b.dataset.export);
      });
    });
    menu.querySelector('.pw-office-bulk-cancel').addEventListener('click', function () {
      var _activeController;
      cancelled = true;
      (_activeController = activeController) === null || _activeController === void 0 || _activeController.abort();
      setStatus('Annullamento…');
    });
    wrap.append(trigger, menu);
    actions.insertBefore(wrap, actions.firstChild);
    var tools = overlay.querySelector('.pw-archive-tools');
    if (tools && !tools.querySelector('.pw-office-select-all')) {
      var select = document.createElement('label');
      select.className = 'pw-office-select-all';
      select.innerHTML = '<input type="checkbox" aria-label="Seleziona tutti i collaudi visibili"> Seleziona tutti i visibili';
      select.querySelector('input').addEventListener('change', function (e) {
        overlay.querySelectorAll('.pw-office-select').forEach(function (c) {
          return c.checked = e.target.checked;
        });
        updateSelection();
      });
      tools.appendChild(select);
    }
    updateSelection();
  }
  function installRows() {
    var overlay = document.querySelector('.pw-archive-overlay:not([hidden])');
    if (!overlay) return;
    overlay.querySelectorAll('.pw-archive-row').forEach(function (row) {
      if (!row.querySelector('.pw-office-select')) {
        var first = row.firstElementChild;
        if (first) {
          var _row$querySelector5;
          first.classList.add('pw-office-select-label');
          var check = document.createElement('input');
          check.type = 'checkbox';
          check.className = 'pw-office-select';
          check.setAttribute('aria-label', 'Seleziona ' + String(((_row$querySelector5 = row.querySelector('.pw-archive-commessa')) === null || _row$querySelector5 === void 0 ? void 0 : _row$querySelector5.textContent) || 'collaudo'));
          check.addEventListener('change', updateSelection);
          first.insertBefore(check, first.firstChild);
        }
      }
      if (!row.querySelector('.pw-office-pdf-direct')) {
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'pw-office-pdf-direct';
        button.textContent = 'PDF ↓';
        button.title = 'Esporta il PDF di questo collaudo';
        button.addEventListener('click', function () {
          return runSingle(row, button);
        });
        var del = row.querySelector('.pw-office-delete');
        if (del) del.insertAdjacentElement('beforebegin', button);else row.appendChild(button);
      }
    });
  }
  var lastOverlay = null,
    lastRows = -1;
  function install() {
    var overlay = document.querySelector('.pw-archive-overlay:not([hidden])');
    if (!overlay) {
      lastOverlay = null;
      lastRows = -1;
      cachedWeeks = null;
      return;
    }
    if (overlay !== lastOverlay) {
      lastOverlay = overlay;
      lastRows = -1;
      cachedWeeks = null;
    }
    installHeader();
    installRows();
    var n = overlay.querySelectorAll('.pw-archive-row').length;
    if (n !== lastRows) {
      lastRows = n;
      updateSelection();
    }
  }
  var observer = new MutationObserver(install);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  install();
  setInterval(install, 800);
})();