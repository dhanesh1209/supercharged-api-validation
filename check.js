// Plain Node 18+ check, no packages. Sends a bad email straight to the API.
const base = process.env.BASE || 'http://localhost:3000';
(async () => {
  const r = await fetch(base + '/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'not-an-email' }),
  });
  console.log('status', r.status, r.status === 400 ? 'PASS: server rejects it' : 'FAIL: server accepted a bad email');
  process.exit(r.status === 400 ? 0 : 1);
})();
