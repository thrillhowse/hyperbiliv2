import { useLanguage } from "./context/LanguageContext.jsx";
import { t } from "./translations.js";

// components
import DateOfTest from "./components/BiliData/DateOfTest.jsx";
import HourOfTest from "./components/BiliData/HourOfTest.jsx";
import AgeInHours from "./components/BiliData/AgeInHours.jsx";
import TranscutaneousBili from "./components/BiliData/TranscutaneousBili.jsx";
import TotalSerumBili from "./components/BiliData/TotalSerumBili.jsx";

export default function BiliDataEntry({
  index,
  entry,
  isOnlyEntry,
  handleDeleteEntry,
  dob,
  hob,
  setBiliData,
}) {
  const { lang } = useLanguage();

  // Same rule as the Submit button's disabled check in BiliData.jsx:
  // an entry needs an age in hours (typed, or calculated from date/hour of test)
  // and at least one of TcB or TSB
  const hasAge = entry.ageInHours !== "";
  const hasBili = Boolean(entry.tcb || entry.tsb);
  const hasError = Object.values(entry.errors ?? {}).some(Boolean);
  const status = hasError
    ? "hasError"
    : !hasAge && !hasBili
      ? "needsBoth"
      : !hasAge
        ? "needsAge"
        : !hasBili
          ? "needsBili"
          : "ready";

  return (
    <div className="entry-container">
      <div id={`entry-header-${index + 1}`} className="entry-header">
        <p className="entry-header-text">
          {t[lang].biliData.entryHeader} {index + 1}
        </p>
        <p className={`entry-status entry-status--${status}`} role="status">
          {t[lang].biliData.entryStatus[status]}
        </p>
        <button
          type="button"
          id={`del-entry-${index + 1}`}
          className="del-entry-btn"
          aria-label={`${t[lang].buttons.deleteEntry} ${index + 1}`}
          onClick={() => handleDeleteEntry(index)}
          disabled={isOnlyEntry}
        >
          <span className="lucide--trash-2" aria-hidden="true"></span>
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
            ageInHoursErrorKey={entry.errors?.ageInHours ?? null}
          />

          <TranscutaneousBili
            index={index}
            tcb={entry.tcb}
            setBiliData={setBiliData}
            tcbErrorKey={entry.errors?.tcb ?? null}
          />

          <TotalSerumBili
            index={index}
            tsb={entry.tsb}
            setBiliData={setBiliData}
            tsbErrorKey={entry.errors?.tsb ?? null}
          />
        </div>
      </div>
    </div>
  );
}
