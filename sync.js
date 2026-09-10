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
    .pw-associated-operator .pw-operator-name {
      border: 1px solid #bbb;
      border-radius: 6px;
      background: #f7f7f7;
      padding: 8px 10px;
      font-weight: 600;
      line-height: 1.25;
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

  function applyPvcOperators() {
    const typeSel = document.getElementById('formType');
    const type = typeSel?.value || '';
    const operators = PVC_OPERATORS[type];
    if (!operators) return;

    const rows = document.querySelectorAll('#formArea tbody tr');
    rows.forEach((row, index) => {
      const operator = operators[index];
      const resultBox = row.querySelector('.resultbox');
      if (!operator || !resultBox) return;

      resultBox.querySelector('.pw-associated-operator')?.remove();

      const signatureLabel = Array.from(resultBox.querySelectorAll('label'))
        .find(label => (label.textContent || '').trim().toLowerCase() === 'firma operatore');
      if (!signatureLabel) return;

      const block = document.createElement('div');
      block.className = 'pw-associated-operator';
      block.innerHTML = `<label>Operatore associato</label><div class="pw-operator-name">${operator}</div>`;
      resultBox.insertBefore(block, signatureLabel);
    });
  }

  function refreshPvcUi() {
    updateVisiblePvcPhaseNames();
    applyPvcOperators();
  }

  addPvcSpecialForm();
  updatePvcPhaseNames();
  refreshPvcUi();
  setTimeout(refreshPvcUi, 0);

  const formType = document.getElementById('formType');
  if (formType) {
    formType.addEventListener('change', () => setTimeout(refreshPvcUi, 0));
  }

  const script = document.createElement('script');
  script.src = 'sync2.js?v=2';
  script.async = false;
  document.head.appendChild(script);
})();
