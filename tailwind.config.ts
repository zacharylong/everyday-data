import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        midnight: "#0a0a12",
        "midnight-2": "#111120",
        "midnight-3": "#1a1a2e",
        surface: "#1e1e30",
        "surface-2": "#252540",
        border: "#2e2e4a",
        // NYU Violet family
        violet: {
          DEFAULT: "#57068c",
          dark: "#3d0563",
          light: "#7a1db8",
          muted: "#6b21a8",
        },
        // Cyan accent (data-viz feel)
        cyan: {
          DEFAULT: "#22d3ee",
          dark: "#0891b2",
          muted: "#67e8f9",
        },
        // Text
        "text-primary": "#f0f0f8",
        "text-secondary": "#9090b0",
        "text-muted": "#5a5a78",
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.05" }],
        "display-lg": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.1" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.15" }],
      },
      backgroundImage: {
        "violet-radial":
          "radial-gradient(ellipse at 20% 50%, rgba(87,6,140,0.15) 0%, transparent 60%)",
        "cyan-radial":
          "radial-gradient(ellipse at 80% 20%, rgba(34,211,238,0.08) 0%, transparent 50%)",
        "grid-pattern":
          "linear-gradient(rgba(46,46,74,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(46,46,74,0.3) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "60px 60px",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
