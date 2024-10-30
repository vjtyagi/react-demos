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
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
