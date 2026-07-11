import { hideSummaryAndGraph } from './hide-summary-and-graph.js';
import { checkForRequiredData } from './validation-functions/check-for-required-data.js';
import { analyzeData } from './analyzeData.js';
import { createSummaryTable } from './createSummaryTable.js';
import { calculateRateOfRise } from './calculate-rate-of-rise.js';

const patientDataSummaryDiv = document.querySelector(
  '#patientDetailsSummaryTable',
);
const biliDataTableDiv = document.querySelector('#biliDataSummaryTable');

// Submit data
// when user clicks the Submit button (or clicks on the Summary at the top of the page)
export const submitData = async (
  gestAge,
  riskFactors,
  currentPhototherapy,
  previousPhototherapy,
  biliData,
  lang,
) => {
  // If summary/graph are showing make sure to remove them (to avoid duplicates)
  hideSummaryAndGraph();

  // Call analyzeData() to get the data regarding the patient, bili data (for every row) and relationship to XC/photo/deltaTSB
  const dataAnalysis = analyzeData(
    gestAge,
    riskFactors,
    currentPhototherapy,
    previousPhototherapy,
    biliData,
    lang,
  );

  // Call calculateRateOfRise() to calculate the rate of rise for each bili and update the dataAnalysis object with the results
  calculateRateOfRise(dataAnalysis);

  // Use this data to construct a table summarizing the information
  try {
    await createSummaryTable(dataAnalysis, lang);
  } catch (error) {
    console.log('error creating summary table', error);
    return false;
  }

  // Note: previously had the call to graphBili() here
  // but due to change to a wizard cannot do this until the summary page is displayed
  // therefore put the call to graphBili() in the wizard-nav.js script
  return dataAnalysis;
};
