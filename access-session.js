(() => {
  const DEPT_CODE_KEY = 'pw-collaudo-access-code';
  const OFFICE_LOCAL_KEY = 'pw-collaudo-office-code';
  const OFFICE_SESSION_KEY = 'pw-collaudo-office-code-session';

  function restoreOfficeCode() {
    const saved = String(localStorage.getItem(OFFICE_LOCAL_KEY) || '').trim();
    const session = String(sessionStorage.getItem(OFFICE_SESSION_KEY) || '').trim();
    if (saved && !session) sessionStorage.setItem(OFFICE_SESSION_KEY, saved);
  }

  function persistOfficeCode() {
    const session = String(sessionStorage.getItem(OFFICE_SESSION_KEY) || '').trim();
    if (session && localStorage.getItem(OFFICE_LOCAL_KEY) !== session) {
      localStorage.setItem(OFFICE_LOCAL_KEY, session);
    }
  }

  function logout() {
    const hasDept = !!String(localStorage.getItem(DEPT_CODE_KEY) || '').trim();
    const hasOffice = !!String(localStorage.getItem(OFFICE_LOCAL_KEY) || sessionStorage.getItem(OFFICE_SESSION_KEY) || '').trim();
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
    const topbar = document.querySelector('.topbar');
    if (!topbar || topbar.querySelector('.pw-logout-btn')) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pw-logout-btn';
    btn.textContent = 'Esci';
    btn.title = 'Rimuovi il codice salvato da questo dispositivo';
    btn.addEventListener('click', logout);

    const status = topbar.querySelector('.status');
    if (status) topbar.insertBefore(btn, status);
    else topbar.appendChild(btn);
  }

  const style = document.createElement('style');
  style.textContent = `
    .pw-logout-btn {
      padding: 5px 9px !important;
      font-size: 11px !important;
      opacity: .86;
    }
    @media (max-width: 850px) {
      .pw-logout-btn {
        min-height: 38px !important;
        font-size: 11px !important;
      }
    }
    @media print {
      .pw-logout-btn { display: none !important; }
    }
  `;
  document.head.appendChild(style);

  restoreOfficeCode();
  persistOfficeCode();
  installLogoutButton();

  const observer = new MutationObserver(() => {
    restoreOfficeCode();
    persistOfficeCode();
    installLogoutButton();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  setInterval(() => {
    restoreOfficeCode();
    persistOfficeCode();
  }, 600);
})();
