import axiosInstance from "./axiosInstance";

// Doctor creates an appointment
export const createAppointment = async (appointmentData) => {
    try {
        const response = await axiosInstance.post("/appointments/create", appointmentData);
        return response.data;
    } catch (error) {
        console.error("Create Appointment Error:", error.response?.data || error.message);
        return { error: error.response?.data || "Failed to create appointment!" };
    }
};

// Doctor fetches their own appointments
export const getDoctorAppointments = async () => {
    try {
        const response = await axiosInstance.get("/appointments/doctor");
        return response.data;
    } catch (error) {
        console.error("Fetch Doctor Appointments Error:", error.response?.data || error.message);
        return [];
    }
};

// Doctor cancels an appointment
export const cancelAppointment = async (appointmentId) => {
    try {
        await axiosInstance.delete(`/appointments/cancel/${appointmentId}`);
        return { success: true };
    } catch (error) {
        console.error("Cancel Appointment Error:", error.response?.data || error.message);
        return { error: error.response?.data || "Failed to cancel appointment!" };
    }
};

// User fetches available appointments
export const getAvailableAppointments = async () => {
    try {
        const response = await axiosInstance.get("/appointments/available");
        return response.data;
    } catch (error) {
        console.error("Fetch Available Appointments Error:", error.response?.data || error.message);
        return [];
    }
};

// User books an appointment
export const bookAppointment = async (appointmentId) => {
    try {
        const response = await axiosInstance.post(`/appointments/book`, { appointmentId });
        return response.data;
    } catch (error) {
        console.error("Book Appointment Error:", error.response?.data || error.message);
        return { error: error.response?.data || "Failed to book appointment!" };
    }
};

// User fetches their booked appointments
export const getUserBookedAppointments = async () => {
    try {
        const response = await axiosInstance.get("/appointments/my-booked");
        return response.data;
    } catch (error) {
        console.error("Fetch User Booked Appointments Error:", error.response?.data || error.message);
        return [];
    }
};
