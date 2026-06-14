#!/usr/bin/env node
/**
 * Static server for operon-v2/site — separate from vinext v1 app (port 3001).
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, resolve } from "node:path";

const PORT = Number(process.env.PORT || 3002);
const SITE = resolve(import.meta.dirname, "../site");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".otf": "font/otf",
  ".ico": "image/x-icon",
};

async function serveFile(res, filePath) {
  const data = await readFile(filePath);
  const ext = extname(filePath);
  res.writeHead(200, {
    "Content-Type": MIME[ext] || "application/octet-stream",
    "Cache-Control": "no-cache",
  });
  res.end(data);
}

async function resolvePath(urlPath) {
  let p = urlPath.split("?")[0];
  if (p.endsWith("/")) p += "index.html";
  if (p === "/") p = "/index.html";

  const filePath = join(SITE, p);
  try {
    const s = await stat(filePath);
    if (s.isFile()) return filePath;
  } catch {
    /* fall through */
  }
  return null;
}

const server = createServer(async (req, res) => {
  try {
    const file = await resolvePath(req.url || "/");
    if (file) return serveFile(res, file);

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  } catch (e) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end(String(e));
  }
});

server.listen(PORT, () => {
  console.log(`[operon-v2] Serving clone at http://localhost:${PORT}/`);
  console.log(`[operon-v2] Developers: http://localhost:${PORT}/developers/`);
  console.log(`[operon-v2] (v1 React site stays on http://localhost:3001/)`);
});
