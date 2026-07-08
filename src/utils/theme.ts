import type { LocalePalette } from '../types/i18n';
import type { ThemeMode } from '../constants/theme';

export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'light';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(themeMode: ThemeMode) {
  const resolvedTheme = themeMode === 'system' ? getSystemTheme() : themeMode;
  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
}

/**
 * Applies a full locale palette as CSS custom properties on :root
 * Triggers smooth transitions via the `locale-transition` class
 */
export function applyLocalePalette(palette?: LocalePalette) {
  if (!palette) return;

  const root = document.documentElement;

  // Add transition class for smooth animation
  root.classList.add('locale-transition');

  const vars: Record<string, string> = {
    '--locale-bg': palette.bg,
    '--locale-bg-solid': palette.bgSolid,
    '--locale-gradient-from': palette.gradientFrom,
    '--locale-gradient-to': palette.gradientTo,
    '--locale-card-bg': palette.cardBg,
    '--locale-card-bg-glass': palette.cardBgGlass,
    '--locale-surface': palette.surface,
    '--locale-surface-hover': palette.surfaceHover,
    '--locale-primary': palette.primary,
    '--locale-primary-hover': palette.primaryHover,
    '--locale-primary-fg': palette.primaryForeground,
    '--locale-secondary': palette.secondary,
    '--locale-secondary-hover': palette.secondaryHover,
    '--locale-accent': palette.accent,
    '--locale-accent-light': palette.accentLight,
    '--locale-border': palette.border,
    '--locale-border-hover': palette.borderHover,
    '--locale-text-primary': palette.textPrimary,
    '--locale-text-secondary': palette.textSecondary,
    '--locale-text-muted': palette.textMuted,
    '--locale-success': palette.success,
    '--locale-success-light': palette.successLight,
    '--locale-warning': palette.warning,
    '--locale-warning-light': palette.warningLight,
    '--locale-error': palette.error,
    '--locale-error-light': palette.errorLight,
    '--locale-nav-bg': palette.navBg,
    '--locale-nav-border': palette.navBorder,
    '--locale-nav-text': palette.navText,
    '--locale-nav-hover': palette.navHover,
    '--locale-nav-active': palette.navActive,
    '--locale-nav-active-fg': palette.navActiveFg,
    '--locale-logo-bg': palette.logoBg,
    '--locale-logo-fg': palette.logoFg,
    '--locale-focus-ring': palette.focusRing,
    '--locale-shadow-color': palette.shadowColor,
    '--locale-badge-active': palette.badgeActive,
    '--locale-badge-active-fg': palette.badgeActiveFg,
  };

  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value);
  }

  // Remove transition class after animation completes
  const remove = () => root.classList.remove('locale-transition');
  setTimeout(remove, 600);
}
