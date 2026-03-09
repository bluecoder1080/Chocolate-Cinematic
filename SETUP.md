# 🚀 Quick Setup Guide

Follow these steps to get Chocolate Cinematic running on your machine.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Step-by-Step Setup

### 1️⃣ Install Dependencies

```bash
npm install
```

This will install all required packages:

- Next.js 14+
- React 18+
- TypeScript
- Tailwind CSS
- Framer Motion
- And all their type definitions

### 2️⃣ Add Your Image Sequences

**CRITICAL:** The site requires image sequences to function. You must add your images before running the site.

Create/verify the following folder structure exists:

```
public/
└── images/
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

**Image Requirements:**

- **Format:** WebP (`.webp`)
- **Count:** Exactly 50 frames per flavor
- **Names:** Sequential (1.webp, 2.webp, ..., 50.webp)
- **Size:** 1920px width recommended (maintains aspect ratio)

**How to Get Images:**

Option A: Use your existing images from `All THe Images/` folder:

- Dark-Chocolate → `public/images/dark-chocolate/`
- Lemon-jpg → `public/images/lemon/`
- Strawberry → `public/images/strawberry/`

Option B: Extract from videos using FFmpeg (see README.md)

### 3️⃣ Run Development Server

```bash
npm run dev
```

Open your browser to: **http://localhost:3000**

### 4️⃣ Build for Production

```bash
npm run build
```

This creates a static export in the `out/` directory that you can deploy anywhere.

## ⚠️ Troubleshooting

### "Images not loading"

- Verify images are in correct folders
- Check naming: 1.webp, 2.webp, etc. (not 01.webp, 001.webp)
- Ensure WebP format (convert JPG/PNG to WebP if needed)

### "Module not found" errors

- Run `npm install` again
- Delete `node_modules` and `.next` folders, then reinstall

### Build errors

- Make sure you have Node.js 18+ installed
- Clear Next.js cache: `rm -rf .next`

## 🎨 Customization

After setup, you can customize:

- Product data in `data/products.ts`
- Colors in `app/globals.css`
- Components in `components/` folder

## 📦 Deployment

### Vercel (Easiest)

```bash
npm install -g vercel
vercel
```

### Netlify

1. Build: `npm run build`
2. Deploy `out/` folder

### GitHub Pages

1. Build: `npm run build`
2. Push `out/` to gh-pages branch

---

Need help? Check the full README.md for detailed documentation.
