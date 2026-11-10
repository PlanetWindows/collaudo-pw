(function () {
  'use strict';

  if (String(localStorage.getItem('pw-collaudo-role') || '') !== 'production') return;
  var style = document.createElement('style');
  style.textContent = ['.pw-date-entry{position:relative!important;display:flex!important;align-items:center!important;width:100%!important;min-width:0!important;box-sizing:border-box!important;border:1px solid #bbb!important;border-radius:6px!important;background:#fff!important;min-height:37px!important;overflow:visible!important;}', '.pw-date-entry:focus-within{border-color:#b39348!important;box-shadow:0 0 0 2px rgba(199,160,68,.15)!important;}', '.pw-date-entry .pw-date-manual{display:block!important;min-width:0!important;flex:1 1 auto!important;width:1px!important;height:36px!important;margin:0!important;padding:7px 6px 7px 8px!important;border:0!important;border-radius:6px!important;background:transparent!important;box-shadow:none!important;outline:0!important;color:#111!important;font-size:13px!important;font-family:inherit!important;}', '.pw-date-entry.pw-date-invalid{border-color:#b42318!important;}', '.pw-date-entry .pw-date-picker{display:flex!important;align-items:center!important;justify-content:center!important;flex:0 0 34px!important;width:34px!important;min-width:34px!important;height:34px!important;padding:0!important;margin:0!important;border:0!important;border-left:1px solid #ddd!important;border-radius:0 5px 5px 0!important;background:#fff!important;color:#5b4b2a!important;cursor:pointer!important;}', '.pw-date-entry .pw-date-picker svg{pointer-events:none;max-width:18px;max-height:18px;}', '.pw-date-entry .pw-date-native{position:absolute!important;right:1px!important;top:2px!important;width:1px!important;min-width:1px!important;height:1px!important;min-height:1px!important;opacity:0!important;pointer-events:none!important;padding:0!important;margin:0!important;border:0!important;overflow:hidden!important;}', '@media print{.pw-date-entry{border:0!important;min-height:0!important;box-shadow:none!important;}.pw-date-entry .pw-date-native,.pw-date-entry .pw-date-picker{display:none!important;}.pw-date-entry .pw-date-manual{width:100%!important;height:auto!important;padding:0!important;border:0!important;font-size:inherit!important;}}'].join('\n');
  document.head.appendChild(style);
  function two(value) {
    return ('0' + String(value)).slice(-2);
  }
  function italian(iso) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(iso || ''))) return '';
    return iso.slice(8, 10) + '/' + iso.slice(5, 7) + '/' + iso.slice(0, 4);
  }
  function toIso(value) {
    value = String(value || '').trim();
    if (!value) return '';
    var match = value.match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/);
    var compact = value.match(/^(\d{2})(\d{2})(\d{4})$/);
    var day, month, year;
    if (match) {
      day = +match[1];
      month = +match[2];
      year = +match[3];
    } else if (compact) {
      day = +compact[1];
      month = +compact[2];
      year = +compact[3];
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      year = +value.slice(0, 4);
      month = +value.slice(5, 7);
      day = +value.slice(8, 10);
    } else return null;
    var check = new Date(Date.UTC(year, month - 1, day));
    if (year < 1900 || year > 2100 || month < 1 || month > 12 || day < 1 || check.getUTCFullYear() !== year || check.getUTCMonth() !== month - 1 || check.getUTCDate() !== day) return null;
    return year + '-' + two(month) + '-' + two(day);
  }
  function sendEvent(element, type) {
    var ev;
    try {
      ev = new Event(type, {
        bubbles: true
      });
    } catch (_) {
      ev = document.createEvent('Event');
      ev.initEvent(type, true, true);
    }
    element.dispatchEvent(ev);
  }
  function updateValue(native, value) {
    if (native.value === value) return;
    native.value = value;
    sendEvent(native, 'input');
    sendEvent(native, 'change');
    if (typeof window.autoSave === 'function') window.autoSave();
    if (window.PWCollaudoSync && window.PWCollaudoSync.queueSave) {
      window.PWCollaudoSync.queueSave(250);
    }
  }
  function sourceRow(element) {
    var node = element;
    while (node && node.tagName !== 'TR') node = node.parentElement;
    return node;
  }
  function nextRowDate(row) {
    var rows = document.querySelectorAll('#formArea tbody tr');
    for (var i = 0; i < rows.length; i++) {
      if (rows[i] === row) {
        return rows[i + 1] ? rows[i + 1].querySelector('.pw-date-manual') : null;
      }
    }
    return null;
  }
  function commit(manual, native, wrap, normalize) {
    var iso = toIso(manual.value);
    wrap.classList.toggle('pw-date-invalid', iso === null);
    if (iso !== null) {
      updateValue(native, iso);
      if (normalize) manual.value = italian(iso);
    }
    return iso !== null;
  }
  function calendar(native) {
    try {
      if (typeof native.showPicker === 'function') {
        native.showPicker();
        return;
      }
    } catch (err) {
      console.warn('Calendario non disponibile', err);
    }
    try {
      native.focus();
      native.click();
    } catch (_) {
      native.focus();
    }
  }
  function decorate(native) {
    if (native.getAttribute('data-pw-date-single') === '1') return;
    native.setAttribute('data-pw-date-single', '1');
    native.className += ' pw-date-native';
    native.setAttribute('tabindex', '-1');
    native.setAttribute('aria-hidden', 'true');
    var wrap = document.createElement('span');
    wrap.className = 'pw-date-entry';
    var manual = document.createElement('input');
    manual.type = 'text';
    manual.className = 'pw-date-manual';
    manual.placeholder = 'gg/mm/aaaa';
    manual.setAttribute('inputmode', 'numeric');
    manual.setAttribute('autocomplete', 'off');
    manual.setAttribute('aria-label', 'Data, giorno mese anno');
    manual.setAttribute('maxlength', '10');
    manual.value = italian(native.value);
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'pw-date-picker';
    button.setAttribute('tabindex', '-1');
    button.setAttribute('title', 'Apri calendario');
    button.setAttribute('aria-label', 'Scegli data dal calendario');
    button.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M7 3v4M17 3v4M3 10h18"></path></svg>';
    native.parentNode.insertBefore(wrap, native);
    wrap.appendChild(manual);
    wrap.appendChild(button);
    wrap.appendChild(native);
    button.onclick = function () {
      commit(manual, native, wrap, true);
      calendar(native);
    };
    manual.oninput = function () {
      commit(manual, native, wrap, false);
    };
    manual.onchange = function () {
      commit(manual, native, wrap, true);
    };
    manual.onblur = function () {
      commit(manual, native, wrap, true);
    };
    manual.onkeydown = function (ev) {
      var key = ev.key || ev.keyCode;
      if (key !== 'Tab' && key !== 9 && key !== 'Enter' && key !== 13) return;
      if (ev.shiftKey) return;
      commit(manual, native, wrap, true);
      var row = sourceRow(manual);
      if (row) {
        var conforms = row.querySelector('input[data-group][data-value="C"]');
        if (conforms) {
          ev.preventDefault();
          conforms.focus();
        }
      } else if (key === 'Enter' || key === 13) {
        ev.preventDefault();
        var inputs = document.querySelectorAll('#formArea .pw-date-manual');
        for (var j = 0; j < inputs.length; j++) {
          if (inputs[j] === manual && inputs[j + 1]) {
            inputs[j + 1].focus();
            break;
          }
        }
      }
    };
    function refreshManual() {
      if (document.activeElement === manual) return;
      var desired = italian(native.value);
      if (desired !== manual.value) {
        manual.value = desired;
        wrap.classList.remove('pw-date-invalid');
      }
    }
    native.addEventListener('input', refreshManual);
    native.addEventListener('change', refreshManual);
    wrap.pwUpdate = refreshManual;
  }
  document.addEventListener('keydown', function (ev) {
    var key = ev.key || ev.keyCode;
    if (key !== 'Tab' && key !== 9 || ev.shiftKey) return;
    var element = ev.target || ev.srcElement;
    if (!element || !element.getAttribute) return;
    var row = sourceRow(element);
    if (!row) return;
    var target = null;
    if (element.getAttribute('data-value') === 'NC') {
      var pos = row.querySelector('.pw-nc-position-wrap input');
      var container = row.querySelector('.pw-nc-position-wrap');
      if (element.checked && pos && container && !container.hidden) target = pos;else target = nextRowDate(row);
    } else if (element.getAttribute('data-field') && /^nc_position_\d+$/.test(element.getAttribute('data-field'))) {
      target = nextRowDate(row);
    }
    if (target) {
      ev.preventDefault();
      target.focus();
    }
  }, true);
  function refresh() {
    var raw = document.querySelectorAll('#formArea input[type="date"][data-field]');
    for (var i = 0; i < raw.length; i++) decorate(raw[i]);
    var wraps = document.querySelectorAll('#formArea .pw-date-entry');
    for (var j = 0; j < wraps.length; j++) if (wraps[j].pwUpdate) wraps[j].pwUpdate();
  }
  var selector = document.getElementById('formType');
  if (selector) selector.addEventListener('change', function () {
    setTimeout(refresh, 50);
  });
  setTimeout(refresh, 50);
  setInterval(refresh, 600);
})();