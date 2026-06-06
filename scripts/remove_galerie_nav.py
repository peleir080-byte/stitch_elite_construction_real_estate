import re
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
PATTERNS = [
    re.compile(r'\s*<a[^>]*href="galerie\.html"[^>]*>Galerie</a>\s*\n?', re.I),
    re.compile(r'\s*<li><a href="galerie\.html"[^>]*>Galerie</a></li>\s*\n?', re.I),
]

for fp in BASE.glob("*.html"):
    text = fp.read_text(encoding="utf-8")
    orig = text
    for p in PATTERNS:
        text = p.sub("\n", text)
    if text != orig:
        fp.write_text(text, encoding="utf-8")
        print("Updated", fp.name)
