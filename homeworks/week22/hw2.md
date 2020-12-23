## 請列出 React 內建的所有 hook，並大概講解功能是什麼


## 什麼是 Hook？
Hook 是一種重複使用邏輯的方法，能用來在不同的 Component 之間重複使用 stateful 邏輯，而 state 本身是完全獨立的。
#### Hook 規矩
* 只能在最上層呼叫 Hook。不能在迴圈、判斷式、或是嵌套 function 中呼叫 Hook
* **只在 React function component 呼叫 Hook**（自定義的 Hook 也是），不要在一般 JavaScript function 中呼叫 Hook，因為這關連到它們連結的問題
* 客製化 Hook：指的是用 `use` 開頭的方法，且有呼叫到其他 Hook，等於說可以將好幾種功能封裝在一起


>**Q: React 怎麼知道哪個 component 對應到哪個 state？如何將 Hook 呼叫與 component 關聯？**

每一個 component 有一個「memory cell」的內部列表。

它們是我們可以放入一些資料的 JavaScript object，當你呼叫像是 `useState()` 的 Hook，它會讀取目前的 cell（或因為是第一次 render 而初始化它），每次重新渲染的時候都可以從這個地方拿到該狀態，並將指標移動到下一個 state，讓 Function Component 可以保存自己的狀態。

就算多個 `useState()` 的呼叫，它們都能取得自己獨有的 local state。


### #1 內建 Hook：useState
```jsx=
const [state, setState] = useState(initialState);
// 會回傳一個 state 的值，以及更新該 state 的方法
```
* 呼叫用途：宣告了一個會被 React 保留的變數
* 參數：唯一的參數要放初始值，可以是 string、number、object 各種型態
* 回傳：一對數值，目前的 state 值和可以讓你更新 state 的方法（可以從 event handler 或其他地方呼叫它來更新），setState 方法接收先前的 state，並回傳一個已更新的值
```jsx=
import React, { useState } from 'react'; // destructuring

function Example() {
  // 宣告一個新的 state 變數「count」及更新變數的方法是「setCount」
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
從 React 引入 `useState` Hook，呼叫它是用來在 function component 裡面保留 local state。

舉例來說，在 `<Example />` 元件中我們呼叫了 useState 去宣告一個名為 count 的變數，一般情況下，變數會在 function 結束時就消失，但 state 變數卻會被 React 保留起來，也就是React 在 re-render`<Example />` 元件時會記住目前的值，仍然保留這些 state，讓 function component 可以管理它的內部狀態，使用 setCount 方法將會更新 count 的值，給一個 newState 直接取代。

在一個 Component 之中可以宣告多個 State，不再需要把各種無關的 State 硬是列在同一個 Object，操作 setState 時也不用同時考慮所有狀態該如何調整。

注意：由於 **setState 並非即時更新、是非同步的**，因此接下來也會用別的 hook 來解決這個問題。

> **補充：initialState**

initialState 參數只會在初始 render 時使用，在後續 render 時會被忽略。
如果初始 state 需要通過複雜的計算來獲得，你可以傳入一個 function，它回傳的東西將成為初始值，只在初始 render 時被調用：
```jsx=
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```
> **跳過 state 更新**

如果 React 偵測到 state 值有所變化就會 re-render 該元件，反之如果還是傳入一樣的值，React 將會跳過子元件的 render 及 effect 的執行，不過它還是需要在跳過 render 之前先渲染它本身的 Component。

---

### #2 內建 Hook：useEffect
```jsx=
useEffect(didUpdate);
// 傳入一個指令
```
預設情況下，`useEffect` 會在每一個完整 render 結束後執行。

#### 為什麼要呼叫 useEffect
使用這個 Hook，React 就知道你的 component 在 render 後要做什麼事情。而在 component 內部呼叫 useEffect，讓我們可以拿到 state 和任何 props

有一些操作，比如網路請求、監聽事件、訂閱、或手動改變 DOM 等等，被稱為「side effect」，他們可能會影響其它元件，或是在 render 期間還不能觸發的操作，都會寫在 `useEffect` 裡面，等到 render 完、DOM 更新之後才執行的程式碼。

#### 每次 render 完都要呼叫嗎
但每次 render 就執行一次，並不符合實際上的應用，我們可以選擇讓它在某些值改變的時候才執行，類似監聽某個值的變化來設定 useEffect 執行條件。參考 [有條件的觸發 effect](https://zh-hant.reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect)，如果它的依賴有改變才會觸發 `useEffect`，確認 array 裡有包含：
1. 所有在該 component 中會隨時間而變的值（例如 props 和 state）
2. 在該 effect 中使用到的值

```jsx=
useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source],  // 只有當 props.source 改變時才會重新建立 subscription
);
```

> **Tips：初始化使用**

如果想要 effect 只執行和清除一次（就是 mount 和 unmount 的時候），比如只會在第一次 render 要呼叫的 API，我們可以在第二參數傳遞一個空陣列 （`[]`），意思是，`useEffect` 沒有依賴任何在 props 或 state 的值，所以它的條件不會改變，它永遠不會被再次執行。


#### useEffect 的回傳用途：清除 effect
當元件要被 unmount 時，我們需要清除 effect 所建立的資源時，同樣是使用 `useEffect`，回傳一個 function，告訴 React 在移除元件前要如何「清理/處理」舊的資源
```jsx
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // Clean up the subscription
    subscription.unsubscribe();
  };
});
```
---

### #3 內建 Hook：useContext
讓你不需要巢狀化就可以訂閱 React context，再也不用透過 render props 來得到 value，useContext 則是接收一個 Context 然後直接回傳 Context 裡的資料。

先在最上層 Component 以 createContext 建立一個 Context Component ，並將要傳遞的資料放到它的 value 中，接著在下層元件或者更下層，便能直接將 Context Component 傳給 useContext，進而取得 value 裡的資料。這個做法解決了：
1. 透過 Props 傳遞資料時常常會經過太多層的問題（Props drilling）
2. 明明不需要該筆資料的 Component 卻擁有資料的情況
```jsx=
// 建立一個 Context
const ContextStore = React.createContext({
  todos: []
})
// 使用 ContextStore
function Application() {
  return (
    <ContextStore.Provider value={{todos: ['run']}}>
      <Todos />
    </ContextStore.Provider>
  )
}
// Todos
function Todos() {
  const value = React.useContext(ContextStore)
  
  return (
    <React.Fragment>
      {
        value.todos.map(todo => <div key={todo}>{todo}</div>)
      }
    </React.Fragment>
  )
}
```
---
### #4 內建 Hook：useRef
主要有兩個功能，一個是存放 mutable 的值，一個是可以抓取 DOM 節點。

#### 1. 存放可變的值
跟使用 useState 的改變值區別在於，它不會導致 re-render。useRef 回傳一個可變的 ref object，它的 `.current` 屬性被初始化為傳入的參數，回傳的 object 在元件的生命週期都將保持不變。

```jsx
const refContainer = useRef(initialValue);
```
#### 2. 抓取 DOM
useRef 更多的應用，是可以作為讓我們抓取到 DOM 節點的 hook。

呼叫 useRef 建立出一個物件實體，null 表示初始值設定為 null，將建立好的物件丟入我們要抓取的 DOM 元素的 ref attribute 中，做完這件事可以想像成我們對這個 input 有了控制權，`<input />` 的 DOM 透過 ref 存進 inputRef。

```jsx=
const inputRef = useRef(null);
<input ref={inputRef} placeholder="Please input somthing"/>
```
對現在綁定的 DOM node 做操作，需要到 `.current properity` 中
```jsx=
// 有了 useRef 就可以做到例如頁面刷新後自動 foucs 在某個欄位
const handleClick = () => {
	inputRef.current.focus();
}
```
---
### #5 內建 Hook：useMemo、useCallback 和 memo

在 Function Component，容易觸發重新渲染，如果遇到大型的網站，有大量的元件、子元件不斷被 re-render，將造成瀏覽器的重大負擔。而要進行 React 優化，最常見就是透過 useMemo()、memo 和 useCallback() 來搭配使用。

#### 1. memo

父層狀態變了，底下的每個子元件都會做 re-render，就算它依賴的 props 或 state 沒有改變，React 提供了 `memo` 來幫助我們解決這個問題，它是專用於 Component 的方法。

將元件用 `memo` 包起來， memo 會幫忙檢測它的 props 是否有變動，減少元件被渲染的機會，讓 React 幫我們記住原本的 props。
```jsx
cosnt MemoButton = memo(Button)
```
然而，`memo` 是利用 shallowly compare 的方法確認 props 的值是否一樣， shallowly compare 在 props 是 Number 或 String 比較的是數值，分數值不受影響，但當 props 是 Object 時，比較的卻是記憶體位置（reference）。正因為父元件重新渲染時，在父元件宣告的 Object 是會被重新分配記憶體位址，我們在這時候利用 `memo` 來防止重新渲染就會失效。

所以，`memo` 提供了第二個參數，讓我們可以自訂比較 props 的方法。

#### 2. useCallback 使用
除了上述方式，可以利用 `useCallback()` 讓 React 可以自動記住 Object 的記憶體位址
```jsx=
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
裡面如果傳的是會重新產生的 object 或 function，就是記憶體可能變動的東西，用 `useCallback` 去把該他們包裹，React 幫你記憶起來，用法和 useEffect 有點像，第二個陣列參數放要偵測變動的東西（dependency），在父元件重新渲染時，不重新分配記憶體位址，而造成子元件重複渲染。

而常常讓人搞混的 `useMemo()`，其實和父元件無關，它主要用在讓複雜的程式碼或運算，不要在重新渲染時再次執行。
```jsx=
cosnt s = useMemo(() => {
    return {
        color: value? 'red': 'blue',
    }
}, [value]) 
```
---

<br>

## 請列出 class component 的所有 lifecycle 的方法，並大概解釋觸發的時機點

#### 什麼是 Component 生命週期？
不同於 function component，class component 裡面有許多內建函式，他們分別對應一個元件從準備、渲染到頁面、狀態更新後重新渲染、從頁面上移除前......等各個階段（時間點），組成了所謂的 Lifecycle。
這些組合 Lifecycle 的方法，讓我們得以掌握一個元件的生命週期，在開發過程中某些特定時刻能執行我們需要的程式，例如載入完元件後才去非同步抓取資料，更新 props 觸發處理事件。

### 一、生命週期各個階段
#### #1 Mounting 階段：會在元件被建立時被執行
當一個 component 被建立且加入 DOM tree 中時，其生命週期將會依照下列的順序呼叫這些方法：
* constructor()
* static getDerivedStateFromProps()
* render()
* componentDidMount()

#### #2 Updateing 階段
當 prop 或 state 有變化時，就會產生狀態更新。當一個 component 處於更新階段，其生命週期將會依照下列的順序呼叫這些方法：

* getDerivedStateFromProps()
* shouldComponentUpdate()
* render()
* getSnapshotBeforeUpdate()
* componentDidUpdate()

#### #3 Unmounting 階段
當一個 component 被從 DOM 中移除時，以下方法將會被呼叫：
* componentWillUnmount()

#### #4 錯誤處理
當一個 component 在 render 過程、生命週期、或在某個 child component 的 constructor 中發生錯誤時，會呼叫以下方法處理：
* getDerivedStateFromError()
* componentDidCatch()

![](https://iamian.cc/static/56e1ae1a077d66ecc3899de3eec3e5d6/acfc1/react-life.png)


### 二、常用的生命週期方法

#### 1. constructor
`constructor()` 會在其被 mount 之前被呼叫，用來建構並初始化物件，這邊繼承 React.Component，當你需要初始化 state 或綁定方法時，才需要實作它。

建立 constructor 時，你應該先呼叫 `super()`，帶入 props 參數，否則 `this.props` 的值會出現 undefined 問題。參考 [Why Do We Write super(props)?](https://https://overreacted.io/why-do-we-write-super-props/) 一文，super 會繼承父類別（指 React.Component），當我們呼叫過後，它才會配置 `this.props = props`，這時才能在建構子中使用 this。

```jsx=
constructor(props) {
  super(props);

  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```
* 只有在 constructor 裡面才可以指定 `this.state` 值，其它地方則需要使用到 `this.setState()` 方法
* constructor 裡面只用來設置初始化和綁定方法
* 不要做任何會產生 side effect 或 subscription 的事，那些應該在渲染完之後進行，例如使用 `componentDidMount()`

> **Q: 常見錯誤：直接複製 prop 的值到 state 中！**

```jsx=
constructor(props) {
 super(props);
 // 請不要這樣做！
 this.state = { color: props.color };
}
```
1. 多此一舉，可以直接用 this.props.color
2. 產生 bug，prop 產生的更新根本不會出現在 state 中
3. 不能讓 state 依賴 prop


#### 2. render
`render()` 是 class component 中唯一一個**必須實作**的方法。

當 render 被呼叫時，它將會檢視 this.props 和 this.state 中的變化，並回傳透過 JSX 建立的 React element、Fragment、Portals 或 null，也就是說執行 setState、更新父元件傳遞的 props，都會執行到 `render()`。

* pure function
* 不會改變 component 的 state，每次呼叫時都會回傳同樣的結果
* 不會直接和瀏覽器有所互動

>**Q: 更新狀態一定會呼叫到 render 嗎？**

大部分都會，唯一的例外情況是當 `shouldComponentUpdate()` 回傳的值為 false 的話，render() 將不會被呼叫到。



#### 3. componentDidMount
在 component 被加入 DOM tree 中後，`componentDidMount()` 會馬上被調用。
可以在該方法裡面呼叫 `setState()`，雖然會觸發一次額外的 render，但是是在瀏覽器畫面更新之前發生，使用者不會看見兩次 render 中過渡時期的狀態，只是可能導致效能上問題。
* 執行 ajax，適合進行網路請求
* 設定 subscription
* 綁定 DOM 事件


#### 4. componentDidUpdate
```jsx=
componentDidUpdate(prevProps, prevState, snapshot)
```
用途和 componentDidMount相似，區別在於它是用在 Updating 階段，可以在這裡寫
1. 對 DOM 進行運作的處理
2. 網路請求

記得設定條件，例如比較前後的 prop，不然每一次重新渲染都會執行一遍，很影響 component 效能

#### 5. componentWillUnmount
在 component 要從畫面上被移除前（unmount）馬上被呼叫，在這個方法內進行任何狀態的清除，像是取消計時和網路請求或是移除監聽。這個 component 永遠不會再重新 render。

常用的生命週期方法大概就這幾種，其它比較少用的可以參考這篇 [React.Component](https://zh-hant.reactjs.org/docs/react-component.html) 和 [State 和生命週期](https://zh-hant.reactjs.org/docs/state-and-lifecycle.html) 有詳細的介紹與範例。

### 三、元件渲染順序
* Mounting
父元件先執行到 `render()` 後，再來開始執行子元件的 Mounting 生命週期，最後執行完子元件的 `componentDidMount()` 後，再回頭執行父元件的 `componentDidMount()`

* Updating
父元件執行到 render 後，換子元件執行直到 `getSnapshotBeforeUpdate()`，會再回父元件執行 `getSnapshotBeforeUpdate()`，然後再執行子元件的 `componentDidUpdate()`，再回父元件執行 `componentDidUpdate()`

* UnMounting
父元件先執行 componentWillUnmount，再來是子元件執行

<br>

## 請問 class component 與 function component 的差別是什麼？
在 hook 出來以前，其實就有 class component 和 function component 兩種寫法，不過當時只有前者可以擁有 state 和 lifecycle，function component 只用來單純呈現資料（內容寫死或是透過 props 傳入），但是 hook 的出現改變了 function component 不能擁有 state 的問題被解決（useState），也變相讓它擁有類似生命週期方法的操作（useEffect）。

前面已經分別介紹過生命週期和 hook，以下就他們的差別來講解：

#### 1. 渲染的差別
function component 就是一個單純回傳 JSX 的函式，class component 是一個繼承 React.Component 的 JavaScript 物件，它裡面必須調用一個 render 方法，這個方法會回傳 JSX。

#### 2. props 傳遞
```jsx
<Component name="Molly" />
```
* 在 function component 是作為引數 props 傳入
* 在 class component 因為是物件，呼叫 `constructor()` 來建構並初始化，使用 this 來引用
```jsx=
// function component
const FunctionComponent = ({ name }) => {
 return <h1>Hello, {name}</h1>;
};


// class component
class ClassComponent extends React.Component {
  constructor(props) {
  super(props);
}
  render() {
    const { name } = this.props;
    return <h1>Hello, { name }</h1>;
 }
}
```

#### 3. 處理 state
在以前 funciton component 是沒有狀態的，直到 `useState` 這個 hook 出現解決了這個問題，我們得以寫成 Stateful Function Component。

每次 render 都會呼叫 useState，但只有第一次 render 會建立資料結構來儲存，並在之後 render 時使用某個指標去逐一取用，才能拿到同一個 State，可以參考 [React hooks: not magic, just arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)。


#### 4. 優化效能提升
* class component：即使狀態沒變化，只要調用到 setstate 就會觸發重新渲染
* function component：只有狀態值真正改變時，才會觸發渲染，換句話說就是提升了整體效能

#### 5. 生命週期方法的實現
不像 class component 是繼承 React.Component，function component 沒辦法擁有那些內建的生命週期方法，例如 `componentDidMount()` 來處理 side effect，我們會希望在更新 DOM 之後執行我們的 effect，像是網路請求資料、設定 subscription 和 event handler 或手動改變 DOM 等等。

##### * 無需清除的 Effect
在 React 更新 DOM 之後執行一些額外的程式碼。網路請求、手動變更 DOM、和 logging，直接執行，就不用再去記得它

* class component：將 side effect 放入 `componentDidMount()` 和 `componentDidUpdate()`
```jsx=
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

// 因為希望在 mount 和 update 階段都會發生（每次 render 後），這裡得寫兩次
  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```
* funciton component
在元件之內呼叫，透過使用這個 Hook，你告訴 React 你的元件需要在 render 後做一些事情。React 將記住你傳遞的 effect，並在執行 DOM 更新之後呼叫它。

    - 在 component 內部呼叫 useEffect，可直接存取到 state 和 props，因為它已經在 function 範圍內了，且 React 保證 DOM 在執行 effect 時已被更新
    - 雖然預設 DOM 更新後呼叫，也可以透過 useEffect 第二個參數的設置來優化效能，規定比對條件才執行，而不是每次重新渲染就呼叫
    - 使用多個 Effect 來分離關注點
    - 想執行一個 effect 並且僅（在 mount 和 unmount 時）將其清除一次，則可以傳遞一個空 array（`[]`）作為第二個參數 => effect 不依賴於任何 props 或 state 的值，因此它不需要重新執行
```jsx=
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
> **Q: 每次 render 後都會執行 useEffect 嗎？**

把 useEffect 視為 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 的組合，與其把 useEffect 考慮在 mount 或 update 階段都執行，不如認為它是每次 render 後就執行。

<br>

##### * 需要清除的 Effect
有些設定對某些外部資料來源的 subscription，這種 effect 需要進行清除，以免造成 memory leak。

* class component：寫在 componentWillUnmount 方法裡面，在元件移出畫面前清除
```jsx=
componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
}
```
* function component：可選的清除機制
每個 effect 都可以選擇是否回傳一個會在它之後執行清除的 function。我們可以把新增和移除 subscription 的邏輯保持靠近，因為它們都屬於同一個 effect！
```jsx=
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // 指定如何在這個 effect 之後執行清除：
    return function cleanup() {
      ChatAPI.unsubscribeFromStatus(props.friend.id, handleStatusChange);
    };
  });
```

---
<br>

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？
在前周介紹 React 時，有說過畫面上所有的變動都應該由 React 來控制，畫面顯示來自於資料，我們只需要關注資料狀態即可，所以 uncontrolled 跟 controlled component 最大的差異就在於「**component state 是否由 React 控制**」。

以實作表單處理 form element 為例：

* controlled：指的是透過 useState 來保存資料，利用 setState 來設置表單
* uncontrolled: 指的是顯示的值沒有綁定 state，單純透過 ref 來取值，跟傳統作法一樣由 DOM 本身所處理的


#### 究竟何時需要 uncontrolled component
* form element 預設值：表單元素指定 defaultValue attribute
* 特殊 form element：像檔案輸入標籤 `<input type="file" />` 永遠都是 uncontrolled component，因為它的值只能被使用者設定，得使用 File API 來與檔案之間互動
* 其值和其他元件沒有進行連動

uncontrolled component 雖然簡單，然而當需要控制的 DOM 數量一多起來， 需要手動操作的量就變得繁重， 而 controlled component 是由資料來更動畫面，再加上表單時常會有格式驗證的需求，建議多採用 controlled component 來操作。





### 參考資料
* [Hook 概觀](https://zh-hant.reactjs.org/docs/hooks-overview.html)
* [使用 State Hook](https://zh-hant.reactjs.org/docs/hooks-state.html)
* [Hooks API 參考](https://zh-hant.reactjs.org/docs/hooks-reference.html#usecontext)
* [使用 Effect Hook](https://zh-hant.reactjs.org/docs/hooks-effect.html)
* [React Hooks (上)-useState&useEffect](https://medium.com/@Lieutenant1992/react-hooks-%E4%B8%8A-usestate-useeffect-37f45056fea8)
* [【Day 24】 useRef](https://ithelp.ithome.com.tw/articles/10221937)
* [React 性能優化那件大事，使用 memo、useCallback、useMemo](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-optimize-performance-using-memo-usecallback-usememo-a76b6b272df3)
* [React.Component](https://zh-hant.reactjs.org/docs/react-component.html)
* [React Life Cycle 生命週期更新版，父子元件執行順序](https://https://iamian.cc/reactlife/)
* [【Day 8】Class component && Functional component](https://ithelp.ithome.com.tw/articles/10214751)
* [Understanding Functional Components vs. Class Components in React](https://www.twilio.com/blog/react-choose-functional-components)
* [Uncontrolled Component](https://zh-hant.reactjs.org/docs/uncontrolled-components.html)

