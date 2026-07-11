import { useState } from 'react';
import Header from './Header.jsx';
import Infobar from './Infobar.jsx';
import Disclaimer from './Disclaimer.jsx';
import Wizard from './Wizard.jsx';
import UpdateWarningDialog from './UpdateWarningDialog.jsx';
import { useLanguage } from './context/LanguageContext.jsx';
import { t } from './translations.js';

export default function Home() {
  const { lang } = useLanguage();

  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [showInfobar, setShowInfobar] = useState(false);
  const [showUpdateWarning, setShowUpdateWarning] = useState(false);

  const handleConsent = () => {
    setShowDisclaimer(false);
    setShowUpdateWarning(true);
  };

  return (
    <>
      <Header showInfobar={showInfobar} setShowInfobar={setShowInfobar} />
      <Infobar showInfobar={showInfobar} />
      <main>
        <Disclaimer
          showDisclaimer={showDisclaimer}
          setShowDisclaimer={handleConsent}
        />
        <Wizard showDisclaimer={showDisclaimer} />
      </main>
      <UpdateWarningDialog
        showUpdateWarning={showUpdateWarning}
        setShowUpdateWarning={setShowUpdateWarning}
      />
    </>
  );
}
