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
    const [error, setError] = useState(null);

    const loadAppointments = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getDoctorAppointments();
            const today = new Date();
            const todayString = today.toISOString().split("T")[0];
            const todayAppointments = data.filter((appointment) => {
                const appointmentDate = new Date(appointment.appointmentDate).toISOString().split("T")[0];
                return appointmentDate === todayString;
            });
            setAppointments(todayAppointments);
        } catch (error) {
            console.error("Load Appointments Error:", error);
            setError("Failed to load appointments. Please try again.");
            Alert.alert("Error", "Failed to load appointments.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getDoctorAppointments();
                const today = new Date();
                const todayString = today.toISOString().split("T")[0];
                const todayAppointments = data.filter((appointment) => {
                    const appointmentDate = new Date(appointment.appointmentDate).toISOString().split("T")[0];
                    return appointmentDate === todayString;
                });
                if (mounted) {
                    setAppointments(todayAppointments);
                    setError(null);
                }
            } catch (error) {
                if (mounted) {
                    console.error("Load Appointments Error:", error);
                    setError("Failed to load appointments. Please try again.");
                    Alert.alert("Error", "Failed to load appointments.");
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            mounted = false;
        };
    }, []);

    const handleCancelAppointment = async (appointmentId) => {
        try {
            setLoading(true);
            await cancelAppointment(appointmentId);
            Alert.alert("Success", "Appointment canceled.");
            await loadAppointments();
        } catch (error) {
            console.error("Cancel Appointment Error:", error);
            Alert.alert("Error", "Failed to cancel appointment.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity
                    style={styles.retryButton}
                    onPress={loadAppointments}
                >
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Appointments (Today)</Text>
            {appointments.length > 0 ? (
                <FlatList
                    data={appointments}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.appointmentCard}>
                            <Text>
                                {new Date(item.appointmentDate).toLocaleDateString()} at {item.appointmentTime}
                            </Text>
                            <Text>Patient: {item.motherId?.fullName || "Not Assigned"}</Text>
                            <Text>Status: {item.status}</Text>
                            <View style={styles.buttonContainer}>
                                {item.status !== "cancelled" && item.status !== "completed" && (
                                    <TouchableOpacity
                                        style={styles.cancelButton}
                                        onPress={() => handleCancelAppointment(item._id)}
                                        disabled={loading}
                                    >
                                        <Text style={styles.cancelText}>Cancel</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
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
    buttonContainer: {
        flexDirection: "row",
        marginTop: 5,
        gap: 10,
    },
    cancelButton: {
        backgroundColor: "red",
        padding: 5,
        borderRadius: 5,
    },
    cancelText: {
        color: "white",
        textAlign: "center",
    },
    noAppointmentsText: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginTop: 20,
    },
    errorText: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
        marginTop: 20,
    },
    retryButton: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignItems: "center",
    },
    retryButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});