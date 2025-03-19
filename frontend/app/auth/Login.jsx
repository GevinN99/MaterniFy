import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { loginUser } from "../../api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingSpinner from "../../components/LoadingSpinner";
import Feather from "@expo/vector-icons/Feather"; // For the doctor icon

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleLogin = async () => {
        if (!formData.email || !formData.password) {
            Alert.alert("Error", "Please fill in all fields!");
            return;
        }

        setLoading(true);

        try {
            const response = await loginUser(formData);
            if (response.token && response.userId) {
                await AsyncStorage.setItem("token", response.token);
                await AsyncStorage.setItem("userId", response.userId);
                await AsyncStorage.setItem("role", response.role);
                router.replace("/"); // Redirect to Home Page after successful login
            } else {
                Alert.alert("Login Failed", response.message || "Invalid Credentials");
            }
        } catch (error) {
            console.error("Login Error:", error);
            Alert.alert("Login Error", error.message || "Please try again!");
        }

        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login to Your Account</Text>

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

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                {loading ? <LoadingSpinner /> : <Text style={styles.buttonText}>Login</Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/auth/Signup")}>
                <Text style={styles.link}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>

            {/* Doctor Icon and Text at Bottom-Right */}
            <TouchableOpacity
                style={styles.doctorIcon}
                onPress={() => router.push("/auth/DoctorLogin")}
            >
                <Feather name="user" size={30} color="#007AFF" />
                <Text style={styles.doctorText}>Doctor Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 30,
        backgroundColor: "#F5F5F5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "90%",
        padding: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: 10,
        borderRadius: 8,
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 10,
        width: "90%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    link: {
        marginTop: 10,
        color: "#007AFF",
    },
    doctorIcon: {
        position: "absolute", // Use absolute positioning
        bottom: 20,          // Distance from bottom
        right: 20,           // Distance from right
        alignItems: "center",
    },
    doctorText: {
        color: "#007AFF",
        fontSize: 16,
        marginTop: 5,
    },
});