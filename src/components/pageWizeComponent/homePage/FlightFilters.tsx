"use client"

import React, {useState} from "react"
import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Typography,
    Button,
    Chip,
    Drawer,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    useMediaQuery,
    useTheme,
    Paper,
    Divider,
} from "@mui/material"
import TuneIcon from "@mui/icons-material/Tune"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import CloseIcon from "@mui/icons-material/Close"

interface FlightFiltersProps {
    filters: {
        carriers: string[]
        aircraft: string[]
        locations: string[]
    }
    filterOptions: {
        carrierOptions: Record<string, string>
        aircraftOptions: Record<string, string>
        locationOptions: Record<string, { cityCode: string }>
    }
    onCheckboxChange: (
        category: keyof FlightFiltersProps["filters"],
        value: string
    ) => void
}

const FlightFilters: React.FC<FlightFiltersProps> = ({
                                                         filters,
                                                         filterOptions,
                                                         onCheckboxChange,
                                                     }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("lg"))
    const [drawerOpen, setDrawerOpen] = useState(false)

    const totalFilters =
        filters.carriers.length + filters.aircraft.length + filters.locations.length

    const carrierEntries = Object.entries(filterOptions.carrierOptions)
    const aircraftEntries = Object.entries(filterOptions.aircraftOptions)
    const locationEntries = Object.entries(filterOptions.locationOptions).map(
        ([code, loc]) => [code, `${code} (${loc.cityCode})`] as [string, string]
    )

    const renderCheckboxes = (
        entries: [string, string][],
        category: keyof FlightFiltersProps["filters"]
    ) => (
        <FormGroup>
            {entries.map(([code, name]) => (
                <FormControlLabel
                    key={code}
                    control={
                        <Checkbox
                            checked={filters[category].includes(code)}
                            onChange={() => onCheckboxChange(category, code)}
                            size="small"
                        />
                    }
                    label={name}
                />
            ))}
        </FormGroup>
    )

    const renderAccordionGroup = (
        title: string,
        entries: [string, string][],
        category: keyof FlightFiltersProps["filters"],
        defaultExpanded: boolean
    ) => (
        <Accordion
            defaultExpanded={defaultExpanded}
            disableGutters
            elevation={0}
            sx={{
                "&:before": {display: "none"}, // remove shadow/line
                backgroundColor: "transparent", // transparent bg
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                sx={{backgroundColor: "transparent", px: 0}}
            >
                <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                    <Typography>{title}</Typography>
                    {filters[category].length > 0 && (
                        <Chip label={filters[category].length} size="small" sx={{ml: 1}}/>
                    )}
                </Box>
            </AccordionSummary>
            <AccordionDetails sx={{backgroundColor: "transparent", px: 0}}>
                {renderCheckboxes(entries, category)}
            </AccordionDetails>
        </Accordion>
    )

    // ---------- Mobile ----------
    if (isMobile) {
        return (
            <Box sx={{maxWidth: "96rem", mx: "auto", py: 2}}>
                <Button
                    variant={isMobile ? "contained" : "outlined"}
                    fullWidth
                    startIcon={<TuneIcon/>}
                    onClick={() => setDrawerOpen(true)}
                    sx={{justifyContent: "space-between", textTransform: "none", py: 1.5}}
                >
                    Filter Flights
                    {totalFilters > 0 && (
                        <Chip label={totalFilters} size="small" color="primary" sx={{ml: 1}}/>
                    )}
                </Button>

                <Drawer
                    anchor="bottom"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    PaperProps={{
                        sx: {maxHeight: "85vh", borderTopLeftRadius: 16, borderTopRightRadius: 16},
                    }}
                >
                    <Box sx={{px: 2.5, pt: 2, pb: 3}}>
                        <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1}}>
                            <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                                <TuneIcon sx={{fontSize: 20, color: "text.secondary"}}/>
                                <Typography variant="h6" sx={{fontWeight: 700, fontSize: "1.1rem"}}>
                                    Filter Flights
                                </Typography>
                                {totalFilters > 0 && (
                                    <Chip
                                        label={`${totalFilters} active`}
                                        size="small"
                                        color="primary"
                                        sx={{height: 22, fontSize: "0.7rem", fontWeight: 600}}
                                    />
                                )}
                            </Box>
                            <IconButton onClick={() => setDrawerOpen(false)} size="small" aria-label="Close filters">
                                <CloseIcon fontSize="small"/>
                            </IconButton>
                        </Box>

                        <Divider sx={{mb: 1}}/>

                        {renderAccordionGroup("Carriers", carrierEntries, "carriers", false)}
                        {renderAccordionGroup("Aircraft", aircraftEntries, "aircraft", false)}
                        {renderAccordionGroup("Locations", locationEntries, "locations", false)}
                    </Box>
                </Drawer>
            </Box>
        )
    }

    // ---------- Desktop ----------
    return (
        <Box sx={{maxWidth: "96rem", pr: {md: 3, lg: 4}}}>
            <Paper sx={{borderRadius: 3, p: 3}}>
                <Box sx={{display: "flex", alignItems: "center", mb: 2, gap: 1}}>
                    <TuneIcon fontSize="small" sx={{color: "text.secondary"}}/>
                    <Typography variant="h6" sx={{fontWeight: 700}}>
                        Filter Flights
                    </Typography>
                    {totalFilters > 0 && (
                        <Chip label={`${totalFilters} active`} size="small" color="primary" sx={{ml: 1}}/>
                    )}
                </Box>

                {renderAccordionGroup("Carriers", carrierEntries, "carriers", true)} {/* first expanded */}
                {renderAccordionGroup("Aircraft", aircraftEntries, "aircraft", false)}
                {renderAccordionGroup("Locations", locationEntries, "locations", false)}
            </Paper>
        </Box>
    )
}

export default FlightFilters
