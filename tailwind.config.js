/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        shake: 'shake 3.4s infinite cubic-bezier(.36,.07,.19,.97) both ',
      },
      keyframes: {
        shake: {
          '0%': {
            transform: 'translateX(0)',
          },
          '5%': {
            transform: 'translateY(-9px) scale(110%)',
          },
          '10%': {
            transform: 'translateY(-9px) scale(110%) rotate(17deg)',
          },
          '15%': {
            transform: 'translateY(-9px) scale(110%) rotate(-17deg)',
          },
          '20%': {
            transform: 'translateY(-9px) scale(110%) rotate(17deg)',
          },
          '25%': {
            transform: 'translateY(-9px) scale(110%) rotate(-17deg)',
          },
          '30%': {
            transform: 'translateY(-9px) scale(110%) rotate(17deg)',
          },
          '35%': {
            transform: 'translateY(-9px) scale(110%) rotate(-17deg)',
          },
          '40%': {
            transform: 'translateY(-9px) scale(110%) rotate(17deg)',
          },
          '45%': {
            transform: 'translateY(-9px) scale(110%) rotate(-17deg)',
          },
          '50%': {
            transform: 'translateY(0) rotate(0)',
          },
          '100%': {
            transform: 'translateY(0) rotate(0)',
          },
        },
      },
    },
    plugins: [],
  },
};
