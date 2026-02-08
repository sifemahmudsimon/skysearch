// services/flightService.ts
import {NormalizedFlight} from "../types/normalizedFlight";
import {normalizeFlight} from "../utils/flightNormalizer";
import {FlightFilters} from "../types/flightTypes";

// Normalize flights
function normalizeFlights(flightsData: any[]): NormalizedFlight[] {
    if (!flightsData?.length) return [];

    const flightsArray: any[] = Array.isArray(flightsData[0])
        ? flightsData.flat()
        : flightsData;

    return flightsArray.map(normalizeFlight);
}

// Apply filters
function applyFilters(flights: NormalizedFlight[], filters: FlightFilters): NormalizedFlight[] {
    return flights.filter((flight) => {
        const carrierMatch =
            !filters.carriers?.length ||
            flight.airlines.some((c) => filters.carriers?.includes(c));

        const aircraftMatch =
            !filters.aircraft?.length ||
            flight.aircraftTypes.some((a) => filters.aircraft?.includes(a));

        const locationMatch =
            !filters.locations?.length ||
            flight.route.some((code) => filters.locations?.includes(code));

        return carrierMatch && aircraftMatch && locationMatch;
    });
}

// Pagination
function paginateFlights(flights: NormalizedFlight[], page: number, perPage: number): NormalizedFlight[] {
    const start = (page - 1) * perPage;
    const end = page * perPage;
    return flights.slice(start, end);
}

// Extract filter options
function extractFilterOptions(flightResults: any) {
    return {
        carrierOptions: (flightResults?.dictionaries?.carriers || {}) as Record<string, string>,
        aircraftOptions: (flightResults?.dictionaries?.aircraft || {}) as Record<string, string>,
        locationOptions: (flightResults?.dictionaries?.locations || {}) as Record<string, any>,
    };
}

export const FlightService = {
    normalizeFlights,
    applyFilters,
    paginateFlights,
    extractFilterOptions
}
