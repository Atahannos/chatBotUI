/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./public/index.html"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
