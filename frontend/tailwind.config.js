/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Шлях до всіх файлів, де ви використовуєте класи Tailwind
  ],
  theme: {
    extend: {
      colors: {
        custom: 'var(--100, #F3F4F6)',
        gray: '#D1D2D6',
        'gray-text': '#9D9D9D',
        'gray-border': '#D3D4D8'
      },
      fontFamily: {
        aeroport: ['Aeroport', 'sans-serif'], // Додаємо Aeroport
      },
      fontWeight: {
        400: '400',
        500: '500',
        900: '900',
      },
    },
  },
  plugins: [],
};
