import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { t } from "../../translations.js";

// helpers
import { calculateAgeInHours } from "../../js/calculateAgeInHours.js";

export default function DateOfTest({ index, dot, hot, dob, hob, setBiliData }) {
  const { lang } = useLanguage();

  const [dateSelected, setDateSelected] = useState(false);
  const [dotErrorKey, setDotErrorKey] = useState(null);

  const handleDotChange = (dotInput) => {
    setDateSelected(false);
    setDotErrorKey(null);

    // Erase the dot and ageInHours for this entry when the date of test is changed
    // to ensure that age in hours is recalculated and that the user is aware that the previously entered age in hours may no longer be accurate
    setBiliData((prevData) => {
      return prevData.map((entry, i) => {
        if (i === index) {
          return { ...entry, dot: "", ageInHours: "" };
        }
        return entry;
      });
    });

    // Validate that date is present and is in correct format (YYYY-MM-DD)
    if (!dotInput.value) return;
    let validDatePattern =
      /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
    if (dotInput.value.match(validDatePattern) === null) {
      setDotErrorKey("dateOfTestErrorMsg");
      return;
    }

    // Check that date of birth and hour of birth are present
    if (!dob || !hob) {
      setDotErrorKey("missingDOBorHOB");
      return;
    }

    // Validate that the date of test is not before the date of birth
    // if the date of test has an associated hour of test, then need to check datetime
    if (hot) {
      const dotDateTime = new Date(`${dotInput.value}T${hot}:00`);
      const dobDateTime = new Date(`${dob}T${hob}:00`);
      if (dotDateTime < dobDateTime) {
        setDotErrorKey("dotBeforeDOB");
        return;
      }
    } // if the date of test doesn't have an associated hour of test, then just compare date of birth/date of test
    else {
      if (dotInput.value < dob) {
        setDotErrorKey("dotBeforeDOB");
        return;
      }
    }

    // Update state with valid DOT input
    const newDot = dotInput.value;
    setBiliData((prevData) => {
      return prevData.map((entry, i) => {
        if (i === index) {
          return { ...entry, dot: newDot };
        }
        return entry;
      });
    });

    // Add selected class to remove italics
    setDateSelected(true);

    // Calculate age in hours for this entry (know DOB and HOB are both present and valid)
    setBiliData((prevData) => {
      return prevData.map((entry, i) => {
        if (i !== index) return entry;
        const ageInHours = calculateAgeInHours(dob, hob, [{ ...entry }])[0]
          .ageInHours;
        return { ...entry, ageInHours: ageInHours };
      });
    });
  };

  return (
    <div className="entry-input-item">
      <div className="input-label">
        <label htmlFor={`dot${index + 1}`} className="input-label-text">
          <span className="lucide--calendar container-icon"></span>
          {t[lang].biliData.dot}
          <span className="optional-label">{t[lang].biliData.dotOptional}</span>
        </label>
      </div>
      <input
        type="date"
        id={`dot${index + 1}`}
        className={`dot bili-table-data ${dateSelected ? "date-selected" : ""} ${dotErrorKey ? "input-error" : ""}`}
        name={`dot${index + 1}`}
        value={dot}
        onChange={(e) => handleDotChange(e.target)}
      />
      {dotErrorKey && (
        <p className="input-error-text">{t[lang].error[dotErrorKey]}</p>
      )}
    </div>
  );
}
