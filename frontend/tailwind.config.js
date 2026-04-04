/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        border: 'var(--border)',
        comicYellow: '#FFC82C',
        comicRed: '#FF2E2E',
        comicBlue: '#2B82F6',
        comicBlack: '#161616',
        comicWhite: '#F8F9FA'
      },
      fontFamily: {
        bangers: ['var(--font-bangers)', 'cursive'],
        comic: ['var(--font-comic-neue)', 'cursive', 'sans-serif'],
      },
      boxShadow: {
        'comic': '8px 8px 0px 0px rgba(22,22,22,1)',
        'comic-hover': '4px 4px 0px 0px rgba(22,22,22,1)',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
};
