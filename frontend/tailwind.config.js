/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        tertiary: "rgb(var(--color-tertiary) / <alpha-value>)",
        background: "rgb(var(--color-background) / <alpha-value>)",
        text: "rgb(var(--color-text) / <alpha-value>)",
      },
    },
  },
  plugins: [],
}
