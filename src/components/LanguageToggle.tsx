import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('_language', newLanguage);
  };

  return (
    <button onClick={toggleLanguage} className="bg-card shadow-md rounded-lg p-2">
      <Globe className="h-5 w-5" />
    </button>
  );
};

export default LanguageToggle;

