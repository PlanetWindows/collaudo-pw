(() => {
  const style = document.createElement('style');
  style.textContent = `
    .signature-preview {
      position: relative !important;
    }
    .pw-signature-plus-proxy {
      position: absolute !important;
      z-index: 5;
      width: 34px !important;
      height: 34px !important;
      min-width: 34px !important;
      min-height: 34px !important;
      padding: 0 !important;
      border-radius: 50% !important;
      font-size: 22px !important;
      line-height: 32px !important;
      font-weight: 700 !important;
      text-align: center !important;
      cursor: pointer;
    }
    .signature-preview.pw-signature-awaiting-plus .pw-signature-plus-proxy {
      left: 50% !important;
      top: 50% !important;
      right: auto !important;
      transform: translate(-50%, -50%) !important;
    }
    .signature-preview:not(.pw-signature-awaiting-plus) .pw-signature-plus-proxy {
      top: 6px !important;
      right: 6px !important;
      left: auto !important;
      transform: none !important;
    }
    .signature-preview.pw-signature-awaiting-plus img[data-signature] {
      display: none !important;
    }
    .pw-signature-remove-small {
      padding: 2px 5px !important;
      font-size: 9px !important;
      line-height: 1.1 !important;
      min-height: 0 !important;
    }
    @media print {
      .pw-signature-plus-proxy,
      .pw-signature-remove-small {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(style);

  function getType() {
    return document.getElementById('formType')?.value || '';
  }

  function isPvcForm() {
    return String(getType()).startsWith('pvc');
  }

  function getOperator(row, index) {
    return String(row.querySelector(`input[data-field="phase_operator_${index}"]`)?.value || '').trim();
  }

  function getSavedConfirmation(type, index) {
    try {
      const raw = localStorage.getItem(`pw-collaudo-${type}`);
      if (!raw) return '';
      const data = JSON.parse(raw);
      return String(data?.fields?.[`phase_signature_confirmed_${index}`] || '').trim();
    } catch (_) {
      return '';
    }
  }

  function ensureConfirmationInput(row, index) {
    const fieldName = `phase_signature_confirmed_${index}`;
    let input = row.querySelector(`input[data-field="${fieldName}"]`);
    if (input) return input;

    input = document.createElement('input');
    input.type = 'hidden';
    input.dataset.field = fieldName;
    input.value = getSavedConfirmation(getType(), index);
    row.querySelector('.resultbox')?.appendChild(input);
    return input;
  }

  function saveConfirmation(input, value) {
    if (!input) return;
    if (input.value === value) return;
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    if (typeof autoSave === 'function') autoSave();
    if (window.PWCollaudoSync?.queueSave) window.PWCollaudoSync.queueSave(120);
  }

  function clearSignatureDom(index) {
    const key = `phase_sign_${index}`;
    const img = document.querySelector(`img[data-signature="${key}"]`);
    if (!img) return false;
    const hadSignature = img.dataset.hasSignature === '1' || !!img.getAttribute('src');
    if (!hadSignature) return false;

    if (typeof setSignatureImage === 'function') {
      setSignatureImage(key, '');
    } else {
      img.removeAttribute('src');
      img.dataset.hasSignature = '0';
      img.style.display = 'none';
      const empty = document.querySelector(`[data-signature-placeholder="${key}"]`);
      if (empty) empty.style.display = '';
    }
    return true;
  }

  function migrateOldAutomaticSignature(row, index) {
    const confirmation = ensureConfirmationInput(row, index);
    const operator = getOperator(row, index);
    const confirmed = !!operator && confirmation.value === operator;
    if (confirmed) return false;

    const cleared = clearSignatureDom(index);
    if (cleared) {
      if (typeof autoSave === 'function') autoSave();
      if (window.PWCollaudoSync?.queueSave) window.PWCollaudoSync.queueSave(180);
    }
    return cleared;
  }

  function refreshSignatureUi() {
    if (!isPvcForm()) return;

    document.querySelectorAll('#formArea tbody tr').forEach((row, index) => {
      const preview = row.querySelector('.signature-preview');
      const actions = row.querySelector('.signature-actions');
      if (!preview || !actions) return;

      const confirmation = ensureConfirmationInput(row, index);
      const operator = getOperator(row, index);
      const isConfirmed = !!operator && confirmation.value === operator;

      migrateOldAutomaticSignature(row, index);

      let officialButton = row.querySelector('.pw-use-official-signature');
      if (officialButton && officialButton.parentElement !== actions) {
        actions.insertBefore(officialButton, actions.firstChild);
      }
      if (officialButton) officialButton.style.display = 'none';

      let proxy = preview.querySelector('.pw-signature-plus-proxy');
      if (!proxy) {
        proxy = document.createElement('button');
        proxy.type = 'button';
        proxy.className = 'pw-signature-plus-proxy';
        proxy.textContent = '+';
        proxy.title = 'Inserisci la firma associata all’operatore';
        proxy.setAttribute('aria-label', 'Inserisci la firma associata all’operatore');
        preview.appendChild(proxy);

        proxy.addEventListener('click', () => {
          const currentOperator = getOperator(row, index);
          if (!currentOperator) return;
          const marker = ensureConfirmationInput(row, index);
          saveConfirmation(marker, currentOperator);
          preview.classList.remove('pw-signature-awaiting-plus');

          const sourceButton = row.querySelector('.pw-use-official-signature');
          if (sourceButton) sourceButton.click();

          setTimeout(() => {
            const img = preview.querySelector('img[data-signature]');
            const hasSignature = img?.dataset.hasSignature === '1' && !!img.getAttribute('src');
            if (!hasSignature) {
              saveConfirmation(marker, '');
              preview.classList.add('pw-signature-awaiting-plus');
            }
            refreshSignatureUi();
          }, 1200);
        });
      }

      actions.querySelectorAll('button').forEach(button => {
        const text = (button.textContent || '').trim().toLowerCase();
        if (button.classList.contains('pw-use-official-signature')) {
          button.style.display = 'none';
        } else if (text.includes('allega / cambia firma')) {
          button.style.display = 'none';
        } else if (text.includes('rimuovi firma')) {
          button.classList.add('pw-signature-remove-small');
          const img = preview.querySelector('img[data-signature]');
          const hasSignature = isConfirmed && img?.dataset.hasSignature === '1' && !!img.getAttribute('src');
          button.style.display = hasSignature ? '' : 'none';
        }
      });

      const hint = actions.querySelector('.signature-placeholder');
      if (hint) hint.style.display = 'none';

      const empty = preview.querySelector('.signature-empty');
      if (empty) empty.style.display = 'none';

      preview.classList.toggle('pw-signature-awaiting-plus', !isConfirmed);
    });
  }

  document.addEventListener('change', e => {
    const select = e.target.closest?.('.pw-operator-select');
    if (!select || !isPvcForm()) return;
    const row = select.closest('tr');
    if (!row) return;
    const rows = Array.from(document.querySelectorAll('#formArea tbody tr'));
    const index = rows.indexOf(row);
    if (index < 0) return;
    const marker = ensureConfirmationInput(row, index);
    saveConfirmation(marker, '');
    clearSignatureDom(index);
    setTimeout(refreshSignatureUi, 0);
  }, true);

  document.addEventListener('click', e => {
    const button = e.target.closest?.('button');
    if (!button || !isPvcForm()) return;
    const text = (button.textContent || '').trim().toLowerCase();
    if (!text.includes('rimuovi firma')) return;
    const row = button.closest('tr');
    if (!row) return;
    const rows = Array.from(document.querySelectorAll('#formArea tbody tr'));
    const index = rows.indexOf(row);
    if (index < 0) return;
    saveConfirmation(ensureConfirmationInput(row, index), '');
    setTimeout(refreshSignatureUi, 0);
  }, true);

  document.getElementById('formType')?.addEventListener('change', () => {
    setTimeout(refreshSignatureUi, 50);
  });

  const observer = new MutationObserver(() => refreshSignatureUi());
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src', 'data-has-signature']
  });

  setInterval(refreshSignatureUi, 350);
  setTimeout(refreshSignatureUi, 0);
})();
