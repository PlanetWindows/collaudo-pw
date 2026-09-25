(function () {
  var DEPT_CODE_KEY = 'pw-collaudo-access-code';
  var OFFICE_LOCAL_KEY = 'pw-collaudo-office-code';
  var OFFICE_SESSION_KEY = 'pw-collaudo-office-code-session';
  function restoreOfficeCode() {
    var saved = String(localStorage.getItem(OFFICE_LOCAL_KEY) || '').trim();
    var session = String(sessionStorage.getItem(OFFICE_SESSION_KEY) || '').trim();
    if (saved && !session) sessionStorage.setItem(OFFICE_SESSION_KEY, saved);
  }
  function persistOfficeCode() {
    var session = String(sessionStorage.getItem(OFFICE_SESSION_KEY) || '').trim();
    if (session && localStorage.getItem(OFFICE_LOCAL_KEY) !== session) {
      localStorage.setItem(OFFICE_LOCAL_KEY, session);
    }
  }
  function logout() {
    var hasDept = !!String(localStorage.getItem(DEPT_CODE_KEY) || '').trim();
    var hasOffice = !!String(localStorage.getItem(OFFICE_LOCAL_KEY) || sessionStorage.getItem(OFFICE_SESSION_KEY) || '').trim();
    if (!hasDept && !hasOffice) {
      alert('Nessun accesso memorizzato su questo dispositivo.');
      return;
    }
    if (!confirm('Vuoi uscire? Il codice salvato su questo dispositivo verrà rimosso e sarà richiesto di nuovo al prossimo accesso.')) return;
    localStorage.removeItem(DEPT_CODE_KEY);
    localStorage.removeItem(OFFICE_LOCAL_KEY);
    sessionStorage.removeItem(OFFICE_SESSION_KEY);
    location.reload();
  }
  function installLogoutButton() {
    var topbar = document.querySelector('.topbar');
    if (!topbar || topbar.querySelector('.pw-logout-btn')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pw-logout-btn';
    btn.textContent = 'Esci';
    btn.title = 'Rimuovi il codice salvato da questo dispositivo';
    btn.addEventListener('click', logout);
    var status = topbar.querySelector('.status');
    if (status) topbar.insertBefore(btn, status);else topbar.appendChild(btn);
  }
  var style = document.createElement('style');
  style.textContent = "\n    .pw-logout-btn {\n      padding: 5px 9px !important;\n      font-size: 11px !important;\n      opacity: .86;\n    }\n    @media (max-width: 850px) {\n      .pw-logout-btn {\n        min-height: 38px !important;\n        font-size: 11px !important;\n      }\n    }\n    @media print {\n      .pw-logout-btn { display: none !important; }\n    }\n  ";
  document.head.appendChild(style);
  restoreOfficeCode();
  persistOfficeCode();
  installLogoutButton();
  var observer = new MutationObserver(function () {
    restoreOfficeCode();
    persistOfficeCode();
    installLogoutButton();
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  setInterval(function () {
    restoreOfficeCode();
    persistOfficeCode();
  }, 600);
})();