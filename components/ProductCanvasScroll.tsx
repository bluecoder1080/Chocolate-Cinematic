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
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const [allFramesLoaded, setAllFramesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const imagesRef = useRef<Array<HTMLImageElement | null>>([]);
  const loadedFramesRef = useRef<Set<number>>(new Set());
  const desiredFrameRef = useRef(0);
  const frameIndexRef = useRef(0);

  const getFrameSrc = (index: number) => {
    const frameNumber = String(index + 1).padStart(3, "0");
    return `${folderPath}/ezgif-frame-${frameNumber}.jpg`;
  };

  const getNearestLoadedFrameIndex = (targetIndex: number) => {
    if (loadedFramesRef.current.size === 0) return null;
    if (loadedFramesRef.current.has(targetIndex)) return targetIndex;

    for (let offset = 1; offset < frameCount; offset++) {
      const previousIndex = targetIndex - offset;
      const nextIndex = targetIndex + offset;

      if (previousIndex >= 0 && loadedFramesRef.current.has(previousIndex)) {
        return previousIndex;
      }
      if (nextIndex < frameCount && loadedFramesRef.current.has(nextIndex)) {
        return nextIndex;
      }
    }

    return null;
  };

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !imagesRef.current[index]) return;

    const img = imagesRef.current[index];
    if (!img) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const canvasAspect = canvas.width / canvas.height;
    const imgAspect = img.width / img.height;

    let drawWidth;
    let drawHeight;
    let offsetX;
    let offsetY;

    if (canvasAspect > imgAspect) {
      drawHeight = canvas.height;
      drawWidth = img.width * (canvas.height / img.height);
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = img.height * (canvas.width / img.width);
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  const drawNearestLoadedFrame = (targetIndex: number) => {
    const nearestIndex = getNearestLoadedFrameIndex(targetIndex);
    if (nearestIndex === null) return;
    drawFrame(nearestIndex);
  };

  // Progressive preload: first frame fast, remaining frames in background
  useEffect(() => {
    let cancelled = false;
    let nextFrameToQueue = 1;
    let activeRequests = 0;
    const maxConcurrent = window.innerWidth < 768 ? 4 : 8;
    const createdImages: HTMLImageElement[] = [];

    imagesRef.current = Array.from({ length: frameCount }, () => null);
    loadedFramesRef.current = new Set();
    setLoadingProgress(0);
    setFirstFrameLoaded(false);
    setAllFramesLoaded(false);
    frameIndexRef.current = 0;
    desiredFrameRef.current = 0;

    const markFrameComplete = (
      index: number,
      image: HTMLImageElement | null,
    ) => {
      if (cancelled) return;

      if (image) {
        imagesRef.current[index] = image;
      }

      if (!loadedFramesRef.current.has(index)) {
        loadedFramesRef.current.add(index);
      }

      setLoadingProgress(
        Math.floor((loadedFramesRef.current.size / frameCount) * 100),
      );

      if (index === 0) {
        setFirstFrameLoaded(true);
        requestAnimationFrame(() => {
          drawNearestLoadedFrame(0);
        });
      }

      if (index === desiredFrameRef.current) {
        requestAnimationFrame(() => {
          drawNearestLoadedFrame(index);
        });
      }

      if (loadedFramesRef.current.size === frameCount) {
        setAllFramesLoaded(true);
      }
    };

    const loadFrame = (index: number, onDone?: () => void) => {
      const img = new Image();
      img.decoding = "async";
      img.src = getFrameSrc(index);
      createdImages.push(img);

      img.onload = () => {
        markFrameComplete(index, img);
        onDone?.();
      };

      img.onerror = () => {
        console.warn(`Failed to load image: ${img.src}`);
        markFrameComplete(index, null);
        onDone?.();
      };
    };

    const pumpQueue = () => {
      if (cancelled) return;

      while (activeRequests < maxConcurrent && nextFrameToQueue < frameCount) {
        const frameToLoad = nextFrameToQueue;
        nextFrameToQueue++;
        activeRequests++;

        loadFrame(frameToLoad, () => {
          activeRequests--;
          pumpQueue();
        });
      }
    };

    loadFrame(0, pumpQueue);

    return () => {
      cancelled = true;
      createdImages.forEach((img) => {
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

      if (firstFrameLoaded) {
        drawNearestLoadedFrame(frameIndexRef.current);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [firstFrameLoaded, frameCount]);

  // Handle scroll animation
  useEffect(() => {
    if (!firstFrameLoaded || !containerRef.current) return;

    let rafId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        Math.min(1, -rect.top / (rect.height - window.innerHeight)),
      );

      const frameIndex = Math.floor(scrollProgress * (frameCount - 1));
      desiredFrameRef.current = frameIndex;

      if (frameIndex !== frameIndexRef.current) {
        frameIndexRef.current = frameIndex;

        rafId = requestAnimationFrame(() => {
          drawNearestLoadedFrame(frameIndex);
        });
      }
    };

    handleScroll(); // Initial draw
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [firstFrameLoaded, frameCount]);

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Subtle vignette - more focus on the animation */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 pointer-events-none" />

        {!firstFrameLoaded && (
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

        {firstFrameLoaded && !allFramesLoaded && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 text-white/80 text-xs sm:text-sm pointer-events-none">
            Optimizing frames {loadingProgress}%
          </div>
        )}

        {/* Scroll Indicator - appears after images load */}
        {firstFrameLoaded && (
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
