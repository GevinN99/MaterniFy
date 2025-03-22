import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const MediumRisk = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Medium Risk</Text>
        <View style={styles.divider} />
        <Text style={styles.message}>
          Your symptoms indicate a <Text style={styles.boldText}>moderate risk condition</Text>. 
          It is advised to <Text style={styles.boldText}>contact your healthcare provider</Text> 
          as soon as possible for further evaluation.
        </Text>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push("/")}
        >
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FF9800",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 25,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FF9800",
    marginBottom: 15,
  },
  divider: {
    height: 2,
    backgroundColor: "#e0e0e0",
    width: "80%",
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    lineHeight: 26,
    textAlign: "center",
    marginBottom: 30,
    color: "#555",
  },
  boldText: {
    fontWeight: "bold",
    color: "#FF9800",
  },
  button: {
    backgroundColor: "#FF9800",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default MediumRisk;