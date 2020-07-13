## 挑戰題

現在有一個排序好的陣列 arr，裡面的元素都是正整數而且保證不會重複。
給你一個數字 n，請寫出一個函式 search 回傳 n 在這個陣列裡面的 index，沒有的話請回傳 -1。


``` js
search([1, 3, 10, 14, 39], 14) => 3
search([1, 3, 10, 14, 39], 299) => -1

//目標陣列、關鍵字
function search(array, keyword) {
    var left = 0
    var right = array.length-1
    while(left < right) {
        var middle = Math.floor((right-left)/2 + left)
        if(array[middle] === keyword) {
            return middle
        } else if (array[middle] < keyword) {
            left = middle + 1
        } else if (array[middle] > keyword) {
            right = middle -1
        }
    }
    return -1

}
```

---

## 超級挑戰題





## 超級超級挑戰題



