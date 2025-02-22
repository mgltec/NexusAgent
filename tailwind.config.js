/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'xs': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      maxWidth: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px'
      },
      gridRow: {
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-12': 'span 12 / span 12',
      },
      gridTemplateColumns: {
        // Add custom columns here
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '17': 'repeat(17, minmax(0, 1fr))',
        '18': 'repeat(18, minmax(0, 1fr))',
        '19': 'repeat(19, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      height: {
        screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
      },
      minHeight: {
        screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
      },
      fontFamily: {
        cabin: ['Cabin', 'sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
      },
      fontSize: {
        'xxxs': '8px',
        'xxs': '10px'
      },
      colors: {
        'light-background': '#f0f2f5',
        'white-opacity-10': 'rgba(255, 255, 255, 0.1)',
        'white-opacity-20': 'rgba(255, 255, 255, 0.2)',
        'white-opacity-30': 'rgba(255, 255, 255, 0.3)',
        'white-opacity-40': 'rgba(255, 255, 255, 0.4)',
        'white-opacity-50': 'rgba(255, 255, 255, 0.5)',
        'white-opacity-60': 'rgba(255, 255, 255, 0.6)',
        'white-opacity-70': 'rgba(255, 255, 255, 0.7)',
        'white-opacity-80': 'rgba(255, 255, 255, 0.8)',
        'white-opacity-90': 'rgba(255, 255, 255, 0.9)',
        'black-opacity-10': 'rgba(0, 0, 0, 0.1)',
        'black-opacity-20': 'rgba(0, 0, 0, 0.2)',
        'black-opacity-30': 'rgba(0, 0, 0, 0.3)',
        'black-opacity-40': 'rgba(0, 0, 0, 0.4)',
        'black-opacity-50': 'rgba(0, 0, 0, 0.5)',
        'black-opacity-60': 'rgba(0, 0, 0, 0.6)',
        'black-opacity-60': 'rgba(0, 0, 0, 0.7)',
        'black-opacity-60': 'rgba(0, 0, 0, 0.8)',
        'black-opacity-60': 'rgba(0, 0, 0, 0.9)',
        'nav': '#181b2c',
        'idle': '#3b5998',
        'nav-disabled': '#020b14',
        'selected': '#042a51',
        'custom-pink': '#f75da2',
        'custom-green': '#53d337',
        'custom-gray-100': '#eceff6',
        'custom-gray-200': '#e5e8ef',
        'custom-gray-300': '#ccd1d6',
        'custom-gray-400': '#bcbcc4',
        'custom-gray-500': '#8d8e9d',
        'custom-gray-600': '#6a6b7d',
        'secondary-light': '#e39448',
        'secondary-dark': '#d56038',
        'primary-light': '#471638',
        'primary-dark': '#353448',
        'input-outline': 'rgb(106 107 125)',
        'primary-landing': 'rgb(13, 5, 109)',
        'secondary-landing': 'rgb(224, 4, 20)'
      }
    },
  },
  plugins: [
  ],
}
