/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Шлях до всіх файлів, де ви використовуєте класи Tailwind
  ],
  theme: {
    extend: {
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
