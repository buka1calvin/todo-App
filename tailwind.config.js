/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:"#6d28d9",
        secondary:"#059669",
        third:"#f5c802"
      },

      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'amiri': ['Amiri', 'serif'],
        'noto': ['Noto Sans Arabic', 'sans-serif'],
        'outfit':['Outfit','sans-serif']
      },
      screens:{
        xs:{max:"450px"},
        img:{max:"900px"}
      }
    }
  },
  plugins: [
    require('daisyui'),
  ],
}

