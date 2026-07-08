import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, CalendarDays, CheckCircle2, CreditCard, Search, Sparkles, UserCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { LanguageSelector } from '../components/ui/LanguageSelector';
import { useLocaleFormat } from '../hooks/useLocaleFormat';
import { useToast } from '../contexts/ToastContext';

const analyticsCards = [
  { id: 'revenue', icon: CreditCard, value: 81240, labelKey: 'dashboard.totalRevenue', change: 12.4 },
  { id: 'users', icon: UserCircle2, value: 14820, labelKey: 'dashboard.activeUsers', change: 8.7 },
  { id: 'conversions', icon: CheckCircle2, value: 876, labelKey: 'dashboard.conversions', change: 6.2 },
  { id: 'engagement', icon: Sparkles, value: 94, labelKey: 'dashboard.responseRate', change: 3.4 },
];

const recentActivities = [
  { id: '1', labelKey: 'dashboard.activityItem1', timeOffset: -15 },
  { id: '2', labelKey: 'dashboard.activityItem2', timeOffset: -90 },
  { id: '3', labelKey: 'dashboard.activityItem3', timeOffset: -240 },
];

const tableRows = [
  { name: 'Locale Tokenization', amount: 35600, status: 'Live', date: new Date(Date.now() - 86400000) },
  { name: 'UI Translation Audit', amount: 1200, status: 'Pending', date: new Date(Date.now() - 3600000 * 3) },
  { name: 'Review Timezones', amount: 980, status: 'Completed', date: new Date(Date.now() - 3600000 * 18) },
];

export function DashboardPage() {
  const { t } = useTranslation(['common', 'dashboard', 'notifications']);
  const { formatCurrency, formatDate, formatTime, formatNumber, formatRelative } = useLocaleFormat();
  const { pushToast } = useToast();
  const [query, setQuery] = useState('');

  // New language selector hero
  const Hero = () => (
    <div className="mb-8 space-y-6">
      <div className="rounded-3xl p-8" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Explore Global Experiences</p>
          <h2 className="mt-3 text-4xl font-extrabold text-slate-900">Switch between languages and instantly experience localized UI, colors, typography, layout direction, formatting, and culture.</h2>
          <p className="mt-4 text-sm text-slate-600">Select a language below to transform the application's identity — themes, direction, and locale-aware formatting update instantly.</p>
        </div>
      </div>
      <div>
        <LanguageSelector />
      </div>
    </div>
  );

  const filteredRows = useMemo(
    () => tableRows.filter((row) => row.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const handleQuickAction = () => {
    pushToast({
      variant: 'success',
      title: t('notifications.toastSuccess'),
      message: t('notifications.toastSaved'),
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Hero />
      <div className="mb-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <Card>
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:text-sky-300">{t('dashboard.welcomeTitle')}</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-50">{t('dashboard.welcomeSubtitle', { name: 'Elise' })}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">{t('dashboard.welcomeDescription')}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('dashboard.liveTime')}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{formatTime(new Date())}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('dashboard.todayDate')}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{formatDate(new Date())}</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 sm:grid-cols-2">
          {analyticsCards.map(({ id, icon: Icon, value, labelKey, change }) => (
            <Card key={id} className="overflow-hidden">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t(labelKey)}</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">{formatNumber(value)}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  <Icon size={20} aria-hidden="true" />
                </div>
              </div>
              <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">{t('dashboard.cardChange', { value: `${change}%` })}</div>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
        <div className="space-y-6">
          <Card title={t('dashboard.recentActivityTitle')}>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-950">
                  <div className="flex items-center gap-3">
                    <Bell className="text-primary" size={20} aria-hidden="true" />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">{t(activity.labelKey)}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{formatRelative(new Date(Date.now() + activity.timeOffset * 60000))}</p>
                    </div>
                  </div>
                  <Badge variant="neutral">{t('dashboard.activityTag')}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{t('dashboard.tableTitle')}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('dashboard.tableDescription')}</p>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  id="dashboard-search"
                  placeholder={t('forms.searchPlaceholder')}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="max-w-[18rem]"
                />
                <Button variant="secondary" size="sm" onClick={() => setQuery('')}>
                  <Search size={16} aria-hidden="true" />
                  {t('dashboard.clearSearch')}
                </Button>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
                <thead className="bg-slate-50 text-slate-600 dark:bg-slate-950 dark:text-slate-300">
                  <tr>
                    <th className="px-5 py-4 font-semibold">{t('dashboard.tableHeaderName')}</th>
                    <th className="px-5 py-4 font-semibold">{t('dashboard.tableHeaderStatus')}</th>
                    <th className="px-5 py-4 font-semibold">{t('dashboard.tableHeaderAmount')}</th>
                    <th className="px-5 py-4 font-semibold">{t('dashboard.tableHeaderDate')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white dark:bg-slate-900 dark:divide-slate-800">
                  {filteredRows.length > 0 ? (
                    filteredRows.map((row) => (
                      <tr key={row.name}>
                        <td className="px-5 py-4">{row.name}</td>
                        <td className="px-5 py-4">
                          <Badge variant={row.status === 'Live' ? 'success' : row.status === 'Completed' ? 'neutral' : 'warning'}>
                            {t(`dashboard.status.${row.status.toLowerCase()}`)}
                          </Badge>
                        </td>
                        <td className="px-5 py-4">{formatCurrency(row.amount)}</td>
                        <td className="px-5 py-4">{formatDate(row.date)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-5 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                        {t('common.emptyState')}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
              <span>{t('dashboard.paginationInfo', { count: formatNumber(filteredRows.length) })}</span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">{t('dashboard.previous')}</Button>
                <Button variant="ghost" size="sm">{t('dashboard.next')}</Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title={t('dashboard.profileCardTitle')}>
            <div className="flex items-start gap-4">
              <div className="rounded-3xl bg-slate-100 p-4 text-primary dark:bg-slate-950">
                <UserCircle2 size={32} aria-hidden="true" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{t('dashboard.profileName')}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('dashboard.profileRole')}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{t('dashboard.profileMetric1')}</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">{formatNumber(32)}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{t('dashboard.profileMetric2')}</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">{formatNumber(8)}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card title={t('dashboard.quickActionsTitle')}>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full justify-start" onClick={handleQuickAction}>
                {t('dashboard.actionExport')}
              </Button>
              <Button variant="secondary" className="w-full justify-start" onClick={handleQuickAction}>
                {t('dashboard.actionInvite')}
              </Button>
              <Button variant="secondary" className="w-full justify-start" onClick={handleQuickAction}>
                {t('dashboard.actionReview')}
              </Button>
            </div>
          </Card>

          <Card title={t('dashboard.notificationsTitle')}>
            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="font-semibold text-slate-900 dark:text-slate-100">{t('dashboard.notificationNew')}</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t('dashboard.notificationUpdate')}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="font-semibold text-slate-900 dark:text-slate-100">{t('dashboard.notificationReview')}</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t('dashboard.notificationTimely')}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
