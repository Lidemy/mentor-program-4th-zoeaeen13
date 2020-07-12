// hw2 - 水仙花數
/* eslint-disable no-restricted-properties */

const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

// 先判斷水仙花數
function isNarcissistic(num) {
  if (num < 10) {
    return true; // 如果個位數 => 水仙花數
  }
  const str = String(num);
  const digit = str.length;
  let total = 0;

  for (let i = 0; i < digit; i += 1) {
    total += Math.pow(Number(str[i]), digit);
  }
  return total === num;
}

// 印出範圍內的水仙花數
function printNumbers(input) {
  const [fromN, toM] = input[0].split(' ');

  for (let i = Number(fromN); i <= Number(toM); i += 1) {
    if (isNarcissistic(i)) {
      console.log(i);
    }
  }
}

rl.on('close', () => {
  printNumbers(lines);
});
