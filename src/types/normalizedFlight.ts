export interface NormalizedFlight {
    id: string;
    price: number;
    currency: string;
    cabin: string;
    totalDuration: string; // sum of all itineraries
    stops: number; // total stops across all itineraries
    route: string[]; // all departure airports in order
    departureTime: string; // first departure of outbound
    arrivalTime: string;   // last arrival of return
    airlines: string[];
    aircraftTypes: string[];
    itineraries: any[]; // full itineraries preserved
    raw: any;
}