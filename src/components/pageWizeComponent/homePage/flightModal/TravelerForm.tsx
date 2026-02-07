"use client";

import React from "react";
import {
    Box,
    Typography,
    Card,
    Stack,
    TextField,
    Button,
    MenuItem,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import {useForm, Controller, useFieldArray} from "react-hook-form";

interface Document {
    documentType: string;
    birthPlace: string;
    issuanceLocation: string;
    issuanceDate: string;
    number: string;
    expiryDate: string;
    issuanceCountry: string;
    validityCountry: string;
    nationality: string;
    holder: boolean;
}

interface Traveler {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: "Male" | "Female" | "Other" | "";
    email: string;
    phone: string;
    documents: Document[];
}

interface TravelerFormProps {
    travelers: Traveler[];
    onSubmit: (formData: Traveler[]) => void | Promise<void>;
    onBack?: () => void;
}

const genders = ["Male", "Female", "Other"];
const documentTypes = ["PASSPORT", "ID_CARD"];

export default function TravelerForm({travelers, onBack, onSubmit}: TravelerFormProps) {
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<{ travelers: Traveler[] }>({
        defaultValues: {travelers},
        mode: "onSubmit", // only validate on submit
    });

    const {fields} = useFieldArray({control, name: "travelers"});

    return (
        <Box
            sx={{
                p: {xs: 1.5, md: 3},
                maxHeight: "calc(100dvh - 64px)",
                overflowY: "auto",
                bgcolor: "background.paper",
                borderRadius: 2,
            }}
        >
            <form onSubmit={handleSubmit((data) => onSubmit(data.travelers))}>
                <Typography variant="h5" fontWeight={600} mb={3}>
                    Passenger Details
                </Typography>

                <Stack spacing={3}>
                    {fields.map((t, idx) => (
                        <Card key={t.id} sx={{p: {xs: 1.5, md: 3}, boxShadow: 1, borderRadius: 2}}>
                            <Typography variant={'h6'} fontWeight={600} mb={2}>
                                Traveler {idx + 1}
                            </Typography>

                            {/* Line 1: First & Last Name */}
                            <Stack direction={{xs: "column", sm: "row"}} spacing={2} mb={2}>
                                <Controller
                                    name={`travelers.${idx}.firstName`}
                                    control={control}
                                    rules={{required: "Required"}}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            label="First Name"
                                            size="small"
                                            sx={{flex: 1}}
                                            error={!!errors.travelers?.[idx]?.firstName}
                                            helperText={errors.travelers?.[idx]?.firstName?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name={`travelers.${idx}.lastName`}
                                    control={control}
                                    rules={{required: "Required"}}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            label="Last Name"
                                            size="small"
                                            sx={{flex: 1}}
                                            error={!!errors.travelers?.[idx]?.lastName}
                                            helperText={errors.travelers?.[idx]?.lastName?.message}
                                        />
                                    )}
                                />
                            </Stack>

                            {/* Line 2: DOB & Gender */}
                            <Stack direction={{xs: "column", sm: "row"}} spacing={2} mb={2}>
                                <Controller
                                    name={`travelers.${idx}.dateOfBirth`}
                                    control={control}
                                    rules={{required: "Required"}}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            label="DOB"
                                            type="date"
                                            size="small"
                                            InputLabelProps={{shrink: true}}
                                            sx={{flex: 1, minWidth: 120}}
                                            error={!!errors.travelers?.[idx]?.dateOfBirth}
                                            helperText={errors.travelers?.[idx]?.dateOfBirth?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name={`travelers.${idx}.gender`}
                                    control={control}
                                    rules={{required: "Required"}}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            select
                                            label="Gender"
                                            size="small"
                                            sx={{flex: 1, minWidth: 100}}
                                            error={!!errors.travelers?.[idx]?.gender}
                                            helperText={errors.travelers?.[idx]?.gender?.message}
                                        >
                                            {genders.map((g) => (
                                                <MenuItem key={g} value={g}>
                                                    {g}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                            </Stack>

                            {/* Line 3: Email & Phone */}
                            <Stack direction={{xs: "column", sm: "row"}} spacing={2} mb={2}>
                                <Controller
                                    name={`travelers.${idx}.email`}
                                    control={control}
                                    rules={{required: "Required"}}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            label="Email"
                                            type="email"
                                            size="small"
                                            sx={{flex: 1}}
                                            error={!!errors.travelers?.[idx]?.email}
                                            helperText={errors.travelers?.[idx]?.email?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name={`travelers.${idx}.phone`}
                                    control={control}
                                    rules={{required: "Required"}}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            label="Phone"
                                            size="small"
                                            sx={{flex: 1}}
                                            error={!!errors.travelers?.[idx]?.phone}
                                            helperText={errors.travelers?.[idx]?.phone?.message}
                                        />
                                    )}
                                />
                            </Stack>

                            {/* Line 4: Document Type & Number */}
                            <Stack direction={{xs: "column", sm: "row"}} spacing={2} mb={2}>
                                <Controller
                                    name={`travelers.${idx}.documents.0.documentType`}
                                    control={control}
                                    rules={{required: "Required"}}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            select
                                            label="Type"
                                            size="small"
                                            sx={{minWidth: 120}}
                                            error={!!errors.travelers?.[idx]?.documents?.[0]?.documentType}
                                            helperText={errors.travelers?.[idx]?.documents?.[0]?.documentType?.message}
                                        >
                                            {documentTypes.map((d) => (
                                                <MenuItem key={d} value={d}>
                                                    {d}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                                <Controller
                                    name={`travelers.${idx}.documents.0.number`}
                                    control={control}
                                    rules={{required: "Required"}}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            label="Number"
                                            size="small"
                                            sx={{flex: 1}}
                                            error={!!errors.travelers?.[idx]?.documents?.[0]?.number}
                                            helperText={errors.travelers?.[idx]?.documents?.[0]?.number?.message}
                                        />
                                    )}
                                />
                            </Stack>

                            {/* Line 5: Issue & Expiry */}
                            <Stack direction={{xs: "column", sm: "row"}} spacing={2} mb={2}>
                                <Controller
                                    name={`travelers.${idx}.documents.0.issuanceDate`}
                                    control={control}
                                    rules={{required: "Required"}}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            label="Issued"
                                            type="date"
                                            size="small"
                                            InputLabelProps={{shrink: true}}
                                            sx={{flex: 1, minWidth: 120}}
                                            error={!!errors.travelers?.[idx]?.documents?.[0]?.issuanceDate}
                                            helperText={errors.travelers?.[idx]?.documents?.[0]?.issuanceDate?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name={`travelers.${idx}.documents.0.expiryDate`}
                                    control={control}
                                    rules={{required: "Required"}}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            label="Expiry"
                                            type="date"
                                            size="small"
                                            InputLabelProps={{shrink: true}}
                                            sx={{flex: 1, minWidth: 120}}
                                            error={!!errors.travelers?.[idx]?.documents?.[0]?.expiryDate}
                                            helperText={errors.travelers?.[idx]?.documents?.[0]?.expiryDate?.message}
                                        />
                                    )}
                                />
                            </Stack>

                            {/* Line 6: Issuance, Validity, Nationality */}
                            <Stack direction={{xs: "column", sm: "row"}} spacing={2} mb={2}>
                                <Controller
                                    name={`travelers.${idx}.documents.0.issuanceCountry`}
                                    control={control}
                                    rules={{required: "Required"}}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            label="Issuance Country"
                                            size="small"
                                            sx={{flex: 1}}
                                            error={!!errors.travelers?.[idx]?.documents?.[0]?.issuanceCountry}
                                            helperText={errors.travelers?.[idx]?.documents?.[0]?.issuanceCountry?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name={`travelers.${idx}.documents.0.validityCountry`}
                                    control={control}
                                    rules={{required: "Required"}}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            label="Validity Country"
                                            size="small"
                                            sx={{flex: 1}}
                                            error={!!errors.travelers?.[idx]?.documents?.[0]?.validityCountry}
                                            helperText={errors.travelers?.[idx]?.documents?.[0]?.validityCountry?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name={`travelers.${idx}.documents.0.nationality`}
                                    control={control}
                                    rules={{required: "Required"}}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            label="Nationality"
                                            size="small"
                                            sx={{flex: 1}}
                                            error={!!errors.travelers?.[idx]?.documents?.[0]?.nationality}
                                            helperText={errors.travelers?.[idx]?.documents?.[0]?.nationality?.message}
                                        />
                                    )}
                                />
                            </Stack>

                            {/* Line 7: Birth Place, Issuance Location, Holder */}
                            <Stack direction={{xs: "column", sm: "row"}} spacing={2}>
                                <Controller
                                    name={`travelers.${idx}.documents.0.birthPlace`}
                                    control={control}
                                    rules={{required: "Required"}}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            label="Birth Place"
                                            size="small"
                                            sx={{flex: 1}}
                                            error={!!errors.travelers?.[idx]?.documents?.[0]?.birthPlace}
                                            helperText={errors.travelers?.[idx]?.documents?.[0]?.birthPlace?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name={`travelers.${idx}.documents.0.issuanceLocation`}
                                    control={control}
                                    rules={{required: "Required"}}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            label="Issuance Location"
                                            size="small"
                                            sx={{flex: 1}}
                                            error={!!errors.travelers?.[idx]?.documents?.[0]?.issuanceLocation}
                                            helperText={errors.travelers?.[idx]?.documents?.[0]?.issuanceLocation?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name={`travelers.${idx}.documents.0.holder`}
                                    control={control}
                                    rules={{required: "Required"}}
                                    render={({field}) => (
                                        <FormControlLabel
                                            control={<Checkbox {...field} checked={field.value ?? true} size="small"/>}
                                            label="Holder"
                                            sx={{ml: 0}}
                                        />
                                    )}
                                />
                            </Stack>
                        </Card>
                    ))}
                </Stack>

                <Box sx={{mt: 3}}>
                    <Button type="submit" fullWidth size="medium" variant="contained">
                        Submit
                    </Button>
                    {onBack && (
                        <Button fullWidth size="medium" variant="outlined" sx={{mt: 1}} onClick={onBack}>
                            Back
                        </Button>
                    )}
                </Box>
            </form>
        </Box>
    );
}
