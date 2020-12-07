## hw4：What is this?
在閱讀之前，可以先參考 [hw5](./hw5.md) 筆記內容認識 this 及相關用法。
請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。
```javascript=
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // 2
obj2.hello() // ??
hello() // undefined
```

this 跟它如何被呼叫有關係，而跟程式碼怎麼定義無關，用不同方式呼叫 this 就會產生不一樣的結果。
1. 物件模式
在物件導向裡面，如果是屬於某物件（object）的方法/屬性，this 是它即將對應到的原型，也就是用 this 來指物件本身。
```javascript=
class Car {
  setName(name) {
    this.name = name
  }
}
  
const myCar = new Car()
myCar.setName('hello')
```
2. 非物件模式，在談 scope chain 時有提過，程式碼運行前的 Runtime 被建立，全域執行環境 Global Execution Context裡面存放著環境中會需要用到的各種資源。
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
而其中，就有這麼一個「this」關鍵字的存在，根據環境的不同而改變預設值，在 node.js 指的是一個叫 global 變數，而在瀏覽器會指向一個 window 物件，除非開啟嚴格模式 `'use strict'`，那就就會是 undefined。全域環境中 this 沒有什麼特別意義。

3. DOM APIs
如果是透過瀏覽器 DOM 提供的 APIs，例如 addEventListener() 來對節點做存取或操作，它對應的 this 就會是瀏覽器點擊事件的主體，是觸發事件的元素。
```javascript=
var lbl = document.querySelector('.lbl');

lbl.addEventListener('click', function (e) {
  console.log(this.tagName);      // "label"
}, false);
```

4. 使用 call、apply、bind 方法調用的 this

一般認為呼叫 JS 函數有以下幾種形式，不過實際上前兩種只是透過一些方式轉換成第三種，第三種才是正常的調用方法
```javascript=
func(p1, p2) 
obj.child.method(p1, p2)
func.call(context, p1, p2) // 先不談 apply，兩者滿相似的
```
所以其實可以看成
```javascript=
func(p1, p2)
func.call(undefined, p1, p2)

obj.child.method(p1, p2)
obj.child.method.call(obj.child, p1, p2)
```

##### this，就是函式前面的 context
JS 開始執行一個函數，它的運行環境從原來的 Global Code 變為 Function Code，會創建一個 execution context 對象，this 就是你呼叫一個函式時傳的 context。

第一種調用方式，一旦看成 `func.call()` 就知道它沒有傳任何 context 進來，理所當然是 unfined，不過如果 this 是 null 或 undefined 就會去全域默認的 this 變數。

而用 call() 方法傳的第一個參數，可以動態改變 this 的值。

---
回到題目，來看它所呼叫的方式是如何決定 this 的值，
```javascript=
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello()    // obj.inner.hello.call(obj.inner)
obj2.hello()         // obj2.hello.call(obj2) => obj2.hello.call(obj.inner)
hello()              // hello.call()
```
1. `obj.inner.hello()` 裡面的 this 是 `obj.inner`，因此 this.value 的值就會是 `obj.inner.value` 的值，印出 2
2. `obj2.hello()` 的 this 是 `obj2`，而 `obj2` 就是 `obj.inner`，和上面一樣印出 2
3. 至於最後一個沒有傳任何 context，可以很清楚知道它會是預設的 this 值，就要看在哪個環境執行或是嚴格模式下將是 undefined

### 參考資料
* [一次搞懂前端面試最愛問的 apply、bind、call](https://medium.com/schaoss-blog/%E4%B8%80%E6%AC%A1%E6%90%9E%E6%87%82%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%A9%A6%E6%9C%80%E6%84%9B%E5%95%8F%E7%9A%84-apply-bind-call-708f57518776)
* [[JavaScript] 函數原型最實用的 3 個方法 — call、apply、bind](https://medium.com/@realdennis/javascript-%E8%81%8A%E8%81%8Acall-apply-bind%E7%9A%84%E5%B7%AE%E7%95%B0%E8%88%87%E7%9B%B8%E4%BC%BC%E4%B9%8B%E8%99%95-2f82a4b4dd66)
* [JavaScript this Keyword 關鍵字](https://www.fooish.com/javascript/this.html)
* [淺談 JavaScript 頭號難題 this：絕對不完整，但保證好懂](https://blog.huli.tw/2019/02/23/javascript-what-is-this/)
* [this 的值到底是什么？一次说清楚](https://zhuanlan.zhihu.com/p/23804247)