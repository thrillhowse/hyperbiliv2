export const checkIfLatestBili = (biliDataForThisRow) => {
  // Create an array with all the ages in hours
  const ageInHoursInputs = document.querySelectorAll('.age-in-hours-input');
  const ageInHours = [];
  ageInHoursInputs.forEach((input) => {
    ageInHours.push(input.value);
  });

  // Then sort this array based on 'ageInHours'
  ageInHours.sort((a, b) => {
    return a - b;
  });
  // Define the latest age
  const latestAge = ageInHours[ageInHours.length - 1];

  // Now compare the current bili data age to the last value in this array
  if (biliDataForThisRow.ageInHours === parseInt(latestAge)) {
    return true;
  }
  // If not latest bili then return false
  return false;
};
