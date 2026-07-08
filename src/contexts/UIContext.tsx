import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { loadItem, saveItem } from '../utils/storage';
import { applyTheme, getSystemTheme } from '../utils/theme';
import type { ThemeMode } from '../constants/theme';

export type UILocaleTheme = ThemeMode;

type UIContextValue = {
  themeMode: UILocaleTheme;
  resolvedTheme: 'light' | 'dark';
  setThemeMode: (mode: UILocaleTheme) => void;
};

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeModeState] = useState<UILocaleTheme>(loadItem<UILocaleTheme>('theme', 'system'));

  useEffect(() => {
    applyTheme(themeMode);
  }, [themeMode]);

  const setThemeMode = useCallback((mode: UILocaleTheme) => {
    setThemeModeState(mode);
    saveItem('theme', mode);
  }, []);

  const value = useMemo(
    () => ({
      themeMode,
      resolvedTheme: themeMode === 'system' ? getSystemTheme() : themeMode,
      setThemeMode,
    }),
    [themeMode, setThemeMode],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within UIProvider');
  }
  return context;
}
