import styled from "styled-components";
import imgCheck from "../images/check.svg";
import imgUncheck from "../images/uncheck.svg";
import imgDelete from "../images/delete.svg";
import PropTypes from "prop-types";

const TodoWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid transparent;

  &:hover {
    box-shadow: 0px 2px 10px #eeeeee;
  }

  input {
    width: 80%;
    border: none;
    border-bottom: 1px solid transparent;
    ${(props) =>
      props.isDone &&
      `
    color: gray;
    text-decoration: line-through;  
  `}

    &:focus {
      outline: none;
      border-color: #eeeeee;
    }
  }
`;

const ImageWrapper = styled.div`
  box-sizing: border-box;
  padding: 8px;
  width: 40px;
  height: 40px;
  cursor: pointer;

  img {
    width: 90%;
    height: 90%;
    object-fit: cover;
  }
`;

export function TodoItem({
  todo,
  handleToggleTodo,
  handlgeEditTodo,
  handleDeleteTodo,
}) {
  const handleToggleClick = () => {
    handleToggleTodo(todo.id);
  };

  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id);
  };

  return (
    <TodoWrapper isDone={todo.isDone}>
      <ImageWrapper>
        <img
          alt=""
          src={todo.isDone ? imgCheck : imgUncheck}
          onClick={handleToggleClick}
        />
      </ImageWrapper>
      <input
        type="text"
        id={todo.id}
        value={todo.content}
        readOnly={todo.isDone}
        onChange={handlgeEditTodo}
      />
      <ImageWrapper>
        <img alt="" src={imgDelete} onClick={handleDeleteClick} />
      </ImageWrapper>
    </TodoWrapper>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object,
  handleToggleTodo: PropTypes.func,
  handlgeEditTodo: PropTypes.func,
  handleDeleteTodo: PropTypes.func,
};
