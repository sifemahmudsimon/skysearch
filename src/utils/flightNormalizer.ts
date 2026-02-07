// utils/flightNormalizer.ts

import {NormalizedFlight} from "../types/normalizedFlight";

export function normalizeFlight(flight: any): NormalizedFlight {
    const itinerary = flight.itineraries[0];
    const segments = itinerary.segments;

    return {
        id: flight.id,

        price: Number(flight.price.grandTotal),
        currency: flight.price.currency,

        cabin:
            flight.travelerPricings?.[0]
                ?.fareDetailsBySegment?.[0]
                ?.cabin ?? "N/A",

        totalDuration: itinerary.duration,

        stops: segments.length - 1,

        route: segments.map((s: any) => s.departure.iataCode),

        departureTime: segments[0].departure.at,
        arrivalTime: segments[segments.length - 1].arrival.at,

        airlines: Array.from(
            new Set(segments.map((s: any) => s.carrierCode))
        ),

        aircraftTypes: segments.map(
            (s: any) => s.aircraft?.code
        ),
    };
}
