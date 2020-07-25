/* eslint-disable  no-use-before-define, no-unused-vars */
// node hw2.js list // 印出前二十本書的 id 與書名
// node hw2.js read 1 // 輸出 id 為 1 的書籍
// node hw2.js delete 1 // 刪除 id 為 1 的書籍
// node hw2.js create "I love coding" // 新增一本名為 I love coding 的書
// node hw2.js update 1 "new name" // 更新 id 為 1 的書名為 new name


const request = require('request');

const process = require('process');

const bookUrl = 'https://lidemy-book-store.herokuapp.com/books';
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
    showBooklist(20);
    break;
  default:
    console.log(`無提供 ${command} 方法`);
}


// 印出前 num 本書
function showBooklist(num) {
  request.get(
    {
      url: bookUrl,
      qs: {
        _limit: num,
      },
    },
    (error, res, body) => {
      const bookData = JSON.parse(body);
      for (let i = 0; i < bookData.length; i += 1) {
        console.log(`${bookData[i].id} ${bookData[i].name}`);
      }
    },
  );
}


// 輸出 id 找書
function getBookInfo(bookId) {
  request(
    `${bookUrl}/${Number(bookId)}`,
    (error, res, body) => {
      if (body === '{}') {
        console.log(`找不到 id 為 ${bookId} 的書籍`);
      } else {
        const bookData = JSON.parse(body);
        console.log(`書籍id: ${bookData.id}, 書名: ${bookData.name}`);
      }
    },
  );
}


// 刪除特定 id 的書
function deleteBook(bookId) {
  request.del(
    `${bookUrl}/${Number(bookId)}`,
    (error, res, body) => {
      if (error === null) {
        console.log(`已刪除 id 是 ${bookId} 的書籍`);
      }
    },
  );
}


// 新增書籍
function addBook(bookName) {
  request.post(
    {
      url: bookUrl,
      form: {
        name: bookName,
      },
    },
    (error, res, body) => {
      const bookData = JSON.parse(body);
      console.log(`新增 id 是 ${bookData.id}，書名為「 ${bookData.name}」`);
    },
  );
}


// 修改書名
function updateBookName(bookId, bookName) {
  request.patch(
    {
      url: `${bookUrl}/${Number(bookId)}`,
      form: {
        name: bookName,
      },
    },
    (error, res, body) => {
      const bookData = JSON.parse(body);
      console.log(`修改 id 是 ${bookData.id} 的書名為「${bookData.name}」`);
    },
  );
}
