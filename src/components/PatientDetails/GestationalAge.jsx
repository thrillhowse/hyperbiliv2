import { useState } from "react";
import { useDialogModal } from "../../dialog/useDialogModal.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { t } from "../../translations.js";

// helpers
import { closeOnBackdrop } from "../../dialog/closeOnBackdrop.js";

export default function GestationalAge({
  gestAge,
  setGestAge,
  gestAgeRef,
  showGestAgeErrorMsg,
  setShowGestAgeErrorMsg,
}) {
  const { lang } = useLanguage();

  const [showGestAgeDialog, setShowGestAgeDialog] = useState(false);
  const gestAgeDialogRef = useDialogModal(showGestAgeDialog);

  const handleGestAgeChange = (gestAgeInput) => {
    setShowGestAgeErrorMsg(false);
    setGestAge("");

    // Validate the gestational age at birth input
    const gestAge = parseInt(gestAgeInput.value, 10);

    if (!gestAgeInput.value || isNaN(gestAge)) return;
    if (gestAge < 35 || gestAge > 40) {
      setShowGestAgeErrorMsg(true);
      return;
    }

    // Update state with valid gestational age input
    setGestAge(gestAgeInput.value);
  };

  return (
    <div className="container-input" ref={gestAgeRef}>
      <div className="input-label">
        <label htmlFor="gestAge" className="input-label-text">
          <span className="lucide--baby container-icon"></span>
          <p className="input-label-text-container">
            {t[lang].patientDetails.gestAge}
          </p>
          <span
            id="infoBubbleGestAgeAtBirth"
            onClick={() => setShowGestAgeDialog(true)}
          >
            <span className="lucide--info info-dialog-btn"></span>
          </span>
        </label>
        <dialog
          id="gestAgeAtBirthDialog"
          ref={gestAgeDialogRef}
          onClick={(e) => closeOnBackdrop(e, () => setShowGestAgeDialog(false))}
        >
          <p className="dialog-title">{t[lang].patientDetails.gestAgeLong}</p>
          <p
            dangerouslySetInnerHTML={{
              __html: t[lang].patientDetails.gestAgeDialogText1,
            }}
            className="dialog-text"
          ></p>
          <p className="dialog-text">
            {t[lang].patientDetails.gestAgeDialogText2}
          </p>
          <button
            id="closeGestAgeAtBirthDialogBtn"
            className="close-dialog-btn"
            onClick={() => setShowGestAgeDialog(false)}
          >
            {t[lang].buttons.close}
          </button>
        </dialog>
      </div>
      <select
        id="gestAge"
        name="gestAge"
        value={gestAge}
        className={[
          showGestAgeErrorMsg ? "input-error" : "",
          gestAge ? "selected" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onChange={(e) => handleGestAgeChange(e.currentTarget)}
      >
        <option value="">{t[lang].patientDetails.gestAge}</option>
        <option value="35">35 {t[lang].dictionary.weeks}</option>
        <option value="36">36 {t[lang].dictionary.weeks}</option>
        <option value="37">37 {t[lang].dictionary.weeks}</option>
        <option value="38">38 {t[lang].dictionary.weeks}</option>
        <option value="39">39 {t[lang].dictionary.weeks}</option>
        <option value="40">40+ {t[lang].dictionary.weeks}</option>
      </select>
      <p id="gestAgeError" className="input-error-text">
        {showGestAgeErrorMsg && t[lang].error.patientGestAgeErrorMsg}
      </p>
    </div>
  );
}
