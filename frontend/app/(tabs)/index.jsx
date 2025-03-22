import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import moment from "moment";
import { Svg, Circle } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import BabyGrowthTracker from "../../components/GrowthTracker";

const Landing = () => {
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
  const [currentWeek, setCurrentWeek] = useState(moment());
  const [scores, setScores] = useState([5, 10, 15]); 
  const [conceptionDate, setConceptionDate] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const storedName = await AsyncStorage.getItem("userName");
      if (storedName) {
        setUserName(storedName);
      }
    };
    fetchUserName();
  }, []);

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    const fetchConceptionDate = async () => {
      try {
        const storedDate = await AsyncStorage.getItem("conceptionDate");
        if (storedDate) {
          setConceptionDate(storedDate);
        }
      } catch (error) {
        console.error("Error fetching conception date:", error);
      }
    };
    fetchConceptionDate();
  }, [conceptionDate]); 
  
  useEffect(() => {
    const fetchProfilePic = async () => {
      const storedPic = await AsyncStorage.getItem("profilePic");
      if (storedPic) {
        setProfilePic(storedPic);
      }
    };
    fetchProfilePic();
  }, []);

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

  const getRiskMessage = (score) => {
    if (score <= 10) return "Low Risk: Keep maintaining a healthy lifestyle!";
    if (score <= 20) return "Moderate Risk: Try relaxation exercises & connect with support groups.";
    return "High Risk: Seek professional help immediately!";
  };
  

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
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
              <Text style={styles.nameText}>{userName ? userName : "Mom"}!</Text>
            </View>
          </View>
        </View>

        {/* Baby Growth Tracker Card */}
        <View style={styles.growthTrackerCard}>
          {conceptionDate ? (
            <BabyGrowthTracker conceptionDate={conceptionDate} />
          ) : (
            <View style={styles.noConceptionContainer}>
              <ActivityIndicator size="large" color="#F7C8E0" />
              <Text style={styles.noConceptionText}>
                Please set your conception date to track Baby's Growth
              </Text>
              <TouchableOpacity 
                style={styles.addDateButton}
                onPress={() => router.push("/SetConceptionDate")}
              >
                <Text style={styles.addDateButtonText}>Set Date</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Quick Access Section */}
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
              onPress={() => router.push("/mental-health")}
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
              onPress={() => router.push("/appointments")}
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
              style={[styles.quickAccessButton, styles.emergencyButton]}
              onPress={() => router.push("/emergency")}
            >
              <View style={[styles.buttonIconContainer, styles.emergencyIconContainer]}>
                <Image 
                  source={require("../../assets/images/emergency.png")} 
                  style={[styles.buttonIcon, { tintColor: "white" }]} 
                />
              </View>
              <Text style={[styles.buttonText, styles.emergencyText]}>Emergency</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Calendar Section */}
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        <View style={styles.calendarContainer}>
          <View style={styles.weekHeader}>
            <TouchableOpacity onPress={handlePrevWeek}>
              <Ionicons name="chevron-back" size={24} color="#B4E4FF" />
            </TouchableOpacity>
            <Text style={styles.weekTitle}>{currentWeek.format("MMMM YYYY")}</Text>
            <TouchableOpacity onPress={handleNextWeek}>
              <Ionicons name="chevron-forward" size={24} color="#B4E4FF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.weekDays}>
            {getWeekDates().map((date) => {
              const isSelected = selectedDate === date.format("YYYY-MM-DD");
              const isToday = date.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD");
              
              return (
                <TouchableOpacity 
                  key={date.format("YYYY-MM-DD")} 
                  onPress={() => setSelectedDate(date.format("YYYY-MM-DD"))}
                  style={[
                    styles.dayContainer,
                    isSelected && styles.selectedDayContainer,
                    isToday && styles.todayContainer
                  ]}
                >
                  <Text style={[
                    styles.dayNameText, 
                    isSelected && styles.selectedDayText
                  ]}>
                    {date.format("ddd").toUpperCase()}
                  </Text>
                  <Text style={[
                    styles.dayText, 
                    isSelected && styles.selectedDayText
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
                <Ionicons name="md-calendar" size={24} color="#B4E4FF" />
              </View>
              <View>
                <Text style={styles.appointmentTitle}>Doctor Checkup</Text>
                <Text style={styles.appointmentDate}>{moment(selectedDate).format("dddd, MMMM D, YYYY")}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Today's Health Plan */}
        <Text style={styles.sectionTitle}>Today's Health Plan</Text>
        <LinearGradient 
          colors={['#B4E4FF', '#9fd9fa']} 
          start={{x: 0, y: 0}} 
          end={{x: 1, y: 0}}
          style={styles.healthPlanCard}
        >
          <View style={styles.healthPlanContent}>
            <View style={styles.healthTasks}>
              <View style={styles.healthTask}>
                <View style={styles.taskDot}></View>
                <Text style={styles.taskText}>Drink 8 glasses of water today 💧</Text>
              </View>
              <View style={styles.healthTask}>
                <View style={styles.taskDot}></View>
                <Text style={styles.taskText}>Take your iron supplements</Text>
              </View>
              <View style={styles.healthTask}>
                <View style={styles.taskDot}></View>
                <Text style={styles.taskText}>Try 5 mins of stretching for back pain</Text>
              </View>
            </View>
            
            <View style={styles.progressContainer}>
              <CircularProgress percentage={75} />
              <Text style={styles.progressText}>Daily Progress</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Mental Health Summary */}
        <Text style={styles.sectionTitle}>Mental Health Summary</Text>
        <View style={styles.mentalHealthCard}>
          <LineChart
            data={{
              labels: ["Week 1", "Week 2", "Week 3"],
              datasets: [{ data: scores }],
            }}
            width={screenWidth - 40}
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: "#FCFCFC",
              backgroundGradientFrom: "#FCFCFC",
              backgroundGradientTo: "#FCFCFC",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(180, 228, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: { r: "6", strokeWidth: "2", stroke: "#F7C8E0" },
            }}
            bezier
            style={{ borderRadius: 16, marginVertical: 8 }}
          />
          
          <View style={styles.riskMessageContainer}>
            <Ionicons 
              name={scores[scores.length - 1] <= 10 ? "checkmark-circle" : "warning"} 
              size={24} 
              color={scores[scores.length - 1] <= 10 ? "#4CAF50" : "#FFC107"} 
            />
            <Text style={styles.riskMessage}>
              {getRiskMessage(scores[scores.length - 1])}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    padding: 15,
  },
  noConceptionText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  addDateButton: {
    backgroundColor: "#F7C8E0",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  addDateButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
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
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#F5F0FA",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  emergencyButton: {
    backgroundColor: "#F7C8E0",
  },
  emergencyIconContainer: {
    backgroundColor: "#f0b7d4",
  },
  emergencyText: {
    color: "#FFFFFF",
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
  },
  selectedDayContainer: {
    backgroundColor: "#B4E4FF",
  },
  todayContainer: {
    borderWidth: 1,
    borderColor: "#F7C8E0",
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
    borderRadius: 4,
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
  mentalHealthCard: {
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
  riskMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F5FF",
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
  },
  riskMessage: {
    fontSize: 14,
    color: "#555555",
    marginLeft: 10,
    flex: 1,
  },
});

export default Landing;