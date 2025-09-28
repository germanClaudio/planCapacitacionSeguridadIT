/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./**/*.html",
      "./src/**/*.js", 
      "./*.html",
      "./*.php", // si usas PHP
      // Agrega todas las rutas donde uses clases Tailwind
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }