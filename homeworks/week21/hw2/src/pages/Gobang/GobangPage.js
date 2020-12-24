import { useState } from "react";
import { calculateGobang, screenshot } from "../../utills";
import {
  StepButton,
  Board,
  GobangWrapper,
  ResultWrapper,
  ButtonsWrapper,
  GobangButton,
} from "../../components/Gobang";
import { BOARD_SIZE } from "../../constants/style";

function Game() {
  const rowNum = 19;
  const [records, setRecords] = useState([
    {
      squares: Array(19).fill(Array(19).fill("")),
      row: null,
      col: null,
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [player, setPlayer] = useState(true);
  const recentRecord = records[stepNumber];
  const winner = calculateGobang(records[stepNumber]);
  let status = "";
  if (winner) {
    status = "Winnder: " + winner + "!";
  } else if (!winner && stepNumber === rowNum * rowNum) {
    status = "Equal!";
  } else {
    status = "Next player: " + (player ? "BLACK" : "WHITE");
  }

  const handleSquare = (row, col) => {
    const currentHistory = records.slice(0, stepNumber + 1);
    const newBoard = JSON.parse(
      JSON.stringify(currentHistory[currentHistory.length - 1])
    );
    if (winner || newBoard.squares[col][row]) return;
    newBoard.squares[col][row] = player ? "BLACK" : "WHITE";
    newBoard.row = row;
    newBoard.col = col;

    setRecords([...currentHistory, newBoard]);
    setPlayer(!player);
    setStepNumber(currentHistory.length);
  };

  const handleStepNum = (index) => {
    setStepNumber(index);
    setPlayer(!(index % 2) ? true : false);
  };

  const handleBack = () => {
    if (stepNumber >= 1) {
      setStepNumber(stepNumber - 1);
    }
  };

  const handleForward = () => {
    if (stepNumber <= records.length - 2) {
      setStepNumber(stepNumber + 1);
    }
  };

  const handleRestart = () => {
    setStepNumber(0);
    setRecords([
      {
        squares: Array(19).fill(Array(19).fill("")),
        row: null,
        col: null,
      },
    ]);
  };

  return (
    <GobangWrapper id="canva">
      <h4>{status}</h4>
      <ButtonsWrapper>
        <GobangButton onClick={handleBack}>BACK</GobangButton>
        <GobangButton onClick={handleForward}>FORWARD</GobangButton>
        <GobangButton onClick={screenshot}>SHARE</GobangButton>
        <GobangButton onClick={handleRestart}>RESTART</GobangButton>
      </ButtonsWrapper>
      <Board
        size={BOARD_SIZE.SMALL}
        num={rowNum}
        squares={recentRecord.squares}
        handleSquare={handleSquare}
      />
      <ResultWrapper>
        <h4>Steps:</h4>
        <ol>
          {records.map((record, index) => (
            <StepButton
              key={index}
              index={index}
              isCurrent={index === stepNumber}
              handleStepNum={handleStepNum}
            />
          ))}
        </ol>
      </ResultWrapper>
    </GobangWrapper>
  );
}

export default Game;
