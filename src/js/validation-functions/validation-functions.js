/**
 *
 * @param {string} element - html element
 * @param {date} value - input value (from user) in form of a date
 * @returns Boolean - true if date input is valid based on defined constraints, false otherwise
 */
export const validateDateInput = (element, value) => {
  // define a regex to ensure date is submitted as YYYY-MM-DD
  // c/o https://webrewrite.com/validate-date-format-yyyymmdd-javascript/ and https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy
  let validDatePattern =
    /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

  if (value === '' || value.match(validDatePattern) === null) {
    element.classList.add('input-error');
    return false;
  }

  element.classList.remove('input-error');
  return true;
};

/**
 *
 * @param {string} element - html element
 * @param {date} dob - input value (from user) for date of birth
 * @returns Boolean - true if date input is valid based on defined constraints, false otherwise
 */
export const validateDOB = (element, dob) => {
  // define a regex to ensure date is submitted as YYYY-MM-DD
  // c/o https://webrewrite.com/validate-date-format-yyyymmdd-javascript/ and https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy
  let validDatePattern =
    /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

  if (dob === '' || dob.match(validDatePattern) === null) {
    element.classList.add('input-error');
    return false;
  }

  // Also consider the instance where the dob is in the future
  // Get current date
  let todaysDate = new Date();
  todaysDate = todaysDate.getTime();
  // Convert dob to a new date
  let yearOfBirth = parseInt(dob.substring(0, 4));
  let monthOfBirth = parseInt(dob.substring(5, 7)) - 1;
  let dayOfBirth = parseInt(dob.substring(8, 10));
  let dobValue = new Date(yearOfBirth, monthOfBirth, dayOfBirth);
  dobValue = dobValue.getTime();
  if (dobValue > todaysDate) {
    element.classList.add('input-error');
    return false;
  }

  element.classList.remove('input-error');
  return true;
};

/**
 *
 * @param {string} element - html element
 * @param {number} value - input value (from user) in form of hour (24H)
 * @returns Boolean - true if date input is valid based on defined constraints, false otherwise
 */
export const validateHourInput = (element, hour) => {
  let value = parseInt(hour);

  // If user chooses null option then value is NaN
  // and so want to return false to erase the age in hours (if calculated already)
  if (isNaN(value)) {
    return false;
  }

  if (value && (value < 0 || value > 23)) {
    element.classList.add('input-error');
    return false;
  }

  element.classList.remove('input-error');
  return true;
};

/**
 *
 * @param {string} element - html element
 * @param {number} hob - input value (from user) for hour of birth
 * @returns Boolean - true if date input is valid based on defined constraints, false otherwise
 */
export const validateHOB = (element, hob) => {
  let value = parseInt(hob);

  // If user chooses null option then value is NaN
  // and so want to return false to erase the age in hours (if calculated already)
  if (isNaN(value)) {
    return false;
  }

  if (value && (value < 0 || value > 23)) {
    element.classList.add('input-error');
    return false;
  }

  element.classList.remove('input-error');
  return true;
};

/**
 *
 * @param {string} element - html element
 * @param {number} gestAge - input value (from user) for gestational age
 * @returns Boolean - true if date input is valid based on defined constraints, false otherwise
 */
export const validateGA = (element, ga) => {
  let value = parseInt(ga);

  // If user chooses null option then value is NaN
  // and so want to return false to erase the age in hours (if calculated already)
  if (isNaN(value)) {
    return false;
  }

  if (value && (value < 35 || value > 40)) {
    element.classList.add('input-error');
    return false;
  }

  element.classList.remove('input-error');
  return true;
};

/**
 *
 * @param {string} element - html element
 * @param {number} bili - input value (from user) for either TcB or TSB
 * @returns Boolean - true if date input is valid based on defined constraints, false otherwise
 */
export const validateBili = (element, bili) => {
  let value = parseInt(bili);

  if (value && (value < 0 || value > 1000)) {
    element.classList.add('input-error');
    return false;
  }

  element.classList.remove('input-error');
  return true;
};

/**
 *
 * @param {string} element - html element
 * @param {number} ageInHours - input value (from user) for ageInHours
 * @returns Boolean - true if date input is valid based on defined constraints, false otherwise
 */
export const validateAgeInHours = (element, ageInHours) => {
  let value = parseInt(ageInHours);

  // If user chooses null option then value is NaN
  // and so want to return false to erase the age in hours (if calculated already)
  if (isNaN(value)) {
    return false;
  }

  if (value && value < 0) {
    element.classList.add('input-error');
    return false;
  }

  element.classList.remove('input-error');
  return true;
};
