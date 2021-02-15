import { FILTERS } from "../constants/filters";

export const getFilter = (store) => {
  return store.filterReducer;
};

export const filteredTodos = (store) => {
  switch (store.filterReducer) {
    case FILTERS.COMPLETED:
      return store.todoReducer.todos.filter((todo) => todo.isDone === true);
    case FILTERS.INCOMPLETE:
      return store.todoReducer.todos.filter((todo) => todo.isDone === false);
    default:
      return store.todoReducer.todos;
  }
};
