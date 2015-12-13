import BaseHTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler

addr = ("0.0.0.0", 8888)

serv = BaseHTTPServer.HTTPServer(addr, SimpleHTTPRequestHandler)

serv.serve_forever()
