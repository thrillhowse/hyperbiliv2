import "./BiliData.css";
import { useLanguage } from "./context/LanguageContext.jsx";
import { t } from "./translations.js";

// components
import BiliDataEntry from "./BiliDataEntry.jsx";
import BiliDataInfo from "./BiliDataInfo.jsx";
import ClinicalDisclaimer from "./ClinicalDisclaimer.jsx";
import CPSGuidelines from "./CPSGuidelines.jsx";

export default function BiliData({
  setShowPatientDetails,
  showBiliData,
  setShowBiliData,
  setShowSummary,
  dob,
  hob,
  biliData,
  setBiliData,
  goToSummary,
}) {
  const { lang } = useLanguage();

  const handleAddEntry = () => {
    const newEntry = {
      id: crypto.randomUUID(),
      dot: "",
      hot: "",
      ageInHours: "",
      tcb: "",
      tsb: "",
      errors: {
        ageInHours: null,
        tcb: null,
        tsb: null,
      },
    };

    setBiliData((prev) => [...prev, newEntry]);
  };

  const handleDeleteEntry = (index) => {
    setBiliData(biliData.filter((entry, i) => i !== index));
  };

  return (
    <div
      id="bili-data-container"
      className={`container bili-data-container ${showBiliData ? "" : "hidden"}`}
    >
      <div className="container-inputs">
        <div className="container-inputs-header">
          <div className="header-title">
            <span className="fluent--molecule-32-regular patient-details-header-icon"></span>
            <div className="header-text">
              <h2>{t[lang].biliData.header}</h2>
              <p className="header-text">{t[lang].biliData.headerInfo}</p>
            </div>
          </div>
        </div>

        {biliData.map((entry, index) => (
          <BiliDataEntry
            key={entry.id}
            index={index}
            entry={entry}
            isOnlyEntry={biliData.length === 1}
            handleDeleteEntry={handleDeleteEntry}
            dob={dob}
            hob={hob}
            setBiliData={setBiliData}
          />
        ))}

        <button
          id="add-entry-btn"
          className="add-entry-btn"
          onClick={() => handleAddEntry()}
        >
          <span className="lucide--plus"></span>
          <p>{t[lang].biliData.addEntryButton}</p>
        </button>

        <div className="btns-and-error-container">
          <div className="error-msg-container">
            <p id="biliDataErrorMsg" className="error-msg-text"></p>
          </div>
          <div className="advance-btns">
            <button
              type="button"
              id="goToPatientDetails"
              className="back-btn"
              onClick={() => {
                setShowBiliData(false);
                setShowPatientDetails(true);
                setShowSummary(false);
              }}
            >
              <span className="lucide--chevron-left"></span>
              {t[lang].buttons.back}
            </button>
            <button
              type="button"
              id="goToSummaryBtn"
              className="advance-btn"
              onClick={goToSummary}
              disabled={
                biliData.length === 0 ||
                biliData.some(
                  (entry) =>
                    entry.ageInHours === "" || (!entry.tcb && !entry.tsb),
                ) ||
                biliData.some((entry) =>
                  Object.values(entry.errors ?? {}).some(Boolean),
                )
              }
            >
              <span className="lucide--check"></span>
              {t[lang].buttons.submit}
            </button>
          </div>
        </div>
      </div>
      <div className="extra-info-column">
        <BiliDataInfo />
        <ClinicalDisclaimer />
        <CPSGuidelines />
      </div>
    </div>
  );
}
