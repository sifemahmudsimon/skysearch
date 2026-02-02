import React from "react";
import { Box, Typography, Link, Divider } from "@mui/material";

const footerSections = [
    { title: "Company", links: ["About us", "Careers", "Press", "Blog"] },
    { title: "Support", links: ["Help center", "Contact us", "FAQs", "Refund policy"] },
    { title: "Products", links: ["Flights", "Hotels", "Car rental", "Travel packages"] },
    { title: "Legal", links: ["Privacy policy", "Terms of service", "Cookie policy", "Accessibility"] },
];

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: "background.paper",
                borderTop: 1,
                borderColor: "divider",
                mt: 16,
                py: 12,
                px: { xs: 2, sm: 4 },
            }}
        >
            {/* Top sections */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: 4,
                }}
            >
                {footerSections.map((section, index) => (
                    <Box key={index} sx={{ minWidth: 150, flex: "1 1 200px" }}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            {section.title}
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            {section.links.map((link) => (
                                <Link key={link} href="#" underline="hover" color="text.secondary">
                                    {link}
                                </Link>
                            ))}
                        </Box>
                    </Box>
                ))}
            </Box>

            <Divider sx={{ my: 8, borderColor: "divider" }} />

            {/* Bottom section */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    © 2024 SkySearch. All rights reserved.
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Link href="#" color="text.secondary">Twitter</Link>
                    <Link href="#" color="text.secondary">Facebook</Link>
                    <Link href="#" color="text.secondary">Instagram</Link>
                </Box>
            </Box>
        </Box>
    );
}

export default Footer;