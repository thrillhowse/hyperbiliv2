import { photoLevels } from './bili-data.js';
import { t } from '../translations.js';

export const assessIfPhoto = (
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

  // Define deltaTSB
  let deltaTSB = null;

  // Before proceeding we need to know if we're dealing with the latest bili
  // (this is because the comment will depend on whether the patient is currently on photo or not)
  // and if so set the dataAnalysis.photoLevel to this data point's photo level
  if (latestBili) {
    dataAnalysis.photoLevel = parseFloat(photoLevel);
  }

  // If the patient is currently ON phototherapy (i.e., the latest bili is while patient is on photo)
  // need to adjust comment accordingly
  if (latestBili && patient.phototherapy.currentPhototherapy) {
    // First check if we're dealing with a TSB
    if (biliDataForThisRow.tsb || biliDataForThisRow.tsb === 0) {
      // And if so then whether the TSB is at or above photo
      if (biliDataForThisRow.tsb >= photoLevel) {
        dataAnalysis.photo = true;
        biliDataForThisRow.result =
          t[lang].comments.onPhototherapy.tsbAbovePhoto;
        return true;
      } else {
        // And if not above photo threshold then need to calculate a delta TSB between photo level and current tsb
        // note: this is slightly different from delta TSB calculated when not on phototherapy which is dealt with in assess-delta-tsb.js
        dataAnalysis.photo = false;
        deltaTSB = photoLevel - biliDataForThisRow.tsb;

        // DeltaTSB depends on GA but not going to differentiate response as don't want to give explicit advice (just to say below threshold)
        biliDataForThisRow.result = `${t[lang].comments.deltaTSB} ${parseInt(
          deltaTSB,
        )} ${t[lang].comments.onPhototherapy.tsbBelowPhoto.whileOnPhoto}
        ${t[lang].comments.onPhototherapy.tsbBelowPhoto.tsbBelowPhotoSubtext}`;
        return true;
      }
    }

    // Otherwise check if we're dealing with a TcB
    if (biliDataForThisRow.tcb || biliDataForThisRow.tcb === 0) {
      // TcB should not be used while patients are on photo so just need to state that
      biliDataForThisRow.result = t[lang].comments.onPhototherapy.tcb;
      return true;
    }
  }

  // Otherwise if patient is currently NOT ON phototherapy or if this is not latest bili
  // Compare the photo level with the bili data for the given age starting by checking tsb (then tcb if tsb n/a)
  if (biliDataForThisRow.tsb && biliDataForThisRow.tsb >= photoLevel) {
    biliDataForThisRow.result =
      t[lang].comments.notOnPhototherapy.tsbAbovePhoto;
    return true;
  } else if (
    !biliDataForThisRow.tsb &&
    biliDataForThisRow.tcb &&
    biliDataForThisRow.tcb >= photoLevel
  ) {
    biliDataForThisRow.result =
      t[lang].comments.notOnPhototherapy.tcbAbovePhoto;
    return true;
  } else {
    return false;
  }
};
