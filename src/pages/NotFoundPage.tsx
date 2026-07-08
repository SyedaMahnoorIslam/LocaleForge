import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function NotFoundPage() {
  const { t } = useTranslation(['common', 'errors']);

  return (
    <div className="grid min-h-[calc(100vh-4rem)] place-items-center px-4 py-10">
      <Card className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary dark:text-sky-300">{t('errors.notFoundTitle')}</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900 dark:text-slate-100">{t('errors.notFoundMessage')}</h1>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{t('errors.offlineMessage')}</p>
        <Link to="/">
          <Button className="mt-6">{t('common.backHome')}</Button>
        </Link>
      </Card>
    </div>
  );
}
