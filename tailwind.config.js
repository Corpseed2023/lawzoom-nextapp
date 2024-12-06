/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gilroy: ['"Gilroy-Heavy"', "sans-serif"],
      },
      colors: {
        "custom-blue": "#093252",
        "link-color": "#1677ff",
      },
      boxShadow: {
        "form-shadow":
          "rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
      },
      scale: {
        101: "1.01",
      },
      width:{
        '99%':'99%'
      }
    },
  },
  plugins: [],
};
