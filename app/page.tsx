"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import ProductCanvasScroll from "@/components/ProductCanvasScroll";
import ProductTextOverlays from "@/components/ProductTextOverlays";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProduct = products[currentIndex];

  // Update CSS variable for background gradient
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--current-gradient",
      currentProduct.gradient,
    );
    document.body.style.background = currentProduct.gradient;
  }, [currentProduct]);

  const handlePrevious = () => {
    setCurrentIndex((prev: number) =>
      prev === 0 ? products.length - 1 : prev - 1,
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    setCurrentIndex((prev: number) =>
      prev === products.length - 1 ? 0 : prev + 1,
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectFlavor = (index: number) => {
    setCurrentIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen pt-12 sm:pt-16">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProduct.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Canvas Animation + Text Overlays Section */}
          <section className="relative">
            <ProductCanvasScroll folderPath={currentProduct.folderPath} />
            <div className="absolute inset-0 pointer-events-none">
              <ProductTextOverlays product={currentProduct} />
            </div>
          </section>

          {/* Flavor Story Section */}
          <section className="py-8 sm:py-16 md:py-32 px-4 sm:px-6 md:px-12 relative">
            {/* Section transition overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-transparent pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
              >
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 sm:mb-5">
                    The Story Behind
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed mb-5 sm:mb-6">
                    {currentProduct.description}
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-4">
                    {currentProduct.features.map(
                      (feature: string, index: number) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="px-3 sm:px-4 md:px-6 py-2 md:py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs sm:text-sm md:text-base"
                        >
                          <span className="text-white font-medium">
                            {feature}
                          </span>
                        </motion.div>
                      ),
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                  {currentProduct.stats.map(
                    (stat: { label: string; value: string }, index: number) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                        className="text-center p-3 sm:p-6 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20"
                      >
                        <div className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
                          {stat.value}
                        </div>
                        <div className="text-xs sm:text-sm md:text-base text-white/70">
                          {stat.label}
                        </div>
                      </motion.div>
                    ),
                  )}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Chocolate Details Section */}
          <section className="py-8 sm:py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-black/20">
            <div className="max-w-6xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3 sm:mb-6"
              >
                {currentProduct.name}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-xl md:text-2xl text-white/70 mb-8 sm:mb-12"
              >
                {currentProduct.subtitle}
              </motion.p>

              {/* Pricing + Buy Now */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="inline-block"
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/20">
                  <div className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-2 sm:mb-4">
                    {currentProduct.price}
                  </div>
                  <div className="text-sm sm:text-base text-white/60 mb-6 sm:mb-8">
                    Per 100g Premium Bar
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold text-sm sm:text-lg rounded-full glow-hover"
                  >
                    Buy Now
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Next Flavor CTA */}
          {currentIndex < products.length - 1 && (
            <section className="py-12 sm:py-20 md:py-32 px-4 sm:px-6 md:px-12">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto text-center"
              >
                <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                  Discover More Flavors
                </h3>
                <p className="text-sm sm:text-lg md:text-xl text-white/70 mb-6 sm:mb-8">
                  Experience our complete collection of premium chocolates
                </p>
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 sm:px-10 py-3 sm:py-4 bg-white/20 backdrop-blur-md text-white font-semibold text-sm sm:text-lg rounded-full border border-white/30 hover:bg-white/30 transition-all"
                >
                  Next Flavor →
                </motion.button>
              </motion.div>
            </section>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="hidden sm:block fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-40">
        <motion.button
          onClick={handlePrevious}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-xl md:text-2xl hover:bg-white/20 transition-all"
          aria-label="Previous flavor"
        >
          ←
        </motion.button>
      </div>

      <div className="hidden sm:block fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40">
        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-xl md:text-2xl hover:bg-white/20 transition-all"
          aria-label="Next flavor"
        >
          →
        </motion.button>
      </div>

      {/* Bottom Flavor Selector Pills */}
      <div className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 px-4 w-full sm:w-auto">
        <div className="flex gap-2 sm:gap-3 bg-black/40 backdrop-blur-lg rounded-full p-2 border border-white/20 overflow-x-auto w-full sm:w-auto justify-center">
          {products.map((product: (typeof products)[0], index: number) => (
            <motion.button
              key={product.id}
              onClick={() => handleSelectFlavor(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full font-medium transition-all text-xs sm:text-sm md:text-base whitespace-nowrap flex-shrink-0 ${
                index === currentIndex
                  ? "bg-white text-black"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <span className="hidden md:inline">{product.name}</span>
              <span className="md:hidden text-xs">
                {product.name.split(" ")[0]}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </main>
  );
}
