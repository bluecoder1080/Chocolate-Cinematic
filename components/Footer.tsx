"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    brand: {
      title: "Brand",
      links: ["About Us", "Our Story", "Sustainability", "Careers"],
    },
    products: {
      title: "Products",
      links: ["Dark Chocolate", "Lemon White", "Strawberry", "Gift Sets"],
    },
    support: {
      title: "Support",
      links: ["Contact", "FAQ", "Shipping", "Returns"],
    },
  };

  return (
    <footer className="bg-neutral-950 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-4">
              Chocolate Cinematic
            </h3>
            <p className="text-white/60 mb-6 leading-relaxed">
              Crafting premium chocolate experiences that engage all your
              senses. Each piece tells a story.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <span className="text-lg">📷</span>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Twitter"
              >
                <span className="text-lg">🐦</span>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <span className="text-lg">📘</span>
              </motion.a>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {footerLinks.products.title}
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.links.map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {footerLinks.support.title}
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.links.map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-white/60 mb-4">
              Subscribe for exclusive offers and updates.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-yellow-400 text-white placeholder-white/40"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg glow-hover"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} Chocolate Cinematic. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <motion.a
              href="#"
              whileHover={{ color: "#ffffff" }}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ color: "#ffffff" }}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ color: "#ffffff" }}
              className="hover:text-white transition-colors"
            >
              Cookie Policy
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
