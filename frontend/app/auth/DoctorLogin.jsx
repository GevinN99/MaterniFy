import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingSpinner from "../../components/LoadingSpinner";
import axiosInstance from "../../api/axiosInstance";

export default function DoctorLogin() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleDoctorLogin = async () => {
        if (!formData.email || !formData.password) {
            Alert.alert("Error", "Please fill in all fields!");
            return;
        }

        setLoading(true);

        try {
            const response = await axiosInstance.post("/doctors/login", formData);
            console.log("Doctor Login Response:", response.data);

            if (response.data.token && response.data.doctorId) {
                await AsyncStorage.setItem("token", response.data.token);
                await AsyncStorage.setItem("userId", response.data.doctorId);
                await AsyncStorage.setItem("role", response.data.role);

                // Verify storage immediately after saving
                const token = await AsyncStorage.getItem("token");
                const role = await AsyncStorage.getItem("role");
                console.log("Immediately After Login - Token:", token);
                console.log("Immediately After Login - Role:", role);

                router.replace("/(tabs)/doctor-home");
            } else {
                Alert.alert("Login Failed", response.data.message || "Invalid Credentials");
            }
        } catch (error) {
            console.error("Doctor Login Error:", error.response?.data || error.message);
            Alert.alert("Login Error", error.response?.data?.message || "Please try again!");
        }

        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Doctor Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={formData.email}
                keyboardType="email-address"
                onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={formData.password}
                secureTextEntry
                onChangeText={(text) => setFormData({ ...formData, password: text })}
            />
            <TouchableOpacity style={styles.button} onPress={handleDoctorLogin} disabled={loading}>
                {loading ? <LoadingSpinner /> : <Text style={styles.buttonText}>Login</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/auth/Login")}>
                <Text style={styles.link}>Back to User Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", paddingVertical: 30, backgroundColor: "#F5F5F5" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    input: { width: "90%", padding: 12, borderWidth: 1, borderColor: "#ccc", marginBottom: 10, borderRadius: 8 },
    button: { backgroundColor: "#007AFF", padding: 15, borderRadius: 10, width: "90%", alignItems: "center" },
    buttonText: { color: "#fff", fontWeight: "bold" },
    link: { marginTop: 10, color: "#007AFF" },
});