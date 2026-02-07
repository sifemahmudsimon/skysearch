import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { TripType, TripTypeLabels } from "../../../../constants/tripTypes";

interface Props {
    tripType: TripType | null;
    setTripType: (type: TripType) => void;
}

export default function TripTypeToggle({ tripType, setTripType }: Props) {
    return (
        <ToggleButtonGroup
            value={tripType}
            exclusive
            onChange={(_, val) => val && setTripType(val)}
            sx={{ mb: 3, width: { xs: "100%", lg: "auto" } }}
        >
            {Object.values(TripType).map((type) => (
                <ToggleButton
                    key={type}
                    value={type}
                    sx={{
                        flex: "1 1 auto",
                        whiteSpace: "nowrap",
                    }}
                >
                    {TripTypeLabels[type]}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
}
