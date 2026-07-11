import { useState } from 'react';
import { useDialogModal } from '../../dialog/useDialogModal.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { t } from '../../translations.js';

// helpers
import { closeOnBackdrop } from '../../dialog/closeOnBackdrop.js';
import { calculateAgeInHours } from '../../js/calculateAgeInHours.js';

export default function DateOfBirth({
  dob,
  setDob,
  dobRef,
  hob,
  showDOBSubmitErrorMsg,
  setShowDOBSubmitErrorMsg,
  biliData,
  setBiliData,
}) {
  const { lang } = useLanguage();

  const [dateSelected, setDateSelected] = useState(false);
  const [dobErrorKey, setDobErrorKey] = useState(null);

  const [showDobDialog, setShowDobDialog] = useState(false);
  const dobDialogRef = useDialogModal(showDobDialog);

  const localToday = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const handleDobChange = (dobInput) => {
    setDateSelected(false);
    setDobErrorKey(null);
    setShowDOBSubmitErrorMsg(false);
    setDob('');
    setBiliData((prev) =>
      prev.map((entry) => ({
        ...entry,
        ageInHours: '',
      })),
    );

    // Validate that date is present and is in correct format (YYYY-MM-DD)
    if (!dobInput.value) return;
    // define a regex to ensure date is submitted as YYYY-MM-DD
    // c/o https://webrewrite.com/validate-date-format-yyyymmdd-javascript/ and https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy
    let validDatePattern =
      /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
    if (dobInput.value.match(validDatePattern) === null) {
      setDobErrorKey('patientDOBErrorMsg');
      return;
    }

    // Validate that the date is not in the future
    const today = localToday();
    if (dobInput.value > today) {
      setDobErrorKey('patientFutureDOBErrorMsg');
      return;
    }

    // Validate that the date of birth is not after the date of test
    let dobAfterDot = false;
    for (let entry of biliData) {
      // If date of birth and hour of birth both exist
      if (hob) {
        // Get the datetime for the date of birth
        const dobDateTime = new Date(`${dobInput.value}T${hob}:00`);
        // If date of test and hour of test both exist
        if (entry.dot && entry.hot) {
          // Get the datetime for the date of test
          const dotDateTime = new Date(`${entry.dot}T${entry.hot}:00`);
          // Compare the datetimes to ensure that DOB is not after DOT
          if (dotDateTime < dobDateTime) {
            dobAfterDot = true;
            break;
          }
        }
        // If date of test exists but hour of test doesn't exist
        // then just compare date of birth and date of test
        else if (entry.dot) {
          if (entry.dot < dobInput.value) {
            dobAfterDot = true;
            break;
          }
        }
      }
      // If hour of birth doesn't exist, then just compare date of birth and date of test
      else {
        if (entry.dot && entry.dot < dobInput.value) {
          dobAfterDot = true;
          break;
        }
      }
    }
    if (dobAfterDot) {
      setDobErrorKey('patientDOBAfterDOTErrorMsg');
      return;
    }

    // Validation passed, update state with valid DOB input
    setDateSelected(true);
    setDob(dobInput.value);

    // Calculate age in hours for any existing bilirubin data entries if DOB and HOB are both present and valid
    if (dobInput.value && hob && biliData.length > 0) {
      setBiliData(calculateAgeInHours(dobInput.value, hob, biliData)); // this will update the ageInHours field in each entry in biliData
    }
  };

  return (
    <div className="container-input" ref={dobRef}>
      <div className="input-label">
        <label htmlFor="dob" className="input-label-text">
          <span className="lucide--calendar container-icon"></span>
          {t[lang].patientDetails.dob}
          <span className="optional-label">
            {t[lang].patientDetails.dobOptional}
          </span>
        </label>
        <span id="infoBubbleDateOfBirth" onClick={() => setShowDobDialog(true)}>
          <span className="lucide--info info-dialog-btn"></span>
        </span>
        <dialog
          id="dobDialog"
          ref={dobDialogRef}
          onClick={(e) => closeOnBackdrop(e, () => setShowDobDialog(false))}
        >
          <p className="dialog-title">{t[lang].patientDetails.dob}</p>
          <p className="dialog-text">{t[lang].patientDetails.dobDialogText1}</p>
          <p className="dialog-text">{t[lang].patientDetails.dobDialogText2}</p>
          <button
            id="closeDobDialogBtn"
            className="close-dialog-btn"
            onClick={() => setShowDobDialog(false)}
          >
            {t[lang].buttons.close}
          </button>
        </dialog>
      </div>
      <input
        type="date"
        id="dob"
        name="dob"
        value={dob}
        className={[
          dobErrorKey || showDOBSubmitErrorMsg ? 'input-error' : '',
          dateSelected ? 'date-selected' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        // set max attribute to today's date (local time) to prevent selecting future dates
        max={localToday()}
        onChange={(e) => handleDobChange(e.currentTarget)}
      />
      <p id="dobError" className="input-error-text">
        {showDOBSubmitErrorMsg && t[lang].error.missingDateOfBirthErrorMsg}
      </p>
      {dobErrorKey && (
        <p className="input-error-text">{t[lang].error[dobErrorKey]}</p>
      )}
    </div>
  );
}
