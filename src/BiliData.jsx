import "./BiliData.css";
import { useLanguage } from "./context/LanguageContext.jsx";
import { useState, useRef, useEffect } from "react";
import { t } from "./translations.js";

// helpers
import { useDialogModal } from "./dialog/useDialogModal.js";

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

  const [showAgeDialog, setShowAgeDialog] = useState(false);
  const [showTcbDialog, setShowTcbDialog] = useState(false);
  const [showTsbDialog, setShowTsbDialog] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const ageDialogRef = useDialogModal(showAgeDialog);
  const tcbDialogRef = useDialogModal(showTcbDialog);
  const tsbDialogRef = useDialogModal(showTsbDialog);

  const closeOnBackdrop = (e, close) => {
    if (e.target === e.currentTarget) close();
  };

  const handleAddEntry = () => {
    setBiliData([
      ...biliData,
      { dot: "", hot: "", ageInHours: "", tcb: "", tsb: "" },
    ]);
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
            key={index}
            index={index}
            entry={entry}
            isOnlyEntry={biliData.length === 1}
            handleDeleteEntry={handleDeleteEntry}
            setShowAgeDialog={setShowAgeDialog}
            setShowTcbDialog={setShowTcbDialog}
            setShowTsbDialog={setShowTsbDialog}
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

        {/* Dialogs */}
        <div className="bili-data-table-dialogs">
          <dialog
            id="ageInHoursDialog"
            ref={ageDialogRef}
            onClick={(e) => closeOnBackdrop(e, () => setShowAgeDialog(false))}
          >
            <p className="dialog-title">
              {t[lang].biliData.ageInHoursDialogTitle}
            </p>
            <p className="dialog-text">
              {t[lang].biliData.ageInHoursDialogText1}
            </p>
            <p className="dialog-text">
              {t[lang].biliData.ageInHoursDialogText2}
            </p>
            <button
              id="closeAgeInHoursDialogBtn"
              className="close-dialog-btn"
              onClick={() => setShowAgeDialog(false)}
            >
              {t[lang].buttons.close}
            </button>
          </dialog>{" "}
          <dialog
            id="tcbDialog"
            ref={tcbDialogRef}
            onClick={(e) => closeOnBackdrop(e, () => setShowTcbDialog(false))}
          >
            <p className="dialog-title">{t[lang].biliData.tcbDialogTitle}</p>
            <p className="dialog-text">{t[lang].biliData.tcbDialogText}</p>
            <button
              id="closeTcbDialogBtn"
              className="close-dialog-btn"
              onClick={() => setShowTcbDialog(false)}
            >
              {t[lang].buttons.close}
            </button>
          </dialog>
          <dialog
            id="tsbDialog"
            ref={tsbDialogRef}
            onClick={(e) => closeOnBackdrop(e, () => setShowTsbDialog(false))}
          >
            <p className="dialog-title">{t[lang].biliData.tsbDialogTitle}</p>
            <p className="dialog-text">{t[lang].biliData.tsbDialogText}</p>
            <button
              id="closeTsbDialogBtn"
              className="close-dialog-btn"
              onClick={() => setShowTsbDialog(false)}
            >
              {t[lang].buttons.close}
            </button>
          </dialog>
        </div>

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
              <iconify-icon
                icon="solar:alt-arrow-left-line-duotone"
                width="24"
                height="24"
              ></iconify-icon>
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
                )
              }
            >
              <span className="lucide--check"></span>
              {t[lang].buttons.submit}
              <iconify-icon
                icon="solar:alt-arrow-right-line-duotone"
                width="24"
                height="24"
              ></iconify-icon>
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
