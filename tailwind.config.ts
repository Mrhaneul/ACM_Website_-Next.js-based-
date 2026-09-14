import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#004aad",
          deep: "#003a88",
          ink: "#0b1f44",
        },
        accent: "#58cbf7",
        paper: "#f6f8fb",
        ink: {
          DEFAULT: "#0f172a",
          2: "#334155",
          3: "#64748b",
        },
        line: "#e2e8f0",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "62ch",
      },
    },
  },
  plugins: [],
} satisfies Config;
