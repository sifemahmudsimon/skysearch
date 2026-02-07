import { Controller } from "react-hook-form";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { TravelClass, TravelClassLabels } from "../../../../constants/tripTypes"; // adjust path

interface Props {
    control: any;
}

export default function TravelClassToggle({ control }: Props) {
    return (
        <Controller
            name="travelClass"
    control={control}
    render={({ field }) => (
        <ToggleButtonGroup
            value={field.value}
    exclusive
    onChange={(_, val) => val && field.onChange(val)}
    sx={{ mb: 3,width:{xs:'100%',lg:'auto'} }}
>
    {Object.values(TravelClass).map((cls) => (
        <ToggleButton
            key={cls}
        value={cls}
        sx={{ width: { xs: "100%", lg: "auto" } }}
    >
        {TravelClassLabels[cls]}
        </ToggleButton>
    ))}
    </ToggleButtonGroup>
)}
    />
);
}
