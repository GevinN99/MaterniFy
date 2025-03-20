import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { getDoctorAppointments, createAppointment } from "../../api/appointmentApi";
import axiosInstance from "../../api/axiosInstance";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AuthContext } from "../../context/AuthContext";

export default function DoctorHome() {
    const router = useRouter();
    const { logout } = useContext(AuthContext);
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
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
            if (error.response?.status === 401) {
                Alert.alert("Session Expired", "Please log in again.");
                logout();
                router.replace("/auth/DoctorLogin");
            } else {
                Alert.alert("Error", "Failed to load appointments.");
            }
        }
        setLoading(false);
    };

    const loadPatients = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/users/all-users");
            const mothers = response.data.filter((user) => user.role === "mother");
            setPatients(mothers);
        } catch (error) {
            if (error.response?.status === 401) {
                Alert.alert("Session Expired", "Please log in again.");
                logout();
                router.replace("/auth/DoctorLogin");
            } else {
                Alert.alert("Error", "Failed to load patients.");
            }
        }
        setLoading(false);
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
            Alert.alert("Success", response.message);
            setAppointmentForm({
                appointmentType: "scheduled",
                appointmentDate: new Date(),
                appointmentTime: new Date(),
            });
            loadAppointments();
        } catch (error) {
            if (error.response?.status === 401) {
                Alert.alert("Session Expired", "Please log in again.");
                logout();
                router.replace("/auth/DoctorLogin");
            } else {
                Alert.alert("Error", error.message || "Failed to create appointment");
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        loadAppointments();
        loadPatients();
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
            <Text style={styles.title}>Doctor Dashboard</Text>

            {/* Create Appointment Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Create Appointment</Text>

                {/* Date Picker */}
                <View style={styles.pickerContainer}>
                    <Text style={styles.label}>Date:</Text>
                    <Text style={styles.selectedValue}>
                        {appointmentForm.appointmentDate.toISOString().split("T")[0]}
                    </Text>
                    <TouchableOpacity
                        style={styles.pickerButton}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text style={styles.pickerButtonText}>Select Date</Text>
                    </TouchableOpacity>
                </View>
                {showDatePicker && (
                    <DateTimePicker
                        value={appointmentForm.appointmentDate}
                        mode="date"
                        display="default"
                        onChange={onDateChange}
                        minimumDate={new Date()}
                    />
                )}

                {/* Time Picker */}
                <View style={styles.pickerContainer}>
                    <Text style={styles.label}>Time:</Text>
                    <Text style={styles.selectedValue}>
                        {appointmentForm.appointmentTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </Text>
                    <TouchableOpacity
                        style={styles.pickerButton}
                        onPress={() => setShowTimePicker(true)}
                    >
                        <Text style={styles.pickerButtonText}>Select Time</Text>
                    </TouchableOpacity>
                </View>
                {showTimePicker && (
                    <DateTimePicker
                        value={appointmentForm.appointmentTime}
                        mode="time"
                        display="default"
                        onChange={onTimeChange}
                    />
                )}

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleCreateAppointment}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Create</Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* My Appointments Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>My Appointments</Text>
                {loading ? (
                    <ActivityIndicator size="large" color="#007AFF" />
                ) : (
                    <FlatList
                        data={appointments.slice(0, 5)}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Text>
                                    {new Date(item.appointmentDate).toLocaleDateString()} at{" "}
                                    {item.appointmentTime}
                                </Text>
                                <Text>Patient: {item.motherId?.fullName || "Not Booked"}</Text>
                            </View>
                        )}
                    />
                )}
                <TouchableOpacity onPress={() => router.push("/appointments/DoctorAppointments")}>
                    <Text style={styles.link}>View All Appointments</Text>
                </TouchableOpacity>
            </View>

            {/* Patients Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Patients</Text>
                {loading ? (
                    <ActivityIndicator size="large" color="#007AFF" />
                ) : (
                    <FlatList
                        data={patients.slice(0, 5)}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Text>{item.fullName}</Text>
                                <Text>Email: {item.email}</Text>
                            </View>
                        )}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    section: { marginBottom: 20 },
    sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    pickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 10,
        width: 50,
    },
    selectedValue: {
        fontSize: 16,
        color: "#333",
        flex: 1,
    },
    pickerButton: {
        backgroundColor: "#007AFF",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    pickerButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    card: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    link: {
        color: "#007AFF",
        textAlign: "center",
        marginTop: 10,
    },
});