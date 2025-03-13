import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { Svg, Circle } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const Landing = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
  const [currentWeek, setCurrentWeek] = useState(moment());
  const [scores, setScores] = useState([5, 10, 15]); // Dummy scores for testing

  const router = useRouter();

  const screenWidth = Dimensions.get("window").width;

  const handleSelectEmotion = (emotion) => {
    setSelectedEmotion(emotion);
    console.log(`Selected Emotion: ${emotion}`);
  };

  const getWeekDates = () => {
    const startOfWeek = currentWeek.startOf("week");
    return [...Array(7)].map((_, i) => startOfWeek.clone().add(i, "days"));
  };

  const handlePrevWeek = () => {
    setCurrentWeek((prev) => prev.clone().subtract(1, "week"));
  };

  const handleNextWeek = () => {
    setCurrentWeek((prev) => prev.clone().add(1, "week"));
  };

  const CircularProgress = ({ percentage }) => {
    const radius = 40;
    const strokeWidth = 10;
    const circumference = 2 * Math.PI * radius;
    const progress = (percentage / 100) * circumference;

    return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Svg width={100} height={100}>
            <Circle cx="50" cy="50" r={radius} stroke="#E0E0E0" strokeWidth={strokeWidth} fill="none" />
            <Circle
                cx="50"
                cy="50"
                r={radius}
                stroke="orange"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                strokeLinecap="round"
            />
          </Svg>
          <View style={{ position: "absolute", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{percentage}%</Text>
          </View>
        </View>
    );
  };

  return (
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView contentContainerStyle={styles.container}>
          <Image source={require("../../assets/images/landing.png")} style={styles.image} />
          <Text style={styles.title}>Welcome, Sarah!</Text>
          <Text style={styles.subtitle}>How are you feeling today?</Text>

          <View style={styles.emojiContainer}>
            {[{ name: require("../../assets/images/sunglasses.png"), label: "Happy"  },
              { name: require("../../assets/images/smile.png"), label: "Calm"},
              { name: require("../../assets/images/thinking.png"), label: "Confused"},
              { name: require("../../assets/images/sad.png"), label: "Sad" },
              { name: require("../../assets/images/angry.png"), label: "Angry" },
            ].map(({ name, label, color }) => (
                <TouchableOpacity key={label} onPress={() => handleSelectEmotion(label)}>
                  <Image
                      source={name}
                      style={[
                        styles.emojiImage,
                        { opacity: selectedEmotion === label ? 1 : 0.5 }, // Highlight selected emoji
                      ]}
                  />
                </TouchableOpacity>
            ))}
          </View>

          <View style={styles.secContainer}>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => router.push("/getstart")}>
                <Image source={require("../../assets/images/medical-report.png")} style={styles.sectors} />
                <Text style={styles.topic}>Health Plan</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/epdsstart")}>
                <Image source={require("../../assets/images/mental-health (1).png")} style={styles.sectors} />
                <Text style={styles.topic}>Mental Health</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => router.push("/getstart")}>
                <Image source={require("../../assets/images/insurance-policy.png")} style={styles.sectors} />
                <Text style={styles.topic}>Appointments</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/getstart")}>
                <Image source={require("../../assets/images/first-aid-kit.png")} style={styles.sectors} />
                <Text style={styles.topic}>Emergency</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.calendarContainer}>
            <View style={styles.weekHeader}>
              <TouchableOpacity onPress={handlePrevWeek}>
                <Ionicons name="chevron-back" size={24} color="#64A8F1" />
              </TouchableOpacity>
              <Text style={styles.weekTitle}>{currentWeek.format("  MMMM D  ")}</Text>
              <TouchableOpacity onPress={handleNextWeek}>
                <Ionicons name="chevron-forward" size={24} color="#64A8F1" />
              </TouchableOpacity>
            </View>
            <View style={styles.weekDays}>
              {getWeekDates().map((date) => (
                  <TouchableOpacity key={date.format("YYYY-MM-DD")} onPress={() => setSelectedDate(date.format("YYYY-MM-DD"))}>
                    <Text style={[styles.dayText, selectedDate === date.format("YYYY-MM-DD") && styles.selectedDay]}>
                      {date.format("dd").charAt(0)}{"\n"}{"\n"}{date.format("D")}
                    </Text>
                  </TouchableOpacity>
              ))}
            </View>
            {selectedDate && (
                <><Text style={styles.dateText}>Doctor Checkup </Text><Text>{selectedDate}</Text></>
            )}
          </View>
          <LinearGradient
              colors={['#E2E0E0', '#64A8F1']}
              style={styles.healthplan}>
            <Text style={styles.healthtitle}>
              Today's Health plan
            </Text>
            <Text style={styles.texthealth}>
              "You need 8 glasses of water today 💧"
            </Text>
            <Text style={styles.texthealth}>
              "Remember to take your iron supplements"
            </Text>
            <Text style={styles.texthealth}>
              "Mild back pain detected? Try 5 mins of stretching."
            </Text>
            <CircularProgress percentage={100} />
          </LinearGradient>

          <View style={{ alignItems: "center", padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
              Mental Health Summary
            </Text>

            <View style={{ marginTop: 5, marginBottom:20 }}>
              <LineChart
                  data={{
                    labels: ["Last month", "Jan 26 - Feb 1", "Today"],
                    datasets: [{ data: scores }],
                  }}
                  width={screenWidth * 0.9}
                  height={250}
                  yAxisLabel=""
                  chartConfig={{
                    backgroundColor: "#E3F2FD",
                    backgroundGradientFrom: "#E3F2FD",
                    backgroundGradientTo: "#BBDEFB",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: { borderRadius: 16 },
                    propsForDots: { r: "5", strokeWidth: "2", stroke: "#2196F3" },
                  }}
                  bezier
                  style={{ borderRadius: 16 }}
              />
              <Text style={{ fontSize: 18, textAlign:"center" }}>
                ⚠ {getRiskMessage(scores[scores.length - 1])}
              </Text>
            </View>
          </View>

          {/* -Karunya- */}
          {/* <View className="flex-1 items-center justify-center bg-gray-100 px-6">
            <Text className="text-2xl font-bold text-gray-800 mb-6">Welcome to Maternify!</Text>
            <TouchableOpacity className="w-full bg-blue-300 p-6 rounded-xl shadow-md items-center" onPress={() => router.push("epds")}>
              <Text className="text-xl font-bold text-white">EPDS Assessment</Text>
              <Text className="text-sm text-white">Take the Edinburgh Postnatal Depression Scale</Text>
            </TouchableOpacity>
          </View> */}

        </ScrollView>
      </SafeAreaView>
  );
};

const getRiskMessage = (score) => {
  if (score < 10) return "Low Risk: Keep maintaining a healthy lifestyle!";
  if (score < 20) return "Moderate Risk: Try relaxation exercises & connect with support groups.";
  return "High Risk: Seek professional help immediately!";
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    alignItems: "center",
    paddingVertical: 30,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 24,
    marginVertical: 10,
  },
  emojiContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginVertical:10
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectors: {
    width: 100,
    height: 100,
    margin: 30,
  },
  secContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  topic: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  calendarContainer:{
    margin: 30,
    alignItems:"center",
    backgroundColor:"#E2E0E0",
    paddingVertical:20,
    paddingHorizontal:20,
    height:220,
    width:350,
    borderRadius:20
  },
  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  dayText: {
    fontSize: 18,
    color: "gray",
    textAlign:"center",
    padding:10,
  },
  selectedDay: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#64A8F1",
  },
  dateText: {
    marginTop: 10,
    fontSize: 20,
    textAlign: "center",
    color:"#005F80",
    fontWeight:"bold"
  },
  healthplan:{
    padding:15,
    borderRadius:20,
    width:350
  },
  healthtitle:{
    textAlign:"center",
    fontSize:20,
    fontWeight:"bold",
    padding:10,
  },
  texthealth:{
    textAlign:"center",
    paddingVertical:5,
  },
  emojiImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});

export default Landing;