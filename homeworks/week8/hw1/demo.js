/* eslint-disable no-alert,   prefer-destructuring */

const request = new XMLHttpRequest();
const url = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';
const lottery = document.querySelector('.lottery');
const resultTitle = document.querySelector('.resultboard h1');
const dashboard = document.querySelector('.dashboard');
const resultboard = document.querySelector('.resultboard');
const loading = document.querySelector('.loading');
const errMsg = '系統不穩定，請再試一次';

// hide dashboard
function hideDashboard() {
  dashboard.classList.add('hidden');
  resultboard.classList.remove('hidden');
}

// set custom view
function customView(title, imageLink) {
  resultTitle.innerText = title;
  lottery.style.background = `url(${imageLink})`;
  lottery.style.backgroundSize = 'cover';
  resultTitle.style.color = '#FFFFFF';
  hideDashboard();
}

// call API
function getLuckyDraw(callback) {
  request.open('GET', url, true);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      let data;
      try {
        data = JSON.parse(request.responseText);
      } catch (error) {
        callback(errMsg);
        return;
      }
      if (!data.prize) {
        callback(errMsg);
        return;
      }
      callback(null, data);
    } else {
      callback(errMsg);
    }
  };

  request.onError = () => {
    callback(errMsg);
  };

  request.send();
}

// click button
lottery.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-lottery')) {
    loading.classList.remove('hidden');
    getLuckyDraw((error, data) => {
      loading.classList.add('hidden');
      if (error) {
        alert(error);
        return;
      }

      switch (data.prize) {
        case 'FIRST':
          customView('恭喜你中頭獎了！日本東京來回雙人遊！', './first.jpg');
          break;
        case 'SECOND':
          customView('二獎！90 吋電視一台！', './second.jpg');
          break;
        case 'THIRD':
          customView('恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！', './third.jpg');
          break;
        default:
          lottery.style.background = '#000000';
          resultTitle.style.color = '#FFFFFF';
          resultTitle.innerText = '銘謝惠顧';
          hideDashboard();
          break;
      }
    });
  }
});
