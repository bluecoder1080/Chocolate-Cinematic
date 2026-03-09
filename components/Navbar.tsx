"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Brand */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="text-xl md:text-2xl font-bold text-gradient cursor-pointer"
        >
          Chocolate Cinematic
        </motion.div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <motion.a
            href="#flavors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white/80 hover:text-white transition-colors text-sm"
          >
            Flavors
          </motion.a>
          <motion.a
            href="#about"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white/80 hover:text-white transition-colors text-sm"
          >
            About
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white/80 hover:text-white transition-colors text-sm"
          >
            Contact
          </motion.a>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2 md:px-6 md:py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-full glow-hover text-xs md:text-sm"
        >
          Shop Now
        </motion.button>
      </div>
    </motion.nav>
  );
}
