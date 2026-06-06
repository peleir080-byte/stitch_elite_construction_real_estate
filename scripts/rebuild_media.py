import json
import re
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
PHOTO_DIR = BASE / "photo"


def sort_key(p: Path):
    s = p.stem
    if s == "":
        return (0, 0)
    try:
        return (1, int(s))
    except ValueError:
        return (2, s)


def build_manifest():
    photos, videos = [], []

    for f in sorted(PHOTO_DIR.iterdir(), key=sort_key):
        rel = f.relative_to(BASE).as_posix()
        if f.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}:
            label = "Photo chantier AUGIC" if f.stem == "" else f"Réalisation chantier AUGIC ({f.stem})"
            photos.append({"src": rel, "alt": label})
        elif f.suffix.lower() == ".mp4":
            videos.append({"src": rel, "title": f"Vidéo chantier — {f.stem}", "poster": ""})

    for f in sorted((BASE / "assets/videos").glob("*.mp4")):
        videos.append(
            {"src": f.relative_to(BASE).as_posix(), "title": f"Vidéo chantier {f.stem}", "poster": ""}
        )

    manifest_path = BASE / "media-manifest.js"
    manifest_path.write_text(
        "window.AUGIC_MEDIA = " + json.dumps({"photos": photos, "videos": videos}, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    return photos, videos


def clean_site_files(photos):
    pool = [p["src"] for p in photos] or ["photo/1.jpeg"]
    index = {"i": 0}

    def next_photo():
        value = pool[index["i"] % len(pool)]
        index["i"] += 1
        return value

    targets = list(BASE.glob("*.html")) + [BASE / "app.js"]
    for fp in targets:
        text = fp.read_text(encoding="utf-8")
        original = text

        text = re.sub(r'\s+poster="[^"]*"', "", text)
        text = re.sub(
            r'src="assets/images/(property_|project_|hero_bg)[^"]*"',
            lambda _: f'src="{next_photo()}"',
            text,
        )
        text = re.sub(
            r'src="assets/images/real/[^"]*"',
            lambda _: f'src="{next_photo()}"',
            text,
        )
        text = re.sub(
            r"image: 'assets/images/real/[^']*'",
            lambda _: f"image: '{next_photo()}'",
            text,
        )

        if text != original:
            fp.write_text(text, encoding="utf-8")
            print(f"Updated {fp.name}")


if __name__ == "__main__":
    photos, videos = build_manifest()
    print(f"Manifest: {len(photos)} photos, {len(videos)} videos")
    clean_site_files(photos)
    print("Done")
