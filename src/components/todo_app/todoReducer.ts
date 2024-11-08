import {
  ADD_TODO,
  REMOVE_ALL_TODOS,
  REMOVE_COMPLETED_TODOS,
  REMOVE_TODO,
  TOGGLE_ALL_TODOS,
  TOGGLE_TODO,
  UPDATE_TODO,
} from "./constants";

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}
export interface Action {
  type: string;
  payload: any;
}
const getId = () => {
  return Date.now().toString();
};
export default function todoReducer(state: TodoItem[], action: Action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat({
        id: getId(),
        title: action.payload,
        completed: false,
      });
    case UPDATE_TODO:
      return state.map((todo) =>
        todo.id == action.payload.id ? { ...todo, ...action.payload } : todo
      );
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.payload);
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id == action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case REMOVE_ALL_TODOS:
      return [];
    case TOGGLE_ALL_TODOS:
      return state.map((todo) =>
        todo.completed !== action.payload.completed
          ? { ...todo, completed: action.payload.completed }
          : todo
      );
    case REMOVE_COMPLETED_TODOS:
      return state.filter((todo) => !todo.completed);
    default:
      return state;
  }
}
