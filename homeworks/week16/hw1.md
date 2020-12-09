## hw1：Event Loop
在閱讀之前，請先參考 [hw5](./hw5.md) 筆記內容認識 Call Stack、Web APIs、Event Loop 等名詞，這樣才可以理解以下的步驟。
```javascript=
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```


##### 1. 第一行 `console.log(1)` 任務進入到堆疊中執行，印出 1

JS 是一個單執行緒的語言，它一次只能做一件事，這些任務會被放到執行堆疊（call stack）上依序執行，所以第一行的 `console.log(1)` 被執行而印出 1。

##### 2. 第一個 setTimeout() 進入到堆疊

一旦呼叫到其他函式，Global Execution Context 就幫呼叫到的函式產生新的 Execution Context，放到堆疊最上方，但是 setTimeout() 其實不存在於 JavaScript 原始碼內，它是屬於瀏覽器提供的 Web APIs 一種，所以跟瀏覽器溝通後會被移到其他的執行緒執行，而不影響 JS 主執行緒。

##### 3. JS 略過第一個 setTimeout() 繼續執行，則瀏覽器啟動一個 0 毫秒的計時器
設置 0 毫秒，第一個 setTimeout() 計時完成，`() => { console.log(2) }` 就被瀏覽器移到 Callback Queue（回調序列），而同時 JS 繼續執行堆疊的程式碼。

##### 4. 同時 JS 執行到了 `console.log(3)`，印出 3
一般程式碼，直接在當前的堆疊中執行印出來。

##### 5. 第二個 setTimeout() 進入到堆疊
第二個 setTimeout() 進入到堆疊，同樣因為是 Web APIs 而被 JS 忽略，瀏覽器將它移到其他的執行緒，不影響 JS Runtime 執行。

##### 6. JS 略過第二個 setTimeout() 繼續執行，瀏覽器啟動一個 0 毫秒的計時器
設置 0 毫秒，第二個 setTimeout() 計時完成，它裡面的 callback function  `() => { console.log(4) }` 就被瀏覽器移到 Callback Queue（回調序列）

這時候注意，在 Callback Queue 裡面已經有兩個 callback function，分別是
`() => { console.log(2) }` 在前、`() => { console.log(4) }` 排後，而他們遲遲不能回調的原因是因為堆疊裡面還有東西在執行。

##### 7. 同時 JS 執行到了最後一行 `console.log(5)`，印出 5
當前的堆疊因為最後一行執行完畢而清空，這時候 Event Loop 發現了堆疊的狀態是空的，跑到 Callback Queue 中檢查有沒有準備好的 callback function，其實 Event Loop 在整個過程是幾乎無時無刻、每一毫秒都在運作，它馬上把最前面的 callback functiton 抓起來送到堆疊上執行，也就是執行 `() => { console.log(2) }`。
 
##### 8. 呼叫 `console.log(2)`，印出 2
執行完這行後，這時 call stack 又再次清空，Event Loop 發現 Queue 中還有等待回調的 callback function`() => { console.log(4) }`，立即安排它去到堆疊執行。

##### 9.  呼叫 `console.log(4)`，印出 4
最後，整個程式碼執行完畢，依序印出 1、3、5、2、4 的結果。我們可以從中得到幾個結論：
1. 堆疊當下的程式碼會執行完畢，過程中不會被 Queue 中等待的 callback function 打斷
2. 將 setTimeout() 延遲時間設為 0，不代表程式會立即執行到，它的 cb 依然會被排在 Queue 等待堆疊清空
3. JavaScript 還是跑單執行緒，但 Web APIs 提供了它運作多任務的可能，利用 Event Loop 機制來協調、幫助 JavaScript 執行任務