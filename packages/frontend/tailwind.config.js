/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi'],
        serif: ['Satoshi'],
        mono: ['Satoshi'],
        display: ['Satoshi'],
        body: ['Satoshi'],
      },
      colors: {
        primary: '#231212',
        secondary: '#e3e2f7',
        lightGray: '#f4f4f4',
        white: '#ffffff',
      },
    },
  },
  plugins: [import('@tailwindcss/line-clamp')],
};
