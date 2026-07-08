import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, CreditCard, CheckCircle2, Search, Sparkles, UserCircle2 } from 'lucide-react';
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
  const { t } = useTranslation(['common', 'dashboard', 'notifications', 'forms']);
  const { formatCurrency, formatDate, formatTime, formatNumber, formatRelative } = useLocaleFormat();
  const { pushToast } = useToast();
  const [query, setQuery] = useState('');

  const Hero = () => (
    <div className="mb-8 space-y-6">
      <Card className="!p-10">
        <div className="max-w-5xl">
          <p
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: 'var(--locale-primary)' }}
          >
            🌍 Explore Global Experiences
          </p>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-locale-text">
            Switch between languages and instantly experience localized UI, colors, typography, layout direction, formatting, and culture.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-locale-text-secondary">
            Select a language below to transform the application's identity — themes, direction, and locale-aware formatting update instantly.
          </p>
        </div>
      </Card>
      <LanguageSelector />
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />

      {/* Welcome + Live time cards */}
      <div className="mb-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <Card>
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--locale-primary)' }}>
                {t('dashboard.welcomeTitle')}
              </p>
              <h1 className="mt-3 text-3xl font-bold text-locale-text">
                {t('dashboard.welcomeSubtitle', { name: 'Elise' })}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-locale-text-secondary">
                {t('dashboard.welcomeDescription')}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-3xl border border-locale-border bg-locale-surface px-5 py-4">
                <p className="text-xs text-locale-text-muted">{t('dashboard.liveTime')}</p>
                <p className="mt-2 text-2xl font-bold text-locale-text">{formatTime(new Date())}</p>
              </div>
              <div className="rounded-3xl border border-locale-border bg-locale-surface px-5 py-4">
                <p className="text-xs text-locale-text-muted">{t('dashboard.todayDate')}</p>
                <p className="mt-2 text-2xl font-bold text-locale-text">{formatDate(new Date())}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Analytics cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {analyticsCards.map(({ id, icon: Icon, value, labelKey, change }) => (
            <Card key={id} className="group hover:shadow-card">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-locale-text-muted">{t(labelKey)}</p>
                  <p className="mt-3 text-3xl font-bold text-locale-text">{formatNumber(value)}</p>
                </div>
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-locale-surface transition-transform group-hover:scale-110"
                >
                  <Icon size={20} style={{ color: 'var(--locale-primary)' }} aria-hidden="true" />
                </div>
              </div>
              <div className="mt-4 text-xs text-locale-text-muted">{t('dashboard.cardChange', { value: `+${change}%` })}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Activity + Table | Profile + Quick Actions */}
      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
        <div className="space-y-6">
          <Card title={t('dashboard.recentActivityTitle')}>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between rounded-3xl border border-locale-border bg-locale-surface px-5 py-4"
                >
                  <div className="flex items-center gap-3">
                    <Bell style={{ color: 'var(--locale-primary)' }} size={20} aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-locale-text">{t(activity.labelKey)}</p>
                      <p className="text-sm text-locale-text-muted">
                        {formatRelative(new Date(Date.now() + activity.timeOffset * 60000))}
                      </p>
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
                <h2 className="text-lg font-bold text-locale-text">{t('dashboard.tableTitle')}</h2>
                <p className="text-sm text-locale-text-muted">{t('dashboard.tableDescription')}</p>
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

            <div className="mt-6 overflow-hidden rounded-3xl border border-locale-border">
              <table className="min-w-full divide-y divide-locale-border text-left text-sm">
                <thead className="bg-locale-surface text-locale-text-secondary">
                  <tr>
                    <th className="px-6 py-4 font-bold">{t('dashboard.tableHeaderName')}</th>
                    <th className="px-6 py-4 font-bold">{t('dashboard.tableHeaderStatus')}</th>
                    <th className="px-6 py-4 font-bold">{t('dashboard.tableHeaderAmount')}</th>
                    <th className="px-6 py-4 font-bold">{t('dashboard.tableHeaderDate')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-locale-border bg-locale-card">
                  {filteredRows.length > 0 ? (
                    filteredRows.map((row) => (
                      <tr key={row.name} className="hover:bg-locale-surface">
                        <td className="px-6 py-4 font-medium text-locale-text">{row.name}</td>
                        <td className="px-6 py-4">
                          <Badge
                            variant={
                              row.status === 'Live' ? 'success' : row.status === 'Completed' ? 'neutral' : 'warning'
                            }
                          >
                            {t(`dashboard.status.${row.status.toLowerCase()}`)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-locale-text">{formatCurrency(row.amount)}</td>
                        <td className="px-6 py-4 text-locale-text-muted">{formatDate(row.date)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-sm text-locale-text-muted">
                        {t('common.emptyState')}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex items-center justify-between text-sm text-locale-text-muted">
              <span>{t('dashboard.paginationInfo', { count: filteredRows.length })}</span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  {t('dashboard.previous')}
                </Button>
                <Button variant="ghost" size="sm">
                  {t('dashboard.next')}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card title={t('dashboard.profileCardTitle')}>
            <div className="flex items-start gap-4">
              <div className="rounded-3xl bg-locale-surface p-4">
                <UserCircle2 size={32} style={{ color: 'var(--locale-primary)' }} aria-hidden="true" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-locale-text">{t('dashboard.profileName')}</p>
                <p className="text-sm text-locale-text-muted">{t('dashboard.profileRole')}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl border border-locale-border bg-locale-surface p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-locale-text-muted">
                      {t('dashboard.profileMetric1')}
                    </p>
                    <p className="mt-2 text-xl font-bold text-locale-text">{formatNumber(32)}</p>
                  </div>
                  <div className="rounded-3xl border border-locale-border bg-locale-surface p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-locale-text-muted">
                      {t('dashboard.profileMetric2')}
                    </p>
                    <p className="mt-2 text-xl font-bold text-locale-text">{formatNumber(8)}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card title={t('dashboard.quickActionsTitle')}>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full justify-start" onClick={handleQuickAction}>
                📊 {t('dashboard.actionExport')}
              </Button>
              <Button variant="secondary" className="w-full justify-start" onClick={handleQuickAction}>
                ✉️ {t('dashboard.actionInvite')}
              </Button>
              <Button variant="secondary" className="w-full justify-start" onClick={handleQuickAction}>
                📝 {t('dashboard.actionReview')}
              </Button>
            </div>
          </Card>

          <Card title={t('dashboard.notificationsTitle')}>
            <div className="space-y-4">
              <div className="rounded-3xl border border-locale-border bg-locale-surface p-4">
                <p className="font-bold text-locale-text">{t('dashboard.notificationNew')}</p>
                <p className="mt-2 text-sm text-locale-text-muted">{t('dashboard.notificationUpdate')}</p>
              </div>
              <div className="rounded-3xl border border-locale-border bg-locale-surface p-4">
                <p className="font-bold text-locale-text">{t('dashboard.notificationReview')}</p>
                <p className="mt-2 text-sm text-locale-text-muted">{t('dashboard.notificationTimely')}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
