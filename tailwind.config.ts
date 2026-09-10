import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f8f4',
          100: '#e1efe6',
          200: '#c5e0cf',
          300: '#9ccbb0',
          400: '#6eb08d',
          500: '#48956e',
          600: '#347756',
          700: '#2c5f46',
          800: '#264c39',
          900: '#213f31',
          950: '#11231b',
        },
        charcoal: {
          50: '#f8faf9',
          100: '#f1f4f2',
          200: '#e2e7e4',
          300: '#cbd3ce',
          400: '#94a199',
          500: '#64746c',
          600: '#47544e',
          700: '#38433e',
          800: '#262e2a',
          900: '#181f1c',
        },
        sand: {
          50: '#fcfbfa',
          100: '#f7f6f2',
          200: '#eeece4',
          300: '#ded9cb',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'soft-md': '0 8px 24px -4px rgba(0, 0, 0, 0.06), 0 4px 10px -2px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 16px 36px -6px rgba(0, 0, 0, 0.08), 0 6px 14px -3px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
};
export default config;
