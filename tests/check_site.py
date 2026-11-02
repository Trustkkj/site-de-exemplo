"""Verificações estáticas sem dependências: python3 tests/check_site.py."""
from html.parser import HTMLParser
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=[]; self.links=[]; self.assets=[]; self.headings=[]; self.images=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        if tag=='a': self.links.append(a.get('href',''))
        if tag=='img': self.images.append(a); self.assets.append(a.get('src',''))
        if tag=='script' and a.get('src'): self.assets.append(a['src'])
        if tag=='link' and a.get('href','').startswith(('css/','assets/')): self.assets.append(a['href'])
        if re.fullmatch('h[1-6]',tag): self.headings.append(tag)
p=Page(); p.feed((ROOT/'index.html').read_text())
assert len(p.ids)==len(set(p.ids)), 'IDs duplicados'
assert p.headings.count('h1')==1, 'É necessário um único h1'
for link in p.links:
    assert link, 'Link vazio'
    if link.startswith('#'): assert link[1:] in p.ids, f'Âncora inexistente: {link}'
for asset in filter(None, p.assets): assert (ROOT/asset).is_file(), f'Arquivo ausente: {asset}'
for img in p.images:
    if img.get('id')!='lightbox-image': assert img.get('alt'), 'Imagem sem descrição'
    if img.get('id')!='lightbox-image': assert img.get('width') and img.get('height'), 'Imagem sem dimensões'
for name in ('hero','corte','barbearia','barba'):
    data=(ROOT/f'assets/images/{name}.jpg').read_bytes()
    assert data[:2]==b'\xff\xd8' and data[-2:]==b'\xff\xd9', f'JPEG inválido: {name}'
assert 'prefers-reduced-motion' in (ROOT/'css/style.css').read_text()
assert 'whatsapp: \'\'' in (ROOT/'js/main.js').read_text(), 'Contato demonstrativo deve iniciar vazio'
print(f'OK: {len(p.ids)} IDs únicos, {len(p.links)} links, {len(p.assets)} referências locais, 4 JPEGs válidos e metadados básicos.')
