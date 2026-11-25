import { assessIfXC } from "./assess-if-xc.js";
import { assessIfPreXC } from "./assess-if-pre-xc.js";
import { assessIfPhoto } from "./assess-if-photo.js";
import { assessIfPrePhoto } from "./assess-if-pre-photo.js";
import { assessDeltaTSB } from "./assess-delta-tsb.js";
// import { checkIfLatestBili } from "./check-if-latest-bili.js";

// Function to analyze the data when the user hits sumbit (or clicks the Summary at the top of the page)
export const analyzeData = (
  gestAge,
  riskFactors,
  currentPhototherapy,
  previousPhototherapy,
  biliDataEntries,
  lang,
) => {
  // Define the data object to return
  const dataAnalysis = {};

  // Collect patient data
  let ga = gestAge;

  // Risk factors (neurotoxicity)
  let presenceOfRiskFactors = null;
  let riskFactorsStr = null;
  let riskFactorsBool = null;
  if (riskFactors === "No") {
    presenceOfRiskFactors = "noRiskFactors";
    riskFactorsStr = "none";
    riskFactorsBool = false;
  } else if (riskFactors === "Yes") {
    presenceOfRiskFactors = "riskFactorsPresent";
    riskFactorsStr = "present";
    riskFactorsBool = true;
  }

  // Current Phototherapy
  let currentPhototherapyChecked = null;
  if (currentPhototherapy === "No") {
    currentPhototherapyChecked = false;
  } else if (currentPhototherapy === "Yes") {
    currentPhototherapyChecked = true;
  }

  // Previous Phototherapy
  let previousPhototherapyChecked = null;
  if (previousPhototherapy === "No") {
    previousPhototherapyChecked = false;
  } else if (previousPhototherapy === "Yes") {
    previousPhototherapyChecked = true;
  }

  // Create a patient object
  const patient = {
    ga: ga,
    presenceOfRiskFactors: presenceOfRiskFactors,
    riskFactorsStr: riskFactorsStr,
    riskFactors: riskFactorsBool,
    phototherapy: {
      currentPhototherapy: currentPhototherapyChecked,
      previousPhototherapy: previousPhototherapyChecked,
    },
  };

  // Add to data analysis obj
  dataAnalysis.patient = patient;

  // Then collect the bili data
  const biliData = [];

  // First define the latest age in hours (to be used to determine if this is the latest bili)
  const latestAgeInHours = Math.max(
    ...biliDataEntries.map((entry) => parseInt(entry.ageInHours)),
  );

  // NEW
  // Set a property holding the latest age in hours
  // in Sumarry.jsx can evaluated later if this exceed the threshold (336 hours)
  dataAnalysis.latestAgeInHours = latestAgeInHours;

  // Iterate over the rows, gathering the necessary data
  // while also comparing the bili values to the xc/photo levels
  const numberOfEntries = biliDataEntries.length;
  for (let i = 1; i <= numberOfEntries; i++) {
    let biliDataForThisRow = {
      row: "",
      testDate: "",
      testTime: "",
      ageInHours: "",
      tcb: "",
      tsb: "",
      result: "",
      category: "",
    };

    biliDataForThisRow.row = i;
    biliDataForThisRow.testDate = biliDataEntries[i - 1].dot;
    biliDataForThisRow.testTime = biliDataEntries[i - 1].hot;
    biliDataForThisRow.ageInHours = parseInt(biliDataEntries[i - 1].ageInHours); // round down to nearest integer for age in hours

    // TcB
    let tcb = biliDataEntries[i - 1].tcb;
    if (tcb && !isNaN(tcb)) {
      biliDataForThisRow.tcb = parseInt(tcb); // round down to nearest integer
    }

    // TSB
    let tsb = biliDataEntries[i - 1].tsb;
    if (tsb && !isNaN(tsb)) {
      biliDataForThisRow.tsb = parseInt(tsb); // round down to nearest integer
    }

    // Latest bili
    // define a variable to hold whether this is the latest bili
    // if it is - it should be used to define the cutoffs and the graph we pick later on
    // and to calculate the rate of rise
    let latestBili = biliDataForThisRow.ageInHours === latestAgeInHours;

    // Compare the bili for the given age in hours to the various XC/photo cutoffs
    //  - XC: check if bili for given age is above XC levels, else
    //  - preXC: check if bili is in pre-XC levels (delta within 30), else
    //  - photo: check if bili for given age is above photo levels, else
    //  - prePhoto: check if bili is in pre-photo levels (delta within 30) for those with risk factors, else
    //  - deltaTSB: calculate deltaTSB in babies 12h or older and who do not fulfill any of the above

    // XC levels
    // returns true/false if above XC levels
    // and updates the dataAnalysis object with data (i.e., xc levels, xc boolean, result for summary, etc)
    const xcLevel = assessIfXC(
      patient,
      biliDataForThisRow,
      latestBili,
      dataAnalysis,
      lang,
    );
    if (xcLevel) {
      // Check if this is the latest bili
      if (latestBili) {
        // If so then set xc to true
        dataAnalysis.xc = true;
      }

      // Set the row category
      biliDataForThisRow.category = "exchange";

      // Then skip to next bili but add this bili info to the biliData arr
      biliData.push(biliDataForThisRow);
      continue;
    }

    // Pre-XC levels
    // returns true/false if within 30 umol of XC levels
    // and updates the dataAnalysis object with data (i.e., xc levels, xc boolean, result for summary, etc)
    const preXcLevel = assessIfPreXC(
      patient,
      biliDataForThisRow,
      latestBili,
      dataAnalysis,
      lang,
    );
    if (preXcLevel) {
      // Check if this is the latest bili
      if (latestBili) {
        // If so then set preXC to true
        dataAnalysis.preXC = true;
      }

      // Set the row category
      biliDataForThisRow.category = "preExchange";

      // Then skip to next bili but add this bili info to the biliData arr
      biliData.push(biliDataForThisRow);
      continue;
    }

    // Photo levels
    // returns true/false if above photo levels
    // returns true anytime patient is on photo
    // and updates the dataAnalysis object with data (i.e., photo levels, photo boolean, result for summary, etc)
    const photoLevel = assessIfPhoto(
      patient,
      biliDataForThisRow,
      latestBili,
      dataAnalysis,
      lang,
    );
    // If photoLevel is true, it means the patient is on phototherapy and either at/above or below photo threshold
    // or they are not on photo but they are at/above the phototherapy threshold
    if (photoLevel) {
      // Check if this is the latest bili
      if (latestBili) {
        // assess-if-photo.js may have already set photo to false (on-photo, below threshold);
        // only default to true if assess-if-photo.js didn't explicitly set it
        if (dataAnalysis.photo !== false) {
          dataAnalysis.photo = true;
        }
      }

      // Set the row category
      // first define if we have TSB
      const hasTSB =
        biliDataForThisRow.tsb !== "" &&
        biliDataForThisRow.tsb !== null &&
        biliDataForThisRow.tsb !== undefined;

      // if the patient is currently on phototherapy but below the phototherapy threshold
      if (latestBili && patient.phototherapy.currentPhototherapy) {
        if (!hasTSB) {
          biliDataForThisRow.category = "phototherapyTSBRequired";
        } else if (dataAnalysis.photo === false) {
          biliDataForThisRow.category = "phototherapyBelowThreshold";
        } else {
          biliDataForThisRow.category = "phototherapy";
        }
      } else {
        // for all other cases
        biliDataForThisRow.category = "phototherapy";
      }

      // Then skip to next bili but add this bili info to the biliData arr
      biliData.push(biliDataForThisRow);
      continue;
    }

    // Pre-photo levels
    // returns true/false if within 30 umol of photo levels
    // and updates the dataAnalysis object with data (i.e., photo levels, photo boolean, result for summary, etc)
    const prePhotoLevel = assessIfPrePhoto(
      patient,
      biliDataForThisRow,
      latestBili,
      dataAnalysis,
      lang,
    );
    if (prePhotoLevel) {
      // Check if this is the latest bili
      if (latestBili) {
        // If so then set prePhoto to true
        dataAnalysis.prePhoto = true;
      }

      // Set the row category
      biliDataForThisRow.category = "prePhototherapy";

      // Adjust category if we are dealing with a TcB that is within cutoff levels
      if (!biliDataForThisRow.tsb && biliDataForThisRow.tcb) {
        biliDataForThisRow.category = "tcbCutoff";
      }

      // Then skip to next bili but add this bili info to the biliData arr
      biliData.push(biliDataForThisRow);
      continue;
    }

    // Delta TSB
    // final step that evaluates what to do if bili is not above XC/photo levels and not above pre-XC/photo levels
    // based on figure 1 in CPS statement
    const deltaTSB = assessDeltaTSB(
      patient,
      biliDataForThisRow,
      latestBili,
      dataAnalysis,
      lang,
    );

    // Set the row category
    if (!deltaTSB) {
      // If delta TSB could not be assessed, set category to notApplicable
      biliDataForThisRow.category = "notApplicable";
    } else {
      // If delta TSB calculated but previous phototherapy
      if (patient.phototherapy.previousPhototherapy) {
        biliDataForThisRow.category = "deltaTSBPreviousPhoto";
      }
      // If delta TSB is <= 90 then set to warning
      else if (biliDataForThisRow.deltaTSB <= 90) {
        biliDataForThisRow.category = "warning";
      }
      // If delta TSB is > 90 then set to routine
      else if (biliDataForThisRow.deltaTSB > 90) {
        biliDataForThisRow.category = "routine";
      }
    }

    // Finally add this bili info to the biliData arr
    biliData.push(biliDataForThisRow);
  }

  // The biliData arr now holds all the bili data and analysis from the above for loop
  // so can now add the biliData arr to data analysis obj
  dataAnalysis.biliData = biliData;

  return dataAnalysis;
};
