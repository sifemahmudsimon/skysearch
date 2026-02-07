import {httpAmadeusApi} from './http';
import {FLIGHT_PRICING, FLIGHT_SEARCH, LOCATION_SEARCH} from './servicePattern/apiEndPoint';
import {TokenService} from "../services/TokenService";
import {TSearchFlightFormData} from "../types/formTypes";

/**
 * Search flights Acceptable Payload
 *     originLocationCode: 'DAC',
 *     destinationLocationCode: 'DXB',
 *     departureDate: '2026-02-20',
 *     returnDate: '2026-02-28', [optional]
 *     adults: 2,
 *     children: 1, [optional]
 *     infants: 1, [optional]
 *     travelClass: 'ECONOMY', [optional]
 *     nonStop: false, [optional]
 *     currencyCode: 'USD', [optional]
 *     includedCheckedBagsOnly: true, [optional]
 *     maxPrice: 1500, [optional]
 *     max: 10, [optional]
 */
async function searchFlights(params?: TSearchFlightFormData, headers: any = {}) {
    return httpAmadeusApi.get(FLIGHT_SEARCH, {
        params,
        headers,
    });
}

async function flightPricing(payload: any, headers: any = {}) {
    return httpAmadeusApi.post(FLIGHT_PRICING,
        payload,
        {headers}
    );
}


/**
 * Search locations for autocomplete
 * @param query string to search, e.g., "DAC"
 */
async function searchLocations(query?: string) {
    return httpAmadeusApi.get(LOCATION_SEARCH, {
        params: {
            keyword: query,
            subType: 'CITY'
        }

    })
}

//     try {
//         const res = await httpAmadeusApi.get('/v1/reference-data/locations', {
//             params: {
//                 keyword: query,
//                 subType: 'AIRPORT,CITY',
//                 page: 1,
//                 pageLimit: 10,
//             },
//         });
//
//         // Map response to label/value
//         const locations = res.data.data.map((loc: any) => ({
//             label: `${loc.name} (${loc.iataCode})`,
//             value: loc.iataCode,
//         }));
//
//         return { data: locations };
//     } catch (err) {
//         console.error("Error fetching locations:", err);
//         return { data: [] };
//     }
// }
/**
 * Backend API service providing all endpoints.
 */
export const ApiService = () => ({
    searchFlights,
    fetchAmadeusToken,
    searchLocations,
    flightPricing
});

export async function fetchAmadeusToken(): Promise<string | null> {
    try {
        const res = await fetch("http://localhost:3001/api/amadeus-token", {
            method: "POST",
        });

        if (!res.ok) {
            console.error("Failed to fetch Amadeus token, status:", res.status);
            return null;
        }

        const data = await res.json();

        if (!data.access_token || !data.expires_in) {
            console.error("Invalid token response:", data);
            return null;
        }

        // Save token with safety buffer
        TokenService.set(data.access_token, data.expires_in);
        console.log("Fetched Amadeus token:", data.access_token, 'Expires In:', data.expires_in);

        return data.access_token;
    } catch (err) {
        console.error("Failed to fetch Amadeus token:", err);
        return null;
    }
}

