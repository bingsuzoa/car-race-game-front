/** @type { import('tailwindcss').Config } */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'stage-gold': {
          50: '#fff9e6',
          100: '#fff2cc',
          200: '#ffe699',
          300: '#ffd966',
          400: '#ffcd33',
          500: '#ffc000',
          600: '#cc9a00',
          700: '#997300',
          800: '#664d00',
          900: '#332600',
        },
        'spotlight': {
          light: '#fff8e6',
          medium: '#ffd966',
          dark: '#997300',
        }
      },
      animation: {
        'spotlight-sweep': 'sweep 4s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        sweep: {
          '0%, 100%': { transform: 'rotate(-15deg) scale(1.1)', opacity: '0.7' },
          '50%': { transform: 'rotate(15deg) scale(1.2)', opacity: '0.9' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'stage': '0 0 60px -15px rgba(0, 0, 0, 0.3)',
        'spotlight': '0 0 80px 20px rgba(255, 205, 51, 0.3)',
      }
    },
  },
  plugins: [],
} 