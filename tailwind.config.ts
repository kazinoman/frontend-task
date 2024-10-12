import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#633cff",
        secondary: "#beadff",
        border: "#d9d9d9",
        white: "#ffffff",
        background1: "#FAFAFA",
        titleColor: "#333333",
        text1: "#737373",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem", // Default padding for all screen sizes
          sm: "2rem", // Padding for small screens
          md: "4rem", // Padding for medium screens
          lg: "2rem", // Padding for large screens
          xl: "1rem", // Padding for extra-large screens
          "2xl": "1rem", // Padding for 2XL screens
        },
      },
    },

    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
export default config;
