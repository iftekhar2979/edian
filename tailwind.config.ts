/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Make sure to include all file types used in your project
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'], // For the logo font
      },
      colors: {
        gray: {
          100: '#f7f7f7', // Light gray background color (for navbar)
          200: '#e0e0e0', // Slightly darker gray (for border)
          700: '#4b4b4b', // Darker gray (for text)
        },
      },
      spacing: {
        128: '32rem', // For any custom spacing, if you need it
      },
      boxShadow: {
        custom: '0 4px 6px rgba(0, 0, 0, 0.1)', // Custom shadow for elements like navbars
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Optional: adds form styles
    require('@tailwindcss/typography'), // Optional: improves typography support
    require('@tailwindcss/aspect-ratio'), // Optional: for aspect ratio utility
  ],
};
