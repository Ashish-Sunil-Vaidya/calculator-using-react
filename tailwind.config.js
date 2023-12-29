/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        'primary': 'rgb(var(--color-text) / <alpha-value>)',
        'mutex': 'rgb(var(--color-text-mutex) / .3)',
        'error-error': 'rgb(var(--color-error-text-error) / 1)',
        'error-warning': 'rgb(var(--color-error-text-warning) / 1)',
        'btn_toggle': 'rgb(var(--color-button-secondary) / 1)',
      },
      backgroundColor: {
        'primary': 'rgb(var(--color-bg-primary) / <alpha-value>)',
        'secondary': 'rgb(var(--color-bg-secondary) / <alpha-value>)',
        'btn_calc': 'rgb(var(--color-button-primary) / .35)',
        'btn_calc_hover': 'rgb(var(--color-button-primary) / .75)',
        'btn_toggle_hover': 'rgb(var(--color-button-secondary) / .3)',
        'btn_history': 'rgb(var(--color-button-tertiary) / 0)',
        'btn_history_hover': 'rgb(var(--color-button-tertiary) / .15)',
        'error-error': 'rgb(var(--color-error-bg-error) / .2)',
        'error-error-hover': 'rgb(var(--color-error-bg-error) / .3)',
        'error-warning': 'rgb(var(--color-error-bg-warning) / .2)',
        'error-warning-hover': 'rgb(var(--color-error-bg-warning) / .3)',
      },
      fontSize: {
        'small': '1rem',
        'medium': '2rem',
        'large': '3rem',
      },
      transitionDuration: {
        'variable': 'var(--transition-duration)',
      },
    },
  },
  plugins: [function ({ addUtilities }) {
    const newUtilities = {
      '.hide-scrollbar': {
        'scrollbar-width': 'none',
        '-ms-overflow-style': 'none',
      },
      '.hide-scrollbar::-webkit-scrollbar': {
        display: 'none',
      },
    }
    addUtilities(newUtilities, ['responsive', 'hover'])
  }],
}