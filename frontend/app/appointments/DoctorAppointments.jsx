// app/appointments/doctorAppointments.js
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { getDoctorAppointments, cancelAppointment } from "../../api/appointmentApi";

export default function DoctorAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch Doctor Appointments
    const loadAppointments = async () => {
        setLoading(true);
        try {
            const data = await getDoctorAppointments();
            setAppointments(data);
        } catch (error) {
            Alert.alert("Error", "Failed to load appointments.");
        }
        setLoading(false);
    };

    useEffect(() => {
        loadAppointments();
    }, []);

    // Handle Appointment Cancellation
    const handleCancelAppointment = async (appointmentId) => {
        await cancelAppointment(appointmentId);
        Alert.alert("Success", "Appointment canceled.");
        loadAppointments(); // Reload list after canceling
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Appointments</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#007AFF" />
            ) : (
                <FlatList
                    data={appointments}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.appointmentCard}>
                            <Text>{item.appointmentDate} at {item.appointmentTime}</Text>
                            <Text>Patient: {item.motherId?.fullName}</Text>

                            <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancelAppointment(item._id)}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    appointmentCard: { padding: 10, borderBottomWidth: 1, borderColor: "#ccc", marginTop: 10 },
    cancelButton: { marginTop: 5, backgroundColor: "red", padding: 5, borderRadius: 5 },
    cancelText: { color: "white", textAlign: "center" },
});
