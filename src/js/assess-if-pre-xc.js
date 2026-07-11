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

  // Second, just make sure to handle the case where patient age in hours is > 336 (last data point in the array)
  let ageInHours = biliDataForThisRow.ageInHours;
  if (biliDataForThisRow.ageInHours > 336) {
    ageInHours = 336;
  }

  // Get the xc level based on the GA, risk factors and age for this bili
  const xcLevel =
    xcLevels[gestAge][patient.presenceOfRiskFactors].data[ageInHours];
  // Use this to define pre-XC levels (i.e. within 30 umol/L of XC level)
  const preXcLevel = parseFloat(xcLevel) - 30;

  // Check if this is the latest/most recent data point (by age in hours)
  // and if so set the dataAnalysis.preXcLevel to this data point's pre xc level
  if (latestBili) {
    dataAnalysis.preXcLevel = parseFloat(preXcLevel.toFixed(2));
  }

  // In case of neurotoxicity risk factors, BET can be initiated when TSB reaches the pre-exchange transfusion
  // threshold (≤30 μmol/L of the exchange transfusion threshold) - Recommendation 26
  if (patient.riskFactors) {
    if (biliDataForThisRow.tsb && biliDataForThisRow.tsb >= preXcLevel) {
      biliDataForThisRow.result = t[lang].comments.preXC.tsbWithRF;
      return true;
    }
    // Do the same for TcB
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
  // can then compare the pre-xc level with the bili data for the given age starting by checking tsb (then tcb if tsb n/a)
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
  } else {
    return false;
  }
};
