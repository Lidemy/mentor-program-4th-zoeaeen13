import { useState } from "react";
import { calculateTictactoe } from "../../utills";
import {
  StepButton,
  Board,
  TictactoeWrapper,
  ResultWrapper,
} from "../../components/Tictactoe";
import { BOARD_SIZE } from "../../constants/style";

function Game() {
  const rowNum = 3; // 3*3 board
  const [records, setRecords] = useState([
    {
      squares: Array(rowNum * rowNum).fill(null),
      row: null,
      col: null,
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [player, setPlayer] = useState(true);
  const squares = records[stepNumber].squares;
  const winner = calculateTictactoe(squares);

  let status = "";
  if (winner) {
    status = "Winnder: " + winner;
  } else if (!winner && stepNumber === rowNum * rowNum) {
    status = "Equal!";
  } else {
    status = "Next player: " + (player ? "O" : "X");
  }

  const handleSquare = (index) => {
    if (winner || squares[index]) return;
    const currentHistory = records.slice(0, stepNumber + 1);
    const currentSquares = currentHistory[currentHistory.length - 1].squares;
    const newSquare = currentSquares.slice();
    newSquare[index] = player ? "O" : "X";
    setRecords([
      ...currentHistory,
      {
        squares: newSquare,
        row: parseInt(index / rowNum),
        col: index % rowNum,
      },
    ]);
    setPlayer(!player);
    setStepNumber(currentHistory.length);
  };

  const handleStepNum = (index) => {
    setStepNumber(index);
    setPlayer(!(index % 2) ? true : false);
  };

  return (
    <TictactoeWrapper>
      <div>
        <Board
          size={BOARD_SIZE.LARGE}
          num={rowNum}
          squares={squares}
          handleSquare={handleSquare}
        />
      </div>
      <ResultWrapper>
        <h4>{status}</h4>
        <ol>
          {records.map((record, index) => (
            <StepButton
              key={index}
              index={index}
              isCurrent={index === stepNumber}
              record={record}
              handleStepNum={handleStepNum}
            />
          ))}
        </ol>
      </ResultWrapper>
    </TictactoeWrapper>
  );
}

export default Game;
