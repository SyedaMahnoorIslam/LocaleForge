import type { ReactNode } from 'react';
import clsx from 'clsx';

type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Card({ title, children, className }: CardProps) {
  return (
    <section className={clsx('rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900', className)}>
      {title ? <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h2> : null}
      {children}
    </section>
  );
}
