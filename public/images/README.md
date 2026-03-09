# Image Sequences

Place your image sequences here following this structure:

## Folder Structure

```
images/
├── dark-chocolate/
│   ├── 1.webp
│   ├── 2.webp
│   ├── ...
│   └── 50.webp
├── lemon/
│   ├── 1.webp
│   ├── 2.webp
│   ├── ...
│   └── 50.webp
└── strawberry/
    ├── 1.webp
    ├── 2.webp
    ├── ...
    └── 50.webp
```

## Image Specifications

- **Format:** `.webp` (for optimal performance)
- **Frame Count:** 50 frames per flavor
- **Resolution:** 1920px max width recommended
- **Naming Convention:** Sequential numbers (1.webp, 2.webp, ..., 50.webp)
- **Aspect Ratio:** 16:9 or similar for best results

## How to Extract Frames from Video

If you have videos and need to extract frames:

### Using FFmpeg

```bash
# Extract 50 frames from video
ffmpeg -i input.mp4 -vf "select='not(mod(n\,$(echo "scale=0; $(ffprobe -v error -select_streams v:0 -show_entries stream=nb_frames -of default=nokey=1:noprint_wrappers=1 input.mp4) / 50" | bc)))',scale=1920:-1" -frames:v 50 -q:v 2 %d.webp

# Or simpler version
ffmpeg -i input.mp4 -vf "fps=50/$(ffprobe -v error -select_streams v:0 -show_entries format=duration -of default=nokey=1:noprint_wrappers=1 input.mp4),scale=1920:-1" -frames:v 50 %d.webp
```

### Online Tools

- [Ezgif.com](https://ezgif.com/video-to-jpg) - Video to frames
- [CloudConvert](https://cloudconvert.com/) - Video format conversion

## Note

The folders will be created automatically when you place your first image in each directory, or you can create them manually.
