import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Modal,
    Switch,
    ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { getDoctorAppointments, createAppointment } from "../../api/appointmentApi";
import axiosInstance from "../../api/axiosInstance";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AuthContext } from "../../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { updateDoctorOnlineStatus } from "../../api/doctorApi";

export default function DoctorHome() {
    const router = useRouter();
    const { logout } = useContext(AuthContext);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedHealthHistory, setSelectedHealthHistory] = useState(null);
    const [isOnline, setIsOnline] = useState(false);
    const [appointmentForm, setAppointmentForm] = useState({
        appointmentType: "scheduled",
        appointmentDate: new Date(),
        appointmentTime: new Date(),
    });

    const loadAppointments = async () => {
        setLoading(true);
        try {
            const data = await getDoctorAppointments();
            setAppointments(data);
        } catch (error) {
            handleAuthError(error);
        }
        setLoading(false);
    };

    const loadDoctorStatus = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/doctors/me');
            console.log("Doctor Profile Response:", JSON.stringify(response.data, null, 2));
            setIsOnline(response.data.isOnline || false);
        } catch (error) {
            console.error("Load Doctor Status Error:", error.response?.data || error.message);
            handleAuthError(error);
        }
        setLoading(false);
    };

    const handleAuthError = (error) => {
        if (error.response?.status === 401) {
            Alert.alert("Session Expired", "Please log in again.");
            logout();
            router.replace("/auth/DoctorLogin");
        } else {
            Alert.alert("Error", "Failed to load data.");
        }
    };

    const handleCreateAppointment = async () => {
        setLoading(true);
        try {
            const formattedData = {
                appointmentType: appointmentForm.appointmentType,
                appointmentDate: appointmentForm.appointmentDate.toISOString().split("T")[0],
                appointmentTime: appointmentForm.appointmentTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };
            const response = await createAppointment(formattedData);
            Alert.alert("Success", "Appointment created successfully");
            setAppointmentForm({
                appointmentType: "scheduled",
                appointmentDate: new Date(),
                appointmentTime: new Date(),
            });
            loadAppointments();
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Failed to create appointment";
            Alert.alert("Error", message);
            if (error.response?.status === 401) {
                logout();
                router.replace("/auth/DoctorLogin");
            }
        }
        setLoading(false);
    };

    const handleCancelAppointment = async (appointmentId) => {
        setLoading(true);
        try {
            await axiosInstance.delete(`/appointments/cancel/${appointmentId}`);
            Alert.alert("Success", "Appointment cancelled successfully");
            loadAppointments();
        } catch (error) {
            handleAuthError(error);
        }
        setLoading(false);
    };

    const handleViewHealthHistory = (motherId) => {
        if (motherId) {
            axiosInstance.get(`/users/profile/${motherId}`)
                .then(response => {
                    setSelectedHealthHistory(response.data.healthHistory || "No health history available");
                })
                .catch(error => {
                    Alert.alert("Error", "Failed to load health history");
                });
        }
    };

    const handleToggleOnlineStatus = async () => {
        console.log("Toggle Online Status Triggered, Current Status:", isOnline);
        setLoading(true);
        try {
            const newStatus = !isOnline;
            const response = await updateDoctorOnlineStatus(newStatus);
            console.log("Update Online Status Response:", JSON.stringify(response, null, 2));
            setIsOnline(newStatus);
            Alert.alert("Success", `Online status updated to ${newStatus ? "Online" : "Offline"}`);
            await loadDoctorStatus();
        } catch (error) {
            console.error("Toggle Online Status Error:", error.response?.data || error.message);
            Alert.alert("Error", `Failed to update online status: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAppointments();
        loadDoctorStatus();
    }, []);

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || appointmentForm.appointmentDate;
        setShowDatePicker(false);
        setAppointmentForm({ ...appointmentForm, appointmentDate: currentDate });
    };

    const onTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || appointmentForm.appointmentTime;
        setShowTimePicker(false);
        setAppointmentForm({ ...appointmentForm, appointmentTime: currentTime });
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Doctor Dashboard</Text>

                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>Online Status: {isOnline ? "Online" : "Offline"}</Text>
                    <Switch
                        value={isOnline}
                        onValueChange={handleToggleOnlineStatus}
                        disabled={loading}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isOnline ? "#007AFF" : "#f4f3f4"}
                    />
                </View>

                <LinearGradient colors={["#A2C9F3", "#FFFFFF"]} style={styles.createSection}>
                    <Text style={styles.sectionTitle}>Create New Appointment</Text>
                    <View style={styles.pickerContainer}>
                        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
                            <Ionicons name="calendar" size={24} color="#007AFF" />
                            <Text style={styles.dateText}>
                                {appointmentForm.appointmentDate.toLocaleDateString()}
                            </Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={appointmentForm.appointmentDate}
                                mode="date"
                                display="default"
                                onChange={onDateChange}
                                minimumDate={new Date()}
                            />
                        )}
                    </View>
                    <View style={styles.pickerContainer}>
                        <TouchableOpacity style={styles.dateButton} onPress={() => setShowTimePicker(true)}>
                            <Ionicons name="time" size={24} color="#007AFF" />
                            <Text style={styles.dateText}>
                                {appointmentForm.appointmentTime.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </Text>
                        </TouchableOpacity>
                        {showTimePicker && (
                            <DateTimePicker
                                value={appointmentForm.appointmentTime}
                                mode="time"
                                display="default"
                                onChange={onTimeChange}
                            />
                        )}
                    </View>
                    <TouchableOpacity
                        style={[styles.createButton, loading && styles.disabledButton]}
                        onPress={handleCreateAppointment}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Create Appointment</Text>
                        )}
                    </TouchableOpacity>
                </LinearGradient>

                <View style={styles.appointmentsSection}>
                    <Text style={styles.sectionTitle}>My Appointments</Text>
                    {loading ? (
                        <ActivityIndicator size="large" color="#007AFF" />
                    ) : (
                        <FlatList
                            data={appointments}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <View style={[
                                    styles.appointmentCard,
                                    item.motherId ? styles.bookedCard : styles.availableCard
                                ]}>
                                    <View style={styles.appointmentInfo}>
                                        <Text style={styles.appointmentTime}>
                                            {new Date(item.appointmentDate).toLocaleDateString()} at {item.appointmentTime}
                                        </Text>
                                        {item.motherId ? (
                                            <View style={styles.bookedContainer}>
                                                <TouchableOpacity onPress={() => handleViewHealthHistory(item.motherId)}>
                                                    <Text style={styles.bookedText}>
                                                        Booked by: {item.motherId.fullName}
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.callButton}
                                                    onPress={() => router.push(`/video-call?appointmentId=${item._id}`)}
                                                >
                                                    <Text style={styles.callText}>Call Mother</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ) : (
                                            <Text style={styles.availableText}>Available</Text>
                                        )}
                                    </View>
                                    <TouchableOpacity
                                        style={styles.cancelIconButton}
                                        onPress={() => handleCancelAppointment(item._id)}
                                    >
                                        <Ionicons name="trash-outline" size={24} color="#FF4444" />
                                    </TouchableOpacity>
                                </View>
                            )}
                            ListEmptyComponent={<Text style={styles.emptyText}>No appointments scheduled</Text>}
                            scrollEnabled={false}
                        />
                    )}
                </View>

                <Modal
                    visible={!!selectedHealthHistory}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setSelectedHealthHistory(null)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Health History</Text>
                            <Text style={styles.modalText}>{selectedHealthHistory}</Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setSelectedHealthHistory(null)}
                            >
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    bookedContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 5,
    },
    callButton: {
        backgroundColor: "#007AFF",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    callText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 30, // Extra padding at the bottom for scroll
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#333",
    },
    statusContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        elevation: 3,
    },
    statusText: {
        fontSize: 16,
        color: "#333",
    },
    createSection: {
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#333",
    },
    pickerContainer: {
        marginBottom: 15,
    },
    dateButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 10,
        elevation: 2,
    },
    dateText: {
        marginLeft: 10,
        fontSize: 16,
        color: "#333",
    },
    createButton: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    disabledButton: {
        opacity: 0.6,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    appointmentsSection: {
        flex: 1,
    },
    appointmentCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3,
    },
    bookedCard: {
        backgroundColor: "#FFE5E5",
    },
    availableCard: {
        backgroundColor: "#E5FFE5",
    },
    appointmentInfo: {
        flex: 1,
    },
    appointmentTime: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    bookedText: {
        color: "#FF4444",
        fontSize: 14,
        marginTop: 5,
        fontWeight: "bold",
    },
    availableText: {
        color: "#44AA44",
        fontSize: 14,
        marginTop: 5,
        fontWeight: "bold",
    },
    cancelIconButton: {
        padding: 5,
    },
    emptyText: {
        textAlign: "center",
        color: "#666",
        fontSize: 16,
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        maxHeight: "50%",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    modalText: {
        fontSize: 16,
        color: "#333",
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    closeButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});