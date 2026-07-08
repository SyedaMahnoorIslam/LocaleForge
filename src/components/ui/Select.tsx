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
    <label className="block text-sm text-slate-700 dark:text-slate-200" htmlFor={id}>
      {label ? <span className="block mb-2 font-medium">{label}</span> : null}
      <select
        id={id}
        className={clsx(
          'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-colors duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {helperText ? <span className="text-xs text-slate-500">{helperText}</span> : null}
    </label>
  );
}
