import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageToggle: React.FC = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('_language', newLanguage);
  };

  return (
    <button onClick={toggleLanguage} className="bg-card shadow-md rounded-lg p-2">
      {t(i18n.language === 'en' ? 'Switch to Chinese' : 'Switch to English')}
    </button>
  );
};

export default LanguageToggle;
