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
        primary: {
          DEFAULT: "#2563eb",
          light: "#dbeafe",
          dark: "#1e40af",
        },
        accent: {
          DEFAULT: "#059669",
          light: "#d1fae5",
          dark: "#047857",
        },
        danger: {
          DEFAULT: "#dc2626",
          light: "#fee2e2",
          dark: "#991b1b",
        },
        warning: {
          DEFAULT: "#d97706",
          light: "#fef3c7",
          dark: "#92400e",
        },
        purple: {
          DEFAULT: "#7c3aed",
          light: "#ede9fe",
          dark: "#5b21b6",
        },
        pink: {
          DEFAULT: "#db2777",
          light: "#fce7f3",
          dark: "#9d174d",
        },
      },
      fontFamily: {
        bengali: ["Hind Siliguri", "Noto Sans Bengali", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        "card-sm": "10px",
      },
      boxShadow: {
        card: "0 4px 20px rgba(0,0,0,0.08)",
        fab: "0 4px 10px rgba(37,99,235,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;