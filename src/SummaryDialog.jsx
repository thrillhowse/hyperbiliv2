import { useState } from "react";
import { useDialogModal } from "./dialog/useDialogModal.js";
import { useLanguage } from "./context/LanguageContext.jsx";
import { t } from "./translations.js";

// helpers
import { closeOnBackdrop } from "./dialog/closeOnBackdrop.js";

export default function SummaryDialog({
  showSummaryErrorDialog,
  setShowSummaryErrorDialog,
  gestAge,
  riskFactors,
  currentPhototherapy,
  previousPhototherapy,
  biliData,
}) {
  const { lang } = useLanguage();

  const summaryErrorDialogRef = useDialogModal(showSummaryErrorDialog);

  const missingDataFields = [];

  // Note: the patient details should really never be missing since these have passed validation already
  if (!gestAge) missingDataFields.push(t[lang].summary.missingGestAge);
  if (!riskFactors) missingDataFields.push(t[lang].summary.missingRiskFactors);
  if (!currentPhototherapy)
    missingDataFields.push(t[lang].summary.missingCurrentPhototherapy);
  if (!previousPhototherapy)
    missingDataFields.push(t[lang].summary.missingPreviousPhototherapy);

  // Check if any age in hours are the same
  const ageInHoursSet = new Set();
  biliData.forEach((entry, index) => {
    if (entry.ageInHours) {
      if (ageInHoursSet.has(entry.ageInHours)) {
        missingDataFields.push(`${t[lang].summary.duplicateAgeInHours}`);
      }
      ageInHoursSet.add(entry.ageInHours);
    }
  });

  // Check for missing Bili data fields
  biliData.forEach((entry, index) => {
    if (!entry.ageInHours) {
      missingDataFields.push(
        `${t[lang].summary.missingAgeInHours} ${t[lang].dictionary.from} ${t[lang].dictionary.entry} ${index + 1}`,
      );
    }

    if (!entry.tcb && !entry.tsb) {
      missingDataFields.push(
        `${t[lang].summary.missingBiliValues} ${t[lang].dictionary.from} ${t[lang].dictionary.entry} ${index + 1}`,
      );
    }
  });

  return (
    <dialog
      id="summaryErrorDialog"
      ref={summaryErrorDialogRef}
      onClick={(e) =>
        closeOnBackdrop(e, () => setShowSummaryErrorDialog(false))
      }
    >
      <p className="dialog-title">{t[lang].summary.summaryErrorDialogTitle}</p>
      <p className="dialog-text">{t[lang].summary.summaryErrorDialogText}</p>
      <ul>
        {missingDataFields.map((field, index) => (
          <li key={index}>{field}</li>
        ))}
      </ul>
      <button
        id="closeSummaryErrorDialogBtn"
        className="close-dialog-btn"
        onClick={() => setShowSummaryErrorDialog(false)}
      >
        {t[lang].buttons.close}
      </button>
    </dialog>
  );
}
