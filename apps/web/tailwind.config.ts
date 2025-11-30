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
        brand: {
          primary: "#4F46E5", // Electric Indigo
          secondary: "#22D3EE", // Cyan
        },
        bg: {
          dark: "#0F172A",
          light: "#F8FAFC",
        },
        text: {
          onDark: "#E2E8F0",
          onLight: "#1E293B",
          gray: "#94A3B8",
        },
        border: {
          dark: "rgba(255,255,255,0.08)",
          light: "#E5E7EB",
        },
        status: {
          error: "#EF4444",
          success: "#10B981",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-jetbrains-mono)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
