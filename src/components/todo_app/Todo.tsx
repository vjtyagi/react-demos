import { useCallback, useMemo, useReducer, useState } from "react";
import "./todo.css";
import todoReducer, { TodoItem } from "./todoReducer";
import { useLocation } from "react-router-dom";
import cx from "classnames";
export default function Todo() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const { hash: route } = useLocation();

  const visibleTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (route === "#/active") {
        return !todo.completed;
      } else if (route === "#/completed") {
        return todo.completed;
      } else {
        return todo;
      }
    });
  }, [todos, route]);
  const addTodo = useCallback(
    (title: string) => {
      dispatch({
        type: "ADD_TODO",
        payload: title,
      });
    },
    [dispatch]
  );
  const handleToggleAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: "TOGGLE_ALL_TODOS",
        payload: { completed: e.target.checked },
      });
    },
    [dispatch]
  );

  return (
    <div className="todo-app">
      <header className="header">
        <h1 className="title">todos</h1>
        <TodoInput onSubmit={addTodo} />
      </header>
      <main className="todo-main">
        {visibleTodos.length > 0 && (
          <div className="toggle-all-container">
            <input
              type="checkbox"
              className="toggle-all"
              checked={visibleTodos.every((todo) => todo.completed)}
              onChange={handleToggleAll}
            />
            <label className="toggle-all-label"></label>
          </div>
        )}
        <TodoList data={visibleTodos} dispatch={dispatch} />
      </main>
      {visibleTodos.length > 0 && <Footer todos={todos} dispatch={dispatch} />}
    </div>
  );
}
function TodoInput({
  defaultValue,
  onSubmit,
  onBlur,
}: {
  defaultValue?: string;
  onSubmit: Function;
  onBlur?: Function;
}) {
  const [value, setValue] = useState(defaultValue || "");
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        onSubmit(value);
        setValue("");
      }
    },
    [onSubmit]
  );
  const handleBlur = useCallback(() => {
    if (onBlur) {
      onBlur(value);
    }
  }, [onBlur]);
  return (
    <div className="input-container">
      <input
        className="new-todo"
        type="text"
        onChange={handleChange}
        placeholder="What needs to be done?"
        value={value}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
    </div>
  );
}
function TodoList({
  data,
  dispatch,
}: {
  data: TodoItem[];
  dispatch: Function;
}) {
  return (
    <ul className="todo-list">
      {data.map((todo) => {
        return <TodoListItem key={todo.id} todo={todo} dispatch={dispatch} />;
      })}
    </ul>
  );
}
function TodoListItem({
  todo,
  dispatch,
}: {
  todo: TodoItem;
  dispatch: Function;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const handleToggle = useCallback(() => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: todo.id,
    });
  }, [dispatch]);

  const removeTodo = useCallback(() => {
    dispatch({
      type: "REMOVE_TODO",
      payload: todo.id,
    });
  }, [dispatch]);
  const updateTodo = useCallback(
    (value: string) => {
      dispatch({
        type: "UPDATE_TODO",
        payload: { id: todo.id, title: value },
      });
      setIsEditing(false);
    },
    [dispatch]
  );
  const handleBlur = useCallback(() => {
    setIsEditing(false);
  }, []);
  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);
  return (
    <li
      onDoubleClick={handleDoubleClick}
      className={cx({
        completed: todo.completed,
      })}
    >
      <div className="view">
        {isEditing ? (
          <TodoInput
            defaultValue={todo.title}
            onSubmit={updateTodo}
            onBlur={handleBlur}
          />
        ) : (
          <>
            <input
              className="toggle"
              onChange={handleToggle}
              type="checkbox"
              {...(todo.completed ? { checked: true } : { checked: false })}
            />
            <label>{todo.title}</label>
            <button className="destroy" onClick={removeTodo}></button>
          </>
        )}
      </div>
    </li>
  );
}
function Footer({
  todos,
  dispatch,
}: {
  todos: TodoItem[];
  dispatch: Function;
}) {
  const { hash: route } = useLocation();
  const inCompleteCount = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);
  const handleClearCompleted = useCallback(() => {
    dispatch({
      type: "REMOVE_COMPLETED_TODOS",
      payload: {},
    });
  }, [dispatch]);
  return (
    <>
      <footer className="footer">
        <span className="todo-count">{inCompleteCount} item(s) left</span>
        <ul className="filters">
          <li>
            <a
              className={cx({
                selected: route === "" || route == "#/",
              })}
              href="#/"
            >
              All
            </a>
          </li>
          <li>
            <a
              className={cx({
                selected: route === "#/active",
              })}
              href="#/active"
            >
              Active
            </a>
          </li>
          <li>
            <a
              className={cx({
                selected: route === "#/completed",
              })}
              href="#/completed"
            >
              Completed
            </a>
          </li>
        </ul>
        <button className="clear-completed" onClick={handleClearCompleted}>
          Clear Completed
        </button>
      </footer>
    </>
  );
}
