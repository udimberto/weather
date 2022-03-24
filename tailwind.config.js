const colors = require('./colors.config.js')

module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/contexts/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
}
