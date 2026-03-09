/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#dc2626',
          deep: '#0f172a',
          panel: '#f8fafc'
        }
      },
      boxShadow: {
        soft: '0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.06)'
      }
    }
  },
  plugins: []
};
