function capitalize(str) {
    var ans = ''
    for(let i = 0; i < str.length; i++) {
        if(i == 0) {
            ans = ans + setCapitalize(str[0])
        } else {
            ans = ans + str[i]
        }
    }
    return ans

}

//轉大寫
function setCapitalize(word) {
    var code = word.charCodeAt(0)
    if (code >= 97 && code <= 122) {
        return String.fromCharCode(code - 32)
    } else {
        return word
    }
}


console.log(capitalize('hello'));
console.log(capitalize('Nick'));
console.log(capitalize(',hello'));
console.log(capitalize('universal'));
console.log(capitalize('_eei'));