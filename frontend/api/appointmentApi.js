import axiosInstance from "./axiosInstance";

export const createAppointment = async (appointmentData) => {
    try {
        const response = await axiosInstance.post("/appointments", appointmentData);
        return response.data;
    } catch (error) {
        console.error("Error creating appointment:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to create appointment");
    }
};

export const getAvailableAppointments = async () => {
    try {
        const response = await axiosInstance.get("/appointments/available");
        return response.data;
    } catch (error) {
        console.error("Error fetching available appointments:", error.response?.data || error.message);
        throw error;
    }
};

export const getUserBookedAppointments = async () => {
    try {
        const response = await axiosInstance.get("/appointments/my-booked");
        return response.data;
    } catch (error) {
        console.error("Error fetching booked appointments:", error.response?.data || error.message);
        throw error;
    }
};

export const getDoctorAppointments = async () => {
    try {
        const response = await axiosInstance.get("/appointments/doctor");
        return response.data;
    } catch (error) {
        console.error("Error fetching doctor appointments:", error);
        return [];
    }
};

export const bookAppointment = async (appointmentId) => {
    try {
        const response = await axiosInstance.post(`/appointments/book`, { appointmentId });
        return response.data;
    } catch (error) {
        console.error("Error booking appointment:", error);
        return { error: error.response?.data || "Failed to book appointment" };
    }
};

export const cancelAppointment = async (appointmentId) => {
    try {
        await axiosInstance.delete(`/appointments/cancel/${appointmentId}`);
        return { success: true };
    } catch (error) {
        console.error("Error canceling appointment:", error);
        return { error: error.response?.data || "Failed to cancel appointment" };
    }
};

const loadBookedAppointments = async () => {
    setLoading(true);
    try {
        const data = await getUserBookedAppointments();
        console.log("Booked Appointments Data:", data);
        setBookedAppointments(Array.isArray(data) ? data : [data]);
    } catch (error) {
        Alert.alert("Error", "Failed to load booked appointments.");
    }
    setLoading(false);
};

