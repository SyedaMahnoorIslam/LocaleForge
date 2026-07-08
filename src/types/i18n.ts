export type LocaleDirection = 'ltr' | 'rtl';

export interface LocalePalette {
  // Base backgrounds
  bg: string;
  bgSolid: string;
  gradientFrom: string;
  gradientTo: string;
  // Surfaces
  cardBg: string;
  cardBgGlass: string;
  surface: string;
  surfaceHover: string;
  // Primary identity
  primary: string;
  primaryHover: string;
  primaryForeground: string;
  // Secondary
  secondary: string;
  secondaryHover: string;
  // Accent
  accent: string;
  accentLight: string;
  // Borders
  border: string;
  borderHover: string;
  // Text
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  // Semantic
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  error: string;
  errorLight: string;
  // Navbar
  navBg: string;
  navBorder: string;
  navText: string;
  navHover: string;
  navActive: string;
  navActiveFg: string;
  // Logo
  logoBg: string;
  logoFg: string;
  // Focus ring
  focusRing: string;
  // Shadow
  shadowColor: string;
  // Badge
  badgeActive: string;
  badgeActiveFg: string;
}

export interface LocaleDetails {
  label: string;
  value: string;
  currency: string;
  timezone: string;
  direction: LocaleDirection;
  dateFormat: Intl.DateTimeFormatOptions;
  timeFormat: Intl.DateTimeFormatOptions;
  nativeName?: string;
  flag?: string;
  description?: string;
  culturalIcon?: string;
  palette?: LocalePalette;
}
