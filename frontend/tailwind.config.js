/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'darkBg': '#070F2B',
        'lightBg': '#DFF2EB',
        'darkHeader': '#03045E',
        'lightHeader': '#90E0EF',
        'darkMenu': '#023E8A',
        'lightMenu': '#48CAE4',
        'darkLive': '#0077B6',
        'lightLive': '#00B4D8',
        'darkHover': '#0096C7',
        'lightHover': '#90E0F3',
        'darkPanel': '#083D77',
        'lightPanel': '#90E0F3',
        'darkText': '#DFF2EB',
        'lightText': '#000000',
        'darkButton': '#4A628A',
        'lightButton': '#0D47A1',
      }
    },
  },
  plugins: [],
}