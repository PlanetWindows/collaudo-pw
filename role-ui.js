(() => {
  const ROLE_KEY = 'pw-collaudo-role';
  const DEPT_CODE_KEY = 'pw-collaudo-access-code';
  const OFFICE_LOCAL_KEY = 'pw-collaudo-office-code';
  const OFFICE_SESSION_KEY = 'pw-collaudo-office-code-session';
  const role = String(localStorage.getItem(ROLE_KEY) || '').trim();
  let officeOpened = false;
  let officeExportReady = role !== 'office';

  const style = document.createElement('style');
  style.textContent = `
    .pw-role-switch {
      padding: 5px 9px !important;
      font-size: 11px !important;
      opacity: .9;
    }
    body.pw-role-production .pw-archive-btn { display: none !important; }
    body.pw-role-office .sheet,
    body.pw-role-office .pw-complete-archive-btn { display: none !important; }
    body.pw-role-office .topbar > strong,
    body.pw-role-office .topbar > select,
    body.pw-role-office .topbar > button:not(.pw-archive-btn):not(.pw-role-switch) { display: none !important; }
    body.pw-role-office .topbar {
      justify-content: flex-end !important;
      min-height: 56px;
    }
    @media (max-width: 850px) {
      .pw-role-switch {
        min-height: 38px !important;
        font-size: 11px !important;
      }
    }
    @media print {
      .pw-role-switch { display: none !important; }
    }
  `;
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
    const topbar = document.querySelector('.topbar');
    if (!topbar || topbar.querySelector('.pw-role-switch')) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pw-role-switch';
    btn.textContent = 'Cambia accesso';
    btn.title = 'Esci e inserisci un altro codice';
    btn.addEventListener('click', logout);

    const status = topbar.querySelector('.status');
    if (status) topbar.insertBefore(btn, status);
    else topbar.appendChild(btn);
  }

  function loadOfficeExport() {
    if (role !== 'office' || document.querySelector('script[data-pw-office-export]')) return;
    const script = document.createElement('script');
    script.src = 'office-export.js?v=5';
    script.async = false;
    script.dataset.pwOfficeExport = '1';
    script.onload = () => {
      officeExportReady = true;
      applyRoleUi();
    };
    script.onerror = () => {
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
      const archiveButton = document.querySelector('.pw-archive-btn');
      if (archiveButton) {
        officeOpened = true;
        archiveButton.textContent = 'Archivio collaudi';
        setTimeout(() => archiveButton.click(), 60);
      }
    }
  }

  applyRoleUi();
  setTimeout(applyRoleUi, 0);

  const observer = new MutationObserver(applyRoleUi);
  observer.observe(document.body, { childList: true, subtree: true });
})();
