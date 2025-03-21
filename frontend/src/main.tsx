import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./styles/elements.css";

import App from "./App";
import { RecoilProvider } from "./components/RecoilProvider";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RecoilProvider>
        <App />
      </RecoilProvider>
    </BrowserRouter>
  </StrictMode>
);
