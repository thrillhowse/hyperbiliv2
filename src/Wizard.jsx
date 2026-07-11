import "./Wizard.css";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "./context/LanguageContext.jsx";
import WizardProgressBar from "./WizardProgressBar.jsx";
import PatientDetails from "./PatientDetails.jsx";
import BiliData from "./BiliData.jsx";
import Summary from "./Summary.jsx";
import SummaryDialog from "./SummaryDialog.jsx";

import { submitData } from "./js/submitData.js";
import { graphBili } from "./js/graphBili.js";

export default function Wizard({ showDisclaimer }) {
  const { lang } = useLanguage();
  const [showPatientDetails, setShowPatientDetails] = useState(true);
  const [showBiliData, setShowBiliData] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const containerRef = useRef(null);
  const currentStep = showPatientDetails ? 0 : showBiliData ? 1 : 2;
  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [currentStep]);

  // Scrolls a field into view within the internal wizard-container only.
  // Using fieldRef.current.scrollIntoView() directly would let the browser
  // walk up to <body>/<html> too - on mobile those are height:100vh with
  // overflow:hidden (see home.css), which is still programmatically
  // scrollable even though the user can't scroll it back down. That shoves
  // the header off-screen and it never returns.
  const scrollFieldIntoView = (fieldRef) => {
    const container = containerRef.current;
    const field = fieldRef.current;
    if (!container || !field) return;

    const containerRect = container.getBoundingClientRect();
    const fieldRect = field.getBoundingClientRect();
    const offset =
      fieldRect.top -
      containerRect.top -
      container.clientHeight / 2 +
      fieldRect.height / 2;

    container.scrollBy({ top: offset, behavior: "smooth" });
  };

  // Patient Details
  const [dob, setDob] = useState("");
  const [hob, setHob] = useState("");
  const [gestAge, setGestAge] = useState("");
  const [riskFactors, setRiskFactors] = useState("");
  const [currentPhototherapy, setCurrentPhototherapy] = useState("");
  const [previousPhototherapy, setPreviousPhototherapy] = useState("");

  const [showDOBSubmitErrorMsg, setShowDOBSubmitErrorMsg] = useState(false);
  const [showHobErrorMsg, setShowHobErrorMsg] = useState(false);
  const [showHOBSubmitErrorMsg, setShowHOBSubmitErrorMsg] = useState(false);
  const [showGestAgeErrorMsg, setShowGestAgeErrorMsg] = useState(false);
  const [showRiskFactorsErrorMsg, setShowRiskFactorsErrorMsg] = useState(false);
  const [showCurrentPhototherapyErrorMsg, setShowCurrentPhototherapyErrorMsg] =
    useState(false);
  const [
    showPreviousPhototherapyErrorMsg,
    setShowPreviousPhototherapyErrorMsg,
  ] = useState(false);

  const dobRef = useRef(null);
  const hobRef = useRef(null);
  const gestAgeRef = useRef(null);
  const riskFactorsRef = useRef(null);
  const currentPhototherapyRef = useRef(null);
  const previousPhototherapyRef = useRef(null);

  // Bili Data
  const [biliData, setBiliData] = useState([
    {
      dot: "",
      hot: "",
      ageInHours: "",
      tcb: "",
      tsb: "",
    },
  ]);

  // Summary
  const [summaryGenerated, setSummaryGenerated] = useState(null);
  const [showSummaryErrorDialog, setShowSummaryErrorDialog] = useState(false);

  // Progress
  const goToBiliData = () => {
    setShowDOBSubmitErrorMsg(false);
    setShowHOBSubmitErrorMsg(false);
    setShowGestAgeErrorMsg(false);
    setShowRiskFactorsErrorMsg(false);
    setShowCurrentPhototherapyErrorMsg(false);
    setShowPreviousPhototherapyErrorMsg(false);

    // Validate that all required patient details data is present and valid before allowing user to proceed to bili data input
    // Note: DOB & HOB are optional fields, but if one is filled then the other must be filled as well in order to calculate age in hours for the nomogram
    if (!dob && hob) {
      setShowDOBSubmitErrorMsg(true);
      scrollFieldIntoView(dobRef);
      return;
    } else if (dob && !hob) {
      setShowHOBSubmitErrorMsg(true);
      scrollFieldIntoView(hobRef);
      return;
    } else if (!gestAge) {
      setShowGestAgeErrorMsg(true);
      scrollFieldIntoView(gestAgeRef);
      return;
    } else if (!riskFactors) {
      setShowRiskFactorsErrorMsg(true);
      scrollFieldIntoView(riskFactorsRef);
      return;
    } else if (!currentPhototherapy) {
      setShowCurrentPhototherapyErrorMsg(true);
      scrollFieldIntoView(currentPhototherapyRef);
      return;
    } else if (!previousPhototherapy) {
      setShowPreviousPhototherapyErrorMsg(true);
      scrollFieldIntoView(previousPhototherapyRef);
      return;
    }

    // Otherwise show the Bili Data page
    setShowPatientDetails(false);
    setShowBiliData(true);
    setShowSummary(false);
  };

  const goToSummary = async () => {
    // Validate that all the patient details and bili data is present and valid before allowing user to proceed to summary
    // Note: DOB & HOB are optional fields so don't need to validate them
    // Note: DOT & HOT are optional fields so don't need to validate them
    // If any missing data, show a dialog that tells the user what they are missing and to go back and add!
    if (
      !gestAge ||
      !riskFactors ||
      !currentPhototherapy ||
      !previousPhototherapy
    ) {
      setShowSummaryErrorDialog(true);
      return;
    }

    // Check that, if multiple bili data entries are present, that no ageInHours are the same
    const ageInHoursSet = new Set();
    for (let i = 0; i < biliData.length; i++) {
      const entry = biliData[i];
      if (ageInHoursSet.has(entry.ageInHours)) {
        setShowSummaryErrorDialog(true);
        return;
      }
      ageInHoursSet.add(entry.ageInHours);
    }

    // Validate that all the bili data is present and valid before allowing user to proceed to summary
    for (let i = 0; i < biliData.length; i++) {
      const entry = biliData[i];
      if (entry.ageInHours === "" || (!entry.tcb && !entry.tsb)) {
        setShowSummaryErrorDialog(true);
        return;
      }
    }

    // Validation passed
    // Summary Generator
    let summaryGenerated = await submitData(
      gestAge,
      riskFactors,
      currentPhototherapy,
      previousPhototherapy,
      biliData,
      lang,
    );

    // If summary generator fails, show the error dialog
    if (!summaryGenerated) {
      setShowSummaryErrorDialog(true);
      return;
    }

    // Validation passed
    setSummaryGenerated(summaryGenerated);

    // Show the Summary page first so #biliGraph is visible before Chart.js measures it
    setShowPatientDetails(false);
    setShowBiliData(false);
    setShowSummary(true);

    // Graph Generator - double RAF ensures the browser has painted before Chart.js measures the container
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        graphBili(summaryGenerated, lang);
      });
    });
  };

  return (
    <div className={`wizard ${showDisclaimer ? " hidden" : ""}`}>
      <WizardProgressBar
        showPatientDetails={showPatientDetails}
        setShowPatientDetails={setShowPatientDetails}
        goToBiliData={goToBiliData}
        showBiliData={showBiliData}
        setShowBiliData={setShowBiliData}
        goToSummary={goToSummary}
        showSummary={showSummary}
        setShowSummary={setShowSummary}
      />
      <div className="wizard-container" ref={containerRef}>
        <PatientDetails
          showPatientDetails={showPatientDetails}
          dob={dob}
          setDob={setDob}
          dobRef={dobRef}
          showDOBSubmitErrorMsg={showDOBSubmitErrorMsg}
          setShowDOBSubmitErrorMsg={setShowDOBSubmitErrorMsg}
          hob={hob}
          setHob={setHob}
          hobRef={hobRef}
          showHobErrorMsg={showHobErrorMsg}
          setShowHobErrorMsg={setShowHobErrorMsg}
          showHOBSubmitErrorMsg={showHOBSubmitErrorMsg}
          setShowHOBSubmitErrorMsg={setShowHOBSubmitErrorMsg}
          gestAge={gestAge}
          setGestAge={setGestAge}
          gestAgeRef={gestAgeRef}
          showGestAgeErrorMsg={showGestAgeErrorMsg}
          setShowGestAgeErrorMsg={setShowGestAgeErrorMsg}
          riskFactors={riskFactors}
          setRiskFactors={setRiskFactors}
          riskFactorsRef={riskFactorsRef}
          showRiskFactorsErrorMsg={showRiskFactorsErrorMsg}
          setShowRiskFactorsErrorMsg={setShowRiskFactorsErrorMsg}
          currentPhototherapy={currentPhototherapy}
          setCurrentPhototherapy={setCurrentPhototherapy}
          currentPhototherapyRef={currentPhototherapyRef}
          showCurrentPhototherapyErrorMsg={showCurrentPhototherapyErrorMsg}
          setShowCurrentPhototherapyErrorMsg={
            setShowCurrentPhototherapyErrorMsg
          }
          previousPhototherapy={previousPhototherapy}
          setPreviousPhototherapy={setPreviousPhototherapy}
          previousPhototherapyRef={previousPhototherapyRef}
          showPreviousPhototherapyErrorMsg={showPreviousPhototherapyErrorMsg}
          setShowPreviousPhototherapyErrorMsg={
            setShowPreviousPhototherapyErrorMsg
          }
          biliData={biliData}
          setBiliData={setBiliData}
          goToBiliData={goToBiliData}
        />

        <BiliData
          setShowPatientDetails={setShowPatientDetails}
          showBiliData={showBiliData}
          setShowBiliData={setShowBiliData}
          setShowSummary={setShowSummary}
          dob={dob}
          hob={hob}
          biliData={biliData}
          setBiliData={setBiliData}
          goToSummary={goToSummary}
        />

        <Summary
          showSummary={showSummary}
          setShowSummary={setShowSummary}
          setShowBiliData={setShowBiliData}
          dob={dob}
          hob={hob}
          gestAge={gestAge}
          riskFactors={riskFactors}
          currentPhototherapy={currentPhototherapy}
          previousPhototherapy={previousPhototherapy}
          biliData={biliData}
          summaryGenerated={summaryGenerated}
        />
      </div>

      <SummaryDialog
        gestAge={gestAge}
        riskFactors={riskFactors}
        currentPhototherapy={currentPhototherapy}
        previousPhototherapy={previousPhototherapy}
        biliData={biliData}
        showSummaryErrorDialog={showSummaryErrorDialog}
        setShowSummaryErrorDialog={setShowSummaryErrorDialog}
      />
    </div>
  );
}
