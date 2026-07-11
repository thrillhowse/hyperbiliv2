import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { t } from "../../translations.js";

export default function TotalSerumBili({
  index,
  tsb,
  setBiliData,
  setShowTsbDialog,
}) {
  const { lang } = useLanguage();

  const [tsbErrorKey, setTsbErrorKey] = useState(null);

  const handleTsbChange = (tsbInput) => {
    setTsbErrorKey(null);

    // Reset tsb for this entry
    setBiliData((prevData) => {
      return prevData.map((entry, i) => {
        if (i === index) {
          return { ...entry, tsb: "" };
        }
        return entry;
      });
    });

    // Validate that tsb is present and is a valid number
    const tsbValue = parseInt(tsbInput.value, 10);

    if (isNaN(tsbValue)) return;
    if (tsbValue === 0 || tsbValue < 0 || tsbValue > 1000) {
      setTsbErrorKey("tsbErrorMsg");
      return;
    }

    // Update state with valid tsb input
    const newTsb = tsbValue;
    setBiliData((prevData) => {
      return prevData.map((entry, i) => {
        if (i === index) {
          return { ...entry, tsb: newTsb };
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
        <span onClick={() => setShowTsbDialog(true)}>
          <span className="lucide--info info-dialog-btn"></span>
        </span>
      </div>
      <input
        type="number"
        id={`tsb${index + 1}`}
        className={`tsb-input bili-table-data width-100 ${tsbErrorKey ? "input-error" : ""}`}
        name={`tsb${index + 1}`}
        min="0"
        value={tsb}
        onChange={(e) => handleTsbChange(e.target)}
      />
      {tsbErrorKey && (
        <p className="input-error-text">{t[lang].error[tsbErrorKey]}</p>
      )}
    </div>
  );
}
