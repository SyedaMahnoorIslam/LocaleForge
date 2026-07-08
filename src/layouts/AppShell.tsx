import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Sparkles } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { useUI } from '../contexts/UIContext';
import { Button } from '../components/ui/Button';

const navItems = [
  { path: '/', nameKey: 'navigation.dashboard' },
  { path: '/settings', nameKey: 'navigation.settings' },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const { direction, currentLocale } = useI18n();
  const { resolvedTheme } = useUI();

  return (
    <div
      className="min-h-screen text-locale-text transition-all duration-400"
      style={{ background: 'var(--locale-bg)' }}
      dir={direction}
      data-theme={resolvedTheme}
    >
      <div className="mx-auto flex min-h-screen max-w-[1700px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
        {/* Navbar */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between gap-4 rounded-3xl border px-6 py-4 shadow-soft backdrop-blur-sm transition-all duration-400"
          style={{
            background: 'var(--locale-nav-bg)',
            borderColor: 'var(--locale-nav-border)',
          }}
        >
          {/* Logo section */}
          <div className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-soft transition-all duration-400"
              style={{ background: 'var(--locale-logo-bg)' }}
            >
              <Sparkles size={22} style={{ color: 'var(--locale-logo-fg)' }} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--locale-nav-text)' }}>
                {t('common.appName')}
              </p>
              <p className="text-base font-bold" style={{ color: 'var(--locale-text-primary)' }}>
                {t('common.description')}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? 'shadow-sm'
                      : 'hover:shadow-sm'
                  }`
                }
                style={({ isActive }) => ({
                  background: isActive ? 'var(--locale-nav-active)' : 'transparent',
                  color: isActive ? 'var(--locale-nav-active-fg)' : 'var(--locale-nav-text)',
                })}
              >
                {t(item.nameKey)}
              </NavLink>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" aria-label={t('common.openMenu')}>
              <Menu size={20} />
            </Button>
            <div
              className="rounded-full px-4 py-2 text-xs font-bold shadow-sm transition-all duration-400"
              style={{
                background: 'var(--locale-badge-active)',
                color: 'var(--locale-badge-active-fg)',
              }}
            >
              {currentLocale.flag} {currentLocale.label}
            </div>
          </div>
        </motion.header>

        {/* Main content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
