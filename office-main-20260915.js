(() => {
  const ROLE_KEY='pw-collaudo-role';
  const DEPT_CODE_KEY='pw-collaudo-access-code';
  const OFFICE_LOCAL_KEY='pw-collaudo-office-code';
  const OFFICE_SESSION_KEY='pw-collaudo-office-code-session';

  if(String(localStorage.getItem(ROLE_KEY)||'')!=='office') return;

  function changeAccess(){
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(DEPT_CODE_KEY);
    localStorage.removeItem(OFFICE_LOCAL_KEY);
    sessionStorage.removeItem(OFFICE_SESSION_KEY);
    location.replace(location.pathname+'?access='+Date.now());
  }

  function enforceOfficeView(){
    document.body.classList.add('pw-role-office');

    document.querySelectorAll('.sheet,.pw-complete-archive-btn').forEach(el=>{
      el.style.setProperty('display','none','important');
    });

    const topbar=document.querySelector('.topbar');
    if(topbar){
      Array.from(topbar.children).forEach(el=>{
        const text=String(el.textContent||'').trim().toLowerCase();
        const keepArchive=el.classList?.contains('pw-archive-btn') || (el.tagName==='BUTTON' && text.includes('archivio'));
        const keepExit=el.classList?.contains('pw-office-top-switch');
        if(!keepArchive && !keepExit) el.style.setProperty('display','none','important');
      });

      let exit=topbar.querySelector('.pw-office-top-switch');
      if(!exit){
        exit=document.createElement('button');
        exit.type='button';
        exit.className='pw-office-top-switch';
        exit.textContent='Cambia accesso';
        exit.style.cssText='border:0;border-radius:8px;padding:10px 14px;font-weight:700;cursor:pointer;background:#c7a044;color:#111;';
        exit.addEventListener('click',changeAccess);
        topbar.appendChild(exit);
      }
      exit.style.setProperty('display','inline-flex','important');
      topbar.style.setProperty('justify-content','flex-end','important');
    }
  }

  enforceOfficeView();
  const observer=new MutationObserver(enforceOfficeView);
  observer.observe(document.body,{childList:true,subtree:true});
  setTimeout(()=>observer.disconnect(),12000);

  const fresh=Date.now();
  const scripts=[
    `office-prep.js?v=${fresh}`,
    `office-main-20260916.js?v=${fresh}`
  ];

  scripts.forEach(src=>{
    const script=document.createElement('script');
    script.src=src;
    script.async=false;
    document.head.appendChild(script);
  });
})();
