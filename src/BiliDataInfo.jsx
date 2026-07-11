import './ExtraInfo.css';
import { useLanguage } from './context/LanguageContext.jsx';
import { t } from './translations.js';

export default function BiliDataInfo() {
  const { lang } = useLanguage();

  return (
    <div className="info-container">
      <div className="info-container-header">
        <span className="lucide--info info-container-header-icon"></span>
        <h3 className="info-container-header-text">
          {t[lang].biliDataInfo.header}
        </h3>
      </div>
      <div className="info-container-body">
        <div className="info-container-body-text">
          <p className="info-container-title">{t[lang].biliDataInfo.header1}</p>
          <p className="info-container-text">{t[lang].biliDataInfo.text1}</p>
        </div>
      </div>
      <div className="info-container-body">
        <div className="info-container-body-text">
          <p className="info-container-title">{t[lang].biliDataInfo.header2}</p>
          <p className="info-container-text">{t[lang].biliDataInfo.text2}</p>
        </div>
      </div>
      <div className="info-container-body">
        <div className="info-container-body-text">
          <p className="info-container-title">{t[lang].biliDataInfo.header3}</p>
          <p className="info-container-text">{t[lang].biliDataInfo.text3}</p>
        </div>
      </div>
      <div className="info-container-body">
        <div className="info-container-body-text">
          <p className="info-container-title">{t[lang].biliDataInfo.header4}</p>
          <p className="info-container-text">{t[lang].biliDataInfo.text4}</p>
        </div>
      </div>
    </div>
  );
}
