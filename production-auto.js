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

  function updateOperator(row, index) {
    const type = formType();
    const expected = DEFAULTS[type]?.[index];
    if (!expected) return;
    decorateAlu(row, index);

    const hidden = row.querySelector('input[data-field="phase_operator_' + index + '"]');
    if (!hidden) return;
    const marker = ensureManualFlag(row, index);
    const current = String(hidden.value || '').trim();
    const aluSelect = row.querySelector('.pw-alu-operator-select');
    const pvcSelect = row.querySelector('.pw-operator-select');
    const select = aluSelect || pvcSelect;
    const name = row.querySelector('.pw-operator-name');
    const outcome = row.querySelector('input[data-group="esito_' + index + '"]:checked');
    const storedBlankApollo = type === 'pvc' && index === 3 && current === 'APOLLO FRANCESCO'
      && !marker.value && !outcome;
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
    if (!commessa()) return;
    // Prima si lascia caricare la commessa condivisa; non si sovrascrivono le firme custom.
    if (Date.now() - commessaChangedAt < 1700) return;
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
    if (existing === official) return;
    setSignatureImage('phase_sign_' + index, official);
    if (typeof autoSave === 'function') autoSave();
    if (window.PWCollaudoSync?.queueSave) window.PWCollaudoSync.queueSave(400);
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
      refreshSignature(row, i);
      const label = row.querySelector('.signature-wrap')?.previousElementSibling;
      if (label?.tagName === 'LABEL' && String(label.textContent || '').includes('Firma')) {
        label.textContent = 'Firma operatore associata';
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
