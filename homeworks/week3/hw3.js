// hw3 - 判斷質數
/* eslint-disable no-restricted-properties, no-unused-expressions */

const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});


function isPrime(num) {
  // 如果傳入1
  if (num === 1) {
    return 'Composite';
  }
  // 如果傳入2或3
  if (num === 2 || num === 3) {
    return 'Prime';
  }
  // 檢測從2到num開根號的數字，有沒有可以整除的
  for (let i = 2; i <= Math.floor(Math.sqrt(num)); i += 1) {
    if (num % i === 0) {
      return 'Composite';
    }
  }
  return 'Prime';
}

function showPrimeNum(input) {
  for (let i = 1; i < input.length; i += 1) {
    const num = Number(input[i]);
    console.log(isPrime(num));
  }
}

rl.on('close', () => {
  showPrimeNum(lines);
});
