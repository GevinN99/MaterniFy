import React, { useState, useContext } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { loginUser } from "../../api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import LoadingSpinner from "../../components/LoadingSpinner";
import { AuthContext } from "../../context/AuthContext"

export default function Login() {
     const { setUserId } = useContext(AuthContext)
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Validate form fields
    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle Login (for general users)
    const handleLogin = async () => {
        setGeneralError("");
        if (!validateForm()) {
            setGeneralError("Please fix the errors above.");
            return;
        }
        setLoading(true);
        try {
            const response = await loginUser(formData);
            if (response.token && response.userId) {
                await AsyncStorage.setItem("token", response.token);
                await AsyncStorage.setItem("userId", response.userId);
                await AsyncStorage.setItem("role", response.role || "mother");
                setUserId(response.userId)
                router.replace("/");
            } else {
                const errorMessage = response?.message || "Invalid credentials. Please try again.";
                setGeneralError(errorMessage);
            }
        } catch (error) {
            setGeneralError(error.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Handle Doctor Login Redirect
    const handleDoctorLoginRedirect = () => {
        router.push("/auth/DoctorLogin");
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "android" ? -100 : 0}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <LinearGradient colors={["#A2C9F3", "#FFFFFF"]} style={styles.gradientBackground}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Welcome Back</Text>
                        <Text style={styles.subtitle}>Your Health, Your Journey</Text>

                        {/* Email Input */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#A0B1C8"
                                value={formData.email}
                                keyboardType="email-address"
                                onChangeText={(text) => setFormData({ ...formData, email: text })}
                            />
                        </View>
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                        {/* Password Input */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#A0B1C8"
                                value={formData.password}
                                secureTextEntry={!passwordVisible}
                                onChangeText={(text) => setFormData({ ...formData, password: text })}
                            />
                            <TouchableOpacity
                                style={styles.eyeButton}
                                onPress={() => setPasswordVisible(!passwordVisible)}
                            >
                                <Ionicons
                                    name={passwordVisible ? "eye" : "eye-off"}
                                    size={24}
                                    color="#A0B1C8"
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                        {/* Login Button */}
                        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                            <LinearGradient colors={["#bbdbff", "#74a8ff"]} style={styles.buttonGradient}>
                                {loading ? <LoadingSpinner /> : <Text style={styles.buttonText}>Log In</Text>}
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Signup Link */}
                        <TouchableOpacity onPress={() => router.push("/auth/Signup")}>
                            <Text style={styles.link}>New here? Sign Up</Text>
                        </TouchableOpacity>

                        {/* General Error Message */}
                        {generalError && <Text style={styles.errorMessage}>{generalError}</Text>}

                        {/* Doctor Icon */}
                        <TouchableOpacity
                            style={styles.doctorIconContainer}
                            onPress={handleDoctorLoginRedirect}
                        >
                            <Ionicons name="medkit" size={40} color="#74a8ff" />
                            <Text style={styles.doctorIconText}>Doctor Login</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardContainer: { flex: 1 },
    scrollContainer: { flexGrow: 1 },
    gradientBackground: { flex: 1, justifyContent: "center" },
    container: { alignItems: "center", paddingVertical: 40, paddingHorizontal: 20 },
    title: {
        fontSize: 36,
        fontWeight: "700",
        color: "#000000",
        textAlign: "center",
        marginBottom: 10,
        textShadowColor: "rgba(0, 0, 0, 0.3)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 5,
    },
    subtitle: { fontSize: 18, color: "#000000", marginBottom: 40 },
    inputContainer: {
        width: "90%",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 12,
        marginBottom: 15,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        flexDirection: "row",
        alignItems: "center",
    },
    input: { flex: 1, padding: 12, fontSize: 16, color: "#3f3f3f", backgroundColor: "transparent" },
    eyeButton: { padding: 10 },
    button: {
        width: "90%",
        borderRadius: 12,
        overflow: "hidden",
        marginTop: 20,
    },
    buttonGradient: { paddingVertical: 15, alignItems: "center", justifyContent: "center" },
    buttonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "600", textTransform: "uppercase" },
    link: { marginTop: 20, color: "#ababab", fontSize: 16, fontWeight: "500", textDecorationLine: "underline" },
    errorMessage: {
        color: "#F87171",
        fontSize: 16,
        marginTop: 20,
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: 10,
        borderRadius: 8,
    },
    errorText: { color: "#F87171", fontSize: 14, marginTop: -10, marginBottom: 10, marginLeft: 15 },
    doctorIconContainer: {
        marginTop: 30,
        alignItems: "center",
    },
    doctorIconText: {
        color: "#74a8ff",
        fontSize: 16,
        fontWeight: "500",
        marginTop: 5,
    },
});