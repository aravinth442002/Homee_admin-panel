/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 🔥 REQUIRED
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        "primary-light": "var(--color-primary-light)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        quaternary: "var(--color-quaternary)",
        quinary: "var(--color-quinary)",
        background: "var(--color-background)",
        dark: "var(--color-dark)",
      },
    },
  },
  plugins: [],
}
