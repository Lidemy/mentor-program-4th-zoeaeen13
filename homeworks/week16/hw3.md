## hw3：Hoisting
在閱讀之前，請先參考 [hw5](./hw5.md) 內容認識 Execution Context 和 Scope Chain，這樣才可以理解以下的步驟，以下小標題的第一數字代表目前處於哪一層，第二個數字代表執行步驟。
```javascript=
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

#### 1-1. 創造階段：建立全域執行環境 GlobalEC
每一個 EC 都會配有一個執行環境物件（Execution context object），它是負責紀錄環境中會需要用到的各種資源，它擁有 3 個屬性：
* 變數物件（Variable Object）
* 作用域鏈（Scope Chain）
* This 變數（略過不談）

所以在運行前，我們的 globalEC 和它的執行環境物件先被建立
```javascript=
globalEC {
    VO: {
    
    },
    scopeChain: [globalEC.VO]
}
```
scope chain 是由它的 VO 加上本身的 `scope 屬性` 所組成，`scope 屬性` 是在宣告每一個 function 時就決定好的，但因為 globalEC 不是 function，所以它並沒有 scope 屬性，它的 scope chain 裡面只有 `globalEC.VO`。

#### 1-2. 創造階段：初始化變數 a 和 fn
```javascript=
globalEC {
    VO: {
        a: undefined,
        fn: func
    },
    scopeChain: [globalEC.VO]
}
```

#### 1-3. 創造階段：fn 是一個 function，所以要設定它的 scope 屬性
前面提到 `scope 屬性` 是在 function 宣告時就決定好的，它的值其實就是它那層 EC 的 scope chain，於是把 `globalEC.scopeChain` 指給 fn 的 `scope 屬性`

```javascript=
globalEC {
    VO: {
        a: undefined,
        fn: func
    },
    scopeChain: [globalEC.VO]
}

// 設定屬性
// fn.[[scope]] = globalEC.scopeChain ===> [global.VO]
```

終於建立好默認執行環境和環境物件，準備進入 globalEC 的執行階段（Execution Phase），它會開始由上到下、一行一行地執行程式，並自動跳過函式裡的程式碼（因為你還沒有要執行函式）
```javascript=
var a = 1  // 開始執行
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```
#### 1-4. 執行階段：對 a 進行賦值
將 `globalEC.VO` 裡面的 a 值從 undefined 變成 1
```javascript=
globalEC {
    VO: {
        a: 1,
        fn: func
    },
    scopeChain: [globalEC.VO]
}

// 設定屬性
// fn.[[scope]] = globalEC.scopeChain ===> [global.VO]
```

#### 1-5. 執行階段：呼叫函式 fn
呼叫到函式 fn，globalEC 會為它建立一個全新的執行環境，專門供 fn 裡面的程式碼運行，這個新的環境會被堆疊在原本的 globalEC 上面，這個堆疊的過程被稱為「執行堆疊（Execution stack）」

![](https://i.imgur.com/YbiQ0O9.png)

JavaScript 是單執行緒，它會優先處理堆疊中最頂端的執行環境，因此 globalEC 為 fn 準備的這個執行環境會放到頂端優先執行，我們可以稱正在執行中的 fnEC 為「現行環境 （Active context）」

#### 2-6. 創造階段：建立新的執行環境 fnEC

現在，我們進入了第二層 fnEC 的創造階段，和剛剛一樣先建立 fnEC 和它的執行環境物件，這裡有個不一樣的地方，fnEC 的變數物件不再寫 VO 而是 AO，為什麼呢？

我們都知道每個執行環境會包含變數物件（Variable Object）。

而執行函式所創造出來的執行環境中，則會另把參數（parameters）也加進去變數物件中，這個多了參數的變數物件就被稱為是「活化（Acativation Object）」，本質上它還是變數物件，只是版本不一樣而已

```javascript=
// 第二層
fnEC {
    AO: {
        argument: [],
    }

    scopeChain: [fnEC.AO, fnEC.[[scope]]]  // ===> fnEC.AO + global.VO
}

// 第一層
globalEC {
    VO: {
        a: 1,
        fn: func
    },
    scopeChain: [globalEC.VO]
}

// 設定屬性
// fn.[[scope]] = globalEC.scopeChain ===> [global.VO]
```
fnEC 的 scope chain 是它的 AO 加上它本身的 `scope 屬性` 組成（記得嗎？在 globalEC 宣告時 fn 時就設定好它的屬性了），當時設定它的 `scope 屬性` 是 `global.VO` ，所以實際上 fnEC 的作用域鍊就是 `fnEC.AO + global.VO`


#### 2-7. 創造階段：初始化 a 和 fn2
```javascript=
// 第二層
fnEC {
    AO: {
        a: undefined,
        fn2: func
    }

    scopeChain: [fnEC.AO, fnEC.[[scope]]]  // ===> fnEC.AO + global.VO
}

// 第一層
globalEC {
    VO: {
        a: 1,
        fn: func
    },
    scopeChain: [globalEC.VO]
}

// fn.[[scope]] = globalEC.scopeChain ===> [global.VO]
```
#### 2-8. 創造階段：fn2 是一個 function，設定它的 scope 屬性
它的值其實就是它那層 fnEC 的 scope chain，於是把 `fbEC.scopeChain` 指給 fn2 的 `scope 屬性`
```javascript=
// 第二層
fnEC {
    AO: {
        a: undefined,
        fn2: func
    }

    scopeChain: [fnEC.AO, fnEC.[[scope]]]  // ===> fnEC.AO + global.VO
}
// 設定屬性
// fn2.[[scope]] = fnEC.scopeChain ===> [fnEC.AO, global.VO]


// 第一層
globalEC {
    VO: {
        a: 1,
        fn: func
    },
    scopeChain: [globalEC.VO]
}

// 設定屬性
// fn.[[scope]] = globalEC.scopeChain ===> [global.VO]
```
建立好 fnEC 執行環境，準備進入執行階段，將依序執行 fn 的程式碼
```javascript=
function fn(){
  console.log(a)  // 開始執行
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
}
```

#### 2-9. 執行階段：印出 a 的值 => undefined
JavaScript 在查找變數時，是會循著 scope chain 逐一查找，看函式自身的變數件上是否有該變數，如果沒有就往外層的 EC 物件看看
```javascript=
fnEC {
    AO: {
        a: undefined,
        fn2: func
    }
    scopeChain: [fnEC.AO, fnEC.[[scope]]]  // ===> fnEC.AO + global.VO
}
```
剛剛已經在創造階段就已經初始化 a 和 fn2，所以直接印出 a 的值是 undefined
```javascript=
  console.log(a)  // undefined
```

#### 2-10. 執行階段：對 a 賦值
將 AO（變數物件）裡面的 a 值設為 5
```javascript=
fnEC {
    AO: {
        a: 5,
        fn2: func
    }
    scopeChain: [fnEC.AO, fnEC.[[scope]]]  // ===> fnEC.AO + global.VO
}
```
#### 2-11. 執行階段：印出 a 的值 => 5

```javascript=
function fn(){
  console.log(a)  // undefined
  var a = 5
  console.log(a)  // 5
  ...
}
```
#### 2-12. 執行階段：a++
執行到 a++ 這行，所以 a 的值被更改為 6
```javascript=
fnEC {
    AO: {
        a: 6,
        fn2: func
    }
    scopeChain: [fnEC.AO, fnEC.[[scope]]]  // ===> fnEC.AO + global.VO
}
```
#### 2-13. 執行階段：執行到 `var a` 不影響任何東西，因為已經宣告過變數 a 了


#### 2-14. 執行階段：呼叫函式 fn2
呼叫到函式 fn2，fnEC 也為它建立一個新的執行環境，被堆疊在 globalEC 和 fnEC 上面

![](https://i.imgur.com/fyfUX4l.png)

#### 3-15. 創造階段：建立新的執行環境 fn2EC
進入了 fn2EC 的創造階段，建立變數物件和 scope chain
```javascript=
// 第三層
fn2EC {
    AO: {
    
    },
    scopeChain: [fn2EC.AO, fn2EC.[[scope]]] //fn2Ec.AO + fnEC.AO + global.VO
}


// 第二層
fnEC {
    AO: {
        a: 6,
        fn2: func
    }
    scopeChain: [fnEC.AO, fnEC.[[scope]]]  // fnEC.AO + global.VO
}

// 設定屬性
// fn2.[[scope]] = fnEC.scopeChain ===> [fnEC.AO, global.VO]


// 第一層
globalEC {
    VO: {
        a: 1,
        fn: func
    },
    scopeChain: [globalEC.VO]
}

// 設定屬性
// fn.[[scope]] = globalEC.scopeChain ===> [global.VO]
```
沒有宣告任何東西，接著進入 fn2EC 的執行階段，將依序執行以下程式碼
```javascript=
function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
```
#### 3-16. 執行階段：印出 a 的值 => 6
循著 scope chain 逐一查找，因為 `fn2.AO` 沒有 a，往外層的 EC 物件看看，找到 `fnEC.AO ` 的 a，故印出 a 的值是 6
```javascript=
// 第三層
fn2EC {
    AO: {
    
    },
    scopeChain: [fn2EC.AO, fn2EC.[[scope]]] //fn2Ec.AO + fnEC.AO + global.VO
}

// 第二層
fnEC {
    AO: {
        a: 6,
        fn2: func
    }
    scopeChain: [fnEC.AO, fnEC.[[scope]]]  // fnEC.AO + global.VO
}
```
#### 3-17. 執行階段：賦值 a 是 20
因為 `fn2.AO` 本身沒有 a，也是找到 `fnEC.AO` 的 a 將其值設為 20
```javascript=
// 第三層
fn2EC {
    AO: {
    
    },
    scopeChain: [fn2EC.AO, fn2EC.[[scope]]] //fn2Ec.AO + fnEC.AO + global.VO
}


// 第二層
fnEC {
    AO: {
        a: 20,
        fn2: func
    }
    scopeChain: [fnEC.AO, fnEC.[[scope]]]  // fnEC.AO + global.VO
}
```
#### 3-18. 執行階段：賦值 b 是 100
一路沿著 scope chain，到處都找不到變數 b，最後只得找到最上層 globalEC 去宣告 b，將其賦值為 100
```javascript=
// 第三層
fn2EC {
    AO: {
    
    },
    scopeChain: [fn2EC.AO, fn2EC.[[scope]]] //fn2Ec.AO + fnEC.AO + global.VO
}


// 第二層
fnEC {
    AO: {
        a: 20,
        fn2: func
    }
    scopeChain: [fnEC.AO, fnEC.[[scope]]]  // fnEC.AO + global.VO
}

// 第一層
globalEC {
    VO: {
        a: 1,
        fn: func,
        b: 100
    },
    scopeChain: [globalEC.VO]
}
```
#### 3-19. 函式 fn2() 執行完畢
函式 fn2() 執行完畢，它的 EC 就會自動從執行堆疊的頂端抽掉，所以現在堆疊最上方的執行環境是 fnEC
```javascript=
// 第二層
fnEC {
    AO: {
        a: 20,
        fn2: func
    }
    scopeChain: [fnEC.AO, fnEC.[[scope]]]  // fnEC.AO + global.VO
}

// 第一層
globalEC {
    VO: {
        a: 1,
        fn: func,
        b: 100
    },
    scopeChain: [globalEC.VO]
}
```
#### 2-19. 執行階段：繼續執行 fn() 下一行指令，要印出 a => 20
剛剛 fn2() 中的賦值，實際上是作用在 `fnEC.VO` 中的 a，所以這裡的 a 會印出 20

#### 2-20. 函式 fn() 執行完畢
函式 fn() 執行完畢，fnEC 從執行堆疊的頂端抽掉，所以現在堆疊剩下一層 globalEC
```javascript=
// 第一層
globalEC {
    VO: {
        a: 1,
        fn: func,
        b: 100
    },
    scopeChain: [globalEC.VO]
}
```
將依序執行以下程式碼
```javascript=
...
fn() // 執行完畢

console.log(a)
a = 10
console.log(a)
console.log(b)
```
#### 1-21. 執行階段：印出 a 的值 => 1
找到 `globalEC.VO` 的 a，印出 a 的值是 1

#### 1-22. 執行階段：設定 a 是 10
#### 1-23. 執行階段：印出 a 的值 => 10
找到 `globalEC.VO` 的 a，印出 a 的值是 10

#### 1-24. 執行階段：印出 b 的值 => 100
找到 `globalEC.VO` 的 b，印出 a 的值是 100

以上就是所有的執行過程，我們一共印出了七個值，依序分別是

```
undefined
5
6
20
1
10
100
```
### 參考資料
* [秒懂！JavaSript 執行環境與堆疊](https://medium.com/%E9%AD%94%E9%AC%BC%E8%97%8F%E5%9C%A8%E7%A8%8B%E5%BC%8F%E7%B4%B0%E7%AF%80%E8%A3%A1/%E6%B7%BA%E8%AB%87-javascript-%E5%9F%B7%E8%A1%8C%E7%92%B0%E5%A2%83-2976b3eaf248)
* [我知道你懂 hoisting，可是你了解到多深？](https://blog.huli.tw/2018/11/10/javascript-hoisting-and-tdz/)
* [JavaScript 深入淺出 Variable Object & Activation Object](https://shawnlin0201.github.io/JavaScript/JavaScript-Variable-Object-and-Activation-Object/)
* [JavaScript 深入淺出 Execution Content 執行環境](https://shawnlin0201.github.io/JavaScript/JavaScript-Execution-Context/)

