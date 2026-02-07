import {httpAmadeusApi} from './http';
import {FLIGHT_ORDER, FLIGHT_PRICING, FLIGHT_SEARCH, LOCATION_SEARCH} from './servicePattern/apiEndPoint';
import {TokenService} from "../services/TokenService";
import {TSearchFlightFormData} from "../types/formTypes";
import {EnvService} from "./envService";

/**
 * Search flights using the Amadeus Flight Offers Search API.
 *
 * @async
 * @function searchFlights
 *
 * @param {TSearchFlightFormData} [params] - Flight search parameters.
 * @param {string} params.originLocationCode - IATA code of the origin airport (e.g. 'DAC').
 * @param {string} params.destinationLocationCode - IATA code of the destination airport (e.g. 'DXB').
 * @param {string} params.departureDate - Departure date in YYYY-MM-DD format.
 * @param {string} [params.returnDate] - Return date in YYYY-MM-DD format (for round trips).
 * @param {number} params.adults - Number of adult passengers.
 * @param {number} [params.children] - Number of child passengers.
 * @param {number} [params.infants] - Number of infant passengers.
 * @param {'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST'} [params.travelClass] - Travel class.
 * @param {boolean} [params.nonStop] - Whether to return only non-stop flights.
 * @param {string} [params.currencyCode] - Currency code for pricing (e.g. 'USD').
 * @param {boolean} [params.includedCheckedBagsOnly] - Return only offers including checked baggage.
 * @param {number} [params.maxPrice] - Maximum total price.
 * @param {number} [params.max] - Maximum number of results to return.
 *
 * @param {Record<string, string>} [headers={}] - Optional HTTP headers.
 *
 * @returns {Promise<AxiosResponse>} API response containing flight offers.
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

async function flightOrder(payload: any, headers: any = {}) {
    return httpAmadeusApi.post(FLIGHT_ORDER,
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

/**
 * Backend API service providing all endpoints.
 */
export const ApiService = () => ({
    searchFlights,
    fetchAmadeusToken,
    searchLocations,
    flightPricing,
    flightOrder
});

export async function fetchAmadeusToken(): Promise<string | null> {
    const baseUrl = EnvService.getBackendApiBaseUrl();
    console.log('Fetching Amadeus token from:', `${baseUrl}/api/amadeus-token`);
    try {
        const res = await fetch(`${baseUrl}/api/amadeus-token`, {
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

