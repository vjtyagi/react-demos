import { useEffect, useState } from "react";
import "./counter_app.css";
export default function CounterAppHistory() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const [current, setCurrent] = useState(-1);
  function handleCount(newCount: number) {
    setCount(newCount);
    setHistory((prev: number[]) => {
      return [newCount, ...prev];
    });
  }
  function handleUndo() {
    // when we do undo, we move the current pointer forward by 1
    if (current == history.length - 1) {
      return;
    }
    setCurrent(current + 1);
  }
  function handleRedo() {
    //for redo to happen currentHistory must be > 0
    if (current > 0) {
      setCurrent(current - 1);
    }
  }
  useEffect(() => {
    if (current >= 0) {
      let value = history[current];
      if (value !== undefined) setCount(value);
    }
  }, [current]);
  return (
    <div className="counter-app-history">
      <div className="actions">
        <button onClick={() => handleCount(count + 1)}>Increment</button>
        <button onClick={() => handleCount(count - 1)}> Decrement</button>
        <button onClick={() => handleCount(0)}>Reset</button>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
      </div>
      <div>Count: {count}</div>
      <div className="history-list">
        <h2>History</h2>
        <ul className="counter-list">
          {history.map((value, index) => (
            <li
              className="counter-list__item"
              key={`${value}-${index}`}
              onClick={() => setCount(value)}
            >
              Count: {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
