"""Verifica recursos relativos com HTTP sob /site-de-exemplo/, sem dependências."""
from pathlib import Path
from html.parser import HTMLParser
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.request import urlopen
from urllib.parse import urljoin, urlparse
from tempfile import TemporaryDirectory
from functools import partial
from threading import Thread
import re
root=Path(__file__).resolve().parents[1]
class Assets(HTMLParser):
    def __init__(self): super().__init__(); self.paths=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag in ('img','script') and a.get('src'): self.paths.append(a['src'])
        if tag=='link' and a.get('href'): self.paths.append(a['href'])
        if tag=='meta' and a.get('property')=='og:image': self.paths.append(a['content'])
p=Assets(); p.feed((root/'index.html').read_text())
assert (root/'index.html').is_file()
assert not re.search(r'<base\b',(root/'index.html').read_text())
css_urls=re.findall(r'url\([\s\"\']*([^\)\"\']+)',(root/'css/style.css').read_text())
class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args): pass
with TemporaryDirectory() as d:
    (Path(d)/'site-de-exemplo').symlink_to(root,target_is_directory=True)
    server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=d))
    Thread(target=server.serve_forever,daemon=True).start()
    try:
        base=f'http://127.0.0.1:{server.server_port}/site-de-exemplo/'
        with urlopen(base) as r: assert r.status==200 and b'BARBER' in r.read()
        checked=set()
        for path,origin in [(v,base) for v in p.paths]+[(v,urljoin(base,'css/style.css')) for v in css_urls]:
            if urlparse(path).scheme or path.startswith('//'): continue
            assert not path.startswith('/'),f'Caminho absoluto: {path}'
            url=urljoin(origin,path)
            assert urlparse(url).path.startswith('/site-de-exemplo/'),url
            with urlopen(url) as r:
                assert r.status==200
                assert r.read()==(Path(d)/urlparse(url).path.lstrip('/')).read_bytes()
            checked.add(urlparse(url).path)
        print(f'OK: /site-de-exemplo/ e {len(checked)} recursos locais retornam 200 e conteúdo correto; caminhos relativos confirmados.')
    finally: server.shutdown(); server.server_close()
