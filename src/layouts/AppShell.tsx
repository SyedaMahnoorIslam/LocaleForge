import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Settings, Sparkles, SunMedium } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { useUI } from '../contexts/UIContext';
import { Button } from '../components/ui/Button';

const navItems = [
  { path: '/', nameKey: 'navigation.dashboard' },
  { path: '/settings', nameKey: 'navigation.settings' },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const { direction } = useI18n();
  const { resolvedTheme } = useUI();

  return (
    <div className="min-h-screen bg-surface text-slate-900 dark:bg-slate-950 dark:text-slate-100" dir={direction} data-theme={resolvedTheme}>
      <div className="mx-auto flex min-h-screen max-w-[1700px] flex-col px-4 py-4 lg:px-8">
        <header className="mb-6 flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white">
              <Sparkles size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{t('common.appName')}</p>
              <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{t('common.description')}</p>
            </div>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`
                }
              >
                {t(item.nameKey)}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" aria-label={t('common.openMenu')}>
              <Menu size={18} />
            </Button>
            <span className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {t('common.themeState', { theme: resolvedTheme })}
            </span>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
