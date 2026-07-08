import { AnimatePresence, motion } from 'framer-motion';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';
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
      return <CheckCircle2 size={20} aria-hidden="true" />;
    case 'warning':
      return <AlertTriangle size={20} aria-hidden="true" />;
    case 'error':
      return <XCircle size={20} aria-hidden="true" />;
    case 'info':
    default:
      return <Info size={20} aria-hidden="true" />;
  }
}

function getVariantStyles(variant: ToastVariant) {
  switch (variant) {
    case 'success':
      return 'bg-locale-success-light border-locale-success/20 text-locale-success';
    case 'warning':
      return 'bg-locale-warning-light border-locale-warning/20 text-locale-warning';
    case 'error':
      return 'bg-locale-error-light border-locale-error/20 text-locale-error';
    default:
      return 'bg-locale-accent-light border-locale-primary/20 text-locale-primary';
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
      <div className="fixed inset-x-4 bottom-4 z-50 flex flex-col gap-3 sm:right-4 sm:left-auto sm:max-w-md">
        <AnimatePresence mode="popLayout">
          {toasts.map(({ id, title, message, variant }) => (
            <motion.div
              key={id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className={clsx(
                'rounded-3xl border-2 p-5 shadow-lang backdrop-blur-md',
                getVariantStyles(variant),
              )}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getIcon(variant)}</div>
                <div className="flex-1">
                  <p className="font-bold">{title}</p>
                  <p className="mt-1.5 text-sm leading-6 opacity-90">{message}</p>
                </div>
                <button
                  type="button"
                  aria-label="Close notification"
                  className="ml-2 rounded-full p-1 transition-colors hover:bg-black/10"
                  onClick={() => removeToast(id)}
                >
                  <X size={18} />
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
