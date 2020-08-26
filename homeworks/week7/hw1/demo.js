/* eslint-disable no-alert,  no-unused-vars */
const requireArr = ['resource', 'phone', 'email', 'nickname'];

// check radio button
function checkRadio() {
  if (document.querySelectorAll('#signup input[type="radio"]:checked').length === 0) {
    document.querySelector('#signup').scrollIntoView();
    document.querySelector('#signup p').classList.remove('hidden');
    return false;
  }
  document.querySelector('#signup p').classList.add('hidden');
  return true;
}

// check input text
function checkEmpty(str) {
  if (document.querySelector(`#${str} input`).value === '') {
    document.querySelector(`#${str}`).scrollIntoView();
    document.querySelector(`#${str} p`).classList.remove('hidden');
    return false;
  }
  document.querySelector(`#${str} p`).classList.add('hidden');
  return true;
}

// before submit
document.querySelector('form').addEventListener('submit', (e) => {
  let isFinished = true;
  if (!checkRadio('signup')) {
    isFinished = false;
  }

  for (let i = 0; i < requireArr.length; i += 1) {
    if (!checkEmpty(requireArr[i])) {
      isFinished = false;
    }
  }

  // chekc if every [input] is finished
  if (!isFinished) {
    e.preventDefault();
    return;
  }

  alert(`您好，報名資料如下：
    暱稱： ${document.forms.procrastination.nickname.value}
    電子郵件： ${document.forms.procrastination.email.value}
    手機號碼： ${document.forms.procrastination.phone.value}
    活動消息來源： ${document.forms.procrastination.resource.value}
    其他建議： ${document.forms.procrastination.advice.value}
  `);
});
