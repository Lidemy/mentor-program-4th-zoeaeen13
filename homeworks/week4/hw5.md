## 請以自己的話解釋 API 是什麼


API 全名是 Application Programming Interface，簡單來說它是一溝通介面，可以幫助開發者和外部使用者互動的地方，聽上去很難理解？

想像你現在正坐在餐廳，你拿到了一份菜單，而你已經看好了餐點、知道要吃什麼，這時候呢？你不需要走近櫃台詢問，不需要進入廚房點餐，更不需要自己烹煮，餐廳已經提供好一切你需要的東西，唯一要你做的就是找到一位「服務生」幫你點餐、送餐和結帳，不用親自處理。

把 API 想像成你的服務生，所有人都可以透過它來**傳達需求、產生與餐廳的連結**，而拿到真實例子來看：
* 餐廳 - 網頁、APP
* 廚房後台 - 資料庫
* 菜單 - 資料

當你拿到服務生（API）遞上的菜單（資料）後，你想要點三杯雞套餐（某一項資料做特定事情、使用 GET 動作）讓 API 去幫你傳遞需求（發送 Request），使後台廚房做餐點（接到要求，對資料庫進行檢索），API 拿到三杯雞餐點後協助送到你的桌上（給出回應）。

這就是 API 運作的過程。

---

既然你明白了，我們順便認識一下 HTTP 協定和它的請求方法：

### HTTP 協定
為了讓客戶端和伺服器端的要求及回應的規格統一，而出現的一定規範
* 客戶端 Client side：發送要求
* 伺服器端 Server side：接收要求，回傳回應

#### HTTP Method 請求方法

常見有 GET / POST / PUT / DELETE 幾種方法，正好會對應到資料庫基本操作「增刪查改」

簡單來說，**不同的 Method 就是對同一件事情做不同的操作**，例如讀取和上傳資料就是不同的動作，自然會用呼叫方法的差異來設計

| 請求方法 | 使用 |方法狀態 |
| -------- | -------- |  -------- | 
| GET | 讀取特定資源或集合 |safe & idempotent|
| PUT | 完整更新資源。如果識別碼是已知的，也可用於創建特定資源 |idempotent|
| PUTCH | 在現有的資料欄，增加或**部分更新**一筆資料||
| POST | 創建新資源 |
| DELETE | 通過識別碼刪除/刪除特定資源 |idempotent|

> **PATCH 和 PUT 的主要差別在於**

PATCH 並不是把原有的資料全部取出，然後針對要更新的部分修改再送回，而是告訴後端要修改哪裡，**僅送出要修改部分**的參數


> **對於HTTP 方法狀態描述**
* safe
該操作本身就不會改變原本的資源狀態，不論請求一次或多次都只是在讀取，並且同樣結果是可以被快取
* idempotent
指客戶端的操作，不管是做一遍、兩遍或多遍，都會得到同樣的資源狀態結果，即對於服務端的影響結果不會變


更詳細的資料，請參考[常見的五種 HTTP Method](https://progressbar.tw/posts/53)或[ HTTP 協議的 Idempotent Methods](https://matthung0807.blogspot.com/2019/02/http-idempotent-methods.html)


### Restful API

REST，全名 Representational State Transfer（具象狀態傳輸）是一種設計風格，Restful 只是轉為形容詞，Restful API 則是形容以此規範設計的 API。

目的是幫助在世界各地不同軟體、程式在網際網路中能夠互相傳遞訊息。而每一個網頁都可視為一個資源（Resource）提供使用者使用，通過通用的介面（Interface）對資源進行操作

* Resource：資源
* Representational：表現形式，如 JSON，XML
* State Transfer：狀態變化。即上述講到的可利用 HTTP 動詞來做呼叫動作

簡單來說，Restful API 是讓人能一眼看懂，**能單從一個 HTTP 要求所包含的資訊，預期會收到的資料型態**。



**一個 Resource 由一個 global identifier（即URI）所表示**，每一個網頁都可視為一個資源提供使用者使用，以資源操作的概念（指對某項 Resource 指派動作），結合 url path 與 HTTP Method。

>為了操作這些資源（Resources），網路的 components（即 clients 跟servers）透過標準化的介面（即 HTTP）來溝通並交換這些資源。


#### RESTful API 三種組成
1. Nouns 名詞
定義資源位置的 URL，每個資源在網路上都會有**唯一位置**，就如每戶人家都有唯一的地址一樣
2. Verbs 動詞
對資源要做的動作，例如常用動作有 GET / POST / PUT / DELETE
3. Content Types
資源呈現方式，API 資源可以以多種方式表現，最常用的是 JSON，較輕量、也好處理

```
//以前的一般API
獲得資料GET    /getData
新增資料POST   /createData
刪除資料DELETE /deleteData/1


//RESTful API
獲得資料GET     /data
新增資料POST    /data
刪除資料DELETE  /data/1
```

用唯一的 URI 定位資源，將不同動作藏在 HTTP 的方法裡面！


#### RESTful API 優點

* 統一 API 接口
以往的一般 API 可能會分別向 A、B、C 三者請求，從不同的對方來完成動作，RESTful API 的優點是，是讓上述不同的請求動作由同一位完成
* 使 url path 更為簡潔、容易被理解
* 使用 URI 作為資源標識符的請求中標識各資源
即所有資源可以用 URI 定位，而且這個定位與其他資源無關，也不會因為其他資源的變化而變化，資源相互的依賴性降低

#### 參考資料
1. [API 是什麼? RESTful API 又是什麼?](https://medium.com/itsems-frontend/api-%E6%98%AF%E4%BB%80%E9%BA%BC-restful-api-%E5%8F%88%E6%98%AF%E4%BB%80%E9%BA%BC-a001a85ab638) 
2. [什麼是 REST? RESTful?](https://medium.com/@cindyliu923/%E4%BB%80%E9%BA%BC%E6%98%AF-rest-restful-7667b3054371)
3. [休息(REST)式架構? 寧靜式(RESTful)的Web API是現在的潮流？](https://progressbar.tw/posts/53)
4. [什麼是 REST 跟 RESTful?](https://ihower.tw/blog/archives/1542)

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

### Status Code 狀態碼
* 2xx = Success（成功）
* 3xx = Redirect（重定向）
* 4xx = User error（客戶端錯誤）
* 5xx = Server error（伺服器端錯誤）

狀態碼表明一個 HTTP 要求是否已經被完成，代表 **API 層的執行狀態**，回應分為五種：資訊回應、成功回應、重定向、用戶端錯誤及伺服器端錯誤。

以下記錄其他常見狀況，另參考[這篇](https://tw.twincl.com/programming/*641y)：
* `201 Created` 資源新增成功，在寫作業時有特別印出來 status code，新增書籍成功是會回傳 201

* `400 Bad Request` 伺服器因為收到無效語法，而無法理解你的要求

* `401 Unauthorized`  指用戶端尚未驗證，也就是 unauthenticated 需要授權以回應請求，有點像 403，但這裡的授權是有可能辦到的，之前接 API 經驗是你可能遇到"**拼字錯誤**" （例如 Bearer 要大寫）

* `403 Forbidden`
無訪問權限，例如已經驗證過、但未被授權，所以伺服器拒絕給予應有的回應。不同於 401，伺服端它會知道用戶端的身份

* `415 Unsupported Media Type` 是指用戶端送出的請球 Content-Type（也就是用戶端 request body 內容類型）伺服器不支援

* `429 Too Many Requests`
用戶在給定的時間內發送了過多的請求，像是用 **ngrok** 會有一分鐘 40 次的限制。


## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。


第一次設計 API，花了很長時間才完成，因為我之前有看過漂亮的 API 文件，在看到作業內容後偷偷跑去問後端朋友是用什麼做的，目的就是希望利用這個作業讓自己熟悉一遍。

Api Buleprint 是一種利用 markdown，主要用在產出 Api 文件。參考下圖，可以很清楚看到使用 Api Buleprint 撰寫的文件，敘述請求動作、範例、攜帶的 Headers 及回傳資料格式，讓前端可以一目了然。

- API 文件連結：[美食家的口袋名單 Pocket list of Foodie](https://zoeaeen13.github.io/Demo/week4/designAPI/)

參考了作業提供的 API 樣式及自己使用上認為需要提供的資訊，紀錄設計的幾個重點：

#### 獲取餐廳資訊

* 我認為一般使用上應該有 Query Parameters 供檢索
* 提供 limit、location、type 等搜尋條件
* limit 值的設計，在做完挑戰題後我感覺可能是用做「分次請求」動作
* 提供回傳的資料格式，是參考了 Google Map 評價上的資訊，簡化而來
```javascript=
"restaurants": [
        {
            "id": 24,
            "name": "福井日本料理",
            "score": "4.3",
            "likes": 27,
            "address": "950台東縣台東市長沙街92號",
            "open": true,
            "website": "https://www.facebook.com/141315755928342/posts/2787811387945419/?d=n",
            "contact": "+88689334038",
            "comments": {
                "total": 2,
                "list": [
                    {
                        "name": "胖胖",
                        "content": "推薦炙燒鮭魚，牛肉串燒，炸豬排，蛤蜊鮮湯。吃的到老師傅的手藝，不錯吃。",
                        "score": 4.0,
                        "date": "2019_03_16"
                    },
                    {
                        "name": "WenYu Liao",
                        "content": "餐廳服務真的很好，因為行程稍微delay，店家還是很熱心的幫我們指揮停車，餐點全都好吃，用餐環境寬敞舒適。炸蝦採用草蝦，雖然小貴但份量紮實。鮭魚炒飯也夠水準。握手司份量大小適中，非常完美。已經期待下次二訪。",
                        "score": 4.5,
                        "date": "2020_12_07"
                    }
                ]
            }
        }
    ]
}
```

#### 單一餐廳資訊查看、刪除及修改

對於 URL 資源操作的問題，我參考這篇 [API 設計指引](https://docs.microsoft.com/zh-tw/azure/architecture/best-practices/api-design)，摘錄裡面有提到的重點：

> 實體通常會分組成集合 (訂單、客戶)。 集合與集合內的項目是不同的資源，而應具有自己的 URI，下列 URI 可能代表訂單的集合

```
https://adventure-works.com/orders
```
* 一致的命名慣例。集合的 URI 中使用複數名詞比較有效益，如上面的 orders
* URI 和項目組織成階層
* 例如，`/customers` 是客戶集合的路徑，而 `/customers/5` 則是其 ID 等於 5 的客戶路徑
* 避免要求比 `collection/item/collection` 更複雜的資源 URI

助於維持 Web API 的直覺性。 許多 Web API 架構可根據參數化的 URI 路徑來路由傳送要求，因此您可以定義路徑 `/customers/{id}` 的路由。接著，有了這些形式的 URI，我們以 HTTP 方法定義及區分動作


| 資源 | POST | GET |PATCH/PUT |DELETE |
| -------- | -------- | -------- |-------- |-------- |
| /customers | 建立新客戶 | 取所有客戶 |大量更新客戶 |移除所有客戶 |
| /customers/1 |  | 擷取客戶 1 的詳細資料 |更新客戶 1 的詳細資料 |移除客戶 1 |

#### 新增及修改餐廳

刪除的話會回傳 204，沒有設計 response body，前端判斷 status code 是 204 就可以。

新增及修改是我認為比較麻煩的部分，雖然能以 201 來表示新增成功，但因應實務上的需要我還是設計 response body 讓前端能夠用 data 更新畫面。

#### 參考資料
- [API Blueprint](https://apiblueprint.org/)
- [Chris 技術筆記- API Blueprint 學習筆記
](https://dwatow.github.io/2017/11-14-api-blueprint-note/)
- [使用API blueprint创建API文档](https://jimmysong.io/blog/creating-api-document-with-api-blueprint/)
- [API 設計指引](https://docs.microsoft.com/zh-tw/azure/architecture/best-practices/api-design)

