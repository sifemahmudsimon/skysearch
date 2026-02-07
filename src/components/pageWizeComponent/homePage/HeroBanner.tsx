import React from "react";
import { Box, Container, Typography, Chip } from "@mui/material";
import SparklesIcon from "@mui/icons-material/AutoAwesome";

export default function HeroBanner() {
    return (
        <Box
            component="section"
            sx={{
                position: "relative",
                overflow: "hidden",
                py: { xs: 6, lg: 8 },
            }}
        >
            <Container maxWidth="lg" sx={{ position: "relative" }}>
                <Box
                    sx={{
                        textAlign: "center",
                        mb: 4,
                        animation: "fadeIn 1s ease forwards",
                    }}
                >
                    {/* Highlight Chip */}
                    <Chip
                        icon={<SparklesIcon />}
                        label="Search 500+ airlines worldwide"
                        sx={{
                            display: "inline-flex",
                            gap: 1,
                            px: 2,
                            py: 0.5,
                            mb: 2,
                            bgcolor: "secondary.main",
                            color: "text.primary.main",
                            fontWeight: 500,
                            fontSize: "0.875rem",
                            borderRadius: "9999px",
                        }}
                    />

                    {/* Hero Heading */}
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontSize: { xs: "2.25rem", lg: "3rem", xl: "3.75rem" }, // text-4xl lg:text-5xl xl:text-6xl
                            fontWeight: "bold",
                            fontFamily: "'Roboto', sans-serif", // or your font-display equivalent
                            color: "text.primary",
                            mb: 2,
                        }}
                    >
                        Find your next{" "}
                        <Box
                            component="span"
                            sx={{
                                background: "linear-gradient(90deg, #FF7A18, #AF002D 70%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                display: "inline",
                            }}
                        >
                            adventure
                        </Box>
                    </Typography>

                    {/* Subheading */}
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: "1.125rem",
                            color: "text.secondary",
                            maxWidth: "40rem",
                            mx: "auto",
                        }}
                    >
                        Compare prices from hundreds of airlines and travel sites to find the best deals on
                        flights
                    </Typography>
                </Box>


            </Container>
        </Box>
    );
}
