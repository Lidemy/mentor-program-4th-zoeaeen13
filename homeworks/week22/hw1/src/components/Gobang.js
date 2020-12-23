import styled from "styled-components";
import PropTypes from "prop-types";

const SquareWrapper = styled.button`
  position: relative;
  z-index: 2;
  border: 1px solid
    ${(props) =>
      props.row === props.num || props.col === props.num
        ? "transparent"
        : "#764A07"};
  ${(props) => props.row === props.num && "border-left: 1px solid #764A07;"}
  ${(props) => props.col === props.num && "border-top: 1px solid #764A07;"}
  ${(props) =>
    props.col === props.num && props.row === props.num
      ? "border: 1px solid transparent;"
      : ""}
  float: left;
  line-height: 50px;
  text-align: center;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  &:focus {
    outline: none;
  }

  &::before {
    content: "";
    width: ${(props) => props.size};
    height: ${(props) => props.size};
    background: #cd9b5b80;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  ${(props) =>
    props.value &&
    `&::after {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      width: 12px;
      height: 12px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      background: black;
      ${
        props.value === "WHITE" &&
        `
        border: 1px solid black;
        background: white;
      `
      }
    }`}
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

const Square = ({ size, row, col, num, value, handleClick }) => {
  const handleClickSquare = () => {
    handleClick(row, col);
  };

  return (
    <SquareWrapper
      size={size}
      value={value}
      row={row}
      col={col}
      num={num}
      current={false}
      onClick={handleClickSquare}
    />
  );
};

export const ResultWrapper = styled.div`
  position: relative;

  h4 {
    font-size: 16px;
    margin: 10px 0;
  }

  ol {
    position: absolute;
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    ul {
      margin: 5px;
    }
  }
`;

export const GobangWrapper = styled.div`
  padding: 10px;
  h4 {
    font-size: 24px;
  }
`;

export const StepButton = ({ isCurrent, index, handleStepNum }) => {
  const children = index ? `${index}` : "Start game";
  const handleClickStep = () => {
    handleStepNum(index);
  };

  return (
    <ul>
      <StepButtonWrapper isCurrent={isCurrent} onClick={handleClickStep}>
        {children}
      </StepButtonWrapper>
    </ul>
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
          row={j}
          col={i}
          num={num - 1}
          value={squares[i][j]}
        />
      );
    }
    board.push(<div>{boardRow}</div>);
  }

  return board;
}

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

export const GobangButton = styled.button`
  margin: 10px;
  border: 1.5px solid #d2bb78;
  border-radius: 2px;
  padding: 4px 8px;
  color: #444;
  cursor: pointer;
  transition: 0.2s all ease-in;

  &:hover {
    background: #e5d8b1;
  }
  &:focus {
    outline: none;
  }
`;
Square.propTypes = {
  size: PropTypes.string,
  index: PropTypes.number,
  value: PropTypes.string,
  handleClick: PropTypes.func,
  row: PropTypes.number,
  col: PropTypes.number,
  num: PropTypes.number,
};

StepButton.propTypes = {
  isCurrent: PropTypes.bool,
  index: PropTypes.number,
  value: PropTypes.string,
  handleStepNum: PropTypes.func,
  record: PropTypes.object,
};
