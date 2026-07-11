export const addPrintBtnEL = () => {
  const printBtn = document.querySelector('#print-bili-data');
  printBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.print();
  });
};
