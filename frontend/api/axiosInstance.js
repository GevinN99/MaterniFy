import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8070/api";

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
});

// Automatically attach token to requests
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            // config.headers.Authorization = `Bearer ${token}`;
            config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjI0MTcxYmViMmQ5ODYzNDVhNzRiNiIsInVzZXJuYW1lIjoiZ2V2aW5AZ21haWwuY29tIiwicm9sZSI6Im1vdGhlciIsImlhdCI6MTc0MTU2NDk4NywiZXhwIjoxNzQxNTg2NTg3fQ.KrXD5hy_tt99sC2-5cpK80oLaMQMSQa_lwuplaW6YlY`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
