/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          900: '#0B0E17', // Quase preto (fundo profundo)
          800: '#151932', // Azul noite
          700: '#1E2342', // Azul escuro suave
          600: '#2A325E', // Azul intermediário
        },
        neon: {
          blue: '#00F0FF', // Ciano brilhante
          purple: '#B026FF', // Roxo elétrico
          green: '#00FF94', // Verde matrix
          pink: '#FF0055', // Rosa laser
        },
        surface: {
          dark: 'rgba(21, 25, 50, 0.7)', // Vidro escuro
          light: 'rgba(255, 255, 255, 0.05)', // Vidro claro
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(to bottom right, #0B0E17, #151932)',
        'glow-conic': 'conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)',
      }
    },
  },
  plugins: [],
}
