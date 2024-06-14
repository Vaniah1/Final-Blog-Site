/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors:{
      "light": "#D7A2A2",
      "blog":"#A25A5A",
      "card": "#D9D9D9", 
      "layout": "#DFDDE5",
      "acc": "#A2D7A2"
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar'),
  ],
};
