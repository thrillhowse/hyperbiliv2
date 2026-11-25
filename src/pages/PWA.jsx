import "../css/pages.css";
import "../css/pwa.css";
import { useState } from "react";
import Header from "../Header.jsx";
import Infobar from "../Infobar.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { t } from "../translations.js";

export default function PWA() {
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
            <span className="lucide--smartphone"></span>
            <h3>{t[lang].pwa.header}</h3>
          </div>
          <div className="pages-text-container">
            <p dangerouslySetInnerHTML={{ __html: t[lang].pwa.text1 }}></p>
          </div>
          <div className="pages-text-container">
            <p>
              <span className="lucide--triangle-alert pwa-icon pwa-icon-amber"></span>
              <span
                dangerouslySetInnerHTML={{ __html: t[lang].pwa.text2 }}
              ></span>
            </p>
          </div>

          <div className="pages-text-container flex-col">
            <p className="pwa-section-header">
              <span className="lucide--apple pwa-icon pwa-icon-red"></span>
              <span>
                <b>For iPhone/iPad (Safari on iOS)</b>
              </span>
            </p>
            <div className="pwa-section-container">
              <p>Apple allows this feature through Safari</p>
              <ol className="pwa-ol">
                <li>Open Safari</li>
                <li>
                  Go to{" "}
                  <a
                    href="https://hyperbili.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://hyperbili.com/
                  </a>
                </li>
                <li>
                  Tap the menu icon (the three dots ... next to the address bar)
                </li>
                <li>Then tap the Share icon (the square with an arrow ↑)</li>
                <li>Scroll down and tap Add to Home Screen</li>
                <li>Confirm the name, then tap Add</li>
              </ol>
            </div>
          </div>

          <div className="pages-text-container flex-col">
            <p className="pwa-section-header">
              <span className="lucide--bot pwa-icon pwa-icon-green"></span>
              <span>
                <b>For Android (Chrome on Android)</b>
              </span>
            </p>
            <div className="pwa-section-container">
              <p>Android allows this feature through Chrome</p>
              <ol className="pwa-ol">
                <li>Open Chrome</li>
                <li>
                  Go to{" "}
                  <a
                    href="https://hyperbili.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://hyperbili.com/
                  </a>
                </li>
                <li>Tap the Share icon (the square with an arrow ↑)</li>
                <li>
                  Tap the More icon (the three dots ... next to the address bar)
                </li>
                <li>Scroll down and tap Add to Home Screen</li>
                <li>Confirm the name, then tap Add</li>
              </ol>
            </div>
          </div>

          <div className="pages-text-container flex-col">
            <p className="pwa-section-header">
              <b>Why do this?</b>
            </p>
            <ul className="pwa-ul">
              <li>
                <b>Quick Access:</b> Launch hyperbili directly from your phone's
                home screen without needing to open a browser first.
              </li>
              <li>
                <b>Feels like an App:</b> enjoy a more immersive experience that
                looks and feels like a native app.
              </li>
              <li>
                <b>Skip the Store:</b> No need to visit an app store.
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
