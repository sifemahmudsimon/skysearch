export interface NormalizedFlight {
    id: string;
    price: number;
    currency: string;
    cabin: string;
    totalDuration: string;
    stops: number;
    route: string[];
    departureTime: string;
    arrivalTime: string;
    airlines: string[];
    aircraftTypes: string[];
    raw: any
}