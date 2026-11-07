const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const siteRoot = path.resolve(__dirname, "artifacts/furness-vehicle-insight/dist");
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
};

const server = http.createServer((request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end("Method not allowed");
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    response.writeHead(400);
    response.end("Bad request");
    return;
  }

  const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const filePath = path.resolve(siteRoot, relativePath);
  if (filePath !== siteRoot && !filePath.startsWith(`${siteRoot}${path.sep}`)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.stat(filePath, (statError, stat) => {
    const resolvedPath = !statError && stat.isDirectory()
      ? path.join(filePath, "index.html")
      : filePath;

    fs.readFile(resolvedPath, (readError, body) => {
      if (readError) {
        response.writeHead(readError.code === "ENOENT" ? 404 : 500);
        response.end(readError.code === "ENOENT" ? "Not found" : "Unable to read file");
        return;
      }

      response.writeHead(200, {
        "Content-Type": contentTypes[path.extname(resolvedPath)] || "application/octet-stream",
        "Content-Length": body.length,
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      });
      response.end(request.method === "HEAD" ? undefined : body);
    });
  });
});

const port = Number(process.env.PORT || 5000);
server.listen(port, "0.0.0.0", () => {
  console.log(`VIX-SCAN website preview listening on 0.0.0.0:${port}`);
});
