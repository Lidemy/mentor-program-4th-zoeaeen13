// 拿到最受歡迎的遊戲列表（Get Top Games）
const request = require('request');

const bookUrl = 'https://api.twitch.tv/kraken/games/top';

const options = {
  url: bookUrl,
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': '0n4il3nmibawzxq23hqdbid338v15p',
  },
  qs: {
    limit: 100,
  },
};

function callback(error, response, body) {
  if (response.statusCode === 200) {
    const mBody = JSON.parse(body);
    const gameList = mBody.top;
    for (let i = 0; i < gameList.length; i += 1) {
      console.log(`${gameList[i].viewers} ${gameList[i].game.name}`);
    }
  } else {
    console.log('伺服器錯誤');
  }
}

function getTopGames() {
  request.get(options, callback);
}

getTopGames();
