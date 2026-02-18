import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "space-dark": "#0a0e1a",
        "space-darker": "#050810",
        "neon-cyan": "#00f3ff",
        "neon-purple": "#b537ff",
        "neon-green": "#39ff14",
        "neon-red": "#ff073a",
        "neon-gold": "#ffd700",
        "card-bg": "rgba(20, 25, 40, 0.95)",
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        exo: ["var(--font-exo)", "sans-serif"],
        rajdhani: ["var(--font-rajdhani)", "sans-serif"],
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(0, 243, 255, 0.4)",
        "glow-purple": "0 0 20px rgba(181, 55, 255, 0.4)",
        "glow-gold": "0 0 24px rgba(255, 215, 0, 0.5)",
      },
      animation: {
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        hologram: "hologram 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.4" },
        },
        hologram: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      perspective: {
        "1000": "1000px",
      },
    },
  },
  plugins: [],
};

export default config;
