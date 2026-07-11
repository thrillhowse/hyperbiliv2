const disclaimerDiv = document.querySelector('#disclaimerContainer');
const wizardDiv = document.querySelector('#wizardContainer');
const consentBtn = document.querySelector('#userConsentBtn');

// When page loads, check for consent automatically
document.addEventListener('DOMContentLoaded', () => {
  // Check for consent in session
  if (sessionStorage.getItem('userConsent') === 'true') {
    showWizard();
  } else {
    // Display the consent form
    disclaimerDiv.style.display = 'block';
  }
});

// When consent is given, hide the consent form
consentBtn.addEventListener('click', (event) => {
  event.preventDefault();

  sessionStorage.setItem('userConsent', 'true');

  // Hide the consent form
  disclaimerDiv.style.display = 'none';

  // Show the wizard
  showWizard();
});

function showWizard() {
  // Display the wizard
  wizardDiv.style.display = 'flex';

  // Also make step 1 of the wizard active
  const wizardStep1 = document.getElementById('wizard-step-1');
  setTimeout(() => {
    wizardStep1.classList.add('wizard-step-active');
  }, 200);
}
