/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
  "./node_modules/tw-elements/dist/js/**/*.js"],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [require("flowbite/plugin")],
}

