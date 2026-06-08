/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-base':     '#0E0C0A',
        'bg-surface':  '#161411',
        'bg-card':     '#1C1814',
        'bg-elevated': '#232018',
        amber: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        violet: {
          50:  '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        // Keep legacy colors so existing classes don't break
        blue: {
          primary:   '#3179BA',
          secondary: '#0B5FFF',
          100: '#CEEAFB', 200: '#9ED6F7', 300: '#6DC1F3',
          400: '#3DADEF', 500: '#0C98EB', 600: '#0A7ABC',
          700: '#075B8D', 800: '#053D5E', 900: '#021E2F',
        },
        gray: {
          100: '#F4F4F4', 200: '#EAEAEA', 300: '#E3E3E3',
          400: '#A3A3A3', 500: '#737373', 600: '#525252',
          700: '#404040', 800: '#262626', 900: '#171717',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        modal:       '0 25px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(245,158,11,0.08)',
        card:        '0 2px 8px rgba(0,0,0,0.5)',
        'card-hover':'0 4px 20px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,158,11,0.15)',
        glow:        '0 0 20px rgba(245,158,11,0.2)',
      },
      height: {
        128: '50rem',
        129: '52.5rem',
      },
    },
  },
  plugins: [],
}
