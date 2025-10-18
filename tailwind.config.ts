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
        // Using RGB values for opacity support
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        coral: "rgb(var(--color-coral) / <alpha-value>)",
        mint: "rgb(var(--color-mint) / <alpha-value>)",
        purple: "rgb(var(--color-purple) / <alpha-value>)",
        sunset: "rgb(var(--color-sunset) / <alpha-value>)",
        cream: "rgb(var(--color-cream) / <alpha-value>)",
        steel: "rgb(var(--color-steel) / <alpha-value>)",
        midnight: "rgb(var(--color-midnight) / <alpha-value>)",
      },
      borderColor: {
        border: "rgb(var(--color-ink) / <alpha-value>)", 
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        display: ["Clash Display", "var(--font-syne)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["2rem", { lineHeight: "2.5rem" }],
        "4xl": ["2.5rem", { lineHeight: "3rem" }],
        "5xl": ["3rem", { lineHeight: "3.5rem" }],
        "6xl": ["4rem", { lineHeight: "4.5rem" }],
        "7xl": ["5rem", { lineHeight: "5.5rem" }],
        "8xl": ["6rem", { lineHeight: "6.5rem" }],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      transitionTimingFunction: {
        smooth: "var(--ease-smooth)",
        bounce: "var(--ease-bounce)",
        elastic: "var(--ease-elastic)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;