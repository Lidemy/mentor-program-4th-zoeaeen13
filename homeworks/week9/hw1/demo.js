/* eslint-disable  no-undef */

const windows = document.querySelector('html');

function clearText() {
  if (isLogin === 'false') {
    document.querySelector('.input_section input').value = '';
  }
  document.querySelector('.input_section textarea').value = '';
}


windows.addEventListener('click', (e) => {
  // scroll to top
  if (e.target.closest('div').classList.contains('btn_up')) {
    document.querySelector('header').scrollIntoView();
  }

  // clear text
  if (e.target.classList.contains('btn_clear')) {
    clearText();
  }
});

// User should log in before submitting
windows.addEventListener('submit', (e) => {
  if (isLogin === 'false') {
    e.preventDefault();
    clearText();
    const form = document.querySelector('form');
    if (!form.querySelector('h2')) {
      const warning = document.createElement('h2');
      warning.innerText = '請先登入';
      form.insertBefore(warning, form.querySelector('.input_section'));
    }
  }
});
