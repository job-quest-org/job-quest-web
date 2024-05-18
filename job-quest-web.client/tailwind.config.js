module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        'briem-hand': ['Briem Hand', 'sans-serif']
      },
      backgroundImage: {
        'svg-background': "url('./common/assets/background.svg')"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}