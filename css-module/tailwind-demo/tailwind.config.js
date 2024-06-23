/** @type {import('tailwindcss').Config} */

const plugins = require('tailwindcss/plugin')

module.exports = {
  content: [
    "index.html",
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#ff0000",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      purple: "#3f3cbb",
      midnight: "#121063",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
    },
  },
  plugins: [
    plugin(function ({addComponents}) {
      addComponents({
        ".btn": {
          padding: ".5rem 1rem",
          borderRadius: ".5rem",
          border: "1px solid transparent",
        },
        ".btn-blue": {
          @apply text-white;
          @apply bg-blue-500;
          @apply border-blue-500;
        },
        ".btn-blue:hover": {
          @apply bg-blue-700;
          @apply border-blue-700;
        },
      })
    }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
  presets:[
    require('./my-preset.js')
  ]
};

// module.exports = {
//   content: {
//     relative: true,
//     files: ["./pages/**/*.{html,js}", "./components/**/*.{html,js}"],
//   },
//   // ...
// };
