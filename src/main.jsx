import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { FollowProvider } from "./context/FollowContext";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="544932056232-2dmmrmb4t9km6mm46jot67hte8m7u6c2.apps.googleusercontent.com">
      <AuthProvider>
        <ThemeProvider>
          <FollowProvider>
          <App />
          </FollowProvider>
        </ThemeProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
);
