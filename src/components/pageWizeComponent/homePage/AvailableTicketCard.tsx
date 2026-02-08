"use client";

import React from "react";
import {
    Card,
    CardContent,
    Box,
    Typography,
    Chip,
    Divider,
    Button,
} from "@mui/material";
import {
    FlightTakeoff,
    FlightLand,
    AccessTime,
    AirplanemodeActive,
    Airlines as AirlinesIcon,
    EventSeat,
    AirplaneTicket,
} from "@mui/icons-material";
import {FormatsService} from "../../../services/formatsService";
import {AvailableTicketCardProps} from "../../../types/flightTypes";

interface Segment {
    departure: { iataCode: string; at: string };
    arrival: { iataCode: string; at: string };
    carrierCode: string;
    aircraft?: { code: string };
    duration: string;
}

// Main card
export default function AvailableTicketCard({flight, onSelect}: AvailableTicketCardProps) {
    const dep = flight.route[0];
    const arr = flight.route[flight.route.length - 1];

    if (flight.id === '1') {
        console.log('CardFlight', flight)
    }

    return (
        <Card
            sx={{
                width: "100%",
                borderRadius: 4,
                overflow: "hidden",
                transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
                border: "1px solid",
                borderColor: "grey.200",
                background: "background.paper",
                position: "relative",
                "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 16px 48px rgba(0,71,179,0.13)",
                    borderColor: "#3B82F6",
                },
            }}
        >
            {/* Accent strip */}
            <Box
                sx={{
                    height: 5,
                    background: "linear-gradient(90deg,#1D4ED8 0%,#3B82F6 50%,#60A5FA 100%)",
                }}
            />

            <CardContent sx={{p: 0}}>
                {/* Header row: airline + cabin | price */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        px: 3,
                        pt: 2.5,
                        pb: 1,
                    }}
                >
                    <Box sx={{display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap"}}>
                        <Typography
                            variant="subtitle2"
                            sx={{fontWeight: 700, color: "text.primary", letterSpacing: "0.02em"}}
                        >
                            {flight.airlines.join(" / ")}
                        </Typography>
                        <Chip
                            icon={<EventSeat sx={{fontSize: 14}}/>}
                            label={flight.cabin}
                            size="small"
                            sx={{
                                bgcolor: "#EFF6FF",
                                color: "text.secondary",
                                fontWeight: 600,
                                fontSize: "0.7rem",
                                height: 24,
                                textTransform: "capitalize",
                                "& .MuiChip-icon": {color: "#1D4ED8"},
                                border: "1px solid #BFDBFE",
                            }}
                        />
                    </Box>

                    <Box sx={{textAlign: "right", flexShrink: 0}}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 800,
                                color: "#1D4ED8",
                                lineHeight: 1,
                                letterSpacing: "-0.03em",
                            }}
                        >
                            {flight.currency}&nbsp;{flight.price.toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </Typography>
                        <Typography variant="caption" sx={{color: "#94A3B8", fontWeight: 500}}>
                            per traveler
                        </Typography>
                    </Box>
                </Box>

                {/* Route visualization: show outbound + return if available */}
                <Box sx={{px: 3, pt: 1.5, pb: 2}}>
                    {flight.itineraries.map((itinerary, idx) => {
                        const segments = itinerary.segments;
                        const depCode = segments[0].departure.iataCode;
                        const arrCode = segments[segments.length - 1].arrival.iataCode;
                        const stops = segments.length - 1;
                        const direct = stops === 0;

                        const isReturn = idx !== 0; // return leg

                        return (
                            <Box key={idx} sx={{mb: idx < flight.itineraries.length - 1 ? 3 : 0}}>
                                <Typography variant="subtitle2" sx={{fontWeight: 600, mb: 1}}>
                                    {idx === 0 ? "Outbound" : "Return"}
                                </Typography>

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        justifyContent: "space-between",
                                        gap: 2,
                                        flexDirection: isReturn ? "row-reverse" : "row", // flip for return
                                    }}
                                >
                                    {/* Departure */}
                                    <AirportBubble
                                        code={depCode}
                                        time={FormatsService.fmtTime(segments[0].departure.at)}
                                        icon={
                                            <FlightTakeoff
                                                sx={{
                                                    color: "#1D4ED8",
                                                    fontSize: 20,
                                                    transform: isReturn ? "scaleX(-1)" : "none", // flip icon horizontally
                                                }}
                                            />
                                        }
                                        bgColor={isReturn ? "#F0FDF4" : "#EFF6FF"} // swap colors for return
                                    />

                                    {/* Flight path */}
                                    <Box sx={{flex: 1, pt: 1.2, position: "relative"}}>
                                        {/* Line */}
                                        <Box
                                            sx={{
                                                height: 2,
                                                borderRadius: 1,
                                                position: "relative",
                                                overflow: "visible",
                                                transform: isReturn ? "scaleX(-1)" : "none", // flip dash line
                                            }}
                                        >
                                            {/* Dash overlay */}
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    inset: 0,
                                                    background:
                                                        "repeating-linear-gradient(90deg,#3B82F6,#3B82F6 6px,transparent 6px,transparent 12px)",
                                                    borderRadius: 1,
                                                    opacity: 0.45,
                                                }}
                                            />

                                            {/* Stop dots */}
                                            {Array.from({length: stops}).map((_, i) => (
                                                <Box
                                                    key={i}
                                                    sx={{
                                                        position: "absolute",
                                                        top: "50%",
                                                        left: `${((i + 1) / (stops + 1)) * 100}%`,
                                                        transform: "translate(-50%,-50%)",
                                                        width: 10,
                                                        height: 10,
                                                        borderRadius: "50%",
                                                        bgcolor: "#FFF",
                                                        border: "2.5px solid #F59E0B",
                                                        zIndex: 2,
                                                    }}
                                                />
                                            ))}
                                        </Box>

                                        {/* Plane bubble */}
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                left: "50%",
                                                transform: "translate(-50%,-50%)",
                                                bgcolor: "#FFF",
                                                borderRadius: "50%",
                                                width: 34,
                                                height: 34,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                boxShadow: "0 2px 12px rgba(29,78,216,0.18)",
                                                zIndex: 3,
                                            }}
                                        >
                                            <AirplanemodeActive
                                                sx={{
                                                    color: "#1D4ED8",
                                                    fontSize: 18,
                                                    transform: isReturn ? "rotate(-90deg)" : "rotate(90deg)", // rotate for return
                                                }}
                                            />
                                        </Box>

                                        {/* Duration + stops label */}
                                        <Box sx={{display: "flex", justifyContent: "center", gap: 0.8, mt: 2.5}}>
                                            <Typography
                                                variant="caption"
                                                sx={{fontWeight: 700, color: "#334155", fontSize: "0.72rem"}}
                                            >
                                                {FormatsService.fmtDuration(itinerary.duration)}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: direct ? "#10B981" : "#F59E0B",
                                                    fontSize: "0.68rem",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.06em",
                                                }}
                                            >
                                                {direct ? "Direct" : `${stops} stop${stops > 1 ? "s" : ""}`}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Arrival */}
                                    <AirportBubble
                                        code={arrCode}
                                        time={FormatsService.fmtTime(segments[segments.length - 1].arrival.at)}
                                        icon={
                                            <FlightLand
                                                sx={{
                                                    color: "#10B981",
                                                    fontSize: 20,
                                                    transform: isReturn ? "scaleX(-1)" : "none", // flip icon horizontally
                                                }}
                                            />
                                        }
                                        bgColor={isReturn ? "#EFF6FF" : "#F0FDF4"} // swap colors for return
                                    />
                                </Box>

                                {/* Full route breadcrumb */}
                                {segments.length > 1 && (
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            display: "block",
                                            textAlign: "center",
                                            mt: 2,
                                            color: "#94A3B8",
                                            fontWeight: 500
                                        }}
                                    >
                                        {segments.map((s: Segment) => s.departure.iataCode).join("  -  ")} - {segments[segments.length - 1].arrival.iataCode}
                                    </Typography>
                                )}
                            </Box>
                        );
                    })}
                </Box>


                {/* Boarding-pass punch-hole style divider */}
                <Box sx={{position: "relative", mx: 0, my: 0.5}}>
                    <Divider sx={{borderStyle: "dashed", borderColor: "#E2E8F0"}}/>
                    <PunchHole side="left"/>
                    <PunchHole side="right"/>
                </Box>

                {/* Footer: meta chips + book button */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 1.5,
                        px: 3,
                        py: 2,
                    }}
                >
                    <Box sx={{display: "flex", gap: 2, flexWrap: "wrap"}}>
                        <FooterDetail
                            icon={<AccessTime sx={{fontSize: 15, color: "#64748B"}}/>}
                            label="Duration"
                            value={FormatsService.fmtDuration(flight.totalDuration)}
                        />
                        <FooterDetail
                            icon={<AirplaneTicket sx={{fontSize: 15, color: "#64748B"}}/>}
                            label="Aircraft"
                            value={flight.aircraftTypes.join(", ") || "N/A"}
                        />
                        <FooterDetail
                            icon={<AirlinesIcon sx={{fontSize: 15, color: "#64748B"}}/>}
                            label="Airline"
                            value={flight.airlines.join(", ")}
                        />
                    </Box>

                    <Button
                        variant="contained"
                        disableElevation
                        onClick={() => onSelect(flight)}
                        sx={{
                            width: {xs: '100%', md: 'auto'},
                            borderRadius: 2.5,
                            textTransform: "none",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                            px: 3.5,
                            py: 1,
                            background: "linear-gradient(135deg,#1D4ED8 0%,#3B82F6 100%)",
                            boxShadow: "0 4px 14px rgba(29,78,216,0.35)",
                            "&:hover": {
                                background: "linear-gradient(135deg,#1E40AF 0%,#2563EB 100%)",
                                boxShadow: "0 6px 20px rgba(29,78,216,0.45)",
                            },
                        }}
                    >
                        Select
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

// Sub-components
function AirportBubble({code, time, icon, bgColor}: {
    code: string;
    time: string;
    icon: React.ReactNode;
    bgColor: string
}) {
    return (
        <Box sx={{textAlign: "center", minWidth: 64}}>
            <Box
                sx={{
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    bgcolor: bgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 0.75,
                }}
            >
                {icon}
            </Box>
            <Typography variant="h6"
                        sx={{fontWeight: 800, color: "text.primary", fontSize: "1.05rem", lineHeight: 1.1}}>
                {code}
            </Typography>
            <Typography variant="caption" sx={{color: "#64748B", fontWeight: 600, fontSize: "0.78rem"}}>
                {time}
            </Typography>
        </Box>
    );
}

function PunchHole({side}: { side: "left" | "right" }) {
    return (
        <Box
            sx={{
                position: "absolute",
                [side]: -12,
                top: "50%",
                transform: "translateY(-50%)",
                width: 24,
                height: 24,
                borderRadius: "50%",
                bgcolor: "#F8FAFC",
                border: "1px solid #E2E8F0",
            }}
        />
    );
}

function FooterDetail({icon, label, value}: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <Box>
            <Box sx={{display: "flex", alignItems: "center", gap: 0.4, mb: 0.1}}>
                {icon}
                <Typography
                    variant="caption"
                    sx={{
                        color: "#94A3B8",
                        fontWeight: 600,
                        fontSize: "0.6rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                    }}
                >
                    {label}
                </Typography>
            </Box>
            <Typography variant="body2" sx={{fontWeight: 700, color: "text.secondary", fontSize: "0.8rem"}}>
                {value}
            </Typography>
        </Box>
    );
}
