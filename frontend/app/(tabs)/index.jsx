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
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import moment from "moment";
import { Svg, Circle } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";

const Landing = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
  const [currentWeek, setCurrentWeek] = useState(moment());

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
          {[{ name: "happy", label: "Happy", color: "green" },
            { name: "happy-outline", label: "Calm", color: "lightgreen" },
            { name: "help-circle", label: "Confused", color: "#E0C412" },
            { name: "sad", label: "Sad", color: "orange" },
            { name: "close-circle", label: "Angry", color: "red" },
          ].map(({ name, label, color }) => (
            <TouchableOpacity key={label} onPress={() => handleSelectEmotion(label)}>
              <Ionicons name={name} size={35} color={selectedEmotion === label ? color : "#64A8F1"} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.secContainer}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => router.push("/getstart")}>
              <Image source={require("../../assets/images/Healthplan.png")} style={styles.sectors} />
              <Text style={styles.topic}>Health Plan</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/getstart")}>
              <Image source={require("../../assets/images/Mentalhealth.png")} style={styles.sectors} />
              <Text style={styles.topic}>Mental Health</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => router.push("/getstart")}>
              <Image source={require("../../assets/images/Appoinments.png")} style={styles.sectors} />
              <Text style={styles.topic}>Appointments</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/getstart")}>
              <Image source={require("../../assets/images/Emmergency.png")} style={styles.sectors} />
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
            </ScrollView>
    </SafeAreaView>
  );
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
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectors: {
    width: 130,
    height: 130,
    margin: 20,
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
    borderRadius:20
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
  
});

export default Landing;
