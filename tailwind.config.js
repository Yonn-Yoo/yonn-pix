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
        shake: 'shake 2.4s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
        shake: {
          '0%': {
            transform: 'translateX(0)',
          },
          '25%': {
            transform: 'translateY(-9px) scale(150%)',
          },
          '35%': {
            transform: 'translateY(-9px) scale(150%) rotate(17deg)',
          },
          '55%': {
            transform: 'translateY(-9px) scale(150%) rotate(-17deg)',
          },
          '65%': {
            transform: 'translateY(-9px) scale(150%) rotate(17deg)',
          },
          '75%': {
            transform: 'translateY(-9px) scale(150%) rotate(-17deg)',
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
