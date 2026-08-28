/**
 * Custom Next.js production server.
 *
 * 1. Patches process.on to prevent uv_signal_start EINVAL crashes in sandbox.
 * 2. Starts Next.js in production mode on 0.0.0.0:3000.
 */

// Block signal handlers that crash in sandboxed environments
const origOn = process.on.bind(process);
process.on = function (event, ...args) {
  if (event === 'SIGTERM' || event === 'SIGINT') return process;
  return origOn(event, ...args);
};
const origOff = process.off.bind(process);
process.off = function (event, ...args) {
  if (event === 'SIGTERM' || event === 'SIGINT') return process;
  return origOff(event, ...args);
};

const { createServer } = require('http');
const next = require('next');

const dev = false; // Always production for this entry point
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res).catch((err) => {
      console.error('Request error:', err.message);
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
      }
      res.end('Internal Server Error');
    });
  });

  server.listen(port, hostname, () => {
    console.log(`> FerrumEngine ready on http://${hostname}:${port}`);
  });
});
