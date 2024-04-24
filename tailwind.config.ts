import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      main: "#DAD7CD",
      secant: "#A3B18A",
      secant2: "#344E41",
      secant3: "#3A5A40",
      interactive: "#910A67",
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "black",
      gray: {
        "300": "#b1b1b1",
        "500": "#7f7f7f",
        "700": "#4d4d4d",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
