import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { t } from "../../translations.js";

// helpers
import { calculateAgeInHours } from "../../js/calculateAgeInHours.js";

export default function HourOfTest({ index, dot, hot, dob, hob, setBiliData }) {
  const { lang } = useLanguage();

  const [hotSelected, setHotSelected] = useState(false);
  const [hotErrorKey, setHotErrorKey] = useState(null);

  const handleHotChange = (hotInput) => {
    setHotErrorKey(null);
    setHotSelected(false);

    // Erase the hot and ageInHours for this entry when the hour of test is changed
    // to ensure that age in hours is recalculated and that the user is aware that the previously entered age in hours may no longer be accurate
    setBiliData((prevData) => {
      return prevData.map((entry, i) => {
        if (i === index) {
          return { ...entry, hot: "", ageInHours: "" };
        }
        return entry;
      });
    });

    // Validate that hour is present and is in correct format (HH:MM)
    const hour = parseInt(hotInput.value, 10);

    if (!hotInput.value || isNaN(hour)) return;
    if (hour < 0 || hour > 23) {
      setHotErrorKey("hourOfTestErrorMsg");
      return;
    }

    // Check that date of birth and hour of birth are present
    if (!dob || !hob) {
      setHotErrorKey("missingDOBorHOB");
      return;
    }

    // Validate that the date/hour of test is not before the date/hour of birth
    // note: need date of test to do this check!
    if (dot) {
      const dotDateTime = new Date(`${dot}T${hotInput.value}:00`);
      const dobDateTime = new Date(`${dob}T${hob}:00`);
      if (dotDateTime < dobDateTime) {
        setHotErrorKey("hotBeforeDOB");
        return;
      }
    }

    // Update state with valid HOT input
    const newHot = hotInput.value;
    setBiliData((prevData) => {
      return prevData.map((entry, i) => {
        if (i === index) {
          return { ...entry, hot: newHot };
        }
        return entry;
      });
    });

    // Add selected class to remove italics
    setHotSelected(true);

    // Calculate age in hours for this entry (know DOB and HOB are both present and valid)
    setBiliData((prevData) => {
      return prevData.map((entry, i) => {
        if (i !== index) return entry;
        const ageInHours = calculateAgeInHours(dob, hob, [{ ...entry }])[0]
          .ageInHours;
        return { ...entry, ageInHours };
      });
    });
  };

  return (
    <div className="entry-input-item">
      <div className="input-label">
        <label htmlFor={`hot${index + 1}`} className="input-label-text">
          <span className="lucide--clock-4 container-icon"></span>
          {t[lang].biliData.hot}
          <span className="optional-label">{t[lang].biliData.hotOptional}</span>
        </label>
      </div>
      <select
        id={`hot${index + 1}`}
        className={`hot bili-table-data ${hotSelected ? "selected" : ""} ${hotErrorKey ? "input-error" : ""}`}
        name={`hot${index + 1}`}
        value={hot}
        onChange={(e) => handleHotChange(e.target)}
      >
        <option value="">{t[lang].biliData.hot}</option>
        <option value="00">00:00</option>
        <option value="01">01:00</option>
        <option value="02">02:00</option>
        <option value="03">03:00</option>
        <option value="04">04:00</option>
        <option value="05">05:00</option>
        <option value="06">06:00</option>
        <option value="07">07:00</option>
        <option value="08">08:00</option>
        <option value="09">09:00</option>
        <option value="10">10:00</option>
        <option value="11">11:00</option>
        <option value="12">12:00</option>
        <option value="13">13:00</option>
        <option value="14">14:00</option>
        <option value="15">15:00</option>
        <option value="16">16:00</option>
        <option value="17">17:00</option>
        <option value="18">18:00</option>
        <option value="19">19:00</option>
        <option value="20">20:00</option>
        <option value="21">21:00</option>
        <option value="22">22:00</option>
        <option value="23">23:00</option>
      </select>
      {hotErrorKey && (
        <p className="input-error-text">{t[lang].error[hotErrorKey]}</p>
      )}
    </div>
  );
}
