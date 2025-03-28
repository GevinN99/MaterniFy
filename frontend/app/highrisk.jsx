import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Linking } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const handleEmergencyCall = () => {
  const phoneNumber = '1990';
  Linking.openURL(`tel:${phoneNumber}`);
};

const HighRisk = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.alertIconContainer}>
        <MaterialIcons name="warning" size={80} color="#FF3B30" />
      </View>
      
      <Text style={styles.title}>EMERGENCY</Text>
      
      <View style={styles.cardContainer}>
        <Text style={styles.subtitle}>High Risk Condition Detected</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.message}>
          Your symptoms indicate a serious medical concern that requires immediate attention.
        </Text>
        
        <View style={styles.actionItem}>
          <MaterialIcons name="local-hospital" size={24} color="#FF3B30" />
          <Text style={styles.actionText}>Go to the nearest emergency room</Text>
        </View>
        
        <View style={styles.actionItem}>
          <MaterialIcons name="phone" size={24} color="#FF3B30" />
          <Text style={styles.actionText}>Call emergency services now</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.emergencyButton} 
        onPress={() => { handleEmergencyCall(); }}
      >
        <MaterialIcons name="phone" size={24} color="white" />
        <Text style={styles.emergencyButtonText}>Call Emergency Services</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.homeButton} onPress={() => router.push("/")}>
        <MaterialIcons name="home" size={20} color="white" />
        <Text style={styles.homeButtonText}>Return Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  alertIconContainer: {
    backgroundColor: "rgba(255, 59, 48, 0.15)",
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FF3B30",
    letterSpacing: 2,
    marginBottom: 24,
  },
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 16,
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    width: "100%",
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: "#444444",
    lineHeight: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    width:335
  },
  actionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222222",
    marginLeft: 10,
  },
  emergencyButton: {
    backgroundColor: "#FF3B30",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: "90%",
    marginBottom: 12,
  },
  emergencyButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  homeButton: {
    backgroundColor: "#E1AFD1",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  homeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default HighRisk;