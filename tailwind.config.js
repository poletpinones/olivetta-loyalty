/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: '#C2714F',
        olive: '#8A9A5B',
        cream: '#F5EDD6',
        azure: '#2E5FA3',
        espresso: '#2C1A0E',
        'terracotta-light': '#D4916E',
        'cream-dark': '#EBE0C0',
        'olive-dark': '#70804A',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
