// src/context/ThemeContext.tsx
import React, {createContext, useContext, useState, ReactNode} from "react";
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
    // Initialize mode from cookie if exists, otherwise default to light
    const [mode, setMode] = useState<ThemeMode>(() => {
        if (typeof document !== "undefined") {
            const saved = document.cookie
                .split("; ")
                .find(row => row.startsWith("theme="))
                ?.split("=")[1] as ThemeMode;
            if (saved === "light" || saved === "dark") return saved;
        }
        return "light";
    });

    const toggleTheme = () => {
        setMode(prev => {
            const newMode = prev === "light" ? "dark" : "light";
            // Save to cookie for 30 days
            document.cookie = `theme=${newMode}; path=/; max-age=${30 * 24 * 60 * 60}`;
            return newMode;
        });
    };

    const theme = mode === "light" ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};
