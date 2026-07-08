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

export function applyLocalePalette(palette?: {
  bg?: string;
  gradientFrom?: string;
  gradientTo?: string;
  accent?: string;
  cardBg?: string;
  buttonBg?: string;
  border?: string;
}) {
  if (!palette) return;
  const root = document.documentElement;
  // Background gradient or fallback
  if (palette.bg) root.style.setProperty('--bg', palette.bg.includes('linear-gradient') ? palette.bg : palette.bg);
  if (palette.gradientFrom) root.style.setProperty('--bg-gradient-from', palette.gradientFrom);
  if (palette.gradientTo) root.style.setProperty('--bg-gradient-to', palette.gradientTo);
  if (palette.accent) root.style.setProperty('--accent', palette.accent);
  if (palette.cardBg) root.style.setProperty('--card-bg', palette.cardBg);
  if (palette.buttonBg) root.style.setProperty('--button-bg', palette.buttonBg);
  if (palette.border) root.style.setProperty('--border', palette.border);
}
