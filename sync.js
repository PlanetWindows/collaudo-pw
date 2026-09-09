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

  function updatePvcPhaseNames() {
    if (typeof FORMS === 'undefined') return;

    ['pvc', 'pvc_vie_fuga'].forEach(key => {
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

  updatePvcPhaseNames();
  updateVisiblePvcPhaseNames();
  setTimeout(updateVisiblePvcPhaseNames, 0);

  const formType = document.getElementById('formType');
  if (formType) {
    formType.addEventListener('change', () => setTimeout(updateVisiblePvcPhaseNames, 0));
  }

  const script = document.createElement('script');
  script.src = 'sync2.js?v=2';
  script.async = false;
  document.head.appendChild(script);
})();
