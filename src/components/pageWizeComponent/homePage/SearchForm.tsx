import { Box, Button, IconButton, CircularProgress } from "@mui/material";
import {AutoAwesome, LocationOn, SwapHoriz} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import {useEffect, useState} from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import TripTypeToggle from "./searchForm/TripTypeToggle";
import LocationInput from "./searchForm/LocationInput";
import DateInput from "./searchForm/DateInput";
import PassengerSelector from "./searchForm/PassangerSelector";
import TravelClassToggle from "./searchForm/TravelClassToggle";
import {TravelClass, TripType} from "../../../constants/tripTypes";
import {ApiService} from "../../../api/apiService";
import {TSearchFlightFormData} from "../../../types/formTypes";
import dayjs from "dayjs";
import {SearchFormProps} from "../../../types/flightTypes";


export default function SearchForm({ setFlightResults }: SearchFormProps) {
    const today = new Date();

    const { control, watch, setValue, handleSubmit } = useForm<TSearchFlightFormData>({
        defaultValues: {
            originLocationCode: '',
            destinationLocationCode: '',
            departureDate: today,
            returnDate: '',
            adults: 1,
            children: 0,
            infants: 0,
            travelClass: TravelClass.ECONOMY,
            currencyCode: "USD",
        },
    });

    const values = watch();
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
    const [tripType, setTripType] = useState<TripType | null>(TripType.ROUNDTRIP);
    const [loading, setLoading] = useState(false);

    const swap = () => {
        const temp = values.originLocationCode;
        setValue("originLocationCode", values.destinationLocationCode);
        setValue("destinationLocationCode", temp);
    };

    const isReturnDisabled = tripType !== TripType.ROUNDTRIP;
    useEffect(() => {
        if (isReturnDisabled) {
            setValue("returnDate", null); // clear the input
        }
    }, [isReturnDisabled, setValue]);

    const formatDate = (date?: Date) => date ? dayjs(date).format("YYYY-MM-DD") : undefined;

    const onSubmit = (formData: TSearchFlightFormData) => {
        const payload = {
            ...formData,
            departureDate: formatDate(formData.departureDate),
            returnDate: formatDate(formData.returnDate),
        };

        setLoading(true);
        setFlightResults?.(null);

        console.log("Payload for Amadeus API:", payload);

        ApiService()
            .searchFlights(payload)
            .then(res => {
                setFlightResults?.(res.data);
                console.log("Response:", res.data);
            })
            .catch(err => console.log("API Error:", err))
            .finally(() => setLoading(false)); // ✅ stop loading
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    p: 3,
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    boxShadow: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    pointerEvents: loading ? "none" : "auto", // disable all inputs while loading
                    opacity: loading ? 0.6 : 1,
                }}
            >
                {/* Trip Type & Travel Class */}
                <Box sx={{ display: { lg: "flex" }, justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                    <TripTypeToggle tripType={tripType} setTripType={setTripType} />
                    <TravelClassToggle control={control} />
                </Box>

                {/* Origin | Swap | Destination */}
                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1, alignItems: "center" }}>
                    <Box sx={{ flex: 1, width: { xs: "100%", lg: "auto" } }}>
                        <LocationInput name="originLocationCode" label="From" icon={<AutoAwesome sx={{ mr: 1 }} />} control={control} />
                    </Box>

                    <IconButton onClick={swap} sx={{ alignSelf: { xs: "center", sm: "center" } }}>
                        <SwapHoriz />
                    </IconButton>

                    <Box sx={{ flex: 1, width: { xs: "100%", lg: "auto" } }}>
                        <LocationInput name="destinationLocationCode" label="To" icon={<LocationOn sx={{ mr: 1 }} />} control={control} />
                    </Box>
                </Box>

                {/* Depart | Return | Passengers */}
                <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: 2, alignItems: "center" }}>
                    <Box sx={{ flex: 1, width: { xs: "100%", lg: "auto" } }}>
                        <DateInput name="departureDate" label="Depart" control={control} minDate={today} />
                    </Box>

                    <Box sx={{ flex: 1, width: { xs: "100%", lg: "auto" } }}>
                        <DateInput
                            name="returnDate"
                            label="Return"
                            control={control}
                            minDate={values.departureDate || today}
                            disabled={isReturnDisabled}
                            rules={{
                                required: tripType === TripType.ROUNDTRIP ? "Return date is required" : false,
                                validate: (value: Date | null) => {
                                    if (tripType === TripType.ROUNDTRIP && value && values.departureDate && value < values.departureDate) {
                                        return "Return date cannot be before departure date";
                                    }
                                    return true;
                                },
                            }}
                        />
                    </Box>

                    <Box sx={{ width: { xs: "100%", lg: "auto" }, alignSelf: { xs: "center", sm: "center" } }}>
                        <PassengerSelector values={values} setValue={setValue} anchor={anchor} setAnchor={setAnchor} />
                    </Box>
                </Box>

                {/* Search Button */}
                <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "flex-end" } }}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ height: 56, width: { xs: "100%", sm: "100%", lg: "245px" } }}
                        disabled={loading} // disable button while loading
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" /> // ✅ circular loading
                        ) : (
                            "Search Flights"
                        )}
                    </Button>
                </Box>
            </Box>
        </LocalizationProvider>
    );
}
