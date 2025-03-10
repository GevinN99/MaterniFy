import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const LowRisk = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Low Risk</Text>
      <Text style={styles.message}>
        Your symptoms indicate a **low-risk condition**. Stay hydrated and monitor your symptoms.
        If they worsen, seek medical attention.
      </Text>
      
      <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
        <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#64A8F1",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});

export default LowRisk;
