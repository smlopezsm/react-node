import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App.jsx"; // Asegúrate de que este componente exista
import "./index.css";
import CountryPage from "./CountryPage.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:countryCode" element={<CountryPage />} />
      </Routes>
    </Router>
  </StrictMode>
);
