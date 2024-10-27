import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <h1>React Demos</h1>
      <nav className="navigation">
        <ol>
          <li>
            <Link to="/velocity">Velocity</Link>
          </li>
          <li>
            <Link to="/confluence">Confluence</Link>
          </li>
          <li>
            <Link to="/reservation">Room Reservation</Link>
          </li>
          <li>
            <Link to="/explorer">File Explorer</Link>
          </li>
        </ol>
      </nav>
    </>
  );
}

export default App;
