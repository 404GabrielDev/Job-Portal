import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GlobalContextProvider } from "./context/GlobalContext";
import { JobsContextProvider } from "./context/jobsContext";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalContextProvider>
        <JobsContextProvider>
          <App />
        </JobsContextProvider>
      </GlobalContextProvider>
    </BrowserRouter>
  </StrictMode>
);
