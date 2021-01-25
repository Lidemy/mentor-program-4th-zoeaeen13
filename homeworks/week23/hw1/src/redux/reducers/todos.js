import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
  ClEAR_FINISHED_TODOS,
} from "../actionTypes";

let todoId = 1;
const initState = {
  todos: [],
};

export default function todoReducer(state = initState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [
          ...state.todos,
          {
            id: todoId++,
            content: action.payload.content,
            isDone: action.payload.isDone,
          },
        ],
      };
    case DELETE_TODO:
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case TOGGLE_TODO:
      return {
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.id) return todo;
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }),
      };
    case EDIT_TODO:
      return {
        todos: state.todos.map((todo) => {
          if (todo.id !== Number(action.payload.id)) return todo;
          return {
            ...todo,
            content: action.payload.newContent,
          };
        }),
      };
    case ClEAR_FINISHED_TODOS:
      return {
        todos: state.todos.filter((todo) => !todo.isDone),
      };
    default:
      return state;
  }
}
