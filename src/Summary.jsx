import "./Summary.css";
import { useState, useEffect } from "react";
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
  riskFactors,
  summaryGenerated, // dataAnalysis object
}) {
  const { lang } = useLanguage();

  const [showStartOverDialog, setShowStartOverDialog] = useState(false);
  const startOverDialogRef = useDialogModal(showStartOverDialog);
  const [showRoRWarningDialog, setShowRoRWarningDialog] = useState(false);
  const roRWarningDialogRef = useDialogModal(showRoRWarningDialog);
  const [
    showAgeExceedsThresholdWarningDialog,
    setShowAgeExceedsThresholdWarningDialog,
  ] = useState(false);
  const ageExceedsThresholdWarningDialogRef = useDialogModal(
    showAgeExceedsThresholdWarningDialog,
  );

  // Check RoR
  useEffect(() => {
    if (summaryGenerated?.rorHigh && riskFactors === "No") {
      setShowRoRWarningDialog(true);
    }
  }, [summaryGenerated]);

  // Show warning if age 336 hours or greater
  useEffect(() => {
    setShowAgeExceedsThresholdWarningDialog(
      summaryGenerated?.latestAgeInHours > 336,
    );
  }, [summaryGenerated]);

  const [dataCopied, setDataCopied] = useState(false);
  const [graphCopied, setGraphCopied] = useState(false);

  const handleCopyDataBtnClick = () => {
    if (copyDataBtn(summaryGenerated, dob, hob)) {
      setDataCopied(true);
      setTimeout(() => setDataCopied(false), 1500);
    }
  };

  const handleCopyGraphBtnClick = async () => {
    const canvas = document.querySelector("#bili-graph");
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          // toBlob avoids the data-URL → fetch round trip
          "image/png": new Promise((resolve) =>
            canvas.toBlob(resolve, "image/png"),
          ),
        }),
      ]);
      setGraphCopied(true);
      setTimeout(() => setGraphCopied(false), 1500);
    } catch (err) {
      console.error("Copy graph failed", err);
    }
  };

  const handlePrintBtnClick = (e) => {
    e.preventDefault();
    window.print();
  };

  const handleGoBackToBiliData = () => {
    setShowSummary(false);
    setShowBiliData(true);
  };

  // Chart.js sets the canvas size via inline style, and beforeprint fires
  // before the print layout exists, so a plain resize() would just measure
  // the screen. Instead draw at a fixed size that fits a landscape Letter/A4
  // page (12mm margins, see @page in home.css), at a higher pixel ratio so
  // it isn't blurry on paper. afterprint restores the on-screen size.
  useEffect(() => {
    const PRINT_WIDTH = 960;
    const PRINT_HEIGHT = 640;
    const PRINT_PIXEL_RATIO = 3;

    const getChart = () => {
      const biliGraphCanvas = document.querySelector("#bili-graph");
      return biliGraphCanvas && Chart.getChart(biliGraphCanvas);
    };
    // Chart.js keeps its aspect ratio over the height passed to resize(),
    // so the print ratio is swapped in too and put back afterwards
    let screenAspectRatio;
    const resizeForPrint = () => {
      const chart = getChart();
      if (!chart) return;
      screenAspectRatio = chart.options.aspectRatio;
      chart.options.aspectRatio = PRINT_WIDTH / PRINT_HEIGHT;
      chart.options.devicePixelRatio = PRINT_PIXEL_RATIO;
      chart.resize(PRINT_WIDTH, PRINT_HEIGHT);
    };
    const resizeForScreen = () => {
      const chart = getChart();
      if (!chart) return;
      chart.options.aspectRatio = screenAspectRatio;
      chart.options.devicePixelRatio = undefined;
      chart.resize();
    };
    window.addEventListener("beforeprint", resizeForPrint);
    window.addEventListener("afterprint", resizeForScreen);
    return () => {
      window.removeEventListener("beforeprint", resizeForPrint);
      window.removeEventListener("afterprint", resizeForScreen);
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
                {t[lang].print.dob}: {dob}
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
              onClick={handleCopyDataBtnClick}
            >
              <span
                className={dataCopied ? "lucide--check" : "lucide--copy"}
              ></span>
              {dataCopied ? t[lang].buttons.copied : t[lang].buttons.copyData}
            </button>
            <button
              type="button"
              className="copy-btn"
              onClick={handleCopyGraphBtnClick}
            >
              <span
                className={
                  graphCopied ? "lucide--check" : "lucide--file-chart-line"
                }
              ></span>
              {graphCopied ? t[lang].buttons.copied : t[lang].buttons.copyGraph}
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
          </button>

          {/* RoR Warning Dialog */}
          <dialog
            id="rorWarningDialog"
            ref={roRWarningDialogRef}
            onCancel={() => setShowRoRWarningDialog(false)}
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
            {summaryGenerated?.rorMixed &&
              summaryGenerated.rorMixed.some((rorMixed) => rorMixed) && (
                <p className="dialog-text">{t[lang].rorWarning.mixed}</p>
              )}
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

          {/* Age Exceeds Threshold Warning Dialog */}
          <dialog
            id="ageExceedsThresholdWarningDialog"
            ref={ageExceedsThresholdWarningDialogRef}
            onCancel={() => setShowAgeExceedsThresholdWarningDialog(false)}
            onClick={(e) =>
              closeOnBackdrop(e, () =>
                setShowAgeExceedsThresholdWarningDialog(false),
              )
            }
          >
            <div className="dialog-warning-title">
              <div className="warning-icon-container">
                <span className="lucide--triangle-alert"></span>
              </div>
              <p>{t[lang].ageExceedsThresholdWarning.title}</p>
            </div>
            <p className="dialog-text">
              {t[lang].ageExceedsThresholdWarning.text1}
            </p>
            <p className="dialog-text">
              {t[lang].ageExceedsThresholdWarning.text2}
            </p>
            <div>
              <button
                id="closeAgeExceedsThresholdWarningDialogBtn"
                className="start-over-btn"
                onClick={() => setShowAgeExceedsThresholdWarningDialog(false)}
              >
                {t[lang].buttons.close}
              </button>
            </div>
          </dialog>

          {/* Start Over Dialog */}
          <dialog
            id="startOverDialog"
            ref={startOverDialogRef}
            onCancel={() => setShowStartOverDialog(false)}
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                id="startOverDialogBtn"
                className="start-over-btn"
                onClick={() => {
                  window.location.reload();
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
