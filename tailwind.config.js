module.exports = {
  purge: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'my-white': '#F6EDD9',
        'my-olive': "#808000",
        'my-brown': "#967969",
        'my-brown-2': "#C04000",
        "my-blue": "#56B4D3"
      },
      fontFamily: {
        'custom-1': ['var(--custom-font-1)'],
        'custom-2': ['var(--custom-font-2)'],
        'custom-3': ['var(--custom-font-3)']
      },
    },
  },
  variants: {
    display: ['group-hover'],
  },
  plugins: [],
}
