(() => {
  const fresh = Date.now();
  const scripts = [
    `office-prep.js?v=${fresh}`,
    `office-main-20260916.js?v=${fresh}`,
    `office-export-ddt.js?v=${fresh}`
  ];

  scripts.forEach(src => {
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.head.appendChild(script);
  });
})();
