// Calculate the rate of rise for each bili
export const calculateRateOfRise = (dataAnalysis) => {
  // dataAnalysis has a property biliData which is array of objects where each object is a row in the bili data table
  // it should already be in order of age in hours

  // First check if there is more than 1 data point
  if (dataAnalysis.biliData.length < 2) {
    // console.log('only 1 data point so no ror to calc');
    dataAnalysis.ror = [];
    return dataAnalysis;
  }

  // Otherwise, calculate the rate of rise between the bili data points
  const ror = [];
  let latestRow, secondLatestRow, ageDiff, biliDiff, rateOfRise;

  // Order the bili data by age in hours
  const sortedBiliData = dataAnalysis.biliData.sort(
    (a, b) => a.ageInHours - b.ageInHours,
  );

  for (let i = sortedBiliData.length - 1; i > 0; i--) {
    latestRow = sortedBiliData[i];
    secondLatestRow = sortedBiliData[i - 1];

    // Age difference
    ageDiff = latestRow.ageInHours - secondLatestRow.ageInHours;

    // Bili difference
    // prioritize tsb over tcb
    // start with case where both data points are tsb
    if (latestRow.tsb && secondLatestRow.tsb) {
      biliDiff = latestRow.tsb - secondLatestRow.tsb;
    }

    // if either data point is NOT a tsb
    if (!latestRow.tsb || !secondLatestRow.tsb) {
      let onlyTcB = false;

      // then check if both data points are tcb
      if (
        !latestRow.tsb &&
        latestRow.tcb &&
        !secondLatestRow.tsb &&
        secondLatestRow.tcb
      ) {
        onlyTcB = true;
      }

      if (onlyTcB) {
        // then use tcb to calculate the bili difference
        biliDiff = latestRow.tcb - secondLatestRow.tcb;
      } else {
        // otherwise use tsb to calculate the bili difference
        if (latestRow.tsb) {
          biliDiff = latestRow.tsb - secondLatestRow.tcb;
        } else {
          biliDiff = latestRow.tcb - secondLatestRow.tsb;
        }
      }
    }

    // Rate of rise
    rateOfRise = biliDiff / ageDiff;
    rateOfRise = rateOfRise.toFixed(1);

    // Insert the rate of rise into the ror array at the start
    ror.unshift(rateOfRise);
  }

  dataAnalysis.ror = ror;

  // Add a check for whether RoR is high for given age
  dataAnalysis.rorHigh = false;
  if (sortedBiliData[sortedBiliData.length - 1].ageInHours > 24) {
    if (ror[ror.length - 1] >= 3.5) {
      dataAnalysis.rorHigh = true;
    }
  } else if (sortedBiliData[sortedBiliData.length - 1].ageInHours <= 24) {
    if (ror[ror.length - 1] >= 5) {
      dataAnalysis.rorHigh = true;
    }
  }

  return dataAnalysis;
};
