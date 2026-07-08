import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n, { loadLocaleResources, supportedLanguages } from '../config/i18n';
import { loadItem, saveItem } from '../utils/storage';
import { localeMap } from '../constants/locales';
import { applyLocalePalette } from '../utils/theme';
import type { SupportedLanguage } from '../config/i18n';

type I18nContextValue = {
  language: SupportedLanguage;
  direction: 'ltr' | 'rtl';
  timezone: string;
  currentLocale: typeof localeMap[SupportedLanguage];
  setLanguage: (language: SupportedLanguage) => Promise<void>;
  setTimezone: (timezone: string) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { i18n: i18nInstance } = useTranslation();
  const storedLanguage = loadItem<SupportedLanguage>('language', 'en');
  const storedTimezone = loadItem<string>('timezone', localeMap[storedLanguage].timezone);

  const [language, setLanguageState] = useState<SupportedLanguage>(storedLanguage);
  const [timezone, setTimezoneState] = useState<string>(storedTimezone);

  useEffect(() => {
    // Set initial language if different from current
    if (i18nInstance.language !== storedLanguage) {
      void i18nInstance.changeLanguage(storedLanguage);
      setLanguageState(storedLanguage);
    }
    // Apply palette for stored language immediately
    applyLocalePalette(localeMap[storedLanguage]?.palette);
  }, [storedLanguage, i18nInstance]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = localeMap[language].direction;
  }, [language]);

  const setLanguage = async (lng: SupportedLanguage) => {
    if (lng === language) {
      return;
    }

    await loadLocaleResources(lng);
    await i18nInstance.changeLanguage(lng);
    setLanguageState(lng);
    saveItem('language', lng);
    // Apply per-locale palette and direction immediately
    applyLocalePalette(localeMap[lng]?.palette);
  };

  const setTimezone = (zone: string) => {
    setTimezoneState(zone);
    saveItem('timezone', zone);
  };

  const value = useMemo(
    () => ({
      language,
      direction: localeMap[language].direction,
      timezone,
      currentLocale: localeMap[language],
      setLanguage,
      setTimezone,
    }),
    [language, timezone],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
