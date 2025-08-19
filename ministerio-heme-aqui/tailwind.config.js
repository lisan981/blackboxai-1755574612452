/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'pulperia-primary': '#6c9a75',
        'pulperia-primary-dark': '#5b8764',
        'pulperia-accent': '#6c9a75',
        'pulperia-bg-light': '#f7f9f3',
        'pulperia-bg-dark': '#2e3d31',
        'pulperia-text-light': '#2e3d31',
        'pulperia-text-dark': '#f7f9f3',
        'pulperia-card-light': '#ffffff',
        'pulperia-card-dark': '#3b503e',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
