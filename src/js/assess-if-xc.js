import { xcLevels } from "./bili-data.js";
import { t } from "../translations.js";

export const assessIfXC = (
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
    // Reset to 38 weeks
    gestAge = 38;
  }

  let ageInHours = biliDataForThisRow.ageInHours;

  // Get the xc level based on the GA, risk factors and age for this bili
  const xcLevel =
    xcLevels[gestAge][patient.presenceOfRiskFactors].data[ageInHours];

  // Check if this is the latest/most recent data point (by age in hours)
  // and if so set the dataAnalysis.xcLevel to this data point's xc level
  if (latestBili) {
    // If so store the latest entry's exchange threshold
    dataAnalysis.xcLevel = parseFloat(xcLevel);
  }

  // Then compare the xc level with the bili data for the given age starting by checking tsb (then tcb if tsb n/a)
  // check if TSB is available and if at/above the XC level
  if (biliDataForThisRow.tsb && biliDataForThisRow.tsb >= xcLevel) {
    biliDataForThisRow.result = t[lang].comments.xc.tsbXC;
    return true;
  }
  // If TSB is not available (i.e., we only have TcB for this data point)
  // then check if TcB is available and if at/above the XC level
  else if (
    !biliDataForThisRow.tsb &&
    biliDataForThisRow.tcb &&
    biliDataForThisRow.tcb >= xcLevel
  ) {
    biliDataForThisRow.result = t[lang].comments.xc.tcbXC;
    return true;
  }

  // If the selected measurement is not at/above the XC level, return false
  return false;
};
