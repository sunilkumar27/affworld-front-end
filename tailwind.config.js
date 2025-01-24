// tailwind.config.js
/**
 * Defines custom color palette and theme extensions
 */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7C3BEC",
        background: '#030711',
        section: '#25272C',
        secondary: '#0da2e7',
        card: {
          bg: "#041829",
          border: "#7C3BEC"
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#8A8C96"
        },
        column: {
          bg: "#25272C"
        },
        gradient: {
          'start': '#020A16',
          'end': '#05253A'
        }
      }
    },
  },
  plugins: [],
}