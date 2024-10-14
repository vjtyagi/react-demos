import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <nav>
        <Link to="/velocity">Velocity</Link>
      </nav>
      <h1>Home Page</h1>
    </>
  );
}

export default App;
