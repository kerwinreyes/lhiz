/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      serif: ["Playfair Display", ...defaultTheme.fontFamily.sans],
      sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      colors:{
        'luxe-brown': "#322D29",
        'luxe-red': "#72383D",
        'luxe-nude': "#AC9C8D",
        'luxe-pink': "#D1C7BD",
        'luxe-blue': "#D9D9D9",
        'luxe-light': "#EFE9E1",
      }
    },

  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}