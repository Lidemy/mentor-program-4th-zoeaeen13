function capitalize(str) {
    var ans = ''
    for(let i = 0; i < str.length; i++) {
        if(i == 0) {                           //只對第一個字判斷
            ans += setCapitalize(str[0])
        } else {
            ans += str[i]
        }
    }
    return ans

}

//轉大寫的函式
function setCapitalize(word) {
    var code = word.charCodeAt(0)              //因我參數只傳一個字，直接取第0個
    if (code >= 97 && code <= 122) {
        return String.fromCharCode(code - 32)  //判斷小寫字母，回傳大寫
    } else {
        return word                            //非小寫字母，不作改變
    }
}


//測試用
console.log(capitalize('hello'));
console.log(capitalize('Nick'));
console.log(capitalize(',hello'));
console.log(capitalize('universal'));
console.log(capitalize('_eei'));