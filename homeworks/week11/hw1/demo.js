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

  // edit username
  if (e.target.classList.contains('img_edit_nickname')) {
    document.querySelector('.input_section_user').classList.add('hidden');
    document.querySelector('.input_section_user_edit').classList.remove('hidden');
  }
  if (e.target.classList.contains('btn_unchange_nickname')) {
    document.querySelector('.input_section_user').classList.remove('hidden');
    document.querySelector('.input_section_user_edit').classList.add('hidden');
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

windows.addEventListener('change', (e) => {
  const selector = e.target;
  if (selector.selectedIndex === 1) {
    selector.closest('div').querySelector('.restricted_right').classList.remove('hidden');
  } else {
    selector.closest('div').querySelector('.restricted_right').classList.add('hidden');
  }

  if (selector.selectedIndex === 2 || selector.selectedIndex === 3) {
    selector.closest('.user_item').querySelector('.admin_edit_right').classList.remove('invisible');
    selector.closest('.user_item').querySelector('.admin_delete_right').classList.remove('invisible');
  } else {
    selector.closest('.user_item').querySelector('.admin_edit_right').classList.add('invisible');
    selector.closest('.user_item').querySelector('.admin_delete_right').classList.add('invisible');
  }
});
