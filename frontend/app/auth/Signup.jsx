import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,    
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker"
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { registerUser } from "../../api/authApi";
import { uploadImageToFirebase } from "../../utils/firebaseImage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import LoadingSpinner from "../../components/LoadingSpinner";



export default function Signup() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        languagePreference: "English",
        profileImage: "",
        homeLocation: { latitude: null, longitude: null, address: "" },
        pregnancyDate: "",
        partnerDetails: { husbandName: "", email: "", phoneNumber: "" },
        age: "",
        parentingDay: "",
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [generalError, setGeneralError] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    // Fetch current location
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setGeneralError("Location permission denied. Please enable it in settings.");
                return;
            }

            try {
                let location = await Location.getCurrentPositionAsync({});
                let geocode = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });

                setFormData((prev) => ({
                    ...prev,
                    homeLocation: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        address: geocode[0] ? `${geocode[0].city}, ${geocode[0].country}` : "",
                    },
                }));
            } catch (error) {
                setGeneralError("Failed to fetch location. Please try again.");
            }
        })();
    }, []);

    // Pick an Image
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    // Validate form fields
    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
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
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Confirm password is required";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        if (formData.age && (isNaN(formData.age) || formData.age < 1 || formData.age > 120)) {
            newErrors.age = "Age must be a number between 1 and 120";
        }
        if (formData.pregnancyDate && !/^\d{4}-\d{2}-\d{2}$/.test(formData.pregnancyDate)) {
            newErrors.pregnancyDate = "Use YYYY-MM-DD format";
        }
        if (formData.parentingDay && !/^\d{4}-\d{2}-\d{2}$/.test(formData.parentingDay)) {
            newErrors.parentingDay = "Use YYYY-MM-DD format";
        }
        if (formData.partnerDetails.phoneNumber && !/^\d{10}$/.test(formData.partnerDetails.phoneNumber)) {
            newErrors.partnerPhoneNumber = "Phone number must be 10 digits";
        }
        if (formData.partnerDetails.email && !/\S+@\S+\.\S+/.test(formData.partnerDetails.email)) {
            newErrors.partnerEmail = "Invalid email format";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle Signup
    const handleSignup = async () => {
        setGeneralError("");
        setSuccessMessage("");

        if (!validateForm()) {
            setGeneralError("Please fix the errors above.");
            return;
        }

        setLoading(true);

        try {
            let imageUrl = formData.profileImage;
            if (image) {
                imageUrl = await uploadImage(image, "profile_pics");
            } else {
                imageUrl = "https://www.w3schools.com/w3images/avatar2.png";
            }

            const signupData = {
                ...formData,
                profileImage: imageUrl,
                role: "mother",
                homeLocation: {
                    latitude: formData.homeLocation.latitude,
                    longitude: formData.homeLocation.longitude,
                    address: formData.homeLocation.address || "",
                },
                pregnancyDate: formData.pregnancyDate ? new Date(formData.pregnancyDate) : null,
                partnerDetails: {
                    husbandName: formData.partnerDetails.husbandName || "",
                    email: formData.partnerDetails.email || "",
                    phoneNumber: formData.partnerDetails.phoneNumber || "",
                },
                age: formData.age ? parseInt(formData.age, 10) : null,
                parentingDay: formData.parentingDay ? new Date(formData.parentingDay) : null,
            };

            const response = await registerUser(signupData);

            if (response.token) {
                await AsyncStorage.setItem("token", response.token);
                setSuccessMessage("Account created successfully!");
                setTimeout(() => router.replace("/auth/Login"), 1000); // Slight delay for user to see success
            } else {
                setGeneralError(response.message || "Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            setGeneralError(error.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "android" ? -100 : 0}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <LinearGradient colors={["#A2C9F3", "#e6f3ff"]} style={styles.gradientBackground}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Get Started!</Text>
                        <Text style={styles.subtitle}>Your Health, Your Journey</Text>

                        {/* Profile Image */}
                        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
                            <Image
                                source={{ uri: image || "https://www.w3schools.com/w3images/avatar2.png" }}
                                style={styles.profileImage}
                            />
                            <Text style={styles.imageText}>Add Profile Picture</Text>
                        </TouchableOpacity>

                        {/* Mother's Basic Details */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Mother's Basic Details</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Full Name *"
                                    placeholderTextColor="#A0B1C8"
                                    value={formData.fullName}
                                    onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                                />
                            </View>
                            {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email *"
                                    placeholderTextColor="#A0B1C8"
                                    value={formData.email}
                                    keyboardType="email-address"
                                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                                />
                            </View>
                            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password *"
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
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirm Password *"
                                    placeholderTextColor="#A0B1C8"
                                    value={formData.confirmPassword}
                                    secureTextEntry={!confirmPasswordVisible}
                                    onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                                />
                                <TouchableOpacity
                                    style={styles.eyeButton}
                                    onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                >
                                    <Ionicons
                                        name={confirmPasswordVisible ? "eye" : "eye-off"}
                                        size={24}
                                        color="#A0B1C8"
                                    />
                                </TouchableOpacity>
                            </View>
                            {errors.confirmPassword && (
                                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                            )}
                            <Picker
                                selectedValue={formData.languagePreference}
                                style={styles.picker}
                                onValueChange={(value) => setFormData({ ...formData, languagePreference: value })}
                            >
                                <Picker.Item label="English" value="English" />
                                <Picker.Item label="Sinhala" value="Sinhala" />
                                <Picker.Item label="Tamil" value="Tamil" />
                            </Picker>
                        </View>

                        {/* Mother's Other Details */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Mother's Other Details</Text>
                            <Text style={styles.label}>Home Location (Current)</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Latitude"
                                    placeholderTextColor="#A0B1C8"
                                    value={formData.homeLocation.latitude?.toString() || ""}
                                    editable={false}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Longitude"
                                    placeholderTextColor="#A0B1C8"
                                    value={formData.homeLocation.longitude?.toString() || ""}
                                    editable={false}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Address (Optional)"
                                    placeholderTextColor="#A0B1C8"
                                    value={formData.homeLocation.address}
                                    onChangeText={(text) =>
                                        setFormData({
                                            ...formData,
                                            homeLocation: { ...formData.homeLocation, address: text },
                                        })
                                    }
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Pregnancy Date (YYYY-MM-DD)"
                                    placeholderTextColor="#A0B1C8"
                                    value={formData.pregnancyDate}
                                    onChangeText={(text) => setFormData({ ...formData, pregnancyDate: text })}
                                />
                            </View>
                            {errors.pregnancyDate && (
                                <Text style={styles.errorText}>{errors.pregnancyDate}</Text>
                            )}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Age"
                                    placeholderTextColor="#A0B1C8"
                                    value={formData.age}
                                    keyboardType="numeric"
                                    onChangeText={(text) => setFormData({ ...formData, age: text })}
                                />
                            </View>
                            {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Parenting Day (YYYY-MM-DD)"
                                    placeholderTextColor="#A0B1C8"
                                    value={formData.parentingDay}
                                    onChangeText={(text) => setFormData({ ...formData, parentingDay: text })}
                                />
                            </View>
                            {errors.parentingDay && (
                                <Text style={styles.errorText}>{errors.parentingDay}</Text>
                            )}
                        </View>

                        {/* Partner Details */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Partner Details</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Husband's Name"
                                    placeholderTextColor="#A0B1C8"
                                    value={formData.partnerDetails.husbandName}
                                    onChangeText={(text) =>
                                        setFormData({
                                            ...formData,
                                            partnerDetails: { ...formData.partnerDetails, husbandName: text },
                                        })
                                    }
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Partner Email"
                                    placeholderTextColor="#A0B1C8"
                                    value={formData.partnerDetails.email}
                                    keyboardType="email-address"
                                    onChangeText={(text) =>
                                        setFormData({
                                            ...formData,
                                            partnerDetails: { ...formData.partnerDetails, email: text },
                                        })
                                    }
                                />
                            </View>
                            {errors.partnerEmail && (
                                <Text style={styles.errorText}>{errors.partnerEmail}</Text>
                            )}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Partner Phone Number (10 digits)"
                                    placeholderTextColor="#A0B1C8"
                                    value={formData.partnerDetails.phoneNumber}
                                    keyboardType="phone-pad"
                                    onChangeText={(text) =>
                                        setFormData({
                                            ...formData,
                                            partnerDetails: { ...formData.partnerDetails, phoneNumber: text },
                                        })
                                    }
                                />
                            </View>
                            {errors.partnerPhoneNumber && (
                                <Text style={styles.errorText}>{errors.partnerPhoneNumber}</Text>
                            )}
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
                            <LinearGradient colors={["#bbdbff", "#74a8ff"]} style={styles.buttonGradient}>
                                {loading ? <LoadingSpinner /> : <Text style={styles.buttonText}>Sign Up</Text>}
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.push("/auth/Login")}>
                            <Text style={styles.link}>Already have an account? Log in</Text>
                        </TouchableOpacity>

                        {successMessage && (
                            <Text style={styles.successMessage}>{successMessage}</Text>
                        )}
                        {generalError && <Text style={styles.errorMessage}>{generalError}</Text>}
                    </View>
                </LinearGradient>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1,
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
        textShadowColor: "rgba(0, 0, 0, 0.3)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 5,
    },
    subtitle: {
        fontSize: 18,
        color: "#000000",
        marginBottom: 40,
    },
    imageContainer: {
        alignItems: "center",
        marginBottom: 30,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#74a8ff",
        marginBottom: 10,
    },
    imageText: {
        color: "#9a9a9a",
        fontSize: 16,
        fontWeight: "500",
    },
    section: {
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#000000",
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        color: "#3f3f3f",
        marginBottom: 5,
    },
    inputContainer: {
        width: "100%",
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
    input: {
        flex: 1,
        padding: 12,
        fontSize: 16,
        color: "#3f3f3f",
        backgroundColor: "transparent",
    },
    eyeButton: {
        padding: 10,
    },
    picker: {
        width: "100%",
        height: 50,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
    },
    button: {
        width: "90%",
        borderRadius: 12,
        overflow: "hidden",
        marginTop: 20,
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
        textTransform: "uppercase",
    },
    link: {
        marginTop: 20,
        color: "#ababab",
        fontSize: 16,
        fontWeight: "500",
        textDecorationLine: "underline",
    },
    successMessage: {
        color: "#28A745",
        fontSize: 16,
        marginTop: 20,
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: 10,
        borderRadius: 8,
    },
    errorMessage: {
        color: "#F87171",
        fontSize: 16,
        marginTop: 20,
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: 10,
        borderRadius: 8,
    },
    errorText: {
        color: "#F87171",
        fontSize: 14,
        marginTop: -10,
        marginBottom: 10,
        marginLeft: 15,
    },
});