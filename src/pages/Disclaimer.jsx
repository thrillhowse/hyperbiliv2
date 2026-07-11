import '../css/pages.css';
import { useState } from 'react';
import Header from '../Header.jsx';
import Infobar from '../Infobar.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { t } from '../translations.js';

export default function Disclaimer() {
  const { lang } = useLanguage();

  const [showInfobar, setShowInfobar] = useState(false);

  return (
    <>
      <Header showInfobar={showInfobar} setShowInfobar={setShowInfobar} />
      <Infobar showInfobar={showInfobar} />
      <main className="main-pages-container">
        <h2 id="consentTitle" className="subtitle--lg">
          hyperbili
          <span className="fluent--molecule-32-regular"></span>
        </h2>
        <div className="pages-container">
          <div className="pages-title-container">
            <span className="lucide--scale"></span>
            <h3>{t[lang].disclaimer.header}</h3>
          </div>
          <div className="consent-text-container">
            <span className="lucide--heart-handshake"></span>
            <p
              dangerouslySetInnerHTML={{
                __html: t[lang].disclaimer.firstSection,
              }}
              className="consent-text"
            ></p>
          </div>

          <div className="consent-text-container">
            <span className="lucide--clipboard-plus"></span>
            <p
              dangerouslySetInnerHTML={{
                __html: t[lang].disclaimer.secondSection,
              }}
              className="consent-text"
            ></p>
          </div>

          <div className="consent-text-container">
            <span className="lucide--triangle-alert caution"></span>
            <p className="consent-text">{t[lang].disclaimer.thirdSection}</p>
          </div>

          <div className="affirm-consent-text-container">
            <p id="affirmConsentText" className="consent-text green-text">
              <span className="lucide--check"></span>
              {t[lang].disclaimer.fourthSection}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
