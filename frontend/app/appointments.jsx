import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import axiosInstance from "../api/axiosInstance";
import { useRouter } from "expo-router";

export default function AppointmentsScreen() {
    const [appointments, setAppointments] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axiosInstance.get("/appointments/pending");
            setAppointments(response.data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Available Appointments</Text>
            {appointments.length === 0 ? (
                <Text style={styles.noAppointments}>No available appointments.</Text>
            ) : (
                <FlatList
                    data={appointments}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.doctorName}>Dr. {item.doctorId.fullName}</Text>
                            <Text>Specialization: {item.doctorId.specialization}</Text>
                            <Text>Date: {new Date(item.appointmentDate).toLocaleDateString()}</Text>
                            <Text>Time: {item.appointmentTime}</Text>

                            <TouchableOpacity
                                style={styles.bookButton}
                                onPress={() => router.push(`/appointment/${item._id}`)}
                            >
                                <Text style={styles.bookButtonText}>Book Appointment</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
    noAppointments: { fontSize: 16, color: "gray", textAlign: "center", marginTop: 50 },
    card: { backgroundColor: "white", padding: 15, marginVertical: 10, borderRadius: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    doctorName: { fontSize: 18, fontWeight: "bold" },
    bookButton: { backgroundColor: "#64A8F1", padding: 10, marginTop: 10, borderRadius: 8, alignItems: "center" },
    bookButtonText: { color: "white", fontWeight: "bold" },
});
