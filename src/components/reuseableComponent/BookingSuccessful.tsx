"use client";
import React from "react";
import {Box, Typography, Button, Stack} from "@mui/material";

interface BookingSuccessProps {
    onClose: () => void;
}

export default function BookingSuccess({onClose}: BookingSuccessProps) {
    return (
        <Box
            textAlign="center"
            px={{xs: 3, sm: 6}}
            py={{xs: 8, sm: 12}}
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
                color="success.main"
            >
                🎉 Booking Successful!
            </Typography>
            <Typography
                variant="body1"
                mb={4} // space between text and button
                maxWidth={{xs: "100%", sm: "400px"}}
            >
                Your flight order has been submitted successfully.
            </Typography>

            <Stack
                direction={{xs: "column", sm: "row"}}
                spacing={2}
                width={{xs: "100%", sm: "auto"}}
                justifyContent="center"
            >
                <Button
                    variant="contained"
                    sx={{width: {xs: '100%', sm: 'auto'}}}
                    onClick={onClose}
                >
                    Back to Flights
                </Button>
            </Stack>
        </Box>
    );
}
