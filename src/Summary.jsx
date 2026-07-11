import "./Summary.css";
import { useState, useRef, useEffect } from "react";
import { useDialogModal } from "./dialog/useDialogModal.js";
import { useLanguage } from "./context/LanguageContext.jsx";
import { t } from "./translations.js";

// helpers
import { closeOnBackdrop } from "./dialog/closeOnBackdrop.js";
import { copyDataBtn } from "./js/copyDataBtn.js";

export default function Summary({
  showSummary,
  setShowSummary,
  setShowBiliData,
  dob,
  hob,
  gestAge,
  riskFactors,
  currentPhototherapy,
  previousPhototherapy,
  biliData,
  summaryGenerated, // dataAnalysis object
}) {
  const { lang } = useLanguage();

  const [showStartOverDialog, setShowStartOverDialog] = useState(false);
  const startOverDialogRef = useDialogModal(showStartOverDialog);
  const [showRoRWarningDialog, setShowRoRWarningDialog] = useState(false);
  const roRWarningDialogRef = useDialogModal(showRoRWarningDialog);

  const handleCopyDataBtnClick = (e) => {
    e.preventDefault();
    copyDataBtn(e.target, summaryGenerated, dob, hob);
  };

  const handleCopyGraphBtnClick = (e) => {
    e.preventDefault();
    const biliGraph = document.querySelector("#biliGraph");
    const biliGraphCanvas = biliGraph.querySelector("canvas");
    const biliGraphImage = biliGraphCanvas.toDataURL("image/png");
    navigator.clipboard.write([
      new ClipboardItem({
        "image/png": fetch(biliGraphImage).then((res) => res.blob()),
      }),
    ]);
    e.target.textContent = "Copied!";
    setTimeout(() => {
      e.target.textContent = "Copy Graph";
    }, 1500);
  };

  const handlePrintBtnClick = (e) => {
    e.preventDefault();
    window.print();
  };

  const handleGoBackToBiliData = () => {
    setShowSummary(false);
    setShowBiliData(true);
  };

  // Check RoR
  useEffect(() => {
    if (summaryGenerated?.rorHigh) {
      setShowRoRWarningDialog(true);
    }
  }, [summaryGenerated]);

  // Chart.js sets the canvas size via inline style, which print CSS can't
  // override. Force a resize against the print layout so the graph fits the
  // printed page instead of keeping its on-screen dimensions.
  useEffect(() => {
    const biliGraphCanvas = document.querySelector("#bili-graph");
    const resizeChart = () => {
      const chart = biliGraphCanvas && Chart.getChart(biliGraphCanvas);
      chart?.resize();
    };
    window.addEventListener("beforeprint", resizeChart);
    window.addEventListener("afterprint", resizeChart);
    return () => {
      window.removeEventListener("beforeprint", resizeChart);
      window.removeEventListener("afterprint", resizeChart);
    };
  }, [summaryGenerated]);

  return (
    <div
      id="summary-container"
      className={`summary-container ${showSummary ? "" : "hidden"}`}
    >
      <div className="summary-tables-container">
        {/* STICKER AREA FOR PRINT */}
        <div id="stickerArea">
          <p style={{ fontStyle: "italic" }}>{t[lang].patientSticker}</p>
        </div>
        {/* DATE/HOUR OF BIRTH FOR PRINT */}
        <div id="dobHobForPrint">
          <p>
            {dob ? (
              <>
                {t[lang].print.dob}:{" "}
                {new Date(dob).toLocaleDateString(lang, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </>
            ) : (
              ""
            )}
          </p>
          <p>
            {hob ? (
              <>
                {t[lang].print.hob}: {hob ? `${hob}:00` : "N/A"}
              </>
            ) : (
              ""
            )}
          </p>
        </div>

        {/* SUMMARY TABLE */}
        <div
          id="summary-table-header-container"
          className="summary-table-header-container"
        >
          <div className="container-inputs-header no-bottom-border">
            <div className="header-title">
              <span className="lucide--clipboard-check patient-details-header-icon"></span>
              <div className="header-text">
                <h2>{t[lang].summary.header}</h2>
                <p className="header-text">{t[lang].summary.headerInfo}</p>
              </div>
            </div>
          </div>
        </div>
        <div id="patientDetailsSummaryTable"></div>
        <div id="biliDataSummaryTable"></div>
      </div>

      <div id="graphAndBtns">
        {/* GRAPH */}
        <div id="biliGraph"></div>

        {/* COPY & PRINT BUTTONS */}
        <div id="copyPrintBtn">
          <div className="copy-print-btns">
            <button
              type="button"
              className="copy-btn"
              onClick={(e) => handleCopyDataBtnClick(e)}
            >
              <span className="lucide--copy"></span>
              {t[lang].buttons.copyData}
            </button>
            <button
              type="button"
              className="copy-btn"
              onClick={(e) => handleCopyGraphBtnClick(e)}
            >
              <span className="lucide--file-chart-line"></span>
              {t[lang].buttons.copyGraph}
            </button>
            <button
              type="button"
              className="print-btn"
              onClick={(e) => handlePrintBtnClick(e)}
            >
              <span className="lucide--printer"></span>
              {t[lang].buttons.print}
            </button>
          </div>
        </div>

        {/* BACK & START OVER BUTTONS */}
        <div className="back-start-over-btns">
          <button
            type="button"
            id="goBackToBiliDataBtn"
            className="back-btn"
            onClick={handleGoBackToBiliData}
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
            id="startOverBtn"
            className="advance-btn"
            onClick={() => setShowStartOverDialog(true)}
          >
            <span className="solar--repeat-bold"></span>
            {t[lang].buttons.startOver}
            <iconify-icon
              icon="solar:repeat-linear"
              width="24"
              height="24"
            ></iconify-icon>
          </button>

          {/* RoR Warning Dialog */}
          <dialog
            id="rorWarningDialog"
            ref={roRWarningDialogRef}
            onClick={(e) =>
              closeOnBackdrop(e, () => setShowRoRWarningDialog(false))
            }
          >
            <div className="dialog-warning-title">
              <div className="warning-icon-container">
                <span className="lucide--triangle-alert"></span>
              </div>
              <p>{t[lang].rorWarning.title}</p>
            </div>
            <p className="dialog-text">{t[lang].rorWarning.text1}</p>
            <p className="dialog-text">{t[lang].rorWarning.text2}</p>
            <div>
              <button
                id="closeRoRWarningDialogBtn"
                className="start-over-btn"
                onClick={() => setShowRoRWarningDialog(false)}
              >
                {t[lang].buttons.close}
              </button>
            </div>
          </dialog>

          {/* Start Over Dialog */}
          <dialog
            id="startOverDialog"
            ref={startOverDialogRef}
            onClick={(e) =>
              closeOnBackdrop(e, () => setShowStartOverDialog(false))
            }
          >
            <div className="dialog-warning-title">
              <div className="warning-icon-container">
                <span className="lucide--triangle-alert"></span>
              </div>
              <p>{t[lang].buttons.startOverQuestion}</p>
            </div>
            <p className="dialog-text">{t[lang].buttons.startOverWarning}</p>
            <div>
              <button
                id="startOverDialogBtn"
                className="start-over-btn"
                onClick={() => {
                  navigation.reload();
                }}
              >
                {t[lang].buttons.startOverYes}
              </button>
              <button
                id="closeStartOverDialogBtn"
                className="std-btn"
                onClick={() => setShowStartOverDialog(false)}
              >
                {t[lang].buttons.close}
              </button>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
}
