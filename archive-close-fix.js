(() => {
  const style = document.createElement('style');
  style.textContent = `
    .pw-archive-overlay[hidden] {
      display: none !important;
    }
  `;
  document.head.appendChild(style);

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const overlay = document.querySelector('.pw-archive-overlay:not([hidden])');
    if (overlay) overlay.hidden = true;
  });
})();
