/**
 * Amadeus API base URL
 */
function getAmadeusApiBaseUrl(): string {
    return process.env.REACT_APP_AMADEUS_API_BASE_URL ?? '';
}

/**
 * Amadeus client credentials (OAuth)
 */
function getAmadeusCredential(): { username: string; password: string } {
    const username = process.env.REACT_APP_AMADEUS_API_KEY || '';
    const password = process.env.REACT_APP_AMADEUS_API_SECRET || '';

    if (!username || !password) {
        if (process.env.PUBLIC_PROJECT_MODE !== 'production') {
            console.warn('[EnvService] Missing Amadeus credentials');
        }
    }
    return {username, password};
}

export const EnvService = {
    getAmadeusApiBaseUrl,
    getAmadeusCredential,
};
