import axiosInstance from "./axiosInstance";

export const registerUser = async (userData) => {
    try {
        const response = await axiosInstance.post("/users/register", userData);
        return response.data;
    } catch (error) {
        console.error("Signup Error:", error.response?.data || error.message);
        return { error: error.response?.data || "Signup failed!" };
    }
};
