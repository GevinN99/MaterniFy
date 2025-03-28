import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Alert,
    ActivityIndicator,
    Modal,
    Switch,
    ScrollView,
    Linking,
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
        setLoading(true);
        try {
            const newStatus = !isOnline;
            const response = await updateDoctorOnlineStatus(newStatus);
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

    const handleJoinMeeting = async (meetUrl) => {
        try {
            const supported = await Linking.canOpenURL(meetUrl);
            if (supported) {
                await Linking.openURL(meetUrl);
            } else {
                Alert.alert("Error", "Unable to open the meeting URL.");
            }
        } catch (error) {
            console.error("Error opening URL:", error);
            Alert.alert("Error", "Failed to open the meeting link.");
        }
    };

    return (
        <View className="flex-1 bg-[#FCFCFC]">
            <ScrollView className="px-5 py-6" showsVerticalScrollIndicator={false}>
                {/* Header Section with Profile Icon */}
                <View className="mb-8">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-3xl font-bold text-[#333333]">Doctor Dashboard</Text>
                        <TouchableOpacity
                            onPress={() => router.push("/(tabs)/doctorProfile")}
                            className="p-2"
                            accessibilityLabel="Go to profile"
                            accessibilityRole="button"
                        >
                            <Ionicons name="person-circle-outline" size={32} color="#B4E4FF" />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm mt-4">
                        <Text className="text-lg text-[#555555]">
                            Status: <Text className="font-semibold">{isOnline ? "Online" : "Offline"}</Text>
                        </Text>
                        <Switch
                            value={isOnline}
                            onValueChange={handleToggleOnlineStatus}
                            disabled={loading}
                            trackColor={{ false: "#E5E7EB", true: "#B4E4FF" }}
                            thumbColor={isOnline ? "#FFFFFF" : "#F3F4F6"}
                        />
                    </View>
                </View>

                {/* Create Appointment Section */}
                <View className="mb-8 bg-gradient-to-b from-[#B4E4FF] to-white p-6 rounded-2xl shadow-sm">
                    <Text className="text-xl font-bold text-[#333333] mb-4">Schedule New Appointment</Text>

                    <View className="mb-4">
                        <TouchableOpacity
                            className="flex-row items-center bg-white p-4 rounded-xl"
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Ionicons name="calendar" size={24} color="#B4E4FF" />
                            <Text className="ml-3 text-[#555555]">
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

                    <View className="mb-6">
                        <TouchableOpacity
                            className="flex-row items-center bg-white p-4 rounded-xl"
                            onPress={() => setShowTimePicker(true)}
                        >
                            <Ionicons name="time" size={24} color="#B4E4FF" />
                            <Text className="ml-3 text-[#555555]">
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
                        className={`bg-[#B4E4FF] p-4 rounded-xl items-center ${loading ? "opacity-70" : ""}`}
                        onPress={handleCreateAppointment}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text className="text-white font-bold text-lg">Create Appointment</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Appointments List Section */}
                <View>
                    <Text className="text-xl font-bold text-[#333333] mb-4">Your Appointments</Text>

                    {loading ? (
                        <ActivityIndicator size="large" color="#B4E4FF" />
                    ) : (
                        <FlatList
                            data={appointments}
                            keyExtractor={(item) => item._id}
                            scrollEnabled={false}
                            ListEmptyComponent={
                                <View className="bg-white p-6 rounded-xl items-center">
                                    <Text className="text-[#555555]">No appointments scheduled</Text>
                                </View>
                            }
                            renderItem={({ item }) => (
                                <View className={`mb-4 p-5 rounded-xl ${item.motherId ? "bg-[#FFE5F1]" : "bg-[#E5F9FF]"}`}>
                                    <View className="flex-row justify-between items-start">
                                        <View className="flex-1">
                                            <Text className="text-lg font-semibold text-[#333333]">
                                                {new Date(item.appointmentDate).toLocaleDateString()} at {item.appointmentTime}
                                            </Text>

                                            {item.motherId ? (
                                                <TouchableOpacity
                                                    className="mt-2"
                                                    onPress={() => handleViewHealthHistory(item.motherId)}
                                                >
                                                    <View className="flex-row items-center">
                                                        <Ionicons name="person-circle-outline" size={20} color="#F7C8E0" />
                                                        <Text className="ml-2 text-[#555555]">
                                                            Booked by: <Text className="font-semibold">{item.motherId.fullName}</Text>
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            ) : (
                                                <View className="mt-2 flex-row items-center">
                                                    <Ionicons name="time-outline" size={20} color="#B4E4FF" />
                                                    <Text className="ml-2 text-[#555555]">Available</Text>
                                                </View>
                                            )}
                                        </View>

                                        <TouchableOpacity
                                            onPress={() => handleCancelAppointment(item._id)}
                                            className="p-2"
                                        >
                                            <Ionicons name="trash-outline" size={24} color="#FF6B6B" />
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity
                                        className="bg-[#F7C8E0] p-3 rounded-lg mt-3 items-center"
                                        onPress={() => handleJoinMeeting(item.url)}
                                    >
                                        <Text className="text-white font-semibold">Join Meeting</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    )}
                </View>
            </ScrollView>

            {/* Health History Modal */}
            <Modal
                visible={!!selectedHealthHistory}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setSelectedHealthHistory(null)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white w-5/6 p-6 rounded-2xl">
                        <Text className="text-xl font-bold text-[#333333] mb-4 text-center">Health History</Text>
                        <ScrollView className="max-h-64 mb-6">
                            <Text className="text-[#555555]">{selectedHealthHistory}</Text>
                        </ScrollView>
                        <TouchableOpacity
                            className="bg-[#B4E4FF] p-3 rounded-lg items-center"
                            onPress={() => setSelectedHealthHistory(null)}
                        >
                            <Text className="text-white font-semibold">Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}