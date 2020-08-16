## 什麼是 DOM？
文件物件模型（Document Object Model, DOM）是 HTML 的程式介面，它提供了一個文件樹的結構化表示法，讓程式可以存取、改變風格和其內容的方法

![](https://i.imgur.com/jxQ2B4W.png)

#### DOM 的出現，為什麼需要它？
網頁是由瀏覽器負責運行，因為有許多眾多的瀏覽器存在，所以我們需要一些共同的標準，讓瀏覽器可以按照一定規範設計，而 DOM 就是其中一個規範

* 在 DOM 標準下，把文件所有的標籤，包括文字，定義成一個物件
* DOM 是以樹狀結構呈現，會形成節點（node），每一個元素都是一個節點

#### 節點有幾種型態？
* Document：代表整份文件
* Element：所有的標籤（HTML Tag），例如 `<div>`、`<p>`
* Text：文字元素，指被各個標籤包起來的文字，是 Element 的 Text
* Attribute：各個標籤內的相關屬性，class、name 等等

聽起來很複雜，但瀏覽器就是這樣一步一步的把 HTML 解析(parse)成一顆 DOM tree

#### DOM 節點之間的關係
1. 上下層節點，上層為 Parent Node ，下層為 Child Node
2. 同一層節點，彼此間有 Previous 以及 Next 兩種
![](https://i.imgur.com/UlFKYot.png)

雖然說 DOM 普遍運用在 HTML 相關的物件模型，但它並非專屬於 HTML，DOM API 可拆分為兩部份，一個是核心 DOM API，一個是 HTML DOM API。前者是一個獨立規範，可以任何語言實現，操作對象是基於 XML 的任何文件。

而一般我們使用的 HTML DOM API 就是它的延伸，專門操作 HTML 各種物件對應的形態。以下整理一些常見的 DOM API 方法：


### 操作 DOM 元素
#### 抓取節點（node）
```javascript=
// 找尋 DOM 中符合此 id 名稱的元素，回傳 element
document.getElementById('idName')

// 找尋 DOM 中符合此 tag 的所有元素，回傳 element 集合，集合為 HTMLCollection
document.getElementsBytagName('tag')

// 找尋 DOM 中符合此 class 的所有元素，回傳 element 集合，集合為 HTMLCollection
document.getElementsByClassName('className')

// 與CSS相關的選擇器，可支援複雜的階層選擇，利用 selector 來找尋 DOM 中的元素
document.querySelector('selector')       // 回傳相對應的第一個 element 
document.querySelectorAll('selector')    // 回傳符合條件的所有元素集合，為 NodeList
```

#### 到底差在哪？HTMLCollection 以及 NodeList 的差別
兩者都是類似陣列的物件，可使用索引值來指定
* HTMLCollection
元素集合，Node type 只接受 Element
* NodeList
節點集合，因此全部的 Node 都可以存放在 NodeLists 內


#### 幾點注意
* 以 `node.childNodes` 方法可以取得子節點，取回的會是 **NodeList 物件**，而以 `node.children` 和 `node.getElementsByXX` 返回 **HTMLCollection 物件**
* document 代表整份文件，而不代表 html 元素節點 => 使用 `document.childNodes[0]` 取得 html 元素
* 想取得 body 元素，可透過 `document.body` 來取得
* 文字也是形成樹狀結構中的元素

</br>
</br>

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
JavaScript 是一個事件驅動（Event-driven）的語言，當瀏覽器載入網頁後，會等到「事件」被觸發（使用者點擊、按下鍵盤等）才會再進行相對應的執行。

#### 事件（Event）
指的是在 DOM 物件上發生的事件，具有多種類型，可以參考[這裡](https://developer.mozilla.org/zh-TW/docs/Web/API/Event)，而 Event 本身會包含所有事件的共同屬性及方法
* 常用 Event 屬性：
```javascript=
Event.currentTarget // 指向目前處理事件之監聽器所屬的 DOM 物件

Event.eventPhase    // 指向事件目前的傳遞階段

Event.target        // 指向最初觸發事件的 DOM 物件

Event.timeStamp     // 事件發生至今的時間
```
* 一些常用 Event 方法：
```javascript=
Event.preventDefault()            // 取消事件的預設動作
Event.stopPropagation()           // 阻止事件物件繼續捕捉或冒泡傳遞
Event.stopImmediatePropagation()  // 尚未執行的已註冊之相同事件類型監聽器不會被呼叫
```

#### 事件流程（Event Flow）」
![](https://miro.medium.com/max/945/1*Lpyc9tn3g5p5qPFAgNa1ZA.png)
> The DOM event flow is the process through which the event originates from the DOM Events implementation and is dispatched into a tree.

事件流程，指事件被觸發後，網頁元素接收事件的順序傳遞事件目標（Event Target）經歷的過程，其機制分成三個階段：**先捕獲再冒泡**
1. 事件捕獲（Capturing phase）
事件捕獲指的是 DOM 傳遞順序由上到下，從 document 一路下傳到**被點擊**的節點
2. 事件目標（Target phase）
當事件的傳遞抵達被觸發事件的元素
3. 事件冒泡（Bubbling phase）
當元素發生事件時，它首先在該元素上運行處理程序，然後在其父層元素往上運行，DOM 傳遞順序是由下到上，直到傳至 document
![](https://i.imgur.com/LCmCZtL.png)


#### 事件處理器（Event-handlers）

負責處理事件的程式，通常使用 `EventTarget.addEventListener()` 來連結 HTML 元素，一個元素可以擁有多個事件處理器，而在事件分發期間遇到的每個節點都可以包含事件偵聽器。

DOM 事件在傳遞時，照前面提到的口訣「先捕獲後冒泡」，傳遞順序會先從根節點開始往下傳遞到 target，再從 target 往上傳遞到 document，我們可以決定在哪個階段去監聽事件。

```javascript=
target.addEventListener(type, listener, options)
```

那麼要如何設定監聽的階段呢？
`.addEventListener` 其實還有第三個 options 參數，可以對傳遞順序的改變

```htmlmixed
True: 把這個 listener 添加到捕獲階段 (Capture)
False: 把這個 listener 添加到冒泡階段 (Bubble)
null: 預設，把這個 listener 添加到冒泡階段 (Bubble)
```

#### 幾點注意：
* 幾乎所有的事件都有冒泡，除了少數事件，如 focus 等
* 每一個事件都有一個事件目標
* 事件傳到 target 本身，沒有分捕獲與冒泡，會按照程式碼的順序執行
* 想知道觸發此事件的元素，可以透過 `event.target` 來取得，這個元素在整個冒泡過程中不會改變，是事件真正的發起者
* `event.target` 與 `event.currentTarget` 不同，後者指的是「當前」元素，上面會有一個正在運行的處理程序，註冊事件的主體、監聽事件的人

</br>
</br>

## 什麼是 event delegation，為什麼我們需要它？
> A handler on a parent element can always get the details about where it actually happened.


弄清楚了 Event 捕獲和冒泡的傳遞順序及特性後，我們會發現「最上層的元素事件處理器，幾乎可以知道內層元素所有發生的事情，有**相同的綁定事件**會因為「冒泡」關係一同被觸發，於是有了「Event Delegation」的運用：

### Event Delegation 事件委派
因為冒泡，可以減少設置監聽器數量的方法，因為內層元素的事件都會觸發到父層元素，我們乾脆直接對父元素進行事件監聽，這樣一來，解決了兩個問題：
* 避免沒效率，不再需要個別加上監聽器
* 解決了動態生成，元素事件綁定的問題

Event Delegation 的原理，是利用冒泡機制將子節點的事件統一處理，可以透過 `event.target` 屬性來辨別，告訴你觸發的位置，進而確認並執行


**範例：Event Delegation**
1. 利用 switch case 撰寫對應元素的點擊事件，統一管理
```javascript=
const form = document.querySelector('form');
form.addEventListener('click', function(e) {
  switch(e.target.id){
    case 'btn1':
      /* do something if btn1 click */
      break;
    case 'btn2':
      /* do something if btn2 click */
      break;
    default:
      break;
  }
})
```
2. 監聽多種事件，可以使用 type 屬性
```javascript=
 const btn = document.getElementById("myBtn");
 conat handler = function (event) {
     switch (event.type) {
     case "click":
         alert("Clicked");
         break;
     case "mouseover":
         event.target.style.backgroundColor = "red";
         bread;
     case "mouseout":
         event.target.style.backgroundColor = "";
         break;
     }
};
btn.onclick = handler;
btn.onmouseover = handler;
btn.onmouseout = handler;
```

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
#### 1. 停止預設行為
有些元素像是 a 連結，會連結到某個網址，他們本身已經有預設行為，這時候可以利用 event 給的 `preventDefault` 方法來中止預設他們的行為
* 是取消事件的預設，而不會影響事件傳遞

#### 2. 停止冒泡
冒泡事件會從被觸發元素一路向上傳遞到 document，`event.stopPropagation()` 的作用，是在冒泡過程中，能夠決定要不要終止繼續向外冒泡。
有時候，一個元素上面會被綁定不只一個事件處理器，雖然可以停止向外冒泡，卻沒辦法阻止同層的事件，這時候可以利用 `e.stopImmediatePropagation` 解決，除了停止向外傳遞、也阻止同個元素的其他同層級事件。
* 盡量避免使用停止冒泡，不如上層元素沒辦法監聽到下層元素的事件

preventDefault 是中止元素的預設行為，並不會阻止事件冒泡，依然會繼續傳遞到父層元素，停止冒泡還是要使用 stopPropagation！



### 參考資料
* [文件物件模型 (DOM)](https://developer.mozilla.org/zh-TW/docs/Web/API/Document_Object_Model)
* [W3C DOM 簡介](https://openhome.cc/Gossip/JavaScript/W3CDOM.html)
* [Day03-深入理解網頁架構：DOM](https://ithelp.ithome.com.tw/articles/10202689)
* [NodeList 和 HTMLCollection之间的关系？](https://www.zhihu.com/question/31576889)
* [MDN Event](https://developer.mozilla.org/zh-TW/docs/Web/API/Event)
* [重新認識 JavaScript: Day 14 事件機制的原理](https://ithelp.ithome.com.tw/articles/10191970)
* [[DOM] Event Propagation I : 事件捕捉和冒泡](https://medium.com/@hsien.w.wei/dom-event-propagation-i-%E4%BA%8B%E4%BB%B6%E6%8D%95%E6%8D%89%E5%92%8C%E5%86%92%E6%B3%A1-event-capture-bubble-8214bf146b35)
* [[JS] Event Capturing and Bubbling](https://pjchender.github.io/2017/10/03/js-event-capturing-and-bubbling/)
* [[第八週]DOM — 瀏覽器事件傳遞機制](https://medium.com/@miahsuwork/%E7%AC%AC%E5%85%AB%E9%80%B1-dom-%E7%80%8F%E8%A6%BD%E5%99%A8%E4%BA%8B%E4%BB%B6%E5%82%B3%E9%81%9E%E6%A9%9F%E5%88%B6-32abfb67eba3)
* [瀏覽器事件：Event Bubbling, Event Capturing 及 Event Delegation](https://shubo.io/event-bubbling-event-capturing-event-delegation/)
* [Event Delegation — 事件委派介紹](https://medium.com/@realdennis/event-delegation-%E4%BA%8B%E4%BB%B6%E5%A7%94%E6%B4%BE%E4%BB%8B%E7%B4%B9-%E8%88%87-%E8%A7%B8%E7%99%BC%E5%A7%94%E6%B4%BE%E7%9A%84%E5%9B%9E%E5%91%BC%E5%87%BD%E6%95%B8-2990921a5ba2)