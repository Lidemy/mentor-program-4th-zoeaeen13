## Redux middleware 是什麼？
在認識 Store、Action、Reducer 等基礎概念後，想要進一步處理非同步行為、網路請求、Logging、routing，就要學習 Redux Middleware。Redux Middleware 對 Redux 來說就像是一個**中介者**的角色，它可以在「**Action 被指派後、進到 Reducer 前**」的階段先進行額外操作，例如處理 side effect。

原本，我們需要先 call API 拿到 response，再將 response 結果放入 Action 的 payload，才會指派 action 到 reducer 更新，以下圖為例，當今天我們有了 Middleware 後就可以藉由它的幫助，在 dispatch action 之後、進入 reducer 前，先到 middleware 處理別的東西，處理完之後再將 action 交由 reducer。

![](https://miro.medium.com/max/945/0*pjOSEDPecBxyfDro)

### Async Action：非同步與 Redux 資料流結合
當呼叫一個非同步 API，有兩個關鍵時刻應該要可以改變 state
* 開始呼叫的時候
* 當你收到 response 或 request failed 的時候。
```javascript=
initialState: {
    isLoading: null,
    data: null,
    errMessage: null,
}
```

對於 API 請求而言，開發者可能會需要 dispatch 三種不同的 action：
1. 一個告訴 reducer 開始網路請求的 action，比如設定 `state.isLoading = true`
2. 一個告知 reducer 請求成功完成的 action，將新的資料更新到 `state.data` 及設定 `state.isLoading = false`，藉由這兩個屬性就知道 UI 如何處理顯示新的資料
3. 一個告知 reducer 請求失敗的 action，有時候 reducer 也會想要儲存錯誤訊息顯示給使用者知道

### Redux thunk
原本我們的 action creator 都是回傳一個 action 物件，意味著它只會指派一件事情，透過 redux-thunk 這個特別的 middleware，**action creator 可以回傳一個 function 來取代 action 物件**。
```javascript=
function APP() {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (id) {
      // 放 getRecentPost() 這個 action creator
      dispatch(getRecentPost(id));
    }
  }, [id, dispatch]);
}
```
可以看到 getRecentPost 這個 action creator 裡面，實際上是回傳一個另一個 function，而不是回傳一個 action 物件，所以它又被稱為 **thunk action creator**，它回傳的東西是一個 thunk（thunk 指的是會回傳另一個函式的函式）。

而 Redux thunk 這個 middleware 會知道如何去處理 thunk，它會將 **dispatch 方法** 作為參數傳遞給 thunk function，讓它可以自己 dispatch action。
```javascript=
// 簡化版
const getRecentPost = (id) => (dispatch) => {
  dispatch(setLoading(true))
  
  return fetch(`https://student-json-api.lidemy.me/posts?id=${id}`)
  .then(response => response.json())
  .then(json => {
      dispatch(setRecentPost(json.data))
      dispatch(setLoading(false))
  })
  .catch(err => {
      dispatch(setError(err.message))
      dispatch(setLoading(false))
  }) 
}


// 還原了解流程
function getPosts(id) {
    // thunk function
    function handle(dispatch) {
        // 第一個 dispatch，告訴 reducer 準備網路請求
        dispatch(setLoading(true))
        
        // call API
        return fetch(`https://student-json-api.lidemy.me/posts?id=${id}`)
        .then(response => response.json())
        .then(json => {
            // 第二個 dispatch，用 API 呼叫的結果來更新 state
            dispatch(setRecentPost(json.data))
            // 第三個 dispatch，告訴 reducer 已結束網路請求
            dispatch(setLoading(false))
        })
        .catch(err => {
            // 第四個 dispatch，做錯誤處理
            dispatch(setError(err.message))
            dispatch(setLoading(false))
        })
     }

    return handle
}
```

#### 小記
* 不使用 middleware 的話，Redux 的 store 只支援同步資料流，非同步的 middleware 會包裝 store 的 `dispatch()` 方法
* middleware 讓開發者可以 dispatch 一些 action object 以外的東西，例如：function 或 Promise，接著解譯它後再送往 reducer
* 可以 dispatch 多個 action

---

## CSR 跟 SSR 差在哪邊？為什麼我們需要 SSR？
### 為什麼要學 SSR（Server Side Rendering）？

SSR 是指伺服器渲染好，再交由瀏覽器去顯示 HTML，幾年前的網頁其實都是採用這類形式，綁資料和結合 UI 的工作都在 Server 完成，之後才整頁傳回瀏覽器。後來發現每次更新都得全畫面重新渲染，對伺服器端負荷太大、重新載入也不利於使用者體驗。

後來，在 AJAX 技術提升、RESTful API 風格興起後，漸漸有了 SPA 模式的出現，現在我們只需透過 Ajax 拿到 JSON 格式的資料，用 JavaScript 動態生成內容放在 DOM tree，達到局部更新效果，這種「**將畫面渲染工作從 Server 端移到 Client 端、並在 Client 端實作 Application Logic**」的模式，被稱為 CSR（Client Side Redering）。

![](https://camo.githubusercontent.com/ea14a8424c6a1135afc50108667845cb1d65d29088caa0117d0e3b1e6ab1bbf6/68747470733a2f2f6577772d77702e73332e61702d736f7574682d312e616d617a6f6e6177732e636f6d2f77702d636f6e74656e742f75706c6f6164732f323032302f30322f31343036343832342f73696e676c652d706167652d6170706c69636174696f6e732e6a7067)

但 SPA 也不是完美的，因為要藉由 JavaScript 處理大部分的事情（routing、拿資料、操作 DOM），前端需要一次載入大量 JS 檔案，再去計算及渲染，相較於 SSR：
* CSR 第一次跑畫面需要較長的反應時間
* URL 網址不會改變，前端還多了管理路由狀態的工作
* 伺服器會載入幾乎是空的 HTML，內容都是 JS 動態生成，有些人對 SEO 表現有疑慮

講來講去，其實最該解決的就是以下兩個問題
```
1. 第一次渲染畫面跑很久的問題（CSR 缺點）
2. 全頁渲染完之後的其它畫面變動，希望藉由 JavaScript 來動態局部更新（SSR 的缺點）
```

#### React CSR
以往瀏覽器請求 HTML 後，必須要載入 JS 檔案，然後等待 React 把元件初始化（mount 到 DOM 上），如果還要請求 API 拿資料、更新到畫面，還得花費額外的時間，才讓使用者看到第一次渲染的畫面。


#### React SSR
為了解決第一畫面的問題，大家開始重新思考在 SPA 模式下運用 SSR 的可能性，這回多了一個叫「**渲染伺服器**」的東西，它適用於**第一次使用者請求 HTML，會將內容都事先放到 HTML 中**，所以使用者看到的就是一個已經包含完整內容的網頁，因為這是透過 Server 端實作出來的。

* 第一次渲染
Server 依照 URL 上的 path 來決定要渲染什麼畫面，如果要請求 API 也會處理好再產生完整的 HTML 內容，給瀏覽器直接顯示，不需要再等待 JS 載入，效能變好。

* 局部更新的渲染
接著才會去載入 JS 檔，因為這時 HTML 內容已經載好了，只需要為產生的 DOM 元素附加監聽器上去，之後的 routing、請求 API、狀態更新依然維持 CSR 模式，仍是透過 JavaScript 動態調整，可以說是結合了兩者的優點。

![](https://miro.medium.com/max/945/1*VfuoSOqCOaiP_RPovUTouA.png)
<CENTER>圖片來自 [React SSR | 從零開始實作 SSR — 基礎篇]</CENTER>

<br>

除了透過渲染伺服器幫忙把第一次畫面渲染出來，有些資料格式簡單、變化不複雜的網站也會透過另一種叫 **Prerender** 工具預先計算後，存成靜態網頁來顯示，同樣可以解決第一畫面的問題。

---


## React 提供了哪些原生的方法讓你實作 SSR？
要在 React 實作 SSR，我們需要有一個獨立的「渲染伺服器」用於第一次使用者請求畫面
* 渲染伺服器與瀏覽器端可以請求 API
* 渲染伺服器會在使用者請求 HTML 時，會請求 API 的資料，並將內容都事先放到 HTML 中

而其它操作仍然維持 CSR 模式，但這樣一來，就需要每一個頁面都寫出兩份顯示邏輯，所以開始有人思考是不是能讓前後端都使用同一份 JavaScript，也就是讓 JavaScript Code 可以跑在前端與後端的程式設計，讓前後端共用 JS 的開發方法，而有了 **[Isomorphic JavaScript](https://en.wikipedia.org/wiki/Isomorphic_JavaScript)** 的出現。

![](https://i.imgur.com/kq6lByb.png)

JavaScript 不是純粹前端的語言，也有運用它寫後端、跑在 Node.js 上的例子，所以我們只需要找到一個方式去切換他們在不同的時機做事，剛好 React 原生就提供了類似的方法，讓我們在第一次渲染得以實現 Server Side Rendering。

#### ReactDOMServer
* renderToString
* renderToStaticMarkup

提供了元件在伺服器端渲染的功能，它跑在 Node.js 上而不是瀏覽器，將 React Component 轉成 DOM String，並會帶上 props，渲染成原始的 HTML string 返回，這樣瀏覽器請求頁面時就可以快速加載。
ReactDOMServer 提供兩個方法可以渲染，一個是 `renderToString()` 渲染為 HTML，另一個是 `renderToStaticMarkup()` 渲染成靜態的 HTML，兩者大同小異，不過後者適用於互動性低的網站，因為它少加上了一些 React 內部自行使用的 DOM 屬性，節省大量字節。

```jsx=
import ReactDOMServer from 'react-dom/server';
ReactDOMServer.renderToString(
    <HelloButton name="Mark" />
);
```
#### ReactDOM API
* hydrate

ReactDOMServer 是將元件轉成 HTML String 輸出給瀏覽器，只有結構和樣式，並沒有包含事件綁定，所以在 Server 端渲染完頁面後，還需要再次調用 ReactDOM 的方法來處理這部分。

以前 `render()` 可以根據 data-react-id 屬性復用 ReactDOMServer 結果，找到需要綁定的事件補上，而不會重複渲染。v16 版本後 ReactDOMServer 渲染内容不再帶有 data-react 的屬性，所以改提供一個新的 API--- `ReactDOM.hydrate()`，它與 `render()` 功能相似，同樣是用來輔助渲染結果。
```jsx=
ReactDOM.hydrate(element, container[, callback])
```
要用來 hydrate 的 HTML，是由 ReactDOMServer 所渲染出來的 container，hydrate 將盡可能保留它原本的結構，在這個基礎上附加 event listener 做事件處理。

## 承上，除了原生的方法，有哪些現成的框架或是工具提供了 SSR 的解決方案？至少寫出兩種
在 Isomorphic JavaScript 概念後，有很多 SSR 框架也漸漸流行，讓前端開發者可以在原本框架基礎上稍加學習，實作出第一畫面由 Server 產生的 SSR 模式，例如
* Next（React）
* Nuxt（Vue）
* Nest（Angular）

他們分別對應到目前最多人使用的 React、Vue 及 Angular。

### 參考資料
* [Async Actions](https://chentsulin.github.io/redux/docs/advanced/AsyncActions.html)
* [React SSR | 從零開始實作 SSR — 基礎篇](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/server-side-rendering-ssr-in-reactjs-part1-d2a11890abfc)
* [前端三十｜18. [FE] 為什麼網站要做成 SPA？SSR 的優點是什麼？](https://medium.com/schaoss-blog/%E5%89%8D%E7%AB%AF%E4%B8%89%E5%8D%81-18-fe-%E7%82%BA%E4%BB%80%E9%BA%BC%E7%B6%B2%E7%AB%99%E8%A6%81%E5%81%9A%E6%88%90-spa-ssr-%E7%9A%84%E5%84%AA%E9%BB%9E%E6%98%AF%E4%BB%80%E9%BA%BC-c926145078a4)
* [React | 用實作了解 Server-Side Rendering 的運作原理](https://medium.com/starbugs/react-%E7%94%A8%E5%AF%A6%E4%BD%9C%E4%BA%86%E8%A7%A3-server-side-rendering-%E7%9A%84%E9%81%8B%E4%BD%9C%E5%8E%9F%E7%90%86-c6133d9fb30d)
* [React SSR | 從零開始實作 SSR — 基礎篇](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/server-side-rendering-ssr-in-reactjs-part1-d2a11890abfc)
* [ReactDOM](https://zh-hant.reactjs.org/docs/react-dom.html#hydrate)
* [ReactDOMServer](https://zh-hant.reactjs.org/docs/react-dom-server.html)
* [react中出现的"hydrate"这个单词到底是什么意思?](https://www.zhihu.com/question/66068748)
* [一看就懂的 React Server Rendering](https://blog.techbridge.cc/2016/08/27/react-redux-immutablejs-node-server-isomorphic-tutorial/)



