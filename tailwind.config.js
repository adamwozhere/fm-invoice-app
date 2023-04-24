/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      violet: 'hsl(252, 94%, 67%)',
      crocus: 'hsl(252, 100%, 73%)',
      ebony: 'hsl(233, 31%, 17%)',
      midnight: 'hsl(233, 30%, 21%)',
      mist: 'hsl(231, 73%, 93%)',
      raincloud: 'hsl(231, 20%, 61%)',
      lilac: 'hsl(231, 37%, 63%)',
      onyx: 'hsl(228, 29%, 7%)',
      watermelon: 'hsl(0, 80%, 63%)',
      salmon: 'hsl(0, 100%, 80%)',
      snow: 'hsl(240, 27%, 98%)',
      jet: 'hsl(233, 30%, 11%)',
      white: 'hsl(0, 0%, 100%)',
      gunpowder: 'hsl(231, 20%, 27%)',
      stone: 'hsl(232, 20%, 36%)',
      shadow: 'hsl(232, 38%, 45%, 10%)',
      pumpkin: 'hsl(34, 100%, 50%)',
      apple: 'hsl(160, 67%, 52%)',
      frost: 'hsl(228, 71%, 99%)',
      graphite: 'hsl(225, 14%, 53%)',
    },
    fontSize: {
      sm: [
        '0.8125rem',
        {
          lineHeight: '1.385',
          letterSpacing: '-0.1px',
          fontWeight: '500',
        },
      ],
      xl: [
        '2.25rem',
        {
          lineHeight: '0.917',
          letterSpacing: '-1px',
          fontWeight: '700',
        },
      ],
    },
    extend: {
      fontFamily: {
        sans: ['League Spartan', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
