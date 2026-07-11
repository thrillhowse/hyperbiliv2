import '../css/pages.css';
import '../css/contact.css';
import { useState } from 'react';
import Header from '../Header.jsx';
import Infobar from '../Infobar.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { t } from '../translations.js';

export default function Contact() {
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
            <span className="lucide--id-card"></span>
            <h3>{t[lang].contact.header}</h3>
          </div>
          <div className="contact-card">
            <div className="cc-details">
              <div className="cc-tile">
                <div>
                  <div className="cc-label">{t[lang].contact.email}</div>
                  <a className="cc-link" href="mailto:hyperbili@outlook.com">
                    hyperbili@outlook.com
                  </a>
                </div>
              </div>

              <div className="cc-tile">
                <div>
                  <div className="cc-label">{t[lang].contact.creator}</div>
                  <div className="cc-value">
                    Dr. Michael Hill, MD, FRCPC, General Pediatrician
                  </div>
                </div>
              </div>
            </div>

            <div className="cc-support">
              <div className="cc-support-heading">
                <i className="ti ti-heart-handshake" aria-hidden="true"></i>
                <span>{t[lang].contact.text1}</span>
              </div>

              <ul className="cc-support-list">
                <li>{t[lang].contact.support1}</li>
                <li>{t[lang].contact.support2}</li>
                <li>
                  <a href="https://cps.ca/en/" target="_blank">
                    {t[lang].contact.support3}
                  </a>
                </li>
                <li>
                  <a href="https://www.aap.org/" target="_blank">
                    {t[lang].contact.support4a}
                  </a>
                  {t[lang].contact.support4b}
                </li>
                <li>
                  <a href="https://healthygenerations.ca/" target="_blank">
                    {t[lang].contact.support5}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
