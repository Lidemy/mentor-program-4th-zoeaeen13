/* eslint-disable no-alert, object-shorthand, no-undef, prefer-destructuring */
let type = 'all';
let myToken;
const todoUrl = 'handle_todolist.php';

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getRandomToken() {
  let str = '';
  for (let i = 0; i < 10; i += 1) {
    const number = 65 + Math.floor(Math.random() * 26);
    str += String.fromCharCode(number);
  }
  return str;
}

function addItem(content, isPrepend) {
  let itemHTML;
  if (content.check) {
    itemHTML = `<div class="todo_item checked">
    <div class="todo_icon">
      <img class="img_icon_check" src="./images/check.png">
    </div>
    <input type="text" value="${escapeHtml(content.todo)}" class="input_finished">
    <div class="todo_icon">
      <img class="img_icon_delete" src="./images/delete.png">
    </div>
    </div>`;
  } else {
    itemHTML = `<div class="todo_item ">
    <div class="todo_icon">
      <img class="img_icon_check" src="./images/uncheck.png">
    </div>
    <input type="text" value="${escapeHtml(content.todo)}">
    <div class="todo_icon">
      <img class="img_icon_delete" src="./images/delete.png">
    </div>
    </div>`;
  }

  if (isPrepend) {
    $('.section_todos').prepend(itemHTML);
  } else {
    $('.section_todos').append(itemHTML);
  }
}

function checkItem(item) {
  if (item.hasClass('checked')) {
    item.removeClass('checked');
    item.find('.img_icon_check').attr('src', './images/uncheck.png');
    item.find('input').removeClass('input_finished');
  } else {
    item.addClass('checked');
    item.find('.img_icon_check').attr('src', './images/check.png');
    item.find('input').addClass('input_finished');
  }
}

function addNewTodo() {
  const str = $('.form_items input').val();
  if (str.length > 0) {
    const newTodo = {
      todo: str,
      check: false,
    };
    addItem(newTodo, true);
    $('.form_items input').val('');
  }
}

function setMode(mode) {
  // default
  if ($('input[name=options]:checked')[0]) {
    type = $('input[name=options]:checked')[0].id;
  }

  if (mode) {
    type = mode;
  }
  switch (type) {
    case 'all':
      $('.todo_item').removeClass('hidden');
      break;
    case 'completed':
      $('.todo_item').addClass('hidden');
      $('.todo_item.checked').removeClass('hidden');
      break;
    case 'incomplete':
      $('.todo_item').removeClass('hidden');
      $('.todo_item.checked').addClass('hidden');
      break;
    default:
      break;
  }
}


function getTodos(tokenName) {
  $.ajax({
    method: 'GET',
    dataType: 'json',
    url: todoUrl,
    data: {
      token: tokenName,
    },
  }).done((resp) => {
    if (!resp.ok) {
      alert(resp.messgae);
      return;
    }
    const todolist = resp.todolist[0];
    const mode = todolist.type;
    const content = JSON.parse(todolist.content);
    for (let i = 0; i < content.length; i += 1) {
      addItem(content[i]);
    }
    setMode(mode);
    $(`#${mode}`).parents('.btn-secondary').addClass('active');
  });
}

function saveTodos(token, content) {
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: todoUrl,
    data: {
      token: token,
      content: content,
      type: $('input[name=options]:checked')[0] ? $('input[name=options]:checked')[0].id : type,
    },
    success: (resp) => {
      if (!resp.ok) {
        alert(resp.messgae);
        return;
      }
      window.localStorage.setItem('token', token);
      alert(`儲存成功！您的 token 代碼是 ${token}`);
    },
    error: () => {
      alert('error!');
    },
  });
}

function initSetting() {
  const urlParams = new URLSearchParams(window.location.search);

  // local storage
  if (window.localStorage.getItem('token')) {
    myToken = window.localStorage.getItem('token');
    getTodos(myToken);
    return;
  }
  // query params
  if (urlParams.has('token')) {
    myToken = urlParams.get('token');
    getTodos(myToken);
    return;
  }

  myToken = getRandomToken();
}


$('document').ready(() => {
  // init
  initSetting();

  // 按鈕新增
  $('.btn-light').click((e) => {
    e.preventDefault();
    addNewTodo();
    setMode();
  });

  // enter 新增
  $('.form_items input').keydown((e) => {
    if (e.which === 13) {
      addNewTodo();
      setMode();
    }
  });

  // 完成與否
  $('.section_todos').on('click', '.img_icon_check', (e) => {
    const item = $(e.target).parents('.todo_item');
    item.find('.img_icon_check').attr('src', './images/check.png');
    checkItem(item);
    setMode();
  });

  // 刪除
  $('.section_todos').on('click', '.img_icon_delete', (e) => {
    const item = $(e.target).parents('.todo_item');
    item.fadeOut(500, () => {
      item.remove();
    });
  });

  // 清空
  $('.btn-danger').click(() => {
    $('.todo_item.checked').remove();
  });


  // 存到 Server
  $('.btn-primary').click(() => {
    const myTodolist = [];
    $('.todo_item').each((i, el) => {
      myTodolist.push({
        todo: $(el).find('input').val(),
        check: $(el).find('input').hasClass('input_finished'),
      });
    });
    saveTodos(myToken, JSON.stringify(myTodolist));
  });

  // 選擇狀態
  $('#all').click(() => {
    setMode();
  });
  $('#completed').click(() => {
    setMode();
  });
  $('#incomplete').click(() => {
    setMode();
  });
});
