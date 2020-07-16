// 列出前十本書籍的 id 以及書名
const request = require('request');

request.get(
  {
    url: 'https://lidemy-book-store.herokuapp.com/books',
    qs: {
      _limit: '10',
    },
  },
  (error, response, body) => {
    const bookData = JSON.parse(body);
    for (let i = 0; i < bookData.length; i += 1) {
      console.log(`${bookData[i].id} ${bookData[i].name}`);
    }
  },
);
