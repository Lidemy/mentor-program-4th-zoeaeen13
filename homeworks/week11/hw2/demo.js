/* eslint-disable no-restricted-globals, prefer-destructuring */

const windows = document.querySelector('html');

// event listener
windows.addEventListener('click', (e) => {
  const eValue = e.target.classList.value;
  if (eValue.includes('article_banner') || eValue.includes('article_title')) {
    const href = e.target.closest('article').querySelector('a').href;
    location.href = `${href}`;
  }

  if (eValue.includes('section_banner_img')) {
    location.href = 'index.php';
  }
});

// upload cover image
const btnChooseCover = document.querySelector('.input_cover');
const container = document.querySelector('.container_cover');
btnChooseCover.addEventListener('change', () => {
  const file = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    container.style.background = `url(${reader.result})`;
    container.style.backgroundSize = 'cover';
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    container.style.background = '#626262';
  }
});
