import '../css/pages.css';
import '../css/privacy.css';
import { useState } from 'react';
import Header from '../Header.jsx';
import Infobar from '../Infobar.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { t } from '../translations.js';

export default function Privacy() {
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
        <div className="pages-container privacy-card">
          <div className="pages-title-container">
            <span className="lucide--lock-keyhole"></span>
            <h3>{t[lang].privacy.header}</h3>
          </div>
          <div className="pc-intro">
            <p
              dangerouslySetInnerHTML={{
                __html: t[lang].privacy.text1,
              }}
            ></p>
          </div>

          <ul className="pc-guarantees">
            <li className="pc-item">
              <span className="lucide--shield-ban"></span>
              <div>
                <div className="pc-claim">{t[lang].privacy.itemTitle1}</div>
                <div
                  className="pc-detail"
                  dangerouslySetInnerHTML={{
                    __html: t[lang].privacy.itemText1,
                  }}
                ></div>
              </div>
            </li>
            <li className="pc-item">
              <span className="lucide--laptop-minimal"></span>
              <div>
                <div className="pc-claim">{t[lang].privacy.itemTitle2}</div>
                <div
                  className="pc-detail"
                  dangerouslySetInnerHTML={{
                    __html: t[lang].privacy.itemText2,
                  }}
                ></div>
              </div>
            </li>

            <li className="pc-item">
              <span className="lucide--cloud-off"></span>
              <div>
                <div className="pc-claim">{t[lang].privacy.itemTitle3}</div>
                <div
                  className="pc-detail"
                  dangerouslySetInnerHTML={{
                    __html: t[lang].privacy.itemText3,
                  }}
                ></div>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}
