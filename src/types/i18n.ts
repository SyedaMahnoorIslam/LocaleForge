export type LocaleDirection = 'ltr' | 'rtl';

export interface LocaleDetails {
  label: string;
  value: string;
  currency: string;
  timezone: string;
  direction: LocaleDirection;
  dateFormat: Intl.DateTimeFormatOptions;
  timeFormat: Intl.DateTimeFormatOptions;
  // Presentation metadata
  nativeName?: string;
  flag?: string;
  description?: string;
  // Palette for language-specific theming
  palette?: {
    bg?: string;
    gradientFrom?: string;
    gradientTo?: string;
    accent?: string;
    cardBg?: string;
    buttonBg?: string;
    border?: string;
  };
}
