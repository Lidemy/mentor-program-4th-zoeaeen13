//實作 join 函式
function join(arr, concatStr) {
    var newStr = ''
    for(let i = 0; i < arr.length; i++) {
        if(i === arr.length-1) {
            newStr = newStr + arr[i]
        } else {
            newStr = newStr + arr[i] + concatStr
        }
    }
    
    return newStr
}

//實作 repeat 函式
function repeat(str, times) {
    var newStr = ''
    for(let i=1; i<=times; i++) {
        newStr = newStr + str
    }
    return newStr
}

console.log(join([1, 2, 3], ','));
console.log(join(["a", "b", "c"], "!"));
console.log(join(['a'], '!'));
console.log(repeat('a', 5));
console.log(repeat('haha', 2));
console.log(repeat('*', 3));
