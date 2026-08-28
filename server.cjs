/**
 * Custom Next.js server — sandbox-compatible
 * 
 * This server monkey-patches process.on to prevent uv_signal_start EINVAL
 * crashes in restricted environments where SIGTERM/SIGINT listeners are blocked.
 * 
 * Usage:
 *   node server.cjs          # production (requires next build first)
 *   NODE_ENV=development node server.cjs  # dev mode
 */

// Block signal handlers that crash in sandboxed/restricted environments
const origOn = process.on.bind(process);
process.on = function (event, ...args) {
  if (event === 'SIGTERM' || event === 'SIGINT') return process;
  return origOn(event, ...args);
};

const { createServer } = require('http');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res).catch((err) => {
      console.error('Request error:', err.message);
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
      }
      res.end('Internal Server Error');
    });
  }).listen(port, hostname, () => {
    console.log(`> FerrumEngine ready on http://${hostname}:${port}`);
  });
});
