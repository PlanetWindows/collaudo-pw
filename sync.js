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
  `;
  document.head.appendChild(fontStyle);

  const script = document.createElement('script');
  script.src = 'sync2.js?v=2';
  script.async = false;
  document.head.appendChild(script);
})();
