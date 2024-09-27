/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        gray: {
          "100": "rgba(0, 0, 0, 0.05)",
          "200": "rgba(0, 0, 0, 0.6)",
          "300": "rgba(0, 0, 0, 0.3)",
          "400": "rgba(0, 0, 0, 0.5)",
          "500": "rgba(0, 0, 0, 0.1)",
        },
        gainsboro: "rgba(217, 217, 217, 0.5)",
      },
      spacing: {},
      fontFamily: {
        roboto: "Roboto",
      },
      borderRadius: {
        xl: "20px",
        "81xl": "100px",
        "11xl": "30px",
        "13xl": "32px",
      },
    },
    fontSize: {
      xl: "20px",
      base: "16px",
      sm: "14px",
      xs: "12px",
      "21xl": "40px",
      "18xl-5": "37.5px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};

