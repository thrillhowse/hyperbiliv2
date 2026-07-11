import { useLanguage } from './context/LanguageContext.jsx';
import { useState, useRef, useEffect } from 'react';
import { t } from './translations.js';

// helpers
import { calculateAgeInHours } from './js/calculateAgeInHours.js';

// components
import DateOfTest from './components/BiliData/DateOfTest.jsx';
import HourOfTest from './components/BiliData/HourOfTest.jsx';
import AgeInHours from './components/BiliData/AgeInHours.jsx';
import TranscutaneousBili from './components/BiliData/TranscutaneousBili.jsx';
import TotalSerumBili from './components/BiliData/TotalSerumBili.jsx';

function useDialogModal(open) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [open]);
  return ref;
}

export default function BiliDataEntry({
  index,
  entry,
  isOnlyEntry,
  handleDeleteEntry,
  setShowAgeDialog,
  setShowTcbDialog,
  setShowTsbDialog,
  dob,
  hob,
  setBiliData,
}) {
  const { lang } = useLanguage();

  const closeOnBackdrop = (e, close) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <div className="entry-container">
      <div id={`entry-header-${index + 1}`} className="entry-header">
        <p className="entry-header-text">
          {t[lang].biliData.entryHeader} {index + 1}
        </p>
        <button
          type="button"
          id={`del-entry-${index + 1}`}
          className="del-entry-btn"
          onClick={() => handleDeleteEntry(index)}
          disabled={isOnlyEntry}
        >
          <span className="lucide--trash-2"></span>
        </button>
      </div>
      <div className="entry-inputs">
        <div className="entry-input-group border-bottom">
          <DateOfTest
            index={index}
            dot={entry.dot}
            hot={entry.hot}
            dob={dob}
            hob={hob}
            setBiliData={setBiliData}
          />

          <HourOfTest
            index={index}
            dot={entry.dot}
            hot={entry.hot}
            dob={dob}
            hob={hob}
            setBiliData={setBiliData}
          />
        </div>
        <div className="entry-input-group entry-input-group-row">
          <AgeInHours
            index={index}
            ageInHours={entry.ageInHours}
            setBiliData={setBiliData}
            setShowAgeDialog={setShowAgeDialog}
          />

          <TranscutaneousBili
            index={index}
            tcb={entry.tcb}
            setBiliData={setBiliData}
            setShowTcbDialog={setShowTcbDialog}
          />

          <TotalSerumBili
            index={index}
            tsb={entry.tsb}
            setBiliData={setBiliData}
            setShowTsbDialog={setShowTsbDialog}
          />
        </div>
      </div>
    </div>
  );
}
