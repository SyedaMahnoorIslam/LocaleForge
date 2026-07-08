import React from 'react';
import { motion } from 'framer-motion';
import { LanguageCard } from './LanguageCard';
import { localeMap } from '../../constants/locales';
import { useI18n } from '../../contexts/I18nContext';

export function LanguageSelector() {
  const { language, setLanguage } = useI18n();

  const handleSelect = async (lng: string) => {
    await setLanguage(lng as any);
  };

  return (
    <motion.div layout className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Object.keys(localeMap).map((key) => (
        <LanguageCard key={key} locale={{ ...localeMap[key], value: key }} isSelected={language === key} onSelect={handleSelect} />
      ))}
    </motion.div>
  );
}
