import type { ReactNode } from 'react';
import clsx from 'clsx';

type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Card({ title, children, className }: CardProps) {
  return (
    <section
      className={clsx(
        'rounded-3xl border p-6 shadow-soft transition-all duration-400',
        'bg-locale-card border-locale-border',
        className,
      )}
    >
      {title ? (
        <h2 className="mb-5 text-lg font-bold tracking-tight text-locale-text">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
