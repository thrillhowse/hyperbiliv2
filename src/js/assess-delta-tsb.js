import { photoLevels } from "./bili-data.js";
import { t } from "../translations.js";

export const assessDeltaTSB = (
  patient,
  biliDataForThisRow,
  latestBili,
  dataAnalysis,
  lang,
) => {
  // Delta TSB is only applicable to patients 12h or older or who have not received previous phototherapy
  // Nov 2026: Dr. Ng noted that calculating delta TSB with previous phototherapy can be done but a warning should be added
  if (biliDataForThisRow.ageInHours < 12) {
    dataAnalysis.deltaTSB = false;
    biliDataForThisRow.result = t[lang].comments.deltaTSBComments.ageUnder12h;
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

  let ageInHours = biliDataForThisRow.ageInHours;

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

  // deltaTSB = parseInt(deltaTSB);
  deltaTSB = Math.trunc(deltaTSB); // round down to nearest integer (more conservative, v1 used parseInt which is also fine)

  // Set delta TSB value if this is the latest bili
  // Only set the deltaTSBValue in the dataAnalysis object if this is the latest bili
  // This value will be used as the delta TSB showed in the summary or analysis for the latest bili
  if (latestBili) {
    dataAnalysis.deltaTSBValue = deltaTSB;
  }

  // Nov 2026: If the patient has received previous phototherapy, add a warning to the result
  if (patient.phototherapy.previousPhototherapy) {
    dataAnalysis.deltaTSB = true;
    biliDataForThisRow.deltaTSB = deltaTSB;
    biliDataForThisRow.result =
      `${t[lang].comments.deltaTSB} ${deltaTSB} µmol/L<br><br>` +
      t[lang].comments.deltaTSBComments.previousPhoto;
    return true;
  }

  // Then return result based on delta TSB using table in figure 1 and the first rule of 30's from CPS statement
  if (deltaTSB <= 30) {
    if (biliDataForThisRow.ageInHours < 24) {
      dataAnalysis.deltaTSB = true;
      biliDataForThisRow.deltaTSB = deltaTSB;
      biliDataForThisRow.result = `${t[lang].comments.deltaTSB} ${deltaTSB} ${t[lang].comments.deltaTSBComments.lessThan30.ageUnder24h}`;
      return true;
    } else if (biliDataForThisRow.ageInHours >= 24) {
      dataAnalysis.deltaTSB = true;
      biliDataForThisRow.deltaTSB = deltaTSB;
      biliDataForThisRow.result = `${t[lang].comments.deltaTSB} ${deltaTSB} ${t[lang].comments.deltaTSBComments.lessThan30.ageOver24h}`;
      return true;
    }
  }

  if (deltaTSB > 30 && deltaTSB <= 60) {
    dataAnalysis.deltaTSB = true;
    biliDataForThisRow.deltaTSB = deltaTSB;
    biliDataForThisRow.result = `${t[lang].comments.deltaTSB} ${deltaTSB} ${t[lang].comments.deltaTSBComments.lessThan60}`;
    return true;
  }

  if (deltaTSB > 60 && deltaTSB <= 90) {
    dataAnalysis.deltaTSB = true;
    biliDataForThisRow.deltaTSB = deltaTSB;
    biliDataForThisRow.result = `${t[lang].comments.deltaTSB} ${deltaTSB} ${t[lang].comments.deltaTSBComments.lessThan90}`;
    return true;
  }

  if (deltaTSB > 90) {
    dataAnalysis.deltaTSB = true;
    biliDataForThisRow.deltaTSB = deltaTSB;
    biliDataForThisRow.result = `${t[lang].comments.deltaTSB} ${deltaTSB} ${t[lang].comments.deltaTSBComments.greaterThan90}`;
    return true;
  }
};
