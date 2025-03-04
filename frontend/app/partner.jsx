import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Platform, StyleSheet, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function DateInputScreen() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const openDatePicker = () => {
    setShowPicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate.toISOString().split("T")[0]);
    }
    setShowPicker(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
      <Text>3 / 3</Text>
      <Text style={styles.title}>Partner</Text>
      <Text style={styles.subtitle}>Add your Partner's Details.</Text>

      <Text style={styles.label}>First Name:</Text>
      <TextInput style={styles.input} placeholder="Type here..." placeholderTextColor="#666" />

      <Text style={styles.label}>Last Name:</Text>
      <TextInput style={styles.input} placeholder="Type here..." placeholderTextColor="#666" />

      <Text style={styles.label}>Email Address:</Text>
      <TextInput style={styles.input} placeholder="Type here..." placeholderTextColor="#666" keyboardType="email-address" />

      <Text style={styles.label}>Contact Number:</Text>
      <TextInput style={styles.input} placeholder="Type here..." placeholderTextColor="#666" keyboardType="phone-pad" />

      <Text style={styles.label}>Relationship with You:</Text>
      <TextInput style={styles.input} placeholder="Type here..." placeholderTextColor="#666" />

      <Text style={styles.label}>Select Date:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="YYYY-MM-DD"
          value={date}
          onChangeText={setDate}
          keyboardType="numeric"
          style={{ flex: 1 }}
        />
        <TouchableOpacity style={styles.buttonicon} onPress={openDatePicker}>
          <Ionicons name="calendar" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker 
          value={date ? new Date(date) : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "calendar"}
          textColor="black"
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => router.push("/emergency")}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#E7EDEF",
    padding: 10,
  },
  input: {
    width: "90%",
    height: 50,
    borderColor: "#007AFF",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  buttonicon: {
    padding: 12,
  },
  button: {
    backgroundColor: "#64A8F1",
    alignSelf: "center",
    width: 200,
    margin: 20,
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 30,
    color: "#FFFF",
    textAlign: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 55,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    marginHorizontal: 50,
    fontSize: 24,
    textAlign: "left",
    marginBottom: 30,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 5,
  },  
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#007AFF",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "90%",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});