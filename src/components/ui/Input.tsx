import type { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label?: string;
  helperText?: string;
};

export function Input({ id, label, helperText, className, ...props }: InputProps) {
  return (
    <label className="block text-sm text-slate-700 dark:text-slate-200" htmlFor={id}>
      {label ? <span className="mb-2 block font-medium">{label}</span> : null}
      <input
        id={id}
        className={clsx(
          'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100',
          className,
        )}
        {...props}
      />
      {helperText ? <span className="mt-2 block text-xs text-slate-500">{helperText}</span> : null}
    </label>
  );
}
