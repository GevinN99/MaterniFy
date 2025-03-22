import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Image,
    ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import axiosInstance from "../../api/axiosInstance";
import { AuthContext } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function DoctorProfile() {
    const { logout } = useContext(AuthContext);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState({
        fullName: "",
        email: "",
        experienceYears: "",
        specialization: "",
        profileImage: "",
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/doctors/me");
            setProfile({
                fullName: response.data.fullName || "",
                email: response.data.email || "",
                experienceYears: response.data.experienceYears?.toString() || "",
                specialization: response.data.specialization || "",
                profileImage: response.data.profileImage || "",
            });
        } catch (error) {
            console.error("Fetch Profile Error:", error.response?.data || error.message);
            Alert.alert("Error", "Failed to load profile data.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async () => {
        setLoading(true);
        try {
            await axiosInstance.put("/doctors/me", {
                fullName: profile.fullName,
                experienceYears: parseInt(profile.experienceYears) || 0,
                specialization: profile.specialization,
                profileImage: profile.profileImage,
            });
            Alert.alert("Success", "Profile updated successfully");
            fetchProfile();
        } catch (error) {
            console.error("Update Profile Error:", error.response?.data || error.message);
            Alert.alert("Error", `Failed to update profile: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProfile = async () => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete your profile? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        setLoading(true);
                        try {
                            await axiosInstance.delete("/doctors/me");
                            Alert.alert("Success", "Profile deleted successfully");
                            await logout();
                            router.replace("/auth/DoctorLogin");
                        } catch (error) {
                            console.error("Delete Profile Error:", error.response?.data || error.message);
                            Alert.alert("Error", "Failed to delete profile.");
                        } finally {
                            setLoading(false);
                        }
                    },
                },
            ]
        );
    };

    const handleLogout = () => {
        console.log("Logout button clicked, loading state:", loading);
        if (loading) {
            console.log("Logout blocked due to loading state");
            return;
        }
        console.log("Executing logout directly...");
        logout()
            .then(() => {
                console.log("Logout successful, navigating to DoctorLogin");
                router.replace("/auth/DoctorLogin");
            })
            .catch((error) => {
                console.error("Logout Error:", error);
                Alert.alert("Error", "Failed to log out: " + error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Doctor Profile</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#007AFF" style={styles.loading} />
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.profileImageContainer}>
                        {profile.profileImage ? (
                            <Image source={{ uri: profile.profileImage }} style={styles.profileImage} />
                        ) : (
                            <Ionicons name="person-circle-outline" size={100} color="#ccc" />
                        )}
                    </View>

                    {/* Display Full Name with Title */}
                    <Text style={styles.nameWithTitle}>Dr. {profile.fullName}</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Full Name (without title)"
                        value={profile.fullName}
                        onChangeText={(text) => setProfile({ ...profile, fullName: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email (cannot be changed)"
                        value={profile.email}
                        editable={false}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Years of Experience"
                        value={profile.experienceYears}
                        onChangeText={(text) => setProfile({ ...profile, experienceYears: text })}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Specialization"
                        value={profile.specialization}
                        onChangeText={(text) => setProfile({ ...profile, specialization: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Profile Image URL"
                        value={profile.profileImage}
                        onChangeText={(text) => setProfile({ ...profile, profileImage: text })}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.updateButton, loading && styles.disabledButton]}
                            onPress={handleUpdateProfile}
                            disabled={loading}
                        >
                            <Text style={styles.buttonText}>Update Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.deleteButton, loading && styles.disabledButton]}
                            onPress={handleDeleteProfile}
                            disabled={loading}
                        >
                            <Text style={styles.buttonText}>Delete Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.logoutButton]}
                            onPress={() => {
                                console.log("Logout button pressed");
                                handleLogout();
                            }}
                            disabled={loading}
                        >
                            <Ionicons name="log-out-outline" size={20} color="#fff" style={styles.icon} />
                            <Text style={styles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 20,
        textAlign: "center",
        color: "#333",
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    loading: {
        flex: 1,
        justifyContent: "center",
    },
    profileImageContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    nameWithTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#007AFF",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    buttonContainer: {
        marginTop: 20,
    },
    button: {
        flexDirection: "row",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
    },
    updateButton: {
        backgroundColor: "#007AFF",
    },
    deleteButton: {
        backgroundColor: "#FF4444",
    },
    logoutButton: {
        backgroundColor: "#FFA500",
    },
    disabledButton: {
        opacity: 0.6,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    icon: {
        marginRight: 10,
    },
});