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
    screens: {
      // Custom breakpoints: 'mobile' and 'desktop' are intentionally non-overlapping.
      // 'mobile' applies up to 768px (inclusive), 'desktop' starts at 769px.
      // This creates a 1px gap at exactly 768px where neither applies.
      'mobile': {'max': '768px'},
      'desktop': {'min': '769px'},
      // Keep standard breakpoints for backwards compatibility
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
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
        // Domain-specific colors
        'www': { 
          accent: '#E11D48',
          highlight: '#FCD34D'
        },
        'dev': { 
          accent: '#3B82F6',
          highlight: '#10B981'
        },
        'server': { 
          accent: '#8B5CF6',
          highlight: '#F59E0B'
        }
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