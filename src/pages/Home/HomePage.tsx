"use client"

import React, {useMemo, useState, useEffect, useRef} from "react"
import HeroBanner from "../../components/pageWizeComponent/homePage/HeroBanner"
import SearchForm from "../../components/pageWizeComponent/homePage/SearchForm"
import AvailableTicketCard from "../../components/pageWizeComponent/homePage/AvailableTicketCard"
import FlightFilters from "../../components/pageWizeComponent/homePage/FlightFilters"
import {Box, Dialog, Pagination, Typography} from "@mui/material"
import {NormalizedFlight} from "../../types/normalizedFlight"
import {normalizeFlight} from "../../utils/flightNormalizer"
import FlightPriceTrends from "../../components/pageWizeComponent/homePage/FlightPriceTrends";
import FlightPricingModal from "../../components/pageWizeComponent/homePage/FlightPricingModal";
import {ApiService} from "../../api/apiService";

interface CarrierDict {
    [code: string]: string
}

interface AircraftDict {
    [code: string]: string
}

interface LocationDict {
    cityCode: string

    [key: string]: any
}

function HomePage() {
    const FLIGHTS_PER_PAGE = 6

    const [flightResults, setFlightResults] = useState<any>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [filters, setFilters] = useState({
        carriers: [] as string[],
        aircraft: [] as string[],
        locations: [] as string[],
    })

    const [pricingResponse, setPricingResponse] = useState<any>(null)
    const [loadingPricing, setLoadingPricing] = useState(false)
    const [open, setOpen] = useState(false)

    console.log('pricingResponse', pricingResponse)

    // 🔹 Ref for scrolling to results
    const resultsRef = useRef<HTMLDivElement | null>(null)


    useEffect(() => {
        if (flightResults && resultsRef.current) {
            const top =
                resultsRef.current.getBoundingClientRect().top + window.scrollY - 80
            window.scrollTo({
                top,
                behavior: "smooth",
            })
        }
    }, [flightResults])

    // 🔹 Filter options from API dictionaries
    const filterOptions = useMemo(
        () => ({
            carrierOptions: (flightResults?.dictionaries?.carriers || {}) as CarrierDict,
            aircraftOptions: (flightResults?.dictionaries?.aircraft || {}) as AircraftDict,
            locationOptions: (flightResults?.dictionaries?.locations || {}) as Record<
                string,
                LocationDict
            >,
        }),
        [flightResults]
    )

    // 🔹 Normalize flights
    const normalizedFlights: NormalizedFlight[] = useMemo(() => {
        if (!flightResults?.data) return []

        const flightsArray: any[] = Array.isArray(flightResults.data[0])
            ? flightResults.data.flat()
            : flightResults.data

        return flightsArray.map(normalizeFlight)
    }, [flightResults])

    // 🔹 Apply filters
    const filteredFlights = useMemo(() => {
        if (!normalizedFlights.length) return []

        return normalizedFlights.filter((flight) => {
            const carrierMatch =
                filters.carriers.length === 0 ||
                flight.airlines.some((c) => filters.carriers.includes(c))

            const aircraftMatch =
                filters.aircraft.length === 0 ||
                flight.aircraftTypes.some((a) => filters.aircraft.includes(a))

            const locationMatch =
                filters.locations.length === 0 ||
                flight.route.some((code) => filters.locations.includes(code))

            return carrierMatch && aircraftMatch && locationMatch
        })
    }, [normalizedFlights, filters])

    // 🔹 Pagination
    const totalPages = Math.ceil(filteredFlights.length / FLIGHTS_PER_PAGE)
    const paginatedFlights = filteredFlights.slice(
        (currentPage - 1) * FLIGHTS_PER_PAGE,
        currentPage * FLIGHTS_PER_PAGE
    )

    // 🔹 Checkbox handler
    const handleCheckboxChange = (
        category: keyof typeof filters,
        value: string
    ) => {
        setFilters((prev) => {
            const exists = prev[category].includes(value)
            return {
                ...prev,
                [category]: exists
                    ? prev[category].filter((v) => v !== value)
                    : [...prev[category], value],
            }
        })

        setCurrentPage(1) // reset page on filter change
    }

    const handleSelectFlight = (flight: NormalizedFlight) => {
        setOpen(true)
        setLoadingPricing(true)
        setPricingResponse(null)

        const payload = {
            data: {
                type: "flight-offers-pricing",
                flightOffers: [flight.raw], // ✅ ORIGINAL AMADEUS OBJECT
            },
        }

        console.log('payload', payload)

        ApiService()
            .flightPricing(payload)
            .then((res: any) => {
                setPricingResponse(res.data)
            })
            .catch((err) => {
                console.error("Pricing error", err)
            })
            .finally(() => setLoadingPricing(false))
    }

    return (
        <>
            {/* HERO + SEARCH */}
            <Box
                sx={{
                    pb: {lg: 10},
                    background:
                        "linear-gradient(135deg, rgba(79, 172, 254, 0.05) 0%, rgba(0, 242, 254, 0.05) 100%)",
                    position: "relative",
                }}
            >
                <HeroBanner/>

                <Box
                    sx={{
                        maxWidth: "96rem",
                        mx: "auto",
                        mt: "-60px",
                        animation: "slideUp 1s ease forwards",
                    }}
                >
                    <SearchForm setFlightResults={setFlightResults}/>
                </Box>
            </Box>

            <Box
                ref={resultsRef}>
                <FlightPriceTrends finalResult={flightResults?.data ?? null}/>
            </Box>

            <Typography

                variant="h2"
                component="h1"
                sx={{
                    fontSize: {xs: "1.5rem", lg: "2.5rem", xl: "3rem"},
                    fontWeight: "bold",
                    fontFamily: "'Roboto', sans-serif",
                    color: "text.primary",
                    my: 4,
                    textAlign: "center",
                    lineHeight: 1.2,
                }}
            >
                {/* First part with gradient */}
                <Box
                    component="span"
                    sx={{
                        background: "linear-gradient(90deg, #FF7A18, #AF002D 70%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        display: "inline",
                    }}
                >
                    {flightResults?.data.length > 0 ? 'Enjoy' : 'Flights Made Simple,'}
                </Box>

                {/* Second part */}
                {flightResults?.data.length > 0 ? (
                    // Single-line version: keep inline
                    <>{" "}Your Trip.</>
                ) : (
                    // Double-line version: force new line
                    <Box component="span" sx={{display: "block"}}>
                        Journeys Made Memorable.
                    </Box>
                )}
            </Typography>


            {/* CONTENT */}
            {flightResults && (
                <Box
                    display={{lg: "flex"}}
                    sx={{
                        width: "100%",
                        maxWidth: "96rem",
                        mt: 4,
                        mx: "auto",
                    }}
                >
                    {/* FILTERS */}
                    <Box
                        sx={{
                            position: {xs: "sticky", lg: "sticky"},
                            bottom: {xs: 0, lg: "auto"},
                            top: {xs: 55, lg: 80},
                            alignSelf: "flex-start",
                            zIndex: 10,
                        }}
                    >
                        {flightResults.length > 0 && (
                            <FlightFilters
                                filters={filters}
                                filterOptions={filterOptions}
                                onCheckboxChange={handleCheckboxChange}
                            />
                        )}
                    </Box>

                    {/* RESULTS */}
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: {xs: 2, lg: 4},
                        }}
                    >
                        {filteredFlights.length === 0 && (
                            <Box textAlign="center" py={16} mt={4} borderRadius={4}
                                 sx={{bgcolor: 'error.light', color: 'error.contrastText', fontWeight: 'bold'}}>
                                No Flight Available
                            </Box>
                        )}

                        {paginatedFlights.map((flight) => (
                            <AvailableTicketCard key={flight.id} flight={flight} onSelect={handleSelectFlight}/>
                        ))}

                        {/* ✅ MUI Pagination */}
                        {totalPages > 1 && (
                            <Box display="flex" justifyContent="center" mt={4}>
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={(_, page) => setCurrentPage(page)}
                                    color="primary"
                                    shape="rounded"
                                />
                            </Box>
                        )}
                    </Box>
                </Box>
            )}

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    sx: {
                        width: "100%",
                        mx: {xs: 2, lg: 'auto'}, // 16px on mobile (xs), 0 on larger screens
                    },
                }}
            >
                {loadingPricing ? (
                    <Box p={6} textAlign="center">
                        Fetching latest price…
                    </Box>
                ) : pricingResponse ? (
                    <FlightPricingModal
                        pricingResponse={pricingResponse}
                        open={open}
                        onClose={() => setOpen(false)}
                    />
                ) : (
                    <Box p={6} textAlign="center">
                        No pricing data available
                    </Box>
                )}
            </Dialog>

        </>
    )
}

export default HomePage
