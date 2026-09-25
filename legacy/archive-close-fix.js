(function () {
  var style = document.createElement('style');
  style.textContent = "\n    .pw-archive-overlay[hidden] {\n      display: none !important;\n    }\n  ";
  document.head.appendChild(style);
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    var overlay = document.querySelector('.pw-archive-overlay:not([hidden])');
    if (overlay) overlay.hidden = true;
  });
})();