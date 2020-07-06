//實作 join 函式
function join(arr, concatStr) {
    var newStr = ''
    for(let i = 0; i < arr.length; i++) {
        //最後一個字的後面，不需要再放 concatStr
        if(i === arr.length-1) {
            newStr += arr[i]
        } else {
            newStr += arr[i] + concatStr
        }
    }
    
    return newStr
}

//實作 repeat 函式
function repeat(str, times) {
    var newStr = ''
    for(let i = 1; i <= times; i++) {
        newStr += str
    }
    return newStr
}

console.log(join([1, 2, 3], ','));
console.log(join(["a", "b", "c"], "!"));
console.log(join(['a'], '!'));
console.log(repeat('a', 5));
console.log(repeat('haha', 2));
console.log(repeat('*', 3));
