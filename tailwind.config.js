module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Fira Code', 'monospace']
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
