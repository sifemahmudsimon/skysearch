"use client";
import React from "react";
import {Box, Typography, Button, Stack} from "@mui/material";

interface BookingFailedProps {
    onClose: () => void;
    onRetry: () => void;
}

export default function BookingFailed({onClose, onRetry}: BookingFailedProps) {
    return (
        <Box
            textAlign="center"
            px={{xs: 3, sm: 6}} // responsive horizontal padding
            py={{xs: 8, sm: 12}} // responsive vertical padding
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="200px"
        >
            <Typography
                variant="h5"
                fontWeight={700}
                mb={2}
                color="error"
            >
                ❌ Booking Failed
            </Typography>
            <Typography
                variant="body1"
                mb={4} // space between text and buttons
                maxWidth={{xs: "100%", sm: "400px"}}
            >
                Something went wrong. Please try again.
            </Typography>

            <Stack
                direction={{xs: "column", sm: "row"}}
                spacing={2}
                width={{xs: "100%", sm: "auto"}}
                justifyContent="center"
            >
                <Button
                    variant="outlined"
                    sx={{width: {xs: '100%', sm: 'auto'}}}
                    onClick={onClose}
                >
                    Close
                </Button>
                <Button
                    variant="contained"
                    sx={{width: {xs: '100%', sm: 'auto'}}}
                    onClick={onRetry}
                >
                    Try Again
                </Button>
            </Stack>
        </Box>
    );
}
