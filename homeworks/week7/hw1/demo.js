/* eslint-disable no-alert,  no-unused-vars */

// 檢查Radio Button
function checkRadio() {
  if (document.querySelectorAll('#signup input[type="radio"]:checked').length === 0) {
    document.querySelector('#signup').scrollIntoView();
    document.querySelector('#signup p').style.visibility = 'visible';
    return false;
  }

  document.querySelector('#signup p').style.visibility = 'hidden';
  return true;
}

// 檢查空值
function checkEmpty(str) {
  if (document.querySelector(`#${str} input`).value === '') {
    document.querySelector(`#${str}`).scrollIntoView();
    document.querySelector(`#${str} p`).style.visibility = 'visible';
    return false;
  }

  document.querySelector(`#${str} p`).style.visibility = 'hidden';
  return true;
}

// 送出按鈕的監聽
const btnSubmit = document.querySelector('.btn-submit');
btnSubmit.addEventListener('click', () => {
  checkEmpty('resource');
  checkRadio('signup');
  checkEmpty('phone');
  checkEmpty('email');
  checkEmpty('nickname');
});

// alert提醒確認
function showResult() {
  if (!checkEmpty('nickname')) {
    return false;
  }

  if (!checkEmpty('email')) {
    return false;
  }

  if (!checkEmpty('phone')) {
    return false;
  }

  if (!checkRadio('signup')) {
    return false;
  }

  if (!checkEmpty('resource')) {
    return false;
  }

  alert(`您好，報名資料如下：
    暱稱： ${document.forms.procrastination.nickname.value}
    電子郵件： ${document.forms.procrastination.email.value}
    手機號碼： ${document.forms.procrastination.phone.value}
    活動消息來源： ${document.forms.procrastination.resource.value}
    其他建議： ${document.forms.procrastination.advice.value}`);

  return true;
}


// 輸入框失去焦點，檢查空值
function focusOut(str) {
  document.querySelector(`#${str} input`).addEventListener('blur', () => {
    checkEmpty(str);
  });
}

focusOut('resource');
focusOut('phone');
focusOut('email');
focusOut('nickname');
document.querySelector('.radio-group').addEventListener('blur', () => {
  checkRadio();
});
