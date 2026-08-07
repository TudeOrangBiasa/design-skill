#!/usr/bin/env node
// site/build.mjs — zero-dep static site builder for the design-skill wiki.
// Reads docs/, reference/, CONTRIBUTION.md, CHANGELOG.md from the repo root,
// renders them into site/dist/ with a shared shell, sidebar, prev/next, and a
// client-side search index. No npm dependencies. Node >= 18.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join, relative, basename, extname } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;      // repo root
const SRC = join(ROOT, 'site/src');
const DIST = join(ROOT, 'site/dist');

// ---------------------------------------------------------------------------
// Content registry
// ---------------------------------------------------------------------------
const DOC_PAGES = ['README.md', 'install.md', 'architecture.md', 'commands.md', 'detector.md', 'live-mode.md', 'design-md.md', 'checklists.md'];

const DOCTRINE_GROUPS = [
  ['Foundation', ['brand', 'modes', 'product', 'doctrine', 'craft-floor', 'new-work', 'resources', 'native-platforms']],
  ['Capabilities', ['colorize', 'typeset', 'layout', 'animate', 'interaction', 'responsive', 'access', 'voice', 'hero', 'landing-pages']],
  ['Planning', ['shape', 'craft', 'init', 'setup', 'document', 'extract', 'redesign', 'visualize', 'doctor']],
  ['Procedures', ['audit', 'checkup', 'smell', 'polish', 'review', 'critique', 'refine', 'bolder', 'quieter', 'distill', 'harden', 'deslop', 'overdrive', 'delight', 'clarify', 'optimize', 'adapt', 'onboard']],
  ['Surfaces', ['dashboards', 'performance', 'ui-checklist', 'checklist-catalog', 'browser-layout']],
  ['Live & tooling', ['live', 'prompt-patterns']],
];
const DOCTRINE_FILES = DOCTRINE_GROUPS.flatMap(([, files]) => files.map((f) => `${f}.md`));

// repo-relative path -> site URL (site root)
const SLUG_MAP = {};
DOC_PAGES.forEach((f, i) => { SLUG_MAP[`docs/${f}`] = i === 0 ? 'wiki.html' : f.replace('.md', '.html'); });
DOCTRINE_FILES.forEach((f) => { SLUG_MAP[`reference/${f}`] = `doctrine/${f.replace('.md', '.html')}`; });
SLUG_MAP['CONTRIBUTION.md'] = 'contribution.html';
SLUG_MAP['CHANGELOG.md'] = 'changelog.html';
SLUG_MAP['NOTICE.md'] = 'notice.html';
SLUG_MAP['reference/'] = 'doctrine/index.html';

// Ordered site pages: wiki, extra, doctrine grouped. Each: { url, group, file, title }
function collectPages() {
  const pages = [];
  DOC_PAGES.forEach((f, i) => pages.push({ url: SLUG_MAP[`docs/${f}`], group: 'Wiki', file: join('docs', f), order: i }));
  pages.push({ url: 'contribution.html', group: 'Wiki', file: 'CONTRIBUTION.md', order: 8 });
  pages.push({ url: 'changelog.html', group: 'Wiki', file: 'CHANGELOG.md', order: 9 });
  pages.push({ url: 'notice.html', group: 'Wiki', file: 'NOTICE.md', order: 10 });
  for (const [group, files] of DOCTRINE_GROUPS) {
    files.forEach((f) => pages.push({ url: `doctrine/${f}.html`, group, file: join('reference', `${f}.md`) }));
  }
  return pages;
}
const PAGES = collectPages();

// ---------------------------------------------------------------------------
// Token substitution (corpus is agent-facing; render for humans)
// ---------------------------------------------------------------------------
const TOKENS = {
  '{{command_prefix}}': '/design',
  '{{ask_instruction}}': 'Ask the user, one or two questions at a time, and wait for answers.',
  '{{available_commands}}': 'the design commands',
  '{{scripts_path}}': 'scripts',
  '{{config_file}}': 'PRODUCT.md',
};

// ---------------------------------------------------------------------------
// Markdown renderer (block-level)
// ---------------------------------------------------------------------------
function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'section';
}

function resolveUrl(target, fromRepoRel) {
  if (/^(https?:|mailto:|#|\/)/.test(target) || !/\.md$|reference\/$/.test(target)) return null;
  const base = fromRepoRel.startsWith('docs/') || fromRepoRel.startsWith('reference/') ? dirname(fromRepoRel) : '.';
  const resolved = target.startsWith('/') ? target.slice(1) : join(base, target).replace(/\\/g, '/');
  const hit = SLUG_MAP[resolved];
  return hit || null;
}

function inline(text, fromRepoRel, hereUrl) {
  let out = esc(text);
  out = out.replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`);
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, target) => {
    const hash = target.includes('#') ? `#${target.split('#')[1]}` : '';
    const path = target.split('#')[0];
    const url = resolveUrl(path, fromRepoRel);
    if (url) {
      let label2 = label;
      if (/^[\w-]+\.md$/.test(label)) {
        const hit = PAGES.find((p) => p.url === url);
        if (hit) label2 = hit.title;
      }
      return `<a href="${relTo(url, hereUrl)}${hash}">${label2}</a>`;
    }
    if (/^https?:/.test(target)) return `<a href="${target}" rel="noopener">${label}</a>`;
    return `<a href="${target}">${label}</a>`;
  });
  return out;
}

function renderMarkdown(raw, fromRepoRel, hereUrl) {
  let md = raw;
  for (const [k, v] of Object.entries(TOKENS)) md = md.split(k).join(v);
  const lines = md.split(/\r?\n/);
  const html = [];
  let i = 0;
  let inFence = false;

  while (i < lines.length) {
    const line = lines[i];

    if (inFence) {
      if (/^```/.test(line)) { inFence = false; html.push('</code></pre>'); i++; continue; }
      html.push(esc(line));
      i++; continue;
    }
    if (/^```/.test(line)) {
      inFence = true;
      const lang = line.slice(3).trim();
      html.push(`<pre${lang ? ` class="lang-${esc(lang)}"` : ''}><code>`);
      i++; continue;
    }
    if (/^#{1,5}\s+/.test(line)) {
      const m = line.match(/^(#{1,5})\s+(.*)$/);
      const level = m[1].length;
      const title = inline(m[2].trim(), fromRepoRel, hereUrl);
      html.push(`<h${level} id="${slugify(m[2])}">${title}</h${level}>`);
      i++; continue;
    }
    if (/^\s*---\s*$/.test(line)) { html.push('<hr>'); i++; continue; }
    if (/^\|/.test(line) && /^\|[\s:|-]+\|?\s*$/.test(lines[i + 1] || '')) {
      const rows = [];
      while (i < lines.length && /^\|/.test(lines[i])) { rows.push(lines[i]); i++; }
      const header = rows[0].split('|').slice(1, -1).map((c) => c.trim());
      const body = rows.slice(2).map((r) => r.split('|').slice(1, -1).map((c) => inline(c.trim(), fromRepoRel, hereUrl)));
      html.push('<div class="table-wrap"><table><thead><tr>' + header.map((c) => `<th>${inline(c, fromRepoRel)}</th>`).join('') + '</tr></thead><tbody>' +
        body.map((r) => '<tr>' + r.map((c) => `<td>${c}</td>`).join('') + '</tr>').join('') + '</tbody></table></div>');
      continue;
    }
    if (/^>/.test(line)) {
      const block = [];
      while (i < lines.length && /^>/.test(lines[i])) { block.push(lines[i].replace(/^>\s?/, '')); i++; }
      html.push(`<blockquote>${block.map((b) => `<p>${inline(b, fromRepoRel, hereUrl)}</p>`).join('')}</blockquote>`);
      continue;
    }
    if (/^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      const ordered = /^\d+\.\s+/.test(line);
      const items = [];
      while (i < lines.length && (/^[-*]\s+/.test(lines[i]) || /^\d+\.\s+/.test(lines[i]))) {
        items.push(`<li>${inline(lines[i].replace(/^[-*]\s+/, '').replace(/^\d+\.\s+/, ''), fromRepoRel, hereUrl)}</li>`);
        i++;
      }
      html.push(ordered ? `<ol>${items.join('')}</ol>` : `<ul>${items.join('')}</ul>`);
      continue;
    }
    if (line.trim() === '') { i++; continue; }

    const para = [];
    while (i < lines.length && lines[i].trim() !== '' && !/^(#{1,5}\s+|```|>|\||^\s*---\s*$|^[-*]\s+|^\d+\.\s+)/.test(lines[i])) {
      para.push(lines[i].trim()); i++;
    }
    html.push(`<p>${inline(para.join(' '), fromRepoRel, hereUrl)}</p>`);
  }
  return html.join('\n');
}

// ---------------------------------------------------------------------------
// Shell
// ---------------------------------------------------------------------------
function shellCss() { return readFileSync(join(SRC, 'site.css'), 'utf8'); }

function headerHTML(hereUrl) {
  const rel = (u) => (u === hereUrl ? ' aria-current="page"' : '');
  const p = (u) => relTo(u, hereUrl);
  return `
<header>
  <div class="wrap hd">
    <a class="logo" href="${p('index.html')}">DESIGN&nbsp;SKILL</a>
    <nav class="hd-nav">
      <a href="${p('wiki.html')}"${rel('wiki.html')}>THE WIKI</a>
      <a href="${p('detector.html')}"${rel('detector.html')}>DETECTOR</a>
      <a href="${p('install.html')}"${rel('install.html')}>INSTALL</a>
    </nav>
    <div class="hd-search">
      <input type="search" id="q" placeholder="SEARCH" autocomplete="off" aria-label="Search the wiki">
      <div id="results" class="results" hidden></div>
    </div>
  </div>
</header>`;
}

function sidebarHTML(hereUrl) {
  const groups = new Map();
  for (const p of PAGES) {
    if (!groups.has(p.group)) groups.set(p.group, []);
    groups.get(p.group).push(p);
  }
  let out = '<nav class="side" aria-label="Wiki sections">';
  for (const [group, items] of groups) {
    out += `<div class="side-g">${esc(group)}</div>`;
    for (const item of items) {
      const href = relTo(item.url, hereUrl);
      const cur = item.url === hereUrl ? ' class="cur"' : '';
      out += `<a href="${href}"${cur}>${esc(basename(item.file).replace('.md', '').replace(/_/g, ' '))}</a>`;
    }
  }
  return out + '</nav>';
}

function footerHTML(hereUrl) {
  const p = (u) => relTo(u, hereUrl);
  return `
<footer>
  <div class="wrap f3">
    <div>01 / APACHE 2.0<br><a href="https://github.com/TudeOrangBiasa/design-skill">github.com/TudeOrangBiasa/design-skill</a></div>
    <div>02 / ZERO DEPENDENCIES<br><a href="https://www.npmjs.com/package/agent-design-skill">npm · agent-design-skill</a></div>
    <div>03 / BUILT FOR AGENTS<br><a href="https://skills.sh/TudeOrangBiasa/design-skill">skills.sh · TudeOrangBiasa/design-skill</a></div>
  </div>
</footer>`;
}

function relTo(url, hereUrl) {
  if (!url) return '#';
  const from = hereUrl.includes('/') ? dirname(hereUrl) : '.';
  const r = relative(from, url);
  return r.startsWith('.') ? r : `./${r}`;
}

function searchScript() {
  return `
<script>
(function () {
  var input = document.getElementById('q');
  var box = document.getElementById('results');
  var idx = null;
  if (!input) return;
  var idxUrl = ${JSON.stringify(relTo('search-index.json', 'wiki.html'))};
  fetch(idxUrl).then(function (r) { return r.json(); }).then(function (data) { idx = data; });
  input.addEventListener('input', function () {
    var q = input.value.trim().toLowerCase();
    if (!q || !idx) { box.hidden = true; return; }
    var hits = idx.filter(function (e) {
      return e.t.toLowerCase().includes(q) || e.s.toLowerCase().includes(q) || e.g.toLowerCase().includes(q) || (e.k && e.k.toLowerCase().includes(q));
    }).slice(0, 8);
    if (!hits.length) { box.innerHTML = '<a class="no">NO PAGES MATCH</a>'; }
    else {
      box.innerHTML = hits.map(function (e) {
        return '<a href="' + ${JSON.stringify('')} + e.u + '"><b>' + e.t + '</b><span>' + e.g + '</span></a>';
      }).join('');
    }
    box.hidden = false;
  });
  document.addEventListener('click', function (ev) {
    if (!ev.target.closest('.hd-search')) box.hidden = true;
  });
})();
</script>`;
}

function shellHTML({ title, group, content, hereUrl, prev, next }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} · Design Skill</title>
<meta name="description" content="${esc(group)} — design-skill documentation">
<link rel="icon" href="${relTo('favicon.svg', hereUrl)}" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;700;900&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${relTo('site.css', hereUrl)}">
</head>
<body class="wiki">
${headerHTML(hereUrl)}
<div class="layout">
  ${sidebarHTML(hereUrl)}
  <main class="content">
    <article>
${content}
    </article>
    <div class="pn">
      ${prev ? `<a class="p" href="${relTo(prev.url, hereUrl)}"><span>PREV</span>${esc(prev.title)}</a>` : '<span></span>'}
      ${next ? `<a class="n" href="${relTo(next.url, hereUrl)}"><span>NEXT</span>${esc(next.title)}</a>` : '<span></span>'}
    </div>
  </main>
</div>
${footerHTML(hereUrl)}
${searchScript()}
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------
function humanize(slug) {
  return slug.replace(/-/g, ' ').replace(/\bui\b/g, 'UI').replace(/\bmd\b/g, 'MD')
    .split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
function pageTitle(md, fallback) {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].replace(/[*_`]/g, '').trim() : humanize(fallback || '');
}
function pageExcerpt(md) {
  const m = md.match(/^#\s+.+\n\n(.+)$/m);
  return m ? m[1].replace(/[#*_`\[\]()]/g, '').slice(0, 180) : '';
}

mkdirSync(DIST, { recursive: true });
mkdirSync(join(DIST, 'doctrine'), { recursive: true });
mkdirSync(join(DIST, 'assets'), { recursive: true });

// shared assets
copyFileSync(join(SRC, 'site.css'), join(DIST, 'site.css'));
if (existsSync(join(SRC, 'favicon.svg'))) copyFileSync(join(SRC, 'favicon.svg'), join(DIST, 'favicon.svg'));
for (const f of ['og.png', 'og.svg']) {
  if (existsSync(join(SRC, 'assets', f))) copyFileSync(join(SRC, 'assets', f), join(DIST, 'assets', f));
}
// painterly background library
mkdirSync(join(DIST, 'assets', 'bg'), { recursive: true });
for (const f of readdirSync(join(SRC, 'assets', 'bg'))) {
  copyFileSync(join(SRC, 'assets', 'bg', f), join(DIST, 'assets', 'bg', f));
}
// runtime slop specimen data (real tells; loaded client-side so the site's
// own detector audits the site, not its evidence)
if (existsSync(join(SRC, 'slop-specimens.js'))) {
  copyFileSync(join(SRC, 'slop-specimens.js'), join(DIST, 'slop-specimens.js'));
}

// landing
copyFileSync(join(SRC, 'index.html'), join(DIST, 'index.html'));

// wiki + doctrine pages
const searchIndex = [];
for (const page of PAGES) {
  page.title = pageTitle(readFileSync(join(ROOT, page.file), 'utf8'), basename(page.file).replace('.md', ''));
}
for (const page of PAGES) {
  const raw = readFileSync(join(ROOT, page.file), 'utf8');
  const title = page.title;
  const body = renderMarkdown(raw, page.file, page.url);
  const idx = PAGES.findIndex((p) => p.url === page.url);
  const prev = idx > 0 ? PAGES[idx - 1] : null;
  const next = idx < PAGES.length - 1 ? PAGES[idx + 1] : null;
  writeFileSync(join(DIST, page.url), shellHTML({ title, group: page.group, content: body, hereUrl: page.url, prev, next }));
  searchIndex.push({ t: title, u: page.url, s: pageExcerpt(raw), g: page.group, k: basename(page.file).replace('.md', '').replace(/_/g, ' ') });
}

// doctrine index page (directory landing)
{
  let body = '<h1 id="the-doctrine">The doctrine library</h1>\n<p>Fifty-five playbooks, one per concern. Loaded by the skill on demand; browsable here by group.</p>\n';
  for (const [group, files] of DOCTRINE_GROUPS) {
    body += `<h2 id="${slugify(group)}">${group}</h2>\n<ul>\n`;
    for (const f of files) {
      const raw = readFileSync(join(ROOT, 'reference', `${f}.md`), 'utf8');
      body += `<li><a href="${f}.html"><strong>${esc(pageTitle(raw))}</strong></a></li>\n`;
    }
    body += '</ul>\n';
  }
  writeFileSync(join(DIST, 'doctrine', 'index.html'), shellHTML({ title: 'The doctrine library', group: 'Doctrine', content: body, hereUrl: 'doctrine/index.html', prev: null, next: null }));
}

// landing + 404 entries in search
searchIndex.push({ t: 'Design Skill — landing', u: 'index.html', s: 'Every AI interface has a tell. The detector, the doctrine, the checklist.', g: 'Landing' });
searchIndex.push({ t: 'Page not found', u: '404.html', s: 'The page you requested does not exist.', g: 'Landing' });

writeFileSync(join(DIST, 'search-index.json'), JSON.stringify(searchIndex));

// 404 page
{
  const body = `<h1 id="page-not-found">Page not found</h1>\n<p>Sorry, that page does not exist. <a href="${relTo('index.html', '404.html')}">Go back to the landing page</a> or use search.</p>`;
  writeFileSync(join(DIST, '404.html'), shellHTML({ title: 'Page not found', group: 'Landing', content: body, hereUrl: '404.html', prev: null, next: null }));
}

console.log(`built ${PAGES.length} content pages + landing + doctrine index + 404`);
console.log(`search index: ${searchIndex.length} entries`);
