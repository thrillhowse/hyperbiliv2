import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { t } from "../../translations.js";

export default function TranscutaneousBili({
  index,
  tcb,
  setBiliData,
  setShowTcbDialog,
}) {
  const { lang } = useLanguage();

  const [tcbErrorKey, setTcbErrorKey] = useState(null);

  const handleTcbChange = (tcbInput) => {
    setTcbErrorKey(null);

    // Reset tcb for this entry
    setBiliData((prevData) => {
      return prevData.map((entry, i) => {
        if (i === index) {
          return { ...entry, tcb: "" };
        }
        return entry;
      });
    });

    // Validate that tcb is present and is a valid number
    const tcbValue = parseInt(tcbInput.value, 10);

    if (isNaN(tcbValue)) return;
    if (tcbValue === 0 || tcbValue < 0 || tcbValue > 1000) {
      setTcbErrorKey("tcbErrorMsg");
      return;
    }

    // Update state with valid tcb input
    const newTcb = tcbValue;
    setBiliData((prevData) => {
      return prevData.map((entry, i) => {
        if (i === index) {
          return { ...entry, tcb: newTcb };
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
        <span onClick={() => setShowTcbDialog(true)}>
          <span className="lucide--info info-dialog-btn"></span>
        </span>
      </div>
      <input
        type="number"
        id={`tcb${index + 1}`}
        className={`tcb-input bili-table-data width-100 ${tcbErrorKey ? "input-error" : ""}`}
        name={`tcb${index + 1}`}
        min="0"
        value={tcb}
        onChange={(e) => handleTcbChange(e.target)}
      />
      {tcbErrorKey && (
        <p className="input-error-text">{t[lang].error[tcbErrorKey]}</p>
      )}
    </div>
  );
}
