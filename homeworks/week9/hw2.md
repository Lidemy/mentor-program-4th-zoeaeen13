## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
儲存文字時，我們可以使用 char、varchar 或 text 三種類型，具體差異如下：

|  | char | varchar| text|
| -------- | -------- | -------- |-------- |
| 適用 | 長度固定 | 可變長度，設置最大長度 |不確定最大長度時 |
| 例如 | 身分證號碼、手機號 | 姓名、地址 |自我介紹 |
| 索引速度 | 快 | 居中 |慢 |
| 容量 | `char(n)` 中的 n 表示字符數，最大長度是 255 個字符。如果使用中文（utf8 編碼）， 實際上會佔用 255 * 3 個字節| `varchar(n)` 中的 n 表示字符數，最大空間是 65535 個字節，如果是 utf8 編碼， 那最多存 65532/3 = 21844 個字符| |

#### 使用上注意
* 能用 varchar 的時候就不用 text，因為查詢速度快
* 知道固定長度的用 char，但是 `char(n)` 需要填入 n 值，它是不論是否達到 n 個字符都會佔去 n 個字符空間（會自動有空格填充），所以在索引出來之後記得要處理後面多餘的空格
* text 不可以有默認值
* 當 varchar 大於某些數值，會自動轉換為 text
* 能夠用數字的資料，盡量不要選擇用字符型態（電話號碼），會降低索引效率，因為處理查詢時是來回比較字符串的每一個字符，而數字只要比對一次即可


## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？
Cookie 是伺服器（Server）暫存在你電腦裡的一個檔案，裡面存放了你在這個網站的一些記錄，當你再次瀏覽同個網站時，系統就會去讀取檔案裡存放的東西，讓 Server 可以判斷使用者、辨認出身分，再給出相對應的網頁內容。Cookie 應用非常普遍，像是：
* 用來保持登入狀態
* 保存購物車內容、會員登入或瀏覽紀錄、停留時間

> 為什麼需要有 Cookie 存在呢？

因為 HTTP 協議本身是「無記憶狀態（Stateless）」，它不會記憶任何東西，Server 並不知道使用者在每個頁面跳轉時到底帶入了什麼資訊，對它來說每一個頁面之間都沒有關聯，每次請求也都是獨立的，伺服器需要藉由「Cookie」幫忙記憶一些資訊，才讓同一個使用者的各項操作產生關聯。

舉例來說，使用者在博客來書店瀏覽各大排行榜的新書，將某些有興趣的書籍點擊收藏、加入購物車，要記住，因為 HTTP 協定的特性，每一次加入的動作和其他操作之間是沒有關聯的，全是單獨的請求，這衍生出一個問題：當跳轉到最後結帳的頁面時，Server 要如何知道使用者已經放了哪些書進購物車？
它需要有個東西幫忙在各頁面記錄，記住使用者的瀏覽和更新購物車狀態，這個東西就是 Cookie。

> Cookie 屬性
* name：名稱
* value：儲存的值
* expires：Cookie 保存期限，不設定的話默認是暫時性，只要關閉瀏覽器就消失
* path: 和 Cookie 關連的網頁，默認同一目錄的網頁可以使用
* domain: 讓 Cookie 有效的網域名稱，可以和 path 一同設定，讓類似的 domain 可以享有同樣的資訊

#### I. 第一方 Cookie（First-party）
記錄限定於該存取網站的資訊，沒有它的話使用者體驗會很差，Cookie 可以讓網路瀏覽更流暢方便

#### II. 第三方 Cookie（Third-party cookies）
不屬於使用者存取網站所發出的 Cookie，意思是那些你不曾訪問過的網站用來跟蹤並收集關於你的網路行為的 Cookie，而收集到的資訊還可以被販售。例如當網站上顯示廣告，或是使用者點擊到廣告時，Server 除了會收到瀏覽網站的 Cookie 外，也會收到來自廣告伺服器的 Cookie。

>Cookie 怎麼設定和運用

1. Cookie 由 Server 端產生，跟著 response 一起發送給瀏覽器端讓它設定
2. 瀏覽器在接收後，會將其中的 key 及 value 值，以小型文字檔透過加密的方式，儲存在用戶端
3. 當使用者下次再造訪同一網站（不可以跨網域使用），只要 Cookie 尚未到期，瀏覽器就會將 Cookie 內容交給 Server 端知道
4. Server 端會查看有沒有它上次留下來的 Cookie 資訊，來決定網頁顯示的內容



## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？
1. 輸入內容如果包含 HTML 標籤，放入會導致網頁顯示異常
這個好像是之後的課程，有偷偷瞄到，我認為應該有函式或套件可以過濾掉 HTML 標籤

2. 如何讓 JS 和 PHP 溝通？
不知道之後會不會講到這個問題，先記錄做法，我想要前端擋下「還沒有登入」的留言，辦法是透過 JS 在按下 submit 按鈕時使用 `e.preventDefault()` 來阻止，但遇到一個問題是 JS 要怎麼知道是否有登入？

* 動態添加一個參數來告訴 Javascript 目前狀態（最先想到）
* 動態添加一個隱藏的 DOM 元素紀錄，讓 JS 可以獲取它的值知道是否有登入

兩者大同小異，所以我就做了先想到的那個方式，在 `$_SESSION['username']` 拿不到值的時候，寫一個 `<Script>` 標籤動態加上一個參數
```php=
$username = NULL;

// check if user is login
if (!empty($_SESSION['username'])) {  
  echo '<Script>' . 'const isLogin = "true"' . '</Script>';
} else {
  echo '<Script>' . 'const isLogin = "false"' . '</Script>';
}
```
這樣做好像沒有很聰明，但腦容量有限，目前只想的到這個方式

```javascript=
// User should log in before submitting
windows.addEventListener('submit', (e) => {
  if (isLogin === 'false') {
    e.preventDefault();
    clearText();
    const form = document.querySelector('form');
    if (!form.querySelector('h2')) {
      const warning = document.createElement('h2');
      warning.innerText = '請先登入';
      form.insertBefore(warning, form.querySelector('.input_section'));
    }
  }
});
```
![](https://i.imgur.com/YUAULgx.png)

#### 9/19 更新

這樣做是真的很笨，我後來想到既然都可以知道 `$_SESSION['username']` 有沒有值，那就在要處理新增留言的 PHP 檔判斷就好啦...

```php
if (empty($_SESSION['username'])) {
  header('Location: index.php?errCode=2');
  die('請先登入');
}
```
不過為了紀錄學習，還是會留下原本的程式碼，以這邊筆記的方式代替修改程式碼


### 參考資料
* [MySQL性能優化之char、varchar、text的區別](https://www.twblogs.net/a/5c126982bd9eee5e40bb4de6)
* [MySQL中char、varchar和text的区别](https://www.jianshu.com/p/cc2d99559532)
* [什麼是網路 Cookie？](https://http://mozlinks.moztw.org/2013/01/cookie.html)
* [Cookie 是文檔還是餅乾？簡述HTTP網頁紀錄會員資訊的一大功臣。](https://progressbar.tw/posts/91)