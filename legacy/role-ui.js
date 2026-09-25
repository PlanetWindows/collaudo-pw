(function () {
  var ROLE_KEY = 'pw-collaudo-role';
  var DEPT_CODE_KEY = 'pw-collaudo-access-code';
  var OFFICE_LOCAL_KEY = 'pw-collaudo-office-code';
  var OFFICE_SESSION_KEY = 'pw-collaudo-office-code-session';
  var role = String(localStorage.getItem(ROLE_KEY) || '').trim();
  var officeOpened = false;
  var officeExportReady = role !== 'office';
  var style = document.createElement('style');
  style.textContent = "\n    .pw-role-switch {\n      padding: 5px 9px !important;\n      font-size: 11px !important;\n      opacity: .9;\n    }\n    body.pw-role-production .pw-archive-btn { display: none !important; }\n    body.pw-role-office .sheet,\n    body.pw-role-office .pw-complete-archive-btn { display: none !important; }\n    body.pw-role-office .topbar > strong,\n    body.pw-role-office .topbar > select,\n    body.pw-role-office .topbar > button:not(.pw-archive-btn):not(.pw-role-switch) { display: none !important; }\n    body.pw-role-office .topbar {\n      justify-content: flex-end !important;\n      min-height: 56px;\n    }\n    @media (max-width: 850px) {\n      .pw-role-switch {\n        min-height: 38px !important;\n        font-size: 11px !important;\n      }\n    }\n    @media print {\n      .pw-role-switch { display: none !important; }\n    }\n  ";
  document.head.appendChild(style);
  function logout() {
    if (!confirm('Vuoi cambiare accesso? Al prossimo avvio dovrai inserire nuovamente il codice Produzione o Ufficio.')) return;
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(DEPT_CODE_KEY);
    localStorage.removeItem(OFFICE_LOCAL_KEY);
    sessionStorage.removeItem(OFFICE_SESSION_KEY);
    location.reload();
  }
  function installSwitchButton() {
    var topbar = document.querySelector('.topbar');
    if (!topbar || topbar.querySelector('.pw-role-switch')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pw-role-switch';
    btn.textContent = 'Cambia accesso';
    btn.title = 'Esci e inserisci un altro codice';
    btn.addEventListener('click', logout);
    var status = topbar.querySelector('.status');
    if (status) topbar.insertBefore(btn, status);else topbar.appendChild(btn);
  }
  function loadOfficeExport() {
    if (role !== 'office' || document.querySelector('script[data-pw-office-export]')) return;
    var script = document.createElement('script');
    script.src = 'office-export.js?v=5';
    script.async = false;
    script.dataset.pwOfficeExport = '1';
    script.onload = function () {
      officeExportReady = true;
      applyRoleUi();
    };
    script.onerror = function () {
      officeExportReady = true;
      applyRoleUi();
    };
    document.head.appendChild(script);
  }
  function applyRoleUi() {
    if (role === 'production') {
      document.body.classList.add('pw-role-production');
      document.body.classList.remove('pw-role-office');
    } else if (role === 'office') {
      document.body.classList.add('pw-role-office');
      document.body.classList.remove('pw-role-production');
      loadOfficeExport();
    }
    installSwitchButton();
    if (role === 'office' && officeExportReady && !officeOpened) {
      var archiveButton = document.querySelector('.pw-archive-btn');
      if (archiveButton) {
        officeOpened = true;
        archiveButton.textContent = 'Archivio collaudi';
        setTimeout(function () {
          return archiveButton.click();
        }, 60);
      }
    }
  }
  applyRoleUi();
  setTimeout(applyRoleUi, 0);
  var observer = new MutationObserver(applyRoleUi);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();