(() => {
  'use strict';
  // PW Collaudo: preset degli operatori, firme ufficiali e verifica C/NC.
  if (localStorage.getItem('pw-collaudo-role') !== 'production') return;

  const ENDPOINT = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  const DEFAULTS = {
    pvc: ['GHIDONI PIERLUIGI','GHIDONI PIERLUIGI','JHINAOUI RIADH','ANGELO IDONE',"D'ALESSANDRO DANIELE",'GOZZI ANDREA','GOZZI ANDREA'],
    pvc_speciali: ['GHIDONI PIERLUIGI','GHIDONI PIERLUIGI','JHINAOUI RIADH','FURLANI ROBERTO','FURLANI ROBERTO','GOZZI ANDREA','GOZZI ANDREA'],
    pvc_vie_fuga: ['GHIDONI PIERLUIGI','GHIDONI PIERLUIGI','JHINAOUI RIADH','FURLANI ROBERTO','FURLANI ROBERTO','GOZZI ANDREA','GOZZI ANDREA'],
    // Per l'alluminio vengono proposte le postazioni corrispondenti a quelle PVC;
    // il responsabile può sempre modificare l'operatore effettivo.
    alu: ['GHIDONI PIERLUIGI','GHIDONI PIERLUIGI','JHINAOUI RIADH','ANGELO IDONE',"D'ALESSANDRO DANIELE",'GOZZI ANDREA','GOZZI ANDREA'],
    alu_speciali: ['GHIDONI PIERLUIGI','GHIDONI PIERLUIGI','JHINAOUI RIADH','FURLANI ROBERTO','FURLANI ROBERTO','GOZZI ANDREA','GOZZI ANDREA'],
    alu_vie_fuga: ['GHIDONI PIERLUIGI','GHIDONI PIERLUIGI','JHINAOUI RIADH','FURLANI ROBERTO','FURLANI ROBERTO','GOZZI ANDREA','GOZZI ANDREA']
  };
  const style = document.createElement('style');
  style.textContent = `
    .signature-actions,.pw-signature-plus-proxy,.pw-use-official-signature,.pw-alu-signature-plus{display:none!important}
    .pw-alu-operator-block .pw-operator-row{display:flex;gap:6px;align-items:center;margin:3px 0}
    .pw-alu-operator-block .pw-operator-name{flex:1;padding:7px;border:1px solid #bbb;border-radius:5px;font-size:12px;font-weight:600}
    .pw-alu-operator-block .pw-change-operator{border:1px solid #bbb;border-radius:5px;background:#fff;padding:6px;cursor:pointer}
    .pw-alu-operator-block .pw-alu-operator-select{display:none}
    .inlinechecks{flex-wrap:wrap}
    .pw-associated-operator,.pw-alu-operator-block{display:block!important;margin:7px 0 8px!important}
    .pw-associated-operator .pw-operator-row,.pw-alu-operator-block .pw-operator-row{display:flex!important;gap:5px;align-items:center;flex-wrap:wrap}
    .pw-associated-operator .pw-operator-name,.pw-alu-operator-block .pw-operator-name{font-family:Poppins,Arial,sans-serif!important;font-size:11px!important;font-style:normal!important;text-transform:uppercase!important;font-weight:700!important;letter-spacing:.1px;overflow-wrap:anywhere;white-space:normal!important;overflow:visible!important;text-overflow:clip!important}
    .pw-associated-operator>label,.pw-alu-operator-block>label{font-weight:700!important;font-size:11px!important}
    @media print{.pw-associated-operator .pw-change-operator,.pw-associated-operator .pw-operator-select,.pw-alu-operator-block .pw-change-operator{display:none!important}
      .pw-associated-operator .pw-operator-name,.pw-alu-operator-block .pw-operator-name{font-family:Arial,sans-serif!important;border:0!important;padding:0!important}}
    @media print{
      .pw-alu-operator-block .pw-change-operator,.pw-alu-operator-block .pw-alu-operator-select{display:none!important}
      .pw-alu-operator-block .pw-operator-name{border:0;padding:0}
      .pw-manual-pdf-btn{display:none!important}
    }`;
  document.head.appendChild(style);

  let signatures = {};
  let signaturesLoading = false;
  let lastSignatureAttempt = 0;
  let activeForm = '';
  let activeCommessa = '';
  let commessaChangedAt = Date.now();

  const formType = () => document.getElementById('formType')?.value || '';
  const commessa = () => String(document.querySelector('[data-field="commessa"]')?.value || '').trim();

  async function fetchSignatures() {
    if (signaturesLoading || Object.keys(signatures).length || Date.now() - lastSignatureAttempt < 5000) return;
    const code = String(localStorage.getItem('pw-collaudo-access-code') || '').trim();
    if (!code) return;
    lastSignatureAttempt = Date.now();
    signaturesLoading = true;
    try {
      const response = await fetch(ENDPOINT, {
        method:'POST', cache:'no-store',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({action:'signatures',code})
      });
      if (response.ok) {
        const data = await response.json();
        signatures = data.signatures || {};
        refresh();
      }
    } catch (err) { console.warn('Firme ufficiali non disponibili', err); }
    finally { signaturesLoading = false; }
  }

  function persist(input) {
    input.dispatchEvent(new Event('input', {bubbles:true}));
    if (typeof autoSave === 'function') autoSave();
    if (window.PWCollaudoSync?.queueSave) window.PWCollaudoSync.queueSave(250);
  }

  function ensureManualFlag(row, index) {
    let input = row.querySelector('input[data-field="phase_manual_operator_' + index + '"]');
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.dataset.field = 'phase_manual_operator_' + index;
      row.querySelector('.resultbox')?.appendChild(input);
    }
    return input;
  }

  function decorateAlu(row, index) {
    const block = row.querySelector('.pw-alu-operator-block');
    if (!block || block.dataset.pwAutoDecorated === '1') return;
    const select = block.querySelector('.pw-alu-operator-select');
    if (!select) return;
    block.dataset.pwAutoDecorated = '1';
    const panel = document.createElement('div');
    panel.className = 'pw-operator-row';
    const label = document.createElement('div');
    label.className = 'pw-operator-name';
    label.textContent = select.value || DEFAULTS[formType()]?.[index] || '';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'pw-change-operator';
    button.textContent = 'Cambia operatore';
    panel.append(label, button);
    select.parentNode.insertBefore(panel, select);
    button.addEventListener('click', () => {
      select.style.setProperty('display', select.style.display === 'block' ? 'none' : 'block');
      if (select.style.display === 'block') select.focus();
    });
    select.addEventListener('change', () => {
      label.textContent = select.value || '';
      select.style.setProperty('display', 'none');
      const marker = ensureManualFlag(row, index);
      marker.value = '1';
      persist(marker);
    });
  }

  function ensureOperatorBlock(row, index) {
    const type = formType();
    const fallback = DEFAULTS[type]?.[index] || '';
    const resultBox = row.querySelector('.resultbox');
    if (!resultBox || !fallback) return;

    let block = resultBox.querySelector('.pw-associated-operator, .pw-alu-operator-block');
    if (block) {
      // La vecchia versione puo' avere solo una select, senza nome stampato.
      decorateAlu(row, index);
      return;
    }

    const signatureWrap = resultBox.querySelector('.signature-wrap');
    if (!signatureWrap) return;
    const signatureLabel = Array.from(resultBox.querySelectorAll('label'))
      .find(label => /^firma operatore/i.test((label.textContent || '').trim()));
    const oldData = (() => {
      try { return JSON.parse(localStorage.getItem('pw-collaudo-' + type) || '{}'); }
      catch (_) { return {}; }
    })();
    const savedName = String(oldData.fields?.['phase_operator_' + index] || '').trim();
    const oldCommessa = String(oldData.fields?.commessa || '').trim().toUpperCase();
    const sameCommessa = !oldCommessa || !commessa() || oldCommessa === commessa().toUpperCase();
    const name = sameCommessa && savedName && (Object.values(DEFAULTS).some(names => names.includes(savedName)) || savedName === 'APOLLO FRANCESCO')
      ? savedName : fallback;

    block = document.createElement('div');
    block.className = 'pw-associated-operator';
    block.dataset.operatorIndex = String(index);
    block.dataset.defaultOperator = fallback;
    const label = document.createElement('label');
    label.textContent = 'Nome e cognome';
    const nameRow = document.createElement('div');
    nameRow.className = 'pw-operator-row';
    const printed = document.createElement('div');
    printed.className = 'pw-operator-name';
    printed.textContent = name.toUpperCase();
    const change = document.createElement('button');
    change.type = 'button';
    change.className = 'pw-change-operator';
    change.textContent = 'Cambia operatore';
    nameRow.append(printed, change);
    const select = document.createElement('select');
    select.className = 'pw-operator-select';
    select.hidden = true;
    select.setAttribute('aria-label', 'Sostituisci operatore assente');
    const names = [...new Set(Object.values(DEFAULTS).flat().concat(['APOLLO FRANCESCO']))];
    names.forEach(operator => {
      const option = document.createElement('option');
      option.value = operator;
      option.textContent = operator;
      select.appendChild(option);
    });
    select.value = name;
    const hidden = document.createElement('input');
    hidden.type = 'hidden';
    hidden.dataset.field = 'phase_operator_' + index;
    hidden.value = name;
    block.append(label, nameRow, select, hidden);
    resultBox.insertBefore(block, signatureLabel || signatureWrap);

    change.addEventListener('click', () => {
      select.hidden = !select.hidden;
      if (!select.hidden) select.focus();
    });
    select.addEventListener('change', () => {
      const chosen = select.value || fallback;
      hidden.value = chosen;
      printed.textContent = chosen.toUpperCase();
      select.hidden = true;
      const marker = ensureManualFlag(row, index);
      marker.value = '1';
      if (typeof setSignatureImage === 'function') {
        setSignatureImage('phase_sign_' + index, '');
      }
      persist(hidden);
      persist(marker);
      setTimeout(refresh, 100);
    });
  }

  function updateOperator(row, index) {
    const type = formType();
    const expected = DEFAULTS[type]?.[index];
    if (!expected) return;
    ensureOperatorBlock(row, index);
    decorateAlu(row, index);

    const hidden = row.querySelector('input[data-field="phase_operator_' + index + '"]');
    if (!hidden) return;
    const marker = ensureManualFlag(row, index);
    const current = String(hidden.value || '').trim();
    const aluSelect = row.querySelector('.pw-alu-operator-select');
    const pvcSelect = row.querySelector('.pw-operator-select');
    const select = aluSelect || pvcSelect;
    const name = row.querySelector('.pw-operator-name');
    const storedBlankApollo = type === 'pvc' && index === 3 && current === 'APOLLO FRANCESCO'
      && !marker.value;
    if ((!current || storedBlankApollo) && !marker.value) {
      hidden.value = expected;
      if (select) select.value = expected;
      if (name) name.textContent = expected;
      // Un'eventuale firma precedente viene sostituita con quella associata al nuovo nome.
      if (storedBlankApollo && typeof setSignatureImage === 'function') {
        setSignatureImage('phase_sign_' + index, '');
      }
      if (commessa()) persist(hidden);
    } else {
      if (select && select.value !== current) select.value = current;
      if (name && name.textContent !== current) name.textContent = current;
    }
  }

  function refreshSignature(row, index) {
    // Le firme ufficiali devono comparire anche prima di inserire la commessa.
    // A commessa caricata la sincronizzazione mantiene i dati esistenti.
    if (commessa() && Date.now() - commessaChangedAt < 1300) return;
    const operator = String(row.querySelector('input[data-field="phase_operator_' + index + '"]')?.value || '').trim();
    if (!operator) return;
    const official = signatures[operator] ||
      (operator === 'APOLLO FRANCESCO' ? 'apollo-francesco-signature.svg?v=1' : '');
    if (!official || typeof setSignatureImage !== 'function') return;
    const img = row.querySelector('img[data-signature="phase_sign_' + index + '"]');
    if (!img) return;
    const existing = String(img.getAttribute('src') || '');
    if (existing && img.dataset.hasSignature === '1') {
      // Corregge solo una firma ufficiale certamente associata a un altro operatore.
      const officialOfOther = Object.entries(signatures).some(([name, value]) => name !== operator && value === existing);
      if (!officialOfOther && !(existing.includes('apollo-francesco-signature.svg') && operator !== 'APOLLO FRANCESCO')) return;
    }
    if (existing === official && img.dataset.hasSignature === '1') return;
    setSignatureImage('phase_sign_' + index, official);
    // Le firme visualizzate a schermata vuota si salvano solo quando esiste una commessa.
    if (commessa()) {
      if (typeof autoSave === 'function') autoSave();
      if (window.PWCollaudoSync?.queueSave) window.PWCollaudoSync.queueSave(400);
    }
  }

  function refresh() {
    const type = formType();
    const current = commessa();
    if (type !== activeForm || current !== activeCommessa) {
      activeForm = type;
      activeCommessa = current;
      commessaChangedAt = Date.now();
    }
    if (!DEFAULTS[type]) return;
    const rows = document.querySelectorAll('#formArea tbody tr');
    rows.forEach((row, i) => {
      updateOperator(row, i);
      const operatorBlock = row.querySelector('.pw-associated-operator, .pw-alu-operator-block');
      if (operatorBlock) {
        const printedName = operatorBlock.querySelector('.pw-operator-name');
        if (printedName) {
          const name = row.querySelector('input[data-field="phase_operator_' + i + '"]');
          const value = String(name?.value || DEFAULTS[type]?.[i] || '').trim();
          if (value && printedName.textContent !== value.toUpperCase()) printedName.textContent = value.toUpperCase();
        }
        const operatorLabel = operatorBlock.querySelector('label');
        if (operatorLabel && operatorLabel.textContent !== 'Nome e cognome') operatorLabel.textContent = 'Nome e cognome';
      }
      refreshSignature(row, i);
      const label = row.querySelector('.signature-wrap')?.previousElementSibling;
      if (label?.tagName === 'LABEL' && String(label.textContent || '').includes('Firma')) {
        label.textContent = 'Firma operatore';
      }
      row.querySelectorAll('.inlinechecks .choice').forEach(choice => {
        const input = choice.querySelector('input[data-value]');
        if (input && !choice.dataset.pwLabels) {
          const caption = input.dataset.value === 'NC' ? 'Non conforme' : 'Conforme';
          for (const node of [...choice.childNodes]) if (node.nodeType === 3) node.textContent = '';
          choice.appendChild(document.createTextNode(' ' + caption));
          choice.dataset.pwLabels = '1';
        }
      });
    });
  }

  document.addEventListener('change', e => {
    const el = e.target;
    const type = formType();
    if (!DEFAULTS[type]) return;
    if (el?.matches?.('.pw-operator-select,.pw-alu-operator-select')) {
      const row = el.closest('tr');
      const index = Array.from(document.querySelectorAll('#formArea tbody tr')).indexOf(row);
      if (index >= 0) {
        const marker = ensureManualFlag(row, index);
        marker.value = '1';
        persist(marker);
        setTimeout(refresh, 220);
      }
    }

  }, true);

  function addManualPdfButton() {
    const footer = document.querySelector('.footer-actions');
    if (!footer || footer.querySelector('.pw-manual-pdf-btn')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'pw-manual-pdf-btn';
    button.textContent = 'Esporta PDF ora';
    button.title = 'Stampa o salva la scheda corrente in PDF';
    button.addEventListener('click', () => window.print());
    footer.appendChild(button);
  }

  document.getElementById('formType')?.addEventListener('change', () => setTimeout(refresh, 120));
  setInterval(() => { fetchSignatures(); refresh(); addManualPdfButton(); }, 900);
  fetchSignatures();
  refresh();
  addManualPdfButton();
})();
