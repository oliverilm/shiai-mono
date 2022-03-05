const colors = require('tailwindcss/colors');

module.exports = {
  theme: {
    screens: {
      phone: '460px',
      tablet: '640px',
      md: '640px',
      // => @media (min-width: 640px) { ... }

      laptop: '1024px',
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      desktop: '1280px',
      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    colors: {
      gray: colors.coolGray,
      blue: colors.sky,
      red: colors.rose,
      green: colors.green,
      pink: colors.fuchsia,
      white: colors.white,
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['focus-visible'],
      opacity: ['disabled'],
    },
  },
};
