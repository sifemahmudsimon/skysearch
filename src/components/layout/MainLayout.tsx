// src/components/layout/MainLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "background.default", color: "text.primary" }}>
            <CssBaseline />
            <Header />
            <Box component="main" sx={{ py: 3, px: 2 }}>
                <Outlet />
            </Box>
            <Footer/>

        </Box>
    );
};

export default MainLayout;
