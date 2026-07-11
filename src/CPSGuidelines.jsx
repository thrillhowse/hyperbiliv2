import './ExtraInfo.css';
import { useLanguage } from './context/LanguageContext.jsx';
import { t } from './translations.js';

export default function CPSGuidelines() {
  const { lang } = useLanguage();

  return (
    <div className="info-container blue-container">
      <div className="info-container-body">
        <div className="info-container-body-text">
          <p className="info-container-title blue-title">
            {t[lang].cpsGuidelines.header1}
          </p>
          <p className="info-container-text blue-text">
            {t[lang].cpsGuidelines.text1}
          </p>
        </div>
      </div>
    </div>
  );
}
