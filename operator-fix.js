(() => {
  const mobileStyle = document.createElement('link');
  mobileStyle.rel = 'stylesheet';
  mobileStyle.href = 'mobile.css?v=2';
  document.head.appendChild(mobileStyle);

  const archiveScript = document.createElement('script');
  archiveScript.src = 'archive.js?v=1';
  archiveScript.async = false;
  document.head.appendChild(archiveScript);

  const archiveCloseFixScript = document.createElement('script');
  archiveCloseFixScript.src = 'archive-close-fix.js?v=1';
  archiveCloseFixScript.async = false;
  document.head.appendChild(archiveCloseFixScript);

  const accessScript = document.createElement('script');
  accessScript.src = 'access-session.js?v=1';
  accessScript.async = false;
  document.head.appendChild(accessScript);

  const zipScript = document.createElement('script');
  zipScript.src = 'zip-export.js?v=5';
  zipScript.async = false;
  document.head.appendChild(zipScript);

  const aluExtensionScript = document.createElement('script');
  aluExtensionScript.src = 'alu-extension.js?v=2';
  aluExtensionScript.async = false;
  document.head.appendChild(aluExtensionScript);

  const positionScript = document.createElement('script');
  positionScript.src = 'fire-escape-position.js?v=2';
  positionScript.async = false;
  document.head.appendChild(positionScript);

  const apolloSignatureScript = document.createElement('script');
  apolloSignatureScript.src = 'apollo-signature.js?v=2';
  apolloSignatureScript.async = false;
  document.head.appendChild(apolloSignatureScript);

  const officePrepProductionScript = document.createElement('script');
  officePrepProductionScript.src = 'production-office-prep.js?v=5';
  officePrepProductionScript.async = false;
  document.head.appendChild(officePrepProductionScript);

})();
