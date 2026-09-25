(function () {
  var ROLE_KEY = 'pw-collaudo-role';
  var DEPT_CODE_KEY = 'pw-collaudo-access-code';
  var OFFICE_LOCAL_KEY = 'pw-collaudo-office-code';
  var OFFICE_SESSION_KEY = 'pw-collaudo-office-code-session';
  if (String(localStorage.getItem(ROLE_KEY) || '') !== 'office') return;
  function changeAccess() {
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(DEPT_CODE_KEY);
    localStorage.removeItem(OFFICE_LOCAL_KEY);
    sessionStorage.removeItem(OFFICE_SESSION_KEY);
    location.replace(location.pathname + '?access=' + Date.now());
  }
  function enforceOfficeView() {
    document.body.classList.add('pw-role-office');
    document.querySelectorAll('.sheet,.pw-complete-archive-btn').forEach(function (el) {
      el.style.setProperty('display', 'none', 'important');
    });
    var topbar = document.querySelector('.topbar');
    if (topbar) {
      Array.from(topbar.children).forEach(function (el) {
        var _el$classList, _el$classList2;
        var text = String(el.textContent || '').trim().toLowerCase();
        var keepArchive = ((_el$classList = el.classList) === null || _el$classList === void 0 ? void 0 : _el$classList.contains('pw-archive-btn')) || el.tagName === 'BUTTON' && text.includes('archivio');
        var keepExit = (_el$classList2 = el.classList) === null || _el$classList2 === void 0 ? void 0 : _el$classList2.contains('pw-office-top-switch');
        if (!keepArchive && !keepExit) el.style.setProperty('display', 'none', 'important');
      });
      var exit = topbar.querySelector('.pw-office-top-switch');
      if (!exit) {
        exit = document.createElement('button');
        exit.type = 'button';
        exit.className = 'pw-office-top-switch';
        exit.textContent = 'Cambia accesso';
        exit.style.cssText = 'border:0;border-radius:8px;padding:10px 14px;font-weight:700;cursor:pointer;background:#c7a044;color:#111;';
        exit.addEventListener('click', changeAccess);
        topbar.appendChild(exit);
      }
      exit.style.setProperty('display', 'inline-flex', 'important');
      topbar.style.setProperty('justify-content', 'flex-end', 'important');
    }
  }
  enforceOfficeView();
  var observer = new MutationObserver(enforceOfficeView);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  setTimeout(function () {
    return observer.disconnect();
  }, 12000);
  var fresh = Date.now();
  var scripts = ["office-prep.js?v=".concat(fresh), "office-main-20260916.js?v=".concat(fresh)];
  scripts.forEach(function (src) {
    var script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.head.appendChild(script);
  });
})();