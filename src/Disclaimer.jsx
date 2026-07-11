import "./Disclaimer.css";
import { useLanguage } from "./context/LanguageContext.jsx";
import { t } from "./translations.js";

export default function Disclaimer({ showDisclaimer, setShowDisclaimer }) {
  const { lang } = useLanguage();

  return (
    <>
      <div className={`disclaimer ${showDisclaimer ? "" : "hidden"}`}>
        <h2 id="consentTitle" className="subtitle--lg">
          hyperbili
          <span className="fluent--molecule-32-regular"></span>
        </h2>
        <div className="disclaimer-text-container">
          <div className="consent-title-container">
            <span className="lucide--shield-check"></span>
            <h3>{t[lang].disclaimer.title}</h3>
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
          <div id="consent-btn-div" className="container">
            <button
              type="button"
              id="userConsentBtn"
              className="consent-btn"
              onClick={() => setShowDisclaimer(false)}
            >
              {t[lang].disclaimer.consentBtn}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
