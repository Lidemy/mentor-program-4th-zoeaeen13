## 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。
這篇筆記比較多，可點連結直接找到：

* [認識 JS 的變數](#認識-js-的變數)
* [來談談 Event Loop](#來談談-event-loop)
* [Scope 作用域](#scope-作用域)
* [Hoisting 提升](#hoisting-提升)
* [物件導向與原型鍊](#物件導向)
* [this](#this)

## 認識 JS 的變數
依照語言的型別系統（Type system）來分成「強型別語言」與「弱型別語言」兩種：
* 強型別：變數在被宣告的時候，必須指定一種資料型別給它，可以利用編譯器提前做型別檢查，減少在執行時期（Runtime）發生的錯誤
* 弱型別：語法簡潔，但要注意型態轉換時的問題

**變數沒有型別，值才有**
JavaScript 型別的資訊只在值或物件本身，變數只用來作為取得值或物件的參考。型態主要有兩種，分成 Primitive type 基本型別和 Object types 物件型別
#### 一、Primitive type 基本型別
內建型別（Built-in Types），只是一個值、並不是物件（物件是名稱 + 值的組合），Primitive 具有不可變的特性，分為以下幾種

| 型別 | 名稱 | 用意 |
| -------- | -------- | -------- |
| undefined | 還不存在 | 這是 JavaScript 給所有變數的初始值，還沒變數定義 |
| null | 其東西不存在 | 指一個不存在的或無效的物件（object），可以使用 null，不是使用 undefined |
| Boolean  | 布林值 | true 和 false 其中一個可能 |
| Number | 數字型別 | JS 只有一種數值型態，就是 number，除了整數和小數字外，特殊數字有 Infinity（無限大）、 -Infinity（負無限大），以及 NaN（不是數值，Not a Number） |
| String | 字串 | 代表文字資料 |
| symbol |符號 | 被使用在 ES6 或 ECMAScript 6，還在建造中，沒被全部瀏覽器支援 |



#### Object types
物件型別，物件與其子型別（subtype），例如：物件、陣列、函式等等，物件可以看作是一個用來裝數值的容器：
* Object 物件
* Array 陣列
* Function 函式

Array 使用數值化「索引」來儲存值，而非如 Object 是使用屬性來儲存值。Function 函式是指一段程式碼片段，可藉由呼叫其名稱來執行它，可簡化重複進行的工作、包裝特定功能的程式碼。

#### Primitive type 和 Object type 大不同
:::danger
##### 1. Immutable 特性
在 Primitive Type 它是會回傳一個新的，而不是改變它自己，在對 String 做操作的時候要特別注意這些內建函式
```javascript=
var str = 'hello';
str.toUpperCase();   
console.log(str);    // hello

var arr = [1];
arr.push(2);
console.log(arr);    // [1, 2]
```

##### 2. 賦值的陷阱
Primitive Type 存的是值，Object 會先給定一記憶體位置，再去讀取裡面的值
```javascript=
var obj = {
    number: 10,
};

var obj2 = obj;
console.log(obj, obj2);  // 10, 10

obj2.number = 20
console.log(obj, obj2)   // 20, 20
```
要搞清楚重新賦值（=）和 . 的差別
```javascript=
var obj = {
    number: 10,
};

var obj2 = obj;
console.log(obj, obj2);  // 10, 10

// 先給 [30] 一個位置，再把 obj2 換掉記憶體位置，所以兩者指的是不同的位置
obj2 = [30]
console.log(obj, obj2)   // 10, 30
```
:::


#### 資料型別轉換
可以使用 `typeof` 來檢測值的資料型別為何
```javascript=
typeof 'Hello World!'; // 'string'
typeof true; // 'boolean'
typeof 1234567; // 'number'
typeof null; // 'object'
typeof undefined; // 'undefined'
typeof { name: 'Jack' }; // 'object'
typeof Symbol(); // 'symbol'
typeof function() {}; // 'function'
typeof [1, 2, 3]; // 'object'
typeof NaN; // 'number'
```
#### 更多 typeof 使用情境？
有時候會被拿來檢查：變數有沒有被使用到
```javascript=
if (typeof a !== 'undefined') {
    console.log(a);
}
```

#### Q: null 為什麼是 object？它是基本型別嗎？
null 是基本型別之一，但 typeof null 卻得到 object，而非 null！這可說是一個 bug
```javascript=
typeof null         // object (bug in ECMAScript, should be null)
typeof undefined    // undefined
null === undefined  // false  ( === 會判斷類型)
null == undefined   // true   ( == 會執行類型轉換)
```
#### Q: function 是物件的子型別，但 typeof function() {} 是得到 function 而非 object？
和陣列依舊得到 object 不一樣，在 JavaScript 覺得 function 太特別了，所以另外給它獨有的回傳值

#### Q: NaN 表示是無效的數字，但依舊還是 number？
NaN 在 JavaScript 當中是個有趣的存在，字面上來說它不是個數字，但你若用 typeof 運算子來判斷型態，它又會告訴你這是個 number。

不要被字面上的意思「不是數字」（not a number）給弄糊塗了，它依然是數字。另外 NaN 與任何數字運算都會得到 NaN，並且 NaN 不大於、不小於也不等於任何數字，包含 NaN 它自己。

```javascript=
var a = Number('hello');  // 沒辦法轉，會變成 NaN
console.log(a === a)      // NaN
console.log(isNaN(a))     // true，可以用 isNaN() 方法來檢測
```

#### Q: 到底 undefined 和 not defined 差在哪？
在 console 時偶爾會遇到這兩種值，完全是不同的意義
* undefined → 有宣告這個變數，但沒有定義所以沒有設定值
* not defined → 無法參照，代表錯誤，沒有這個變數存在

#### Q: 其他的檢測方式？
```javascript=
object.prototype.toString.call(要檢測的東西)
```
* 檢測網站：https://dorey.github.io/JavaScript-Equality-Table/

#### Q: 為什麼永遠都用 === ？
因為 `==` 會涉及型態轉換，所以最好的方式就是都用 `===`

而 `===` 永遠只有在兩者**指向同一個記憶體位置**時才會成立，它並不是在比較兩個的值，是比較他們的位置，這也是為什麼 `console.loe([] === [])` 會是 **FALSE** 的原因，因為他們實際上是存到不同的記憶體位置


---
## 來談談 Event Loop
這個部分，將透過解釋 Event Loop 機制順便理解以下常見的名詞
```
Single Thread 單執行緒
Call stack 呼叫堆疊
Blocking 阻塞
Event loop 事件循環
Callback 回調
Callback Queue 回調序列
```
### Call Stack 執行堆疊
JS 是一個單執行緒的語言，有一個單執行緒的 Runtime（執行環境系統），執行緒可以想像成執行工作的單位，單執行緒意味著它一次只能做一件事。在程式碼運行前，JS 的 Runtime（記憶體堆疊、默認執行環境、執行環境堆疊）會被建立。

之後依序執行，一旦呼叫到其他函式，Global EC 會幫呼叫到的函式產生新的 Execution Context 放到 stack 上，當多個函示被呼叫就會產生多個 EC，依序堆疊上去，這被稱為執行堆疊（call stack）。

call stack 的特性是後進先出，最後被堆上去的 EC 會作為目前的執行環境先被執行，因為單執行緒的特性，一次只會執行一個程式碼片段，要等到該函式執行完畢 reurn 後，它的 EC 才會自動從執行堆疊的頂端抽掉（pop off），再執行底下一層的程式碼。

![](https://i.imgur.com/t0xDDE2.png)



#### Q: 為什麼不能在一個函式呼叫它自己？
無窮迴圈，會造成堆疊爆炸（Stack Overflow）
```javascript=
function foo() {
    return foo();
}

foo();
```

### Blocking 阻塞
然而，有些東西就是跑特別慢，需要等待很長一段時間，比如網路請求、圖片請求、或純粹就是執行過程漫長的程式碼，當這些跑得慢的東西又處在目前的堆疊上，就會造成「Blocking（堵塞）」。

如果現在是同步設定，那麼一旦發生 blocking，畫面就會壞掉、好像「卡住」的現象，這是因為瀏覽器被塞住、無法繼續渲染頁面，變成我們什麼事都做不了，而面對這種狀況，我們就需要「非同步回調（Async Callback）」機制。

簡單來說，就是在需要跑比較久的程式碼中用上非同步方法（Asynchronous），裡面塞一個 callback function（簡稱 cb），這樣就會先執行一段程式碼，然後過段時間再回調裡面的 cb，不會立即執行到而造成阻塞。

### Concurrency 並行機制
那肯定就會好奇，callback function 是怎麼做到會等待一段時間再執行？為什麼它能等到結束做、能監測什麼時候要結束等待？JavaScript Runtime 不是一件只能做一件事嗎？

沒錯，JavaScript 的確是單執行緒，它在執行一段程式碼的時候，就不能同時紀錄 setTimeout 的要求、做 HTTP Request 網路請求，而讓這一切實現的關鍵並不是 JavaScript，而是**瀏覽器**。
瀏覽器額外提供了很多東西，類似各種不同的執行緒，一些你只能經由呼叫、無法取得的執行緒，比如 setTimeout 就是其中一個，它是環境所提供，並非來自 JS Runtime 本身。

當你呼叫它之後，瀏覽器就會為你啟動一個計時器，JS 主執行緒則會忽略它繼續往下運作，而 `setTimeout()` 實際上是出現在瀏覽器另外提供的執行緒中執行，其他像 ajax、Fetch、DOM 也都是瀏覽器提供的 API。

![](https://i.imgur.com/TVo3hwu.png)


### Event Loop 和 Callback Queue
那 `setTimeout()` 執行完畢後，裡面的 cb 該怎麼處理？剛剛說到會「回調」，那是丟回堆疊中直接執行嗎？

當然不可能如此簡單粗暴，瀏覽器不會傻呼呼直接丟回堆疊上，這樣根本無法控制它出現的時機，Web APIs 會在執行完 `setTimeout()` 之後將它的 cb 放到一個名為
Callback Queue 的地方，所有非同步執行的程式碼會被推到這裡等待執行。

而安排 Callback Queue 裡面的任務去到堆疊，是由「Event Loop（事件循環）」負責，你可以想像它就是在辦公大樓上班的警衛，尖峰時端擠滿一堆要上樓的上班族，而大家滑著手機、都在排隊等待電梯，電梯很小，一次只能容納一個人，就是這位警衛來幫他們觀察電梯什麼時候空出來，一旦電梯抵達一樓，就通知排隊的第一個人可以上班了。

Event Loop 決定事件的執行順序，它不斷監控 stack 和 queue 的狀態，查到堆疊的狀態是空的，就換檢查 Callback Queue 中有沒有準備好的 cb，就把最前面的 cb 抓起來送到堆疊上執行，所以可以說 JavaScript 可以並行的基礎是因為 Event Loop 的存在。

![](https://i.imgur.com/PBYJawC.png)

### 更進一步：認識瀏覽器的運行環境
從上面我們知道了在 JS Runtime 之外，瀏覽器還提供了 Web APIs、Queue、Event Loop 等等東西來幫助任務執行，整個瀏覽器的運作環境，包含 JS 引擎，我們稱為 JS Runtime Environment（JRE）

![](https://ithelp.ithome.com.tw/upload/images/20190928/20106580oVudusuOwX.jpg)


#### Q: 零延遲（Zero delays）是什麼？
有時候我們會看到將 setTimeout 設成零，這麼做並非表示 callback function 會在 0 毫秒之後立刻執行，從上面 Event Loop 的運作我們了解到：這個 cb 會等待堆疊清空後才被執行到。

呼叫 setTimeout 的使用，不代表過了那段時間就會執行，時間參數只是要求處理的最少等待時間，我們還得考慮到在 Queue 中等待的訊息數量，setTimeout 是讓我們把任務推遲到堆疊的最後再執行。

```javascript=
(function() {

  console.log('this is the start');

  setTimeout(function cb() {
    console.log('this is a msg from call back');
  });

  console.log('this is just a message');

  setTimeout(function cb1() {
    console.log('this is a msg from call back1');
  }, 0);

  console.log('this is the end');

})();

// "this is the start"
// "this is just a message"
// "this is the end"
// "this is a msg from call back"
// "this is a msg from call back1"
```
#### Q: 為什麼說不要做事件阻塞？
意思是，讓你別在堆疊上放慢到不行的程式碼，這樣會影響瀏覽器最重要的東西── 畫面。

一般來說，瀏覽器會在每 16.6 毫秒（也就是每秒 60 個幀）重新渲染一次畫面，但當堆疊上有程式碼的時候，瀏覽器就不能顯示東西，造成卡住。比如 `forEach()` 裡面的函式就不會做非同步，而是在當前的堆疊中執行，當你對每個元素做緩慢處理的同步迴圈，就會讓瀏覽器的顯示一直被擋住。

```javascript=
// Synchronous
[1, 2, 3, 4].forEach(function (i) {
  console.log(i)
  delay()
})
```

而當你知道渲染任務的優先權高於 callback function，你就應該重新思考程式碼的架構，像是將它改為回調函式，當他們同樣都在 Queue 中等待時，瀏覽器就可以自己找到機會安插渲染任務，順利保持流暢的 UI。
```javascript=
// Asynchronous
function asyncForEach(array, cb) {
  array.forEach(function () {
    setTimeout(cb, 0)
  })
}
```

### Q: 為什麼 JavaScript 會是單執行緒的程式語言？
> 為什麼 JavaScript 只能跑在一個 thread 上，一次只做一件事？

與他的用途有關，當初 JavaScript 是為了在瀏覽器上運作，與使用者互動以及操作DOM而設計的，這決定了他只能是單執行緒，否則會帶來很複雜的同步問題。比如同時有兩個執行緒存取到同一個 DOM 節點：
* 一個執行緒在某個 DOM 節點上新增內容
* 另一個執行緒刪除了這個節點

瀏覽器要以哪個為主？為了避免這種麻煩才這樣設計，之前寫過 Android 開發，也發現會要求任何跟 UI 有關的操作都得在主執行緒進行，就是為了避免無法預料的狀況。

### 小結
* 堆疊當下的程式碼會執行完畢，過程中不會被 async code 中斷
* 就算 setTimeout() 延遲時間設定為 0，程式也不會立即執行到，依然會被排在 Callback Queue 等待堆疊清空
* JavaScript 只能跑單執行緒，但瀏覽器像是提供了它運作多執行緒的可能，利用 Event Loop 機制去幫助 JavaScript 執行任務
* 瀏覽器中，渲染畫面的優先權高於 callback function


### 參考資料
* [Javascript [筆記] 理解 Event Loop,Call Stack, Event & Job Queue in Javascript](hhttps://milletbard.com/2019/11/25/JavaScript-event-loop/)
* [並行模型和事件循環](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/EventLoop)
* [[筆記] 理解 JavaScript 中的事件循環、堆疊、佇列和併發模式](https://pjchender.blogspot.com/2017/08/javascript-learn-event-loop-stack-queue.html)
* [[第十六週] JavaScript 進階：事件迴圈 Event Loop、Stack、Queue](https://yakimhsu.com/project/project_w16_EventLoop.html)
* [Day5 [JavaScript 基礎] Event Loop 機制](https://ithelp.ithome.com.tw/articles/10214017)
* [JS 原力覺醒 Day13 - Event Queue & Event Loop 、Event Table](https://ithelp.ithome.com.tw/articles/10221944)


---
##  JavaScript 的一些重要基礎：scope、hoisting、closure、prototype、this

### Scope 作用域
作用域是一個變數的生存範圍，一旦超出了這個範圍，就無法存取到這個變數，那既然作用域決定了變數有效的範疇，它是怎麼決定的？

JS 採用的是**靜態作用域（static scope）**，作用域的判斷，跟哪邊呼叫沒有關係，是看它在哪裡被宣告，以宣告函式的地方當作作用域鏈，JavaScript 作用域分成三個層級：
1. Global Level Scope
2. Function Level Scope
3. Block Level Scope（ES6 之後）

前面提到過 JavaScript 代碼在運行之前，會產生一個默認的全域執行環境 （Global Execution Context），它裡面會存在一個全域的變數物件（Global Variable Object），在這個範圍被宣告的變數就是「全域變數」，任何地方都可以存取到它。

而在 ES6 以前，作用域基本單位是 function，每一個 function 會形成一個新的作用域，在 function 的外面你是取不到它裡面的變數，在 ES6 之後出現了 let 和 const，用它們宣告的作用域是以 block 為單位，只要有 `{}` 就會產生一個新的作用域。


```javascript=
// 先在自己的作用域裡面找，找不到才會往上一層去 global 找
var a = 10
function test() {
    var a = 20
    console.log(a) // 20
}
test()
console.log(a)     // 10


//沒有重新宣告，往上層找 global 變數 a，在 test 裡面被賦值，a 被改變為 20
var a = 10
function test() {
    a = 20
    console.log(a) // 20
}

test()
console.log(a)     // 20
```



### Hoisting 提升
不管你在函式中的哪一行用於宣告變數，一律被視為在函式的第一行宣告
```javascript=
console.log(b);   //undefined
var b = 10;

// 上面等於下面這段
var b;
console.log(b);
b = 10;
```
* 只有宣告會提升，賦值不會
* var 宣告提升後，會先被初始化為 undefined
* hoisting 的範圍就是當前的作用域
* 提升的優先順序是
```
function 函式 -> argument 參數 -> variable 變數
```

#### 沒有 hoisting？let 和 const 的不同
和 var 的差別在於提升之後，var 宣告的變數會被初始化為 undefined，但 let 與 const 的宣告不會，導致 let 和 const 在賦值以前都不能去存取它，不然會報錯誤，從他們宣告到被賦值中間會有一段空白期，被稱為「Temporal Dead Zone（TDZ）」

```javascript=
function  test ( )  { 
    // c的TDZ開始
    console . log ( c )  //錯誤
    let  c  =  10        // c的TDZ結束
} 
test ( )
```

#### Scope 和 Hoisting 小結論
* let 和 const 都是 block-level scope（塊級作用域），而 var 是函式作用域
* var 可重複宣告
* let 和 const 其實也有 hoisting，會提升到區塊作用域頂部，但在賦值之前都不能去存取它，不然會報錯誤 `ReferenceError`

### 從 ECMAScript 來理解 Hoisting、認識 Scope Chain
以下是這段程式碼的運行結果
```javascript=
var a = 1;
function test(){
  console.log('1.', a);  // 印出 undefined => 下面有a的變數宣告，於是hoisting
  var a = 7;
  console.log('2.', a);  // 印出 7
  a++;                   // a++ 變成 8
  var a;
  inner();
  console.log('4.', a);  // 印出 30
  function inner(){
    console.log('3.', a);// 下面只有賦值，沒有宣告，所以往上一層找到 a 是 8
    a = 30;              // 把 test 那層的 a 改成 30
    b = 200;             // 只有賦值，往上也找不到b，b被宣告成全域變數
  }
}
test();
console.log('5.', a);   // 印出 1
a = 70;
console.log('6.', a);   // 印出 70
console.log('7.', b);   // 印出 200
```

最開始我們提過，在程式碼運行前 JS 的 Runtime（記憶體堆疊、默認執行環境、執行環境堆疊）會被建立，默認執行環境也就是全域執行環境 Global Execution Context，它裡面存放著環境中會需要用到的各種資源，包括
* 階段（Phase）
* 全域物件（Global Object）
* this
* 變數物件（Variable Object）
* 範圍鏈（Scope Chain）

```javascript=
globalEC = {
  Phase: 'Execution',      // 運行階段
  GlobalObject: window,    // 在瀏覽器中，全域物件便是指 Web API
  this: window,            // 在瀏覽器中，this 所指向的便是瀏覽器物件 window
  VO: {                    // 變數物件（Variable Object）
    a: 1,
    b: 2,
  }
  scopeChain: globalEC.VO  // 因為已經是最外層
}
```
Scope Chain 是由它的 Variable Object 加上本身的 `scope 屬性` 所組成，`scope 屬性` 是在宣告每一個 function 時就決定好的，但因為 globalEC 不是 function，所以它並沒有 scope 屬性，它的 scope chain 裡面只有 `globalEC.VO`。


![](https://i.imgur.com/izhahjR.png)

這張圖上，其他被放在堆疊中的 Execution Context，就是函式執行環境 Function Execution Context，一旦呼叫到某函式，globalEC 就會為該函式建立一個全新的執行環境，專門供它裡面的程式碼運行，這個新的環境會被堆疊在原本的 globalEC 上面。


#### Function Execution Context 執行環境
函式執行環境指的是執行函式時所創立執行環境，裡面包含了：
* 階段（Phase）
* this
* 執行物件（Activation Object）
* 作用域鏈（Scope Chain）

所有在 function EC 宣告的變數和函式，都會被加到 Activation Object 物件裡，你可能會疑惑 global EC 裡面是 VO、function EC 卻是 AO？兩者差別是什麼？

我們都知道每個執行環境會包含變數物件（Variable Object），而執行函式所創造出來的執行環境中，則會另把參數（parameters）也加進去變數物件中，這個多了參數的變數物件就被稱為是「活化的變數物件（Acativation Object）」，本質上它還是變數物件，只是版本不一樣。

當進入 EC 時會產生 AO 物件，開始變數物件的建立：
1. 檢查有沒有參數，參數會先被綁到 AO，初始化並給值
2. 初始化 function 和變數
3. 如果裡面出現與參數同名的 function 名稱，取代該參數
4. 如果裡面出現與參數或 function 同名的變數宣告，直接忽略

```javascript=
fnEC = {
  Phase: 'Creation',     // 創造階段
  this: ,
  AO: {                  // 執行物件
    arguments: { 
        0: 1,
        1: 2,
        length: 2
    },
    a: func,
    b: undefined,
  },
  scopeChain: (AO + fnEC.[[Scope]])
  // scopeChain 簡單來說，就是宣告程式時處在的外層範圍，加上自己的執行物件
}
```

做完了之後，才開始按照順序執行程式碼，在程式碼裡面如果呼叫到其他 function ，就會疊上一層 EC，而在 funciton 執行完後，這層 EC 就會被抽掉，釋放出資源，這與我們前面理解的堆疊機制相符合。

當進入一個新的 EC 時，它的 AO 和 scope chain 都會被建立，scope chain 由它本身的 VO/AO 加上 scope 屬性組成，而它本身 scope 屬性是在宣告 function 時就決定好的（其實就是它那一層 EC 的 scope chain）

**示範 Execution Content 和 Scope Chain 程式碼**
```javascript=
// Example
var a = 1
function test() {
    var b = 2
    funciton inner() {
        var c = 3
        console.log(a)
        console.log(b)
    }
    inner()
}

test()
```
JS 到底是怎麼查找變數的，其實就是透過 Scope Chain 這個預設屬性
```javascript=
innerEC {
    AO: {
        c: undefined, 
    },
    scopeChain: [innerEC.AO, innerEC.[[scope]]]
    // ==> [innerEC.VO, testEC.AO, globalEC.VO]
}

testEC {
    AO: {
        b: 2,
        inner: func,
    },
    scopeChain: [testEC.AO, test.[[scope]]]  // ==> [testEC.AO, globalEC.VO]
}

// 宣告 function inner，多一個它自己的隱藏屬性 [[Scope]]
// inner.[[scope]] = testEC.scopeChain   ==> [testEC.AO, globalEC.VO]


globalEC {
    VO: {
        a: 1,
        test: func
    },
    scopeChain: [globalEC.VO]
}

// 宣告 function test，多一個它自己的隱藏屬性 [[Scope]]
// 這時 test.[[scope]] = globalEC.scopeChain   //globleEC.VO
```

#### 關於 Execution Content 和 Scope Chain 小結論
* 每一個 funciton 都有一個 EC，所有該 function 需要的資訊都是存在這個 EC 中
* 除了 function 有 EC，最底層還有一個 global EC
* 堆疊最上層的，就是現在跑的 Execution Context
* 每一個 function 都有自己的 `[[scope]]` 屬性
* `[[scope]]` 屬性就是宣告 function 時處在的外層範圍
* Hoisting 和 TDZ 概念其實都是從 scope chain 延伸出的結論


### 參考資料
* [秒懂！JavaSript 執行環境與堆疊](https://medium.com/%E9%AD%94%E9%AC%BC%E8%97%8F%E5%9C%A8%E7%A8%8B%E5%BC%8F%E7%B4%B0%E7%AF%80%E8%A3%A1/%E6%B7%BA%E8%AB%87-javascript-%E5%9F%B7%E8%A1%8C%E7%92%B0%E5%A2%83-2976b3eaf248)
* [我知道你懂 hoisting，可是你了解到多深？](https://blog.huli.tw/2018/11/10/javascript-hoisting-and-tdz/)
* [JavaScript 深入淺出 Variable Object & Activation Object](https://shawnlin0201.github.io/JavaScript/JavaScript-Variable-Object-and-Activation-Object/)
* [JavaScript 深入淺出 Execution Content 執行環境](https://shawnlin0201.github.io/JavaScript/JavaScript-Execution-Context/)

---

### 補充：閉包 Closure 
理解 Scope chain 後，我們可以進一步知道閉包的實現機制，閉包 Closure 在一個 function 裡面 retutn 一個 function，把 function 裡面的值鎖在裡面，而不像往常一樣執行完就被釋放資源
* 計算複雜時
* 想要隱藏某些資訊時，能把變數隱藏在裡面讓外部存取不到


### 物件導向
ES6 以後有 `class` 可以使用，可以創建一個對象，對它做事。

```javascript=
class Dog() {
    // 建構子
    constructor(name) {
        this.name = name  // 在內部用 this 去指他現在的 instrance 的 name
    }
    // setter
    setName(name) {
        this.name = name
    }
    
    // getter
    getName() {
        return this.name
    }
    
    sayHello() {
        console.log('hello')
    }
}

// new，實際上就是在呼叫 constructor 這個內建方法
var d = new Dog('belly')  // instance 
d.setName('abc')
console.log(d.getName())  // abc
```



#### 認識原型練（prototype chain）
JavaScript 不像其他語言中有「類別」的概念，即使是 ES6（有 Class 語法）裡面只是用一個類似的機制來達到功能，實際上仍然不是其他語言所用的「Class」，那要知道這個機制是怎麼實作的？

**看 ES6 以下沒有 class 語法時，它是如何使用？**

實際上，它 new 的東西只是一個 function，稱為構造函數。
其他程式語言，每一個 class 在初始化的時候都會呼叫裡頭的 constructor（構造函數），因為沒有 class 存在，JavaScript 設計是使用 **new 運算符**直接接一個 function ，可以生成一個實體，而這個 function 就是構造函數，像是一個仿造原型的存在，類似於模板。

然而類別的核心就是會存在一些共有的屬性，如果只是個別用 function 生成一個個實例，並沒有辦法達到共享目的，所以這個構造函數並不是普通的 function，一般來說 function 都帶有一個特別屬性叫 `prototype`，多數情況是空的，但是構造函數卻不一樣，我們會在構造函數的 function 上設定它的`prototype`，把要共享的屬性/方法全部放入`prototype` 裡面，不需要共享的東西就放在構造函數上即可。


一旦使用了 new 來產生物件，new 就會幫忙你參照的模板（構造函數）裡 `prototype` 對象的屬性/方法一併引用進來，為新物件中設定一個 `__proto__` 屬性，它裡面的對象是對應到原本構造函數中的 `prototype` 對象，可以說 `__proto__` 就是構造函數 `prototype` 的引用。

```javascript=
// ES5 
// 用 new 有了一個 constructor
function Dog(name) {
    this.name = name
}

// 將共享屬性用 prototype 去加上方法
Dog.prototype.getName = function () {
    return this.name
}
Dog.prototype.sayHello = function () {
    console.log(this.name)
}

// 
var d = new Dog('abc')
d.sayHello()

var b = new Dog('hahaha')
b.sayHello()

console.log(d.sayHello() === b.sayHello())  // true，實作成功！
```

而 `dog.__proto__` 對象是根據 Dog 的原型對象（Dog.prototype），而 Dog 的原型對象又是引用自 Object，這樣一路引用就構成了原型鏈，類似繼承關係，可以呼叫到自己上層物件的方法或屬性。

```javascript=
var dog = new Dog('aaa')
console.log(dog.__proto__ === Dog.prototype) // true，使用 new 已經幫你設定好
```
所以，調用 dog.sayHello 時，如果發現 dog 裡面沒有這個屬性/方法，就會沿著原型鏈一路向上查找，找這個 `__proto__` 所指向的 prototype（Dog.prototype），看看它有沒有 sayHello 方法，如果有就使用，沒有再繼續找，一直找到 Object 還是沒有這個方法就會回傳 null，因為 Object 的 prototype 就是最原始的 prototype，沒有更上層的引用。


##### Q: 如何確認，是物件自己本身的方法還是向上引用？
Object.prototype 有個方法是 `hasOwnProperty`，在下層物件要確認屬性時可以調用它。
```javascript=
a.hasOwnProperty('name'); // true
a.hasOwnProperty('gender'); // true
a.hasOwnProperty('country'); // false，country 屬性不是 a 自己的屬性
```

##### Q: 比較好的方式是用 `Object.getPrototypeOf()` 方法，不是 `__proto__`？
`__proto__` 屬性是訪問性屬性，它可以拜訪物件的 `[[Prototype]]` 的值，不過正確應該使用 Object 的內建方法 `getPrototypeOf()`，它會回傳指定物件的原型，同樣也是取得該物件的 [[Prototype]] 屬性值。



### 那麼，new 到底做了什麼？

在談這個之前，先認識一下 call、apply 和 bind 這幾個方法，

用 call() 傳入什麼，就會改到 this，用它來做建構子要做的事情
```javascript=
function test() {
    console.log(this)  // [string: '123']
}
test.call('123')
```

**new 其實是幫你做了以下幾步：**
1. 幫你產生一個 object
2. call constructor 把 object 當作 list 丟進去
3. 幫你設定 `__proto__`
4. 回傳 object

把 `__proto__` 指到個別的 prototype，使物件實例可以使用 prototype 中已經定義好的屬性、函式。
```javascript=
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.log = function () {
  console.log(this.name + ', age:' + this.age);
}

// 實作 new 功能
function newObj(Constructor, arguments) {
  var o = new Object();

  // 讓 o 繼承原型鍊
  o.__proto__ = Constructor.prototype;

  // 執行建構函式
  Constructor.call(o, arguments);

  // 回傳建立好的物件
  return o;
}

var nick = newObj(Person, ['nick', 18]);
nick.log(); // nick, age:18
```

#### 繼承：當需要用到一些共同屬性時
```javascript=
class BlackDog extends Dog {  // 沒有寫 constructor，去找 parent 的建構子
    test() {
        console.log(this.name)
    }
}

class BlackDog extends Dog {
    constructor(name) {  // 因為覆寫，所以 Dog 建構子 name 也要傳進去
        super(name)      // call 上一層的 constructor
        this.sayHello()  // 對於初始化前就要用到繼承的東西，使用 super()
    }

    test() {
        console.log(this.name)
    }
}
```

---
### this
#### 1. 物件導向
在物件導向裡面，如果是屬於某物件 (object) 的方法，this 設定成即將對應到的原型，也就是物件本身。

#### 2. 非物件導向
在談 scope chain 時有提過，程式碼運行前的 Runtime（記憶體堆疊、默認執行環境、執行環境堆疊）會被建立，默認執行環境也就是全域執行環境 Global Execution Context，它裡面存放著環境中會需要用到的各種資源。
```javascript=
globalEC = {
  Phase: 'Execution',
  GlobalObject: window,    // 在瀏覽器中，全域物件便是指 Web API
  this: window,            // 在瀏覽器中，this 所指向的便是瀏覽器物件 window
  VO: {                    // Variable Object
    a: 1,
    b: 2,
  }
  scopeChain: globalEC.VO  // 因為已經是最外層
}
```
而其中，就有這麼一個「this」存在，如果在全域使用到 this 就會找到一個全域 this 變數，根據環境的不同而改變預設值，在 node.js 指的是一個叫 global 變數，而在瀏覽器會指向一個 window 物件，除非開啟嚴格模式 `'use strict'`，那就就會是 undefined。

而一般的 function（非構造函數），this 也會是預設值，它本身和 function 並沒有關聯。

#### 3. DOM 的 this
如果是透過瀏覽器 DOM 提供的 API 來對節點做存取或操作，它對應的 this 就會試瀏覽器點擊事件的主體，實際操作的東西。


### 💡 改變 this：call、apply 和 bind 方法
apply、bind、call，是 `Function.prototype` 中的三個函式，他們可以動態改變函數的 this
* call、apply 皆是回傳 function 執行結果
* bind 方法回傳的是綁定 this 後的原函數

#### bind
透過 bind()，可以強制綁定 this 的值，因為是回傳一個 function 而非執行。通過借用已建立的函式來創造新的函式，將 this 綁到指定的物件上
```javascript=
var name = 'foo'
function logName(){
  console.log(this.name)
}
var tmp = {
  name: 'bar'
}
var newFunction = logName.bind(tmp)
logName()     // foo
newFunction() // bar
```
比較少使用到的是，bind 還可以綁定傳入函式的參數，bind() 接受的第一位參數為指定的 this，其餘參數則依序傳給被綁定的函式，作為固定的參數，最後會回傳一個新的函式。



#### 兩種呼叫 function 的方法：call 與 apply
它們的第一個參數同樣是**改變 this 的值**，兩者用途幾乎一樣，僅接受的參數類型不同，apply 接續傳入的參數會用陣列。


用 call() 傳入什麼，就會改到 this，用它來做建構子要做的事情
```javascript=
function test() {
    console.log(this)  // [string: '123']
}
test.call('123')
```

```javascript=
function test(a, b, c) {
    console.log(this)  // [Number: 123]
}

test.call(123, 1, 2, 3)
test.apply(123, [1, 2, 3])
```


### 💡 特例！箭頭函數 Arrow functions
在物件使用回調時，可以拿到正確的 this

* 傳統函式：this 依呼叫的方法而定
* 箭頭函式：this 是依據綁定到其定義時所在的物件


多數時候一般函數差不多，最大的差別在於「它的 this 完全根據程式碼定義的位置」，也就是說在 arrow 裡面的 this 永遠都是語意上的 this ，不管是誰呼叫他，或是被如何 bind、call、apply，他永遠都是拿到原先作用域的 this 。


### 小結
* 如果是物件或類別的話，this 就會是它本身
* this 跟它如何被呼叫有關係，用不同方式呼叫 this 就會不一樣
* bind() 方法，強制綁定 this 的值，是回傳一個 function，而不像 call 或 apply 是直接呼叫那個 funciton
* 特例：箭頭函式，跟怎麼呼叫無關，反而和 scope 很像，**跟程式碼定義有關**


### 參考資料：
1. [JS基礎：Primitive type v.s Object types](https://medium.com/@jobboy0101/js%E5%9F%BA%E7%A4%8E-primitive-type-v-s-object-types-f88f7c16f225)
2. [JavaScript ：Primitive Types 純值(基本型別)介紹](https://dotblogs.com.tw/susan_code/2017/07/06/162049)
3. [運算式與運算子](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Expressions_and_Operators#%E4%B8%80%E5%85%83%E9%81%8B%E7%AE%97%E5%AD%90)
4. [你懂 JavaScript 嗎？#4 型別（Types）](https://cythilya.github.io/2018/10/11/types/)
5. [資料類型(值)](https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part3/datatype.html)
6. [變數提升（Hoisting）與暫時死區（TDZ）](https://blog.techbridge.cc/2018/11/10/javascript-hoisting/)
7. [一次搞懂前端面試最愛問的 apply、bind、call](https://medium.com/schaoss-blog/%E4%B8%80%E6%AC%A1%E6%90%9E%E6%87%82%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%A9%A6%E6%9C%80%E6%84%9B%E5%95%8F%E7%9A%84-apply-bind-call-708f57518776)
8. [[JavaScript] 函數原型最實用的 3 個方法 — call、apply、bind](https://medium.com/@realdennis/javascript-%E8%81%8A%E8%81%8Acall-apply-bind%E7%9A%84%E5%B7%AE%E7%95%B0%E8%88%87%E7%9B%B8%E4%BC%BC%E4%B9%8B%E8%99%95-2f82a4b4dd66)
9. [JavaScript this Keyword 關鍵字](https://www.fooish.com/javascript/this.html)
10. [淺談 JavaScript 頭號難題 this：絕對不完整，但保證好懂](https://blog.huli.tw/2019/02/23/javascript-what-is-this/)
11. [this 的值到底是什么？一次说清楚](https://zhuanlan.zhihu.com/p/23804247)
