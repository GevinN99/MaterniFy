import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Linking,
    ScrollView,
    RefreshControl,
    SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { getAvailableAppointments, bookAppointment, getUserBookedAppointments } from "../../api/appointmentApi";
import { getAvailableDoctors } from "../../api/doctorApi";
import { MaterialIcons, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

export default function UserAppointments() {
    const [pendingAppointments, setPendingAppointments] = useState([]);
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();

    const loadData = async () => {
        try {
            setLoading(true);
            const [pending, booked, docs] = await Promise.all([
                getAvailableAppointments(),
                getUserBookedAppointments(),
                getAvailableDoctors(),
            ]);
            setPendingAppointments(pending);
            setBookedAppointments(booked);
            setDoctors(docs);
        } catch (error) {
            Alert.alert("Error", "Failed to load data");
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        loadData();
    };

    useEffect(() => {
        let mounted = true;

        loadData();

        return () => {
            mounted = false;
        };
    }, []);

    const handleBookAppointment = async (appointmentId) => {
        try {
            setLoading(true);
            const response = await bookAppointment(appointmentId);
            if (response.error) {
                Alert.alert("Error", response.error);
            } else {
                Alert.alert("Success", "Appointment booked successfully!");
                loadData();
            }
        } catch (error) {
            Alert.alert("Error", "Failed to book appointment");
        } finally {
            setLoading(false);
        }
    };

    const handleJoinMeeting = async (meetUrl) => {
        try {
            const supported = await Linking.canOpenURL(meetUrl);
            if (supported) {
                await Linking.openURL(meetUrl);
            } else {
                Alert.alert("Error", "Unable to open the meeting URL");
            }
        } catch (error) {
            Alert.alert("Error", "Failed to open the meeting link");
        }
    };

    const renderPendingAppointmentItem = ({ item }) => (
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
            <View className="flex-row items-center mb-2">
                <MaterialIcons name="event-available" size={20} color="#B4E4FF" className="mr-2" />
                <Text className="text-gray-500">
                    {new Date(item.appointmentDate).toLocaleDateString()} at {item.appointmentTime}
                </Text>
            </View>
            <View className="flex-row items-center mb-2">
                <MaterialCommunityIcons name="doctor" size={20} color="#B4E4FF" className="mr-2" />
                <Text className="text-gray-800 font-medium">{item.doctorId?.fullName || "N/A"}</Text>
            </View>
            <View className="flex-row items-center mb-4">
                <MaterialIcons name="medical-services" size={20} color="#B4E4FF" className="mr-2" />
                <Text className="text-gray-500">{item.doctorId?.specialization || "N/A"}</Text>
            </View>
            <TouchableOpacity
                className="py-3 rounded-lg flex-row justify-center items-center"
                onPress={() => handleBookAppointment(item._id)}
                disabled={loading}
                style={{ backgroundColor: "#B4E4FF" }}
            >
                <FontAwesome name="calendar-plus-o" size={16} color="white" className="mr-2" />
                <Text className="text-white font-semibold">Book Appointment</Text>
            </TouchableOpacity>
        </View>
    );

    const renderBookedAppointmentItem = ({ item }) => (
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-start mb-3">
                <View>
                    <View className="flex-row items-center mb-1">
                        <MaterialIcons name="event" size={20} color="#F7C8E0" className="mr-2" />
                        <Text className="text-gray-800 font-medium">
                            {new Date(item.appointmentDate).toLocaleDateString()} at {item.appointmentTime}
                        </Text>
                    </View>
                    <View className="flex-row items-center mb-1">
                        <MaterialCommunityIcons name="doctor" size={20} color="#F7C8E0" className="mr-2" />
                        <Text className="text-gray-500">{item.doctorId?.fullName || "N/A"}</Text>
                    </View>
                    <View className="flex-row items-center">
                        <MaterialIcons name="medical-services" size={20} color="#F7C8E0" className="mr-2" />
                        <Text className="text-gray-500">{item.doctorId?.specialization || "N/A"}</Text>
                    </View>
                </View>
                <View className="bg-F7C8E0 px-2 py-1 rounded-full">
                    <Text className="text-xs text-gray-800">Confirmed</Text>
                </View>
            </View>
            {item.status === "confirmed" && item.url && (
                <TouchableOpacity
                    className="py-3 rounded-lg flex-row justify-center items-center mt-2"
                    onPress={() => handleJoinMeeting(item.url)}
                    style={{ backgroundColor: "#F7C8E0" }}
                >
                    <MaterialCommunityIcons name="video" size={18} color="white" className="mr-2" />
                    <Text className="text-white font-semibold">Join Video Consultation</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    const renderDoctorItem = ({ item }) => (
        <View className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-lg font-semibold text-gray-800">{item.fullName}</Text>
                <View className="flex-row items-center">
                    <View className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                    <Text className="text-xs text-gray-500">Online</Text>
                </View>
            </View>
            <View className="flex-row items-center mb-1">
                <MaterialIcons name="medical-services" size={16} color="#B4E4FF" className="mr-2" />
                <Text className="text-gray-500">{item.specialization}</Text>
            </View>
            <View className="flex-row items-center">
                <MaterialIcons name="work" size={16} color="#B4E4FF" className="mr-2" />
                <Text className="text-gray-500">{item.experienceYears} years experience</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-FCFCFC">
            <View className="p-4">
                <View className="h-1 w-16 bg-B4E4FF rounded-full" />
            </View>

            {loading && !refreshing ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#B4E4FF" />
                </View>
            ) : (
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#B4E4FF"]} tintColor="#B4E4FF" />
                    }
                >
                    <View className="px-4">
                        {/* Booked Appointments Section */}
                        <View className="mb-8">
                            <View className="flex-row items-center mb-3">
                                <Text className="text-xl font-bold text-gray-800 mr-3">Your Appointments</Text>
                                <View className="h-1 flex-1 bg-B4E4FF rounded-full" />
                            </View>
                            {bookedAppointments.length > 0 ? (
                                <FlatList
                                    data={bookedAppointments}
                                    keyExtractor={(item) => item._id}
                                    renderItem={renderBookedAppointmentItem}
                                    scrollEnabled={false}
                                    ListFooterComponent={<View className="pb-4" />}
                                />
                            ) : (
                                <View className="bg-white p-6 rounded-xl items-center mb-4">
                                    <MaterialIcons name="event-busy" size={40} color="#B4E4FF" />
                                    <Text className="text-gray-500 mt-3">No booked appointments yet</Text>
                                </View>
                            )}
                        </View>

                        {/* Available Appointments Section */}
                        <View className="mb-8">
                            <View className="flex-row items-center mb-3">
                                <Text className="text-xl font-bold text-gray-800 mr-3">Available Appointments</Text>
                                <View className="h-1 flex-1 bg-B4E4FF rounded-full" />
                            </View>
                            {pendingAppointments.length > 0 ? (
                                <FlatList
                                    data={pendingAppointments}
                                    keyExtractor={(item) => item._id}
                                    renderItem={renderPendingAppointmentItem}
                                    scrollEnabled={false}
                                    ListFooterComponent={<View className="pb-4" />}
                                />
                            ) : (
                                <View className="bg-white p-6 rounded-xl items-center mb-4">
                                    <MaterialIcons name="schedule" size={40} color="#B4E4FF" />
                                    <Text className="text-gray-500 mt-3">No available appointments</Text>
                                </View>
                            )}
                        </View>

                        {/* Doctors Section */}
                        <View className="mb-8">
                            <View className="flex-row items-center mb-3">
                                <Text className="text-xl font-bold text-gray-800 mr-3">Available Doctors</Text>
                                <View className="h-1 flex-1 bg-B4E4FF rounded-full" />
                            </View>
                            {doctors.length > 0 ? (
                                <FlatList
                                    data={doctors}
                                    keyExtractor={(item) => item._id}
                                    renderItem={renderDoctorItem}
                                    scrollEnabled={false}
                                />
                            ) : (
                                <View className="bg-white p-6 rounded-xl items-center">
                                    <MaterialCommunityIcons name="doctor" size={40} color="#B4E4FF" />
                                    <Text className="text-gray-500 mt-3">No doctors available</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}