/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "custom-light": "#F9F1E7", // You can name it anything you like
        customGray: "#F4F5F7", // Add your custom color here
        lightGray: "#898989", // Add your custom color here
        opacityGray: "rgba(58, 58, 58, 0.8)",
        creamGray: "rgba(176, 176, 176, 0.8)", // Custom gray color
        brownCustom: "rgba(184, 142, 47, 1)", // Custom brown color
        customBg: "rgba(249, 241, 231, 1)", // Custom background color
        customFooter: "rgba(159, 159, 159, 1)",
        customWhite: "rgba(255, 255, 255, 1)",
        customBeige: "rgba(249, 241, 231, 1)",
        custom: "rgba(249, 241, 231, 1)",
        blackRgba: "rgba(0, 0, 0, 1)",
        customGold: "#B88E2F",
        customPurple: "#816DFA",
        BlackColor: "#000000",
        customGray2: "#D9D9D9",
        customGrayBorder: "#9F9F9F",
        customYellow: "#B88E2F", // You can name it anything you want
        // customGray: "#9F9F9F", // Name the color as desired
        "custom-pink": "rgb(253, 61, 181)",
        100: "rgb(255, 229, 246)", // lightest
        200: "rgb(255, 199, 237)",
        300: "rgb(255, 170, 228)",
        "soft-white": "#ffffff",
      },
    },
  },
  plugins: [],
};
