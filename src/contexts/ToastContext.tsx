import { AnimatePresence, motion } from 'framer-motion';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { CheckCircle2, Info, AlertTriangle, XCircle } from 'lucide-react';
import clsx from 'clsx';

export type ToastVariant = 'success' | 'warning' | 'error' | 'info';

type ToastItem = {
  id: string;
  title: string;
  message: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  pushToast: (toast: Omit<ToastItem, 'id'>) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

function getIcon(variant: ToastVariant) {
  switch (variant) {
    case 'success':
      return <CheckCircle2 size={18} aria-hidden="true" />;
    case 'warning':
      return <AlertTriangle size={18} aria-hidden="true" />;
    case 'error':
      return <XCircle size={18} aria-hidden="true" />;
    case 'info':
    default:
      return <Info size={18} aria-hidden="true" />;
  }
}

function getVariantStyles(variant: ToastVariant) {
  switch (variant) {
    case 'success':
      return 'from-emerald-50 via-emerald-50 to-emerald-100 text-emerald-900 ring-emerald-200';
    case 'warning':
      return 'from-amber-50 via-amber-50 to-amber-100 text-amber-900 ring-amber-200';
    case 'error':
      return 'from-rose-50 via-rose-50 to-rose-100 text-rose-900 ring-rose-200';
    default:
      return 'from-sky-50 via-sky-50 to-sky-100 text-sky-900 ring-sky-200';
  }
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const pushToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    setToasts((current) => [
      {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        ...toast,
      },
      ...current,
    ]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const contextValue = useMemo(() => ({ pushToast }), [pushToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="fixed inset-x-4 bottom-4 z-50 flex flex-col gap-3 sm:right-4 sm:left-auto">
        <AnimatePresence>
          {toasts.map(({ id, title, message, variant }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 22 }}
              transition={{ duration: 0.2 }}
              className={clsx(
                'rounded-3xl border p-4 shadow-soft ring-1 ring-inset backdrop-blur-sm',
                getVariantStyles(variant),
              )}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">{getIcon(variant)}</div>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-200">{message}</p>
                </div>
                <button
                  type="button"
                  aria-label="Close notification"
                  className="ml-auto text-slate-500 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  onClick={() => removeToast(id)}
                >
                  ×
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
