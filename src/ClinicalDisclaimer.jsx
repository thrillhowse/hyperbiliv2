import './ExtraInfo.css';
import { useLanguage } from './context/LanguageContext.jsx';
import { t } from './translations.js';

export default function ClinicalDisclaimer() {
  const { lang } = useLanguage();

  return (
    <div className="info-container amber-container">
      <div className="info-container-body">
        <div className="info-container-body-text">
          <p className="info-container-title amber-title">
            {t[lang].clinicalDisclaimer.header1}
          </p>
          <p className="info-container-text amber-text">
            {t[lang].clinicalDisclaimer.text1}
          </p>
        </div>
      </div>
    </div>
  );
}
