import type { SelectHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  helperText?: string;
  id: string;
  children: ReactNode;
};

export function Select({ label, helperText, id, className, children, ...props }: SelectProps) {
  return (
    <label className="block text-sm text-locale-text" htmlFor={id}>
      {label ? <span className="mb-2 block font-semibold">{label}</span> : null}
      <select
        id={id}
        className={clsx(
          'w-full rounded-2xl border px-4 py-3 text-sm shadow-sm outline-none transition-all duration-200',
          'bg-locale-card border-locale-border text-locale-text',
          'focus:border-locale-primary focus:ring-2 focus:ring-locale-focus-ring/20',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {helperText ? <span className="mt-2 block text-xs text-locale-text-muted">{helperText}</span> : null}
    </label>
  );
}
