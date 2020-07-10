// hw3 - 判斷迴文
// 一個字串 S，1 <= length(S) <= 100，是迴文就輸出 True，反之 False


const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function isPalindrome(input) {
  const str = input[0];
  let newStr = '';
  for (let i = str.length - 1; i >= 0; i -= 1) {
    newStr += str[i];
  }
  console.log(str === newStr ? 'True' : 'False');
}

rl.on('close', () => {
  isPalindrome(lines);
});
