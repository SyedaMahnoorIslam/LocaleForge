import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SettingsPage } from './pages/SettingsPage';
import { AppShell } from './layouts/AppShell';
import { ToastProvider } from './contexts/ToastContext';
import { UIProvider } from './contexts/UIContext';
import { I18nProvider } from './contexts/I18nContext';

function App() {
  const location = useLocation();

  return (
    <I18nProvider>
      <UIProvider>
        <ToastProvider>
          <AppShell>
            <AnimatePresence mode="wait" initial={false}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </AnimatePresence>
          </AppShell>
        </ToastProvider>
      </UIProvider>
    </I18nProvider>
  );
}

export default App;
