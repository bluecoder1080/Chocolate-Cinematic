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

  // Cinematic text stages - visible from start
  const introOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3],
    [1, 1, 1, 0],
  );
  const introY = useTransform(scrollYProgress, [0, 0.1, 0.3], [0, 0, -100]);
  const introScale = useTransform(scrollYProgress, [0, 0.1], [1, 1]);
  const introBlur = useTransform(scrollYProgress, [0], [0]);

  const storyOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.38, 0.58, 0.68],
    [0, 1, 1, 0],
  );
  const storyY = useTransform(scrollYProgress, [0.3, 0.38, 0.68], [80, 0, -80]);
  const storyScale = useTransform(
    scrollYProgress,
    [0.3, 0.38, 0.58],
    [0.85, 1, 1],
  );
  const storyBlur = useTransform(scrollYProgress, [0.3, 0.38], [8, 0]);

  const highlightOpacity = useTransform(
    scrollYProgress,
    [0.7, 0.78, 0.92, 1],
    [0, 1, 1, 0],
  );
  const highlightY = useTransform(
    scrollYProgress,
    [0.7, 0.78, 1],
    [80, 0, -80],
  );
  const highlightScale = useTransform(
    scrollYProgress,
    [0.7, 0.78, 0.92],
    [0.85, 1, 1],
  );
  const highlightBlur = useTransform(scrollYProgress, [0.7, 0.78], [8, 0]);

  return (
    <div ref={containerRef} className="relative h-[500vh] pointer-events-none">
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center">
        <div className="relative w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-center">
          {/* Intro Stage - Visible from start */}
          <motion.div
            style={{
              opacity: introOpacity,
              y: introY,
              scale: introScale,
            }}
            className="flex flex-col items-center text-center px-4"
          >
            <div className="backdrop-blur-md bg-gradient-to-t from-black/70 via-black/50 to-transparent p-6 md:p-8 rounded-xl border border-white/10 max-w-3xl w-full">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-3 tracking-tight">
                {product.name}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white/95 font-light tracking-wide mb-4">
                {product.subtitle}
              </p>
              <div className="text-2xl md:text-3xl font-bold text-yellow-400">
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
            className="absolute top-20 left-6 md:left-12 right-6 md:right-auto max-w-2xl"
          >
            <div className="backdrop-blur-lg bg-gradient-to-r from-black/75 via-black/60 to-transparent p-5 md:p-7 rounded-xl border border-white/20">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
                The Story
              </h2>
              <p className="text-sm md:text-lg text-white/95 leading-relaxed">
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
            className="absolute inset-x-0 bottom-16 px-6 md:px-12"
          >
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 text-center backdrop-blur-sm bg-black/30 py-4 rounded-xl">
                What Makes It Special
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {product.features.map((feature: string, index: number) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-md p-5 rounded-xl border border-white/10 hover:border-white/30 transition-all"
                  >
                    <div className="text-2xl md:text-3xl mb-3 text-yellow-400">
                      ✦
                    </div>
                    <div className="text-lg md:text-xl text-white font-medium">
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
