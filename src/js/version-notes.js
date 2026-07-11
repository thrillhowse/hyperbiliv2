const versionNotes = document.querySelector('#versionNotes');
const dialog = document.querySelector('dialog');

// Open dialog if user clicks on version notes
versionNotes.addEventListener('click', () => {
  dialog.showModal();
});

// Close dialog if user clicks outside of it
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});
