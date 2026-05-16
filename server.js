const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const VERSION = Date.now().toString();

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);

  if (parsed.pathname !== '/') {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  if (!parsed.query.v) {
    res.writeHead(302, { 'Location': `/?v=${VERSION}` });
    res.end();
    return;
  }

  const filePath = path.join(__dirname, 'index.html');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading app');
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`TrailFit running on port ${PORT}`);
});
