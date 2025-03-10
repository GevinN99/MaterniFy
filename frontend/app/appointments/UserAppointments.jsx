import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Alert,
} from "react-native";
import { getAvailableAppointments, bookAppointment, getUserBookedAppointments } from "../../api/appointmentApi";

export default function UserAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("available");

    // Fetch Available Appointments
    const loadAvailableAppointments = async () => {
        setLoading(true);
        try {
            const data = await getAvailableAppointments();
            setAppointments(data);
        } catch (error) {
            Alert.alert("Error", "Failed to load appointments.");
        }
        setLoading(false);
    };

    // Fetch User Booked Appointments
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

    useEffect(() => {
        loadAvailableAppointments();
        loadBookedAppointments();
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
                            <Text>Doctor: {item.doctorId.fullName} ({item.doctorId.specialization})</Text>

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
});
