import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper"; // ✅ Using react-native-paper
import { useState } from "react";

const symptomsList = [
  "Severe headache",
  "Blurred vision",
  "Dizziness or fainting",
  "Swelling in hands/feet",
  "Abdominal pain",
  "Nausea/Vomiting",
  "Shortness of breath",
  "Bleeding or spotting",
  "Baby movement reduced"
];

const MyComponent = () => {
  const router = useRouter();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  // ✅ Toggle selection
  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((item) => item !== symptom) // Remove if already selected
        : [...prev, symptom] // Add if not selected
    );
  };

  return (
    <View>
    <TouchableOpacity onPress={() => router.push("/")}>
    
    <Text 
    style={{fontSize:18,
       textAlign:"right",
       padding:10
    }}>Edit</Text>
    
    </TouchableOpacity>

    <View style={styles.mainContainer}>
         
      <Text style={styles.title}>Let Us Know</Text>
      <Text style={styles.question}>
        Do you have any of these symptoms today? (Select multiple)
      </Text>

      {/* ✅ Dynamic List of Checkboxes */}
      <View style={styles.checkboxGroup}>
        {symptomsList.map((symptom) => (
          <View key={symptom} style={styles.checkboxContainer}>
            <Checkbox
              status={selectedSymptoms.includes(symptom) ? "checked" : "unchecked"}
              onPress={() => toggleSymptom(symptom)}
              color="#64A8F1"
              
            />
            <Text style={styles.label}>{symptom}</Text>
          </View>
        ))}
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/landing")}
        disabled={selectedSymptoms.length === 0} // Disable if nothing selected
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
  },
  question: {
    margin: 20,
    fontSize: 22,
    textAlign: "center",
  },
  checkboxGroup: {
    alignItems: "flex-start",
    width: "80%",
    marginVertical: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#64A8F1",
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 15,
    opacity: 1, // Change opacity when disabled
  },
  buttonText: {
    fontSize: 25,
    color: "#FFF",
  },
});

export default MyComponent;
