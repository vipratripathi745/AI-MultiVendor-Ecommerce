import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>
          <App />
          <Toaster position="top-right" />
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);