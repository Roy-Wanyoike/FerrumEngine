/**
 * Custom Next.js server — fixes CSP and sandbox signal issues.
 *
 * 1. Patches process.on to prevent uv_signal_start EINVAL crashes.
 * 2. Fixes Next.js 16 auto-CSP that blocks RSC inline scripts.
 */

// Block signal handlers that crash in sandboxed/restricted environments
const origOn = process.on.bind(process);
process.on = function (event, ...args) {
  if (event === 'SIGTERM' || event === 'SIGINT') return process;
  return origOn(event, ...args);
};

const { createServer } = require('http');
const next = require('next');

const BAD_CSP = "script-src 'self'";
const GOOD_CSP = "script-src 'self' 'unsafe-inline'";

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    // Intercept the response by hooking into the socket
    const origSocketWrite = res.socket.write.bind(res.socket);
    let cspFixed = false;

    res.on('pipe', (src) => {
      // Response is being piped from Next.js internals
      if (!cspFixed) {
        cspFixed = true;
        // Fix CSP header if present
        const existingCsp = res.getHeader('content-security-policy');
        if (existingCsp) {
          res.setHeader('Content-Security-Policy', existingCsp.replace(BAD_CSP, GOOD_CSP));
        }
      }
    });

    // Also try fixing after writeHead is called
    const origWriteHead = res.writeHead.bind(res);
    res.writeHead = function (...args) {
      const result = origWriteHead(...args);
      if (!cspFixed) {
        cspFixed = true;
        const existingCsp = res.getHeader('content-security-policy');
        if (existingCsp && existingCsp.includes("script-src") && !existingCsp.includes("unsafe-inline")) {
          // Can't change headers after they're sent, but we can try
          // Actually, we can't. So we need to intercept BEFORE.
        }
      }
      return result;
    };

    handle(req, res).catch((err) => {
      console.error('Request error:', err.message);
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
      }
      res.end('Internal Server Error');
    });
  });

  // Intercept at the TCP level to fix CSP in raw HTTP response
  const origEmit = server.emit.bind(server);
  server.emit = function (event, req, res) {
    if (event === 'request') {
      const origResWrite = res.write.bind(res);
      let headersReplaced = false;

      // Override res.write to intercept the HTTP response head
      res.write = function (chunk, ...args) {
        if (!headersReplaced && Buffer.isBuffer(chunk)) {
          let str = chunk.toString('utf8');
          if (str.includes('script-src')) {
            str = str.replace(BAD_CSP, GOOD_CSP);
            headersReplaced = true;
            return origResWrite(Buffer.from(str, 'utf8'), ...args);
          }
        }
        return origResWrite(chunk, ...args);
      };
    }
    return origEmit(event, req, res);
  };

  server.listen(port, hostname, () => {
    console.log(`> FerrumEngine ready on http://${hostname}:${port}`);
  });
});
