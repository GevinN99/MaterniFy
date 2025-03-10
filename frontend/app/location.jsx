import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import axios from 'axios';

export default function Location() {
  // State object to store form data
  const [formData, setFormData] = useState({
    fullName: '',
    houseNumber: '',
    streetName: '',
    village: '',
    city: '',
    district: '',
    province: ''
  });

  // Function to handle input changes and update formData
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  // Function to handle form submission and save location
  const handleSaveLocation = async () => {
    try {
      const response = await axios.post("http://localhost:8070/api/location", formData);
      
      
        console.log(response);
        alert("Location saved successfully!");
        router.push("/partner"); // Navigate to next page
      
    } catch (error) {
      console.error("Error saving location:", error);
      alert("Error saving location");
    }
  };

  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
      <Text>1 / 2</Text>
      <Text style={styles.title}>Location</Text>
      <Text style={styles.subtitle}>Add your Home Address</Text>

      <Text style={styles.label}>Full Name*</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        placeholderTextColor="#666"
        value={formData.fullName}
        onChangeText={(text) => handleChange('fullName', text)} // Update fullName
      />

      <Text style={styles.label}>House Number*</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        placeholderTextColor="#666"
        value={formData.houseNumber}
        onChangeText={(text) => handleChange('houseNumber', text)} // Update houseNumber
      />

      <Text style={styles.label}>Street Name*</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        placeholderTextColor="#666"
        value={formData.streetName}
        onChangeText={(text) => handleChange('streetName', text)} // Update streetName
      />

      <Text style={styles.label}>Village (If you are far from the Nearest City)</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        placeholderTextColor="#666"
        value={formData.village}
        onChangeText={(text) => handleChange('village', text)} // Update village
      />

      <Text style={styles.label}>City*</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        placeholderTextColor="#666"
        value={formData.city}
        onChangeText={(text) => handleChange('city', text)} // Update city
      />

      <Text style={styles.label}>District*</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        placeholderTextColor="#666"
        value={formData.district}
        onChangeText={(text) => handleChange('district', text)} // Update district
      />

      <Text style={styles.label}>Province*</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        placeholderTextColor="#666"
        value={formData.province}
        onChangeText={(text) => handleChange('province', text)} // Update province
      />

      <TouchableOpacity style={styles.nextButton} onPress={handleSaveLocation}>
        <Text style={styles.nextButtonText}>Next</Text>
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
  title: {
    fontSize: 48,
    fontWeight: "bold",
  },
  subtitle: {
    margin: 15,
    fontSize: 24,
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 1000,
    marginTop: 10,
    alignSelf: "flex-start",
    marginLeft: 20,
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
  nextButton: {
    backgroundColor: "#64A8F1",
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignSelf: "center",
  },
  nextButtonText: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
