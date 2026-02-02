// src/components/layout/Header.tsx
import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    List,
    ListItem,
    ListItemText,
    Drawer,
    useTheme,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import { Plane } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useThemeContext } from "../../context/ThemeContext";

const navLinks = [
    { label: "Flights", href: "/" },
    { label: "Hotels", href: "/hotels" },
    { label: "Car Rental", href: "/car-rentals" },
    { label: "Packages", href: "/packages" },
];

// Desktop Navigation
export function DesktopNav() {
    const theme = useTheme();

    return (
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navLinks.map((link, index) => (
                <NavLink
                    key={index}
                    to={link.href}
                    style={({ isActive }) => ({
                        color: isActive
                            ? theme.palette.primary.main
                            : theme.palette.text.primary,
                        fontWeight: isActive ? 600 : 500,
                        textDecoration: "none",
                    })}
                >
                    {link.label}
                </NavLink>
            ))}
        </Box>
    );
}

// Mobile Drawer
export function MobileDrawer() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();

    const toggleDrawer = (open: boolean) => (event: any) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerList = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <Typography sx={{ fontWeight: 600, fontSize:24,ml:1.75,py:1,mb:1, borderBottom:'1px solid grey'}}>Menu</Typography>
                {navLinks.map((link, index) => (
                    <NavLink
                        key={index}
                        to={link.href}
                        style={{ textDecoration: "none", width: "100%"}}
                    >
                        {({ isActive }) => (
                            <ListItem
                                disablePadding
                                sx={{
                                    color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                                    fontWeight: isActive ? 600 : 500,
                                    py:1.5
                                }}
                            >
                                <ListItemText primary={link.label} sx={{ pl: 2 }} />
                            </ListItem>
                        )}
                    </NavLink>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            {/* Hamburger icon for mobile */}
            <Box sx={{ display: { xs: "flex", md: "none" }, ml: 2 }}>
                <IconButton
                    edge="start"
                    sx={{ color: 'background.primary' }}
                    aria-label="menu"
                    onClick={toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
            </Box>

            {/* Drawer */}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerList}
            </Drawer>
        </>
    );
}

// Main Header
const Header = () => {
    const { mode, toggleTheme } = useThemeContext();
    const theme = useTheme();

    return (
        <AppBar
            position="sticky"
            sx={{
                bgcolor: "background.paper",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
        >
            <Toolbar>


                {/* Logo box */}
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                    }}
                >
                    <Plane
                        size={20}
                        style={{ color: "white", transform: "rotate(-45deg)" }}
                    />
                </Box>

                {/* Title */}
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, color: theme.palette.text.primary }}
                >
                    SkySearch
                </Typography>

                {/* Desktop nav links */}
                <DesktopNav />

                {/* Theme toggle */}
                <IconButton
                    onClick={toggleTheme}
                    sx={{ ml: 1, color: theme.palette.text.primary }}
                >
                    {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>

                {/* Mobile Hamburger */}
                <MobileDrawer />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
