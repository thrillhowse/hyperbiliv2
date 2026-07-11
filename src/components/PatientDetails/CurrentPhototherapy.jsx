import { useState } from 'react';
import { useDialogModal } from '../../dialog/useDialogModal.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { t } from '../../translations.js';

export default function CurrentPhototherapy({
  currentPhototherapy,
  setCurrentPhototherapy,
  currentPhototherapyRef,
  showCurrentPhototherapyErrorMsg,
  setShowCurrentPhototherapyErrorMsg,
}) {
  const { lang } = useLanguage();

  const handleCurrentPhototherapyChange = (currentPhototherapyInput) => {
    setShowCurrentPhototherapyErrorMsg(false);

    // Update state with valid current phototherapy input
    setCurrentPhototherapy(currentPhototherapyInput.value);
  };

  return (
    <div className="container-input" ref={currentPhototherapyRef}>
      <div className="input-label">
        <label htmlFor="current-phototherapy-sublabel" className="sub-label">
          {t[lang].patientDetails.phototherapySublabel1}
        </label>
      </div>
      <div className="current-phototherapy-toggle">
        <button
          id="currentPhototherapyYes"
          name="currentPhototherapy"
          value="Yes"
          type="button"
          className={`current-phototherapy-btn ${currentPhototherapy === 'Yes' ? ' current-phototherapy-btn--active' : ''}`}
          onClick={(e) => handleCurrentPhototherapyChange(e.target)}
        >
          {t[lang].buttons.yes}
        </button>
        <button
          id="currentPhototherapyNo"
          name="currentPhototherapy"
          value="No"
          type="button"
          className={`current-phototherapy-btn ${currentPhototherapy === 'No' ? ' current-phototherapy-btn--active' : ''}`}
          onClick={(e) => handleCurrentPhototherapyChange(e.target)}
        >
          {t[lang].buttons.no}
        </button>
      </div>
      <p id="currentPhototherapyError" className="input-error-text">
        {showCurrentPhototherapyErrorMsg &&
          t[lang].error.patientCurrentPhototherapyErrorMsg}
      </p>
    </div>
  );
}
