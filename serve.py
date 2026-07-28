import os, functools, http.server, socketserver

ROOT = os.path.dirname(os.path.abspath(__file__))
os.chdir(ROOT)

Handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)


class Server(socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True


with Server(("127.0.0.1", 4321), Handler) as httpd:
    print(f"serving {ROOT} on http://127.0.0.1:4321")
    httpd.serve_forever()
