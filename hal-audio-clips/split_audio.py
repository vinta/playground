#!/usr/bin/env python3
"""Split source.mp3 into per-segment clips using Whisper JSON output."""

import json
import re
import subprocess
from pathlib import Path

AUDIO_DIR = Path(__file__).parent
SOURCE = AUDIO_DIR / "source.mp3"
OUTPUT_DIR = AUDIO_DIR / "splits"
OUTPUT_DIR.mkdir(exist_ok=True)

with open(AUDIO_DIR / "source.json") as f:
    data = json.load(f)


def slugify(text: str, max_len: int = 80) -> str:
    text = text.strip().lower()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"[\s]+", "-", text)
    text = text.strip("-")
    if len(text) > max_len:
        text = text[:max_len].rsplit("-", 1)[0]
    return text


for i, seg in enumerate(data["segments"]):
    slug = slugify(seg["text"])
    filename = f"{i:03d}-{slug}.mp3"
    output = OUTPUT_DIR / filename

    start = seg["start"]
    end = seg["end"]

    cmd = [
        "ffmpeg", "-y",
        "-i", str(SOURCE),
        "-ss", str(start),
        "-to", str(end),
        "-c:a", "libmp3lame",
        "-q:a", "2",
        str(output),
    ]
    print(f"[{i:03d}] {start:.1f}s - {end:.1f}s: {seg['text'].strip()}")
    subprocess.run(cmd, capture_output=True, check=True)

print(f"\nDone. {len(data['segments'])} clips written to {OUTPUT_DIR}")
