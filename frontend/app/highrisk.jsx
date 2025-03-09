import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const HighRisk = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>High Risk</Text>
      <Text style={styles.message}>
        ⚠ **Emergency Alert!** ⚠{"\n"}
        Your symptoms indicate a **high-risk condition**. **Seek immediate medical attention!** 
        Go to the nearest hospital or call emergency services **right away**.
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
    color: "red",
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    color: "#D32F2F",
    fontWeight: "bold",
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

export default HighRisk;
