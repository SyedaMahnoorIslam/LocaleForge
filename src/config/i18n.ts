import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    common: {
      appName: 'LocaleForge',
      description: 'A localization showcase for modern SaaS experiences.',
      openMenu: 'Open main menu',
      themeState: 'Theme: {{theme}}',
      emptyState: 'No results found. Try a different search.',
      backHome: 'Back to dashboard',
      settingsTitle: 'Settings',
    },
    dashboard: {
      welcomeTitle: 'Global experience',
      welcomeSubtitle: 'Welcome back, {{name}}',
      welcomeDescription: 'Track localization performance, review real-time data, and adapt every experience for international customers.',
      liveTime: 'Live time',
      todayDate: 'Today',
      totalRevenue: 'Total revenue',
      activeUsers: 'Active users',
      conversions: 'Conversion rate',
      responseRate: 'Response rate',
      cardChange: 'Month over month: {{value}}',
      recentActivityTitle: 'Recent activity',
      activityItem1: 'Translation update deployed',
      activityItem2: 'New timezone rule applied',
      activityItem3: 'Pluralization rule reviewed',
      activityTag: 'Live',
      tableTitle: 'Latest insights',
      tableDescription: 'Search, filter, and compare your localized product metrics.',
      tableHeaderName: 'Project',
      tableHeaderStatus: 'Status',
      tableHeaderAmount: 'Amount',
      tableHeaderDate: 'Date',
      clearSearch: 'Clear',
      paginationInfo: 'Showing {{count}} items',
      previous: 'Previous',
      next: 'Next',
      profileCardTitle: 'Profile overview',
      profileName: 'Elise Roberts',
      profileRole: 'Localization lead',
      profileMetric1: 'Active regions',
      profileMetric2: 'Current sprints',
      quickActionsTitle: 'Quick actions',
      actionExport: 'Export report',
      actionInvite: 'Invite editor',
      actionReview: 'Review audits',
      notificationsTitle: 'Notifications',
      notificationNew: 'New translation tasks ready',
      notificationUpdate: 'Latest locale changes have been synced.',
      notificationReview: 'Review localization status',
      notificationTimely: 'Keep every region on schedule.',
      status: {
        live: 'Live',
        pending: 'Pending',
        completed: 'Completed',
      },
    },
    settings: {
      previewHeadline: 'Localization settings',
      previewDescription: 'Configure the locale experience, preview formatting, and switch directions instantly.',
      currentLanguage: 'Current language',
      currentTimezone: 'Current timezone',
      themeMode: 'Theme mode',
      themeOption: {
        light: 'Light',
        dark: 'Dark',
        system: 'System',
      },
      previewTheme: 'Preview active theme',
      changeLanguage: 'Localization controls',
      languageLabel: 'Language',
      timezoneLabel: 'Timezone',
      currencyLabel: 'Currency',
      dateFormatLabel: 'Date formatting',
      dateFormatLong: 'Long format',
      dateFormatNumeric: 'Numeric format',
      timeFormatLabel: 'Time formatting',
      timeFormat24: '24-hour',
      timeFormat12: '12-hour',
      rtlPreviewLabel: 'RTL preview',
      rtlPreviewOn: 'RTL enabled',
      rtlPreviewOff: 'RTL disabled',
      localeDetails: 'Locale preview',
      localePreviewLabel: 'Locale preview',
      currentBrowserLocale: 'Browser locale',
      currentSystemTimezone: 'System timezone',
      numberPreview: 'Number preview',
      profileFormTitle: 'Profile validation',
      profileFormDescription: 'Demonstrates translated validation messages for form inputs.',
      profileSubmit: 'Save changes',
    },
    forms: {
      emailLabel: 'Email address',
      emailPlaceholder: 'you@example.com',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      nameLabel: 'Full name',
      namePlaceholder: 'John Doe',
      searchPlaceholder: 'Search projects...',
    },
    validation: {
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      minLength: 'Must be at least {{min}} characters',
      passwordMismatch: 'Passwords do not match',
    },
    navigation: {
      dashboard: 'Dashboard',
      settings: 'Settings',
    },
    notifications: {
      actionSuccess: 'Action completed successfully',
      settingsSaved: 'Settings have been saved',
      languageChanged: 'Language has been changed',
      toastSuccess: 'Success',
      toastSaved: 'Changes have been saved successfully',
    },
    errors: {
      notFound: 'Page not found',
      notFoundTitle: '404',
      notFoundMessage: 'Page not found',
      offline: 'You appear to be offline',
      offlineMessage: 'Check your internet connection',
      tryAgain: 'Try again',
    },
  },
};

export const supportedLanguages = ['en', 'ur', 'ar', 'fr', 'de', 'es', 'ja'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export const namespaceOrder = [
  'common',
  'dashboard',
  'settings',
  'forms',
  'validation',
  'navigation',
  'notifications',
  'errors',
] as const;

const fallbackLng: SupportedLanguage = 'en';

export const i18nReadyPromise = i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng,
    // supportedLngs: supportedLanguages as string[],
    supportedLngs: [...supportedLanguages],
    defaultNS: 'common',
    ns: namespaceOrder as unknown as string[],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    returnNull: false,
    returnEmptyString: false,
    nsSeparator: '.',
    keySeparator: false,
    debug: false,
  })
  .then(() => {
    console.log('[i18n] Initialization complete');
    return i18n;
  });

export async function loadLocaleResources(language: SupportedLanguage) {
  const namespacePromises = namespaceOrder.map(async (namespace) => {
    try {
      const translations = await import(`../locales/${language}/${namespace}.json`);
      return { namespace, translations: translations.default };
    } catch (err) {
      // Missing namespace for this language; return empty translations
      return { namespace, translations: {} };
    }
  });

  const loaded = await Promise.all(namespacePromises);

  loaded.forEach(({ namespace, translations }) => {
    if (!i18n.hasResourceBundle(language, namespace)) {
      i18n.addResourceBundle(language, namespace, translations, true, true);
    }
  });

  return i18n;
}

export default i18n;
