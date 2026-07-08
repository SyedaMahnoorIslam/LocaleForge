import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function NotFoundPage() {
  const { t } = useTranslation(['common', 'errors']);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid min-h-[calc(100vh-8rem)] place-items-center px-4 py-10"
    >
      <Card className="max-w-xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.24em]" style={{ color: 'var(--locale-primary)' }}>
          {t('errors.notFoundTitle')}
        </p>
        <h1 className="mt-4 text-4xl font-bold text-locale-text">{t('errors.notFoundMessage')}</h1>
        <p className="mt-4 text-sm text-locale-text-secondary">{t('errors.offlineMessage')}</p>
        <Link to="/" className="mt-6 inline-block">
          <Button>{t('common.backHome')}</Button>
        </Link>
      </Card>
    </motion.div>
  );
}
