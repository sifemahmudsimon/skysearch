import { Box, Button, Popover, Typography } from "@mui/material";
import { People } from "@mui/icons-material";
import React from "react";

interface Props {
    values: any;
    setValue: any;
    anchor: HTMLElement | null;
    setAnchor: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    grid?: number;
}

export default function PassengerSelector({ values, setValue, anchor, setAnchor, grid = 1 }: Props) {
    // Read passengers directly from top-level values
    const totalPassengers = values.adults + values.children + values.infants;

    const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchor(e.currentTarget);
    const handleClose = () => setAnchor(null);

    const updatePassenger = (type: "adults" | "children" | "infants", delta: number) => {
        setValue(type, Math.max(type === "adults" ? 1 : 0, values[type] + delta));
    };

    return (
        <Box sx={{ gridColumn: { lg: `span ${grid}` } }}>
            <Button
                variant="outlined"
                startIcon={<People />}
                onClick={handleOpen}
                sx={{ width: { xs: '100%', lg: '245px' }, height: 56 }}
            >
                {totalPassengers} Travelers
            </Button>

            <Popover
                open={Boolean(anchor)}
                anchorEl={anchor}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                PaperProps={{ sx: { mt: 1 } }}
            >
                <Box sx={{ p: 2 }}>
                    {(["adults", "children", "infants"] as const).map((type) => (
                        <Box key={type} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography textTransform="capitalize">{type}</Typography>
                            <Box>
                                <Button size="small" onClick={() => updatePassenger(type, -1)}>
                                    -
                                </Button>
                                <Typography component="span" sx={{ mx: 1 }}>
                                    {values[type]}
                                </Typography>
                                <Button size="small" onClick={() => updatePassenger(type, 1)}>
                                    +
                                </Button>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Popover>
        </Box>
    );
}
