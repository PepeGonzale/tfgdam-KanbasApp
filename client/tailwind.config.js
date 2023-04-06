/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {},
   /*  colors: {
      blue: {
        100: "#ceeafb",
        200: "#9ed6f7",
        300: "#6dc1f3",
        400: "#3dadef",
        500: "#0c98eb",
        600: "#0a7abc",
        700: "#075b8d",
        800: "#053d5e",
        900: "#021e2f"
},
    }, */
    height: {
      '128': '50rem',
      '129':'52.5rem'
    }
  },
  plugins: [],
}
