(function () {
  'use strict';

  var SIGNATURES_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  var CODE_KEY = 'pw-collaudo-access-code';
  var signaturesCache = null;
  var signaturesPromise = null;
  var activeCalendar = null;
  function trim(value) {
    return String(value || '').replace(/^\s+|\s+$/g, '');
  }
  function closestTag(el, tagName) {
    tagName = String(tagName || '').toUpperCase();
    while (el && el.nodeType === 1) {
      if (el.tagName === tagName) return el;
      el = el.parentNode;
    }
    return null;
  }
  function hasClass(el, name) {
    return !!(el && (' ' + el.className + ' ').indexOf(' ' + name + ' ') >= 0);
  }
  function dispatchInput(input) {
    try {
      var evt = document.createEvent('Event');
      evt.initEvent('input', true, true);
      input.dispatchEvent(evt);
    } catch (_) {}
    try {
      var evt2 = document.createEvent('Event');
      evt2.initEvent('change', true, true);
      input.dispatchEvent(evt2);
    } catch (_) {}
  }
  function pad2(n) {
    return n < 10 ? '0' + n : String(n);
  }
  function isoDate(year, month, day) {
    return year + '-' + pad2(month + 1) + '-' + pad2(day);
  }
  function parseIso(value) {
    var m = String(value || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return null;
    var y = parseInt(m[1], 10);
    var mo = parseInt(m[2], 10) - 1;
    var d = parseInt(m[3], 10);
    var date = new Date(y, mo, d);
    if (date.getFullYear() !== y || date.getMonth() !== mo || date.getDate() !== d) return null;
    return date;
  }
  function monthName(month) {
    return ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'][month];
  }
  function closeCalendar() {
    if (activeCalendar && activeCalendar.parentNode) {
      activeCalendar.parentNode.removeChild(activeCalendar);
    }
    activeCalendar = null;
  }
  function makeButton(text, title) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.innerHTML = text;
    btn.title = title || '';
    return btn;
  }
  function openCalendar(input, anchor) {
    closeCalendar();
    var selected = parseIso(input.value);
    var view = selected || new Date();
    var year = view.getFullYear();
    var month = view.getMonth();
    var popup = document.createElement('div');
    popup.className = 'pw-ie-calendar';
    activeCalendar = popup;
    document.body.appendChild(popup);
    function renderCalendar() {
      while (popup.firstChild) popup.removeChild(popup.firstChild);
      var header = document.createElement('div');
      header.className = 'pw-ie-calendar-header';
      var prev = makeButton('&#9664;', 'Mese precedente');
      var title = document.createElement('strong');
      title.innerHTML = monthName(month) + ' ' + year;
      var next = makeButton('&#9654;', 'Mese successivo');
      header.appendChild(prev);
      header.appendChild(title);
      header.appendChild(next);
      popup.appendChild(header);
      prev.onclick = function () {
        month -= 1;
        if (month < 0) {
          month = 11;
          year -= 1;
        }
        renderCalendar();
      };
      next.onclick = function () {
        month += 1;
        if (month > 11) {
          month = 0;
          year += 1;
        }
        renderCalendar();
      };
      var table = document.createElement('table');
      table.className = 'pw-ie-calendar-table';
      var thead = document.createElement('thead');
      var hr = document.createElement('tr');
      var names = ['L', 'M', 'M', 'G', 'V', 'S', 'D'];
      for (var h = 0; h < names.length; h++) {
        var th = document.createElement('th');
        th.innerHTML = names[h];
        hr.appendChild(th);
      }
      thead.appendChild(hr);
      table.appendChild(thead);
      var tbody = document.createElement('tbody');
      var first = new Date(year, month, 1);
      var start = first.getDay();
      if (start === 0) start = 7;
      start -= 1;
      var days = new Date(year, month + 1, 0).getDate();
      var day = 1;
      for (var r = 0; r < 6; r++) {
        var tr = document.createElement('tr');
        for (var c = 0; c < 7; c++) {
          var td = document.createElement('td');
          if (r === 0 && c < start || day > days) {
            td.innerHTML = '&nbsp;';
            td.className = 'pw-ie-calendar-empty';
          } else {
            (function (chosenDay) {
              var dayBtn = makeButton(String(chosenDay), 'Seleziona ' + chosenDay + ' ' + monthName(month));
              dayBtn.className = 'pw-ie-calendar-day';
              var currentIso = isoDate(year, month, chosenDay);
              if (currentIso === input.value) dayBtn.className += ' selected';
              dayBtn.onclick = function () {
                input.value = currentIso;
                dispatchInput(input);
                closeCalendar();
                input.focus();
              };
              td.appendChild(dayBtn);
            })(day);
            day += 1;
          }
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
        if (day > days) break;
      }
      table.appendChild(tbody);
      popup.appendChild(table);
      var footer = document.createElement('div');
      footer.className = 'pw-ie-calendar-footer';
      var todayBtn = makeButton('Oggi', 'Imposta la data di oggi');
      var clearBtn = makeButton('Cancella', 'Cancella la data');
      todayBtn.onclick = function () {
        var now = new Date();
        input.value = isoDate(now.getFullYear(), now.getMonth(), now.getDate());
        dispatchInput(input);
        closeCalendar();
      };
      clearBtn.onclick = function () {
        input.value = '';
        dispatchInput(input);
        closeCalendar();
      };
      footer.appendChild(todayBtn);
      footer.appendChild(clearBtn);
      popup.appendChild(footer);
    }
    renderCalendar();
    var rect = anchor.getBoundingClientRect();
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    popup.style.left = Math.max(6, rect.left + scrollLeft) + 'px';
    popup.style.top = rect.bottom + scrollTop + 4 + 'px';
    var popupRect = popup.getBoundingClientRect();
    var viewportWidth = document.documentElement.clientWidth || document.body.clientWidth || 1024;
    if (popupRect.right > viewportWidth - 6) {
      popup.style.left = Math.max(6, viewportWidth - popupRect.width - 10 + scrollLeft) + 'px';
    }
  }
  function installDatePicker(input) {
    if (!input || input.getAttribute('data-pw-ie-date-ready') === '1') return;
    input.setAttribute('data-pw-ie-date-ready', '1');
    try {
      input.type = 'text';
    } catch (_) {}
    input.setAttribute('inputmode', 'numeric');
    input.setAttribute('placeholder', 'AAAA-MM-GG');
    input.setAttribute('autocomplete', 'off');
    var parent = input.parentNode;
    var wrap = document.createElement('span');
    wrap.className = 'pw-ie-date-wrap';
    parent.insertBefore(wrap, input);
    wrap.appendChild(input);
    var btn = makeButton('CAL', 'Apri calendario');
    btn.className = 'pw-ie-date-button';
    wrap.appendChild(btn);
    btn.onclick = function (e) {
      if (e && e.preventDefault) e.preventDefault();
      if (activeCalendar) {
        closeCalendar();
      } else {
        openCalendar(input, btn);
      }
      return false;
    };
  }
  function installDatePickers() {
    var inputs = document.querySelectorAll('input[type="date"], input[data-pw-original-date="1"]');
    for (var i = 0; i < inputs.length; i++) {
      installDatePicker(inputs[i]);
    }
  }
  function loadSignatures() {
    if (signaturesCache) return Promise.resolve(signaturesCache);
    if (signaturesPromise) return signaturesPromise;
    var code = trim(localStorage.getItem(CODE_KEY));
    if (!code) return Promise.reject(new Error('missing_access_code'));
    signaturesPromise = fetch(SIGNATURES_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'signatures',
        code: code
      })
    }).then(function (res) {
      if (!res.ok) throw new Error('signature_http_' + res.status);
      return res.json();
    }).then(function (data) {
      signaturesCache = data && data.signatures || {};
      return signaturesCache;
    }).then(function (value) {
      signaturesPromise = null;
      return value;
    }, function (err) {
      signaturesPromise = null;
      throw err;
    });
    return signaturesPromise;
  }
  function rowIndex(row) {
    var rows = document.querySelectorAll('#formArea tbody tr');
    for (var i = 0; i < rows.length; i++) {
      if (rows[i] === row) return i;
    }
    return -1;
  }
  function ensureMarker(row, index) {
    var name = 'phase_signature_plus_v3_' + index;
    var input = row.querySelector('input[data-field="' + name + '"]');
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.setAttribute('data-field', name);
      var box = row.querySelector('.resultbox');
      if (box) box.appendChild(input);
    }
    return input;
  }
  function saveMarker(row, index, operator) {
    var marker = ensureMarker(row, index);
    marker.value = operator ? 'v3:' + operator : '';
    dispatchInput(marker);
    if (typeof window.autoSave === 'function') window.autoSave();
    if (window.PWCollaudoSync && window.PWCollaudoSync.queueSave) {
      window.PWCollaudoSync.queueSave(120);
    }
  }
  function setLegacySignature(row, index, operator, dataUrl) {
    var key = 'phase_sign_' + index;
    if (typeof window.setSignatureImage === 'function') {
      window.setSignatureImage(key, dataUrl);
    } else {
      var img = row.querySelector('img[data-signature="' + key + '"]');
      if (!img) return false;
      img.src = dataUrl;
      img.setAttribute('data-has-signature', '1');
      img.style.display = 'block';
    }
    saveMarker(row, index, operator);
    if (typeof window.autoSave === 'function') window.autoSave();
    if (window.PWCollaudoSync && window.PWCollaudoSync.queueSave) {
      window.PWCollaudoSync.queueSave(120);
    }
    setTimeout(fixSignatureLayout, 50);
    return true;
  }
  function handleSignaturePlus(button) {
    var row = closestTag(button, 'TR');
    if (!row) return;
    var index = rowIndex(row);
    if (index < 0) return;
    var operatorInput = row.querySelector('input[data-field="phase_operator_' + index + '"]');
    var operator = trim(operatorInput ? operatorInput.value : '');
    if (!operator) {
      alert('Operatore non associato a questa fase.');
      return;
    }
    saveMarker(row, index, operator);
    if (operator === 'APOLLO FRANCESCO') {
      setLegacySignature(row, index, operator, 'apollo-francesco-signature.svg?v=1');
      return;
    }
    button.disabled = true;
    loadSignatures().then(function (signatures) {
      var dataUrl = signatures[operator] || '';
      if (!dataUrl) {
        saveMarker(row, index, '');
        alert('Firma non ancora disponibile per ' + operator + '.');
        return;
      }
      setLegacySignature(row, index, operator, dataUrl);
    }).catch(function () {
      saveMarker(row, index, '');
      alert('Non riesco a caricare la firma. Riprova.');
    }).then(function () {
      button.disabled = false;
    });
  }
  function fixSignatureLayout() {
    var previews = document.querySelectorAll('.signature-preview');
    for (var i = 0; i < previews.length; i++) {
      var preview = previews[i];
      var btn = preview.querySelector('.pw-signature-plus-proxy');
      if (!btn) continue;
      var img = preview.querySelector('img[data-signature]');
      var hasSignature = !!(img && img.getAttribute('data-has-signature') === '1' && img.getAttribute('src'));
      btn.style.setProperty('position', 'absolute', 'important');
      btn.style.setProperty('z-index', '8', 'important');
      if (hasSignature) {
        btn.style.setProperty('left', 'auto', 'important');
        btn.style.setProperty('top', '6px', 'important');
        btn.style.setProperty('right', '6px', 'important');
        btn.style.setProperty('margin-left', '0', 'important');
        btn.style.setProperty('margin-top', '0', 'important');
        btn.style.setProperty('transform', 'none', 'important');
      } else {
        btn.style.setProperty('left', '50%', 'important');
        btn.style.setProperty('top', '50%', 'important');
        btn.style.setProperty('right', 'auto', 'important');
        btn.style.setProperty('margin-left', '-17px', 'important');
        btn.style.setProperty('margin-top', '-17px', 'important');
        btn.style.setProperty('transform', 'none', 'important');
      }
    }
  }
  function installStyles() {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.pw-ie-date-wrap{display:flex;width:100%;align-items:stretch;box-sizing:border-box;}' + '.pw-ie-date-wrap>input{width:auto!important;min-width:0;flex:1 1 auto;box-sizing:border-box;}' + '.pw-ie-date-button{flex:0 0 42px;margin-left:4px;border:1px solid #aaa;border-radius:6px;background:#fff;font-size:10px;font-weight:700;cursor:pointer;}' + '.pw-ie-calendar{position:absolute;z-index:99999;width:244px;background:#fff;border:1px solid #777;box-shadow:0 5px 18px rgba(0,0,0,.25);padding:8px;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;color:#111;}' + '.pw-ie-calendar-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;}' + '.pw-ie-calendar-header button{width:32px;height:28px;border:1px solid #aaa;background:#fff;cursor:pointer;}' + '.pw-ie-calendar-header strong{font-size:13px;text-align:center;}' + '.pw-ie-calendar-table{width:100%;border-collapse:collapse;margin:0!important;}' + '.pw-ie-calendar-table th,.pw-ie-calendar-table td{border:0!important;padding:1px!important;text-align:center!important;width:14.28%!important;}' + '.pw-ie-calendar-table th{background:#f1eee8!important;font-size:10px!important;height:22px!important;}' + '.pw-ie-calendar-day{width:28px;height:28px;padding:0!important;border:1px solid #ddd;background:#fff;cursor:pointer;font-size:11px;}' + '.pw-ie-calendar-day:hover,.pw-ie-calendar-day.selected{background:#e8dcc0;font-weight:700;}' + '.pw-ie-calendar-empty{height:30px;}' + '.pw-ie-calendar-footer{display:flex;justify-content:space-between;margin-top:6px;}' + '.pw-ie-calendar-footer button{padding:5px 8px;border:1px solid #aaa;background:#fff;cursor:pointer;font-size:11px;}' + '@media print{.pw-ie-date-button,.pw-ie-calendar{display:none!important;}.pw-ie-date-wrap{display:block!important;}.pw-ie-date-wrap>input{width:100%!important;}}';
    document.head.appendChild(style);
  }
  document.addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    var node = target;
    while (node && node !== document) {
      if (hasClass(node, 'pw-signature-plus-proxy')) {
        if (e.preventDefault) e.preventDefault();
        e.returnValue = false;
        if (e.stopPropagation) e.stopPropagation();
        e.cancelBubble = true;
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        handleSignaturePlus(node);
        return false;
      }
      node = node.parentNode;
    }
    if (activeCalendar) {
      var inside = false;
      node = target;
      while (node && node !== document) {
        if (node === activeCalendar || hasClass(node, 'pw-ie-date-button')) {
          inside = true;
          break;
        }
        node = node.parentNode;
      }
      if (!inside) closeCalendar();
    }
  }, true);
  installStyles();
  installDatePickers();
  fixSignatureLayout();
  setInterval(function () {
    installDatePickers();
    fixSignatureLayout();
  }, 500);
})();