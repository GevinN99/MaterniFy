import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from "react-native";
import { getDoctorAppointments, cancelAppointment } from "../../api/appointmentApi";

export default function DoctorAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch Doctor Appointments
    const loadAppointments = async () => {
        setLoading(true);
        try {
            const data = await getDoctorAppointments();
            // Filter appointments for today only
            const today = new Date(); // Current date: March 21, 2025
            const todayString = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
            const todayAppointments = data.filter((appointment) => {
                const appointmentDate = new Date(appointment.appointmentDate).toISOString().split("T")[0];
                return appointmentDate === todayString;
            });
            setAppointments(todayAppointments);
        } catch (error) {
            console.error("Load Appointments Error:", error);
            Alert.alert("Error", "Failed to load appointments.");
        }
        setLoading(false);
    };

    useEffect(() => {
        loadAppointments();
    }, []);

    // Handle Appointment Cancellation
    const handleCancelAppointment = async (appointmentId) => {
        try {
            await cancelAppointment(appointmentId);
            Alert.alert("Success", "Appointment canceled.");
            loadAppointments(); // Reload list after canceling
        } catch (error) {
            console.error("Cancel Appointment Error:", error);
            Alert.alert("Error", "Failed to cancel appointment.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Appointments (Today)</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#007AFF" />
            ) : appointments.length > 0 ? (
                <FlatList
                    data={appointments}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.appointmentCard}>
                            <Text>
                                {new Date(item.appointmentDate).toLocaleDateString()} at {item.appointmentTime}
                            </Text>
                            <Text>Patient: {item.motherId?.fullName || "Not Assigned"}</Text>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => handleCancelAppointment(item._id)}
                            >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noAppointmentsText}>No appointments scheduled for today.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    appointmentCard: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        marginTop: 10,
    },
    cancelButton: {
        marginTop: 5,
        backgroundColor: "red",
        padding: 5,
        borderRadius: 5,
    },
    cancelText: { color: "white", textAlign: "center" },
    noAppointmentsText: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginTop: 20,
    },
});