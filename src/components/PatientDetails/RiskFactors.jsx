import { useState } from 'react';
import { useDialogModal } from '../../dialog/useDialogModal.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { t } from '../../translations.js';

// helpers
import { closeOnBackdrop } from '../../dialog/closeOnBackdrop.js';

export default function RiskFactors({
  riskFactors,
  setRiskFactors,
  riskFactorsRef,
  showRiskFactorsErrorMsg,
  setShowRiskFactorsErrorMsg,
}) {
  const { lang } = useLanguage();

  const [showRiskFactorsDialog, setShowRiskFactorsDialog] = useState(false);
  const riskFactorsDialogRef = useDialogModal(showRiskFactorsDialog);

  const handleRiskFactorChange = (riskFactorsInput) => {
    setShowRiskFactorsErrorMsg(false);

    // Update state with valid risk factor input
    setRiskFactors(riskFactorsInput.value);
  };

  return (
    <div>
      {' '}
      <div className="container-input">
        <div className="input-label">
          <label htmlFor="riskFactors" className="input-label-text">
            <span className="lucide--triangle-alert container-icon"></span>
            {t[lang].patientDetails.riskFactors}
            <span
              id="infoBubbleRiskFactors"
              onClick={() => setShowRiskFactorsDialog(true)}
            >
              <span className="lucide--info info-dialog-btn"></span>
            </span>
            <dialog
              id="riskFactorsDialog"
              ref={riskFactorsDialogRef}
              onClick={(e) =>
                closeOnBackdrop(e, () => setShowRiskFactorsDialog(false))
              }
            >
              <p className="dialog-title">
                {t[lang].patientDetails.neurotoxicityRiskFactors}
              </p>
              <p className="dialog-text">
                {t[lang].patientDetails.riskFactorsTable1b}
              </p>
              <ul className="dialog-list">
                <li
                  dangerouslySetInnerHTML={{
                    __html: t[lang].patientDetails.riskFactorsTable1bRow1,
                  }}
                ></li>
                <li
                  dangerouslySetInnerHTML={{
                    __html: t[lang].patientDetails.riskFactorsTable1bRow3,
                  }}
                ></li>
                <li
                  dangerouslySetInnerHTML={{
                    __html: t[lang].patientDetails.riskFactorsTable1bRow4,
                  }}
                ></li>
                <li
                  dangerouslySetInnerHTML={{
                    __html: t[lang].patientDetails.riskFactorsTable1bRow5,
                  }}
                ></li>
              </ul>
              <p
                dangerouslySetInnerHTML={{
                  __html: t[lang].patientDetails.riskFactorsTable1bNote1,
                }}
                className="dialog-text"
                style={{ marginTop: '8px', fontSize: '0.9rem' }}
              ></p>
              <p
                dangerouslySetInnerHTML={{
                  __html: t[lang].patientDetails.riskFactorsTable1bNote2,
                }}
                className="dialog-text"
                style={{ marginTop: '8px', fontSize: '0.9rem' }}
              ></p>
              <button
                id="closeRiskFactorsDialogBtn"
                className="close-dialog-btn"
                onClick={() => setShowRiskFactorsDialog(false)}
              >
                {t[lang].buttons.close}
              </button>
            </dialog>
          </label>
        </div>
      </div>
      <div className="container-input" ref={riskFactorsRef}>
        <div className="input-label">
          <label htmlFor="neurotoxicityRiskFactors" className="sub-label">
            {t[lang].patientDetails.riskFactorsSubLabel1}
            <span style={{ padding: '4px', fontWeight: 700 }}>
              {t[lang].patientDetails.riskFactorsSubLabel2}
            </span>
          </label>
        </div>
        <div className="risk-factors-toggle">
          <button
            id="riskFactorsYes"
            name="riskFactors"
            value="Yes"
            type="button"
            className={`risk-factor-btn${riskFactors === 'Yes' ? ' risk-factor-btn--active' : ''}`}
            onClick={(e) => handleRiskFactorChange(e.target)}
          >
            {t[lang].buttons.yes}
          </button>
          <button
            id="riskFactorsNo"
            name="riskFactors"
            value="No"
            type="button"
            className={`risk-factor-btn${riskFactors === 'No' ? ' risk-factor-btn--active' : ''}`}
            onClick={(e) => handleRiskFactorChange(e.target)}
          >
            {t[lang].buttons.no}
          </button>
        </div>
        <p id="riskFactorsError" className="input-error-text">
          {showRiskFactorsErrorMsg && t[lang].error.patientRiskFactorsErrorMsg}
        </p>
      </div>
    </div>
  );
}
