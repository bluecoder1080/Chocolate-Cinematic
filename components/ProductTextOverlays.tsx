"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Product } from "@/data/products";

interface ProductTextOverlaysProps {
  product: Product;
}

export default function ProductTextOverlays({
  product,
}: ProductTextOverlaysProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Cinematic text stages - mobile-optimized visibility
  // Intro stays visible longer for mobile users to read
  const introOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.4],
    [1, 1, 0.8, 0],
  );
  const introY = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 0, -50]);
  const introScale = useTransform(scrollYProgress, [0, 0.15], [1, 1]);
  const introBlur = useTransform(scrollYProgress, [0], [0]);

  // Story appears earlier and stays longer on mobile
  const storyOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.35, 0.55, 0.65],
    [0, 1, 1, 0],
  );
  const storyY = useTransform(
    scrollYProgress,
    [0.25, 0.35, 0.65],
    [60, 0, -60],
  );
  const storyScale = useTransform(
    scrollYProgress,
    [0.25, 0.35, 0.55],
    [0.9, 1, 1],
  );
  const storyBlur = useTransform(scrollYProgress, [0.25, 0.35], [6, 0]);

  // Highlights appear sooner
  const highlightOpacity = useTransform(
    scrollYProgress,
    [0.6, 0.7, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const highlightY = useTransform(
    scrollYProgress,
    [0.6, 0.7, 0.95],
    [60, 0, -60],
  );
  const highlightScale = useTransform(
    scrollYProgress,
    [0.6, 0.7, 0.85],
    [0.9, 1, 1],
  );
  const highlightBlur = useTransform(scrollYProgress, [0.6, 0.7], [6, 0]);

  return (
    <div
      ref={containerRef}
      className="relative h-[300vh] sm:h-[350vh] md:h-[500vh] pointer-events-none"
    >
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center">
        <div className="relative w-full h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-center">
          {/* Intro Stage - Visible from start */}
          <motion.div
            style={{
              opacity: introOpacity,
              y: introY,
              scale: introScale,
            }}
            className="flex flex-col items-center text-center px-3 sm:px-4"
          >
            <div className="backdrop-blur-md bg-gradient-to-t from-black/70 via-black/50 to-transparent p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl border border-white/10 max-w-3xl w-full">
              <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
                {product.name}
              </h1>
              <p className="text-xs sm:text-base md:text-lg lg:text-xl text-white/95 font-light tracking-wide mb-2 sm:mb-3">
                {product.subtitle}
              </p>
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-400">
                {product.price}
              </div>
            </div>
          </motion.div>

          {/* Story Stage - Left side, readable */}
          <motion.div
            style={{
              opacity: storyOpacity,
              y: storyY,
              scale: storyScale,
            }}
            className="absolute top-20 sm:top-24 left-3 sm:left-6 md:left-12 right-3 sm:right-6 md:right-auto max-w-2xl"
          >
            <div className="backdrop-blur-lg bg-gradient-to-r from-black/75 via-black/60 to-transparent p-3 sm:p-5 md:p-7 rounded-lg sm:rounded-xl border border-white/20">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
                The Story
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-white/95 leading-relaxed">
                {product.description}
              </p>
            </div>
          </motion.div>

          {/* Highlight Stage - Floating cards at bottom */}
          <motion.div
            style={{
              opacity: highlightOpacity,
              y: highlightY,
              scale: highlightScale,
              filter: `blur(${highlightBlur}px)`,
            }}
            className="absolute inset-x-0 bottom-16 sm:bottom-20 px-3 sm:px-6 md:px-12"
          >
            <div className="max-w-5xl mx-auto">
              <h2 className="text-lg sm:text-2xl md:text-4xl font-bold text-white mb-3 sm:mb-6 text-center backdrop-blur-sm bg-black/30 py-2 sm:py-3 rounded-lg sm:rounded-xl px-3">
                What Makes It Special
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                {product.features.map((feature: string, index: number) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-md p-2 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border border-white/10 hover:border-white/30 transition-all"
                  >
                    <div className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 text-yellow-400">
                      ✦
                    </div>
                    <div className="text-xs sm:text-sm md:text-lg text-white font-medium">
                      {feature}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
