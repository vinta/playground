# HAL Audio Clips

Per-sentence audio clips extracted from [HAL 9000 - All Quotes](https://www.youtube.com/watch?v=9wrjl-H4Hs8).

## Prerequisites

```bash
brew install ffmpeg
uv tool install yt-dlp
uv tool install openai-whisper
```

## Steps

### 1. Download audio from YouTube

```bash
yt-dlp -x --audio-format mp3 -o "source.%(ext)s" "https://www.youtube.com/watch?v=9wrjl-H4Hs8"
```

Produces `source.mp3`.

### 2. Transcribe with Whisper

```bash
whisper source.mp3 --model medium --output_format json --output_dir .
```

Produces `source.json` with timestamped segments.

### 3. Split into per-sentence clips

```bash
python3 split_audio.py
```

Reads `source.json`, splits `source.mp3` into individual MP3 files under `splits/`, one per Whisper segment. Each file is named `{index:03d}-{slugified-text}.mp3`.

## Output

74 clips in `splits/`, e.g.:

```
000-good-afternoon-mr-amor-everything-is-going-extremely-well.mp3
047-im-sorry-dave-im-afraid-i-cant-do-that-i-think-you-know-what-the-problem-is
059-im-afraid-im-afraid-dave-dave-my-mind-is-going-i-can-feel-it
061-good-afternoon-gentlemen.mp3
```
