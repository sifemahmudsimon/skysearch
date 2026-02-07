// LocationInput.tsx
import { Controller } from "react-hook-form";
import { TextField, CircularProgress, Autocomplete } from "@mui/material";
import React, { useState } from "react";
import { ApiService } from "../../../../api/apiService";
import { useDebouncedCallback } from "../../../../api/servicePattern/debounceService";

interface Props {
    name: string;
    label: string;
    icon?: React.ReactNode;
    control: any;
}

interface LocationOption {
    label: string; // what user sees
    value: string; // iataCode sent to API
}

export default function LocationInput({ name, label, icon, control }: Props) {
    const [options, setOptions] = useState<LocationOption[]>([]);
    const [loading, setLoading] = useState(false);

    // --- API call ---
    const searchLocations = (query: string) => {
        if (!query || query.length < 3) {
            setOptions([]);
            return;
        }

        setLoading(true);

        ApiService()
            .searchLocations(query)
            .then((res) => {
                const locations = Array.isArray(res.data?.data) ? res.data.data : [];

                setOptions(
                    locations.map((loc: any) => ({
                        label: loc.detailedName || loc.name, // show full name
                        value: loc.iataCode || loc.id,       // store iataCode for API
                    }))
                );
            })
            .catch((err) => {
                console.error("Error fetching locations:", err);
                setOptions([]);
            })
            .finally(() => setLoading(false));
    };

    const debouncedSearchLocations = useDebouncedCallback(searchLocations, 300);

    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: "Location is required" }}
            render={({ field, fieldState }) => (
                <Autocomplete
                    freeSolo
                    options={options}
                    loading={loading}
                    getOptionLabel={(option) => {
                        // During search dropdown: show full label
                        if (typeof option === "string") return option; // typed text
                        return option.label; // show name in dropdown
                    }}
                    isOptionEqualToValue={(option, value) =>
                        typeof value === "string" ? option.value === value : option.value === value.value
                    }
                    value={
                        // Show IATA code in input after selection
                        field.value || null
                    }
                    onInputChange={(_, value, reason) => {
                        if (reason === "input") debouncedSearchLocations(value);
                    }}
                    onChange={(_, value) => {
                        if (typeof value === "string") {
                            field.onChange(value); // user typed
                        } else if (value && "value" in value) {
                            field.onChange(value.value); // selected iataCode
                        } else {
                            field.onChange("");
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            placeholder="Select a location"
                            fullWidth
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: icon,
                                endAdornment: (
                                    <>
                                        {loading && <CircularProgress color="inherit" size={20} />}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            )}
        />
    );
}
