import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Platform, StyleSheet, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";

export default function DateInputScreen() {
  const [date, setDate] = useState(""); // Stores selected date
  const [showPicker, setShowPicker] = useState(false); // Controls visibility

  // Open Calendar on Button Press
  const openDatePicker = () => {
    setShowPicker(true);
  };

  // Handle Date Selection
  const handleDateChange = (event: any, selectedDate?: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate.toISOString().split("T")[0]); // Format YYYY-MM-DD
    }
    setShowPicker(false); // Hide Picker after selection
  };

  return (
    
        

    <ScrollView contentContainerStyle={styles.scrollContainer}
    style={styles.container}>
        <Text>3 / 3</Text>
        <Text style={styles.title}>Partner</Text>
        <Text style={styles.subtitle}>Add your Partner's Details.</Text>

      {/* First Name */}
      <Text style={styles.label}>First Name:</Text>
      <TextInput style={styles.input} placeholder="Type here..." placeholderTextColor="#666" />

      {/* Last Name */}
      <Text style={styles.label}>Last Name:</Text>
      <TextInput style={styles.input} placeholder="Type here..." placeholderTextColor="#666" />

      {/* Email Address */}
      <Text style={styles.label}>Email Address:</Text>
      <TextInput style={styles.input} placeholder="Type here..." placeholderTextColor="#666" keyboardType="email-address" />

      {/* Contact Number */}
      <Text style={styles.label}>Contact Number:</Text>
      <TextInput style={styles.input} placeholder="Type here..." placeholderTextColor="#666" keyboardType="phone-pad" />

      {/* Relationship */}
      <Text style={styles.label}>Relationship with You:</Text>
      <TextInput style={styles.input} placeholder="Type here..." placeholderTextColor="#666" />
      <Text style={styles.label}>Select Date:</Text>

        <View style={styles.inputContainer}>
            {/* Date Input Field (Manually Editable) */}
      <TextInput
        placeholder="YYYY-MM-DD"
        value={date}
        onChangeText={setDate} // Allow manual typing
        keyboardType="numeric"
      />

      {/* Button to Open Calendar */}
      <TouchableOpacity style={styles.buttonicon} onPress={openDatePicker}>
        <Ionicons name="calendar" size={24} color="#007AFF" />
      </TouchableOpacity>   

        </View>
      

      {/* Date Picker (Only Opens When Button is Pressed) */}
      {showPicker && (
        <DateTimePicker 
          value={date ? new Date(date) : new Date()} // Default to today
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "calendar"} // Show Calendar UI
          textColor="black"
          onChange={handleDateChange}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={()=>router.push("/emergency")}>
        <Text style={{
            fontSize:30,
            color:"#FFFF",
            textAlign:"center",
            padding:10
        }}>Done</Text>
      </TouchableOpacity>  
    </ScrollView>

    
  );
}

// Styles
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
    textAlign: "left",
    marginBottom: 15,
    
  },
  buttonicon: {
    padding: 12,
    paddingLeft:200
  },
  button:{
    backgroundColor:"#64A8F1",
    alignSelf:"center",
    width:200,
    margin:20,
    padding:10,
    borderRadius:10
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
    flexDirection: "row", // Horizontal layout
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
