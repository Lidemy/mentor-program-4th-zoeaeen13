// hw2 - 判斷質數
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
    return 'false';
  }
  // 如果傳入2或3
  if (num === 2 || num === 3) {
    return 'true';
  }
  // 檢測從2到num開根號的數字，有沒有可以整除的
  for (let i = 2; i <= Math.floor(Math.sqrt(num)); i += 1) {
    if (num % i === 0) {
      return 'false';
    }
  }
  return 'true';
}

function showPrimeNum(input) {
  for (let i = 1; i < input.length; i += 1) {
    isPrime(Number(input[i])) === 'true' ? console.log('Prime') : console.log('Composite');
  }
}

rl.on('close', () => {
  showPrimeNum(lines);
});
