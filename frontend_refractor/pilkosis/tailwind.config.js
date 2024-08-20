/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#FFC788",
        "secondary": "#FFB765",
        "thirdtiary": '#FFDFBB',
        "accent-primary": "#B56000",
        "accent-secondary": "#c29562"
      },
      screens: {
        "xs": "375px",
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
      }
    },
  },
  plugins: [],
};
