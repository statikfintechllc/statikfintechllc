// @ts-nocheck
const path = require('path');

const contentRoots = [
  path.join(__dirname, '../**/*.{html,js,ts,tsx}'),
  path.join(__dirname, '../../www/**/*.{html,js}'),
  path.join(__dirname, '../../dev/**/*.{html,js}'),
  path.join(__dirname, '../../server/**/*.{html,js}')
];

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: contentRoots,
  prefix: "",
  theme: {
    extend: {
      colors: {
        // Import from your existing CSS variables
        border: "var(--glass-border)",
        input: "var(--glass-border)",
        ring: "var(--primary-color)",
        background: "var(--bg-dark)",
        foreground: "var(--text-light)",
        primary: {
          DEFAULT: "var(--primary-color)",
          foreground: "var(--text-light)",
        },
        secondary: {
          DEFAULT: "var(--secondary-color)",
          foreground: "var(--bg-dark)",
        },
        accent: {
          DEFAULT: "var(--secondary-color)",
          foreground: "var(--bg-dark)",
        },
        card: {
          DEFAULT: "var(--glass-bg)",
          foreground: "var(--text-light)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}