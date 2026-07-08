import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Locale-driven token colors — pull from CSS variables
        locale: {
          bg: 'var(--locale-bg-solid)',
          surface: 'var(--locale-surface)',
          'surface-hover': 'var(--locale-surface-hover)',
          card: 'var(--locale-card-bg)',
          primary: 'var(--locale-primary)',
          'primary-hover': 'var(--locale-primary-hover)',
          'primary-fg': 'var(--locale-primary-fg)',
          secondary: 'var(--locale-secondary)',
          'secondary-hover': 'var(--locale-secondary-hover)',
          accent: 'var(--locale-accent)',
          'accent-light': 'var(--locale-accent-light)',
          border: 'var(--locale-border)',
          'border-hover': 'var(--locale-border-hover)',
          text: 'var(--locale-text-primary)',
          'text-secondary': 'var(--locale-text-secondary)',
          'text-muted': 'var(--locale-text-muted)',
          success: 'var(--locale-success)',
          'success-light': 'var(--locale-success-light)',
          warning: 'var(--locale-warning)',
          'warning-light': 'var(--locale-warning-light)',
          error: 'var(--locale-error)',
          'error-light': 'var(--locale-error-light)',
          'nav-bg': 'var(--locale-nav-bg)',
          'nav-border': 'var(--locale-nav-border)',
          'nav-text': 'var(--locale-nav-text)',
          'nav-hover': 'var(--locale-nav-hover)',
          'nav-active': 'var(--locale-nav-active)',
          'nav-active-fg': 'var(--locale-nav-active-fg)',
          'logo-bg': 'var(--locale-logo-bg)',
          'logo-fg': 'var(--locale-logo-fg)',
          'badge-active': 'var(--locale-badge-active)',
          'badge-active-fg': 'var(--locale-badge-active-fg)',
        },
        // Keep some legacy surface colors for dark mode
        surface: '#f8fafc',
      },
      boxShadow: {
        soft: '0 4px 24px var(--locale-shadow-color, rgba(0,0,0,0.06)), 0 1px 4px rgba(0,0,0,0.04)',
        card: '0 8px 32px var(--locale-shadow-color, rgba(0,0,0,0.08)), 0 2px 8px rgba(0,0,0,0.04)',
        lang: '0 16px 48px var(--locale-shadow-color, rgba(0,0,0,0.12)), 0 4px 12px rgba(0,0,0,0.06)',
        glow: '0 0 0 3px var(--locale-focus-ring)',
      },
      ringColor: {
        locale: 'var(--locale-focus-ring)',
      },
      backgroundImage: {
        'locale-gradient': 'var(--locale-bg)',
        'locale-card-glass': 'var(--locale-card-bg-glass)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeSlideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        borderPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.4s linear infinite',
        'fade-slide-up': 'fadeSlideUp 0.5s ease forwards',
        'border-pulse': 'borderPulse 2.5s ease-in-out infinite',
        'scale-in': 'scaleIn 0.4s ease forwards',
      },
    },
  },
  plugins: [],
} satisfies Config;
