import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { t } from "../../translations.js";

export default function AgeInHours({
  index,
  ageInHours,
  setBiliData,
  setShowAgeDialog,
}) {
  const { lang } = useLanguage();

  const [ageErrorKey, setAgeErrorKey] = useState(null);

  const handleAgeChange = (ageInput) => {
    setAgeErrorKey(null);

    // If user changes age in hours input, then need to erase the date of test and hour of test for this entry
    // to ensure that the user is aware that the previously entered date/hour of test may no longer be accurate
    setBiliData((prevData) => {
      return prevData.map((entry, i) => {
        if (i === index) {
          return {
            ...entry,
            dot: "",
            hot: "",
            ageInHours: "",
          };
        }
        return entry;
      });
    });

    // Validate that age in hours is present and is a valid number
    const age = parseInt(ageInput.value, 10);

    if (!ageInput.value || isNaN(age)) return;
    if (age < 0) {
      setAgeErrorKey("ageInHoursErrorMsg");
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
        <span onClick={() => setShowAgeDialog(true)}>
          <span className="lucide--info info-dialog-btn"></span>
        </span>
      </div>
      <input
        type="number"
        id={`ageInHours${index + 1}`}
        className={`age-in-hours-input bili-table-data width-100 ${ageErrorKey ? "input-error" : ""}`}
        name={`ageInHours${index + 1}`}
        min="0"
        value={ageInHours}
        onChange={(e) => handleAgeChange(e.target)}
      />
      {ageErrorKey && (
        <p className="input-error-text">{t[lang].error[ageErrorKey]}</p>
      )}
    </div>
  );
}
