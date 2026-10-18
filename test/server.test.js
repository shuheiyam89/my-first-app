const { test, before, after } = require('node:test');
const assert = require('node:assert');
const { createServer } = require('../server');

let server;
let baseUrl;

before(async () => {
  server = createServer();
  await new Promise((resolve) => server.listen(0, resolve));
  baseUrl = `http://localhost:${server.address().port}`;
});

after(() => server.close());

test('GET / returns index.html', async () => {
  const res = await fetch(`${baseUrl}/`);
  assert.strictEqual(res.status, 200);
  assert.match(res.headers.get('content-type'), /text\/html/);
  assert.match(await res.text(), /My ToDo/);
});

test('static assets are served with correct MIME types', async () => {
  const css = await fetch(`${baseUrl}/style.css`);
  assert.strictEqual(css.status, 200);
  assert.match(css.headers.get('content-type'), /text\/css/);

  const js = await fetch(`${baseUrl}/app.js`);
  assert.strictEqual(js.status, 200);
  assert.match(js.headers.get('content-type'), /javascript/);
});

test('unknown path returns 404', async () => {
  const res = await fetch(`${baseUrl}/nope.html`);
  assert.strictEqual(res.status, 404);
});

test('path traversal is blocked', async () => {
  const res = await fetch(`${baseUrl}/..%2fserver.js`);
  assert.notStrictEqual(res.status, 200);
});
