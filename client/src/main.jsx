import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import GlobalContextProvider from "./context/GlobalContextProvider";
import { JobsContextProvider } from "./context/jobsContext";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-hd4hv8571vxyorpp.us.auth0.com";
const clientId = "mZ6zOj1idi2AyEHOJeI4Gp8pqegWiWUT";
const redirectUri = import.meta.env.VITE_CLIENT_URL;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalContextProvider>
        <JobsContextProvider>
          <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_CLIENT_ID}
            authorizationParams={{
              redirect_uri: redirectUri,
              scope: "openid profile email",
            }}
          >
            <App />
          </Auth0Provider>
        </JobsContextProvider>
      </GlobalContextProvider>
    </BrowserRouter>
  </StrictMode>
);
