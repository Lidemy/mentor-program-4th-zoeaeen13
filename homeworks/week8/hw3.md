## 什麼是 Ajax？
**AJAX**
> AJAX = Asynchronous JavaScript And XML

* Asynchronous：非同步
* JavaScript：使用的程式語言
* XML：原指回應的資料格式，近年由於 JSON 流行，使用 Ajax 處理的資料格式不限於 XML。以Web API 設計角度來看，與表現層無關的 JSON 格式比較乾淨，可以獲得比較好的重複使用性

它的核心概念為「**非同步**」是一種非同步的 JavaScript 與 XML 技術，結合 HTML 或 XHTML、層疊樣式表、JavaScript、文件物件模型、XML、XSLT 以及最重要的 XMLHttpRequest 物件等。旨在於**發出請求後，瀏覽器無需等待伺服器回應，而可以讓使用者進行其它的操作，又不會中斷原本的請求**
* 即時變動內容，不需要重新讀取整個網頁 => 避免拿到沒必要的資訊
* 傳送並取回必須的資料，採用 JS 處理，用 DOM 操作更新畫面中的部分區域 => 更快速

### 非同步是什麼？
* **同步請求**
對 server 送出 request ，在收到伺服器端的 response 後才會繼續下一步的動作，等待期間無法處理其他事情
* **非同步請求**
對 server 送出 request 之後，不需要等待結果，仍可以持續處理其他事情。Response 傳回之後，會被更新進入畫面

在沒有非同步以前，每做一件事、或只是瀏覽一則貼文，我們就需要向 Server 重新要求一個完整頁面。等待切換的這段時間畫面往往會卡住，直到接收 response 才會重新渲染

### 提高使用者體驗
以前每次發出請求，都會接收到一個完整的 HTML 網頁，而伺服器回傳新網頁、瀏覽器重新演算網頁的過程，有一小段空白的等待時間。以下狀況就容易造成畫面卡住：
* 使用者網路不佳
* 傳送的資料量龐大

從效用上來看，有時候只需更新局部畫面，每次重新載入全新一頁顯得沒有效率。透過 AJAX 技術，對 server 發出非同步請求，針對局部內容的資料進行抽換，有效降低請求與回應的資料量，提高速度。


### ▲ 如何使用 Ajax 發送請求
1. 建立一個 `XMLHttpRequest` 非同步物件
2. 使用`.onload()`，用法是設定「當資料全部跑完以後，將要觸發的事件」
3. `.open()` 要讀取的網址及資訊
4. `.send()`傳送請求
```javascript=
const request = new XMLHttpRequest();
request.onload = function(){
    console.log(request.responseText);
}
request.open("請求方法", "讀取網址", true);
request.send();
```

* `XMLHttpRequest` 物件將包含回應內容（response body）及 HTTP 狀態等
* `request.open()` 方法的第三個參數 async，可以選擇性填寫。若 async 參數為 true 或是未指定，`XMLHttpRequest` 會被設定為非同步
* 回傳的資料可以用 `request.responseText` 取得、加以解析，responseText 預設會使用 UTF-8 編碼來解讀傳回的文字。如果回應是 XML，則可以使用 responseXML 取得剖析後的 DOM 物件


#### 其他屬性
1. `request.readyState` 屬性會回傳一個 XMLHttpRequest 物件目前的狀態
```javascript=
0 UNSENT - 初始化，產生 XMLHttpRequest，但 open 方法尚未呼叫
1 OPENED - 用了 open，還沒傳資料
2 HEADERS_RECEIVED - 偵測到使用 send 方法，且可取得 header 與狀態
3 LOADING- 資料下載中
4 DONE - 接收數據完成
```
2. `request.status` 屬性，表示響應的 HTTP 狀態碼
```javascript=
1xx：表示接收到請求並且繼續處理
2xx：處理成功
3xx：重定向，為了完成指定的動作必須進一步處理
4xx：客戶端錯誤，包含語法錯誤或不能正確執行
5xx：服務端錯誤，伺服器不能正確執行一個正確的請求
```

3. 到底差在哪裡？

#### `.onreadystatechange()`  V.S `.onload()`

查相關資料時，我發現一個有趣的討論是 onreadystatechange 和 onload 方法的差別，目前多數新手文看到都是使用 onload，於是好奇去查使用前者的情境是什麼？

原來每當 readyState 狀態改變時，就會觸發 onreadystatechange 事件，是只要返回的狀態碼有變化就會回調的方法（從 0~4），而 onload 是只有狀態碼為 4 時才會回調一次的函數。

順帶一提，有一個 onprogress() 方法，也是當狀態碼為 3 時才會執行。

而會運用 onreadystatechange 事件的原因也很簡單，僅因為 IE8 及其以下瀏覽器中，**不支援 onload 事件**，但是支援 onreadystatechange。而 IE8 以上瀏覽器、谷歌瀏覽器和火狐瀏覽器都支援 onload 事件。

基本上只需要知道 onload 方法就可以了，如果需要使用到 onreadystatechange，那就得再多判斷一個 readyState 狀態

* 在 onload 事件綁定函式，先判斷 HTTP 連線是否正常
* 在 onreadystatechange 事件綁定函式，要判斷 HTTP 狀態碼和物件下載狀態
```javascript=
request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
        console.log(request.responseText)
    }
}
```

<br>

## 用 Ajax 與我們用表單送出資料的差別在哪？
前面說過，Ajax 核心概念是「非同步」，從這個角度出發來思考異步操作的用途。

拿註冊登錄來說，一般用表單提交會觸發 submit 事件，使頁面發生跳轉，但是這個跳轉的行為掌控權在於後端，而我們希望控制權放在前端時，可以用 JS 操作數據和頁面變化，或者說，某些時候我們還不想要跳轉（比如送出資料前就先驗證用戶輸入的帳號是否有效），但是總不可能在 submit 的時候才送查詢請求，這時候就需要用到 Ajax，先進行異步請求。

### 比較 Ajax 和 form 送資料
* 安全性一樣，都是發送 http 協議，安全性和提交方式無關

**刷新頁面**
* Ajax 在提交、請求、接收時，網頁不需要全部刷新，只刷新頁面局部，不影響其他部分
* Form 的提交，是新建一個頁面，哪怕是提交給自己本身，也會刷新 => 也因此，如果要維持頁面就要傳參數來保存

**建立請求**
* Ajax 提交是在後台新建一個請求，資料轉傳到 JavaScript => 沒有換頁問題
* Form 卻是放棄本頁面，然後再請求

**使用 JS**
* Ajax 必須要用 JS 實現，不啟用 JS 的瀏覽器就無法完成操作
* Form 表單是瀏覽器自帶的，無論是否開啟 JS 都可以提交表單

同時有多個 Ajax 需求及表單提交需求，無法保證哪一個需求先獲得伺服器的回應，可能會造成應用程式多執行緒（thread）的競爭問題

<br>

## JSONP 是什麼？
>Same Origin Policy 同源政策
是現代瀏覽器在安全性上的一個重要設計，主要是確保 script 只能在與其載入來源相同的頁面執行，達到不同 origin 網站彼此無法互相干擾

介紹 JSONP 之前，我們得先知道 `XMLHttpRequest` 及 `Fetch` 都會遵守一個叫 same-origin policy（同源政策）的東西，基於一些[安全性問題](https://openhome.cc/Gossip/JavaScript/SecurityConstraint.html)需要限制某些動作，它會限制程式碼和不同網域資源間的互動，預設是：如果你的網域不同源就會擋掉，只要 URL 協定、主機與 port 其中一個不同，就不可以取得


這時候，可以透過 **CORS 跨來源資源共用方法** 來建立一個可以讓你跨來源 HTTP 請求，它是透過添加額外的 HTTP 標頭來取得存取其他網域來源的資源，不過就需要跟後端溝通，把自家 domain 加入 `access-control-allow-origin` 名單，或是設成 `*/*` 。

然而許多時候，仍必須要能跨站取得資源，就有些人腦筋轉得快，想到了一個「不會受到同源政策」影響的地方，那就是── JSONP，適合用在拿取資料（GET method）

### JSONP 概念
利用 `<script>` 標籤可以跨網域請求的特性，指定好一個不同源的網址，我們就可以拿掉裡面的內容
```htmlmixed=
<script scr="...某個不同源 url"></script>

<!-- 拿到的資料格式
{
    "name":　"Justin",
    "age":　35
} -->
```

拿到資料後，應該怎麼讓它被執行？
仔細看一下這段程式碼：透過動態建立 `<script>` 標籤，指定其 src 來源屬性，將它附加至 DOM 樹上，這樣瀏覽器就會下載 src 所指定的 JS 檔
```javascript=
// javascript
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'some.js';
document.getElementsByTagName('head')[0].appendChild(script);
```

上面這段，相當於在網頁的`<head>`中寫下
```htmlmixed=
<!-- HTML -->
<script type="text/javascript" src="some.js"></script>
```

利用這個思維，如果 src 回傳的東西是 JavaScript 腳本，把不同源 url 取得的 Data 再作為參數傳入，在裡面不就可以執行 JS，而不會受到同源政策影響了嗎？完整流程如下：

1. 動態建立一個 `<script>` 元素，讓 src 指向一個跨網域的網址
2. 動態建立另一個 `<script>` 元素，會返回一個 JavaScript 檔案，裡面會執行 JS function
3. function 的傳入參數就是你請求的資料結果，參數的格式通常就是一個 JSON
4. 在 callback function 中，可以對後端返回的資料做任何事

JSONP 全名 JSON with Padding，將 JSON 資料填入 Padding，Padding 部份是要呼叫的函式
* `script tag` 的 src 屬性不會被同源政策所管制
* 是動態載入 JavaScript 的方式
* 可以發出非同步請求
* 一般不會用來傳輸隱私性高的資料


有些 server 設計為可接受 `jsoncallback` 的請求參數，可以指定它為某個要執行的 function，可以參考[使用 JSONP 跨站請求](https://openhome.cc/Gossip/JavaScript/JSONP.html)

</br>


## 要如何存取跨網域的 API？
提到了同源政策的限制，那處理跨網域資源存取的問題就是目前軟體工程師的必備技能，常見的有三種方式可以解決跨網域的問題：
1. **JSONP**

上一題已經介紹過的 JSONP，就是一種避開 Same Origin Policy 而發送 cross-domain request 的技巧。利用 `script tag` 的開放屬性（可以載入url、JS 程式碼），將所需的資料以 function 包起來，當用 script element 方式動態添加時，就可以將資料帶入處理函式執行，達到跨網域請求目的。


2. **AJAX Proxy**

屬於 Server 端的解決方案，簡單來說就是將 web server 當成前端瀏覽器與其它第三方伺服器之間溝通的中介，瀏覽器發送 AJAX request 給 server 端 proxy，proxy 再將請求轉送給第三方服務並取得內容回傳給前端

3. **CORS**

透過添加兩個額外的 header 來取得跨網域的資源
* Origin
* Access-Control-Allow-Origin　開啟設定

簡單來說，是讓瀏覽器和伺服器知道他們必須溝通。客戶端在發送 request 時（限支援 CORS 的瀏覽器），如果發現請求目標非同一 domain，會自動加入 `custom header: Origin` 並傳入自己的 domain，而當 Server 接收請求並回傳時，必須在 Response 的 Header 裡面加上 `Access-Control-Allow-Origin: http://domain/allowed` 這個 header，帶入的值就是允許跨域請求的白名單，如果是星號（*）代表允許全部


<br>

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

談這個問題，我們先看看下面這張圖，是如何發送請求和後端溝通的？

有沒有看到兩個「Browser」的綠色方框？這週發送 API 和第四週最大的差異，其實就是發出 request 和接收 response 的時候，都需要經過「**瀏覽器**」這個媒介
![](https://www.w3schools.com/xml/ajax.gif)

上一題談過的同源政策，是現代**瀏覽器**在安全性上的一個重要設計，主要確保 script 只能在與其載入來源相同的頁面執行，達到不同 origin 網站彼此無法互相干擾的目的，它控制了兩個不同網域來源互動。

只要瀏覽器發的 request 位置 跟 Server 端的位置是不同源（不同網域）， response 就會被瀏覽器擋掉，要注意的是：Request 還是有發出去！而且瀏覽器也有收到 Response，但因為同源政策的安全性考量，瀏覽器不會把 Response 傳回給你的 JavaScript。

在第四週，之所以不會遇到這樣的問題，就是因為我們是**直接跟後端溝通**，不經過瀏覽器這一層，記得：同源政策只跟「瀏覽器」有關，所以使用 Node.js 的時候不會有這個問題。

<br>

### 參考資料
* [建立 XMLHttpRequest 物件](https://openhome.cc/Gossip/ECMAScript/XMLHttpRequest.html)
* [什麼是 Ajax？ 搞懂非同步請求 (Asynchronous request)概念](https://tw.alphacamp.co/blog/ajax-asynchronous-request)
* [AJAX Introduction](https://www.w3schools.com/xml/ajax_intro.asp)
* [XMLHttpRequest.readyState](https://developer.mozilla.org/zh-TW/docs/Web/API/XMLHttpRequest/readyState)
* [使用 XMLHttpRequest](https://developer.mozilla.org/zh-TW/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)
* [表單提交 form 提交和 ajax 提交](https://kknews.cc/zh-tw/code/op6rk4m.html)
* [用 JSONP 跨域 GET 簡易示範 ＆ 說明](https://medium.com/@brianwu291/jsonp-with-simple-example-4711e2a07443/)
* [JavaScript前端跨網域存取解決方案](https://www.tpisoftware.com/tpu/articleDetails/402)
