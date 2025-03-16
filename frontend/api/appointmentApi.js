// api/appointmentApi.js

import axiosInstance from "./axiosInstance";

export const getAvailableAppointments = async () => {
    try {
        const response = await axiosInstance.get("/appointments/available");
        return response.data;
    } catch (error) {
        console.error("Error fetching available appointments:", error);
        return [];
    }
};

export const getUserBookedAppointments = async () => {
    try {
        const response = await axiosInstance.get("/appointments/my-booked");
        return response.data;
    } catch (error) {
        console.error("Error fetching user booked appointments:", error);
        return [];
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
