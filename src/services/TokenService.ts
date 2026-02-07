// tokenService.ts
let token: string | null = null;
let expiresAt = 0;

export const TokenService = {
    get() {
        return token;
    },
    isExpired() {
        return Date.now() >= expiresAt;
    },
    set(accessToken: string, expiresIn: number) {
        token = accessToken;
        // renew 1 min early (safety buffer)
        expiresAt = Date.now() + (expiresIn - 60) * 1000;
    },
    clear() {
        token = null;
        expiresAt = 0;
    },
};
