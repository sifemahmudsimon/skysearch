export type TSearchFlightFormData = {
    originLocationCode: string | null;
    destinationLocationCode: string | null;
    departureDate: any;
    returnDate?: any;
    adults: number;
    children?: number | null;
    infants?: number | null;
    travelClass?: string;
    currencyCode?: string;
};