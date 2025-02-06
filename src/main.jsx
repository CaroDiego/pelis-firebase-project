import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ListsProviderWrapper } from "./context/list.context.jsx";
import { FilmProviderWrapper } from "./context/film.context.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <FilmProviderWrapper>
      <ListsProviderWrapper>
        <App />
      </ListsProviderWrapper>
    </FilmProviderWrapper>
  </BrowserRouter>
  // </StrictMode>
);
