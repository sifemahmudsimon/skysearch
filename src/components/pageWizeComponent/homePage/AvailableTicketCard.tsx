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
import {NormalizedFlight} from "../../../types/normalizedFlight";
import {Formats} from "../../../services/Formats";
import {AvailableTicketCardProps} from "../../../types/flightTypes";


//main card
export default function AvailableTicketCard({flight, onSelect}: AvailableTicketCardProps) {

    const dep = flight.route[0];
    const arr = flight.route[flight.route.length - 1];
    const direct = flight.stops === 0;

    return (
        <Card
            sx={{
                fullWidth: "100%",
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
            {/* accent strip */}
            <Box
                sx={{
                    height: 5,
                    background: "linear-gradient(90deg,#1D4ED8 0%,#3B82F6 50%,#60A5FA 100%)",
                }}
            />

            <CardContent sx={{p: 0}}>
                {/*header row: airline + cabin | price*/}
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

                {/*route visualisation*/}
                <Box sx={{px: 3, pt: 1.5, pb: 2}}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            gap: 2,
                        }}
                    >
                        {/* departure */}
                        <AirportBubble
                            code={dep}
                            time={Formats.fmtTime(flight.departureTime)}
                            icon={<FlightTakeoff sx={{color: "#1D4ED8", fontSize: 20}}/>}
                            bgColor="#EFF6FF"
                        />

                        {/* flight path */}
                        <Box sx={{flex: 1, pt: 1.2, position: "relative"}}>
                            {/* line */}
                            <Box
                                sx={{
                                    height: 2,
                                    borderRadius: 1,
                                    bgcolor: "",
                                    position: "relative",
                                    overflow: "visible",
                                }}
                            >
                                {/* dash overlay */}
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

                                {/* stop dots */}
                                {Array.from({length: flight.stops}).map((_, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            position: "absolute",
                                            top: "50%",
                                            left: `${((i + 1) / (flight.stops + 1)) * 100}%`,
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

                            {/* plane bubble */}
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
                                    sx={{color: "#1D4ED8", fontSize: 18, transform: "rotate(90deg)"}}
                                />
                            </Box>

                            {/* duration + stops label */}
                            <Box sx={{display: "flex", justifyContent: "center", gap: 0.8, mt: 2.5}}>
                                <Typography
                                    variant="caption"
                                    sx={{fontWeight: 700, color: "#334155", fontSize: "0.72rem"}}
                                >
                                    {Formats.fmtDuration(flight.totalDuration)}
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
                                    {direct ? "Direct" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                                </Typography>
                            </Box>
                        </Box>

                        {/* arrival */}
                        <AirportBubble
                            code={arr}
                            time={Formats.fmtTime(flight.arrivalTime)}
                            icon={<FlightLand sx={{color: "#10B981", fontSize: 20}}/>}
                            bgColor="#F0FDF4"
                        />
                    </Box>

                    {/*full route breadcrumb*/}
                    {flight.route.length > 2 && (
                        <Typography
                            variant="caption"
                            sx={{
                                display: "block",
                                textAlign: "center",
                                mt: 2,
                                color: "#94A3B8",
                                fontWeight: 500,
                            }}
                        >
                            {flight.route.join("  -  ")}
                        </Typography>
                    )}
                </Box>

                {/*boarding-pass punch-hole style divider */}
                <Box sx={{position: "relative", mx: 0, my: 0.5}}>
                    <Divider sx={{borderStyle: "dashed", borderColor: "#E2E8F0"}}/>
                    <PunchHole side="left"/>
                    <PunchHole side="right"/>
                </Box>

                {/*footer: meta chips + book button*/}
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
                            value={Formats.fmtDuration(flight.totalDuration)}
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

//sub-components

function AirportBubble({code, time, icon, bgColor,}: {
    code: string;
    time: string;
    icon: React.ReactNode;
    bgColor: string;
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

function FooterDetail({icon, label, value,}: { icon: React.ReactNode; label: string; value: string; }) {
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
