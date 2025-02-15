/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        aliceblue: "#F0F8FF", // Light blue shade
        flax: "#EEDC82", // Yellowish-brown
        champagne: "#EFDFBB", // Soft beige
        cream: "#FFFDD0", // Pale cream
        peach: "#FFE5B4", // Light peach
        honeydew: "#E9FFDB", // Light greenish-white
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
