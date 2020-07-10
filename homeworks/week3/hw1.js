// hw1 - 好多星星
// 輸入一正整數 N，1<=N<=30，依照規律輸出正確圖形

const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});


function printStars(input) {
  const num = Number(input[0]);
  let ans = '';
  for (let i = 1; i <= num; i += 1) {
    ans += '*';
    console.log(ans);
  }
}

rl.on('close', () => {
  printStars(lines);
});
