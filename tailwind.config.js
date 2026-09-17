/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        linen: {
          DEFAULT: '#F5F2EB',
          card: '#EDE8DE',
          border: '#DFD8CB',
          light: '#FAF7F2',
        },
        forest: {
          DEFAULT: '#1E3A2B',
          dark: '#13261C',
          light: '#2D5A43',
          muted: '#4A6956',
        },
        champagne: {
          DEFAULT: '#B89B72',
          light: '#D4BFA0',
          dark: '#9A7D55',
        },
        night: {
          bg: '#111614',
          card: '#19201D',
          border: '#242E29',
          muted: '#313E37',
        }
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.85' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.25s ease-out forwards',
        pulseSlow: 'pulseSlow 3s ease-in-out infinite',
      },
      fontFamily: {
        serif: ['Amiri', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
