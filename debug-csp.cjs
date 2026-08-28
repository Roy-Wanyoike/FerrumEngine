const Proto = require('http').ServerResponse.prototype;
const origSetHeader = Proto.setHeader;
Proto.setHeader = function(name, value) {
  if (name.toLowerCase() === 'content-security-policy') {
    console.log('[CSP-DEBUG] setHeader called:', value.substring(0, 100));
    return origSetHeader.call(this, name, value.replace("script-src 'self'", "script-src 'self' 'unsafe-inline'"));
  }
  return origSetHeader.call(this, name, value);
};
const origWriteHead = Proto.writeHead;
Proto.writeHead = function(...args) {
  const headers = typeof args[1] === 'object' ? args[1] : typeof args[2] === 'object' ? args[2] : null;
  if (headers) {
    const csp = Object.keys(headers).find(k => k.toLowerCase() === 'content-security-policy');
    if (csp) console.log('[CSP-DEBUG] writeHead has CSP');
  }
  return origWriteHead.apply(this, args);
};
const origOn = process.on.bind(process);
process.on = function(e, ...a) { if (e === 'SIGTERM' || e === 'SIGINT') return process; return origOn(e, ...a); };
const next = require('next');
const { createServer } = require('http');
const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  const srv = createServer((req, res) => handle(req, res));
  srv.listen(3000, '0.0.0.0', () => {
    console.log('READY - making request...');
    require('http').get('http://localhost:3000/', (res) => {
      console.log('[CSP-DEBUG] Response CSP:', res.headers['content-security-policy'] ? res.headers['content-security-policy'].substring(0, 80) : 'NONE');
      res.resume();
      res.on('end', () => { console.log('DONE'); process.exit(0); });
    });
  });
});
setTimeout(() => { console.log('TIMEOUT'); process.exit(1); }, 15000);
