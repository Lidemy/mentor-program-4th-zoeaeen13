## 為什麼我們需要 Redux？
Redux 是一套高效的狀態管理方式，它可以幫助我們處理不同組件共享的狀態。在 React 中有一個原則是單向資料流，畫面的呈現由資料內容決定，stateless component 必須保持成 Pure Function 形式，放入一樣的 props 就呈現同樣的 UI，元件長相來自於傳入參數，這樣維護起來簡單、也易於測試，因為他們本身沒有 state。
有 state 的元件則被稱為 Smart Component，在最上層持有多個 states，然後依照需求將這些狀態一一分派給下面的 stateless component，然而，當多個 Smart Component 都需要用到同一個狀態時，或是複雜的 UI state：
1. 網路請求的回應、快取資料，以及本地端建立而尚未保存後端的資料
2. 管理 active route、被選擇的 tab、pagination 控制顯示

常見做法就是再往上放一層元件，把 state 又向上挪動，然後一層一層往下傳，這樣重構的維護成本很高，Redux 剛好可以搭配 React 解決這個棘手問題。

<BR>

#### Redux 如何解決
Redux 將所有的 State 存在元件堆疊中最上層，一個名叫 Store 的地方，可以想像是整個專案的狀態管家，用來幫助每個組件分發狀態，不用再層層傳遞，store 有幾個特性：
* single state tree
幾乎所有的 state 被儲存在一個樹狀物件，放在專案唯一的 store 裡面，把從 server 回傳的資料、本地目前的狀態都存在於此，是唯一的資料來源，讓不同元件達到狀態共享的目的
* 只有少數幾種方式可以與 store 互動
store 只能提供讀取 state、訂閱 store 和傳入特定指令（事先定義好的），不能直接從 React 元件去任意更改
* 傳入的指令是 pure function
根據傳入的東西決定資料的輸出，不會出現無法預期的 side effects，結果可預測（Predictable）

你需要什麼資料，能直接跟最外層的 Redux 溝通到，拿到 store 裡保存的資料，可在任何位置向 Redux 發一個更改指令，簡化資料層層傳遞的流程，這樣一來除了某些 UI state 外，有了 Store 之後的 React Component 幾乎都可以做到 Stateless。


## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？
下面是一個 Redux 這套工具的流程，以存錢筒為例：
1. 按下按鈕後不會直接更改狀態，而是呼叫 store 裡面的 dispatch 函式，放入一個動作名稱（'deposit'）
2. 經 `dispatch('deposit')` 呼叫，會送出一個類型名為 'deposit' 的動作（action）
4. 當 action 進入到 store
5. 通過 store 裡面的 reducer，reducer 依照 action 做出對應的狀態變化
6. 即 reducer 會拿目前的 state 結合剛收到的 action，返回一個新的 state
7. store 新的狀態會藉由 `getState()` 函式更新到 UI

![](https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

以上就是流程圖的基本解釋，接下來會更詳細說明 Redux 的各個元件是如何運作的，以 Todolist 為利：
### Action
描述會造成的狀態變化。
要改變 store 內的狀態就得透過 Action，它是一個 JavaScript 物件，必須帶有一個 type 屬性，代表要被執行的動作類型，其他屬性可選擇性填寫，他們會被放到 action 的 payload 屬性裡面。
```javascript=
// 一個新增 todo 的 action
{
  type: 'ADD_TODO',
  text: 'Build my first Redux app,
  isDone: false
}

// 一個切換 todo 狀態的 action
{
  type: 'TOGGLE_TODO',
  index: 3
}
```

然後每回都要寫一次 JavaScript 物件很麻煩，可以自己寫一個 function 回傳  Action，讓程式碼可讀性更高，這個 function 又被稱為 Action Creator：
##### Action Creator：一個會產生 action 的 function
```javascript=
// Type should be defined as counstants
const ADD_TODO = 'ADD_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'


// action creator
function addTodo(text) {
  return {
    type: ADD_TODO,
    text: 'Build my first Redux app',
    isDone: false
  }
}

function toggleTodo(index) {
  return {
    type: TOGGLE_TODO,
    index
  }
}
```
在傳統 Flux 中，是在 action creator 內才會觸發 dispatch，但是 Redux 內的 action creator 只用來產生 action，是在外面呼叫 `dispatch()` 函式後才把 action creator 結果放進去傳遞給 store。

* Action 是藉由 store 提供的 `dispatch()` 函式來傳遞到 store
* 盡量讓每個 action 中傳遞的資料越少越好，例如 index 遞增就可以寫在 store 裡面


### Reducer
Action 只是描述要發生什麼事，並非真正處理 state 如何去改變的主體，具體如何更新狀態是屬於 Reducer 的工作。
```jsx=
(previousState, action) => newState
```
Reducer 是一個 pure function，對於同一個參數會返回同樣結果，也就是它完全遵守單向資料流的精神，它會接收一個 Action，並且與原本的 state 計算後回傳新的 state，因為你不能在 Reducer 做以下幾件事：
* 改變它的參數
* 執行有 side effect 的動作，像是呼叫 API、或是 router transition 等等，那些應該在 action 被 dispatch 之前就發生才對
* 呼叫非 pure function 的動作，像是 Date.now() 或是 Math.random() 等等

#### 寫一個 Reducer，放 state 及 action
```jsx=
let id = 0
const initialState = {
  todos: []
}

// Reducer
function todoApp(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [
          ...state.todos,  // 不改變原本的 state，而是複製一份
          {
            id: id,
            content: action.payload.text,
            isDone: action.payload.isDone,
          },
        ],
      };

    default:
      return state        // default case 回傳原本 state
  }
}
```
* 不會直接寫入 state 或是改變屬性，而是回傳一個新的物件，所以複製一份或利用 object spread 運算子
* 在 default case 回傳原本的 state
* 可以有數個 reducer，用來分別管理 state 的一部分，最後再合併成一個物件
* Redux 有提供 `combineReducers()` 函式作合併，把多個 reducer 的產出合併成單一的 state tree，個別管理 state tree 的一個分支
```jsx=
import { combineReducers } from 'redux';
import todoReducer from "./todos";
import filterReducer from "./filter";


const rootReducer = combineReducers({
  filterReducer,
  todoReducer
})

export default rootReducer
```

### Store
定義好了 Reducer，我們需要有一個東西將他們結合在一起，就是「store」。

引入 `createStore()` 方法，傳入定義好的 Reducer，每一個應用程式只能有一個 store，但是可以擁有好幾個 reducer 處理不同的狀態，統一放在 store 裡面，這是用來存放所有狀態的地方。
```javascript=
import { createStore } from "redux";
import rootReducer from "./reducers";

export default createStore( rootReducer );
```

除了有 state tree 儲放狀態，store 還有一些方法能提供呼叫，外部也是透過他們才能和 store 進行溝通：
* 藉由 `getState()` 獲取目前 state
* 藉由 `dispatch(action)` 來更新
* 藉由 `subscribe(listener)` 註冊 listener、回傳來撤銷

![](https://i.imgur.com/OHiITrY.png)



## 該怎麼把 React 跟 Redux 串起來？

### 綁定 store
前面提到，Redux 跟 React 並沒有關係，它只是一套狀態管理的套件，你可以用 React、Angular 甚至原生 JavaScript 來搭配 Redux，只是剛好 Redux 遵守的特性「單向資料流」特性，就非常適合拿來搭配 Redux 元件。

安裝 `react-redux` 套件
```
npm install --save react-redux
```

回到原本的 React 架構，最初我們在最上層 Smart Component 會持有多個 states，然後依照需求將這些狀態一一分派下面的 stateless component，當遇到多個 Smart Component 需要用到同一個狀態時，傳統做法是得重構再加上一層。

然而，今天我們有了 Redux，先將所有 Smart Component 內持有的 state 移到 Redux，使用 react-redux 套件提供了 `<Provider>`，一個特殊的 React 元件，包在 Smart Component 最外面，被它包住的元件都能任意取用到 store 裡面的狀態和方法，並且指定它的屬性是剛剛建立好的 store，像是這樣
```jsx=
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

如此一來，store 就和 React 元件綁定好了！在 Smart Component 裡面引入 store 提供的方法，可以呼叫到 store 進行操作。

### 在 React 中操作 store
在 function component 中，需要使用 Redux 提供的 hook 來操作 selector
```jsx
import { useSelector, useDispatch } from "react-redux";
```
#### 1. useSelector：選取想要從 store 取得的 state
從 Store 中將 Component 需要的 State 取出，它的參數只需要填入一個定義取資料的函式，不用經過 Connect，取代掉原本的 `mapStateToProps` 

* 可以回傳任何值，不像 mapStateToProps 必定回傳一個物件
* useSelector 會將前一個結果與當前的結果進行比較，如果不同就會強制更新元件

#### 2. useDispatch：在元件中呼叫到 dispatch 函式
用來取代掉 mapStateToDispatch，呼叫它會直接回傳一個 dispatch 方法，讓你在元件中能直接呼叫 `store.dispatch()`
```jsx=
function handleAddTodo(e) {
    e.preventDefault();
    if (value !== "") {
      dispatch(addTodo(value, false));
      setValue("");
    }
}
```

### 參考資料
* [Why use Redux?](https://medium.com/@tonypai/%E7%82%BA%E4%BB%80%E9%BA%BC%E7%94%A8-redux-why-use-redux-eaeccfbb2006)
* [An intro to Redux and how state is updated in a Redux application](https://www.freecodecamp.org/news/an-intro-to-redux-and-how-state-is-updated-in-a-redux-application-839c8334d1b1/)
* https://chentsulin.github.io/redux/index.html
* [React Redux 與 Hooks](https://ithelp.ithome.com.tw/articles/10251966)
* [小孩子才做選擇！ Hooks 和 Redux 我全都要！](https://medium.com/enjoy-life-enjoy-coding/react-redux-%E5%B0%8F%E5%AD%A9%E5%AD%90%E6%89%8D%E5%81%9A%E9%81%B8%E6%93%87-hooks-%E5%92%8C-redux-%E6%88%91%E5%85%A8%E9%83%BD%E8%A6%81-1fdd226f5d99)


