import './Infobar.css';
import { useLanguage } from './context/LanguageContext.jsx';
import { t } from './translations.js';

export default function Infobar({ showInfobar }) {
  const { lang } = useLanguage();

  return (
    <div
      className={`infobar ${lang === 'fr' ? 'infobar-fr' : ''} ${showInfobar ? 'infobar-active' : ''}`}
    >
      <ul>
        <li>
          <a href="/" className="list-link">
            <span className="lucide--home"></span>
            {t[lang].infobar.home}
          </a>
        </li>
        <li>
          <a href="about" className="list-link">
            <span className="lucide--info"></span>
            {t[lang].infobar.about}
          </a>
        </li>
        <li>
          <a href="disclaimer" className="list-link">
            <span className="lucide--scale"></span>
            {t[lang].infobar.disclaimer}
          </a>
        </li>
        <li>
          <a href="privacy" className="list-link">
            <span className="lucide--lock-keyhole"></span>
            {t[lang].infobar.privacy}
          </a>
        </li>
        <li>
          <a href="contact" className="list-link">
            <span className="lucide--id-card"></span>
            {t[lang].infobar.contact}
          </a>
        </li>
        <li>
          <a href="faq" className="list-link">
            <span className="lucide--circle-question-mark"></span>
            {t[lang].infobar.faq}
          </a>
        </li>
      </ul>
    </div>
  );
}
