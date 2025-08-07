import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const Tips: React.FC = () => {
  const [showTips, setShowTips] = useState(false);
  const { t } = useLanguage();

  const tips = [
    {
      icon: "💡",
      title: t('tips.0.title'),
      content: t('tips.0.content')
    },
    {
      icon: "✂️",
      title: t('tips.1.title'),
      content: t('tips.1.content')
    },
    {
      icon: "📱",
      title: t('tips.2.title'),
      content: t('tips.2.content')
    },
    {
      icon: "🎨",
      title: t('tips.3.title'),
      content: t('tips.3.content')
    }
  ];

  const examples = [
    t('examples.0'),
    t('examples.1'),
    t('examples.2')
  ];

  return (
    <div className="tips-container">
      <button 
        className="tips-toggle"
        onClick={() => setShowTips(!showTips)}
      >
        {showTips ? t('tipsToggleClose') : t('tipsToggle')}
      </button>
      
      {showTips && (
        <div className="tips-content">
          <div className="tips-section">
            <h3>{t('tipsStepsTitle')}</h3>
            <div className="tips-grid">
              {tips.map((tip, index) => (
                <div key={index} className="tip-item">
                  <div className="tip-icon">{tip.icon}</div>
                  <div className="tip-text">
                    <h4>{tip.title}</h4>
                    <p>{tip.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="tips-section">
            <h3>{t('tipsExamplesTitle')}</h3>
            <div className="examples">
              {examples.map((example, index) => (
                <div key={index} className="example-item">
                  "{example}"
                </div>
              ))}
            </div>
          </div>
          
          <div className="tips-section">
            <h3>{t('tipsTipsTitle')}</h3>
            <ul className="tips-list">
              <li>{t('tipsList.0')}</li>
              <li>{t('tipsList.1')}</li>
              <li>{t('tipsList.2')}</li>
              <li>{t('tipsList.3')}</li>
              <li>{t('tipsList.4')}</li>
              <li>{t('tipsList.5')}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tips; 