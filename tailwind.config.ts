import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 16px 48px rgba(15, 23, 42, 0.08)',
      },
      colors: {
        surface: '#f8fafc',
        border: '#e2e8f0',
        primary: '#2563eb',
        primaryDark: '#1d4ed8',
      },
    },
  },
  plugins: [],
} satisfies Config;
