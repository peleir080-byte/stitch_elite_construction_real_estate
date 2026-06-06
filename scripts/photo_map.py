"""Associe chaque visuel à la bonne photo numérotée (cohérence texte ↔ image)."""
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent

# alt ou fragmente de titre -> fichier photo
REPLACEMENTS = [
    # projets.html — grille principale
    ('photo/WhatsApp Image 2026-05-29 at 03.35.00.jpeg', 'photo/14.jpeg'),
    ('photo/WhatsApp Image 2026-05-29 at 03.35.01.jpeg', 'photo/43.jpeg'),
    ('photo/WhatsApp Image 2026-05-29 at 03.35.02.jpeg', 'photo/23.jpeg'),
    ('photo/WhatsApp Image 2026-05-29 at 03.35.03.jpeg', 'photo/20.jpeg'),
    ('photo/WhatsApp Image 2026-05-29 at 03.35.04.jpeg', 'photo/42.jpeg'),
    ('photo/WhatsApp Image 2026-05-29 at 03.35.05.jpeg', 'photo/40.jpeg'),
    ('photo/WhatsApp Image 2026-05-29 at 03.35.06.jpeg', 'photo/29.jpeg'),
    ('photo/WhatsApp Image 2026-05-29 at 03.35.1.jpeg', 'photo/41.jpeg'),
    ('photo/WhatsApp Image 2026-05-29 at 03.35.3.jpeg', 'photo/9.jpeg'),
    ('photo/WhatsApp Image 2026-05-29 at 03.35.0.jpeg', 'photo/24.jpeg'),
    # services.html
    ('photo/WhatsApp Image 2026-05-29 at 03.3504.jpeg', 'photo/27.jpeg'),
    ('photo/WhatsApp Image 2026-05-29 at 03.354.jpeg', 'photo/14.jpeg'),
    ('photo/WhatsApp Image 2026-05-29 at 03.40.1.jpeg', 'photo/23.jpeg'),
    ('photo/WhatsApp Image 2026-05-29 at 03.40.19.jpeg', 'photo/43.jpeg'),
    ('photo/WhatsApp Image 2026-05-29 at 03.40.21.jpeg', 'photo/38.jpeg'),
    ('photo/WhatsApp Image 2026-05-29 at 03.40.22.jpeg', 'photo/29.jpeg'),
    ('photo/WhatsApp Image 2026-05-29 at 03.45.48.jpeg', 'photo/9.jpeg'),
    ('photo/WhatsApp Image 2026-05-29 at 03.56.jpeg', 'photo/20.jpeg'),
    ('photo/WhatsApp Image 2026-05-29 at 34.55.jpeg', 'photo/42.jpeg'),
    ('photo/WhatsApp Image 2026-05-29 at 5.02.jpeg', 'photo/40.jpeg'),
]

for fp in BASE.glob("*.html"):
    text = fp.read_text(encoding="utf-8")
    orig = text
    for old, new in REPLACEMENTS:
        text = text.replace(old, new)
    if text != orig:
        fp.write_text(text, encoding="utf-8")
        print("Fixed paths in", fp.name)
