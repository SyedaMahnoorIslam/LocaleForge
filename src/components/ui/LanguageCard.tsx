import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { LocaleDetails } from '../../types/i18n';

type Props = {
  locale: LocaleDetails & { value: string };
  isSelected?: boolean;
  onSelect: (value: string) => void;
};

export function LanguageCard({ locale, isSelected, onSelect }: Props) {
  const { flag, label, nativeName, description, direction, palette, value } = locale;

  return (
    <motion.button
      layout
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      onClick={() => onSelect(value)}
      className={clsx(
        'relative flex h-36 w-full cursor-pointer flex-col justify-between rounded-2xl border p-4 text-left shadow-md focus:outline-none',
        'bg-white',
        'hover:shadow-xl',
        isSelected && 'ring-4 ring-offset-2',
      )}
      style={{
        background: palette?.cardBg || 'var(--card-bg, #fff)',
        borderColor: palette?.border || 'var(--border, #eee)',
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl" aria-hidden>
            {flag}
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">{label}</div>
            <div className="text-xs text-slate-500">{nativeName}</div>
          </div>
        </div>
        <div className="text-xs font-medium text-slate-600">{direction.toUpperCase()}</div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-slate-600 line-clamp-2">{description}</p>
        <div className="ml-3 flex items-center gap-2">
          <span
            className="h-6 w-6 rounded-full"
            style={{ background: palette?.accent || 'var(--accent, #2563eb)' }}
            aria-hidden
          />
        </div>
      </div>

      <div
        className="absolute -inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(180deg, ${palette?.gradientFrom || 'transparent'}, ${palette?.gradientTo || 'transparent'})`,
          opacity: 0.08,
          zIndex: -1,
        }}
      />
    </motion.button>
  );
}
