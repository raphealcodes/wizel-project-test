/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8158F3",
        secondary: "#121212",
        accent: "#E5E5E5",
      },
      borderRadius: {
        5 : "5px",
      },
      padding: {
        25: '25px',
        170: '170px',
        72: '72px',
        98: '98px',
        15: '15px'
      },
      margin: {
        25: '25px'
      },
      lineHeight: {
        17.5: '17.5px',
        25: '25px',
        22.5: '22.5px'
      },
      height: {
        72: '72px',
        45: '45px'
      },
    },
  },
  plugins: [],
}

