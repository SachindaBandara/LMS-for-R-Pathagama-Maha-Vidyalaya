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
          900: '#4A0000', // Dark maroon
        },
        gold: {
          500: '#FFD700', // Gold
          600: '#E5C100', // Darker gold for hover
        },
      },
    },
  },
  plugins: [],
};