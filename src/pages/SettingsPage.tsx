import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Globe2, Moon, SunMedium } from 'lucide-react';
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

  const datePreview = formatDate(new Date(), dateFormat === 'long' ? undefined : { month: 'numeric', day: 'numeric', year: 'numeric' });
  const timePreview = formatTime(new Date(), timeFormat === '12h' ? { hour12: true } : { hour12: false });
  const numberPreview = formatNumber(1234567.89);
  const currencyPreview = formatCurrency(1299.5, currency);

  const onSubmit = (values: ProfileFormValues) => {
    console.log(values);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:text-sky-300">{t('common.settingsTitle')}</p>
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">{t('settings.previewHeadline')}</h1>
              <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">{t('settings.previewDescription')}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('settings.currentLanguage')}</p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{localeMap[language].label}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('settings.currentTimezone')}</p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{timezone}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
              <SunMedium size={18} aria-hidden="true" />
              <span>{t('settings.themeMode')}</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {themeModes.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setThemeMode(mode)}
                  className={`rounded-3xl border px-4 py-3 text-left transition ${themeMode === mode ? 'border-primary bg-primary text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200'}`}
                >
                  <span className="block text-sm font-semibold">{t(`settings.themeOption.${mode}`)}</span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">{mode === 'system' ? t('settings.themeOption.system') : mode}</span>
                </button>
              ))}
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">{t('settings.previewTheme')}</p>
              <p className="mt-2 font-semibold text-slate-900 dark:text-slate-100">{resolvedTheme}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card title={t('settings.changeLanguage')}>
          <div className="grid gap-5">
            <Select id="language" label={t('settings.languageLabel')} value={language} onChange={(event) => setLanguage(event.target.value as SupportedLanguage)}>
              {Object.values(localeMap).map((locale) => (
                <option key={locale.value} value={locale.value}>{locale.label}</option>
              ))}
            </Select>
            <Select id="timezone" label={t('settings.timezoneLabel')} value={timezone} onChange={(event) => setTimezone(event.target.value)}>
              {supportedTimezones.map((zone) => (
                <option key={zone} value={zone}>{zone}</option>
              ))}
            </Select>
            <Select id="currency" label={t('settings.currencyLabel')} value={currency} onChange={(event) => setCurrency(event.target.value)}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
              <option value="AED">AED</option>
              <option value="PKR">PKR</option>
            </Select>
            <Select id="date-format" label={t('settings.dateFormatLabel')} value={dateFormat} onChange={(event) => setDateFormat(event.target.value)}>
              <option value="long">{t('settings.dateFormatLong')}</option>
              <option value="numeric">{t('settings.dateFormatNumeric')}</option>
            </Select>
            <Select id="time-format" label={t('settings.timeFormatLabel')} value={timeFormat} onChange={(event) => setTimeFormat(event.target.value)}>
              <option value="24h">{t('settings.timeFormat24')}</option>
              <option value="12h">{t('settings.timeFormat12')}</option>
            </Select>
            <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
              <span className="text-sm text-slate-700 dark:text-slate-200">{t('settings.rtlPreviewLabel')}</span>
              <button
                type="button"
                onClick={() => setRtlPreviewEnabled((current) => !current)}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                {rtlPreviewEnabled ? t('settings.rtlPreviewOn') : t('settings.rtlPreviewOff')}
              </button>
            </div>
          </div>
        </Card>

        <Card title={t('settings.localeDetails')}>
          <div className={`space-y-4 ${rtlPreviewEnabled ? 'rtl' : ''}`}>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">{t('settings.localePreviewLabel')}</p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{currentLocale.label} • {language}</p>
            </div>
            <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('settings.dateFormatLabel')}</p>
                <p className="mt-2 font-medium text-slate-900 dark:text-slate-100">{datePreview}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('settings.timeFormatLabel')}</p>
                <p className="mt-2 font-medium text-slate-900 dark:text-slate-100">{timePreview}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('settings.currencyLabel')}</p>
                <p className="mt-2 font-medium text-slate-900 dark:text-slate-100">{currencyPreview}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('settings.numberPreview')}</p>
                <p className="mt-2 font-medium text-slate-900 dark:text-slate-100">{numberPreview}</p>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">{t('settings.currentBrowserLocale')}</p>
              <p className="mt-2 font-semibold text-slate-900 dark:text-slate-100">{browserLocale}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t('settings.currentSystemTimezone')}: {systemTimezone}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card title={t('settings.profileFormTitle')}>
        <div className="space-y-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">{t('settings.profileFormDescription')}</p>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <Input id="email" label={t('forms.emailPlaceholder')} type="email" {...form.register('email')} />
            {form.formState.errors.email ? (
              <p className="text-sm text-rose-600">{t(form.formState.errors.email.message as string)}</p>
            ) : null}
            <Input id="password" label={t('forms.passwordPlaceholder')} type="password" {...form.register('password')} />
            {form.formState.errors.password ? (
              <p className="text-sm text-rose-600">{t(form.formState.errors.password.message as string)}</p>
            ) : null}
            <Button type="submit">{t('settings.profileSubmit')}</Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
