const fs = require('fs');
const path = require('path');
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
  return result && result.code ? result.code : code;
}

function transformInlineScripts(html, filename) {
  return html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, function (whole, attrs, code) {
    if (/\bsrc\s*=/.test(attrs)) return whole;
    if (/\btype\s*=\s*["'](?:application\/ld\+json|text\/template|text\/pw-modern)["']/i.test(attrs)) return whole;
    if (!code.trim()) return whole;
    return '<script' + attrs + '>\n' + transformJs(code, filename + '#inline') + '\n</script>';
  });
}

function buildLegacyIndex(html) {
  const modernRe = /<script\s+id=["']pw-modern-code["']\s+type=["']text\/pw-modern["']\s*>([\s\S]*?)<\/script>/i;
  const match = html.match(modernRe);
  if (!match) throw new Error('Blocco pw-modern-code non trovato in index.html');

  const legacyCode = transformJs(match[1], 'index.html#pw-modern-code');
  let out = html.replace(modernRe, '<script>\n' + legacyCode + '\n</script>');
  out = out.replace(/\s*<script\s+id=["']pw-compat-loader["'][^>]*>[\s\S]*?<\/script>\s*/i, '\n');
  out = out.replace('</head>', '<script src="polyfills.js?v=1"></script>\n</head>');
  return out;
}

function shouldTransformHtml(name) {
  return /\.html?$/i.test(name);
}

function copyTree(srcDir, dstDir, topLevel) {
  fs.mkdirSync(dstDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    if (topLevel && SKIP_TOP.has(entry.name)) continue;
    const src = path.join(srcDir, entry.name);
    const dst = path.join(dstDir, entry.name);

    if (entry.isDirectory()) {
      copyTree(src, dst, false);
      continue;
    }

    if (/\.js$/i.test(entry.name)) {
      const code = fs.readFileSync(src, 'utf8');
      fs.writeFileSync(dst, transformJs(code, entry.name), 'utf8');
    } else if (shouldTransformHtml(entry.name)) {
      const html = fs.readFileSync(src, 'utf8');
      const out = entry.name.toLowerCase() === 'index.html'
        ? buildLegacyIndex(html)
        : transformInlineScripts(html, entry.name);
      fs.writeFileSync(dst, out, 'utf8');
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

function scanLegacyJs() {
  const forbidden = [
    { name: 'arrow function', re: /=>/ },
    { name: 'optional chaining', re: /\?\./ },
    { name: 'nullish coalescing', re: /\?\?/ },
    { name: 'const', re: /\bconst\b/ },
    { name: 'let', re: /\blet\b/ },
    { name: 'async function', re: /\basync\s+function\b/ }
  ];
  const problems = [];

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(p);
      } else if (/\.js$/i.test(entry.name) && entry.name !== 'polyfills.js') {
        const code = fs.readFileSync(p, 'utf8');
        for (const check of forbidden) {
          if (check.re.test(code)) problems.push(path.relative(OUT, p) + ': ' + check.name);
        }
      }
    }
  }
  walk(OUT);
  if (problems.length) throw new Error('Sintassi non IE11 rimasta:\n' + problems.join('\n'));
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
copyTree(ROOT, OUT, true);
writePolyfills();
scanLegacyJs();

console.log('Build IE11 completata in legacy/');
