// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "../theme/theme";

type ThemeMode = "light" | "dark";

const ThemeContext = createContext<{ mode: ThemeMode; toggleTheme: () => void } | undefined>(undefined);

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useThemeContext must be used inside ThemeProviderWrapper");
    return context;
};

export const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<ThemeMode>("light");

    const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

    const theme = mode === "light" ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};
