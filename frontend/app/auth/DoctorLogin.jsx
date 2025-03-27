import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { loginDoctor } from "../../api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function DoctorLogin() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const [generalError, setGeneralError] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Validate form fields
    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            email: "",
            password: "",
        };

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
            isValid = false;
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Handle Doctor Login
    const handleDoctorLogin = async () => {
        setGeneralError("");
        if (!validateForm()) {
            setGeneralError("Please fix the errors above");
            return;
        }

        setLoading(true);
        try {
            const response = await loginDoctor(formData);

            if (response.error) {
                // Handle API-level errors
                if (response.error.includes("not found")) {
                    setErrors({
                        ...errors,
                        email: "Doctor account not found",
                    });
                } else if (response.error.includes("credentials")) {
                    setErrors({
                        ...errors,
                        password: "Invalid password",
                    });
                } else {
                    setGeneralError(response.error);
                }
                return;
            }

            if (response.token && response.userId) {
                await AsyncStorage.setItem("token", response.token);
                await AsyncStorage.setItem("userId", response.userId);
                await AsyncStorage.setItem("role", "doctor");
                router.replace("/(tabs)/doctor-home");
            } else {
                setGeneralError("Invalid response from server. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);

            // Handle network errors
            if (error.message.includes("Network Error")) {
                Alert.alert(
                    "Network Error",
                    "Unable to connect to the server. Please check your internet connection.",
                    [{ text: "OK" }]
                );
            } else {
                setGeneralError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Clear error when user starts typing
    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field] || generalError) {
            setErrors({ ...errors, [field]: "" });
            setGeneralError("");
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <LinearGradient
                    colors={["#A2C9F3", "#FFFFFF"]}
                    style={styles.gradientBackground}
                >
                    <View style={styles.container}>
                        <Text style={styles.title}>Doctor Login</Text>
                        <Text style={styles.subtitle}>Access Your Dashboard</Text>

                        {/* Email Input */}
                        <View style={[
                            styles.inputContainer,
                            errors.email && styles.errorInputContainer
                        ]}>
                            <TextInput
                                style={styles.input}
                                placeholder="Doctor Email"
                                placeholderTextColor="#A0B1C8"
                                value={formData.email}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(text) => handleInputChange("email", text)}
                                onBlur={() => validateForm()}
                            />
                        </View>
                        {errors.email ? (
                            <Text style={styles.errorText}>{errors.email}</Text>
                        ) : (
                            <View style={styles.errorPlaceholder} />
                        )}

                        {/* Password Input */}
                        <View style={[
                            styles.inputContainer,
                            errors.password && styles.errorInputContainer
                        ]}>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#A0B1C8"
                                value={formData.password}
                                secureTextEntry={!passwordVisible}
                                onChangeText={(text) => handleInputChange("password", text)}
                                onBlur={() => validateForm()}
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
                        {errors.password ? (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        ) : (
                            <View style={styles.errorPlaceholder} />
                        )}

                        {/* Doctor Login Button */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleDoctorLogin}
                            disabled={loading}
                            activeOpacity={0.7}
                        >
                            <LinearGradient
                                colors={["#bbdbff", "#74a8ff"]}
                                style={styles.buttonGradient}
                            >
                                {loading ? (
                                    <LoadingSpinner />
                                ) : (
                                    <Text style={styles.buttonText}>Doctor Login</Text>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Back to General Login */}
                        <TouchableOpacity
                            onPress={() => router.push("/auth/Login")}
                            style={styles.linkContainer}
                        >
                            <Text style={styles.link}>Back to User Login</Text>
                        </TouchableOpacity>

                        {/* General Error Message */}
                        {generalError && (
                            <View style={styles.generalErrorContainer}>
                                <Ionicons
                                    name="warning-outline"
                                    size={20}
                                    color="#EF4444"
                                    style={styles.errorIcon}
                                />
                                <Text style={styles.errorMessage}>{generalError}</Text>
                            </View>
                        )}
                    </View>
                </LinearGradient>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    scrollContainer: {
        flexGrow: 1,
    },
    gradientBackground: {
        flex: 1,
        justifyContent: "center",
    },
    container: {
        alignItems: "center",
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: "700",
        color: "#000000",
        textAlign: "center",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: "#4B5563",
        marginBottom: 40,
    },
    inputContainer: {
        width: "90%",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 12,
        marginBottom: 5,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        flexDirection: "row",
        alignItems: "center",
    },
    errorInputContainer: {
        borderColor: "#EF4444",
        backgroundColor: "rgba(239, 68, 68, 0.05)",
    },
    input: {
        flex: 1,
        padding: 12,
        fontSize: 16,
        color: "#1F2937",
    },
    eyeButton: {
        padding: 10,
    },
    button: {
        width: "90%",
        borderRadius: 12,
        overflow: "hidden",
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    buttonGradient: {
        paddingVertical: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "600",
    },
    linkContainer: {
        marginTop: 20,
    },
    link: {
        color: "#6B7280",
        fontSize: 16,
        fontWeight: "500",
    },
    errorText: {
        width: "90%",
        color: "#EF4444",
        fontSize: 14,
        marginTop: -5,
        marginBottom: 10,
        paddingHorizontal: 5,
    },
    errorPlaceholder: {
        height: 20,
        width: "90%",
        marginBottom: 5,
    },
    generalErrorContainer: {
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        padding: 12,
        borderRadius: 8,
        marginTop: 20,
    },
    errorMessage: {
        color: "#EF4444",
        fontSize: 16,
        marginLeft: 8,
        flexShrink: 1,
    },
    errorIcon: {
        marginRight: 5,
    },
});