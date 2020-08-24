const list = document.querySelector('.tasklist');
const btnAddTask = document.querySelector('.btn-add');
const btnConfirm = document.querySelector('.btn-confirm');
const windows = document.querySelector('html');

function toggleBoard() {
  document.querySelector('.addBoard').classList.toggle('hideBoard');
  document.querySelector('.input-group input').value = '';
  document.querySelector('.input-group input + input').value = '';
}


function setTaskNumber() {
  const total = document.querySelectorAll('.list-item').length;
  const finished = document.querySelectorAll('.finished').length;
  document.querySelector('.dashboard h3').innerText = `${finished} of ${total} tasks`;
}

// 新增
function addTask(task, time) {
  const element = document.createElement('div');
  element.classList.add('list-item');
  element.innerHTML = `<div class="checkbox">
    <div class="checkbox-img"></div>
  </div>
  <div class="list-item-content">
    <div class="task-name">${task}</div>
    <div class="task-time">${time}</div>
  </div>
  <div class="btn-delete">
    <img class="btn-delete-img" src="./cross.png">
  </div>`;
  list.appendChild(element);
  setTaskNumber();
  toggleBoard();
}

// 完成
function finishTask(target) {
  const item = target.closest('.list-item');
  item.classList.toggle('finished');
  item.querySelector('.checkbox').classList.toggle('finished-checkbox');
  item.querySelector('.task-name').classList.toggle('finished-task-name');
  setTaskNumber();
}

// 刪除
function deleteTask(target) {
  const item = target.closest('.list-item');
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
  const task = document.querySelector('.input-group input').value;
  if (task !== '') {
    addTask(task, document.querySelector('.input-group input + input').value);
  }
});

// 監聽事件點擊
windows.addEventListener('click', (e) => {
  const eValue = e.target.classList.value;
  if (eValue.includes('btn-delete')) {
    deleteTask(e.target);
  }

  if (eValue.includes('checkbox') || eValue.includes('finished-task-name')) {
    finishTask(e.target);
  }
});
