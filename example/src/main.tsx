import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { PortalProvider } from "use-portal-hook";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PortalProvider>
      <App />
    </PortalProvider>
  </React.StrictMode>
);
