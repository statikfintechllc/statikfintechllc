/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}',
    './public_html/**/*.{html,js}',
    './components/**/*.{ts,tsx}',
  ],
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