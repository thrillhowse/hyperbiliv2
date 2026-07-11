import { useLanguage } from './context/LanguageContext.jsx';
import { useState, useRef, useEffect } from 'react';
import { useDialogModal } from './dialog/useDialogModal.js';
import { t } from './translations.js';

// helpers
import { calculateAgeInHours } from './js/calculateAgeInHours.js';

// components
import DateOfBirth from './components/PatientDetails/DateOfBirth.jsx';
import HourOfBirth from './components/PatientDetails/HourOfBirth.jsx';
import GestationalAge from './components/PatientDetails/GestationalAge.jsx';
import RiskFactors from './components/PatientDetails/RiskFactors.jsx';
import CurrentPhototherapy from './components/PatientDetails/CurrentPhototherapy.jsx';
import PreviousPhototherapy from './components/PatientDetails/PreviousPhototherapy.jsx';
import Updates from './Updates.jsx';
import ClinicalDisclaimer from './ClinicalDisclaimer.jsx';
import CPSGuidelines from './CPSGuidelines.jsx';

export default function PatientDetails({
  showPatientDetails,
  dob,
  setDob,
  dobRef,
  showDOBSubmitErrorMsg,
  setShowDOBSubmitErrorMsg,
  hob,
  setHob,
  hobRef,
  showHobErrorMsg,
  setShowHobErrorMsg,
  showHOBSubmitErrorMsg,
  setShowHOBSubmitErrorMsg,
  gestAge,
  setGestAge,
  gestAgeRef,
  showGestAgeErrorMsg,
  setShowGestAgeErrorMsg,
  riskFactors,
  setRiskFactors,
  riskFactorsRef,
  showRiskFactorsErrorMsg,
  setShowRiskFactorsErrorMsg,
  currentPhototherapy,
  setCurrentPhototherapy,
  currentPhototherapyRef,
  showCurrentPhototherapyErrorMsg,
  setShowCurrentPhototherapyErrorMsg,
  previousPhototherapy,
  setPreviousPhototherapy,
  previousPhototherapyRef,
  showPreviousPhototherapyErrorMsg,
  setShowPreviousPhototherapyErrorMsg,
  biliData,
  setBiliData,
  goToBiliData,
}) {
  const { lang } = useLanguage();

  return (
    <div
      id="patient-details-container"
      className={`container patient-details-container${showPatientDetails ? '' : ' hidden'}`}
    >
      <div className="container-inputs">
        <div className="container-inputs-header">
          <div className="header-title">
            <span className="lucide--clipboard-plus patient-details-header-icon"></span>
            <div className="header-text">
              <h2>{t[lang].patientDetails.header}</h2>
              <p>{t[lang].patientDetails.headerInfo}</p>
            </div>
          </div>{' '}
        </div>

        <DateOfBirth
          dob={dob}
          setDob={setDob}
          dobRef={dobRef}
          hob={hob}
          showDOBSubmitErrorMsg={showDOBSubmitErrorMsg}
          setShowDOBSubmitErrorMsg={setShowDOBSubmitErrorMsg}
          biliData={biliData}
          setBiliData={setBiliData}
        />

        <HourOfBirth
          hob={hob}
          setHob={setHob}
          hobRef={hobRef}
          dob={dob}
          showHobErrorMsg={showHobErrorMsg}
          setShowHobErrorMsg={setShowHobErrorMsg}
          showHOBSubmitErrorMsg={showHOBSubmitErrorMsg}
          setShowHOBSubmitErrorMsg={setShowHOBSubmitErrorMsg}
          biliData={biliData}
          setBiliData={setBiliData}
        />

        <GestationalAge
          gestAge={gestAge}
          setGestAge={setGestAge}
          gestAgeRef={gestAgeRef}
          showGestAgeErrorMsg={showGestAgeErrorMsg}
          setShowGestAgeErrorMsg={setShowGestAgeErrorMsg}
        />

        <RiskFactors
          riskFactors={riskFactors}
          setRiskFactors={setRiskFactors}
          riskFactorsRef={riskFactorsRef}
          showRiskFactorsErrorMsg={showRiskFactorsErrorMsg}
          setShowRiskFactorsErrorMsg={setShowRiskFactorsErrorMsg}
        />

        <div>
          <div
            className="container-input"
            style={{ marginTop: '0px', marginBottom: 0 }}
          >
            <div className="input-label">
              <span className="lucide--sun"></span>
              <p>{t[lang].patientDetails.phototherapy}</p>
            </div>
          </div>

          <CurrentPhototherapy
            currentPhototherapy={currentPhototherapy}
            setCurrentPhototherapy={setCurrentPhototherapy}
            currentPhototherapyRef={currentPhototherapyRef}
            showCurrentPhototherapyErrorMsg={showCurrentPhototherapyErrorMsg}
            setShowCurrentPhototherapyErrorMsg={
              setShowCurrentPhototherapyErrorMsg
            }
          />

          <PreviousPhototherapy
            previousPhototherapy={previousPhototherapy}
            setPreviousPhototherapy={setPreviousPhototherapy}
            previousPhototherapyRef={previousPhototherapyRef}
            showPreviousPhototherapyErrorMsg={showPreviousPhototherapyErrorMsg}
            setShowPreviousPhototherapyErrorMsg={
              setShowPreviousPhototherapyErrorMsg
            }
          />
        </div>

        <div className="btns-and-error-container">
          <div className="advance-btns">
            <button
              type="button"
              id="goToBiliDataBtn"
              className="advance-btn"
              onClick={goToBiliData}
              disabled={
                !gestAge ||
                !riskFactors ||
                !currentPhototherapy ||
                !previousPhototherapy
              }
            >
              <p>{t[lang].buttons.enterBiliData}</p>
              <span className="lucide--arrow-right"></span>
            </button>
          </div>
        </div>
      </div>{' '}
      <div className="extra-info-column">
        <Updates />
        <ClinicalDisclaimer />
        <CPSGuidelines />
      </div>
    </div>
  );
}
