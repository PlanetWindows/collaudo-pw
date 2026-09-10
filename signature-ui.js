(() => {
  const style = document.createElement('style');
  style.textContent = `
    .signature-preview {
      position: relative !important;
    }
    .pw-use-official-signature.pw-signature-plus-in-box {
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
    }
    .signature-preview.pw-signature-empty-state .pw-signature-plus-in-box {
      left: 50% !important;
      top: 50% !important;
      right: auto !important;
      transform: translate(-50%, -50%) !important;
    }
    .signature-preview:not(.pw-signature-empty-state) .pw-signature-plus-in-box {
      top: 6px !important;
      right: 6px !important;
      left: auto !important;
      transform: none !important;
    }
    .pw-signature-remove-small {
      padding: 2px 5px !important;
      font-size: 9px !important;
      line-height: 1.1 !important;
      min-height: 0 !important;
    }
    @media print {
      .pw-signature-plus-in-box,
      .pw-signature-remove-small {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(style);

  function isPvcForm() {
    const type = document.getElementById('formType')?.value || '';
    return String(type).startsWith('pvc');
  }

  function refreshSignatureUi() {
    if (!isPvcForm()) return;

    document.querySelectorAll('#formArea tbody tr').forEach(row => {
      const preview = row.querySelector('.signature-preview');
      const actions = row.querySelector('.signature-actions');
      if (!preview || !actions) return;

      const plus = row.querySelector('.pw-use-official-signature');
      if (plus) {
        if (plus.parentElement !== preview) preview.appendChild(plus);
        plus.classList.add('pw-signature-plus-in-box');
        plus.title = 'Inserisci la firma associata all’operatore';
      }

      actions.querySelectorAll('button').forEach(button => {
        if (button === plus) return;
        const text = (button.textContent || '').trim().toLowerCase();
        if (text.includes('allega / cambia firma')) {
          button.style.display = 'none';
        } else if (text.includes('rimuovi firma')) {
          button.classList.add('pw-signature-remove-small');
          const img = preview.querySelector('img[data-signature]');
          const hasSignature = img?.dataset.hasSignature === '1' && !!img.getAttribute('src');
          button.style.display = hasSignature ? '' : 'none';
        }
      });

      const hint = actions.querySelector('.signature-placeholder');
      if (hint) hint.style.display = 'none';

      const img = preview.querySelector('img[data-signature]');
      const hasSignature = img?.dataset.hasSignature === '1' && !!img.getAttribute('src');
      preview.classList.toggle('pw-signature-empty-state', !hasSignature);
    });
  }

  document.getElementById('formType')?.addEventListener('change', () => {
    setTimeout(refreshSignatureUi, 50);
  });

  const observer = new MutationObserver(() => refreshSignatureUi());
  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'data-has-signature'] });

  setInterval(refreshSignatureUi, 400);
  setTimeout(refreshSignatureUi, 0);
})();
