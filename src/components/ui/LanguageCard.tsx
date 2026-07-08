import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { LocaleDetails } from '../../types/i18n';

type Props = {
  locale: LocaleDetails & { value: string };
  isSelected?: boolean;
  onSelect: (value: string) => void;
};

export function LanguageCard({ locale, isSelected, onSelect }: Props) {
  const { flag, label, nativeName, description, direction, value, culturalIcon, currency, timezone } = locale;

  return (
    <motion.button
      layout
      whileHover={{ scale: 1.04, y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      onClick={() => onSelect(value)}
      className={clsx(
        'group relative flex h-52 w-full cursor-pointer flex-col justify-between overflow-hidden rounded-3xl p-6 text-left shadow-card transition-all duration-400',
        'bg-white backdrop-blur-sm',
        'border-2',
        isSelected
          ? 'border-locale-primary ring-4 ring-locale-primary/20 shadow-lang'
          : 'border-locale-border hover:border-locale-border-hover hover:shadow-lang',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-locale-focus-ring/30',
      )}
      style={{
        background: `linear-gradient(135deg, ${locale.palette?.gradientFrom || '#f0f9ff'} 0%, ${locale.palette?.gradientTo || '#ffffff'} 100%)`,
      }}
    >
      {/* Top section */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/90 text-4xl shadow-soft transition-transform group-hover:scale-110">
            {flag}
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight" style={{ color: locale.palette?.textPrimary || '#0f172a' }}>
              {label}
            </div>
            <div className="text-sm font-medium" style={{ color: locale.palette?.textSecondary || '#64748b' }}>
              {nativeName}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-sm"
            style={{
              background: locale.palette?.accentLight || '#e0f2fe',
              color: locale.palette?.textPrimary || '#0f172a',
            }}
          >
            {direction}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="line-clamp-2 text-sm leading-relaxed" style={{ color: locale.palette?.textSecondary || '#64748b' }}>
        {description}
      </p>

      {/* Bottom section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: locale.palette?.textSecondary || '#64748b' }}>
            <span>💰</span>
            <span>{currency}</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-current opacity-30" />
          <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: locale.palette?.textSecondary || '#64748b' }}>
            <span>🌍</span>
            <span className="max-w-[100px] truncate">{timezone.split('/')[1]}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {culturalIcon && <span className="text-2xl opacity-70 transition-opacity group-hover:opacity-100">{culturalIcon}</span>}
          <div
            className="h-8 w-8 rounded-full shadow-soft ring-2 ring-white transition-transform group-hover:scale-110"
            style={{ background: locale.palette?.primary || '#0ea5e9' }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Glassmorphism overlay on hover */}
      <div
        className={clsx(
          'absolute inset-0 -z-10 rounded-3xl opacity-0 transition-opacity duration-400 group-hover:opacity-100',
        )}
        style={{
          background: `linear-gradient(135deg, ${locale.palette?.gradientFrom || '#f0f9ff'}CC 0%, ${locale.palette?.gradientTo || '#ffffff'}99 100%)`,
          backdropFilter: 'blur(8px)',
        }}
      />

      {/* Active indicator */}
      {isSelected && (
        <motion.div
          layoutId="active-lang"
          className="absolute -inset-0.5 -z-20 rounded-3xl"
          style={{
            background: `linear-gradient(135deg, ${locale.palette?.gradientFrom || '#f0f9ff'}, ${locale.palette?.primary || '#0ea5e9'})`,
            opacity: 0.2,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );
}
