/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          gold: '#B76E79',
          light: '#D4949C',
        },
        burgundy: {
          DEFAULT: '#722F37',
          dark: '#5A252C',
          light: '#8A3A43',
        },
        blush: {
          DEFAULT: '#F2D7D9',
          light: '#F9ECED',
        },
        cream: {
          DEFAULT: '#FFF8F0',
          dark: '#F5EDE3',
        },
        noir: {
          DEFAULT: '#2A1A1C',
          light: '#3D262A',
        },
        midnight: {
          DEFAULT: '#4A1C24',
          light: '#632530',
        },
        lavender: {
          DEFAULT: '#E8D5E0',
          light: '#F0E4EC',
        },
        pearl: '#FEFEFE',
        gold: {
          DEFAULT: '#C9A96E',
          light: '#D4B87F',
          dark: '#B8860B',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['Outfit', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(42, 26, 28, 0.06)',
        'medium': '0 4px 12px rgba(42, 26, 28, 0.08)',
        'strong': '0 8px 30px rgba(42, 26, 28, 0.12)',
        'glow': '0 0 30px rgba(183, 110, 121, 0.3)',
        'glow-gold': '0 0 30px rgba(201, 169, 110, 0.3)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #B76E79 0%, #722F37 100%)',
        'gradient-hero': 'linear-gradient(135deg, #5A252C 0%, #722F37 50%, #B76E79 100%)',
        'gradient-gold': 'linear-gradient(135deg, #C9A96E 0%, #D4A853 50%, #B8860B 100%)',
        'gradient-dark': 'linear-gradient(180deg, #2A1A1C 0%, #4A1C24 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(183, 110, 121, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(183, 110, 121, 0.4)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
