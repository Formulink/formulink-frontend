/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "main-blue": "#5146E5",

      },
      fontFamily: {
        "sf-regular": ["sf-regular", "sans-serif"],
        "sf-bold": ["sf-bold", "sans-serif"],
      },
    },
  },
  plugins: [],
}
