import { t } from '../translations.js';

// Create a summary of the data
export const createSummaryTable = async (data, lang) => {
  // Patient Details
  let neurotoxRF;
  if (data.patient.riskFactors) {
    neurotoxRF = t[lang].dictionary.yes;
  } else {
    neurotoxRF = t[lang].dictionary.no;
  }

  let currentPhoto;
  if (data.patient.phototherapy.currentPhototherapy) {
    currentPhoto = t[lang].dictionary.yes;
  } else {
    currentPhoto = t[lang].dictionary.no;
  }

  let previousPhoto;
  if (data.patient.phototherapy.previousPhototherapy) {
    previousPhoto = t[lang].dictionary.yes;
  } else {
    previousPhoto = t[lang].dictionary.no;
  }

  let patientDetailsHTML = `
  <div id='patient-details-summary-div'>
    <p class='summary-table-title patient-summary-table-title'>
    <span class="lucide--baby"></span>
${t[lang].summary.patientDetails.header}
    </p>
    <div class='summary-table-row'>
      <p class='summary-table-row-label'>${t[lang].summary.patientDetails.gestAge}</p>
      <p class='summary-table-row-value'>${data.patient.ga} ${t[lang].dictionary.weeks}</p>
    </div>
    <div class='summary-table-row'>
      <p class='summary-table-row-label'>${t[lang].summary.patientDetails.neurotoxRF}</p>
      <p class='summary-table-row-value'>${neurotoxRF}</p>
    </div>
    <div class='summary-table-row'>
      <p class='summary-table-row-label'>${t[lang].summary.patientDetails.currentPhoto}</p>
      <p class='summary-table-row-value'>${currentPhoto}</p>
    </div>
    <div class='summary-table-row summary-table-last-row'>
      <p class='summary-table-row-label'>${t[lang].summary.patientDetails.previousPhoto}</p>
      <p class='summary-table-row-value'>${previousPhoto}</p>
    </div>
  </div>
  `;

  // Ideally will have the bili in order of ascending age in hours (regardless of how user enters them)
  // so need to organize data.biliData (array of objects) in order of ageInHours
  const orderedBiliData = data.biliData.sort(
    (a, b) => a.ageInHours - b.ageInHours,
  );

  // For the main summary section, only want to show details about the LATEST bilirubin (i.e., most recent in time not the last one on the table)
  const latestBili = orderedBiliData[orderedBiliData.length - 1];

  // Define latest bili test time (if it exists)
  let latestBiliTestDate = '';
  if (latestBili.testDate) {
    latestBiliTestDate =
      latestBili.testDate + ' ' + latestBili.testTime + ':00';
  }

  // Define booleans relative to cutoffs
  let photoCutoff = `<span style='color: #cf1928; font-weight: bold'><span class="lucide--triangle-alert"></span> ${t[lang].summary.biliData.aboveCutoff} `;
  let preXcCutoff = `<span style='color: #cf1928; font-weight: bold'><span class="lucide--triangle-alert"></span> ${t[lang].summary.biliData.aboveCutoff} `;
  let xcCutoff = `<span style='color: #cf1928; font-weight: bold'><span class="lucide--triangle-alert"></span> ${t[lang].summary.biliData.aboveCutoff} `;

  if (latestBili.tsb || latestBili.tsb === 0) {
    if (latestBili.tsb >= data.xcLevel) {
      xcCutoff += `(${parseInt(data.xcLevel)} µmol/L)`;
    } else if (latestBili.tsb >= data.preXcLevel) {
      xcCutoff = `<span>${t[lang].summary.biliData.belowCutoff} (${parseInt(data.xcLevel)} µmol/L)`;
      preXcCutoff += `(${parseInt(data.preXcLevel)} µmol/L)`;
    } else if (latestBili.tsb >= data.photoLevel) {
      xcCutoff = `<span>${t[lang].summary.biliData.belowCutoff} (${parseInt(data.xcLevel)} µmol/L)`;
      preXcCutoff = `<span>${t[lang].summary.biliData.belowCutoff} (${parseInt(
        data.preXcLevel,
      )} µmol/L)`;
      photoCutoff += `(${parseInt(data.photoLevel)} µmol/L)`;
    } else {
      xcCutoff = `<span>${t[lang].summary.biliData.belowCutoff} (${parseInt(data.xcLevel)} µmol/L)`;
      preXcCutoff = `<span>${t[lang].summary.biliData.belowCutoff} (${parseInt(
        data.preXcLevel,
      )} µmol/L)`;
      photoCutoff = `<span>${t[lang].summary.biliData.belowCutoff} (${parseInt(
        data.photoLevel,
      )} µmol/L)`;
    }
  } else if (latestBili.tcb || latestBili.tcb === 0) {
    if (latestBili.tcb >= data.xcLevel) {
      xcCutoff += `(${parseInt(data.xcLevel)} µmol/L)`;
    } else if (latestBili.tcb >= data.preXcLevel) {
      xcCutoff = `<span>${t[lang].summary.biliData.belowCutoff} (${parseInt(data.xcLevel)} µmol/L)`;
      preXcCutoff += `(${parseInt(data.preXcLevel)} µmol/L)`;
    } else if (latestBili.tcb >= data.photoLevel) {
      xcCutoff = `<span>${t[lang].summary.biliData.belowCutoff} (${parseInt(data.xcLevel)} µmol/L)`;
      preXcCutoff = `<span>${t[lang].summary.biliData.belowCutoff} (${parseInt(
        data.preXcLevel,
      )} µmol/L)`;
      photoCutoff += `(${parseInt(data.photoLevel)} µmol/L)`;
    } else {
      xcCutoff = `<span>${t[lang].summary.biliData.belowCutoff} (${parseInt(data.xcLevel)} µmol/L)`;
      preXcCutoff = `<span>${t[lang].summary.biliData.belowCutoff} (${parseInt(
        data.preXcLevel,
      )} µmol/L)`;
      photoCutoff = `<span>${t[lang].summary.biliData.belowCutoff} (${parseInt(
        data.photoLevel,
      )} µmol/L)`;
    }
  }

  let biliDataHTML = `
  <div id='summary-table-div'>
      <p class='summary-table-title bili-summary-table-title'>
      <span class="fluent--molecule-32-regular"></span>
      ${t[lang].summary.biliData.header}
    </p>
    <div class="bilirubin-data-container">
      <div class="bilirubin-data-header">
        <p>${t[lang].summary.biliData.latestResult}</p>
        <p>${latestBiliTestDate}</p>
      </div>
      <div class="bilirubin-data-row">
        <p class="bilirubin-data-label">${t[lang].summary.biliData.age}</p>
        <p class="bilirubin-data-value">${latestBili.ageInHours} ${t[lang].dictionary.hours}</p>
      </div>
      <div class="bilirubin-data-row">
        <p class="bilirubin-data-label">${t[lang].summary.biliData.tcb}</p>
        <p class="bilirubin-data-value">${latestBili.tcb ?? '-'} µmol/L</p>
      </div>
      <div class="bilirubin-data-row">
        <p class="bilirubin-data-label">${t[lang].summary.biliData.tsb}</p>
        <p class="bilirubin-data-value">${latestBili.tsb ?? '-'} µmol/L</p>
      </div>
      <div class="bilirubin-data-row">
        <p class="bilirubin-data-label">${t[lang].summary.biliData.ror}</p>
        <p class="bilirubin-data-value">${data.ror?.join(' ➜ ') ?? '-'}</p>
      </div>

      <div class="bilirubin-data-header">
        <p>${t[lang].summary.biliData.interpretation}</p>
      </div>
      <div class="bilirubin-data-row">
        <p class="bilirubin-data-label">${t[lang].summary.biliData.deltaTSB}</p>
        <p class="bilirubin-data-value">${data.deltaTSBValue ?? '-'} µmol/L</p>
      </div>
      <div class="bilirubin-data-row">
        <p class="bilirubin-data-label">${t[lang].summary.biliData.phototherapy}</p>
        <p class="bilirubin-data-value">${photoCutoff}</span></p>
      </div>
      <div class="bilirubin-data-row">
        <p class="bilirubin-data-label">${t[lang].summary.biliData.preExchange}</p>
        <p class="bilirubin-data-value">${preXcCutoff}</span></p>
      </div>
      <div class="bilirubin-data-row">
        <p class="bilirubin-data-label">${t[lang].summary.biliData.exchange}</p>
        <p class="bilirubin-data-value">${xcCutoff}</span></p>
      </div>

      <div class="bilirubin-data-header">
        <p>${t[lang].summary.biliData.comment}</p>
      </div>
      <div class="bilirubin-data-row  bilirubin-data-last-row" style="padding: 16px 12px; color: white; background-color: ${
        latestBili.rowColor
      }">
        <p class="bilirubin-data-label">${latestBili.result}</p>
    </div>
  </div>  
  `;

  // Add to the page
  const patientDetails = document.querySelector('#patientDetailsSummaryTable');
  patientDetails.insertAdjacentHTML('beforeend', patientDetailsHTML);
  const biliData = document.querySelector('#biliDataSummaryTable');
  biliData.insertAdjacentHTML('beforeend', biliDataHTML);

  return true;
};
