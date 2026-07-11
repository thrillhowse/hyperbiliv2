import { photoLevels } from "./bili-data.js";
import { t } from "../translations.js";

export const assessDeltaTSB = (
  patient,
  biliDataForThisRow,
  latestBili,
  dataAnalysis,
  lang,
) => {
  // Delta TSB is only applicable to patients 12h or older who have not received phototherapy
  if (biliDataForThisRow.ageInHours < 12) {
    dataAnalysis.deltaTSB = false;
    biliDataForThisRow.result = t[lang].comments.deltaTSBComments.ageUnder12h;
    return false;
  } else if (patient.phototherapy.previousPhototherapy) {
    dataAnalysis.deltaTSB = false;
    biliDataForThisRow.result = t[lang].comments.deltaTSBComments.previousPhoto;
    return false;
  }

  // If safe to proceed
  // First retrieve the photo levels for the given GA/RF for the given age in the bili data table
  // Note: data only applies to GA of 35, 36, 37 and 38+ in case of risk factors
  let gestAge = patient.ga;
  if (patient.riskFactors) {
    if (parseInt(gestAge) > 38) {
      gestAge = 38;
    }
  }

  // Second, just make sure to handle the case where patient age in hours is > 336 (last data point in the array)
  let ageInHours = biliDataForThisRow.ageInHours;
  if (biliDataForThisRow.ageInHours > 336) {
    ageInHours = 336;
  }

  // Get the photo level based on the GA, risk factors and age for this bili
  const photoLevel =
    photoLevels[gestAge][patient.presenceOfRiskFactors].data[ageInHours];

  // Calculate delta TSB
  let deltaTSB;
  if (biliDataForThisRow.tsb || biliDataForThisRow.tsb === 0) {
    deltaTSB = photoLevel - biliDataForThisRow.tsb;
  } else if (biliDataForThisRow.tcb || biliDataForThisRow.tcb === 0) {
    deltaTSB = photoLevel - biliDataForThisRow.tcb;
  }

  deltaTSB = parseInt(deltaTSB);

  // Set delta TSB value if this is the latest bili
  if (latestBili) {
    dataAnalysis.deltaTSBValue = deltaTSB;
  }

  // Then return result based on delta TSB using table in figure 1 and the first rule of 30's from CPS statement
  if (deltaTSB <= 30) {
    if (biliDataForThisRow.ageInHours < 24) {
      dataAnalysis.deltaTSB = true;
      biliDataForThisRow.result = `${t[lang].comments.deltaTSB} ${parseInt(
        deltaTSB,
      )} ${t[lang].comments.deltaTSBComments.lessThan30.ageUnder24h}`;
      return true;
    } else if (biliDataForThisRow.ageInHours >= 24) {
      dataAnalysis.deltaTSB = true;
      biliDataForThisRow.result = `${t[lang].comments.deltaTSB} ${parseInt(
        deltaTSB,
      )} ${t[lang].comments.deltaTSBComments.lessThan30.ageOver24h}`;
      return true;
    }
  }

  if (deltaTSB > 30 && deltaTSB <= 60) {
    dataAnalysis.deltaTSB = true;
    biliDataForThisRow.result = `${t[lang].comments.deltaTSB} ${parseInt(deltaTSB)} ${t[lang].comments.deltaTSBComments.lessThan60}`;
    return true;
  }

  if (deltaTSB > 60 && deltaTSB <= 90) {
    dataAnalysis.deltaTSB = true;
    biliDataForThisRow.result = `${t[lang].comments.deltaTSB} ${parseInt(deltaTSB)} ${t[lang].comments.deltaTSBComments.lessThan90}`;
    return true;
  }

  if (deltaTSB > 90) {
    dataAnalysis.deltaTSB = true;
    biliDataForThisRow.result = `${t[lang].comments.deltaTSB} ${parseInt(deltaTSB)} ${t[lang].comments.deltaTSBComments.greaterThan90}`;
    return true;
  }
};
