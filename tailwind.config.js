/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        primary: "#3E8DF5",
        "light-blue": "#F1F6FB",
      },
    },
  },
  mode: "jit",
  plugins: [require("@tailwindcss/forms")],
};
