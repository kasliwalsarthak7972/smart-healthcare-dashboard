/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        healthcare: {
          blue: '#0ea5e9',
          green: '#10b981',
          red: '#ef4444',
          yellow: '#f59e0b',
          purple: '#8b5cf6',
          pink: '#ec4899',
          teal: '#14b8a6',
          indigo: '#6366f1',
        },
        gradient: {
          start: '#667eea',
          middle: '#764ba2',
          end: '#f093fb',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        'ocean-gradient': 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ec4899 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)',
        'forest-gradient': 'linear-gradient(135deg, #10b981 0%, #0ea5e9 50%, #8b5cf6 100%)',
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          }
        },
        'glow': {
          '0%': {
            'box-shadow': '0 0 5px rgba(14, 165, 233, 0.5), 0 0 10px rgba(14, 165, 233, 0.3)',
          },
          '100%': {
            'box-shadow': '0 0 20px rgba(14, 165, 233, 0.8), 0 0 30px rgba(14, 165, 233, 0.5)',
          }
        }
      },
    },
  },
  plugins: [],
}
