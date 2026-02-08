// utils/flightNormalizer.ts

import {NormalizedFlight} from "../types/normalizedFlight";

export function normalizeFlight(flight: any): NormalizedFlight {
    if (!flight.itineraries?.length) {
        return {
            id: flight.id,
            price: Number(flight.price.grandTotal),
            currency: flight.price.currency,
            cabin: "N/A",
            totalDuration: "PT0H0M",
            stops: 0,
            route: [],
            departureTime: "",
            arrivalTime: "",
            airlines: [],
            aircraftTypes: [],
            itineraries: [],
            raw: flight,
        };
    }

    // Flatten all segments from all itineraries
    const allSegments = flight.itineraries.flatMap((it: any) => it.segments);

    // Calculate total stops
    const totalStops = allSegments.length - flight.itineraries.length;

    // Sum durations (optional: just concatenate as string for simplicity)
    const totalDuration = flight.itineraries.map((it: any) => it.duration).join(" | ");

    return {
        id: flight.id,
        price: Number(flight.price.grandTotal),
        currency: flight.price.currency,

        cabin:
            flight.travelerPricings?.[0]
                ?.fareDetailsBySegment?.[0]
                ?.cabin ?? "N/A",

        totalDuration,
        stops: totalStops,

        // All departure airports in order
        route: allSegments.map((s: any) => s.departure.iataCode),

        // First departure of first itinerary
        departureTime: allSegments[0].departure.at,
        // Last arrival of last itinerary
        arrivalTime: allSegments[allSegments.length - 1].arrival.at,

        // Unique airlines & aircraft types
        airlines: Array.from(new Set(allSegments.map((s: any) => s.carrierCode))),
        aircraftTypes: Array.from(new Set(allSegments.map((s: any) => s.aircraft?.code))),

        itineraries: flight.itineraries, // preserve full outbound + return
        raw: flight,
    };
}
