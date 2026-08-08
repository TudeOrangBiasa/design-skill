#!/usr/bin/env node
// site/dev-server.mjs — zero-dep static dev server with Range support
// (python http.server ignores Range, which stalls <video> elements).
// Usage: node site/dev-server.mjs [port]
import { createServer } from 'node:http';
import { readFileSync, statSync, existsSync } from 'node:fs';
import { extname, join, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = Number(process.argv[2] || process.env.PORT || 8451);
// dev-server.mjs lives in site/; serve the built site/dist
const ROOT = join(dirname(fileURLToPath(import.meta.url)), 'dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ico': 'image/x-icon',
};

createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let path = normalize(join(ROOT, decodeURIComponent(url.pathname)));
  if (!path.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
  if (!existsSync(path) || statSync(path).isDirectory()) path = join(path, 'index.html');
  if (!existsSync(path)) { res.writeHead(404); res.end('Not found'); return; }

  const stat = statSync(path);
  const type = MIME[extname(path).toLowerCase()] || 'application/octet-stream';
  const range = req.headers.range;

  if (range && /^bytes=/.test(range)) {
    const [startStr, endStr] = range.slice(6).split('-');
    const start = parseInt(startStr, 10) || 0;
    const end = endStr ? parseInt(endStr, 10) : stat.size - 1;
    if (start >= stat.size || end < start) {
      res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` });
      res.end();
      return;
    }
    res.writeHead(206, {
      'Content-Type': type,
      'Content-Length': end - start + 1,
      'Content-Range': `bytes ${start}-${end}/${stat.size}`,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-cache',
    });
    const fd = readFileSync(path).subarray(start, end + 1);
    res.end(fd);
    return;
  }

  res.writeHead(200, {
    'Content-Type': type,
    'Content-Length': stat.size,
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'no-cache',
  });
  res.end(readFileSync(path));
}).listen(PORT, '127.0.0.1', () => {
  console.log(`site dev server: http://localhost:${PORT}/ (Range enabled)`);
});
