import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        /* Masala palette — anchored on #B45309 (700) */
        nerd: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
          950: "#451A03",
        },
        ink: {
          950: "#1C1006",
          900: "#2B1C0D",
          800: "#3E2A18",
          700: "#59402A",
        },
        muted: "#7A6B5B",
        cream: "#FAF6EF",
        paper: "#FAF6EF",
        brand: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
        gain: "#B45309",
        loss: "#C24130",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        site: "1200px",
        prose: "720px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(28,16,6,.05), 0 4px 16px -6px rgba(28,16,6,.10)",
        "card-hover": "0 2px 6px rgba(28,16,6,.08), 0 14px 36px -10px rgba(180,83,9,.22)",
        terminal: "0 0 0 1px rgba(28,16,6,0.08), 0 4px 16px -6px rgba(28,16,6,0.10)",
        menu: "0 8px 16px -4px rgba(28,16,6,.12), 0 24px 48px -12px rgba(28,16,6,.18)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 60s linear infinite",
        "fade-up": "fade-up .5s ease both",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
