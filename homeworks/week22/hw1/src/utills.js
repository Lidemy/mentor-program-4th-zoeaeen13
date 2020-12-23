import html2canvas from "html2canvas";
export function calculateTictactoe(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export function calculateGobang({ squares, row, col }) {
  if (row !== null) {
    const value = squares[col][row];
    const types = [
      [1, 0],
      [0, 1],
      [1, 1],
      [-1, 1],
    ];

    for (let i = 0; i < types.length; i += 1) {
      let counter = 0;
      let [x, y] = types[i];
      for (let j = 0; j < 2; j += 1) {
        const negativeHolderX = x;
        const negativeHolderY = y;
        while (
          row + x >= 0 &&
          col + y >= 0 &&
          row + x <= 18 &&
          col + y <= 18 &&
          value === squares[col + y][row + x]
        ) {
          counter += 1;
          x = negativeHolderX * (Math.abs(x) + 1);
          y = negativeHolderY * (Math.abs(y) + 1);
        }
        x = -negativeHolderX;
        y = -negativeHolderY;
      }
      if (counter >= 4) return value;
    }
  }
  return null;
}

export function screenshot() {
  html2canvas(document.getElementById("canva"))
    .then((canvas) => {
      document.body.appendChild(canvas);
    })
    .then(() => {
      const canvas = document.querySelector("canvas");
      canvas.style.display = "none";
      const image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const a = document.createElement("a");
      a.setAttribute("download", "GobangRecord.png");
      a.setAttribute("href", image);
      a.click();
    });
}
