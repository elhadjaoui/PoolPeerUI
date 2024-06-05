/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef

import anim from 'tailwindcss-animated'
import daisy from 'daisyui'
import hidescroll from 'tailwind-scrollbar-hide'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    anim,
    daisy,
    hidescroll
  ],
}