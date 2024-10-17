import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Velocity from "./components/velocity/Velocity.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/velocity" element={<Velocity />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
