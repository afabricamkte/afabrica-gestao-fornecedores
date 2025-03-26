/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#010d36',
          secondary: '#dfd7c0',
          tertiary: '#fef9ef',
        },
      },
    },
    plugins: [],
  }