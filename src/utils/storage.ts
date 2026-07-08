const STORAGE_KEYS = {
  language: 'localeforge_language',
  theme: 'localeforge_theme',
  timezone: 'localeforge_timezone',
};

export function saveItem<T>(key: keyof typeof STORAGE_KEYS, value: T) {
  try {
    window.localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
  } catch {
    // Ignore storage errors in browsers with restricted storage.
  }
}

export function loadItem<T>(key: keyof typeof STORAGE_KEYS, fallback: T): T {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEYS[key]);
    if (!stored) {
      return fallback;
    }
    return JSON.parse(stored) as T;
  } catch {
    return fallback;
  }
}
