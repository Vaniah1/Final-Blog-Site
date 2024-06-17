/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors:{
      "light": "#9fccc6",
      "blog":"#334f48",
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
