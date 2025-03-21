import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    Alert,
    ScrollView,
} from "react-native";
import { getAvailableAppointments, bookAppointment, getUserBookedAppointments } from "../../api/appointmentApi";
import { getAvailableDoctors } from "../../api/doctorApi";

export default function UserAppointments() {
    const [pendingAppointments, setPendingAppointments] = useState([]);
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("booked");

    const loadPendingAppointments = async () => {
        setLoading(true);
        try {
            const data = await getAvailableAppointments();
            console.log("Pending Appointments Data:", data);
            setPendingAppointments(data);
        } catch (error) {
            console.error("Error loading pending appointments:", error.response?.data || error.message);
            Alert.alert("Error", "Failed to load pending appointments.");
        }
        setLoading(false);
    };

    const loadBookedAppointments = async () => {
        setLoading(true);
        try {
            const data = await getUserBookedAppointments();
            console.log("Booked Appointments Data:", data);
            setBookedAppointments(data);
        } catch (error) {
            Alert.alert("Error", "Failed to load booked appointments.");
        }
        setLoading(false);
    };

    const loadDoctors = async () => {
        setLoading(true);
        try {
            const data = await getAvailableDoctors(); // Assumes this returns only online doctors
            setDoctors(data);
        } catch (error) {
            Alert.alert("Error", "Failed to load doctors.");
        }
        setLoading(false);
    };

    const handleBookAppointment = async (appointmentId) => {
        setLoading(true);
        try {
            const response = await bookAppointment(appointmentId);
            if (response.error) {
                Alert.alert("Error", response.error);
            } else {
                Alert.alert("Success", "Appointment booked successfully!");
                loadPendingAppointments();
                loadBookedAppointments();
            }
        } catch (error) {
            Alert.alert("Error", "Failed to book appointment.");
        }
        setLoading(false);
    };

    useEffect(() => {
        loadPendingAppointments();
        loadBookedAppointments();
        loadDoctors();
    }, []);

    const renderPendingAppointmentItem = ({ item }) => (
        <View style={styles.appointmentCard}>
            <Text style={styles.appointmentText}>
                Date: {new Date(item.appointmentDate).toLocaleDateString()} at {item.appointmentTime}
            </Text>
            <Text style={styles.appointmentText}>Doctor: {item.doctorId?.fullName || "N/A"}</Text>
            <Text style={styles.appointmentText}>
                Specialization: {item.doctorId?.specialization || "N/A"}
            </Text>
            <Text style={styles.appointmentText}>
                Experience: {item.doctorId?.experienceYears || 0} years
            </Text>
            <TouchableOpacity
                style={styles.bookButton}
                onPress={() => handleBookAppointment(item._id)}
                disabled={loading}
            >
                <Text style={styles.bookText}>Book</Text>
            </TouchableOpacity>
        </View>
    );

    const renderBookedAppointmentItem = ({ item }) => (
        <View style={styles.bookedCard}>
            <Text style={styles.appointmentText}>
                Date: {new Date(item.appointmentDate).toLocaleDateString()} at {item.appointmentTime}
            </Text>
            <Text style={styles.appointmentText}>Doctor: {item.doctorId?.fullName || "N/A"}</Text>
            <Text style={styles.appointmentText}>
                Specialization: {item.doctorId?.specialization || "N/A"}
            </Text>
            <Text style={styles.appointmentText}>
                Experience: {item.doctorId?.experienceYears || 0} years
            </Text>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>My Appointments</Text>

                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === "booked" && styles.activeTab]}
                        onPress={() => setActiveTab("booked")}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === "booked" && styles.activeTabText,
                            ]}
                        >
                            Booked Appointments
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === "pending" && styles.activeTab]}
                        onPress={() => setActiveTab("pending")}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === "pending" && styles.activeTabText,
                            ]}
                        >
                            Pending Appointments
                        </Text>
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#007AFF" style={styles.loading} />
                ) : (
                    <View style={styles.contentContainer}>
                        {activeTab === "booked" ? (
                            <FlatList
                                data={bookedAppointments}
                                keyExtractor={(item) => item._id}
                                renderItem={renderBookedAppointmentItem}
                                ListEmptyComponent={
                                    <Text style={styles.emptyText}>No booked appointments.</Text>
                                }
                                scrollEnabled={false}
                            />
                        ) : (
                            <FlatList
                                data={pendingAppointments}
                                keyExtractor={(item) => item._id}
                                renderItem={renderPendingAppointmentItem}
                                ListEmptyComponent={
                                    <Text style={styles.emptyText}>
                                        No pending appointments available.
                                    </Text>
                                }
                                scrollEnabled={false}
                            />
                        )}
                    </View>
                )}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Online Doctors</Text>
                    <FlatList
                        data={doctors}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <View style={styles.doctorCard}>
                                <Text style={styles.doctorName}>{item.fullName}</Text>
                                <Text style={styles.doctorText}>
                                    Specialization: {item.specialization}
                                </Text>
                                <Text style={styles.doctorText}>
                                    Experience: {item.experienceYears} years
                                </Text>
                                <Text style={styles.doctorText}>Status: Online</Text>
                            </View>
                        )}
                        ListEmptyComponent={
                            <Text style={styles.emptyText}>No online doctors available.</Text>
                        }
                        scrollEnabled={false}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F5F5F5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#333",
    },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
        backgroundColor: "#E0E0E0",
        borderRadius: 10,
        marginHorizontal: 5,
    },
    activeTab: {
        backgroundColor: "#007AFF",
    },
    tabText: {
        fontSize: 16,
        color: "#333",
        fontWeight: "bold",
    },
    activeTabText: {
        color: "#FFF",
    },
    contentContainer: {
        flex: 1,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#007AFF",
    },
    appointmentCard: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3,
        backgroundColor: "#E5FFE5",
    },
    bookedCard: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3,
        backgroundColor: "#FFE5E5",
    },
    appointmentText: {
        fontSize: 16,
        color: "#333",
        marginBottom: 5,
    },
    bookButton: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 5,
    },
    bookText: {
        color: "white",
        fontWeight: "bold",
    },
    doctorCard: {
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3,
    },
    doctorName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    doctorText: {
        fontSize: 14,
        color: "#666",
        marginBottom: 3,
    },
    emptyText: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
    },
    loading: {
        marginVertical: 20,
    },
});