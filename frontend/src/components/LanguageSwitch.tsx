import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import './LanguageSwitch.css';

const LanguageSwitch: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (newLanguage: 'zh' | 'en') => {
    setLanguage(newLanguage);
  };

  return (
    <div className="language-switch">
      <div className="language-switch-container">
        <button
          className={`language-btn ${language === 'zh' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('zh')}
        >
          🇨🇳 中文
        </button>
        <button
          className={`language-btn ${language === 'en' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('en')}
        >
          🇺🇸 English
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitch; 