import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ToastsProvider } from "./hooks/useContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastsProvider>
      <App />
    </ToastsProvider>
  </React.StrictMode>
);
