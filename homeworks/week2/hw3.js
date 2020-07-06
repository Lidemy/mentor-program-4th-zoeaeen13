function reverse(str) {
    var newStr = ''
    for(let i = str.length-1; i>=0; i--) {  //從字串最後開始取，讓 i 遞減
        newStr += str[i]
    }
    console.log(newStr)
}

reverse('hello');
reverse('1,2,3,2,1')
reverse('1abc2')
reverse('yoyoyo')