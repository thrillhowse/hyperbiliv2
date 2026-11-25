import { useState } from "react";
import { useDialogModal } from "../../dialog/useDialogModal.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { t } from "../../translations.js";

// helpers
import { closeOnBackdrop } from "../../dialog/closeOnBackdrop.js";

export default function AgeInHours({
  index,
  ageInHours,
  setBiliData,
  ageInHoursErrorKey,
}) {
  const { lang } = useLanguage();

  const [showAgeDialog, setShowAgeDialog] = useState(false);
  const ageDialogRef = useDialogModal(showAgeDialog);

  const dialogId = `ageInHoursDialog-${index + 1}`;

  const handleAgeChange = (ageInput) => {
    // If user changes age in hours input, then need to erase the date of test and hour of test for this entry
    // to ensure that the user is aware that the previously entered date/hour of test may no longer be accurate
    // also reset any existing age in hours errors for this entry and any errors
    setBiliData((prevData) => {
      return prevData.map((entry, i) => {
        if (i === index) {
          return {
            ...entry,
            dot: "",
            hot: "",
            ageInHours: "",
            errors: { ...entry.errors, ageInHours: null },
          };
        }
        return entry;
      });
    });

    const raw = ageInput.value;

    if (raw === "") return;

    if (!/^\d+$/.test(raw)) {
      setBiliData((prevData) => {
        return prevData.map((entry, i) => {
          if (i === index) {
            return {
              ...entry,
              errors: { ...entry.errors, ageInHours: "ageInHoursErrorMsg" },
            };
          }
          return entry;
        });
      });
      return;
    }

    const age = Number(raw);

    if (!Number.isSafeInteger(age) || age < 0) {
      setBiliData((prevData) => {
        return prevData.map((entry, i) => {
          if (i === index) {
            return {
              ...entry,
              errors: { ...entry.errors, ageInHours: "ageInHoursErrorMsg" },
            };
          }
          return entry;
        });
      });
      return;
    }

    // Update state with valid age input
    const newAge = age;
    setBiliData((prevData) => {
      return prevData.map((entry, i) => {
        if (i === index) {
          return {
            ...entry,
            ageInHours: newAge,
            errors: { ...entry.errors, ageInHours: null },
          };
        }
        return entry;
      });
    });
  };

  return (
    <div className="entry-input-item">
      <div className="input-label">
        <label htmlFor={`ageInHours${index + 1}`} className="input-label-text">
          <span className="lucide--hourglass container-icon"></span>
          {t[lang].biliData.ageInHours}
        </label>
        <button
          type="button"
          id={`infoBubbleAgeInHours${index + 1}`}
          className="info-trigger"
          aria-label={t[lang].biliData.ageInHours}
          aria-haspopup="dialog"
          aria-controls={dialogId}
          onClick={() => setShowAgeDialog(true)}
        >
          <span className="lucide--info info-dialog-btn" aria-hidden="true" />
        </button>
        <dialog
          id={dialogId}
          ref={ageDialogRef}
          onCancel={() => setShowAgeDialog(false)}
          onClick={(e) => closeOnBackdrop(e, () => setShowAgeDialog(false))}
        >
          <p className="dialog-title">
            {t[lang].biliData.ageInHoursDialogTitle}
          </p>
          <p className="dialog-text">
            {t[lang].biliData.ageInHoursDialogText1}
          </p>
          <p className="dialog-text">
            {t[lang].biliData.ageInHoursDialogText2}
          </p>
          <button
            className="close-dialog-btn"
            onClick={() => setShowAgeDialog(false)}
          >
            {t[lang].buttons.close}
          </button>
        </dialog>
      </div>
      <input
        type="number"
        id={`ageInHours${index + 1}`}
        className={`age-in-hours-input bili-table-data width-100 ${ageInHoursErrorKey ? "input-error" : ""}`}
        name={`ageInHours${index + 1}`}
        min="0" // Age: 0 allowed
        step="1"
        value={ageInHours}
        onChange={(e) => handleAgeChange(e.target)}
      />
      {ageInHoursErrorKey && (
        <p className="input-error-text">{t[lang].error[ageInHoursErrorKey]}</p>
      )}
    </div>
  );
}
