## 作業筆記

### hw1 進階挑戰
想知道中獎機率，設定四個變數分別對應每種獎項，以迴圈來跑，如果 API 不太穩定回傳錯誤的話也要記錄：

```javascript=
let firstPrize = 0
let secondPrize = 0
let thirdPrize = 0
let none = 0
let failure = 0

function getOdds() {
  for (let i = 0; i < 100; i += 1) {
  // 紀錄次數
    console.log('i=', i+1)
    callAPI()
  }
  
  // 分別印出結果
  console.log('========= print result ============')
  console.log('firstPrize', firstPrize)
  console.log('secondPrize', secondPrize)
  console.log('thirdPrize', thirdPrize)
  console.log('none', none)
  console.log('failure', failure)
  console.log('total', firstPrize + secondPrize + thirdPrize + none + failure)
}


function callAPI() {
  request.open(
      'GET', 
      'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', 
      false
  );
  request.onload = setPrizeNum;
  request.onError = function() {
    console.log('error');
    failure += 1
  }
  request.send();
}

// 分別存進對應的變數
function setPrizeNum() {
  if(request.status >= 200 && request.status < 400) {
    const response = request.responseText;
    const prize = JSON.parse(response).prize;
    switch(prize) {
      case "FIRST":
        firstPrize += 1
        break;
      case "SECOND":
        secondPrize += 1
        break;
      case "THIRD":
        thirdPrize += 1
        break;
      case "NONE":
        none += 1 
        break;
      default:
        failure += 1
        break;
    }
  } else {
    failure += 1
  }
}

getOdds()
```

#### 遇到問題
1. 錯誤處理：有遇到網路問題，也可能是一次發太多筆造成的伺服器問題
```
#1
Failed to execute 'send' on 'XMLHttpRequest': Failed to load...

#2
Failed to load resource: the server responded with a status of 500 ()
```

2. 不管跑幾次只會返回一個結果，或者全部失敗

題目沒有很難，很快就確定解法，但一開始發現跑不出東西就很傻眼，確認了迴圈每次都有執行到時，就知道問題應該是出在 API 上面。
```javascript=
// 原本的程式碼
function getOdds() {
  for (let i = 0; i < 100; i += 1) {
    console.log('i=', i+1)
    
    //call api
    request.open(
        'GET', 
        'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', 
        true
    );
    request.onload = setPrizeNum;
    request.onError = function() {
        console.log('error');
    }
    request.send();
  }

}
```
我猜想，應該是非同步這個寫法出了問題，上網尋找資料，使用關鍵字像是「Ajax 多次請求、多筆 API 請求、非同步」等等，原本對非同步請求的理解如下，認為使用異步請求只管發送，處理起來應該比較快
>* **同步請求**
對 server 送出 request ，在收到伺服器端的 response 後才會繼續下一步的動作，等待期間無法處理其他事情
>* **非同步請求**
對 server 送出 request 之後，不需要等待結果，仍可以持續處理其他事情。Response 傳回之後，會被更新進入畫面

沒想到怎麼執行迴圈，多筆都只會得到一個結果，沒有像我想像中的 100 個結果，納悶之餘，猜想是不是「進行連續多個請求、且請求的 url 相同時，會放棄前面的所有請求，只執行最後一次請求？」原因還沒完全搞懂，不過資料提示我可以先把它**改成同步請求**：

```javascript=
request.open('GET', url, false);
```
抱著姑且一試的心態將參數改為 false，果然順利印出 100 筆資料，雖說成功了，但不知道為什麼這樣可行、也不知道為什麼非同步的情況下會 failed，而且機率這題應該不需要照順序處理，只能先記錄下來每次跑的結果。

![](https://i.imgur.com/qntq3XZ.png)

#### 最後印出結果統計，得到頭獎的機率約 5%

* 執行 100 次 => 花費約 24.5s
* 執行 1000 次 => 花費約 239s

| 測試 | 次數| 頭獎 | 二獎 | 三獎 | 銘謝惠顧| 失敗 |
| ----- | ----- | ----- |----- |----- |----- |----- |
| 1 | 100 | 6 |22 | 24 | 47 | 1 |
| 2 | 100 | 3 |24 | 30 | 39 | 4 | 
| 3 | 100 | 8 |23 | 32 | 33 | 4 |
| 4 | 1000 | 48 |226 | 281 | 394 | 51 |
| 5 | 1000 | 52 |194 | 351 | 391 | 48 |
| 總次數 | 2300 | 117 | 489 | 718 |868 |108 |
| 機率 | 100% | 5% | 21.3% | 31.2% |37.7% |4.7% |

<br>

### hw2 進階挑戰
原本的寫法，就將取得前五名遊戲和取得該遊戲的實況拆成兩個 function，方便之後調用，因此在實作進階功能，沒有太大的困難，和第四週的挑戰題相似，需要了解 offset 和 limit 參數的作用。

第一次刷新實況和點選底部按鈕新增，都是以每次 20 筆為單位，因此在這裡直接寫死（未來有需要彈性取資料，當然也可以用參數的方式傳入），至於 offset 參數，以 gameList 的子節點為參考，如果裡面沒有東西、代表是第一次刷新，offset 值自然為 0，如果是要取得更多實況，那偏移量就是目前所有的卡片總數，如為 20 個，就會從第 21 筆資料開始傳入接下來的 20 筆。

```javascript=
function updateStreams(gameName) {  // 輸入遊戲名稱
  requestStreams.onload = setResult()
  requestStreams.onError = () => {
    console.log('error');
  };
  
// 計算目前顯示的實況卡片數
  const offset = gameList.childElementCount;
  requestStreams.open(
      'GET', 
      `${url}/streams?game=${gameName}&limit=20&offset=${offset}`, 
      true
  );
  requestStreams.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  requestStreams.setRequestHeader('Client-ID', '0n4il3nmibawzxq23hqdbid338v15p');
  requestStreams.send();
}
```