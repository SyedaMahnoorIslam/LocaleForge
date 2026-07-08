import type { ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  variant?: 'neutral' | 'success' | 'warning' | 'danger';
};

const badgeStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
  neutral: 'bg-locale-surface text-locale-text-secondary',
  success: 'bg-locale-success-light text-locale-success',
  warning: 'bg-locale-warning-light text-locale-warning',
  danger: 'bg-locale-error-light text-locale-error',
};

export function Badge({ children, variant = 'neutral' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold transition-colors duration-300 ${badgeStyles[variant]}`}
    >
      {children}
    </span>
  );
}
