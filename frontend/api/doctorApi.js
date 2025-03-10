import axiosInstance from "./axiosInstance";

// Fetch Available Doctors
export const getAvailableDoctors = async () => {
    try {
        const response = await axiosInstance.get("/doctors/available");
        return response.data;
    } catch (error) {
        console.error("Fetch Available Doctors Error:", error.response?.data || error.message);
        return [];
    }
};
