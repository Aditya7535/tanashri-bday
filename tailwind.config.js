/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#080808',
          surface: '#111111',
          elevated: '#171717',
          card: 'rgba(23, 23, 23, 0.7)',
        },
        cream: {
          DEFAULT: '#F5F2EC',
          dim: '#E5E2DC',
          muted: '#A7A39B',
        },
        wine: {
          DEFAULT: '#581825',
          dark: '#3A0E18',
          light: '#7A2234',
          glow: 'rgba(88, 24, 37, 0.35)',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.10)',
          light: 'rgba(255, 255, 255, 0.16)',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        handwriting: ['Caveat', 'Kalam', 'cursive'],
      },
      letterSpacing: {
        widest: '.2em',
        editorial: '.15em',
        cinematic: '.3em',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}
