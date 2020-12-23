## 為什麼我們需要 React？可以不用嗎？
React 是一 JavaScript 套件，它在 MVC 架構中實際上是負責 View（介面）的部分，而非一套框架，而要討論為什麼需要 React，就要從畫面談起。

傳統上，我們將 JS 和 HTML、CSS 分離，其實這樣造成的問題有
1. 需要在多個檔案間來回切換
2. 維護性差，無法從單一檔案中了解結構，難以將 class 和行為連結
3. 畫面和資料想要保持一致，得自行做雙向狀態維護

React 主要思維是「元件化」，它賦予我們用很簡便的方式建構一個新元件的能力，在這個元件創造之時已經定義好了樣式，甚至可以透過傳遞參數（props）來改變自身的行為和樣式，達成邏輯和 UI 共存的目的。

**要知道，顯示邏輯和模板中間，其實存在很強的關聯**
以前在 HTML 建立標籤，然後到 CSS 檔案添加不同狀態下的樣式，例如 TodoList 完成/未完成狀態顯示不同顏色的按鈕，然後到 JS 裡面真正實作它們之間的切換邏輯，不僅得自己操作 DOM、將把畫面和功能連結起來，還要寫狀態更新，一旦遇到大型的架構，更是難以維護。

仔細想想，資料的狀態（state）對應某個樣式（UI），本來就是指同一件事，只是表達形式不一樣而已

![](https://i.imgur.com/W2Lr9e1.png)

以前因兩者分離，我們不得不自行寫邏輯將它們連結，一旦一方切換狀態、另一方就要更新，耗費大量心力來關注兩邊，當介面複雜時，容易出現資料和畫面不同步的 bug。

### React 的核心
選擇 React，正是因為它能夠幫我們解決這些問題。

#### * 元件化的設計（Component-Based）
用簡單直觀的 JSX 語法自定義要呈現的 DOM 結構，通過接受不同的參數 props，來區分資料在哪些狀態下、介面應該分別長什麼樣子。

不再需要手動操作 DOM，**直接將資料和元件進行綁定，實現自動更新**，讓畫面的一切由資料本身決定，一旦資料改變時就牽動 UI 變動，每當 React 偵測到 props 或 state 更新時，將自動重繪整個元件，不再需要分別維護資料和畫面的一致性，讓 UI 保持穩定，開發者只需要關注資料的狀態。

當然還一些其他好處，比如具有 JavaScript 基礎就能快速上手、幫你實現跨平台或是性能好等優點，但這些都是次要，React 的核心設計就是 Component 元件化和 State 狀態管理。

#### 優點
* 模組化、維護性佳，還可以重複利用的元件 Component
* JSX 跟 HTML 語法相似，方便描述 DOM 結構
* 單向資料流，不會出現資料和畫面不一致的情況，因為任何改變全都由資料操作、自動渲染
* 有 Virtual DOM 能最佳化複雜的 UI 效能
* React 寫 UI 就像組積木一樣，具有擴展性

#### 缺點及限制
* 學習門檻高，需要一定的時間來熟悉 React 各種用法和工具
* 只處理 View/UI 的部分
* JSX 語法，寫起來像是在 JavaScript code 中夾雜 HTML

整體來說，React 的出現賦予開發者創建、組織、變化的能力，元件化設計讓人更能思考整體架構，更直觀，聚焦在資料的變化，當然還有許多好用的框架/套件存在，可是如果一個專案會有「重複的 UI」、「時常變化的資料」等需求，其實就很適合使用 React。

</br>

## React 的思考模式跟以前的思考模式有什麼不一樣？

### 一、基於元件化思考（Component）
React 中最基本的單元是元件（Component），每個元件又能包含一個以上的子元件，就像積木一樣，可以依照開發上的需求拼接，成為一個組合式的元件。理解 Component 具備的特性，才知道該怎麼思考：
* 組合性（Compose） 

比如一個基本的表單有 `<form>`、`<input>`、`<button>` 等要素，可以將他們組合成為一個新元件，擁有自行創造、組織和變化的可能性
```jsx=
// <MailForm />

<form>
    <input type="text" name="email" />
    <button type="submit"></button>
</form>
```
另外，使用宣告式（Declarative）也讓程式碼更容易理解
```jsx=
// 使用宣告式（Declarative）UI 設計很容易可以看出這個元件的功能
<MailForm />
```
* 封裝性（encapsulation）

以前得將 HTML、CSS 和 JavaScript 分離，現在竟然能將邏輯和 UI 共用，不再適用傳統的模版思考（template）、不再需要模板語言。而 JSX 可以寫出類似 HTML 的語法，並透過 babel 將內容會轉化成 JavaScript 讓瀏覽器讀懂。
```jsx=
function App() {
  const [value, setValue] = useState("");
  return (
    <div className="App">
      <input
        type="text"
        value={value}
      />
      <button onClick={handleButtonClick}>Add Todo</button>
    </div>
  );
}
```
* 複用性（Reuse）

能夠最大化運用之前寫的程式碼，React 把 UI 切分為獨立並可重複使用的單位，並且每個單位可以抽出來獨立運作。

> 為什麼可以複用？關於這點，我們得先探討── 元件（Component）是什麼樣的存在？

在 React，一般用 JSX 來描述我們所需要的 DOM elements 結構（它可以用類似 HTML 語法），這些描述結構就是 React element，可以想像 React element 是機器的設計圖，而 React Component 就是機器，一台根據 React element 設計出來的機器，比如下圖放了數個 `<Line />` 元件，等同於一台台 `<Line />` 機器，每台都是由同一張設計圖出來的，他們構造相似，但彼此都是獨立的、互不干擾。

![](https://static.bookstack.cn/projects/reactjs101-zh-tw/Ch03/images/component.png)


### 二、單向資料流（Unidirectional Data Flow）
結構雖然差不多，Componenet 卻能依照設定檔的不同來作調整。

它根據不同的 state 和 props，出現對應的顯示結果（參考下一題），更準確來說，**唯一能影響 UI 變化、觸發 Component 重新渲染的關鍵就是── 資料變動（props 或 state）**。

與我們過去的習慣截然不同，是當 React 發現 props 或是 state 更新時，就會重繪整個 UI，而不再像以往我們要自行寫顯示邏輯連結兩者，React 藉由「資料一有變動」就全部重繪（Always Redraw）方式，讓我們只需聚焦在資料本身的狀態，實現了單向資料流，讓狀態管理更清晰。

<br>


## state 跟 props 的差別在哪裡？
在 React 中常常會到「props 或 state 更新時，就會自動渲染」這一句話，透過前面的了解可以知道他們兩者都代表資料來源，但是差別在哪裡？
* props
上層元件透過 props 傳遞給下層元件的資料，當下層元件一接觸到它，就會做出對應的變化，props 是一個 JavaScript Object 內容，是從外部傳進來元件的變數，不能改變。

如範例，在上層元件 tag 中指定 `name` 屬性，它會統一放在 Object 作為參數（props）傳進 Welcome 這個元件，元件要存取到資料只需要透過 `props.name` 拿。
```jsx=
function Welcome(props) {     //props
  return <h1>Hello, {props.name}, {question}</h1>;
}

const element = <Welcome name="Mike" />; // component tags
```

* state
是在元件（Component）內部進行定義，由元件內部進行初始化、自行保存、控制以及修改。它可能會因為上層元件遞進來的 props 而改變，也可能是元件自身行為而改變，而 state 的變動同樣也會引起元件變化。

```jsx=
function App() {
  const [value, setValue] = useState("");   // state

  return (
    <div className="App">{value}</div>
  );
}
```

其實 props 很好理解，它就像以前我們用 function 會拿到的引數，引數傳進來時值就固定了，它是唯讀、不可變的。

所以，兩者最大的差異在於 state 可以被改變。只不過，並非用賦值方式直接改值，因為狀態（state）本身是 immutable，但我們可以安排一個新的狀態給它，它一改變就會觸發元件重新渲染，可呼叫 `setState()` 方法，來更新元件的資料狀態，並且會呼叫 render 方法來更新 UI。

#### Q: props.children 是什麼？
props 傳入的 Object 屬性，和 Component tag 的屬性是一一對應的，但有個例外就是 `props.children`，它是內建的屬性，表示該元件下的**所有子元件**，即 tag 與 tag 之間包裹的全部東西
```jsx=
// 這裡的 props.children 就是 `<h1>早安</h1><p>要去哪裡</p>`。
function FancyBorder(props) {
  return (
    <div>
       {props.children}  
    </div>
  );
}


function WelcomeDialog() {
  return (
    <FancyBorder>
      <h1>早安</h1>
      <p>要去哪裡</p>
    </FancyBorder>
  );
}
```


#### Q: 為什麼說要少用 state、多用 props？
沒有 state 的叫做無狀態元件，有 state 就是有狀態元件，在 React 一般會鼓勵多寫無狀態元件，要使用 props 而不是 state。

原因其實很簡單，從上面了解到 props 在相同的输入下，它始終呈現同樣的輸出，因為它本身是不可變的，元件的變動可以預測，但 state 不一樣，state 是元件內部自行管理的資料，自行控制，正因為**狀態會帶來管理上的複雜性**，state 是保留給互動性高、會隨時改變的資料。

React 的核心精神是**單向資料流**，從 Component 的上層往下流，所以鼓勵多寫無狀態元件，盡量讓共用的 state 能往上層元件放，下層再透過 props 拿到，維持資料流的一致。

### 參考資料
* [我们为什么需要 React？](https://www.zhihu.com/question/47161776)
* [React 教學 - React JavaScript UI Library](https://www.fooish.com/reactjs/)
* [React 元件 (Components) | Props](https://www.fooish.com/reactjs/components-and-props.html#props-%E6%98%AF%E5%94%AF%E8%AE%80%E7%9A%84-read-only)
* [管理 React 元件的內部狀態](https://medium.com/4cats-io/%E7%AE%A1%E7%90%86-react-%E5%85%83%E4%BB%B6%E7%9A%84%E5%85%A7%E9%83%A8%E7%8B%80%E6%85%8B-be53abe19849)
* [react~props和state的介紹與使用](https://www.itread01.com/content/1545273246.html)
* [react中props和state有什么区别?](https://juejin.im/post/6844903978061266957)
* [ReactJS 與 Component 入門介紹](https://www.bookstack.cn/read/reactjs101-zh-tw/Ch03-reactjs-introduction.md)
* [Components 與 Props](https://zh-hant.reactjs.org/docs/components-and-props.html)


