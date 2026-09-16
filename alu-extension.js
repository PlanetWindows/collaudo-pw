(() => {
  const ALU_TYPES = new Set(['alu', 'alu_speciali', 'alu_vie_fuga']);
  const OPERATOR_LIST = [
    'GHIDONI PIERLUIGI',
    'JHINAOUI RIADH',
    'ANGELO IDONE',
    'APOLLO FRANCESCO',
    "D'ALESSANDRO DANIELE",
    'FURLANI ROBERTO',
    'GOZZI ANDREA'
  ];

  const SIGNATURES_URL = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  const CODE_KEY = 'pw-collaudo-access-code';
  let signatures = {};
  let signaturesLoading = false;

  const style = document.createElement('style');
  style.textContent = `
    .pw-alu-operator-block{margin:8px 0 10px}
    .pw-alu-operator-select{
      width:100%;box-sizing:border-box;padding:8px 10px;border:1px solid #bbb;
      border-radius:6px;background:#fff;font:inherit;font-size:12px;font-weight:600
    }
    .pw-alu-signature-plus{
      min-width:30px;padding:3px 8px!important;font-size:18px!important;
      line-height:1!important;font-weight:700!important;cursor:pointer!important
    }
    @media print{
      .pw-alu-operator-select{border:.2mm solid #aaa;border-radius:0;padding:1.5mm 2mm}
      .pw-alu-signature-plus{display:none!important}
    }
  `;
  document.head.appendChild(style);

  function escHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
    })[ch]);
  }

  function currentType() {
    return String(document.getElementById('formType')?.value || '');
  }

  function isAluType() {
    return ALU_TYPES.has(currentType());
  }

  function addAluSpecialForm() {
    if (typeof FORMS === 'undefined' || !FORMS.alu) return;

    if (!FORMS.alu_speciali) {
      FORMS.alu_speciali = JSON.parse(JSON.stringify(FORMS.alu));
      FORMS.alu_speciali.title = 'SCHEDA COLLAUDO - ALLUMINIO - PEZZI SPECIALI';
    }

    const formType = document.getElementById('formType');
    if (!formType || formType.querySelector('option[value="alu_speciali"]')) return;

    const option = document.createElement('option');
    option.value = 'alu_speciali';
    option.textContent = 'Alluminio - Pezzi speciali';

    const aluOption = formType.querySelector('option[value="alu"]');
    const fugaOption = formType.querySelector('option[value="alu_vie_fuga"]');
    if (fugaOption) formType.insertBefore(option, fugaOption);
    else if (aluOption?.nextSibling) formType.insertBefore(option, aluOption.nextSibling);
    else formType.appendChild(option);
  }

  async function loadSignatures() {
    if (signaturesLoading || Object.keys(signatures).length) return;
    const code = String(localStorage.getItem(CODE_KEY) || '').trim();
    if (!code) return;
    signaturesLoading = true;
    try {
      const res = await fetch(SIGNATURES_URL, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({action:'signatures', code})
      });
      if (!res.ok) return;
      const data = await res.json();
      signatures = data?.signatures || {};
    } catch (err) {
      console.error('Caricamento firme operatori alluminio', err);
    } finally {
      signaturesLoading = false;
    }
  }

  function getLocalSavedOperator(type, index) {
    try {
      const raw = localStorage.getItem(`pw-collaudo-${type}`);
      if (!raw) return '';
      const data = JSON.parse(raw);
      const value = String(data?.fields?.[`phase_operator_${index}`] || '').trim();
      return OPERATOR_LIST.includes(value) ? value : '';
    } catch (_) {
      return '';
    }
  }

  function saveOperator(hiddenInput) {
    hiddenInput.dispatchEvent(new Event('input', { bubbles:true }));
    if (typeof autoSave === 'function') autoSave();
    if (window.PWCollaudoSync?.queueSave) window.PWCollaudoSync.queueSave(100);
  }

  function clearSignatureFor(index) {
    const key = `phase_sign_${index}`;
    if (typeof setSignatureImage === 'function') setSignatureImage(key, '');
    const input = document.querySelector(`input[data-signature-input="${key}"]`);
    if (input) input.value = '';
  }

  function applyOperatorSelectors() {
    if (!isAluType()) return;
    const type = currentType();

    document.querySelectorAll('#formArea tbody tr').forEach((row, index) => {
      const resultBox = row.querySelector('.resultbox');
      if (!resultBox) return;
      if (resultBox.querySelector('.pw-alu-operator-block')) return;

      const signatureLabel = Array.from(resultBox.querySelectorAll('label'))
        .find(label => (label.textContent || '').trim().toLowerCase() === 'firma operatore');
      if (!signatureLabel) return;

      const fieldName = `phase_operator_${index}`;
      const saved = getLocalSavedOperator(type, index);
      const block = document.createElement('div');
      block.className = 'pw-alu-operator-block';
      block.dataset.operatorIndex = String(index);
      block.innerHTML = `
        <label>Operatore associato</label>
        <select class="pw-alu-operator-select" aria-label="Scegli operatore">
          <option value="">Scegli operatore</option>
          ${OPERATOR_LIST.map(name => `<option value="${escHtml(name)}"${name === saved ? ' selected' : ''}>${escHtml(name)}</option>`).join('')}
        </select>
        <input type="hidden" data-field="${fieldName}" value="${escHtml(saved)}">
      `;

      const select = block.querySelector('.pw-alu-operator-select');
      const hidden = block.querySelector(`input[data-field="${fieldName}"]`);
      select.addEventListener('change', () => {
        hidden.value = select.value || '';
        clearSignatureFor(index);
        saveOperator(hidden);
      });

      resultBox.insertBefore(block, signatureLabel);
    });
  }

  function addSignatureButtons() {
    if (!isAluType()) return;

    document.querySelectorAll('#formArea tbody tr').forEach((row, index) => {
      const resultBox = row.querySelector('.resultbox');
      const actions = resultBox?.querySelector('.signature-actions');
      if (!actions || actions.querySelector('.pw-alu-signature-plus')) return;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pw-alu-signature-plus';
      btn.textContent = '+';
      btn.title = 'Inserisci la firma associata all’operatore scelto';
      btn.setAttribute('aria-label', 'Inserisci firma operatore');
      btn.addEventListener('click', async () => {
        const hidden = row.querySelector(`input[data-field="phase_operator_${index}"]`);
        const operator = String(hidden?.value || '').trim();
        if (!operator) {
          alert('Scegli prima un operatore.');
          return;
        }
        if (!Object.keys(signatures).length) await loadSignatures();
        const dataUrl = signatures[operator] || '';
        if (!dataUrl) {
          alert(`Firma non ancora disponibile per ${operator}.`);
          return;
        }
        if (typeof setSignatureImage !== 'function') return;
        setSignatureImage(`phase_sign_${index}`, dataUrl);
        if (typeof autoSave === 'function') autoSave();
        if (window.PWCollaudoSync?.queueSave) window.PWCollaudoSync.queueSave(120);
      });
      actions.insertBefore(btn, actions.firstChild);
    });
  }

  function syncSavedOperators() {
    if (!isAluType()) return;
    const type = currentType();
    document.querySelectorAll('.pw-alu-operator-block').forEach(block => {
      const index = Number(block.dataset.operatorIndex);
      const select = block.querySelector('.pw-alu-operator-select');
      const hidden = block.querySelector(`input[data-field="phase_operator_${index}"]`);
      if (!select || !hidden) return;
      const local = getLocalSavedOperator(type, index);
      const value = OPERATOR_LIST.includes(hidden.value) ? hidden.value : local;
      if (hidden.value !== value) hidden.value = value;
      if (select.value !== value) select.value = value;
    });
  }

  function refresh() {
    addAluSpecialForm();
    if (!isAluType()) return;
    applyOperatorSelectors();
    syncSavedOperators();
    addSignatureButtons();
    loadSignatures();
  }

  addAluSpecialForm();
  refresh();
  setTimeout(refresh, 0);

  document.getElementById('formType')?.addEventListener('change', () => setTimeout(refresh, 20));
  setInterval(refresh, 900);
})();
