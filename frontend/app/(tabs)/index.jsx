import React, {useCallback, useState} from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Linking
} from "react-native";
import {router, useFocusEffect} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import moment from "moment";
import {Circle, Svg} from "react-native-svg";
import {LinearGradient} from "expo-linear-gradient";
import {LineChart} from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BabyGrowthTracker from "../../components/GrowthTracker";
import axiosInstance from "../../api/axiosInstance";
import DateTimePicker from "@react-native-community/datetimepicker";

const Landing = () => {
    const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
    const [currentWeek, setCurrentWeek] = useState(moment());
    const [scores, setScores] = useState([]);
    const [conceptionDate, setConceptionDate] = useState(null);
    const [profilePic, setProfileImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [bookedAppointments, setBookedAppointments] = useState([]);

    // Health checklist states
    const [healthTasks, setHealthTasks] = useState({
        hydration: false,
        physicalActivity: false,
        prenatalCare: false,
        balancedDiet: false,
        kegel: false,
        mindfulSleep: false,
    });
    const [progressPercent, setProgressPercent] = useState(0);

    const fetchBookedAppointments = async () => {
        try {
            const response = await axiosInstance.get("/appointments/my-booked");
            setBookedAppointments(response.data);
        } catch (error) {
            console.error("Error fetching booked appointments:", error);
        }
    };

    const handleSaveDate = async () => {
        try {
            const response = await axiosInstance.put('/conception', {
                pregnancyDate: date,
            });
            setConceptionDate(response.data.pregnancyDate);
            alert('Conception Date saved successfully!');
        } catch (error) {
            console.error("Error saving conception date:", error);
            alert('Failed to save Conception Date');
        }
    };

    const fetchHealthChecklistData = async () => {
        try {
            const [storedTasks, storedProgress, storedResetDate] = await Promise.all([
                AsyncStorage.getItem("healthChecklist"),
                AsyncStorage.getItem("progressPercent"),
                AsyncStorage.getItem("lastResetDate"),
            ]);

            const today = new Date().toDateString();

            if (storedResetDate && JSON.parse(storedResetDate) !== today) {
                const resetTasks = {
                    hydration: false,
                    physicalActivity: false,
                    prenatalCare: false,
                    balancedDiet: false,
                    kegel: false,
                    mindfulSleep: false,
                };
                setHealthTasks(resetTasks);
                setProgressPercent(0);
                await AsyncStorage.setItem("healthChecklist", JSON.stringify(resetTasks));
                await AsyncStorage.setItem("progressPercent", JSON.stringify(0));
                await AsyncStorage.setItem("lastResetDate", JSON.stringify(today));
            } else {
                // Load existing data
                if (storedTasks) {
                    setHealthTasks(JSON.parse(storedTasks));
                }
                if (storedProgress) {
                    setProgressPercent(JSON.parse(storedProgress) || 0);
                }
                if (!storedResetDate) {
                    await AsyncStorage.setItem("lastResetDate", JSON.stringify(today));
                }
            }
        } catch (error) {
            console.error("Error fetching health checklist data:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const response = await axiosInstance.get("/quizzes/get-response");
                    const thisWeekScores = response.data.filter((item) => {
                        const itemDate = new Date(item.createdAt);
                        const now = new Date();
                        const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
                        return itemDate >= startOfWeek;
                    });
                    setScores(thisWeekScores);
                } catch (err) {
                    console.log("Error fetching data:", err);
                    setError(err.message);
                }
            };

            const fetchUser = async () => {
                try {
                    const response = await axiosInstance.get("/users/profile");
                    setProfileImage(response.data.profileImage);
                    setUsername(response.data.fullName);
                    setConceptionDate(response.data.pregnancyDate);
                } catch (error) {
                    console.log(error);
                }
            };

            const loadAllData = async () => {
                setLoading(true);
                await fetchUser();
                await fetchBookedAppointments();
                await fetchData();
                await fetchHealthChecklistData();
                setLoading(false);
            };

            loadAllData();
        }, [])
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#A3C8E8" />
            </View>
        );
    }

    const screenWidth = Dimensions.get("window").width;
    const chartData = {
        labels: scores.map((item) => new Date(item.createdAt).toLocaleDateString()),
        datasets: [{ data: scores.map((item) => item.totalScore) }],
    };

    const getWeekDates = () => {
        const startOfWeek = currentWeek.startOf("isoweek");
        return [...Array(7)].map((_, i) => startOfWeek.clone().add(i, "days"));
    };

    const handlePrevWeek = () => {
        setCurrentWeek((prev) => prev.clone().subtract(1, "week"));
    };

    const handleNextWeek = () => {
        setCurrentWeek((prev) => prev.clone().add(1, "week"));
    };

    const taskDisplay = {
        hydration: "Drink 8 glasses of water today 💧",
        physicalActivity: "Walk for 15 minutes 🚶",
        prenatalCare: "Take prenatal vitamins 💊",
        balancedDiet: "Eat fruits, veggies & protein 🥗",
        kegel: "Do Kegel exercises 🩺",
        mindfulSleep: "Get 8 hours of sleep 😴",
    };

    const CircularProgress = ({ percentage }) => {
        const radius = 35;
        const strokeWidth = 8;
        const circumference = 2 * Math.PI * radius;
        const progress = (percentage / 100) * circumference;

        return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Svg width={90} height={90}>
                    <Circle cx="45" cy="45" r={radius} stroke="#F7C8E0" strokeWidth={strokeWidth} fill="none" opacity={0.3} />
                    <Circle
                        cx="45"
                        cy="45"
                        r={radius}
                        stroke="#B4E4FF"
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - progress}
                        strokeLinecap="round"
                    />
                </Svg>
                <View style={{ position: "absolute", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333333" }}>{percentage}%</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                {/* Header Section */}
                <View style={styles.headerSection}>
                    <View style={styles.profileContainer}>
                        {profilePic ? (
                            <Image source={{ uri: profilePic }} style={styles.profileImage} />
                        ) : (
                            <Image source={require("../../assets/images/landing.png")} style={styles.profileImage} />
                        )}
                        <View style={styles.welcomeContainer}>
                            <Text style={styles.welcomeText}>Welcome back,</Text>
                            <Text style={styles.nameText}>{username ? username : "Mom"}!</Text>
                        </View>
                    </View>
                </View>

                {/* Growth Tracker */}
                <View style={styles.growthTrackerCard}>
                    {conceptionDate ? (
                        <BabyGrowthTracker conceptionDate={conceptionDate} />
                    ) : (
                        <View style={styles.noConceptionContainer}>
                            <ActivityIndicator size="large" color="#F7C8E0" />
                            <Text style={styles.noConceptionText}>
                                Please set and save your conception date to track Baby's Growth
                            </Text>
                            <View style={styles.growthButtons}>
                                <TouchableOpacity
                                    style={styles.addDateButton}
                                    onPress={() => setShowPicker(true)}
                                >
                                    <Text style={styles.addDateButtonText}>Set Date</Text>
                                </TouchableOpacity>
                                {showPicker && (
                                    <DateTimePicker
                                        value={date}
                                        mode="date"
                                        display="default"
                                        onChange={(event, selectedDate) => {
                                            setShowPicker(false);
                                            if (selectedDate) setDate(selectedDate);
                                        }}
                                    />
                                )}
                                <TouchableOpacity
                                    style={styles.saveButton}
                                    onPress={handleSaveDate}
                                >
                                    <Text style={styles.saveButtonText}>Save Date</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>

                {/* Quick Access */}
                <Text style={styles.sectionTitle}>Quick Access</Text>
                <View style={styles.quickAccessContainer}>
                    <View style={styles.row}>
                        <TouchableOpacity
                            style={styles.quickAccessButton}
                            onPress={() => router.push("/HealthPlanScreen")}
                        >
                            <View style={styles.buttonIconContainer}>
                                <Image
                                    source={require("../../assets/images/health_plan.png")}
                                    style={styles.buttonIcon}
                                />
                            </View>
                            <Text style={styles.buttonText}>Health Plan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.quickAccessButton}
                            onPress={() => router.push("/epdsstart")}
                        >
                            <View style={styles.buttonIconContainer}>
                                <Image
                                    source={require("../../assets/images/mental_health.png")}
                                    style={styles.buttonIcon}
                                />
                            </View>
                            <Text style={styles.buttonText}>Mental Health</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity
                            style={styles.quickAccessButton}
                            onPress={() => router.push("/appointments/UserAppointments")}
                        >
                            <View style={styles.buttonIconContainer}>
                                <Image
                                    source={require("../../assets/images/apoinment.png")}
                                    style={styles.buttonIcon}
                                />
                            </View>
                            <Text style={styles.buttonText}>Appointments</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.quickAccessButton}
                            onPress={() => router.push("/emergency")}
                        >
                            <View style={styles.buttonIconContainer}>
                                <Image
                                    source={require("../../assets/images/Emergency (2).png")}
                                    style={styles.buttonIcon}
                                />
                            </View>
                            <Text style={styles.buttonText}>Emergency</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Calendar with Appointments */}
                <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
                <View style={styles.calendarContainer}>
                    <View style={styles.weekHeader}>
                        <TouchableOpacity onPress={handlePrevWeek}>
                            <Ionicons name="chevron-back" size={24} color="#B4E4FF" />
                        </TouchableOpacity>
                        <Text style={styles.weekTitle}>
                            {currentWeek.format("MMMM YYYY")}
                        </Text>
                        <TouchableOpacity onPress={handleNextWeek}>
                            <Ionicons name="chevron-forward" size={24} color="#B4E4FF" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.weekDays}>
                        {getWeekDates().map((date) => {
                            const dateStr = date.format("YYYY-MM-DD");
                            const isSelected = selectedDate === dateStr;
                            const isToday = dateStr === moment().format("YYYY-MM-DD");
                            const hasAppointment = bookedAppointments.some(appointment =>
                                moment(appointment.appointmentDate).format("YYYY-MM-DD") === dateStr
                            );

                            return (
                                <TouchableOpacity
                                    key={dateStr}
                                    onPress={() => setSelectedDate(dateStr)}
                                    style={[
                                        styles.dayContainer,
                                        isSelected && styles.selectedDayContainer,
                                        isToday && styles.todayContainer,
                                        hasAppointment && styles.bookedDayContainer,
                                    ]}
                                >
                                    <Text style={[
                                        styles.dayNameText,
                                        isSelected && styles.selectedDayText,
                                        hasAppointment && styles.bookedDayText,
                                    ]}>
                                        {date.format("ddd").toUpperCase()}
                                    </Text>
                                    <Text style={[
                                        styles.dayText,
                                        isSelected && styles.selectedDayText,
                                        hasAppointment && styles.bookedDayText,
                                    ]}>
                                        {date.format("D")}
                                    </Text>                                    
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {selectedDate && (
                        <View style={styles.appointmentDetail}>
                            <View style={styles.appointmentIcon}>
                                <Ionicons
                                    name={bookedAppointments.some(a =>
                                        moment(a.appointmentDate).format("YYYY-MM-DD") === selectedDate
                                    ) ? "calendar" : "calendar-outline"}
                                    size={24}
                                    color="#B4E4FF"
                                />
                            </View>
                            <View style={styles.appointmentInfo}>
                                {bookedAppointments.filter(appointment =>
                                    moment(appointment.appointmentDate).format("YYYY-MM-DD") === selectedDate
                                ).length > 0 ? (
                                    <>
                                        <Text style={styles.appointmentTitle}>Your Appointment</Text>
                                        {bookedAppointments
                                            .filter(appointment =>
                                                moment(appointment.appointmentDate).format("YYYY-MM-DD") === selectedDate
                                            )
                                            .map(appointment => (
                                                <View key={appointment._id} style={styles.appointmentItem}>
                                                    <Text style={styles.appointmentTime}>
                                                        ⏰ {appointment.appointmentTime}
                                                    </Text>
                                                    <Text style={styles.appointmentDoctor}>
                                                        👩‍⚕️ Dr. {appointment.doctorId?.fullName || "N/A"}
                                                    </Text>
                                                    <Text style={styles.appointmentSpecialty}>
                                                        🏥 {appointment.doctorId?.specialization || "General Checkup"}
                                                    </Text>
                                                    {appointment.url && (
                                                        <TouchableOpacity
                                                            style={styles.joinButton}
                                                            onPress={() => Linking.openURL(appointment.url)}
                                                        >
                                                            <Text style={styles.joinButtonText}>Join Video Call</Text>
                                                        </TouchableOpacity>
                                                    )}
                                                </View>
                                            ))}
                                    </>
                                ) : (
                                    <>
                                        <Text style={styles.appointmentTitle}>No Appointments</Text>
                                        <Text style={styles.appointmentDate}>
                                            {moment(selectedDate).format("dddd, MMMM D")}
                                        </Text>
                                        <TouchableOpacity
                                            style={styles.bookButton}
                                            onPress={() => router.push("/appointments/UserAppointments")}
                                        >
                                            <Text style={styles.bookButtonText}>Book Appointment</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        </View>
                    )}
                </View>

                {/* Health Checklist */}
                <Text style={styles.sectionTitle}>Today's Health Checklist</Text>
                <LinearGradient
                    colors={["#B4E4FF", "#9fd9fa"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.healthPlanCard}
                >
                    <View style={styles.healthPlanContent}>
                        <View style={styles.healthTasks}>
                            {Object.entries(healthTasks).map(([task, completed]) => (
                                <View key={task} style={styles.healthTask}>
                                    <View
                                        style={[
                                            styles.taskDot,
                                            { backgroundColor: completed ? "#0087cc" : "white" },
                                        ]}
                                    ></View>
                                    <Text
                                        style={[
                                            styles.taskText,
                                            {
                                                opacity: completed ? 0.7 : 1,
                                                textDecorationLine: completed ? "line-through" : "none",
                                            },
                                        ]}
                                    >
                                        {taskDisplay[task]}
                                    </Text>
                                </View>
                            ))}
                        </View>
                        <View style={styles.progressContainer}>
                            <CircularProgress percentage={progressPercent} />
                            <Text style={styles.progressText}>Daily Progress</Text>
                        </View>
                    </View>
                </LinearGradient>

                {/* Mental Health Summary */}
                <Text style={styles.sectionTitle}>Mental Health Summary</Text>
                <View style={{ alignItems: "center", padding: 20 }}>
                    {scores.length > 0 ? (
                        <View>
                            <LineChart
                                data={chartData}
                                width={screenWidth - 32}
                                height={220}
                                yAxisInterval={1}
                                chartConfig={{
                                    backgroundColor: "#FCFCFC",
                                    backgroundGradientFrom: "#FCFCFC",
                                    backgroundGradientTo: "#FCFCFC",
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgba(163, 200, 232, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
                                    style: { borderRadius: 16 },
                                    propsForDots: { r: "6", strokeWidth: "2", stroke: "#A3C8E8" },
                                }}
                                bezier
                                style={{ marginVertical: 8, borderRadius: 16, backgroundColor: "#EAEFF4" }}
                            />
                        </View>
                    ) : (
                        <Text style={{ fontSize: 16, textAlign: "center", color: "#64A8F1", marginTop: 20 }}>
                            No scores available. Try the EPDS test to track your mental health.
                        </Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    safeContainer: {
        flex: 1,
        backgroundColor: "#FCFCFC",
    },
    container: {
        paddingHorizontal: 20,
        paddingVertical: 25,
    },
    headerSection: {
        marginBottom: 25,
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#F7C8E0",
    },
    welcomeContainer: {
        marginLeft: 15,
    },
    welcomeText: {
        fontSize: 16,
        color: "#555555",
    },
    nameText: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#333333",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333333",
        marginTop: 25,
        marginBottom: 12,
    },
    growthTrackerCard: {
        backgroundColor: "#B4E4FF",
        padding: 20,
        borderRadius: 16,
        width: "100%",
        alignItems: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    noConceptionContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    noConceptionText: {
        fontSize: 16,
        color: "#555555",
        marginTop: 20,
    },
    addDateButton: {
        backgroundColor: "#E1AFD1",
        borderRadius: 10,
        marginTop: 20,
        marginRight: 10,
        width: 120,
        padding: 15
    },
    addDateButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center"
    },
    saveButton: {
        backgroundColor: "#E1AFD1",
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 10,
        width: 120
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center"
    },
    growthButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    quickAccessContainer: {
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    quickAccessButton: {
        backgroundColor: "#F7C8E0",
        width: "48%",
        borderRadius: 12,
        padding: 15,
        alignItems: "center",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: "#F0F0F0",
    },
    buttonIconContainer: {
        width: 50,
        height: 50,
        backgroundColor: "#F7E0EB",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },
    buttonIcon: {
        width: 28,
        height: 28,
        resizeMode: "contain",
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333333",
        marginTop: 5,
    },
    calendarContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 15,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: "#F0F0F0",
    },
    weekHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    weekTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333333",
    },
    weekDays: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    dayContainer: {
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 8,
        position: 'relative',
    },
    selectedDayContainer: {
        backgroundColor: "#B4E4FF",
    },
    todayContainer: {
        borderWidth: 2,
        borderColor: "#F7C8E0",
    },
    bookedDayContainer: {
        backgroundColor: '#F0F7FF',
        borderColor: '#B4E4FF',
        borderWidth: 1,
    },
    dayNameText: {
        fontSize: 12,
        color: "#555555",
        marginBottom: 5,
    },
    dayText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333333",
    },
    selectedDayText: {
        color: "#FFFFFF",
    },
    bookedDayText: {
        color: '#2A7FFF',
        fontWeight: '600',
    },
    bookedIndicator: {
        position: 'absolute',
        bottom: 4,
        backgroundColor: '#B4E4FF',
        borderRadius: 4,
        paddingHorizontal: 4,
        paddingVertical: 1,
    },
    bookedIndicatorText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    appointmentDetail: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F8F5FF",
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
    },
    appointmentIcon: {
        marginRight: 12,
    },
    appointmentTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333333",
    },
    appointmentDate: {
        fontSize: 14,
        color: "#555555",
        marginTop: 2,
    },
    appointmentInfo: {
        flex: 1,
    },
    appointmentItem: {
        marginTop: 8,
        padding: 12,
        backgroundColor: '#F8FAFF',
        borderRadius: 8,
    },
    appointmentTime: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    appointmentDoctor: {
        fontSize: 14,
        color: '#555',
        marginBottom: 2,
    },
    appointmentSpecialty: {
        fontSize: 13,
        color: '#777',
    },
    joinButton: {
        backgroundColor: '#B4E4FF',
        padding: 8,
        borderRadius: 6,
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    joinButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
    },
    bookButton: {
        backgroundColor: '#F7C8E0',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    bookButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    healthPlanCard: {
        borderRadius: 16,
        padding: 20,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    healthPlanContent: {
        flexDirection: "row",
    },
    healthTasks: {
        flex: 1,
    },
    healthTask: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    taskDot: {
        width: 8,
        height: 8,
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
        marginRight: 10,
    },
    taskText: {
        fontSize: 14,
        color: "#FFFFFF",
        flexShrink: 1,
    },
    progressContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    progressText: {
        fontSize: 12,
        color: "#FFFFFF",
        marginTop: 5,
        textAlign: "center",
    },
});

export default Landing;