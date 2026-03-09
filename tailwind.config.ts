import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
      colors: {
        dark: {
          brown: "#3E2723",
          deep: "#1B1B1B",
        },
        lemon: {
          light: "#FFF176",
          DEFAULT: "#FDD835",
        },
        strawberry: {
          light: "#EF5350",
          deep: "#C62828",
        },
      },
    },
  },
  plugins: [],
};
export default config;
