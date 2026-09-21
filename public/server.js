// Simpele lokale server (geen installatie nodig, alleen Node.js)
// Start met:  node server.js
// Open daarna: http://localhost:3000

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const MAP = __dirname; // de map waar dit bestand staat

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  let urlPad = decodeURIComponent(req.url.split("?")[0]);
  if (urlPad === "/") urlPad = "/index.html";

  const bestand = path.join(MAP, path.normalize(urlPad));

  // niet buiten de map kunnen kijken
  if (!bestand.startsWith(MAP)) {
    res.writeHead(403);
    return res.end("Geen toegang");
  }

  fs.readFile(bestand, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("404 - Pagina niet gevonden");
    }
    const type = TYPES[path.extname(bestand).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  });
});

const HOST = "0.0.0.0"; // luister op alle netwerken (wifi), niet alleen localhost

server.listen(PORT, HOST, () => {
  const os = require("os");
  console.log(`Lokaal:  http://localhost:${PORT}`);
  for (const lijst of Object.values(os.networkInterfaces())) {
    for (const n of lijst) {
      if (n.family === "IPv4" && !n.internal) {
        console.log(`Netwerk: http://${n.address}:${PORT}`);
      }
    }
  }
  console.log("Stoppen: Ctrl + C");
});