/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'black': "#131313",
      'lessblack': "#2B2B2B",
      'gray': "#86868B",
      'blue': "#1561F0",
      'white': "#FFFFFF"
    },
    extend: {},
  },
  plugins: [],
}