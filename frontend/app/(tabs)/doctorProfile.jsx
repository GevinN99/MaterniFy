import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Image,
    ScrollView,
    Modal,
} from "react-native";
import { useRouter } from "expo-router";
import axiosInstance from "../../api/axiosInstance";
import { AuthContext } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function DoctorProfile() {
    const { logout } = useContext(AuthContext);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
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
            setDeleteModalVisible(false);
        }
    };

    const handleLogout = () => {
        if (loading) return;
        logout()
            .then(() => {
                router.replace("/auth/DoctorLogin");
            })
            .catch((error) => {
                console.error("Logout Error:", error);
                Alert.alert("Error", "Failed to log out: " + error.message);
            });
    };

    return (
        <View className="flex-1 bg-[#FCFCFC] p-6">
            {/* Header with accent line */}
            <View className="mb-6">
                <Text className="text-3xl font-bold text-[#333333] text-center">Doctor Profile</Text>
                <View className="h-1 w-20 bg-[#B4E4FF] rounded-full self-center mt-2"></View>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#4E9AF6" className="flex-1" />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false} className="pb-10">
                    {/* Profile Image with futuristic ring */}
                    <View className="items-center mb-8">
                        <View className="w-36 h-36 rounded-full border-4 border-[#B4E4FF] flex items-center justify-center shadow-lg shadow-[#B4E4FF]/30 bg-white">
                            {profile.profileImage ? (
                                <Image
                                    source={{ uri: profile.profileImage }}
                                    className="w-32 h-32 rounded-full"
                                />
                            ) : (
                                <Ionicons name="person-circle-outline" size={90} color="#B4E4FF" />
                            )}
                        </View>
                    </View>

                    {/* Doctor Title */}
                    <Text className="text-2xl font-bold text-[#333333] text-center mb-8">
                        Dr. {profile.fullName}
                    </Text>

                    {/* Profile Form */}
                    <View className="space-y-5 mb-8">
                        <View>
                            <Text className="text-[#555555] mb-2 font-medium">Full Name</Text>
                            <TextInput
                                className="bg-white p-4 rounded-xl border border-[#B4E4FF]/50 text-[#333333] shadow-sm"
                                placeholder="Enter your full name"
                                placeholderTextColor="#94A3B8"
                                value={profile.fullName}
                                onChangeText={(text) => setProfile({ ...profile, fullName: text })}
                            />
                        </View>

                        <View>
                            <Text className="text-[#555555] mb-2 font-medium">Email</Text>
                            <TextInput
                                className="bg-[#F8FAFC] p-4 rounded-xl text-[#555555] border border-[#B4E4FF]/30"
                                placeholder="Your email"
                                placeholderTextColor="#94A3B8"
                                value={profile.email}
                                editable={false}
                            />
                        </View>

                        <View>
                            <Text className="text-[#555555] mb-2 font-medium">Years of Experience</Text>
                            <TextInput
                                className="bg-white p-4 rounded-xl border border-[#B4E4FF]/50 text-[#333333] shadow-sm"
                                placeholder="Enter years of experience"
                                placeholderTextColor="#94A3B8"
                                value={profile.experienceYears}
                                onChangeText={(text) => setProfile({ ...profile, experienceYears: text })}
                                keyboardType="numeric"
                            />
                        </View>

                        <View>
                            <Text className="text-[#555555] mb-2 font-medium">Specialization</Text>
                            <TextInput
                                className="bg-white p-4 rounded-xl border border-[#B4E4FF]/50 text-[#333333] shadow-sm"
                                placeholder="Enter your specialization"
                                placeholderTextColor="#94A3B8"
                                value={profile.specialization}
                                onChangeText={(text) => setProfile({ ...profile, specialization: text })}
                            />
                        </View>

                        <View>
                            <Text className="text-[#555555] mb-2 font-medium">Profile Image URL</Text>
                            <TextInput
                                className="bg-white p-4 rounded-xl border border-[#B4E4FF]/50 text-[#333333] shadow-sm"
                                placeholder="Enter image URL"
                                placeholderTextColor="#94A3B8"
                                value={profile.profileImage}
                                onChangeText={(text) => setProfile({ ...profile, profileImage: text })}
                            />
                        </View>
                    </View>

                    {/* Action Buttons with enhanced visibility */}
                    <View className="space-y-4 mb-8">
                        <TouchableOpacity
                            className={`bg-[#4E9AF6] p-5 rounded-xl flex-row items-center justify-center shadow-md ${loading ? "opacity-80" : "active:opacity-90"}`}
                            onPress={handleUpdateProfile}
                            disabled={loading}
                        >
                            <Ionicons name="save-outline" size={22} color="white" />
                            <Text className="text-white font-bold ml-3 text-lg">Update Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className={`bg-[#FF85B3] p-5 rounded-xl flex-row items-center justify-center shadow-md ${loading ? "opacity-80" : "active:opacity-90"}`}
                            onPress={() => setDeleteModalVisible(true)}
                            disabled={loading}
                        >
                            <Ionicons name="trash-outline" size={22} color="white" />
                            <Text className="text-white font-bold ml-3 text-lg">Delete Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="bg-[#555555] p-5 rounded-xl flex-row items-center justify-center shadow-md active:opacity-90"
                            onPress={handleLogout}
                            disabled={loading}
                        >
                            <Ionicons name="log-out-outline" size={22} color="white" />
                            <Text className="text-white font-bold ml-3 text-lg">Logout</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}

            {/* Enhanced Delete Confirmation Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={deleteModalVisible}
                onRequestClose={() => setDeleteModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/70 p-5">
                    <View className="bg-white w-full p-6 rounded-2xl max-w-md shadow-xl">
                        <View className="items-center mb-4">
                            <View className="bg-[#FF85B3]/10 p-4 rounded-full">
                                <Ionicons name="warning" size={40} color="#FF85B3" />
                            </View>
                        </View>
                        <Text className="text-2xl font-bold text-[#333333] mb-3 text-center">Confirm Deletion</Text>
                        <Text className="text-[#555555] mb-6 text-center text-base leading-6">
                            This will permanently delete your doctor profile and all associated data. This action cannot be undone.
                        </Text>

                        <View className="flex-row justify-between space-x-4">
                            <TouchableOpacity
                                className="flex-1 bg-[#F1F5F9] p-4 rounded-xl items-center justify-center active:bg-[#E2E8F0] border border-[#E2E8F0]"
                                onPress={() => setDeleteModalVisible(false)}
                            >
                                <Text className="text-[#555555] font-semibold text-base">Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="flex-1 bg-[#FF85B3] p-4 rounded-xl items-center justify-center active:bg-[#FF85B3]/90 shadow-sm"
                                onPress={handleDeleteProfile}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#FFFFFF" />
                                ) : (
                                    <View className="flex-row items-center">
                                        <Ionicons name="trash-outline" size={20} color="white" />
                                        <Text className="text-white font-semibold text-base ml-2">Confirm Delete</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}