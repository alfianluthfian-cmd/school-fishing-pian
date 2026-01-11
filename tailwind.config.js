/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sea-deep': '#0a3d62',
        'sea-blue': '#1e5f8e',
        'ocean': '#2d7a9f',
        'teal': '#14b8a6',
        'teal-light': '#5eead4',
        'water': '#a7f3d0',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
