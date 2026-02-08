// http.ts
import axios from "axios";
import { EnvService } from "./envService";
import { AMADEUS_AUTH_TOKEN } from "./servicePattern/apiEndPoint";
import {TokenService} from "../services/tokenService";
import {fetchAmadeusToken} from "./apiService"; // adjust path

export const httpAmadeusApi = axios.create({
    baseURL: EnvService.getAmadeusApiBaseUrl(),
    timeout: 15000,
});

httpAmadeusApi.interceptors.request.use(
    async (config) => {
        if (!config.url?.includes(AMADEUS_AUTH_TOKEN)) {
            if (TokenService.isExpired()) {
                await fetchAmadeusToken(); // now calls your backend
            }

            config.headers.Authorization = `Bearer ${TokenService.get()}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);
