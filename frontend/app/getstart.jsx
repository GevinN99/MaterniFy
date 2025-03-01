import { Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function Getstart() {
  return (
    <LinearGradient
      colors={["#64A8F1", "#E7EDEF"]}
      style={styles.gradientContainer}
    >
      <Text style={styles.title}>Emergency Assessment</Text>
      <Text style={styles.subtitle}>Stay Prepared, Stay Safe!</Text>

      <Image
        source={require("../assets/images/rec.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.description}>
        Add your hospital, doctors, and emergency contacts to get instant support when you need it most.
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/location")}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = {
  gradientContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 60,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 22,
    fontStyle: "italic",
    marginTop: 5,
    marginBottom: 20,
  },
  image: {
    width: 275,
    height: 275,
    marginBottom: 20,
    marginTop: 30,
    borderRadius: 250,
  },
  description: {
    fontSize: 18,
    fontStyle: "italic",
    margin: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#64A8F1",
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 40,
    paddingVertical: 15,
  },
  buttonText: {
    fontSize: 30,
    color: "#FFFF",
  },
};