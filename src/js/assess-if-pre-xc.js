import { xcLevels } from "./bili-data.js";
import { t } from "../translations.js";

export const assessIfPreXC = (
  patient,
  biliDataForThisRow,
  latestBili,
  dataAnalysis,
  lang,
) => {
  // First retrieve the XC levels for the given GA/RF for the given age in the bili data table
  // Note: data only applies to GA of 35, 36, 37 and 38+ (regardless of risk factors) so just need to handle the last case
  let gestAge = patient.ga;
  if (parseInt(gestAge) > 38) {
    gestAge = 38;
  }

  let ageInHours = biliDataForThisRow.ageInHours;

  // Get the xc level based on the GA, risk factors and age for this bili
  const xcLevel =
    xcLevels[gestAge][patient.presenceOfRiskFactors].data[ageInHours];
  // Use this to define pre-XC levels (i.e. within 30 umol/L of XC level)
  const preXcLevel = parseFloat(xcLevel) - 30;

  // Check if this is the latest/most recent data point (by age in hours)
  // and if so set the dataAnalysis.preXcLevel to this data point's pre xc level
  if (latestBili) {
    dataAnalysis.preXcLevel = parseFloat(preXcLevel.toFixed(2)); // to 2 decimal places, consistent with bili-data.js
  }

  // In case of neurotoxicity risk factors, BET can be initiated when TSB reaches the pre-exchange transfusion
  // threshold (≤30 μmol/L of the exchange transfusion threshold) - Recommendation 26
  if (patient.riskFactors) {
    // Check if TSB is available and at/above the pre-XC level
    if (biliDataForThisRow.tsb && biliDataForThisRow.tsb >= preXcLevel) {
      biliDataForThisRow.result = t[lang].comments.preXC.tsbWithRF;
      return true;
    }
    // If TSB is not available (i.e., we only have TcB for this data point)
    // then check if TcB is available and at/above the pre-XC level
    if (
      !biliDataForThisRow.tsb &&
      biliDataForThisRow.tcb &&
      biliDataForThisRow.tcb >= preXcLevel
    ) {
      biliDataForThisRow.result = t[lang].comments.preXC.tcbWithRF;
      return true;
    }
  }

  // If no neurotoxicity risk factors
  // can then compare the pre-xc level with the bili data for the given age starting by checking TSB (then TcB if TSB n/a)
  if (biliDataForThisRow.tsb && biliDataForThisRow.tsb >= preXcLevel) {
    biliDataForThisRow.result = t[lang].comments.preXC.tsbWithoutRF;
    return true;
  } else if (
    !biliDataForThisRow.tsb &&
    biliDataForThisRow.tcb &&
    biliDataForThisRow.tcb >= preXcLevel
  ) {
    biliDataForThisRow.result = t[lang].comments.preXC.tcbWithoutRF;
    return true;
  }

  // If the selected measurement is not at/above the pre-XC level, return false
  return false;
};
