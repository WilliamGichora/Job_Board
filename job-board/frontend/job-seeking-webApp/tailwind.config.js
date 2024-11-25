/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        specialBlue: {
          100: "#C4D7FF",
          500: '#5B86E5'
        },
        specialGrey: {
          100: '#A6AEBF'
        }
      },
    },
  },
  plugins: [],
}

