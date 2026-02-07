/**
 * Amadeus API base URL
 */
function getAmadeusApiBaseUrl(): string {
    return process.env.REACT_APP_AMADEUS_API_BASE_URL ?? '';
}

function getBackendApiBaseUrl(): string {
    if (process.env.REACT_APP_PUBLIC_PROJECT_MODE === 'development') {
        return process.env.REACT_APP_API_BASE_URL_DEVELOPMENT || 'http://localhost:3001';
    }
    return process.env.NEXT_PUBLIC_VERCEL_API_BASE_URL || 'https://skysearch-two.vercel.app';
}

/**
 * Amadeus client credentials (OAuth)
 */
function getAmadeusCredential(): { username: string; password: string } {
    const username = process.env.REACT_APP_AMADEUS_API_KEY || '';
    const password = process.env.REACT_APP_AMADEUS_API_SECRET || '';

    if (!username || !password) {
        if (process.env.REACT_APP_PUBLIC_PROJECT_MODE !== 'production') {
            console.warn('[EnvService] Missing Amadeus credentials');
        }
    }
    return {username, password};
}

export const EnvService = {
    getAmadeusApiBaseUrl,
    getBackendApiBaseUrl,
    getAmadeusCredential,
};

