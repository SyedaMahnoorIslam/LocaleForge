import type { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label?: string;
  helperText?: string;
};

export function Input({ id, label, helperText, className, ...props }: InputProps) {
  return (
    <label className="block text-sm text-locale-text" htmlFor={id}>
      {label ? <span className="mb-2 block font-semibold">{label}</span> : null}
      <input
        id={id}
        className={clsx(
          'w-full rounded-2xl border px-4 py-3 shadow-sm outline-none transition-all duration-200',
          'bg-locale-card border-locale-border text-locale-text',
          'focus:border-locale-primary focus:ring-2 focus:ring-locale-focus-ring/20',
          'placeholder:text-locale-text-muted',
          className,
        )}
        {...props}
      />
      {helperText ? (
        <span className="mt-2 block text-xs text-locale-text-muted">{helperText}</span>
      ) : null}
    </label>
  );
}
