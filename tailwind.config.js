/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero_pattern': "url('/Image/Anime.gif')",
        
      }
    }

  },
  plugins: [],
}