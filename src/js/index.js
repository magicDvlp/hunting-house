import House from './house';
// onload
window.addEventListener('load', function() {
  const houseCanvas = document.querySelector('#canvas');
  if (houseCanvas) {
    new House(houseCanvas);
  }
  // loading
  document.documentElement.classList.remove('html-hidden');
});
