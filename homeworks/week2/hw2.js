// 轉大寫的函式
function setCapitalize(word) {
  const code = word.charCodeAt(0);
  if (code >= 97 && code <= 122) {
    return String.fromCharCode(code - 32);
  }
  return word;
}

function capitalize(str) {
  let ans = '';
  for (let i = 0; i < str.length; i += 1) {
    if (i === 0) {
      ans += setCapitalize(str[0]);
    } else {
      ans += str[i];
    }
  }
  return ans;
}

// 測試用
console.log(capitalize('hello'));
console.log(capitalize('Nick'));
console.log(capitalize(',hello'));
console.log(capitalize('universal'));
console.log(capitalize('_eei'));
