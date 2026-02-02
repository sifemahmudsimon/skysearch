// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#1976d2" },
        secondary: { main: "#90caf9" },
        background: {
            default: "#f9fafb",
            paper: "#ffffff",
        },
        text: {
            primary: "#111827",
            secondary: "#6b7280",
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#90caf9" },
        secondary: { main: "#1976d2" },
        background: {
            default: "#0f172a",
            paper: "#020617",
        },
        text: {
            primary: "#f8fafc",
            secondary: "#94a3b8",
        },
    },
});
