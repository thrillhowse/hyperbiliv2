import "./Header.css";
import { useLanguage } from "./context/LanguageContext.jsx";
import { useState } from "react";
import { t } from "./translations.js";

export default function Header({ showInfobar, setShowInfobar }) {
  const { lang, toggle } = useLanguage();

  return (
    <header>
      <span
        id="header-list-icon"
        className={`solar--list-broken header-icon ${showInfobar ? "hidden" : ""}`}
        onClick={() => setShowInfobar(true)}
      ></span>
      <span
        id="header-list-close-icon"
        className={`material-symbols--close header-icon ${showInfobar ? "" : "hidden"}`}
        onClick={() => setShowInfobar(false)}
      ></span>
      <a href="/" className="title-link">
        <h1 className="title">hyperbili</h1>
        <span className="fluent--molecule-32-regular"></span>
      </a>
      <div className="nav-container">
        <ul className="nav-list">
          <li className="nav-list-item">
            <a href="/" className="list-link">
              <span className="lucide--home"></span>
              {t[lang].infobar.home}
            </a>
          </li>
          <li className="nav-list-item">
            <a href="about" className="list-link">
              <span className="lucide--info"></span>
              {t[lang].infobar.about}
            </a>
          </li>
          <li className="nav-list-item">
            <a href="disclaimer" className="list-link">
              <span className="lucide--scale"></span>
              {t[lang].infobar.disclaimer}
            </a>
          </li>
          <li className="nav-list-item">
            <a href="privacy" className="list-link">
              <span className="lucide--lock-keyhole"></span>
              {t[lang].infobar.privacy}
            </a>
          </li>
          <li className="nav-list-item">
            <a href="contact" className="list-link">
              <span className="lucide--id-card"></span>
              {t[lang].infobar.contact}
            </a>
          </li>
          <li className="nav-list-item">
            <a href="faq" className="list-link">
              <span className="lucide--circle-question-mark"></span>
              {t[lang].infobar.faq}
            </a>
          </li>
          <li
            className="nav-list-item"
            style={{ color: "var(--secondary-color)", fontWeight: "bold" }}
          >
            <a href="pwa" className="list-link">
              <span className="lucide--smartphone"></span>
              {t[lang].infobar.pwa}
            </a>
          </li>
        </ul>
      </div>
      <button onClick={toggle} className="lang-toggle">
        {lang === "en" ? "EN" : "FR"}
      </button>
    </header>
  );
}
