import '../css/pages.css';
import '../css/faq.css';
import { useState } from 'react';
import Header from '../Header.jsx';
import Infobar from '../Infobar.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { t } from '../translations.js';

export default function FAQ() {
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
            <span className="lucide--circle-question-mark"></span>
            <h3>{t[lang].faq.header}</h3>
          </div>

          <div class="faq-card">
            <div class="faq-list">
              <div class="faq-item">
                <div class="faq-q">
                  <i class="ti ti-help-circle" aria-hidden="true"></i>
                  <span>{t[lang].faq.q1}</span>
                </div>
                <p
                  class="faq-a"
                  dangerouslySetInnerHTML={{
                    __html: t[lang].faq.a1,
                  }}
                ></p>
              </div>

              <div class="faq-item">
                <div class="faq-q">
                  <i class="ti ti-help-circle" aria-hidden="true"></i>
                  <span>{t[lang].faq.q2}</span>
                </div>
                <p
                  class="faq-a"
                  dangerouslySetInnerHTML={{
                    __html: t[lang].faq.a2,
                  }}
                ></p>
              </div>

              <div class="faq-item">
                <div class="faq-q">
                  <i class="ti ti-help-circle" aria-hidden="true"></i>
                  <span>{t[lang].faq.q3}</span>
                </div>
                <p
                  class="faq-a"
                  dangerouslySetInnerHTML={{
                    __html: t[lang].faq.a3,
                  }}
                ></p>
              </div>

              <div class="faq-item">
                <div class="faq-q">
                  <i class="ti ti-help-circle" aria-hidden="true"></i>
                  <span>{t[lang].faq.q4}</span>
                </div>
                <p
                  class="faq-a"
                  dangerouslySetInnerHTML={{
                    __html: t[lang].faq.a4,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
