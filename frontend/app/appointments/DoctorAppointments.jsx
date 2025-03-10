import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert,
} from "react-native";
import { getDoctorAppointments, createAppointment, cancelAppointment } from "../../api/appointmentApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DoctorAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newAppointment, setNewAppointment] = useState({
        appointmentType: "scheduled",
        appointmentDate: "",
        appointmentTime: "",
    });

    // Fetch Doctor Appointments
    const loadAppointments = async () => {
        setLoading(true);
        const data = await getDoctorAppointments();
        setAppointments(data);
        setLoading(false);
    };

    useEffect(() => {
        loadAppointments();
    }, []);

    // Handle Appointment Creation
    const handleCreateAppointment = async () => {
        if (!newAppointment.appointmentDate || !newAppointment.appointmentTime) {
            Alert.alert("Error", "Please provide date and time.");
            return;
        }

        const response = await createAppointment(newAppointment);
        if (response.error) {
            Alert.alert("Error", response.error);
        } else {
            Alert.alert("Success", "Appointment created!");
            loadAppointments(); // Reload appointments
        }
    };

    // Handle Appointment Cancellation
    const handleCancelAppointment = async (appointmentId) => {
        await cancelAppointment(appointmentId);
        Alert.alert("Success", "Appointment canceled.");
        loadAppointments(); // Reload list
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Appointments</Text>

            <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                onChangeText={(text) => setNewAppointment({ ...newAppointment, appointmentDate: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="HH:MM AM/PM"
                onChangeText={(text) => setNewAppointment({ ...newAppointment, appointmentTime: text })}
            />

            <TouchableOpacity style={styles.button} onPress={handleCreateAppointment}>
                <Text style={styles.buttonText}>Create Appointment</Text>
            </TouchableOpacity>

            <FlatList
                data={appointments}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.appointmentCard}>
                        <Text>{item.appointmentDate} at {item.appointmentTime}</Text>
                        <Text>Type: {item.appointmentType}</Text>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => handleCancelAppointment(item._id)}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
    button: { backgroundColor: "#007AFF", padding: 10, borderRadius: 5 },
    buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
    appointmentCard: { padding: 10, borderBottomWidth: 1, borderColor: "#ccc", marginTop: 10 },
    cancelButton: { marginTop: 5, backgroundColor: "red", padding: 5, borderRadius: 5 },
    cancelText: { color: "white", textAlign: "center" },
});
