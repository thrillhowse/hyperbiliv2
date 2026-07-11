import { graphBili } from '../graph-bili.js';
import { patient } from '../startup.js';
import { submitData } from '../submit-data.js';
import { addCopyPrintBtns } from '../add-copy-print-btns.js';

// Validate all data is present when user clicks Enter Bili Data btn or Bili Data wizard step

const wizardStep1 = document.querySelector('#wizard-step-1');
const wizardStep2 = document.querySelector('#wizard-step-2');
const wizardStep3 = document.querySelector('#wizard-step-3');
const goToBiliDataBtn = document.querySelector('#goToBiliDataBtn');
const ptDataErrorMsg = document.querySelector('#ptDataErrorMsg');
const goToSummaryBtn = document.querySelector('#goToSummaryBtn');
const goToPatientDetailsBtn = document.querySelector('#goToPatientDetails');
const goBackToBiliDataBtn = document.querySelector('#goBackToBiliDataBtn');
const biliDataErrorMsg = document.querySelector('#biliDataErrorMsg');
const summaryErrorDialog = document.querySelector('#summaryErrorDialog');
const updatesContainer = document.querySelector('.updates-container'); // contains updates to the site

const patientDataContainer = document.querySelector(
  '#patient-details-container'
);
const biliDataContainer = document.querySelector('#bili-data-container');
const summaryContainer = document.querySelector('#summary-container');

// Clicking on Wizard Step 1 (Patient Details)
wizardStep1.addEventListener('click', (event) => {
  event.preventDefault();

  // If Patient Details already showing do nothing
  if (!patientDataContainer.classList.contains('container-hidden')) {
    return;
  }

  // If Bili Data is showing
  if (!biliDataContainer.classList.contains('container-hidden')) {
    goBackToPatientDetailsFromBiliData();
  }

  // If summary is showing
  if (!summaryContainer.classList.contains('container-hidden')) {
    goBackToPatientDetailsFromSummary();
  }
});

// Clicking on Wizard Step 2 (Bili Data)
wizardStep2.addEventListener('click', (event) => {
  event.preventDefault();

  // If Bili Data already showing do nothing
  if (!biliDataContainer.classList.contains('container-hidden')) {
    return;
  }

  // If Patient Details is showing
  if (!patientDataContainer.classList.contains('container-hidden')) {
    advanceToBiliDataFromPatientDetails();
  }

  // If Summary is showing
  if (!summaryContainer.classList.contains('container-hidden')) {
    advanceToBiliDataFromSummary();
  }
});

// Clicking on Wizard Step 3 (Summary)
wizardStep3.addEventListener('click', (event) => {
  event.preventDefault();

  if (!summaryContainer.classList.contains('container-hidden')) {
    return;
  }

  // Will check which container is showing within the advanceToSummary function
  advanceToSummary();
});

// Clicking on Enter Bili Data Btn
goToBiliDataBtn.addEventListener('click', (event) => {
  event.preventDefault();
  advanceToBiliDataFromPatientDetails();
});

// Clicking on Submit Btn
goToSummaryBtn.addEventListener('click', (event) => {
  event.preventDefault();
  advanceToSummary();
});

// Advance to Bili Data container from Patient Details container
// check if all data present before advancing
function advanceToBiliDataFromPatientDetails() {
  ptDataErrorMsg.classList.remove('show-error-msg');

  let allRequiredDataPresent = Object.entries(patient).every(([key, value]) => {
    // console.log(key);

    // Note: as of mid-April 2025, allow the date of birth and hour of birth to be empty (thanks Ryan Smith for tip)
    if (key === 'dob' || key === 'hob') return true;

    if (!value || value === undefined || value === '' || value === null) {
      ptDataErrorMsg.textContent =
        'Please ensure all necessary patient data is provided. Note: date of birth and hour of birth are optional if you know the age in hours that the test was done';
      ptDataErrorMsg.classList.add('show-error-msg');
      return false; // Stop checking further
    }
    return true;
  });

  // If all data is present and valid (know its valid if it exists in the patient object)
  if (allRequiredDataPresent) {
    // Hide Updates container
    updatesContainer.style.display = 'none';

    // Advance to the bili data section
    patientDataContainer.classList.add('container-hidden');
    biliDataContainer.classList.remove('container-hidden');
    summaryContainer.classList.add('container-hidden');

    // Also make step 1 of the wizard active (full)
    // and step 2 active
    wizardStep1.classList.add('wizard-step-active-full');
    setTimeout(() => {
      wizardStep2.classList.add('wizard-step-active');
    }, 100);
  }
}

// Advance to Bili Data container from Summary container
function advanceToBiliDataFromSummary() {
  ptDataErrorMsg.classList.remove('show-error-msg');

  // Advance to the bili data section
  patientDataContainer.classList.add('container-hidden');
  biliDataContainer.classList.remove('container-hidden');
  summaryContainer.classList.add('container-hidden');

  wizardStep3.classList.remove('wizard-step-active');
  setTimeout(() => {
    wizardStep2.classList.remove('wizard-step-active-full');
  }, 300); // 300msec is slightly shorter than the bg transition (defined in the wizard.css file)
}

// Go Back to Patient Data from Bili Data
goToPatientDetailsBtn.addEventListener('click', (event) => {
  event.preventDefault();
  goBackToPatientDetailsFromBiliData();
});

// Go Back to Patient Data from Bili Data
function goBackToPatientDetailsFromBiliData() {
  // Advance to the Patient Details section
  patientDataContainer.classList.remove('container-hidden');
  biliDataContainer.classList.add('container-hidden');
  summaryContainer.classList.add('container-hidden');

  wizardStep2.classList.remove('wizard-step-active');
  setTimeout(() => {
    wizardStep1.classList.remove('wizard-step-active-full');
  }, 300); // 300msec is slightly shorter than the bg transition (defined in the wizard.css file)
}

// Advance to Summary container
// check if all data present before advancing
export let summaryReady;
async function advanceToSummary() {
  summaryReady = await submitData();

  if (!summaryReady) {
    summaryErrorDialog.showModal();
    return;
  }

  ptDataErrorMsg.classList.remove('show-error-msg');
  biliDataErrorMsg.classList.remove('show-error-msg');

  // Update the progress bar
  // If going to Summary from Patient Details
  if (!patientDataContainer.classList.contains('container-hidden')) {
    wizardStep1.classList.add('wizard-step-active-full');
    setTimeout(() => {
      wizardStep2.classList.add('wizard-step-active');
      setTimeout(() => {
        wizardStep2.classList.add('wizard-step-active-full');
        setTimeout(() => {
          wizardStep3.classList.add('wizard-step-active');
        }, 200);
      }, 150);
    }, 100);
  }

  // If going to Summary from Bili Data
  if (!biliDataContainer.classList.contains('container-hidden')) {
    wizardStep2.classList.add('wizard-step-active-full');
    setTimeout(() => {
      wizardStep3.classList.add('wizard-step-active');
    }, 100);
  }

  // Since all data is present and valid can advance to the Summary container
  patientDataContainer.classList.add('container-hidden');
  biliDataContainer.classList.add('container-hidden');
  summaryContainer.classList.remove('container-hidden');

  // Graph the bili data (once the summary page is actually showing)
  graphBili(summaryReady);

  // Add the copy/print btns
  addCopyPrintBtns(summaryReady);
}

// Go Back to Patient Data from Summary
function goBackToPatientDetailsFromSummary() {
  // Advance to the Patient Details section
  patientDataContainer.classList.remove('container-hidden');
  biliDataContainer.classList.add('container-hidden');
  summaryContainer.classList.add('container-hidden');

  // Update the progress bar
  wizardStep3.classList.remove('wizard-step-active');
  setTimeout(() => {
    wizardStep2.classList.remove('wizard-step-active-full');
    setTimeout(() => {
      wizardStep2.classList.remove('wizard-step-active');
      setTimeout(() => {
        wizardStep1.classList.remove('wizard-step-active-full');
      }, 350);
    }, 250);
  }, 200);
}

// Go Back to Bili Data from Summary
goBackToBiliDataBtn.addEventListener('click', (event) => {
  event.preventDefault();
  advanceToBiliDataFromSummary();
});

// Close the summary error dialog
document
  .querySelector('#closeSummaryErrorDialogBtn')
  .addEventListener('click', () => {
    summaryErrorDialog.close();
  });
