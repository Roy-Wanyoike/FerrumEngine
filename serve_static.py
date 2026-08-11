#!/usr/bin/env python3
"""Minimal HTTP server for Next.js static build output."""
import os
import sys
import mimetypes
from http.server import HTTPServer, SimpleHTTPRequestHandler
from socketserver import ThreadingMixIn

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 19876
PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
NEXT_DIR = os.path.join(PROJECT_DIR, ".next")
SERVER_APP_DIR = os.path.join(NEXT_DIR, "server", "app")
STATIC_DIR = os.path.join(NEXT_DIR, "static")
PUBLIC_DIR = os.path.join(PROJECT_DIR, "public")

ROUTE_MAP = {
    "/": "index.html",
    "/privacy": "privacy.html",
    "/terms": "terms.html",
    "/cloud": "cloud.html",
}

SPA_ROUTES = [
    "/effects", "/docs", "/playground", "/architecture",
    "/principles", "/enterprise", "/learning", "/community",
    "/story", "/showcase", "/hall-of-fame", "/vision",
]


class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


class NextJSHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory="", **kwargs)

    def do_GET(self):
        path = self.path.split("?")[0].split("#")[0]

        if path.startswith("/_next/static/"):
            rel = path[len("/_next/static/"):]
            fpath = os.path.join(STATIC_DIR, rel)
            if os.path.isfile(fpath):
                return self.serve_file(fpath)

        if path.startswith("/_next/"):
            rel = path[len("/_next/"):]
            for base in [NEXT_DIR, SERVER_APP_DIR]:
                fpath = os.path.join(base, rel)
                if os.path.isfile(fpath):
                    return self.serve_file(fpath)

        if path == "/ferrum-effects.css":
            fpath = os.path.join(PUBLIC_DIR, "ferrum-effects.css")
            if os.path.isfile(fpath):
                return self.serve_file(fpath)

        public_path = path.lstrip("/")
        fpath = os.path.join(PUBLIC_DIR, public_path)
        if os.path.isfile(fpath):
            return self.serve_file(fpath)

        if path in ROUTE_MAP:
            fpath = os.path.join(SERVER_APP_DIR, ROUTE_MAP[path])
            if os.path.isfile(fpath):
                return self.serve_file(fpath, content_type="text/html")

        if path in SPA_ROUTES:
            fpath = os.path.join(SERVER_APP_DIR, "index.html")
            if os.path.isfile(fpath):
                return self.serve_file(fpath, content_type="text/html")

        self.send_response(404)
        self.send_header("Content-Type", "text/html")
        self.end_headers()
        self.wfile.write(b"<h1>404 Not Found</h1>")

    def do_POST(self):
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(b'{"ok":true}')

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.end_headers()

    def serve_file(self, fpath, content_type=None):
        if content_type is None:
            ct, _ = mimetypes.guess_type(fpath)
            content_type = ct or "application/octet-stream"
        try:
            with open(fpath, "rb") as f:
                data = f.read()
            self.send_response(200)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
        except Exception as e:
            try:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(f"Error: {e}".encode())
            except:
                pass

    def log_message(self, format, *args):
        pass


if __name__ == "__main__":
    server = ThreadedHTTPServer(("0.0.0.0", PORT), NextJSHandler)
    print("Serving on http://0.0.0.0:%d" % PORT)
    sys.stdout.flush()
    server.serve_forever()
