import './ExtraInfo.css';
import { useLanguage } from './context/LanguageContext.jsx';
import { t } from './translations.js';

export default function Updates() {
  const { lang } = useLanguage();

  return (
    <div className="info-container">
      <div className="info-container-header">
        <span className="lucide--info info-container-header-icon"></span>
        <h3 className="info-container-header-text">{t[lang].updates.header}</h3>
      </div>
      <div className="info-container-body">
        <div className="info-container-body-text">
          <p className="info-container-title">{t[lang].updates.header1}</p>
          <p className="info-container-text">{t[lang].updates.text1}</p>
        </div>
      </div>
      <div className="info-container-body">
        <div className="info-container-body-text">
          <p className="info-container-title">{t[lang].updates.header2}</p>
          <p className="info-container-text">
            {t[lang].updates.text2}
            <a href="mailto:hyperbili@outlook.com">hyperbili@outlook.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
