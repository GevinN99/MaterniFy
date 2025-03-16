import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { getAvailableAppointments, bookAppointment, getUserBookedAppointments } from "../../api/appointmentApi";
import { getAvailableDoctors } from "../../api/doctorApi"; // Import the function to fetch doctors

export default function UserAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]); // State to store available doctors
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("available");

    // Fetch Available Appointments
    const loadAvailableAppointments = async () => {
        setLoading(true);
        try {
            const data = await getAvailableAppointments();
            setAppointments(data);
        } catch (error) {
            Alert.alert("Error", "Failed to load available appointments.");
        }
        setLoading(false);
    };

    // Fetch User's Booked Appointments
    const loadBookedAppointments = async () => {
        setLoading(true);
        try {
            const data = await getUserBookedAppointments();
            setBookedAppointments(data);
        } catch (error) {
            Alert.alert("Error", "Failed to load booked appointments.");
        }
        setLoading(false);
    };

    // Fetch Available Doctors
    const loadDoctors = async () => {
        setLoading(true);
        try {
            const data = await getAvailableDoctors(); // Fetch available doctors
            setDoctors(data);
        } catch (error) {
            Alert.alert("Error", "Failed to load doctors.");
        }
        setLoading(false);
    };

    useEffect(() => {
        loadAvailableAppointments();
        loadBookedAppointments();
        loadDoctors(); // Load doctors on component mount
    }, []);

    // Handle Appointment Booking
    const handleBookAppointment = async (appointmentId) => {
        const response = await bookAppointment(appointmentId);
        if (response.error) {
            Alert.alert("Error", response.error);
        } else {
            Alert.alert("Success", "Appointment booked!");
            loadAvailableAppointments();
            loadBookedAppointments();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Appointments</Text>

            {/* Tab Navigation */}
            <View style={styles.tabContainer}>
                <TouchableOpacity onPress={() => setActiveTab("available")} style={[styles.tab, activeTab === "available" && styles.activeTab]}>
                    <Text style={styles.tabText}>Available</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab("booked")} style={[styles.tab, activeTab === "booked" && styles.activeTab]}>
                    <Text style={styles.tabText}>My Booked</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#007AFF" />
            ) : (
                <FlatList
                    data={activeTab === "available" ? appointments : bookedAppointments}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.appointmentCard}>
                            <Text>{item.appointmentDate} at {item.appointmentTime}</Text>
                            <Text>Doctor: {item.doctorId?.fullName} ({item.doctorId?.specialization})</Text>

                            {activeTab === "available" ? (
                                <TouchableOpacity style={styles.bookButton} onPress={() => handleBookAppointment(item._id)}>
                                    <Text style={styles.bookText}>Book</Text>
                                </TouchableOpacity>
                            ) : (
                                <Text style={styles.statusText}>Status: {item.status}</Text>
                            )}
                        </View>
                    )}
                />
            )}

            {/* Display Available Doctors */}
            <View style={styles.doctorsContainer}>
                <Text style={styles.title}>Available Doctors</Text>
                {doctors.length === 0 ? (
                    <Text>No available doctors at the moment.</Text>
                ) : (
                    <FlatList
                        data={doctors}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <View style={styles.doctorCard}>
                                <Text style={styles.doctorName}>{item.fullName}</Text>
                                <Text>{item.specialization}</Text>
                            </View>
                        )}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    tabContainer: { flexDirection: "row", marginBottom: 10, borderBottomWidth: 1, borderColor: "#ccc" },
    tab: { flex: 1, padding: 10, alignItems: "center" },
    activeTab: { borderBottomWidth: 2, borderColor: "#007AFF" },
    tabText: { fontSize: 16, fontWeight: "bold", color: "#007AFF" },
    appointmentCard: { padding: 10, borderBottomWidth: 1, borderColor: "#ccc", marginTop: 10 },
    bookButton: { marginTop: 5, backgroundColor: "#007AFF", padding: 5, borderRadius: 5 },
    bookText: { color: "white", textAlign: "center" },
    statusText: { fontWeight: "bold", color: "green", marginTop: 5 },
    doctorsContainer: { marginTop: 20 },
    doctorCard: { padding: 10, backgroundColor: "#f9f9f9", marginBottom: 10, borderRadius: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
    doctorName: { fontSize: 18, fontWeight: "bold" },
});
