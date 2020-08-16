const list = document.querySelector('.taskList');
const btnAddTask = document.querySelector('.btnAddTask');
const btnConfirm = document.querySelector('.btnConfirm');
const windows = document.querySelector('html');

function toggleBoard() {
  document.querySelector('.addTaskBoard').classList.toggle('hideBoard');
  document.querySelector('.inputGroup input').value = '';
  document.querySelector('.inputGroup input + input').value = '';
}


function setTaskNumber() {
  const total = document.querySelectorAll('.listItem').length;
  const finished = document.querySelectorAll('.finished').length;
  document.querySelector('.boardTitle h3').innerText = `${finished} of ${total} tasks`;
}

// 新增
function addTask(task, time) {
  const element = document.createElement('div');
  element.classList.add('listItem');
  element.innerHTML = `<div class="checkobx">
    <div class="checkbox-img"></div>
  </div>
  <div class="listItem-content">
    <div class="taskName">${task}</div>
    <div class="taskTime">${time}</div>
  </div>
  <div class="btnDelete">
    <img class="btnDelete-img" src="/cross.png">
  </div>`;
  list.appendChild(element);
  setTaskNumber();
  toggleBoard();
}

// 完成
function finishTask(target) {
  const item = target.closest('.listItem');
  item.classList.toggle('finished');
  item.querySelector('.checkobx').classList.toggle('finished-checkbox');
  item.querySelector('.taskName').classList.toggle('finished-taskName');
  setTaskNumber();
}

// 刪除
function deleteTask(target) {
  const item = target.closest('.listItem');
  list.removeChild(item);
  setTaskNumber();
}

setTaskNumber();

// 開啟新增頁面
btnAddTask.addEventListener('click', () => {
  toggleBoard();
});

// 確認新增待辦
btnConfirm.addEventListener('click', () => {
  const task = document.querySelector('.inputGroup input').value;
  if (task !== '') {
    addTask(task, document.querySelector('.inputGroup input + input').value);
  }
});

// 監聽事件點擊
windows.addEventListener('click', (e) => {
  const eValue = e.target.classList.value;
  if (eValue.includes('btnDelete')) {
    deleteTask(e.target);
  }

  if (eValue.includes('checkbox') || eValue.includes('finished-taskName')) {
    finishTask(e.target);
  }
});
