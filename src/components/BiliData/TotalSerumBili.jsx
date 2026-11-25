import { useState } from "react";
import { useDialogModal } from "../../dialog/useDialogModal.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { t } from "../../translations.js";

// helpers
import { closeOnBackdrop } from "../../dialog/closeOnBackdrop.js";

export default function TotalSerumBili({
  index,
  tsb,
  setBiliData,
  tsbErrorKey,
}) {
  const { lang } = useLanguage();

  const [showTsbDialog, setShowTsbDialog] = useState(false);
  const tsbDialogRef = useDialogModal(showTsbDialog);

  const dialogId = `tsbDialog-${index + 1}`;

  const handleTsbChange = (tsbInput) => {
    // Reset tsb for this entry and clear any existing errors
    setBiliData((prevData) => {
      return prevData.map((entry, i) => {
        if (i === index) {
          return { ...entry, tsb: "", errors: { ...entry.errors, tsb: null } };
        }
        return entry;
      });
    });

    const raw = tsbInput.value;

    if (raw === "") return;

    if (!/^\d+$/.test(raw)) {
      setBiliData((prevData) => {
        return prevData.map((entry, i) => {
          if (i === index) {
            return {
              ...entry,
              tsb: "",
              errors: { ...entry.errors, tsb: "tsbErrorMsg" },
            };
          }
          return entry;
        });
      });
      return;
    }

    const tsbValue = Number(raw);

    if (!Number.isSafeInteger(tsbValue) || tsbValue < 1) {
      setBiliData((prevData) => {
        return prevData.map((entry, i) => {
          if (i === index) {
            return {
              ...entry,
              tsb: "",
              errors: { ...entry.errors, tsb: "tsbErrorMsg" },
            };
          }
          return entry;
        });
      });
      return;
    }

    // Update state with valid tsb input
    const newTsb = tsbValue;
    setBiliData((prevData) => {
      return prevData.map((entry, i) => {
        if (i === index) {
          return {
            ...entry,
            tsb: newTsb,
            errors: { ...entry.errors, tsb: null },
          };
        }
        return entry;
      });
    });
  };

  return (
    <div className="entry-input-item">
      <div className="input-label">
        <label htmlFor={`tsb${index + 1}`} className="input-label-text">
          <span className="lucide--droplet container-icon"></span>
          {t[lang].biliData.tsb}
        </label>
        <button
          type="button"
          id={`infoBubbleTsb${index + 1}`}
          className="info-trigger"
          aria-label={t[lang].biliData.tsb}
          aria-haspopup="dialog"
          aria-controls={dialogId}
          onClick={() => setShowTsbDialog(true)}
        >
          <span className="lucide--info info-dialog-btn" aria-hidden="true" />
        </button>
        <dialog
          id={dialogId}
          ref={tsbDialogRef}
          onCancel={() => setShowTsbDialog(false)}
          onClick={(e) => closeOnBackdrop(e, () => setShowTsbDialog(false))}
        >
          <p className="dialog-title">{t[lang].biliData.tsbDialogTitle}</p>
          <p className="dialog-text">{t[lang].biliData.tsbDialogText}</p>
          <button
            className="close-dialog-btn"
            onClick={() => setShowTsbDialog(false)}
          >
            {t[lang].buttons.close}
          </button>
        </dialog>
      </div>
      <input
        type="number"
        id={`tsb${index + 1}`}
        className={`tsb-input bili-table-data width-100 ${tsbErrorKey ? "input-error" : ""}`}
        name={`tsb${index + 1}`}
        min="1"
        step="1"
        value={tsb}
        onChange={(e) => handleTsbChange(e.target)}
      />
      {tsbErrorKey && (
        <p className="input-error-text">{t[lang].error[tsbErrorKey]}</p>
      )}
    </div>
  );
}
