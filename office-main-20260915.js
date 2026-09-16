(() => {
  const scripts = [
    'office-main-20260916.js?v=3',
    'office-prep.js?v=1',
    'office-export-ddt.js?v=1'
  ];

  scripts.forEach(src => {
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.head.appendChild(script);
  });
})();
