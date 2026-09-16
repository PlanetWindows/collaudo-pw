(() => {
  const scripts = [
    'office-prep.js?v=6',
    'office-main-20260916.js?v=4',
    'office-export-ddt.js?v=3'
  ];

  scripts.forEach(src => {
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.head.appendChild(script);
  });
})();
