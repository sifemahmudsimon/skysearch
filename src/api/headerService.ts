/**
 * Returns default headers for Amadeus OAuth
 */
function basicHeader() {
    return { 'Content-Type': 'application/x-www-form-urlencoded' };
}

export const HeaderService = {
    basicHeader,
};
