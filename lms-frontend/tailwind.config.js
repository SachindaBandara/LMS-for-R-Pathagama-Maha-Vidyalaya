/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          900: '#4E0A0A', // Dark maroon
        },
        gold: {
          500: '#F9C524', // Gold
          600: '#E5C100', // Darker gold for hover
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        kumbh: ['"Kumbh Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};