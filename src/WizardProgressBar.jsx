import './WizardProgressBar.css';
import { useLanguage } from './context/LanguageContext.jsx';
import { t } from './translations.js';

export default function WizardProgressBar({
  showPatientDetails,
  setShowPatientDetails,
  goToBiliData,
  showBiliData,
  setShowBiliData,
  goToSummary,
  showSummary,
  setShowSummary,
}) {
  const { lang } = useLanguage();

  return (
    <div className="wizard-progress-bar">
      <button
        id="wizard-step-1"
        className={`wizard-step ${showPatientDetails ? 'wizard-step-active' : 'wizard-step-complete'}`}
        onClick={() => {
          setShowPatientDetails(true);
          setShowBiliData(false);
          setShowSummary(false);
        }}
      >
        <span
          className={`${showPatientDetails ? 'mynaui--one-circle' : 'mynaui--check-circle-one'}`}
        ></span>
        {t[lang].wizardProgressBar.step1}
      </button>
      <span
        className={`wizard-step-separator ${showBiliData || showSummary ? 'wizard-step-separator-active' : ''}`}
      >
        <hr></hr>
      </span>
      <button
        id="wizard-step-2"
        className={`wizard-step ${showBiliData ? 'wizard-step-active' : ''} ${!showPatientDetails && !showBiliData && showSummary ? 'wizard-step-complete' : ''}`}
        onClick={() => {
          goToBiliData();
        }}
      >
        <span
          className={`${showPatientDetails || showBiliData ? 'mynaui--two-circle' : 'mynaui--check-circle-one'}`}
        ></span>
        {t[lang].wizardProgressBar.step2}
      </button>
      <span
        className={`wizard-step-separator ${showSummary ? 'wizard-step-separator-active' : ''}`}
      >
        {' '}
        <hr></hr>
      </span>
      <button
        id="wizard-step-3"
        className={`wizard-step ${showSummary ? 'wizard-step-active' : ''}`}
        onClick={() => {
          goToSummary();
        }}
      >
        <span className="mynaui--three-circle"></span>
        {t[lang].wizardProgressBar.step3}
      </button>
    </div>
  );
}
