import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Velocity from "./components/velocity/Velocity.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Confluence from "./components/confluence/Confluence.tsx";
import ReservationSystem from "./components/booking/ReservationSystem.tsx";
import Explorer from "./components/FileExplorer/Explorer.tsx";
import AccordionDemo from "./components/accordion/AccordionDemo.tsx";
import InteractiveShapeGame from "./components/interactive/InteractiveShapeGame.tsx";
import Game from "./components/country_capital_game/Game.tsx";
import CounterAppHistory from "./components/counter_app/CounterAppHistory.tsx";
import Todo from "./components/todo_app/Todo.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/velocity" element={<Velocity />} />
        <Route path="/confluence" element={<Confluence />} />
        <Route path="/reservation" element={<ReservationSystem />} />
        <Route path="/explorer" element={<Explorer />} />
        <Route path="/accordion" element={<AccordionDemo />} />
        <Route path="/interactive" element={<InteractiveShapeGame />} />
        <Route path="/countrygame" element={<Game />} />
        <Route path="/counterapp" element={<CounterAppHistory />} />
        <Route path="/todoapp" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
