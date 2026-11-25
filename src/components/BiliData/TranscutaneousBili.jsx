import { useState } from "react";
import { useDialogModal } from "../../dialog/useDialogModal.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { t } from "../../translations.js";

// helpers
import { closeOnBackdrop } from "../../dialog/closeOnBackdrop.js";

export default function TranscutaneousBili({
  index,
  tcb,
  setBiliData,
  tcbErrorKey,
}) {
  const { lang } = useLanguage();

  const [showTcbDialog, setShowTcbDialog] = useState(false);
  const tcbDialogRef = useDialogModal(showTcbDialog);

  const dialogId = `tcbDialog-${index + 1}`;

  const handleTcbChange = (tcbInput) => {
    // Reset tcb for this entry and clear any existing errors
    setBiliData((prevData) => {
      return prevData.map((entry, i) => {
        if (i === index) {
          return { ...entry, tcb: "", errors: { ...entry.errors, tcb: null } };
        }
        return entry;
      });
    });

    const raw = tcbInput.value;

    if (raw === "") return;

    if (!/^\d+$/.test(raw)) {
      setBiliData((prevData) => {
        return prevData.map((entry, i) => {
          if (i === index) {
            return {
              ...entry,
              tcb: "",
              errors: { ...entry.errors, tcb: "tcbErrorMsg" },
            };
          }
          return entry;
        });
      });
      return;
    }

    const tcbValue = Number(raw);

    if (!Number.isSafeInteger(tcbValue) || tcbValue < 1) {
      setBiliData((prevData) => {
        return prevData.map((entry, i) => {
          if (i === index) {
            return {
              ...entry,
              tcb: "",
              errors: { ...entry.errors, tcb: "tcbErrorMsg" },
            };
          }
          return entry;
        });
      });
      return;
    }

    // Update state with valid tcb input
    const newTcb = tcbValue;
    setBiliData((prevData) => {
      return prevData.map((entry, i) => {
        if (i === index) {
          return {
            ...entry,
            tcb: newTcb,
            errors: { ...entry.errors, tcb: null },
          };
        }
        return entry;
      });
    });
  };

  return (
    <div className="entry-input-item">
      <div className="input-label">
        <label htmlFor={`tcb${index + 1}`} className="input-label-text">
          <span className="lucide--flashlight container-icon"></span>
          {t[lang].biliData.tcb}
        </label>
        <button
          type="button"
          id={`infoBubbleTcb${index + 1}`}
          className="info-trigger"
          aria-label={t[lang].biliData.tcb}
          aria-haspopup="dialog"
          aria-controls={dialogId}
          onClick={() => setShowTcbDialog(true)}
        >
          <span className="lucide--info info-dialog-btn" aria-hidden="true" />
        </button>
        <dialog
          id={dialogId}
          ref={tcbDialogRef}
          onCancel={() => setShowTcbDialog(false)}
          onClick={(e) => closeOnBackdrop(e, () => setShowTcbDialog(false))}
        >
          <p className="dialog-title">{t[lang].biliData.tcbDialogTitle}</p>
          <p className="dialog-text">{t[lang].biliData.tcbDialogText}</p>
          <button
            className="close-dialog-btn"
            onClick={() => setShowTcbDialog(false)}
          >
            {t[lang].buttons.close}
          </button>
        </dialog>
      </div>
      <input
        type="number"
        id={`tcb${index + 1}`}
        className={`tcb-input bili-table-data width-100 ${tcbErrorKey ? "input-error" : ""}`}
        name={`tcb${index + 1}`}
        min="1"
        step="1"
        value={tcb}
        onChange={(e) => handleTcbChange(e.target)}
      />
      {tcbErrorKey && (
        <p className="input-error-text">{t[lang].error[tcbErrorKey]}</p>
      )}
    </div>
  );
}
