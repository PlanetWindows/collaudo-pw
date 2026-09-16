(() => {
  const APOLLO = 'APOLLO FRANCESCO';
  const SIGNATURE_URL = 'apollo-francesco-signature.svg?v=1';
  let signaturePromise = null;

  function signatureDataUrl() {
    if (signaturePromise) return signaturePromise;
    signaturePromise = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = 900;
          canvas.height = 360;
          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const scale = Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
          const w = img.naturalWidth * scale;
          const h = img.naturalHeight * scale;
          ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
          resolve(canvas.toDataURL('image/png'));
        } catch (err) { reject(err); }
      };
      img.onerror = reject;
      img.src = SIGNATURE_URL;
    });
    return signaturePromise;
  }

  async function applyApolloSignatures() {
    const targets = [];
    document.querySelectorAll('#formArea tbody tr').forEach((row, index) => {
      const hidden = row.querySelector(`input[data-field="phase_operator_${index}"]`);
      if (!hidden || String(hidden.value || '').trim() !== APOLLO) return;
      const key = `phase_sign_${index}`;
      const img = row.querySelector(`img[data-signature="${key}"]`);
      if (!img || typeof setSignatureImage !== 'function') return;
      if (String(img.getAttribute('src') || '').startsWith('data:image/png;base64,')) return;
      targets.push({ key });
    });
    if (!targets.length) return;

    try {
      const dataUrl = await signatureDataUrl();
      targets.forEach(({key}) => setSignatureImage(key, dataUrl));
      if (typeof autoSave === 'function') autoSave();
      if (window.PWCollaudoSync?.queueSave) window.PWCollaudoSync.queueSave(120);
    } catch (err) {
      console.error('Firma Apollo Francesco', err);
    }
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
