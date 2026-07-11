export function calculateAgeInHours(dob, hob, biliData) {
  // Convert dobValue to a new date
  let yearOfBirth = parseInt(dob.substring(0, 4));
  let monthOfBirth = parseInt(dob.substring(5, 7)) - 1;
  let dayOfBirth = parseInt(dob.substring(8, 10));
  let dobDate = new Date(yearOfBirth, monthOfBirth, dayOfBirth, hob);
  dobDate = dobDate.getTime();

  return biliData.map((entry) => {
    if (entry.dot && entry.hot) {
      // Convert test date to a new date
      let yearOfTest = parseInt(entry.dot.substring(0, 4));
      let monthOfTest = parseInt(entry.dot.substring(5, 7)) - 1;
      let dayOfTest = parseInt(entry.dot.substring(8, 10));
      let dot = new Date(yearOfTest, monthOfTest, dayOfTest, entry.hot);
      dot = dot.getTime();

      // Find the difference and return the age in hours
      const delta = dot - dobDate;

      // If the difference is negative, it means the test date is before the birth date, which is invalid. In this case, we can return an empty string or some error value.
      if (delta < 0) {
        return {
          ...entry,
          ageInHours: "",
        };
      }

      // Calculate age in hours
      const ageInHours = Math.round(delta / 1000 / 60 / 60);
      return { ...entry, ageInHours };
    } else {
      return { ...entry };
    }
  });
}
