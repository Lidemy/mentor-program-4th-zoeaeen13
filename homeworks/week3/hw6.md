## hw1：好多星星
1. 題目：[LIOJ1021 好多星星](https://oj.lidemy.com/status/a737419e7b0a9ab7c18a594c21f723bf)
2. 敘述：輸入為一個數字 N，請按照規律輸出正確圖形
```javascript=
// 主要程式碼
function printStars(input) {
  const num = Number(input[0]);
  let ans = '';
  for (let i = 1; i <= num; i += 1) {
    ans += '*';
    console.log(ans);
  }
}
```

#### 解題思考
根據範例，輸入 1 會印出一行，裡面有一顆星「*」，輸入 5 會印出五行，第幾行就有幾顆星星，於是很容易可以知道我們需要用到
* 迴圈
* 每一個迴圈都要印東西

取出輸入的 N，將它從字串轉為數字型態，寫好迴圈的架構，從 1 跑 N 次：

```javascript=
function printStars(input) {
  const num = Number(input[0]);
  for (let i = 1; i <= num; i += 1) {
      //每一行要做的事
  }
}
```

接下來要思考每一行迴圈需要做什麼事，第一行要「`*`」、第二行要印「`**`」...到第 5 行印「`*****`」。於是設一個空字串 ans，每跑一迴圈就加上「*」

```javascript=
ans += '*';
console.log(ans);
```
因為不想用內建函式，本來我是自己寫一個 repeat 的函式，後來發現其實只要每跑一次加上一個星星就能達到題目要求。


## hw2：水仙花數
1. 題目：[LIOJ1025 水仙花數](https://oj.lidemy.com/status/43e42d0a57ccacbca9f82795c53e7a9d)
2. 敘述：輸入為兩個用空白分割的正整數 N 與 M，1 <= N <= M <= 10^6，輸出從 N 到 M（包含 N 與 M）有哪些水仙花數

```javascript=
// 主要程式碼
function printNumbers(input) {
  const [fromN, toM] = input[0].split(' ');
  for (let i = Number(fromN); i <= Number(toM); i += 1) {
    if (isNarcissistic(i)) {
      console.log(i);
    }
  }
}
```
#### 解題思考
概念是使用迴圈，讓 i 從 N 跑到 M，讓 i 值丟進一判斷水仙花數的函式，如果是水仙花數就印出來，讓程式碼比較易讀

```javascript=
function isNarcissistic(num) {
  // 如果個位數 => 直接判斷為水仙花數，回傳true
  if (num < 10) {
    return true;
  }

  const str = String(num);
  const digit = str.length;
  let total = 0;
  for (let i = 0; i < digit; i += 1) {
    total += Math.pow(Number(str[i]), digit);
  }
  return total === num;
}
```

* 要判斷 n 位數 -> 將數字轉成字串，用 String.length 取得字串長度
* 把每一個字元轉成數字，個別乘以 n 次方加總

#### 程式碼改進
判斷是否為水仙花數時，本來是要判斷 isNarcissistic(i) 要回傳一個字串，如果字串相等就印出 i，後來想到可以使用本身就是二元性質的布林值
```
// 修正前
return total === num ? 'YES' : 'NO';
if (isNarcissistic(i) === 'YES')

// 修正後
return total === num;
if (isNarcissistic(i))
```


## hw3：判斷質數
1. 題目：[LIOJ1020 判斷質數](https://oj.lidemy.com/status/33ee14db56396efb411f71fd2e641693)
2. 敘述：針對每一筆輸入，如果 P 是質數，輸出 Prime，否之則輸出 Composite

```javascript=
// 主要程式碼
function showPrimeNum(input) {
  for (let i = 1; i < input.length; i += 1) {
    const num = Number(input[i]);
    console.log(isPrime(num));
  }
}
```

#### 解題思考

寫一函式 isPrime(num) 判斷每一筆數值是否為質數，將其印出，本來我只寫了一個迴圈，判斷從 2 跑到 num 其中有沒有因數，但想想這樣一來要花費很多的時間，且沒必要每筆都檢測，例如數字 15 的因數有 1、3、5、15，只要檢驗到 3 即可，不需要檢測到 5，因為 `3*5` 是一組的；又比如 100 的因數有 `1*100`、`2*50`、`4*25`、`5*20`、`10*10` 這些，至多檢測到 10 即可。

那我只需要知道如何找到這個分割的點，減少跑的迴圈數？
> 假如一個數 N 是合數，它有一個約數 a
a×b=N 則 a、b 兩個數中必有一個大於或等於根號 N，一個小於或等於根號 N。
因此，只要小於或等於根號N的數（1 除外）不能整除 N，則 N 一定是素數。
>
> 那麼，只要去過濾所有小於根號 N 的質數就可以了。

若 n 是合成數，必有一個小於根號 n 的質因數，查一些資料有提到因式檢驗法，於是將 num 開根號無條件捨去，從 2 開始跑迴圈，並且先判斷一些 Edge cases（如 1、2、3）

```
function isPrime(num) {
  // 如果傳入1
  if (num === 1) {
    return 'Composite';
  }
  // 如果傳入2或3
  if (num === 2 || num === 3) {
    return 'Prime';
  }
  // 檢測從2到num開根號的數字，有沒有可以整除的
  for (let i = 2; i <= Math.floor(Math.sqrt(num)); i += 1) {
    if (num % i === 0) {
      return 'Composite';
    }
  }
  return 'Prime';
}
```

#### 參考資料
* [[演算法] Algorithm: Sieve of Eratosthenes 質數判斷](https://pjchender.github.io/2017/09/26/%E6%BC%94%E7%AE%97%E6%B3%95-algorithm-sieve-of-eratosthenes-%E8%B3%AA%E6%95%B8%E5%88%A4%E6%96%B7/)
* [如何有效率地寫程式判斷質數](https://magiclen.org/prime-number/)



## hw4：判斷迴文
1. 題目：[LIOJ1030 判斷迴文](https://oj.lidemy.com/status/781305c4a367041e020347e8de00d71a)
2. 敘述：是迴文請輸出 True，否之則輸出 False

```javascript=
// 主要程式碼
function isPalindrome(input) {
  const str = input[0];
  let newStr = '';
  for (let i = str.length - 1; i >= 0; i -= 1) {
    newStr += str[i];
  }
  console.log(str === newStr ? 'True' : 'False');
}
```

同第一題，減少使用內建函式達到題目要求。
這題沒有什麼好說的，跟「先別急著寫 LeetCode」一題相似，就是將字串倒過來判斷而已。

值得一提的是，本來想直接印出 `str === newStr` 結果卻一直報錯，後來發現布林值印出來是小寫，而不是題目要求的 True 及 False，以後要多留意題目、看清楚再寫。

```
//錯誤寫法
console.log(str === newStr)
```

## hw5：聯誼順序比大小
1. 題目：[LIOJ1004 聯誼順序比大小](https://oj.lidemy.com/status/3fe291cccf8586eeb7a987f90eb6ff3f)
2. 敘述：針對每一筆輸入，請輸出贏家是誰。若是 A 贏請輸出 A，B 贏請輸出 B，平手則輸出 DRAW

```
// 印出結果
function showResult(input) {
  for (let i = 1; i < input.length; i += 1) {
    const [a, b, rule] = input[i].split(' ');
    console.log(whoWin(BigInt(a), BigInt(b), rule));
  }
}
```

取出 A、B 和該局規則，丟入一 whoWin(a, b, rule) 函式判斷，這裡要注意題目給的條件：

```
function whoWin(a, b, rule) {
  // 一樣大就回傳
  if (a === b) {
    return 'DRAW';
  }

  // 當比數字大
  if (rule === '1') {
    return a > b ? 'A' : 'B';
  }

  // 既不是平手，也不是比數字大
  return a > b ? 'B' : 'A';
}
```

#### 解題思考
這題我就是單純判斷比大小，沒有留意到題目給規則「1 和 -1」的深意，一直到幫同學 debug 時才發現應該有更好的做法，而**最大整數的條件限制**問題倒是一下就想到原因了，隨即找到有 BigInt() 語法，輕鬆解決，不過這也需要在 ESLint 時添加 `/* global BigInt */` 才能順利交作業。

ESLint 雖然繁瑣，在過程中倒是提點出自己一些邏輯不足的部分，我時常會在不必要的地方過度使用 if-else 語法，經提示「Unnecessary 'else' after 'return'」發現不需要這樣寫：
```
// 修正前
  if (rule === '1') {
    return a > b ? 'A' : 'B';
  } else {
    return a > b ? 'B' : 'A';
  }


// 修正後
  if (rule === '1') {
    return a > b ? 'A' : 'B';
  }
  return a > b ? 'B' : 'A';

```