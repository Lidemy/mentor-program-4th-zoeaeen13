# 挑戰題心得
## 挑戰題
寫一個 node.js 的程式並串接 Twitch API，接收一個參數是遊戲名稱，輸出那個遊戲底下最受歡迎的前 200 個實況名稱與 id。
- 程式碼連結： [挑戰題](twitch.js)
- API： [Get Live Streams](https://dev.twitch.tv/docs/v5/reference/streams#get-live-streams)
- 範例： ```node twitch.js "Apex Legends"```

![](https://i.imgur.com/m7T0LWM.png)

這題花很多時間找 API 及了解它的文件，我認為應該是用 `https://api.twitch.tv/kraken/streams/` 這支，在 **Query Parameters** 參數裡面有「game」查詢選項，先使用 Postman 測一次，查詢「Just Chatting」遊戲的實況清單：

![](https://i.imgur.com/iuzq0EY.png)

回復 200 OK，我們確定有串接到資料，接著來根據題目要求輸出前 200 名實況，目前只填入遊戲名稱的查詢參數。

如果不知道預設的回復資料型態，可以將上面的 response body 全部複製下來，貼到 [Json Editor Online](jsoneditoronline) 檢視，左邊貼上，右邊顯示出資料結構，可以看到它是一個 object 裡面有 streams 一個陣列，陣列有 25 筆實況資料。

![](https://i.imgur.com/6lsAQ9h.png)

其實，仔細看文件裡面就有提到，回傳的 streams 數量是取決於 limit 參數，它會接收一個數字，其預設值 25、最大值 100，回傳一個根據實況觀眾多寡排序的陣列。只要加上 limit=100 就可以取得前 100 名的實況。

![](https://i.imgur.com/BDnbZ1C.png)

然而，題目要求是回傳前 200 名，一次至多只能回傳 100 筆，所以我們需要請求兩次，但是要怎麼拿到後面 100 名的資料？這個我苦惱了很久（結果是只要有認真看文件就可以解決，文件真的很重要 XD）

上圖有一個參數「offset」，中文叫做偏移量，有點陌生所以去查了它的作用，參考 [Paging Through Results Using Offset and Limit](https://support.smartbear.com/qacomplete/docs/developer/api/rest/api/reference/paging.html) 的範例，預設同樣是回傳 25 個項目，可以看到加了 `limit=10` 的結果只會回傳前 10 個項目，加了 `offset=10` 會回傳從第 11 個起算的 25 個項目， **offset 的作用是從我們指定的位置開始取資料**。

![](https://i.imgur.com/ggDp9aj.png)


如此一來，解法就很明瞭，得請求兩次，第一次我們請求前 100 筆資料，第二次請求後面 100 筆的資料，一一輸出：
```javascript=
// 寫一個拿資料的函式，每一次都取 100 筆
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
    if (response.statusCode === 200) {
      const mBody = JSON.parse(body);
      const streamList = mBody.streams;
      for (let i = 0; i < streamList.length; i += 1) {
        console.log('===============');
        console.log(`排名：${i + 1 + mOffset} 名稱：${streamList[i].channel.display_name}`);
        console.log(`ID：${streamList[i]._id} 觀看人數：${streamList[i].viewers}`);
      }
    }
  }

  request.get(options, callback);
}

function showStreams() {
  getStreamList(0);    //取第 0 個開始的 100 筆資料
  getStreamList(100);  //取第 100 個開始的 100 筆資料
}

showStreams();

```

![](https://i.imgur.com/m7T0LWM.png)





## 超級挑戰題
這週的作業我們都是使用 request 這個 library 來發送 request，但其實 request 這個套件也是使用 Node.js 原生提供的 library。因此，這週的超級挑戰題就是讓你試試看能否不用 request，只用 Node.js 內建的套件來發出 request，並且改寫 hw2，改寫成只用原生的 library。
- 程式碼連結： [超級挑戰題](hwS2.js)

```
https.request(options[, callback])
```
![](https://i.imgur.com/K9QblJw.png)

用法其實大同小異，這邊就沒有改 hw2.js 裡面 callback 的實作內容，主要改寫 options 對象，其選項有以下幾種常見：


| options | 用法 |
| -------- | -------- |
| protocol | 使用的協議。默認為'http:'|
| host | 發出請求的域名或IP地址。默認為'localhost'|
| hostname | 支持url.parse() hostname優先於host|
| port | 服務器的端口。默認為80|
| method | HTTP請求方法，默認為'GET'|，默認為'GET'
| path | 請求路徑。默認為'/'。應包含查詢字符串|
| auth | 基本身份驗證|
| agent | 控制代理行為。使用代理時，請求默認為Connection: keep-alive|

使用 GET 方法的題目在改寫上沒有問題，唯獨 POST 和 PATCH 等需要上傳東西的題目著實難倒我，不知道 Request body 要怎麼寫才對？

後來找了好幾篇 node.js 相關 request 請求的資料，發現不能夠直接將 object 物件發送到服務端，需要先將它序列化、轉成字串，而使用 **querystring** 是適用在 `'Content-Type': 'application/x-www-form-urlencoded'` 情況

```javascript=
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
```

參考資料
* [nodejs http.request 引數格式之querystring](https://www.itread01.com/content/1549494756.html)
* [nodejs querystring踩坑笔记](https://www.cnblogs.com/jay763190097/p/6742220.html)
* [HTTP - node](https://node.readthedocs.io/en/latest/api/http/)