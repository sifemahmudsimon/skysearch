import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import App from "./App"
import "./styles/main.scss";
import {ThemeProviderWrapper} from "./context/ThemeContext";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProviderWrapper>
                <CssBaseline />
                <App />
            </ThemeProviderWrapper>
        </BrowserRouter>
    </React.StrictMode>
);
