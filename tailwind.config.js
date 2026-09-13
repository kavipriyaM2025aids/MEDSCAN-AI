/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        navy: {
          800: '#0f172a',
          850: '#0d1527',
          900: '#0b132b',
          950: '#070b1a',
        },
        medical: {
          teal: '#00A896',
          cyan: '#0284C7',
          emerald: '#10B981',
          danger: '#EF4444',
          amber: '#F59E0B',
          purple: '#8B5CF6',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 10px 30px -4px rgba(0, 0, 0, 0.07), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'cyan-glow': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
        'emerald-glow': '0 0 25px -5px rgba(16, 185, 129, 0.35)',
      },
      keyframes: {
        scan: {
          '0%, 100%': { top: '5%' },
          '50%': { top: '90%' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.03)' },
        },
        ringPing: {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '70%, 100%': { transform: 'scale(1.4)', opacity: '0' },
        }
      },
      animation: {
        'scan-line': 'scan 3s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 2.5s ease-in-out infinite',
        'ring-ping': 'ringPing 1.8s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
};
