// Need to check that required data is present in each row including:
//    - age in hours (if not then will need date/time of birth and date/time of test)
//    - ga at birth
//    - risk factors (neurotoxicity)
//    - current phototherapy
//    - previous phototherapy
//    - tcb (or tsb) for every row

const ptDataErrorMsg = document.querySelector('#ptDataErrorMsg');
const biliDataErrorMsg = document.querySelector('#biliDataErrorMsg');

export const checkForRequiredData = () => {
  let confirmedBirthDatesAndTimes = true;
  let confirmedTestDatesAndTimes = true;
  const biliDataRows = document.querySelectorAll('.bili-data-row');

  // Start with the age in hours (as this will trigger the date/hour of birth first which makes sense with the flow of the page)
  for (let i = 1; i <= biliDataRows.length; i++) {
    // Age in Hours
    let ageInHours = document.querySelector(`#ageInHours${i}`).value;
    if (!ageInHours) {
      // Check whether date/time of birth are present
      let confirmedBirthDatesAndTimes = checkForBirthDatesAndTimes();
      if (!confirmedBirthDatesAndTimes) {
        return false;
      }
    }
  }

  const gestAge = document.querySelector('#gestAge');
  if (!gestAge.value || gestAge.classList.contains('input-error')) {
    showErrorMsg('gestAge');
    return false;
  }

  const riskFactors = document.querySelectorAll('input[name="riskFactors"]');
  let riskFactorChecked = false;
  riskFactors.forEach((rf) => {
    if (rf.checked) {
      riskFactorChecked = true;
    }
  });
  if (!riskFactorChecked) {
    showErrorMsg('riskFactors');
    return false;
  }

  const currentPhototherapy = document.querySelectorAll(
    'input[name="currentPhototherapy"]'
  );
  let currentPhotoChecked = false;
  currentPhototherapy.forEach((btn) => {
    if (btn.checked) {
      currentPhotoChecked = true;
    }
  });
  if (!currentPhotoChecked) {
    showErrorMsg('currentPhototherapy');
    return false;
  }

  const previousPhototherapy = document.querySelectorAll(
    'input[name="previousPhototherapy"]'
  );
  let previousPhotoChecked = false;
  previousPhototherapy.forEach((btn) => {
    if (btn.checked) {
      previousPhotoChecked = true;
    }
  });
  if (!previousPhotoChecked) {
    showErrorMsg('previousPhototherapy');
    return false;
  }

  // Now check if any ageInHours are missing due to missing due to missing date/times of the tests
  for (let i = 1; i <= biliDataRows.length; i++) {
    let ageInHours = document.querySelector(`#ageInHours${i}`).value;
    if (!ageInHours) {
      // Check whether date/time of test are present
      let confirmedTestDatesAndTimes = checkForTestDatesAndTimes(i);
      if (!confirmedTestDatesAndTimes) {
        return false;
      }
    }
  }

  // Now check if any ageInHours are missing despite dates/times of birth and tests all being present
  if (confirmedBirthDatesAndTimes && confirmedTestDatesAndTimes) {
    for (let i = 1; i <= biliDataRows.length; i++) {
      let ageInHours = document.querySelector(`#ageInHours${i}`);
      if (!ageInHours.value || ageInHours.classList.contains('input-error')) {
        showErrorMsg('ageInHours');
        return false;
      }
    }
  }

  // Finally check the bili data
  for (let i = 1; i <= biliDataRows.length; i++) {
    // TcB or TSB
    let tcb = document.querySelector(`#tcb${i}`);
    let tsb = document.querySelector(`#tsb${i}`);
    if (!tcb.value && !tsb.value) {
      showErrorMsg('biliData');
      return false;
    }
    if (
      tcb.classList.contains('input-error') ||
      tsb.classList.contains('input-error')
    ) {
      showErrorMsg('biliDataError');
      return false;
    }
  }

  return true;
};

const checkForBirthDatesAndTimes = () => {
  // Check for date of birth
  const dobValue = document.querySelector('#dob').value;
  if (!dobValue) {
    showErrorMsg('dob');
    return false;
  }

  // Check for hour of birth
  const hobValue = document.querySelector('#hob').value;
  if (!hobValue) {
    showErrorMsg('hob');
    return false;
  }

  return true;
};

const checkForTestDatesAndTimes = (i) => {
  // Check the date of test for row i
  const dotValue = document.querySelector(`#dot${i}`).value;
  if (!dotValue) {
    showErrorMsg('dot');
    return false;
  }

  // Check the date of test for row i
  const hot = document.querySelector(`#hot${i}`);
  if (!hot.value || hot.classList.contains('input-error')) {
    showErrorMsg('hot');
    return false;
  }

  return true;
};

export const showErrorMsg = (missingData) => {
  // Update error msg based on missingData

  // Patient details
  if (missingData === 'dob') {
    ptDataErrorMsg.classList.add('show-error-msg');
    ptDataErrorMsg.textContent =
      'Please enter/correct the date of birth or ensure the age in hours for the test has been entered';
    biliDataErrorMsg.classList.add('show-error-msg');
    biliDataErrorMsg.textContent =
      'Please enter/correct the date of birth or ensure the age in hours for the test has been entered';
  }
  if (missingData === 'hob') {
    ptDataErrorMsg.classList.add('show-error-msg');
    ptDataErrorMsg.textContent =
      'Please enter/correct the hour of birth or ensure the age in hours for the test has been entered';
    biliDataErrorMsg.classList.add('show-error-msg');
    biliDataErrorMsg.textContent =
      'Please enter/correct the hour of birth or ensure the age in hours for the test has been entered';
  }
  if (missingData === 'gestAge') {
    ptDataErrorMsg.classList.add('show-error-msg');
    ptDataErrorMsg.textContent =
      'Please enter/correct the gestational age at birth';
  }
  if (missingData === 'riskFactors') {
    ptDataErrorMsg.classList.add('show-error-msg');
    ptDataErrorMsg.textContent = 'Please enter any risk factors';
  }
  if (missingData === 'currentPhototherapy') {
    ptDataErrorMsg.classList.add('show-error-msg');
    ptDataErrorMsg.textContent =
      'Please enter whether the patient is currently on phototherapy';
  }
  if (missingData === 'previousPhototherapy') {
    ptDataErrorMsg.classList.add('show-error-msg');
    ptDataErrorMsg.textContent =
      'Please enter whether the patient has required phototherapy to date';
  }

  // Bili Data
  if (missingData === 'dot') {
    biliDataErrorMsg.classList.add('show-error-msg');
    biliDataErrorMsg.textContent =
      'Please enter/correct the date of test or enter the age in hours for each bilirubin value';
  }
  if (missingData === 'hot') {
    biliDataErrorMsg.classList.add('show-error-msg');
    biliDataErrorMsg.textContent =
      'Please enter/correct the hour of test or enter the age in hours for each bilirubin value';
  }
  if (missingData === 'ageInHours') {
    biliDataErrorMsg.classList.add('show-error-msg');
    biliDataErrorMsg.textContent =
      'Please enter/correct the age in hours for each test';
  }
  if (missingData === 'biliData') {
    biliDataErrorMsg.classList.add('show-error-msg');
    biliDataErrorMsg.textContent =
      'Please enter either a TcB or TSB for each test';
  }
  if (missingData === 'biliDataError') {
    biliDataErrorMsg.classList.add('show-error-msg');
    biliDataErrorMsg.textContent =
      'Please correct any errors in the TcB or TSB data';
  }
};

export const hideErrorMsg = () => {
  ptDataErrorMsg.classList.remove('show-error-msg');
  ptDataErrorMsg.textContent = '';
  biliDataErrorMsg.classList.remove('show-error-msg');
  biliDataErrorMsg.textContent = '';
};
