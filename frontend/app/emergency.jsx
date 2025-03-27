import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, StyleSheet, ScrollView } from "react-native";
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

const SymptomsChecker = () => {
  const router = useRouter();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const themeColor = "#7469B6";

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
      <Text style={styles.question}>Do you have any of these symptoms today?</Text>
      <Text style={styles.subQuestion}>(Select multiple)</Text>

      <ScrollView 
        style={styles.symptomsContainer}
        contentContainerStyle={styles.symptomsContent}
        showsVerticalScrollIndicator={false}
      >
        {symptomsList.map((symptom) => (
          <TouchableOpacity
            key={symptom}
            style={[
              styles.symptomItem,
              selectedSymptoms.includes(symptom) && {
                backgroundColor: `${themeColor}15`,
                borderColor: themeColor
              }
            ]}
            onPress={() => toggleSymptom(symptom)}
          >
            <Checkbox
              status={selectedSymptoms.includes(symptom) ? "checked" : "unchecked"}
              onPress={() => toggleSymptom(symptom)}
              color={themeColor}
            />
            <Text style={styles.symptomText}>{symptom}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Text style={styles.selectedCount}>
          {selectedSymptoms.length} selected
        </Text>
        
        <TouchableOpacity
          style={[
            styles.button,
            selectedSymptoms.length === 0 ? styles.buttonDisabled : styles.buttonEnabled
          ]}
          onPress={handleNext}
          disabled={selectedSymptoms.length === 0}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  question: {
    fontSize: 22,
    color: "#333333",
    marginBottom: 4,
  },
  subQuestion: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 24,
  },
  symptomsContainer: {
    flex: 1,
  },
  symptomsContent: {
    paddingBottom: 20,
  },
  symptomItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#FAFAFA",
  },
  symptomText: {
    fontSize: 18,
    marginLeft: 10,
    color: "#333333",
  },
  bottomContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  selectedCount: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginBottom: 12,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonEnabled: {
    backgroundColor: "#E1AFD1",
  },
  buttonDisabled: {
    backgroundColor: "#CCCCCC",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },
});

export default SymptomsChecker;