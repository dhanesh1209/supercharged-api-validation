// Tiny demo server for CT-8. Not from any workplace; written from scratch.
// Default = the bug: the page checks the email, the API checks nothing.
// Run with FIXED=1 to see the server check the same rule.
const http = require('http');
const fs = require('fs');

const FIXED = process.env.FIXED === '1';
const PORT = process.env.PORT || 3000;
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end(fs.readFileSync(__dirname + '/index.html'));
  }
  if (req.method === 'POST' && req.url === '/api/signup') {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      let data = {};
      try { data = JSON.parse(body); } catch (e) {}
      if (FIXED && !EMAIL.test(String(data.email || ''))) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'invalid email' }));
      }
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, email: data.email }));
    });
    return;
  }
  res.writeHead(404);
  res.end();
});

server.listen(PORT, () => console.log(`demo on http://localhost:${PORT} (FIXED=${FIXED})`));
