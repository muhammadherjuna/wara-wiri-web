import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#0066CC",
          50:  "#E6F0FA",
          100: "#CCE0F5",
          200: "#99C2EB",
          300: "#66A3E0",
          400: "#3385D6",
          500: "#0066CC",
          600: "#0052A3",
          700: "#003D7A",
          800: "#002952",
          900: "#001429",
        },
        secondary: {
          DEFAULT: "#FF6B35",
          50:  "#FFF0EB",
          100: "#FFE1D6",
          200: "#FFC3AD",
          300: "#FFA585",
          400: "#FF875C",
          500: "#FF6B35",
          600: "#CC562A",
          700: "#994020",
          800: "#662B15",
          900: "#33150B",
        },
        accent: {
          DEFAULT: "#FFC93C",
          50:  "#FFF8E8",
          100: "#FFF1D0",
          200: "#FFE3A1",
          300: "#FFD572",
          400: "#FFC93C",
          500: "#FFBE0D",
          600: "#CC980A",
          700: "#997208",
          800: "#664C05",
          900: "#332603",
        },
        dark: {
          DEFAULT: "#0A1929",
          50:  "#E8EDF2",
          100: "#D0DAE5",
          200: "#A1B5CB",
          300: "#7290B1",
          400: "#436B97",
          500: "#14467D",
          600: "#0F3463",
          700: "#0A2349",
          800: "#0A1929",
          900: "#050D15",
        },
        light: {
          DEFAULT: "#F8FAFC",
          50:  "#FFFFFF",
          100: "#F8FAFC",
          200: "#EEF2F7",
          300: "#E2E8F0",
          400: "#CBD5E1",
          500: "#94A3B8",
          600: "#64748B",
          700: "#475569",
          800: "#334155",
          900: "#1E293B",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-down": "slideDown 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(16px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-16px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
