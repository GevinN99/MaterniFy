import axiosInstance from "./axiosInstance";

// User registration
export const registerUser = async (userData) => {
    try {
        const response = await axiosInstance.post("/users/register", userData);
        return response.data;
    } catch (error) {
        console.error("Signup Error:", error.response?.data || error.message);
        return { error: error.response?.data || "Signup failed!" };
    }
};

// User login
export const loginUser = async (credentials) => {
    try {
        const response = await axiosInstance.post("/users/login", credentials);
        return response.data;
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        return { error: error.response?.data || "Login failed!" };
    }
};

// Doctor login
export const loginDoctor = async (credentials) => {
    try {
        const response = await axiosInstance.post("/doctors/login", credentials);
        return response.data;
    } catch (error) {
        console.error("Doctor Login Error:", error.response?.data || error.message);
        return { error: error.response?.data || "Doctor login failed!" };
    }
};