module.exports = {
  prefix: '',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
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
  plugins: [],
}
