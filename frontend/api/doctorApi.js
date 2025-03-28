import axiosInstance from "./axiosInstance";

export const getAvailableDoctors = async () => {
    try {
        const response = await axiosInstance.get("/doctors/available");
        console.log("Available Doctors Response:", JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error("Error fetching available doctors:", error.response?.data || error.message);
        throw error;
    }
};

export const updateDoctorOnlineStatus = async (isOnline) => {
    try {
        console.log("Sending PUT request to update online status:", { isOnline });
        const response = await axiosInstance.put("/doctors/online-status", { isOnline });
        console.log("Update Online Status API Response:", JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error("Error updating online status:", error.response?.data || error.message);
        throw error;
    }
};