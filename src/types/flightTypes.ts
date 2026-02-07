import {NormalizedFlight} from "./normalizedFlight";
import FlightPriceTrends from "../components/pageWizeComponent/homePage/FlightPriceTrends";
import {useFieldArray, useForm} from "react-hook-form";

export interface AvailableTicketCardProps {
    flight: NormalizedFlight
    onSelect: (flight: NormalizedFlight) => void
}

export interface FlightOffer {
    id: string;
    price: {
        total: string; // e.g., "2823.33"
    };
    itineraries: {
        segments: {
            departure: { at: string }; // e.g., "2026-02-07T06:25:00"
        }[];
    }[];
}

export interface FlightPriceTrendsProps {
    finalResult?: FlightOffer[] | null;
}

export interface FlightFiltersProps {
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

export interface SearchFormProps {
    setFlightResults?: (data: any) => void;
}

export interface FlightModalProps {
    pricingResponse: any;
    open: boolean;
    onClose: () => void;
}

export interface Document {
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

export interface Traveler {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: "Male" | "Female" | "Other" | "";
    email: string;
    phone: string;
    documents: Document[];
}

export interface TravelerFormProps {
    travelers: Traveler[];
    onSubmit: (formData: Traveler[]) => void | Promise<void>;
    onBack?: () => void;
}