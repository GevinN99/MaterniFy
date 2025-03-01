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
import { Calendar } from "react-native-calendars";
import { router } from "expo-router";

const Landing = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  const handleSelectEmotion = (emotion) => {
    setSelectedEmotion(emotion);
    console.log(`Selected Emotion: ${emotion}`);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("../assets/images/landing.png")} style={styles.image} />
        <Text style={styles.title}>Welcome, Sarah!</Text>
        <Text style={styles.subtitle}>How are you feeling today?</Text>

        <View style={styles.emojiContainer}>
          {[
            { name: "happy", label: "Happy", color: "green" },
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
              <Image source={require("../assets/images/Healthplan.png")} style={styles.sectors} />
              <Text style={styles.topic}>Health Plan</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/getstart")}> 
              <Image source={require("../assets/images/Mentalhealth.png")} style={styles.sectors} />
              <Text style={styles.topic}>Mental Health</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => router.push("/getstart")}> 
              <Image source={require("../assets/images/Appoinments.png")} style={styles.sectors} />
              <Text style={styles.topic}>Appointments</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/getstart")}> 
              <Image source={require("../assets/images/Emmergency.png")} style={styles.sectors} />
              <Text style={styles.topic}>Emergency</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: "#64A8F1" },
            }}
          />
          {selectedDate ? <Text style={styles.dateText}>Doctor Checkup: {selectedDate}</Text> : null}
        </View>
      </ScrollView>

      <View style={styles.page}>
        {[
          { name: "calendar", label: "Today" },
          { name: "globe-outline", label: "Community" },
          { name: "chatbox-ellipses", label: "Chatbot" },
          { name: "person", label: "Profile" },
        ].map(({ name, label }) => (
          <View key={label}>
            <TouchableOpacity style={styles.baricon}>
              <Ionicons name={name} size={40} color="white" />
              <Text style={styles.icontxt}>{label}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
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
    width: 150,
    height: 150,
    margin: 5,
  },
  secContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  topic: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  calendarContainer: {
    padding: 20,
    marginTop: 30,
    width: 400,
  },
  dateText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
  page: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#64A8F1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    paddingBottom: 40,
    height: 90,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  baricon: {
    alignItems: "center",
    paddingTop: 10,
  },
  icontxt: {
    color: "white",
    textAlign: "center",
    fontSize: 12,
  },
});

export default Landing;

