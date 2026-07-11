const infobarOpenBtn = document.querySelector('#header-list-icon');
const infobarCloseBtn = document.querySelector('#header-list-close-icon');
const infobar = document.querySelector('.infobar');

infobarOpenBtn.addEventListener('click', () => {
  infobar.classList.add('infobar-active');
  infobarOpenBtn.style.display = 'none';
  infobarCloseBtn.style.display = 'block';
});
infobarCloseBtn.addEventListener('click', () => {
  infobar.classList.remove('infobar-active');
  infobarOpenBtn.style.display = 'block';
  infobarCloseBtn.style.display = 'none';
});
