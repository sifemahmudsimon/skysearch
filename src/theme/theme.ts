// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#1976d2" },
        secondary: { main: "#90caf9" },
        error: {main: "#d32f2f", light: "#ffcdd2", dark: "#9a0007", contrastText: "#e57373"},
        warning: {main: "#ed6c02", light: "#ff9800", dark: "#b53d00", contrastText: "#fff"},
        info: {main: "#0288d1", light: "#03a9f4", dark: "#01579b", contrastText: "#fff"},
        success: {main: "#2e7d32", light: "#4caf50", dark: "#1b5e20", contrastText: "#fff"},
        background: {
            default: "#f9fafb",
            paper: "#ffffff",
        },
        text: {
            primary: "#111827",
            secondary: "#6b7280",
            disabled: "#9ca3af",
        },
        divider: "#e5e7eb",
    },
    typography: {
        fontFamily: "'Roboto', sans-serif",
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#90caf9" },
        secondary: { main: "#1976d2" },
        error: {
            main: "#f87171",
            light: "rgba(255, 205, 210, 0.5)",
            dark: "#b91c1c",
            contrastText: "#020617"
        },
        warning: {main: "#fbbf24", light: "#fcd34d", dark: "#b45309", contrastText: "#111827"},
        info: {main: "#60a5fa", light: "#93c5fd", dark: "#1e3a8a", contrastText: "#111827"},
        success: {main: "#4ade80", light: "#86efac", dark: "#166534", contrastText: "#111827"},
        background: {
            default: "#0f172a",
            paper: "#020617",
        },
        text: {
            primary: "#f8fafc",
            secondary: "#94a3b8",
            disabled: "#6b7280",
        },
        divider: "#374151",
    },
    typography: {
        fontFamily: "'Roboto', sans-serif",
    },
});
