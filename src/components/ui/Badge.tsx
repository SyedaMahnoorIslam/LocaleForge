import type { ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  variant?: 'neutral' | 'success' | 'warning' | 'danger';
};

const badgeStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
  neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
  warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
  danger: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200',
};

export function Badge({ children, variant = 'neutral' }: BadgeProps) {
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[variant]}`}>{children}</span>;
}
