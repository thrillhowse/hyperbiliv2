import { photoLevels } from './bili-data.js';
import { t } from '../translations.js';

export const assessIfPrePhoto = (
  patient,
  biliDataForThisRow,
  latestBili,
  dataAnalysis,
  lang,
) => {
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

  // Use this to define pre-photo levels (i.e. within 30 umol/L of photo level)
  const prePhotoLevel = parseFloat(photoLevel) - 30;

  // Check if this is the latest/most recent data point (by age in hours)
  // and if so set the dataAnalysis.prePhotoLevel to this data point's pre photo level
  if (latestBili) {
    dataAnalysis.prePhotoLevel = prePhotoLevel.toFixed(2);
  }

  // TSB //
  // Now check if we have TSB
  if (biliDataForThisRow.tsb) {
    // Assessment of pre-photo levels for TSB only applies to babies with neurotoxicity risk factors
    // At clinicians’ discretion, phototherapy can be initiated in infants with neurotoxicity risk factor(s) when
    // TSB is ≤30 µmol/L of the phototherapy threshold [the second rule of 30] per CPS statement
    if (patient.riskFactors && biliDataForThisRow.tsb >= prePhotoLevel) {
      biliDataForThisRow.result = t[lang].comments.prePhoto.tsbNearPhoto;
      return true;
    }
  }

  // TcB //
  // Otherwise, define the tcb thresholds to obtain TSB (i.e. within 50 umol/L of photo level)
  const tcbCutoffLevel = photoLevel - 50;
  dataAnalysis.tcbCutoffLevel = tcbCutoffLevel;

  // Then check if we have TcB
  if (!biliDataForThisRow.tsb && biliDataForThisRow.tcb) {
    // If TcB is used to monitor infants with hyperbilirubinemia, confirmatory testing with TSB should
    // be obtained when TcB level is within 50 µmol/L of the hourly specific phototherapy threshold
    // and/or if TcB is above 250 µmol/L (recommendation 10)
    if (biliDataForThisRow.tcb >= 250) {
      dataAnalysis.tcbCutoff = true;
      biliDataForThisRow.result = t[lang].comments.prePhoto.tcb250;
      return true;
    } else if (biliDataForThisRow.tcb >= tcbCutoffLevel) {
      dataAnalysis.tcbCutoff = true;
      biliDataForThisRow.result = t[lang].comments.prePhoto.tcbNearPhoto;
      return true;
    }
  } else {
    return false;
  }
};
