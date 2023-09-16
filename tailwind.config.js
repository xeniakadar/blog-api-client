/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: "480px",
      md: "770px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      fontFamily: {
        primary: ["Roboto"],
        secondary: ["Urbanist"],
      },
    },
  },
  plugins: [],
};
