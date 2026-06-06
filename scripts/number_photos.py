"""Renomme les images/vidéos du dossier photo/ en séquence numérique."""
import json
import re
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
PHOTO_DIR = BASE / "photo"


def existing_numbers() -> set[int]:
    nums = set()
    for f in PHOTO_DIR.iterdir():
        if f.suffix.lower() in {".jpg", ".jpeg"} and f.stem.isdigit():
            nums.add(int(f.stem))
    return nums


def rename_images():
    used = existing_numbers()
    next_num = max(used, default=0) + 1

    # Fichiers sans numéro (ex: ".jpeg" ou noms WhatsApp restants)
    pending = []
    for f in PHOTO_DIR.iterdir():
        if f.suffix.lower() not in {".jpg", ".jpeg"}:
            continue
        if f.stem.isdigit():
            continue
        pending.append(f)

    for f in sorted(pending, key=lambda p: (p.name == ".jpeg", p.name.lower())):
        if f.name.lower().startswith("whatsapp image"):
            continue
            target = PHOTO_DIR / f"{next_num}.jpeg"
            while target.exists():
                next_num += 1
                target = PHOTO_DIR / f"{next_num}.jpeg"
            print(f"RENAME {f.name} -> {target.name}")
            f.rename(target)
            used.add(next_num)
            next_num += 1

    # WhatsApp Image *.jpeg
    whatsapp_imgs = sorted(
        f for f in PHOTO_DIR.iterdir()
        if f.suffix.lower() in {".jpg", ".jpeg"} and f.name.lower().startswith("whatsapp image")
    )
    for f in whatsapp_imgs:
        while next_num in used or (PHOTO_DIR / f"{next_num}.jpeg").exists():
            next_num += 1
        target = PHOTO_DIR / f"{next_num}.jpeg"
        print(f"RENAME {f.name} -> {target.name}")
        f.rename(target)
        used.add(next_num)
        next_num += 1


def rename_videos():
    whatsapp_vids = sorted(
        f for f in PHOTO_DIR.iterdir()
        if f.suffix.lower() == ".mp4" and f.name.lower().startswith("whatsapp video")
    )
    n = 1
    for f in whatsapp_vids:
        while (PHOTO_DIR / f"video-{n}.mp4").exists():
            n += 1
        target = PHOTO_DIR / f"video-{n}.mp4"
        print(f"RENAME {f.name} -> {target.name}")
        f.rename(target)
        n += 1


def sort_key(p: Path):
    s = p.stem
    if s == "":
        return (0, 0)
    if s.isdigit():
        return (1, int(s))
    m = re.match(r"video-(\d+)", s, re.I)
    if m:
        return (2, int(m.group(1)))
    return (3, s)


def build_manifest():
    photos, videos = [], []

    for f in sorted(PHOTO_DIR.iterdir(), key=sort_key):
        rel = f.relative_to(BASE).as_posix()
        if f.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}:
            label = f"Photo chantier AUGIC ({f.stem})" if f.stem else "Photo chantier AUGIC"
            photos.append({"src": rel, "alt": label})
        elif f.suffix.lower() == ".mp4" and f.parent == PHOTO_DIR:
            videos.append({"src": rel, "title": f"Vidéo chantier — {f.stem}", "poster": ""})

    for f in sorted((BASE / "assets/videos").glob("*.mp4")):
        videos.append(
            {"src": f.relative_to(BASE).as_posix(), "title": f"Vidéo chantier {f.stem}", "poster": ""}
        )

    (BASE / "media-manifest.js").write_text(
        "window.AUGIC_MEDIA = " + json.dumps({"photos": photos, "videos": videos}, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    print(f"Manifest: {len(photos)} photos, {len(videos)} videos")


if __name__ == "__main__":
    rename_images()
    rename_videos()
    build_manifest()
    print("Terminé.")
