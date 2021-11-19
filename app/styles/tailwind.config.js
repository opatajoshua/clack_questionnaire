module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'yellow-accent-dark': '#694C00',
        'yellow-accent': '#F0DFB3',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      display: ['dark'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
