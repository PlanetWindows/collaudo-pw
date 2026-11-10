(() => {
  'use strict';
  if (String(localStorage.getItem('pw-collaudo-role') || '') !== 'production') return;

  const style = document.createElement('style');
  style.textContent = `
    .pw-date-entry { display:flex; align-items:center; gap:5px; flex-wrap:wrap; width:100%; }
    .pw-date-entry .pw-date-manual { flex:1 1 120px; width:100%; min-width:0; box-sizing:border-box; padding:7px 8px; border:1px solid #b4b4b4; border-radius:5px; background:#fff; color:#111; font-size:13px; }
    .pw-date-entry .pw-date-manual.pw-date-invalid { border:2px solid #ba3030!important; }
    .pw-date-entry .pw-date-native { flex:0 0 auto; max-width:100%; font-size:12px; padding:4px; border:1px solid #ccc; border-radius:4px; box-sizing:border-box; }
    .pw-date-entry .pw-date-hint { font-size:10px; color:#666; width:100%; }
    @media print {
      .pw-date-entry .pw-date-native,.pw-date-entry .pw-date-hint{display:none!important}
      .pw-date-entry .pw-date-manual{font:inherit!important;border:0!important;padding:0!important}
    }
  `;
  document.head.appendChild(style);

  function formatItalian(iso) {
    if (!/^\\d{4}-\\d{2}-\\d{2}$/.test(String(iso || ''))) return '';
    return iso.slice(8,10) + '/' + iso.slice(5,7) + '/' + iso.slice(0,4);
  }

  function parseManual(raw) {
    const value = String(raw || '').trim();
    if (!value) return '';
    let day, month, year;
    const match = value.match(/^(\\d{1,2})[./-](\\d{1,2})[./-](\\d{4})$/);
    const compact = value.match(/^(\\d{2})(\\d{2})(\\d{4})$/);
    if (match) {
      day = Number(match[1]); month = Number(match[2]); year = Number(match[3]);
    } else if (compact) {
      day = Number(compact[1]); month = Number(compact[2]); year = Number(compact[3]);
    } else if (/^\\d{4}-\\d{2}-\\d{2}$/.test(value)) {
      year = Number(value.slice(0,4));month = Number(value.slice(5,7));day = Number(value.slice(8,10));
    } else {
      return null;
    }
    if (year < 1900 || year > 2100 || month < 1 || month > 12 || day < 1 || day > 31) return null;
    const test = new Date(Date.UTC(year, month-1, day));
    if (test.getUTCFullYear() !== year || test.getUTCMonth() !== month-1 || test.getUTCDate() !== day) return null;
    return String(year).padStart(4,'0') + '-' + String(month).padStart(2,'0') + '-' + String(day).padStart(2,'0');
  }

  function persistDate(native) {
    native.dispatchEvent(new Event('input', {bubbles:true}));
    native.dispatchEvent(new Event('change', {bubbles:true}));
    if (typeof autoSave === 'function') autoSave();
    if (window.PWCollaudoSync?.queueSave) window.PWCollaudoSync.queueSave(250);
  }

  function enhanceDate(native) {
    if (native.dataset.pwEditableDate === '1') return;
    native.dataset.pwEditableDate = '1';
    const wrap = document.createElement('div');
    wrap.className = 'pw-date-entry';
    const manual = document.createElement('input');
    manual.type = 'text';
    manual.className = 'pw-date-manual';
    manual.setAttribute('inputmode','numeric');
    manual.setAttribute('autocomplete','off');
    manual.setAttribute('aria-label','Inserisci data nel formato giorno mese anno');
    manual.placeholder = 'gg/mm/aaaa';
    manual.maxLength = 10;
    manual.value = formatItalian(native.value);

    const hint = document.createElement('span');
    hint.className = 'pw-date-hint';
    hint.textContent = 'Scrivi la data o selezionala dal calendario';

    native.parentNode.insertBefore(wrap, native);
    native.classList.add('pw-date-native');
    native.setAttribute('aria-label','Seleziona dal calendario');
    wrap.appendChild(manual);
    wrap.appendChild(native);
    wrap.appendChild(hint);

    const updateFromManual = () => {
      const iso = parseManual(manual.value);
      manual.classList.toggle('pw-date-invalid', iso === null && manual.value.trim().length >= 8);
      if (iso === null || iso === native.value) return;
      native.value = iso;
      persistDate(native);
    };

    manual.addEventListener('input', updateFromManual);
    manual.addEventListener('change', updateFromManual);
    manual.addEventListener('blur', () => {
      const iso = parseManual(manual.value);
      if (iso === null) {
        manual.classList.add('pw-date-invalid');
        hint.textContent = 'Data non valida. Usa gg/mm/aaaa';
      } else {
        manual.classList.remove('pw-date-invalid');
        manual.value = formatItalian(iso);
        hint.textContent = 'Scrivi la data o selezionala dal calendario';
      }
    });
    native.addEventListener('input', () => {
      if (document.activeElement !== manual) manual.value = formatItalian(native.value);
    });
    native.addEventListener('change', () => {
      if (document.activeElement !== manual) manual.value = formatItalian(native.value);
    });

    wrap._pwSyncFromNative = () => {
      if (document.activeElement === manual) return;
      const value = formatItalian(native.value);
      if (manual.value !== value) {
        manual.value = value;
        manual.classList.remove('pw-date-invalid');
      }
    };
  }

  function refresh() {
    document.querySelectorAll('#formArea input[type="date"][data-field]').forEach(enhanceDate);
    document.querySelectorAll('.pw-date-entry').forEach(wrap => wrap._pwSyncFromNative?.());
  }

  document.getElementById('formType')?.addEventListener('change', () => setTimeout(refresh, 0));
  document.addEventListener('change', event => {
    if (event.target?.matches?.('[data-field="commessa"]')) setTimeout(refresh, 150);
  });
  setTimeout(refresh, 100);
  setInterval(refresh, 650);
})();