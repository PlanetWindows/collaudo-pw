(() => {
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';
  document.head.appendChild(fontLink);

  const fontStyle = document.createElement('style');
  fontStyle.textContent = `
    html, body, body *, input, select, button, textarea {
      font-family: 'Poppins', Arial, Helvetica, sans-serif !important;
    }
    .pw-associated-operator {
      margin: 8px 0 10px;
    }
    .pw-operator-row {
      display: flex;
      gap: 5px;
      align-items: center;
    }
    .pw-associated-operator .pw-operator-name {
      flex: 1;
      border: 1px solid #bbb;
      border-radius: 6px;
      background: #f7f7f7;
      padding: 8px 10px;
      font-weight: 600;
      line-height: 1.2;
      min-width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .pw-change-operator {
      flex: 0 0 auto;
      white-space: nowrap;
      padding: 3px 6px;
      font-size: 9px;
      line-height: 1.1;
      min-height: 0;
    }
    .pw-operator-select {
      width: 100%;
      margin-top: 6px;
      padding: 7px 8px;
      border: 1px solid #bbb;
      border-radius: 6px;
      background: #fff;
      font-size: 12px;
    }
    .pw-use-official-signature {
      min-width: 30px;
      padding: 3px 8px !important;
      font-size: 18px !important;
      line-height: 1 !important;
      font-weight: 700;
      cursor: pointer;
    }
    @media print {
      .pw-associated-operator {
        margin: 2mm 0 2mm;
      }
      .pw-associated-operator .pw-operator-name {
        border: 0.2mm solid #aaa;
        border-radius: 0;
        background: #fff;
        padding: 1.5mm 2mm;
        white-space: nowrap;
        overflow: visible;
        text-overflow: clip;
      }
      .pw-change-operator,
      .pw-operator-select,
      .pw-use-official-signature {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(fontStyle);

  const PVC_OPERATORS = {
    pvc: [
      'GHIDONI PIERLUIGI',
      'GHIDONI PIERLUIGI',
      'JHINAOUI RIADH',
      'APOLLO FRANCESCO',
      "D'ALESSANDRO DANIELE",
      'GOZZI ANDREA',
      'GOZZI ANDREA'
    ],
    pvc_speciali: [
      'GHIDONI PIERLUIGI',
      'GHIDONI PIERLUIGI',
      'JHINAOUI RIADH',
      'FURLANI ROBERTO',
      'FURLANI ROBERTO',
      'GOZZI ANDREA',
      'GOZZI ANDREA'
    ],
    pvc_vie_fuga: [
      'GHIDONI PIERLUIGI',
      'GHIDONI PIERLUIGI',
      'JHINAOUI RIADH',
      'FURLANI ROBERTO',
      'FURLANI ROBERTO',
      'GOZZI ANDREA',
      'GOZZI ANDREA'
    ]
  };

  const PVC_OPERATOR_LIST = [
    'GHIDONI PIERLUIGI',
    'JHINAOUI RIADH',
    'APOLLO FRANCESCO',
    "D'ALESSANDRO DANIELE",
    'FURLANI ROBERTO',
    'GOZZI ANDREA'
  ];

  const SIGNATURES_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  const CODE_KEY = 'pw-collaudo-access-code';
  let OPERATOR_SIGNATURES = {};
  let signaturesLoading = false;

  function escHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    })[ch]);
  }

  async function loadOperatorSignatures() {
    if (signaturesLoading || Object.keys(OPERATOR_SIGNATURES).length) return;
    const code = (localStorage.getItem(CODE_KEY) || '').trim();
    if (!code) return;
    signaturesLoading = true;
    try {
      const res = await fetch(SIGNATURES_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'signatures', code })
      });
      if (!res.ok) return;
      const data = await res.json();
      OPERATOR_SIGNATURES = data?.signatures || {};
    } catch (err) {
      console.error('Caricamento firme operatori', err);
    } finally {
      signaturesLoading = false;
    }
  }

  function setOfficialSignature(index, operator) {
    const key = `phase_sign_${index}`;
    const dataUrl = OPERATOR_SIGNATURES[operator] || '';
    if (!dataUrl) {
      alert(`Firma non ancora disponibile per ${operator}.`);
      return;
    }
    if (typeof setSignatureImage !== 'function') return;
    setSignatureImage(key, dataUrl);
    if (typeof autoSave === 'function') autoSave();
    if (window.PWCollaudoSync?.queueSave) window.PWCollaudoSync.queueSave(120);
  }

  function clearPhaseSignature(index) {
    const key = `phase_sign_${index}`;
    if (typeof setSignatureImage !== 'function') return;
    setSignatureImage(key, '');
    if (typeof autoSave === 'function') autoSave();
    if (window.PWCollaudoSync?.queueSave) window.PWCollaudoSync.queueSave(120);
  }

  function addSignaturePlusButtons() {
    const type = document.getElementById('formType')?.value || '';
    if (!PVC_OPERATORS[type]) return;

    document.querySelectorAll('#formArea tbody tr').forEach((row, index) => {
      const resultBox = row.querySelector('.resultbox');
      if (!resultBox) return;
      const actions = resultBox.querySelector('.signature-actions');
      if (!actions || actions.querySelector('.pw-use-official-signature')) return;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pw-use-official-signature';
      btn.textContent = '+';
      btn.title = 'Inserisci firma associata all\'operatore';
      btn.setAttribute('aria-label', 'Inserisci firma associata all\'operatore');
      btn.addEventListener('click', async () => {
        if (!Object.keys(OPERATOR_SIGNATURES).length) await loadOperatorSignatures();
        const hiddenInput = row.querySelector(`input[data-field="phase_operator_${index}"]`);
        const operator = String(hiddenInput?.value || PVC_OPERATORS[type]?.[index] || '').trim();
        if (!operator) return;
        setOfficialSignature(index, operator);
      });
      actions.insertBefore(btn, actions.firstChild);
    });
  }

  function addPvcSpecialForm() {
    if (typeof FORMS === 'undefined' || !FORMS.pvc) return;

    if (!FORMS.pvc_speciali) {
      FORMS.pvc_speciali = JSON.parse(JSON.stringify(FORMS.pvc));
      FORMS.pvc_speciali.title = 'SCHEDA COLLAUDO - PVC - PEZZI SPECIALI';
    }

    const formType = document.getElementById('formType');
    if (!formType || formType.querySelector('option[value="pvc_speciali"]')) return;

    const option = document.createElement('option');
    option.value = 'pvc_speciali';
    option.textContent = 'PVC - Pezzi speciali';

    const pvcOption = formType.querySelector('option[value="pvc"]');
    if (pvcOption && pvcOption.nextSibling) {
      formType.insertBefore(option, pvcOption.nextSibling);
    } else {
      formType.appendChild(option);
    }
  }

  function updatePvcPhaseNames() {
    if (typeof FORMS === 'undefined') return;

    ['pvc', 'pvc_speciali', 'pvc_vie_fuga'].forEach(key => {
      const phases = FORMS[key] && FORMS[key].phases;
      if (!Array.isArray(phases)) return;

      phases.forEach(phase => {
        if (phase[0] === 'MONTAGGIO FERRAMENTA') {
          phase[0] = 'MONTAGGIO FERRAMENTA ANTE';
        } else if (phase[0] === 'INSERIMENTO GUARNIZIONI') {
          phase[0] = 'MONTAGGIO FERRAMENTA TELAI';
        }
      });
    });
  }

  function updateVisiblePvcPhaseNames() {
    const typeSel = document.getElementById('formType');
    if (!typeSel || !String(typeSel.value).startsWith('pvc')) return;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const text = node.nodeValue.trim();
      if (text === 'MONTAGGIO FERRAMENTA') {
        node.nodeValue = node.nodeValue.replace('MONTAGGIO FERRAMENTA', 'MONTAGGIO FERRAMENTA ANTE');
      } else if (text === 'INSERIMENTO GUARNIZIONI') {
        node.nodeValue = node.nodeValue.replace('INSERIMENTO GUARNIZIONI', 'MONTAGGIO FERRAMENTA TELAI');
      }
    }
  }

  function getLocalSavedOperator(type, index) {
    try {
      const raw = localStorage.getItem(`pw-collaudo-${type}`);
      if (!raw) return '';
      const data = JSON.parse(raw);
      return String(data?.fields?.[`phase_operator_${index}`] || '').trim();
    } catch (_) {
      return '';
    }
  }

  function saveOperatorChange(hiddenInput) {
    hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
    if (typeof autoSave === 'function') autoSave();
    if (window.PWCollaudoSync?.queueSave) window.PWCollaudoSync.queueSave(100);
  }

  function applyPvcOperators() {
    const typeSel = document.getElementById('formType');
    const type = typeSel?.value || '';
    const operators = PVC_OPERATORS[type];
    if (!operators) return;

    const rows = document.querySelectorAll('#formArea tbody tr');
    rows.forEach((row, index) => {
      const defaultOperator = operators[index];
      const resultBox = row.querySelector('.resultbox');
      if (!defaultOperator || !resultBox) return;

      const existing = resultBox.querySelector('.pw-associated-operator');
      if (existing) return;

      const signatureLabel = Array.from(resultBox.querySelectorAll('label'))
        .find(label => (label.textContent || '').trim().toLowerCase() === 'firma operatore');
      if (!signatureLabel) return;

      const fieldName = `phase_operator_${index}`;
      const savedOperator = getLocalSavedOperator(type, index);
      const currentOperator = PVC_OPERATOR_LIST.includes(savedOperator) ? savedOperator : defaultOperator;

      const block = document.createElement('div');
      block.className = 'pw-associated-operator';
      block.dataset.operatorIndex = String(index);
      block.dataset.defaultOperator = defaultOperator;
      block.innerHTML = `
        <label>Operatore associato</label>
        <div class="pw-operator-row">
          <div class="pw-operator-name">${escHtml(currentOperator)}</div>
          <button type="button" class="pw-change-operator">Cambia operatore</button>
        </div>
        <select class="pw-operator-select" hidden aria-label="Cambia operatore">
          ${PVC_OPERATOR_LIST.map(name => `<option value="${escHtml(name)}"${name === currentOperator ? ' selected' : ''}>${escHtml(name)}</option>`).join('')}
        </select>
        <input type="hidden" data-field="${fieldName}" value="${escHtml(currentOperator)}">
      `;

      const button = block.querySelector('.pw-change-operator');
      const select = block.querySelector('.pw-operator-select');
      const nameEl = block.querySelector('.pw-operator-name');
      const hiddenInput = block.querySelector(`input[data-field="${fieldName}"]`);

      button.addEventListener('click', () => {
        select.hidden = !select.hidden;
        if (!select.hidden) select.focus();
      });

      select.addEventListener('change', () => {
        const selected = select.value || defaultOperator;
        nameEl.textContent = selected;
        hiddenInput.value = selected;
        select.hidden = true;
        clearPhaseSignature(index);
        saveOperatorChange(hiddenInput);
      });

      resultBox.insertBefore(block, signatureLabel);
    });
  }

  function syncOperatorDisplays() {
    const type = document.getElementById('formType')?.value || '';
    if (!PVC_OPERATORS[type]) return;

    document.querySelectorAll('.pw-associated-operator').forEach(block => {
      const index = Number(block.dataset.operatorIndex);
      const defaultOperator = PVC_OPERATORS[type]?.[index] || block.dataset.defaultOperator || '';
      const hiddenInput = block.querySelector(`input[data-field="phase_operator_${index}"]`);
      const nameEl = block.querySelector('.pw-operator-name');
      const select = block.querySelector('.pw-operator-select');
      if (!hiddenInput || !nameEl || !select) return;

      const value = PVC_OPERATOR_LIST.includes(hiddenInput.value) ? hiddenInput.value : defaultOperator;
      if (hiddenInput.value !== value) hiddenInput.value = value;
      if (nameEl.textContent !== value) nameEl.textContent = value;
      if (select.value !== value) select.value = value;
    });
  }

  function refreshPvcUi() {
    updateVisiblePvcPhaseNames();
    applyPvcOperators();
    syncOperatorDisplays();
    addSignaturePlusButtons();
    loadOperatorSignatures();
  }

  addPvcSpecialForm();
  updatePvcPhaseNames();
  refreshPvcUi();
  setTimeout(refreshPvcUi, 0);

  const formType = document.getElementById('formType');
  if (formType) {
    formType.addEventListener('change', () => setTimeout(refreshPvcUi, 0));
  }

  setInterval(() => {
    syncOperatorDisplays();
    addSignaturePlusButtons();
    if (!Object.keys(OPERATOR_SIGNATURES).length) loadOperatorSignatures();
  }, 900);

  const script = document.createElement('script');
  script.src = 'sync2.js?v=2';
  script.async = false;
  document.head.appendChild(script);
})();
