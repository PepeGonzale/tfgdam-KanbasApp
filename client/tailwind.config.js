/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {},
    colors: {

      black: "black",
      white: "white",

      blue: {
        primary: "#3179BA"
    },
    yellow: {
        100: "#FFFBEA",
        200: "#FFF3C4",
        300: "#FCE588",
        400: "#FADB5F",

        500: "#F7C948",
        600: "#F0B429",
        700: "#DE911D",
        800: "#CB6E17",
        900: "#B44D12"
    },
    gray: {
        
        100: "#F4F4F4",
        200: "#EAEAEA",
        300: "#E3E3E3",
        400: "#A3A3A3",
        500: "#737373",
        600: "#525252", 
        700: "#404040",
        800: "#262626",
        900: "#171717"
    },
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
}
