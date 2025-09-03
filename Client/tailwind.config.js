/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#F1F0E9",
          DEFAULT: "#3B82F6",
          dark: "#0D4715",
        },
      },
    },
  },
  plugins: [],
};
