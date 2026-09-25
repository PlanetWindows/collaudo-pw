const fs = require('fs');
const path = require('path');
const vm = require('vm');
const babel = require('@babel/core');
const presetEnv = require('@babel/preset-env');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'legacy');
const SKIP_TOP = new Set(['.git', '.github', 'node_modules', 'legacy', 'scripts', 'package.json', 'package-lock.json']);

function transformJs(code, filename) {
  const result = babel.transformSync(code, {
    filename,
    sourceType: 'script',
    comments: false,
    compact: false,
    presets: [[presetEnv, {
      targets: { ie: '11' },
      bugfixes: true,
      modules: false,
      useBuiltIns: false
    }]]
  });
  let out = result && result.code ? result.code : code;

  // Nella build legacy, "Cambia accesso" deve tornare alla schermata login,
  // non ricaricare direttamente la pagina statica della scheda.
  const base = path.basename(filename).toLowerCase();
  if (base === 'role-ui.js' || base === 'access-session.js') {
    out = out.replace(/location\.reload\(\);/g, "location.href = 'index.html';");
  }
  return out;
}

function transformInlineScripts(html, filename) {
  return html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, function (whole, attrs, code) {
    if (/\bsrc\s*=/.test(attrs)) return whole;
    if (/\btype\s*=\s*["'](?:application\/ld\+json|text\/template|text\/pw-modern)["']/i.test(attrs)) return whole;
    if (!code.trim()) return whole;
    return '<script' + attrs + '>\n' + transformJs(code, filename + '#inline') + '\n</script>';
  });
}

function extractModernRuntime(indexHtml) {
  const match = indexHtml.match(/<script\s+id=["']pw-modern-code["']\s+type=["']text\/pw-modern["']\s*>([\s\S]*?)<\/script>/i);
  if (!match) throw new Error('Blocco pw-modern-code non trovato in index.html');
  let code = match[1];
  const bootMarker = '\nboot().catch(err => {';
  const bootPos = code.lastIndexOf(bootMarker);
  if (bootPos < 0) throw new Error('Avvio boot() non trovato nel runtime principale');
  return code.slice(0, bootPos);
}

async function renderRolePage(role, runtimeCode, appCoreSource) {
  let written = '';
  const store = {};
  const session = {};

  function storageApi(target) {
    return {
      getItem: function (key) { return Object.prototype.hasOwnProperty.call(target, key) ? target[key] : null; },
      setItem: function (key, value) { target[key] = String(value); },
      removeItem: function (key) { delete target[key]; }
    };
  }

  const documentStub = {
    open: function () { written = ''; },
    write: function (value) { written += String(value); },
    close: function () {}
  };

  const context = {
    console: console,
    Promise: Promise,
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    localStorage: storageApi(store),
    sessionStorage: storageApi(session),
    document: documentStub,
    fetch: function (url) {
      if (url === 'app-core.html') {
        return Promise.resolve({
          ok: true,
          status: 200,
          text: function () { return Promise.resolve(appCoreSource); }
        });
      }
      return Promise.reject(new Error('Fetch inatteso durante build legacy: ' + url));
    }
  };
  context.window = context;

  vm.createContext(context);
  vm.runInContext(runtimeCode, context, { filename: 'pw-index-runtime.js' });
  const result = vm.runInContext("loadApp('" + role + "')", context);
  await Promise.resolve(result);

  if (!written || written.indexOf('<!doctype html>') < 0) {
    throw new Error('La generazione della pagina ' + role + ' non ha prodotto HTML valido');
  }

  const expectedRole = role === 'office' ? 'office' : 'production';
  const guard = `
<script src="polyfills.js?v=2"></script>
<script>
(function () {
  var expectedRole = '${expectedRole}';
  var role = String(localStorage.getItem('pw-collaudo-role') || '').replace(/^\\s+|\\s+$/g, '');
  var code = '';
  if (expectedRole === 'production') {
    code = String(localStorage.getItem('pw-collaudo-access-code') || '').replace(/^\\s+|\\s+$/g, '');
  } else {
    code = String(localStorage.getItem('pw-collaudo-office-code') || '').replace(/^\\s+|\\s+$/g, '');
    if (code) sessionStorage.setItem('pw-collaudo-office-code-session', code);
  }
  if (role !== expectedRole || !code) {
    window.location.replace('index.html');
  }
})();
</script>
`;

  written = written.replace('</head>', guard + '\n</head>');
  return transformInlineScripts(written, 'app-' + role + '.html');
}

function buildLegacyIndex() {
  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>PW Collaudo - Planet Windows</title>
<link rel="icon" type="image/x-icon" href="favicon.ico?v=2">
<style>
html,body{margin:0;min-height:100%;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;color:#111}
.loading{padding:24px;color:#555}
.access-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;box-sizing:border-box}
.access-card{width:430px;max-width:100%;background:#fff;border-radius:16px;box-shadow:0 18px 55px rgba(0,0,0,.14);padding:28px;box-sizing:border-box}
.access-brand{font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8b6c1e;margin-bottom:8px}
.access-card h1{font-size:26px;margin:0 0 8px}
.access-card p{margin:0 0 20px;color:#666;line-height:1.45;font-size:14px}
.access-card label{display:block;font-size:12px;font-weight:700;margin-bottom:6px}
.access-row input{width:100%;box-sizing:border-box;border:1px solid #bbb;border-radius:9px;padding:12px 13px;font-size:15px;text-transform:uppercase}
.access-row button{width:100%;box-sizing:border-box;margin-top:8px;border:1px solid #c7a044;background:#c7a044;color:#111;border-radius:9px;padding:11px 18px;font-weight:700;cursor:pointer}
.access-error{min-height:20px;margin-top:10px;color:#a31818;font-size:12px}
.access-note{margin-top:18px!important;font-size:12px!important;color:#888!important}
</style>
<script src="polyfills.js?v=2"></script>
</head>
<body>
<div id="boot" class="loading">Caricamento PW Collaudo…</div>
<script>
(function () {
  var ACCESS_API = 'https://vbpinzygwexuvwomnmbt.supabase.co/functions/v1/collaudo-sync';
  var ROLE_KEY = 'pw-collaudo-role';
  var DEPT_CODE_KEY = 'pw-collaudo-access-code';
  var OFFICE_LOCAL_KEY = 'pw-collaudo-office-code';
  var OFFICE_SESSION_KEY = 'pw-collaudo-office-code-session';

  function trim(value) {
    return String(value || '').replace(/^\\s+|\\s+$/g, '');
  }

  function clearAccess() {
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(DEPT_CODE_KEY);
    localStorage.removeItem(OFFICE_LOCAL_KEY);
    sessionStorage.removeItem(OFFICE_SESSION_KEY);
  }

  function storedCodeForRole(role) {
    if (role === 'production') return trim(localStorage.getItem(DEPT_CODE_KEY));
    if (role === 'office') return trim(localStorage.getItem(OFFICE_LOCAL_KEY));
    return '';
  }

  function saveAccess(role, code) {
    clearAccess();
    localStorage.setItem(ROLE_KEY, role);
    if (role === 'production') {
      localStorage.setItem(DEPT_CODE_KEY, code);
    } else if (role === 'office') {
      localStorage.setItem(OFFICE_LOCAL_KEY, code);
      sessionStorage.setItem(OFFICE_SESSION_KEY, code);
    }
  }

  function openRole(role) {
    if (role === 'office') {
      var officeCode = trim(localStorage.getItem(OFFICE_LOCAL_KEY));
      if (officeCode) sessionStorage.setItem(OFFICE_SESSION_KEY, officeCode);
      window.location.replace('app-office.html');
    } else {
      window.location.replace('app-production.html');
    }
  }

  function validateAccess(code) {
    return fetch(ACCESS_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'access_check', access_code: code })
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        return { res: res, data: data };
      });
    }).then(function (result) {
      if (result.res.status === 401) return { ok: false, invalid: true };
      if (!result.res.ok) throw new Error(result.data.error || ('access_' + result.res.status));
      return { ok: true, role: result.data.role || '' };
    });
  }

  function showAccess() {
    var root = document.getElementById('boot');
    root.className = '';
    root.innerHTML =
      '<div class="access-wrap">' +
        '<div class="access-card">' +
          '<div class="access-brand">Planet Windows</div>' +
          '<h1>PW Collaudo</h1>' +
          '<p>Inserisci il codice di accesso. Il sistema aprirà automaticamente l\\'area Produzione oppure l\\'area Ufficio.</p>' +
          '<label for="pwAccessCode">Codice di accesso</label>' +
          '<div class="access-row">' +
            '<input id="pwAccessCode" type="text" autocomplete="off" spellcheck="false" placeholder="Inserisci codice">' +
            '<button id="pwAccessBtn" type="button">Accedi</button>' +
          '</div>' +
          '<div id="pwAccessError" class="access-error"></div>' +
          '<p class="access-note">Modalità compatibile Windows 7 / Internet Explorer 11.</p>' +
        '</div>' +
      '</div>';

    var input = document.getElementById('pwAccessCode');
    var button = document.getElementById('pwAccessBtn');
    var error = document.getElementById('pwAccessError');

    function submit() {
      var code = trim(input.value).toUpperCase();
      if (!code) {
        error.innerHTML = 'Inserisci il codice di accesso.';
        input.focus();
        return;
      }

      button.disabled = true;
      button.innerHTML = 'Verifica…';
      error.innerHTML = '';

      validateAccess(code).then(function (result) {
        if (!result.ok || (result.role !== 'production' && result.role !== 'office')) {
          error.innerHTML = 'Codice non valido.';
          input.select();
          return;
        }
        saveAccess(result.role, code);
        openRole(result.role);
      }).catch(function () {
        error.innerHTML = 'Connessione non disponibile. Riprova.';
      }).then(function () {
        button.disabled = false;
        button.innerHTML = 'Accedi';
      });
    }

    button.onclick = submit;
    input.onkeydown = function (e) {
      e = e || window.event;
      if ((e.keyCode || e.which) === 13) submit();
    };
    input.focus();
  }

  function boot() {
    var role = trim(localStorage.getItem(ROLE_KEY));
    var code = storedCodeForRole(role);

    if ((role === 'production' || role === 'office') && code) {
      validateAccess(code).then(function (result) {
        if (result.ok && result.role === role) {
          openRole(role);
        } else {
          clearAccess();
          showAccess();
        }
      }).catch(function () {
        // Come la versione principale: se il codice è già salvato, consente
        // l'apertura locale anche quando la verifica rete non è momentaneamente disponibile.
        openRole(role);
      });
      return;
    }
    showAccess();
  }

  boot();
})();
</script>
</body>
</html>
`;
}

function copyTree(srcDir, dstDir, topLevel) {
  fs.mkdirSync(dstDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    if (topLevel && SKIP_TOP.has(entry.name)) continue;
    if (topLevel && (entry.name === 'index.html' || entry.name === 'app-core.html')) continue;

    const src = path.join(srcDir, entry.name);
    const dst = path.join(dstDir, entry.name);

    if (entry.isDirectory()) {
      copyTree(src, dst, false);
      continue;
    }

    if (/\.js$/i.test(entry.name)) {
      const code = fs.readFileSync(src, 'utf8');
      fs.writeFileSync(dst, transformJs(code, entry.name), 'utf8');
    } else {
      fs.copyFileSync(src, dst);
    }
  }
}

function writePolyfills() {
  const coreJs = fs.readFileSync(require.resolve('core-js-bundle/minified.js'), 'utf8');
  const fetchPolyfill = fs.readFileSync(require.resolve('whatwg-fetch/dist/fetch.umd.js'), 'utf8');
  const domPolyfills = `
(function () {
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }
  if (window.HTMLCollection && !HTMLCollection.prototype.forEach) {
    HTMLCollection.prototype.forEach = Array.prototype.forEach;
  }
  if (window.Element) {
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    if (!Element.prototype.closest) {
      Element.prototype.closest = function (selector) {
        var el = this;
        while (el && el.nodeType === 1) {
          if (el.matches(selector)) return el;
          el = el.parentElement || el.parentNode;
        }
        return null;
      };
    }
    if (!Element.prototype.remove) {
      Element.prototype.remove = function () {
        if (this.parentNode) this.parentNode.removeChild(this);
      };
    }
  }
  if (typeof window.CustomEvent !== 'function') {
    window.CustomEvent = function (event, params) {
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };
    window.CustomEvent.prototype = window.Event ? window.Event.prototype : {};
  }
  try {
    new window.Event('test');
  } catch (e) {
    window.Event = function (event, params) {
      params = params || { bubbles: false, cancelable: false };
      var evt = document.createEvent('Event');
      evt.initEvent(event, params.bubbles, params.cancelable);
      return evt;
    };
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (cb) { return setTimeout(cb, 16); };
    window.cancelAnimationFrame = function (id) { clearTimeout(id); };
  }
})();
`;
  fs.writeFileSync(path.join(OUT, 'polyfills.js'), coreJs + '\n' + fetchPolyfill + '\n' + domPolyfills, 'utf8');
}

function scanCode(code, label, problems) {
  const forbidden = [
    { name: 'arrow function', re: /=>/ },
    { name: 'optional chaining', re: /\?\./ },
    { name: 'nullish coalescing', re: /\?\?/ },
    { name: 'const', re: /\bconst\b/ },
    { name: 'let', re: /\blet\b/ },
    { name: 'async function', re: /\basync\s+function\b/ }
  ];
  for (const check of forbidden) {
    if (check.re.test(code)) problems.push(label + ': ' + check.name);
  }
}

function scanLegacy() {
  const problems = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(p);
      } else if (/\.js$/i.test(entry.name) && entry.name !== 'polyfills.js') {
        scanCode(fs.readFileSync(p, 'utf8'), path.relative(OUT, p), problems);
      } else if (/\.html?$/i.test(entry.name)) {
        const html = fs.readFileSync(p, 'utf8');
        const re = /<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
        let m;
        while ((m = re.exec(html))) {
          scanCode(m[1], path.relative(OUT, p) + '#inline', problems);
        }
      }
    }
  }
  walk(OUT);
  if (problems.length) throw new Error('Sintassi non IE11 rimasta:\n' + problems.join('\n'));
}

async function main() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const appCore = fs.readFileSync(path.join(ROOT, 'app-core.html'), 'utf8');
  const runtimeCode = extractModernRuntime(indexHtml);

  copyTree(ROOT, OUT, true);
  writePolyfills();

  fs.writeFileSync(path.join(OUT, 'index.html'), buildLegacyIndex(), 'utf8');

  const productionHtml = await renderRolePage('production', runtimeCode, appCore);
  const officeHtml = await renderRolePage('office', runtimeCode, appCore);
  fs.writeFileSync(path.join(OUT, 'app-production.html'), productionHtml, 'utf8');
  fs.writeFileSync(path.join(OUT, 'app-office.html'), officeHtml, 'utf8');

  scanLegacy();
  console.log('Build IE11 completata: index + pagine Produzione/Ufficio generate dal runtime attuale.');
}

main().catch(function (err) {
  console.error(err);
  process.exit(1);
});
