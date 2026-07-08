import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SunMedium } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Select } from '../components/ui/Select';
import { Input } from '../components/ui/Input';
import { useI18n } from '../contexts/I18nContext';
import { useUI } from '../contexts/UIContext';
import { localeMap, supportedTimezones } from '../constants/locales';
import { themeModes } from '../constants/theme';
import { useLocaleFormat } from '../hooks/useLocaleFormat';
import type { SupportedLanguage } from '../config/i18n';

const profileSchema = z.object({
  email: z.string().min(1, 'validation.required').email('validation.invalidEmail'),
  password: z.string().min(8, 'validation.minLength'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function SettingsPage() {
  const { t } = useTranslation(['common', 'settings', 'forms', 'validation']);
  const { language, setLanguage, timezone, setTimezone, currentLocale } = useI18n();
  const { themeMode, setThemeMode, resolvedTheme } = useUI();
  const { formatDate, formatTime, formatCurrency, formatNumber } = useLocaleFormat();
  const [rtlPreviewEnabled, setRtlPreviewEnabled] = useState(false);
  const [dateFormat, setDateFormat] = useState('long');
  const [timeFormat, setTimeFormat] = useState('24h');
  const [currency, setCurrency] = useState(currentLocale.currency);

  const browserLocale = useMemo(() => navigator.language || 'en-US', []);
  const systemTimezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
  });

  const datePreview = formatDate(
    new Date(),
    dateFormat === 'long' ? undefined : { month: 'numeric', day: 'numeric', year: 'numeric' },
  );
  const timePreview = formatTime(new Date(), timeFormat === '12h' ? { hour12: true } : { hour12: false });
  const numberPreview = formatNumber(1234567.89);
  const currencyPreview = formatCurrency(1299.5, currency);

  const onSubmit = (values: ProfileFormValues) => {
    console.log(values);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header cards */}
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--locale-primary)' }}>
                {t('common.settingsTitle')}
              </p>
              <h1 className="text-3xl font-bold text-locale-text">{t('settings.previewHeadline')}</h1>
              <p className="max-w-2xl text-sm leading-7 text-locale-text-secondary">
                {t('settings.previewDescription')}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-locale-border bg-locale-surface p-5">
                <p className="text-xs text-locale-text-muted">{t('settings.currentLanguage')}</p>
                <p className="mt-2 text-lg font-bold text-locale-text">
                  {localeMap[language].flag} {localeMap[language].label}
                </p>
              </div>
              <div className="rounded-3xl border border-locale-border bg-locale-surface p-5">
                <p className="text-xs text-locale-text-muted">{t('settings.currentTimezone')}</p>
                <p className="mt-2 text-lg font-bold text-locale-text">{timezone}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-locale-text-secondary">
              <SunMedium size={18} aria-hidden="true" />
              <span className="font-semibold">{t('settings.themeMode')}</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {themeModes.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setThemeMode(mode)}
                  className={`rounded-3xl border px-4 py-3 text-left transition-all ${
                    themeMode === mode
                      ? 'border-locale-primary bg-locale-primary text-white shadow-sm'
                      : 'border-locale-border bg-locale-card text-locale-text hover:border-locale-border-hover hover:shadow-sm'
                  }`}
                >
                  <span className="block text-sm font-bold">{t(`settings.themeOption.${mode}`)}</span>
                  <span className="block text-xs opacity-70">{mode}</span>
                </button>
              ))}
            </div>
            <div className="rounded-3xl border border-locale-border bg-locale-surface p-4">
              <p className="text-xs text-locale-text-muted">{t('settings.previewTheme')}</p>
              <p className="mt-2 font-bold text-locale-text">{resolvedTheme}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Localization controls */}
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card title={t('settings.changeLanguage')}>
          <div className="grid gap-5">
            <Select
              id="language"
              label={t('settings.languageLabel')}
              value={language}
              onChange={(event) => setLanguage(event.target.value as SupportedLanguage)}
            >
              {Object.values(localeMap).map((locale) => (
                <option key={locale.value} value={locale.value}>
                  {locale.flag} {locale.label}
                </option>
              ))}
            </Select>
            <Select
              id="timezone"
              label={t('settings.timezoneLabel')}
              value={timezone}
              onChange={(event) => setTimezone(event.target.value)}
            >
              {supportedTimezones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </Select>
            <Select
              id="currency"
              label={t('settings.currencyLabel')}
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="JPY">JPY (¥)</option>
              <option value="SAR">SAR (﷼)</option>
              <option value="PKR">PKR (Rs)</option>
            </Select>
            <Select
              id="date-format"
              label={t('settings.dateFormatLabel')}
              value={dateFormat}
              onChange={(event) => setDateFormat(event.target.value)}
            >
              <option value="long">{t('settings.dateFormatLong')}</option>
              <option value="numeric">{t('settings.dateFormatNumeric')}</option>
            </Select>
            <Select
              id="time-format"
              label={t('settings.timeFormatLabel')}
              value={timeFormat}
              onChange={(event) => setTimeFormat(event.target.value)}
            >
              <option value="24h">{t('settings.timeFormat24')}</option>
              <option value="12h">{t('settings.timeFormat12')}</option>
            </Select>
            <div className="flex items-center justify-between rounded-3xl border border-locale-border bg-locale-surface px-5 py-3">
              <span className="text-sm font-semibold text-locale-text">{t('settings.rtlPreviewLabel')}</span>
              <button
                type="button"
                onClick={() => setRtlPreviewEnabled((current) => !current)}
                className="rounded-full border border-locale-border bg-locale-card px-4 py-2 text-sm font-semibold transition hover:bg-locale-surface"
                style={{ color: 'var(--locale-text)' }}
              >
                {rtlPreviewEnabled ? t('settings.rtlPreviewOn') : t('settings.rtlPreviewOff')}
              </button>
            </div>
          </div>
        </Card>

        <Card title={t('settings.localeDetails')}>
          <div className={`space-y-4 ${rtlPreviewEnabled ? 'rtl' : ''}`}>
            <div className="rounded-3xl border border-locale-border bg-locale-surface p-4">
              <p className="text-xs text-locale-text-muted">{t('settings.localePreviewLabel')}</p>
              <p className="mt-2 text-lg font-bold text-locale-text">
                {currentLocale.flag} {currentLocale.label} • {language}
              </p>
            </div>
            <div className="grid gap-3 rounded-3xl border border-locale-border bg-locale-card p-4">
              <div>
                <p className="text-xs text-locale-text-muted">{t('settings.dateFormatLabel')}</p>
                <p className="mt-2 font-bold text-locale-text">{datePreview}</p>
              </div>
              <div>
                <p className="text-xs text-locale-text-muted">{t('settings.timeFormatLabel')}</p>
                <p className="mt-2 font-bold text-locale-text">{timePreview}</p>
              </div>
              <div>
                <p className="text-xs text-locale-text-muted">{t('settings.currencyLabel')}</p>
                <p className="mt-2 font-bold text-locale-text">{currencyPreview}</p>
              </div>
              <div>
                <p className="text-xs text-locale-text-muted">{t('settings.numberPreview')}</p>
                <p className="mt-2 font-bold text-locale-text">{numberPreview}</p>
              </div>
            </div>
            <div className="rounded-3xl border border-locale-border bg-locale-surface p-4">
              <p className="text-xs text-locale-text-muted">{t('settings.currentBrowserLocale')}</p>
              <p className="mt-2 font-bold text-locale-text">{browserLocale}</p>
              <p className="mt-3 text-xs text-locale-text-muted">
                {t('settings.currentSystemTimezone')}: {systemTimezone}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Profile form */}
      <Card title={t('settings.profileFormTitle')}>
        <div className="space-y-4">
          <p className="text-sm text-locale-text-secondary">{t('settings.profileFormDescription')}</p>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <Input id="email" label={t('forms.emailPlaceholder')} type="email" {...form.register('email')} />
            {form.formState.errors.email ? (
              <p className="text-sm" style={{ color: 'var(--locale-error)' }}>
                {t(form.formState.errors.email.message as string, { min: 8 })}
              </p>
            ) : null}
            <Input id="password" label={t('forms.passwordPlaceholder')} type="password" {...form.register('password')} />
            {form.formState.errors.password ? (
              <p className="text-sm" style={{ color: 'var(--locale-error)' }}>
                {t(form.formState.errors.password.message as string, { min: 8 })}
              </p>
            ) : null}
            <Button type="submit">{t('settings.profileSubmit')}</Button>
          </form>
        </div>
      </Card>
    </motion.div>
  );
}
