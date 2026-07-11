import { useState } from 'react';
import { useDialogModal } from '../../dialog/useDialogModal.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { t } from '../../translations.js';

// helpers
import { closeOnBackdrop } from '../../dialog/closeOnBackdrop.js';
import { calculateAgeInHours } from '../../js/calculateAgeInHours.js';

export default function HourOfBirth({
  hob,
  setHob,
  hobRef,
  dob,
  showHOBSubmitErrorMsg,
  setShowHOBSubmitErrorMsg,
  biliData,
  setBiliData,
}) {
  const { lang } = useLanguage();

  const [hourSelected, setHourSelected] = useState(false);
  const [hobErrorKey, setHobErrorKey] = useState(null);

  const [showHobDialog, setShowHobDialog] = useState(false);
  const hobDialogRef = useDialogModal(showHobDialog);

  const handleHobChange = (hobInput) => {
    setHourSelected(false);
    setHobErrorKey(null);
    setShowHOBSubmitErrorMsg(false);
    setHob('');
    setBiliData((prev) => prev.map((entry) => ({ ...entry, ageInHours: '' })));

    // Validate the hour of birth
    const hour = parseInt(hobInput.value, 10);

    if (!hobInput.value || isNaN(hour)) return;
    if (hour < 0 || hour > 23) {
      setHobErrorKey('patientHOBErrorMsg');
      return;
    }

    // Validate that the hour of birth is not after any existing bilirubin data entries with valid date/time of test (i.e. DOT + HOT must be after DOB + HOB)
    // this is really only applicable if there is an existing date of birth
    let dobAfterDot = false;
    if (dob) {
      const dobDateTime = new Date(`${dob}T${hobInput.value}:00`);
      for (let entry of biliData) {
        if (entry.dot && entry.hot) {
          const dotDateTime = new Date(`${entry.dot}T${entry.hot}:00`);
          if (dotDateTime < dobDateTime) {
            dobAfterDot = true;
            break;
          }
        } else if (entry.dot) {
          if (entry.dot < dob) {
            dobAfterDot = true;
            break;
          }
        }
      }
    }
    if (dobAfterDot) {
      setHobErrorKey('patientFutureHOBErrorMsg');
      return;
    }

    // Validation passed, update state with valid HOB input
    setHourSelected(true);
    setHob(hobInput.value);

    // Calculate age in hours for any existing bilirubin data entries if DOB and HOB are both present and valid
    if (dob && hobInput.value && biliData.length > 0) {
      setBiliData(calculateAgeInHours(dob, hobInput.value, biliData)); // this will update the ageInHours field in each entry in biliData
    }
  };

  return (
    <div className="container-input" ref={hobRef}>
      <div className="input-label">
        <label htmlFor="hob" className="input-label-text">
          <span className="lucide--clock-4 container-icon"></span>
          {t[lang].patientDetails.hob}
          <span className="optional-label">
            {t[lang].patientDetails.hobOptional}
          </span>
        </label>
        <span id="infoBubbleHourOfBirth" onClick={() => setShowHobDialog(true)}>
          <span className="lucide--info info-dialog-btn"></span>
        </span>
        <dialog
          id="hobDialog"
          ref={hobDialogRef}
          onClick={(e) => closeOnBackdrop(e, () => setShowHobDialog(false))}
        >
          <p className="dialog-title">{t[lang].patientDetails.hob}</p>
          <p className="dialog-text">{t[lang].patientDetails.hobDialogText1}</p>
          <p className="dialog-text">{t[lang].patientDetails.hobDialogText2}</p>
          <button
            id="closeHobDialogBtn"
            className="close-dialog-btn"
            onClick={() => setShowHobDialog(false)}
          >
            {t[lang].buttons.close}
          </button>
        </dialog>
      </div>
      <select
        name="hob"
        id="hob"
        className={[
          hobErrorKey || showHOBSubmitErrorMsg ? 'input-error' : '',
          hourSelected ? 'selected' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-placeholder={t[lang].patientDetails.hob}
        value={hob}
        onChange={(e) => handleHobChange(e.currentTarget)}
      >
        <option value="">{t[lang].patientDetails.hob}</option>
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
      <p id="hobError" className="input-error-text">
        {showHOBSubmitErrorMsg && t[lang].error.missingHourOfBirthErrorMsg}
      </p>
      {hobErrorKey && (
        <p className="input-error-text">{t[lang].error[hobErrorKey]}</p>
      )}
    </div>
  );
}
