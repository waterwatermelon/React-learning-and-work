module.exports = {
  prefix: '',
  // presets: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    container: {
      padding: '2rem',
    },
    extend: {
      colors: {
        orange: {
          200: '#fc9',
          300: '#fb7',
          400: '#fa6',
          500: '#ea6',
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
