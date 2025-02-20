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
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
      },
      animation: {
        shake: 'shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
      },
    },
  },
  plugins: [import('@tailwindcss/line-clamp')],
};
