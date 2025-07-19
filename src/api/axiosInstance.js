// src/utils/axiosInterceptor.js
import axios from "axios";
import keycloak from "../keycloak"; // adjust path as needed
import { baseURL } from "../constants/baseURL";

const api = axios.create({
    baseURL,
});

// Request interceptor to attach token
api.interceptors.request.use(
    async (config) => {
        try {
            // Try to update token if it's expiring in next 60 seconds
            const refreshed = await keycloak.updateToken(60);

            if (refreshed) {
                console.log("🔄 Access token refreshed");
            }

            const token = keycloak.token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        } catch (err) {
            console.error("❌ Token update failed", err);
            keycloak.logout({ redirectUri: window.location.origin });
            return Promise.reject(err);
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor (optional error handling)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Optional: logout or redirect on 401
        if (error.response?.status === 401) {
            console.warn("❌ Unauthorized: logging out");
            keycloak.logout({ redirectUri: window.location.origin });
        }

        return Promise.reject(error);
    }
);

export default api;
