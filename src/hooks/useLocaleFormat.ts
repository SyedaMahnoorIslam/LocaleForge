import { useMemo } from 'react';
import { useI18n } from '../contexts/I18nContext';
import { localeMap } from '../constants/locales';

export function useLocaleFormat() {
  const { language, timezone } = useI18n();
  const locale = useMemo(() => language, [language]);
  const localeSettings = useMemo(() => localeMap[language], [language]);

  const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat(locale, { timeZone: timezone, ...localeSettings.dateFormat, ...options }).format(date);
  };

  const formatTime = (date: Date, options?: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat(locale, { timeZone: timezone, ...localeSettings.timeFormat, ...options }).format(date);
  };

  const formatNumber = (value: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(locale, options).format(value);
  };

  const formatCurrency = (amount: number, currency?: string) => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: currency ?? localeSettings.currency }).format(amount);
  };

  const formatRelative = (date: Date) => {
    const seconds = Math.floor((date.getTime() - Date.now()) / 1000);
    const intervals = [
      { unit: 'day', value: 86400 },
      { unit: 'hour', value: 3600 },
      { unit: 'minute', value: 60 },
      { unit: 'second', value: 1 },
    ] as const;

    const { unit, value } = intervals.reduce(
      (acc, current) => {
        if (Math.abs(seconds) >= current.value) {
          return { unit: current.unit, value: Math.round(seconds / current.value) };
        }
        return acc;
      },
      { unit: 'second' as const, value: seconds },
    );

    return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(value, unit);
  };

  return {
    formatDate,
    formatTime,
    formatNumber,
    formatCurrency,
    formatRelative,
  };
}
