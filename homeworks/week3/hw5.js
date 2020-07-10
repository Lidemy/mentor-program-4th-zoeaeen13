// 聯誼順序比大小
/* global BigInt */
const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function whoWin(a, b, rule) {
  // 一樣大就回傳
  if (a === b) {
    return 'DRAW';
  }

  // 當比數字大
  if (rule === '1') {
    return a > b ? 'A' : 'B';
  }
  // 當比數字小
  if (rule === '-1') {
    return a > b ? 'B' : 'A';
  }

  // default 回傳值
  return 'A';
}

function showResult(input) {
  for (let i = 1; i < input.length; i += 1) {
    const nums = input[i].split(' ');
    console.log(whoWin(BigInt(nums[0]), BigInt(nums[1]), nums[2]));
  }
}


rl.on('close', () => {
  showResult(lines);
});
