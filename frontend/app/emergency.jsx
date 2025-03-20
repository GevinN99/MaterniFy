import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper"; 
import { useState } from "react";

const lowRiskSymptoms = ["Nausea/Vomiting", "Mild headache"];
const mediumRiskSymptoms = ["Swelling in hands/feet", "Abdominal pain", "Dizziness or fainting"];
const highRiskSymptoms = ["Severe headache", "Blurred vision", "Shortness of breath", "Bleeding or spotting", "Baby movement reduced"];

const symptomsList = [
  ...lowRiskSymptoms,
  ...mediumRiskSymptoms,
  ...highRiskSymptoms
];

const MyComponent = () => {
  const router = useRouter();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);


  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((item) => item !== symptom) : [...prev, symptom]
    );
  };

  const determineRiskLevel = () => {
    const hasHighRisk = selectedSymptoms.some((symptom) => highRiskSymptoms.includes(symptom));
    const hasMediumRisk = selectedSymptoms.some((symptom) => mediumRiskSymptoms.includes(symptom));
    
    if (hasHighRisk) {
      return "high";
    } else if (hasMediumRisk) {
      return "medium";
    } else {
      return "low";
    }
  };


  const handleNext = () => {
    const riskLevel = determineRiskLevel();
    if (riskLevel === "high") {
      router.push("/highrisk"); 
    } else if (riskLevel === "medium") {
      router.push("/mediumrisk"); 
    } else {
      router.push("/lowrisk"); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let Us Know</Text>
      <Text style={styles.question}>Do you have any of these symptoms today? (Select multiple)</Text>

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

      <TouchableOpacity
        style={styles.button}
        onPress={handleNext}
        disabled={selectedSymptoms.length === 0}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 40,
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
    opacity: 1,
  },
  buttonText: {
    fontSize: 25,
    color: "#FFF",
  },
});

export default MyComponent;
