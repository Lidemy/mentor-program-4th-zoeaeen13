const list = document.querySelector('.tasklist');
const btnAddTask = document.querySelector('.btn-add');
const btnConfirm = document.querySelector('.btn-confirm');
const windows = document.querySelector('html');

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function toggleBoard() {
  document.querySelector('.add-board').classList.toggle('hide-board');
  document.querySelector('.input-group input').value = '';
  document.querySelector('.input-group input + input').value = '';
}


function setTaskNum() {
  const total = document.querySelectorAll('.list-item').length;
  const finished = document.querySelectorAll('.finished').length;
  document.querySelector('.dashboard h3').innerText = `${finished} of ${total} tasks`;
}

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
  setTaskNum();
  toggleBoard();
}

function finishTask(target) {
  const item = target.closest('.list-item');
  item.classList.toggle('finished');
  item.querySelector('.checkbox').classList.toggle('finished-checkbox');
  item.querySelector('.task-name').classList.toggle('finished-task-name');
  setTaskNum();
}

function deleteTask(target) {
  const item = target.closest('.list-item');
  list.removeChild(item);
  setTaskNum();
}

// update list item num
setTaskNum();

// to open new board
btnAddTask.addEventListener('click', () => {
  toggleBoard();
});

// click confirm button
btnConfirm.addEventListener('click', () => {
  const task = escapeHtml(document.querySelector('.input-group input').value);
  if (task !== '') {
    addTask(task, document.querySelector('.input-group input + input').value);
  }
});

// event listener
windows.addEventListener('click', (e) => {
  const eValue = e.target.classList.value;
  // click delete buttons
  if (eValue.includes('btn-delete')) {
    deleteTask(e.target);
  }

  // click checkbox
  if (eValue.includes('checkbox') || eValue.includes('finished-task-name')) {
    finishTask(e.target);
  }
});
