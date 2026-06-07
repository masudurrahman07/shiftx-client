module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: "#8083ff",
        secondary: "#6f00be",
        surface: "#0b1326",
        card: "rgba(30, 41, 59, 0.4)",
      },
      boxShadow: {
        glow: "0 10px 40px rgba(128,131,255,0.25)",
      },
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  plugins: [],
};