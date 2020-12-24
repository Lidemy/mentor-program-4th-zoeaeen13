import styled from "styled-components";
import PropTypes from "prop-types";

const SquareWrapper = styled.button`
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 50px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  color: ${(props) => (props.children === "O" ? "red" : "#1A1AF7")};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  &:focus {
    outline: none;
    background: #fafafa;
  }
`;

const StepButtonWrapper = styled.button`
  margin-bottom: 3px;
  border: none;
  border-radius: 4px;
  padding: 5px 8px;
  background: ${(props) => (props.isCurrent ? "gold" : "#e5d8b1")};

  &:focus {
    outline: none;
    background: gold;
  }
`;

const Square = ({ size, index, value, handleClick }) => {
  const handleClickSquare = () => {
    handleClick(index);
  };

  return (
    <SquareWrapper size={size} current={false} onClick={handleClickSquare}>
      {value}
    </SquareWrapper>
  );
};

export const ResultWrapper = styled.div`
  margin: 0 30px;

  h4 {
    font-size: 24px;
    margin-bottom: 10px;
  }
`;

export const TictactoeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StepButton = ({ isCurrent, index, handleStepNum, record }) => {
  const children = index
    ? `Go to move ${index} (${record.col}, ${record.row})`
    : "Start game";
  const handleClickStep = () => {
    handleStepNum(index);
  };

  return (
    <li>
      <StepButtonWrapper isCurrent={isCurrent} onClick={handleClickStep}>
        {children}
      </StepButtonWrapper>
    </li>
  );
};

export function Board({ size, num, squares, handleSquare }) {
  let board = [];
  for (let i = 0; i < num; i += 1) {
    let boardRow = [];
    for (let j = 0; j < num; j += 1) {
      const index = j + num * i;
      boardRow.push(
        <Square
          size={size}
          handleClick={handleSquare}
          key={index}
          index={index}
          value={squares[index]}
        />
      );
    }
    board.push(<div>{boardRow}</div>);
  }

  return board;
}

Square.propTypes = {
  size: PropTypes.string,
  index: PropTypes.number,
  value: PropTypes.string,
  handleClick: PropTypes.func,
};

StepButton.propTypes = {
  isCurrent: PropTypes.bool,
  index: PropTypes.number,
  value: PropTypes.string,
  handleStepNum: PropTypes.func,
  record: PropTypes.object,
};
