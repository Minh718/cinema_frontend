import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";
import KeycloakProviderWrapper from "./KeycloakProviderWrapper";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <KeycloakProviderWrapper>
      <App />
    </KeycloakProviderWrapper>
  </Provider>
);
