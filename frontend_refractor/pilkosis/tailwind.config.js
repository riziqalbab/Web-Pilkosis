/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#FFC788",
        "secondary": "#FFB765",
        "accent-primary": "#B56000",
        "accent-secondary": "#c29562"
      }
    },
  },
  plugins: [],
};
