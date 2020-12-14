import { Form, FormButtons } from "./FormItems";
import { Wrapper, TodosWrapper } from "./Wrappers";
import { TodoItem } from "./Todoitem";
import { useState } from "react";
import { TypeContext } from "../contexts";

let id = 1;
function App() {
  const [selectedType, setSelectType] = useState("All");
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  // handle input change
  function handleInputChnage(e) {
    setValue(e.target.value);
  }

  // add todo
  function handleAddTodo(e) {
    e.preventDefault();
    if (value !== "") {
      setTodos([
        {
          id,
          content: value,
          isDone: false,
          isShowed: selectedType !== "Completed",
        },
        ...todos,
      ]);

      id += 1;
      setValue("");
    }
  }

  // delete todo
  function handleDeleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // todo toggle
  function handleToggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  }

  // edit todo
  function handlgeEditTodo(e) {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== Number(e.target.id)) return todo;
        return {
          ...todo,
          content: e.target.value,
        };
      })
    );
  }

  // clear finished todos
  function handleClearTodos() {
    setTodos(todos.filter((todo) => !todo.isDone));
  }

  // set type to show
  function handleSelectType(e) {
    const mode = e.target.id;
    setSelectType(mode);
    switch (mode) {
      case "Completed":
        setTodos(
          todos.map((todo) => {
            if (todo.isDone) {
              return {
                ...todo,
                isShowed: true,
              };
            }
            return {
              ...todo,
              isShowed: false,
            };
          })
        );
        break;
      case "Incomplete":
        setTodos(
          todos.map((todo) => {
            if (!todo.isDone) {
              return {
                ...todo,
                isShowed: true,
              };
            }
            return {
              ...todo,
              isShowed: false,
            };
          })
        );
        break;
      default:
        setTodos(
          todos.map((todo) => {
            return {
              ...todo,
              isShowed: true,
            };
          })
        );
        break;
    }
  }

  return (
    <TypeContext.Provider value={{ selectedType }}>
      <div className="App">
        <Wrapper>
          <Form
            value={value}
            handleInputChnage={handleInputChnage}
            handleAddTodo={handleAddTodo}
          />
          <FormButtons
            handleSelectType={handleSelectType}
            handleClearTodos={handleClearTodos}
          />
          <TodosWrapper>
            {todos.map((todo) => {
              if (todo.isShowed) {
                return (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    handlgeEditTodo={handlgeEditTodo}
                    handleToggleTodo={handleToggleTodo}
                    handleDeleteTodo={handleDeleteTodo}
                  />
                );
              }
              return null;
            })}
          </TodosWrapper>
        </Wrapper>
      </div>
    </TypeContext.Provider>
  );
}

export default App;
