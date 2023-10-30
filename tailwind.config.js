/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      backgroundColor: {
        primary: '#FF5A3D',
        light: {
          white: '#ffffff',
          seashell: '#fff2f0',
          'alice-blue': '#f0f7ff',
          'cultured-1': '#ededed',
          'cultured-2': '#f2f6f7',
          'cultured-3': '#FBFBFB',
        },
        dark: {
          black: '#000000',
          'raisin-black-1': '#181c2b',
          'raisin-black-2': '#282B39',
          'prussian-blue': '#0B2C3C',
          'jungle-green': '#071a1d',
        },
        colors: {
          cadet: '#5d737e',
          opal: '#8bb1b1',
          'misty-rose': '#f5dedb',
          'yellow-green': '#76C520',
        },
      },

      textColor: {
        primary: '#FF5A3D',
        light: {
          white: '#ffffff',
          seashell: '#fff2f0',
          'alice-blue': '#f0f7ff',
          'cultured-1': '#ededed',
          'cultured-2': '#f2f6f7',
          'cultured-3': '#FBFBFB',
        },
        dark: {
          black: '#000000',
          'raisin-black-1': '#181c2b',
          'raisin-black-2': '#282B39',
          'prussian-blue': '#0B2C3C',
          'jungle-green': '#071a1d',
        },
        colors: {
          cadet: '#5d737e',
          opal: '#8bb1b1',
          'misty-rose': '#f5dedb',
          'yellow-green': '#76C520',
        },
      },

      borderColor: {
        primary: '#FF5A3D',
        light: {
          white: '#ffffff',
          seashell: '#fff2f0',
          'alice-blue': '#f0f7ff',
          'cultured-1': '#ededed',
          'cultured-2': '#f2f6f7',
          'cultured-3': '#FBFBFB',
        },
        dark: {
          black: '#000000',
          'raisin-black-1': '#181c2b',
          'raisin-black-2': '#282B39',
          'prussian-blue': '#0B2C3C',
          'jungle-green': '#071a1d',
        },
        colors: {
          cadet: '#5d737e',
          opal: '#8bb1b1',
          'misty-rose': '#f5dedb',
          'yellow-green': '#76C520',
        },
      },
    },
  },
  plugins: [],
}
