"use client";

import { useEffect, useRef, useState } from "react";

interface ProductCanvasScrollProps {
  folderPath: string;
  frameCount?: number;
}

export default function ProductCanvasScroll({
  folderPath,
  frameCount = 200,
}: ProductCanvasScrollProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const preloadImages = () => {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        // Format: ezgif-frame-001.jpg, ezgif-frame-002.jpg, etc.
        const frameNumber = String(i).padStart(3, "0");
        img.src = `${folderPath}/ezgif-frame-${frameNumber}.jpg`;

        img.onload = () => {
          loadedCount++;
          setLoadingProgress(Math.floor((loadedCount / frameCount) * 100));

          if (loadedCount === frameCount) {
            setImagesLoaded(true);
          }
        };

        img.onerror = () => {
          console.warn(`Failed to load image: ${img.src}`);
          loadedCount++;
          setLoadingProgress(Math.floor((loadedCount / frameCount) * 100));

          if (loadedCount === frameCount) {
            setImagesLoaded(true);
          }
        };

        images.push(img);
      }
    };

    preloadImages();
    imagesRef.current = images;

    return () => {
      images.forEach((img) => {
        img.src = "";
      });
    };
  }, [folderPath, frameCount]);

  // Handle canvas resize
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Redraw current frame
      if (imagesLoaded && imagesRef.current[frameIndexRef.current]) {
        drawFrame(frameIndexRef.current);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [imagesLoaded]);

  // Draw frame on canvas
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !imagesRef.current[index]) return;

    const img = imagesRef.current[index];

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate dimensions to maintain aspect ratio (contain fit)
    const canvasAspect = canvas.width / canvas.height;
    const imgAspect = img.width / img.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasAspect > imgAspect) {
      // Canvas is wider than image
      drawHeight = canvas.height;
      drawWidth = img.width * (canvas.height / img.height);
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      // Canvas is taller than image
      drawWidth = canvas.width;
      drawHeight = img.height * (canvas.width / img.width);
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Handle scroll animation
  useEffect(() => {
    if (!imagesLoaded || !containerRef.current) return;

    let rafId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        Math.min(1, -rect.top / (rect.height - window.innerHeight)),
      );

      const frameIndex = Math.floor(scrollProgress * (frameCount - 1));

      if (frameIndex !== frameIndexRef.current) {
        frameIndexRef.current = frameIndex;

        rafId = requestAnimationFrame(() => {
          drawFrame(frameIndex);
        });
      }
    };

    handleScroll(); // Initial draw
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [imagesLoaded, frameCount]);

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Subtle vignette - more focus on the animation */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 pointer-events-none" />

        {!imagesLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="text-white text-xl sm:text-2xl md:text-4xl font-bold mb-4 px-4 text-center">
              Loading Experience...
            </div>
            <div className="w-48 sm:w-64 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <div className="text-white/70 text-sm sm:text-lg mt-2">
              {loadingProgress}%
            </div>
          </div>
        )}

        {/* Scroll Indicator - appears after images load */}
        {imagesLoaded && (
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none animate-bounce">
            <div className="text-white/80 text-xs sm:text-sm uppercase tracking-wider mb-2 px-2">
              Scroll to Explore
            </div>
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
