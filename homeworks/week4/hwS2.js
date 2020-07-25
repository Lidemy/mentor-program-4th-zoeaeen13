/* eslint-disable  no-use-before-define, no-unused-vars */
const https = require('https');

const querystring = require('querystring');

const process = require('process');

const baseURL = 'lidemy-book-store.herokuapp.com';
const command = process.argv[2];

switch (command) {
  case 'read':
    getBookInfo(process.argv[3]);
    break;
  case 'delete':
    deleteBook(process.argv[3]);
    break;
  case 'create':
    addBook(process.argv[3]);
    break;
  case 'update':
    updateBookName(process.argv[3], process.argv[4]);
    break;
  case 'list':
    showBooklist();
    break;
  default:
    console.log(`無提供 ${command} 方法`);
}


// 印出前二十本書
function showBooklist() {
  const options = {
    hostname: baseURL,
    path: '/books?_limit=20',
    method: 'GET',
  };

  const req = https.request(options, (res) => {
    res.on('data', (d) => {
      const bookData = JSON.parse(d);
      for (let i = 0; i < bookData.length; i += 1) {
        console.log(`${bookData[i].id} ${bookData[i].name}`);
      }
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
}


// 輸出 id 找書
function getBookInfo(bookId) {
  const options = {
    hostname: baseURL,
    path: `/books/${Number(bookId)}`,
    method: 'GET',
  };

  const req = https.request(options, (res) => {
    res.on('data', (d) => {
      const bookData = JSON.parse(d);
      if (bookData.id === undefined) {
        console.log(`找不到 id 為 ${bookId} 的書籍`);
      } else {
        console.log(`書籍ID: ${bookData.id}, 書名: ${bookData.name}`);
      }
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
}


// 刪除特定 id 的書
function deleteBook(bookId) {
  const options = {
    hostname: baseURL,
    path: `/books/${Number(bookId)}`,
    method: 'DELETE',
  };

  const req = https.request(options, (res) => {
    res.on('data', (d) => {
      const body = JSON.parse(d);
      if (body.id === undefined) {
        console.log(`已刪除 id 是 ${bookId} 的書籍`);
      }
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
}


// 新增書籍
function addBook(bookName) {
  const postData = querystring.stringify({
    name: bookName,
  });

  const options = {
    hostname: baseURL,
    path: '/books',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length,
    },
  };

  const req = https.request(options, (res) => {
    res.on('data', (d) => {
      const bookData = JSON.parse(d);
      console.log(`新增 id 是 ${bookData.id}，書名為「 ${bookData.name}」`);
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });
  req.write(postData);
  req.end();
}

// 修改書名
function updateBookName(bookId, bookName) {
  const postData = querystring.stringify({
    name: bookName,
  });

  const options = {
    hostname: baseURL,
    path: `/books/${Number(bookId)}`,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length,
    },
  };

  const req = https.request(options, (res) => {
    res.on('data', (d) => {
      const bookData = JSON.parse(d);
      console.log(`修改 id 是 ${bookData.id} 的書名為「${bookData.name}」`);
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });
  req.write(postData);
  req.end();
}
