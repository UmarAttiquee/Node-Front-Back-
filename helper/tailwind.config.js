/** @type {import('tailwindcss').Config ,} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Important for React components
  ],
  darkMode: "selector",
  theme: {
    extend: {},
  },
  plugins: [],
};
