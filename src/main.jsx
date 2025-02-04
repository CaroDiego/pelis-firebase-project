import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ListsProviderWrapper } from "./context/list.context.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <ListsProviderWrapper>
      <App />
    </ListsProviderWrapper>
  </BrowserRouter>
  // </StrictMode>
);
