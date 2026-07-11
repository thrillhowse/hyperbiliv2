import { useState } from 'react';
import { useDialogModal } from '../../dialog/useDialogModal.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { t } from '../../translations.js';

// helpers
import { closeOnBackdrop } from '../../dialog/closeOnBackdrop.js';

export default function PreviousPhototherapy({
  previousPhototherapy,
  setPreviousPhototherapy,
  previousPhototherapyRef,
  showPreviousPhototherapyErrorMsg,
  setShowPreviousPhototherapyErrorMsg,
}) {
  const { lang } = useLanguage();

  const [showPreviousPhotoDialog, setShowPreviousPhotoDialog] = useState(false);
  const previousPhotoDialogRef = useDialogModal(showPreviousPhotoDialog);

  const handlePreviousPhotoChange = (previousPhotoInput) => {
    setShowPreviousPhototherapyErrorMsg(false);

    // Update state with valid previous phototherapy input
    setPreviousPhototherapy(previousPhotoInput.value);
  };

  return (
    <div className="container-input" ref={previousPhototherapyRef}>
      <div className="input-label">
        <label htmlFor="previous-phototherapy-sublabel" className="sub-label">
          {t[lang].patientDetails.phototherapySublabel2}
          <span
            id="infoBubblePreviousPhoto"
            onClick={() => setShowPreviousPhotoDialog(true)}
          >
            <span
              className="lucide--info info-dialog-btn"
              style={{ marginLeft: '4px' }}
            ></span>
          </span>
          <dialog
            id="previousPhotoDialog"
            ref={previousPhotoDialogRef}
            onClick={(e) =>
              closeOnBackdrop(e, () => setShowPreviousPhotoDialog(false))
            }
          >
            <p className="dialog-title">
              {t[lang].patientDetails.previousPhototherapyDialogText1}
            </p>
            <p className="dialog-text">
              {t[lang].patientDetails.previousPhototherapyDialogText2}
            </p>
            <p className="dialog-text">
              {t[lang].patientDetails.previousPhototherapyDialogText3}
            </p>
            <button
              id="closePreviousPhotoDialogBtn"
              className="close-dialog-btn"
              onClick={() => setShowPreviousPhotoDialog(false)}
            >
              {t[lang].buttons.close}
            </button>
          </dialog>
        </label>
      </div>
      <div className="previous-phototherapy-toggle">
        <button
          id="previousPhototherapyYes"
          name="previousPhototherapy"
          value="Yes"
          type="button"
          className={`previous-phototherapy-btn ${previousPhototherapy === 'Yes' ? ' previous-phototherapy-btn--active' : ''}`}
          onClick={(e) => handlePreviousPhotoChange(e.target)}
        >
          {t[lang].buttons.yes}
        </button>
        <button
          id="previousPhototherapyNo"
          name="previousPhototherapy"
          value="No"
          type="button"
          className={`previous-phototherapy-btn ${previousPhototherapy === 'No' ? ' previous-phototherapy-btn--active' : ''}`}
          onClick={(e) => handlePreviousPhotoChange(e.target)}
        >
          {t[lang].buttons.no}
        </button>
      </div>
      <p id="previousPhototherapyError" className="input-error-text">
        {showPreviousPhototherapyErrorMsg &&
          t[lang].error.patientPreviousPhototherapyErrorMsg}
      </p>
    </div>
  );
}
