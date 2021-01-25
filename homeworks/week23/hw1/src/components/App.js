import { Form, FormButtons } from "./FormItems";
import { Wrapper, TodosWrapper } from "./Wrappers";
import { TodoItem } from "./Todoitem";
import { useState, Fragment } from "react";
import { TypeContext } from "../contexts";
import { useSelector, useDispatch } from "react-redux";
import { getFilter, filteredTodos } from "../redux/selectors";
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
  clearFinishedTodos,
  setFilter,
} from "../redux/actions";

function App() {
  const todos = useSelector(filteredTodos);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  // handle input change
  function handleInputChnage(e) {
    setValue(e.target.value);
  }

  // add todo
  function handleAddTodo(e) {
    e.preventDefault();
    if (value !== "") {
      dispatch(addTodo(value, false));
      setValue("");
    }
  }

  // delete todo
  function handleDeleteTodo(id) {
    dispatch(deleteTodo(id));
  }

  // toggle todo
  function handleToggleTodo(id) {
    dispatch(toggleTodo(id));
  }

  // edit todo
  function handlgeEditTodo(e) {
    dispatch(editTodo(e.target.id, e.target.value));
  }

  // clear finished todos
  function handleClearTodos() {
    dispatch(clearFinishedTodos());
  }

  // change filter
  function handleFilter(filter) {
    dispatch(setFilter(filter));
  }

  return (
    <TypeContext.Provider value={{ filter }}>
      <Fragment>
        <Wrapper>
          <Form
            value={value}
            handleInputChnage={handleInputChnage}
            handleAddTodo={handleAddTodo}
          />
          <FormButtons
            handleFilter={handleFilter}
            handleClearTodos={handleClearTodos}
          />
          <TodosWrapper>
            {todos.map((todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  handlgeEditTodo={handlgeEditTodo}
                  handleToggleTodo={handleToggleTodo}
                  handleDeleteTodo={handleDeleteTodo}
                />
              );
            })}
          </TodosWrapper>
        </Wrapper>
      </Fragment>
    </TypeContext.Provider>
  );
}

export default App;
