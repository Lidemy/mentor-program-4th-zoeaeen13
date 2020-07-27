/* eslint-disable  no-underscore-dangle */
// 接收一個參數是遊戲名稱，輸出那個遊戲底下最受歡迎的前 200 個實況名稱與 id
const request = require('request');

const process = require('process');

const bookUrl = 'https://api.twitch.tv/kraken/streams';
const gameName = process.argv[2];

function getStreamList(mOffset) {
  const options = {
    url: bookUrl,
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': '0n4il3nmibawzxq23hqdbid338v15p',
    },
    qs: {
      game: gameName,
      offset: mOffset,
      limit: 100,
    },
  };

  function callback(error, response, body) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      try {
        const mBody = JSON.parse(body);
        const streamList = mBody.streams;
        for (let i = 0; i < streamList.length; i += 1) {
          console.log('===============');
          console.log(`排名：${i + 1 + mOffset} 名稱：${streamList[i].channel.display_name}`);
          console.log(`ID：${streamList[i]._id} 觀看人數：${streamList[i].viewers}`);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  request.get(options, callback);
}

function showStreams() {
  getStreamList(0);
  getStreamList(100);
}

showStreams();
