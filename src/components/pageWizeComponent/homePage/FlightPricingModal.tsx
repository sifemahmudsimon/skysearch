"use client"

import React from "react"
import {
    Box,
    Typography,
    Alert,
    Card,
    Divider,
    Button,
    Stack,
    Chip,
} from "@mui/material"

interface Props {
    pricingResponse: any
}

export default function FlightPricingModal({pricingResponse}: Props) {
    const offer = pricingResponse?.data?.flightOffers?.[0]
    if (!offer) return null

    const travelers = offer.travelerPricings
    const price = offer.price

    return (
        <Box
            sx={{
                maxHeight: "calc(100dvh - 64px)",
                display: "flex",
                flexDirection: "column",
                px: {xs: 2, sm: 3},
                pt: {xs: 2, sm: 3},
            }}
        >
            {/* 🧾 HEADER (fixed) */}
            <Box>
                <Typography variant="h6" fontWeight={700} mb={0.5}>
                    Review your flight
                </Typography>

                <Typography color="text.secondary" fontSize={{xs: 12, sm: 15}} mb={1}>
                    Round trip • Economy • {travelers.length} Adults
                </Typography>

                {/* Divider under header */}
                <Divider sx={{mb: 2}}/>
            </Box>

            {/* ✈️ SCROLLABLE CONTENT */}
            <Box
                sx={{
                    flex: 1,           // takes remaining height
                    overflowY: "auto", // only this part scrolls
                    px: {xs: 0.5, sm: 1}, // horizontal padding to prevent shadows from clipping
                    py: {xs: 1, sm: 2},   // vertical padding to give space at top/bottom
                }}
            >
                {/* ⚠️ Warnings */}
                {pricingResponse.warnings?.length > 0 && (
                    <Alert severity="warning" sx={{mb: 2}}>
                        {pricingResponse.warnings[0].detail}
                    </Alert>
                )}

                {/* ITINERARIES */}
                <Stack spacing={2.5}>
                    {offer.itineraries.map((itinerary: any, idx: number) => (
                        <Card key={idx} sx={{p: {xs: 1.5, sm: 2}}}>
                            <Typography fontWeight={600} mb={1}>
                                {idx === 0 ? "Outbound flight" : "Return flight"}
                            </Typography>

                            <Stack spacing={2}>
                                {itinerary.segments.map((seg: any, i: number) => (
                                    <Box key={i}>
                                        <Stack
                                            direction={{xs: "column", sm: "row"}}
                                            justifyContent="space-between"
                                            alignItems={{xs: 'flex-start', sm: "center"}}
                                            gap={0.5}
                                        >
                                            <Box display={{xs: 'flex', sm: 'block'}} justifyContent={'space-between'}
                                                 width={'100%'}>
                                                <Typography fontWeight={500}>
                                                    {seg.departure.iataCode} → {seg.arrival.iataCode}
                                                </Typography>

                                                <Stack direction="row" spacing={1} flexWrap="wrap"
                                                       mt={{sm: 1}}>
                                                    <Chip size="small" label="Non-stop"/>
                                                    <Chip size="small" label={`Aircraft ${seg.aircraft.code}`}/>
                                                </Stack>
                                            </Box>

                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                spacing={0.75}
                                                width={{xs: "100%", sm: "auto"}}
                                            >
                                                {/* Departure */}
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary"
                                                                fontSize="0.7rem">
                                                        Departure
                                                    </Typography>
                                                    <Typography fontWeight={500} fontSize="0.85rem" whiteSpace="nowrap">
                                                        {new Date(seg.departure.at).toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </Typography>
                                                    <Typography color="text.secondary" fontSize="0.7rem">
                                                        {new Date(seg.departure.at).toLocaleDateString([], {
                                                            month: "short",
                                                            day: "numeric",
                                                        })}
                                                    </Typography>
                                                </Box>

                                                {/* Duration */}
                                                <Box
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    minWidth={70}
                                                >
                                                    <Typography
                                                        color="text.secondary"
                                                        fontSize="0.7rem"
                                                        textAlign="center"
                                                        whiteSpace="nowrap"
                                                    >
                                                        ⏱ {seg.duration.replace("PT", "").replace("H", "H ").replace("M", "m")}
                                                    </Typography>
                                                </Box>

                                                {/* Arrival */}
                                                <Box textAlign="right">
                                                    <Typography variant="caption" color="text.secondary"
                                                                fontSize="0.7rem">
                                                        Arrival
                                                    </Typography>
                                                    <Typography fontWeight={500} fontSize="0.85rem" whiteSpace="nowrap">
                                                        {new Date(seg.arrival.at).toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </Typography>
                                                    <Typography color="text.secondary" fontSize="0.7rem">
                                                        {new Date(seg.arrival.at).toLocaleDateString([], {
                                                            month: "short",
                                                            day: "numeric",
                                                        })}
                                                    </Typography>
                                                </Box>
                                            </Stack>


                                        </Stack>

                                        {i < itinerary.segments.length - 1 && <Divider sx={{mt: 1.5}}/>}
                                    </Box>
                                ))}
                            </Stack>
                        </Card>
                    ))}
                </Stack>

                {/* 👤 TRAVELERS */}
                <Card sx={{mt: 3, p: {xs: 1.5, sm: 2}}}>
                    <Typography fontWeight={600} mb={1}>
                        Passenger details
                    </Typography>

                    <Stack spacing={1}>
                        {travelers.map((t: any, idx: number) => (
                            <Box display={"flex"} justifyContent={"space-between"} key={idx}>
                                <Box display="flex" flexWrap="wrap" gap={1} alignItems="center">
                                    <Typography fontWeight={500}>Passenger {idx + 1}:</Typography>
                                    <Typography fontWeight={500}>
                                        {t.price.currency} {t.price.total}
                                    </Typography>
                                </Box>

                                <Typography variant="body2" color="text.secondary">
                                    Cabin: {t.fareDetailsBySegment[0].cabin} •
                                    Baggage: {t.fareDetailsBySegment[0].includedCheckedBags.quantity} checked
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </Card>

                {/* 💳 PRICE */}
                <Card sx={{mt: 3, p: {xs: 1.5, sm: 2}}}>
                    <Typography fontWeight={600} mb={1}>
                        Price summary
                    </Typography>

                    <Stack spacing={0.75}>
                        <Box display="flex" justifyContent="space-between">
                            <Typography>Base fare</Typography>
                            <Typography>{price.base}</Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                            <Typography>Taxes & fees</Typography>
                            <Typography>
                                {(Number(price.grandTotal) - Number(price.base)).toFixed(2)}
                            </Typography>
                        </Box>

                        <Divider/>

                        <Box display="flex" justifyContent="space-between">
                            <Typography fontWeight={700}>Total</Typography>
                            <Typography fontWeight={700}>
                                {price.currency} {price.grandTotal}
                            </Typography>
                        </Box>
                    </Stack>
                </Card>
            </Box>

            {/* 📌 CTA BUTTON (sticky at bottom) */}
            <Box
                sx={{
                    position: "sticky",
                    bottom: 0,
                    mt: 3,
                    pt: 2,
                    pb: {xs: 2, sm: 3},
                    bgcolor: "background.paper",
                }}
            >
                <Button fullWidth size="large" variant="contained">
                    Continue to traveller details
                </Button>

                <Typography
                    variant="caption"
                    display="block"
                    textAlign="center"
                    mt={1}
                    color="text.secondary"
                >
                    Ticket by {offer.lastTicketingDate}
                </Typography>
            </Box>
        </Box>


    )
}
