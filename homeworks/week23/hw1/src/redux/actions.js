// action creator
import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
  ClEAR_FINISHED_TODOS,
  SET_FILTER,
} from "./actionTypes";

export function addTodo(content, isDone) {
  return {
    type: ADD_TODO,
    payload: {
      content,
      isDone,
    },
  };
}

export function deleteTodo(todoId) {
  return {
    type: DELETE_TODO,
    payload: {
      id: todoId,
    },
  };
}

export function toggleTodo(todoId) {
  return {
    type: TOGGLE_TODO,
    payload: {
      id: todoId,
    },
  };
}

export function editTodo(todoId, newContent) {
  return {
    type: EDIT_TODO,
    payload: {
      id: todoId,
      newContent: newContent,
    },
  };
}

export function clearFinishedTodos() {
  return {
    type: ClEAR_FINISHED_TODOS,
  };
}

export function setFilter(filter) {
  return {
    type: SET_FILTER,
    payload: {
      newFilter: filter,
    },
  };
}
