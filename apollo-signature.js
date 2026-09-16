(() => {
  const APOLLO = 'APOLLO FRANCESCO';
  const SIGNATURE_URL = 'apollo-francesco-signature.svg?v=1';

  function applyApolloSignatures() {
    document.querySelectorAll('#formArea tbody tr').forEach((row, index) => {
      const hidden = row.querySelector(`input[data-field="phase_operator_${index}"]`);
      if (!hidden || String(hidden.value || '').trim() !== APOLLO) return;

      const key = `phase_sign_${index}`;
      const img = row.querySelector(`img[data-signature="${key}"]`);
      if (!img || typeof setSignatureImage !== 'function') return;

      const current = String(img.getAttribute('src') || '');
      if (!current.includes('apollo-francesco-signature.svg')) {
        setSignatureImage(key, SIGNATURE_URL);
        if (typeof autoSave === 'function') autoSave();
        if (window.PWCollaudoSync?.queueSave) window.PWCollaudoSync.queueSave(120);
      }
    });
  }

  function watchOperatorChanges() {
    document.querySelectorAll('input[data-field^="phase_operator_"]').forEach(input => {
      if (input.dataset.apolloSignatureWatch === '1') return;
      input.dataset.apolloSignatureWatch = '1';
      input.addEventListener('input', () => setTimeout(applyApolloSignatures, 0));
      input.addEventListener('change', () => setTimeout(applyApolloSignatures, 0));
    });
  }

  function refresh() {
    watchOperatorChanges();
    applyApolloSignatures();
  }

  document.getElementById('formType')?.addEventListener('change', () => setTimeout(refresh, 80));
  const observer = new MutationObserver(refresh);
  observer.observe(document.body, { childList: true, subtree: true });
  refresh();
  setInterval(refresh, 700);
})();
