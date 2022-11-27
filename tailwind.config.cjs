module.exports = {
  content:["./src/**/*.{js,jsx}"],
  theme: {
    backgroundImage: {
      'tile': "url('./assets/smiley.svg')",
      'confetti': "url('./assets/confetti.svg')",
    },
    colors: {
      'black': '#000000',
      'white': '#FFFFFF',
      'dark-yellow': '#fab304',
      'light-yellow': '#ffff8f',
      'brown': '#b2861b',
      'purple': '#6b569e',
      'gray': '#2b3f3b',
    },
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
        }
      },
      animation: {
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      transitionDuration: {
        '2000': '2000ms',
      }
    },
  },
  plugins: [],
}