## 請簡單解釋什麼是 Single Page Application
單頁應用程式 single-page application，簡單來說，它一改以往 Multi-page（多頁式）的設計模式：每點選一個按鈕、進行一個動作，就得重新載入另外一個頁面的操作。

SPA 架構下，除了第一次需要全畫面渲染，之後網頁「**不需跳轉頁面**」就可以達到基本的建立、讀取、修改、刪除功能，透過「動態」重寫部分頁面的方式，提高使用者體驗。

![](https://i.imgur.com/WdTWbnQ.png)

從這張圖可以看到，只有第一次請求才需要回傳整份 HTML，之後的請求利用 AJAX 來拿到純資料內容（目前多以 JSON 格式為主），再進行局部更新。

<br>

## SPA 的優缺點為何

### 優點
* 前後端分離，各司其職
* 單一頁面可以瀏覽完所有資訊，資訊傳遞快
* 結合 UI 的工作改由瀏覽器完成，對 Server 來說負擔變小，這樣可以處理更多的請求
* 局部更新，使用者體驗較好

### 缺點
* 有些人會對 CSR 的 SEO 有疑慮
* 第一次跑畫面需要較長的反應時間
* 因 URL 網址都沒有改變，前端要自己管理必須自定狀態來做判斷

<br>

## 這週這種後端負責提供只輸出資料的 API，前端一律都用 Ajax 串接的寫法，跟之前透過 PHP 直接輸出內容的留言板有什麼不同？

以前我們要從伺服器重新載入整個新頁面，這種稱為 Server-side render，意思是綁資料和結合 UI 的工作都在 Server 完成，之後回傳整份 HTML，瀏覽器拿到什麼就顯示什麼，但這樣一來產生的問題：

* 頁面由伺服器產生，每次更新都需要全畫面重新渲染，不利使用者體驗
* Server 取得資料後，先計算畫面再整頁送出，運算及流量負荷太大。


現在的話，透過 Ajax 拿資料，可以動態生成內容，達到局部更新的效果，將畫面渲染（Render）工作從 Server 端移到 Client 端，在 Client 端實作。

![](https://eww-wp.s3.ap-south-1.amazonaws.com/wp-content/uploads/2020/02/14064824/single-page-applications.jpg)

這種模式上的轉變，有賴於兩樣東西的幫助，第一個就是 Ajax 技術的愈發成熟：只需要在首次傳送時，傳入 HTML 檔以及 CSS 或 Javascript 檔，其餘資料可利用 AJAX 來取得，XML 或 JSON 格式資料來完成局部更新。
```javascript=
$.ajax('/api/getUser')
 .done(function(data){
    $('#data-div').html(data);
 })
```

再來就是 REST 設計風格的整合，以系統標準化的方式定義資源，可以參考[這篇](https://ihower.tw/blog/archives/1542)，能夠直接更改 URL 的參數來取得特定資料，因為它使用固定格式的 URL 進行資料存取，易於測試。

從以前 PHP 直接輸出整份 HTML，到前端改用 Ajax 串接，現在後端只要專注提供資料、產出 API，而前端的工作，不再只是把設計好的 UI 製作成 HTML 文件，需要學習以 JavaScript 來撰寫 Application Logic，或是呼叫 REST API，拿到 JSON 格式的資料，用相對應的模板生成內容。

### 參考資料
* [前端小字典三十天【每日一字】– SPA](https://ithelp.ithome.com.tw/articles/10160709)
* [前後端分離與 SPA](https://blog.techbridge.cc/2017/09/16/frontend-backend-mvc/)
* [單一頁面應用程式](https://medium.com/@mybaseball52/%E5%96%AE%E4%B8%80%E9%A0%81%E9%9D%A2%E6%87%89%E7%94%A8%E7%A8%8B%E5%BC%8F-c98c8a17081)
* [為什麼網站要做成 SPA？SSR 的優點是什麼？](https://medium.com/schaoss-blog/%E5%89%8D%E7%AB%AF%E4%B8%89%E5%8D%81-18-fe-%E7%82%BA%E4%BB%80%E9%BA%BC%E7%B6%B2%E7%AB%99%E8%A6%81%E5%81%9A%E6%88%90-spa-ssr-%E7%9A%84%E5%84%AA%E9%BB%9E%E6%98%AF%E4%BB%80%E9%BA%BC-c926145078a4)
* [認識 Single Page Application（SPA）](https://www.jollen.org/blog/2014/09/single-page-application.html)
