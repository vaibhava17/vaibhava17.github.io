/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: {
    relative: true,
    base: 'src',
    files: ['**/*.html', '**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.mdx', '**/*.md'],
  },
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#FFFFFF',
      darkblue: '#2B4560',
      ivory:'#E1E7E0',
      tiffany:'#6AA4B0', 
      midnightblue:'#2F6D80',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {},
    screens: {
      'xs': '480px',
      ...defaultTheme.screens,
    }
  },
  variants: {},
  plugins: [],
}
