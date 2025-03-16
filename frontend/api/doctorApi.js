import axiosInstance from "./axiosInstance";

export const getAvailableDoctors = async () => {
    try {
        const response = await axiosInstance.get("/doctors/available");
        return response.data;
    } catch (error) {
        console.error("Error fetching available doctors:", error);
        return [];
    }
};
