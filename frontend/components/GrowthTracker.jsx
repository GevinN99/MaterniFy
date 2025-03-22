import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Platform, SafeAreaView, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressBar } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";

// Shortened growth stages array - just keeping a few key stages
const growthStages = [
  { week: 1, fruit: "Poppy Seed", image: require("../assets/images/fruits/Poppy Seed.png") },
  { week: 2, fruit: "Apple Seed", image: require("../assets/images/fruits/Apple Seed.png") },
  { week: 3, fruit: "Green Pea", image: require("../assets/images/fruits/Grean Pea.png") },
  { week: 4, fruit: "Blueberry", image: require("../assets/images/fruits/Blueberry.png") },
  { week: 5, fruit: "Pomegranate Seed", image: require("../assets/images/fruits/Pomegranate Seed.png") },
  { week: 6, fruit: "Cherry", image: require("../assets/images/fruits/Cherry.png") },
  { week: 7, fruit: "Olive", image: require("../assets/images/fruits/Olive.png") },
  { week: 8, fruit: "Bean", image: require("../assets/images/fruits/Bean.png") },
  { week: 9, fruit: "Plum", image: require("../assets/images/fruits/Plum.png") },
  { week: 10, fruit: "Fig", image: require("../assets/images/fruits/Figs.png") },
  { week: 11, fruit: "Bean", image: require("../assets/images/fruits/Bean.png") },
  { week: 12, fruit: "Lime", image: require("../assets/images/fruits/Lime.png") },
  { week: 13, fruit: "Apple", image: require("../assets/images/fruits/Apple.png") },
  { week: 14, fruit: "Peach", image: require("../assets/images/fruits/Peach.png") },
  { week: 15, fruit: "Lemon", image: require("../assets/images/fruits/Lemon.png") },
  { week: 16, fruit: "Tomato", image: require("../assets/images/fruits/Tomato.png") },
  { week: 17, fruit: "Avocado", image: require("../assets/images/fruits/Avocado.png") },
  { week: 18, fruit: "Cucumber", image: require("../assets/images/fruits/Cucumber.png") },
  { week: 19, fruit: "Pear", image: require("../assets/images/fruits/Pear.png") },
  { week: 20, fruit: "Mangosteen", image: require("../assets/images/fruits/Mangosteen.png") },
  { week: 21, fruit: "Orange", image: require("../assets/images/fruits/Orange.png") },
  { week: 22, fruit: "Cauliflower", image: require("../assets/images/fruits/Cauliflower.png") },
  { week: 23, fruit: "Mango", image: require("../assets/images/fruits/Mango.png") },
  { week: 24, fruit: "Artichoke", image: require("../assets/images/fruits/Artichoke.png") },
  { week: 25, fruit: "Garnet", image: require("../assets/images/fruits/Garnet.png") },
  { week: 26, fruit: "Pitaya", image: require("../assets/images/fruits/Pitaya.png") },
  { week: 27, fruit: "Corn", image: require("../assets/images/fruits/Corn.png") },
  { week: 28, fruit: "Grapefruit", image: require("../assets/images/fruits/Grapefruit.png") },
  { week: 29, fruit: "Papaya", image: require("../assets/images/fruits/Papaya.png") },
  { week: 30, fruit: "Pomelo", image: require("../assets/images/fruits/Pomelo.png") },
  { week: 31, fruit: "Durian", image: require("../assets/images/fruits/Durian.png") },
  { week: 32, fruit: "Eggplant", image: require("../assets/images/fruits/Eggplant.png") },
  { week: 33, fruit: "Coconut", image: require("../assets/images/fruits/Coconut.png") },
  { week: 34, fruit: "Zucchini", image: require("../assets/images/fruits/Zucchini.png") },
  { week: 35, fruit: "Little Pumpkin", image: require("../assets/images/fruits/Little Pumkin.png") },
  { week: 36, fruit: "Pineapple", image: require("../assets/images/fruits/Pineapple.png") },
  { week: 37, fruit: "Patison", image: require("../assets/images/fruits/Patison.png") },
  { week: 38, fruit: "Watermelon", image: require("../assets/images/fruits/Watermelon.png") },
  { week: 39, fruit: "Melon", image: require("../assets/images/fruits/Melon.png") },
  { week: 40, fruit: "Cabbage", image: require("../assets/images/fruits/Cabbage.png") },
];

const GrowthTracker = () => {
  const [gestationalAge, setGestationalAge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [conceptionDate, setConceptionDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [dueDate, setDueDate] = useState(null);

  // Load saved date on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dateStr = await AsyncStorage.getItem("conceptionDate");
        if (dateStr) {
          const dateObj = new Date(dateStr);
          setConceptionDate(dateObj);
          calculateDates(dateObj);
        }
      } catch (error) {
        console.error("Error:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Calculate gestational age and due date
  const calculateDates = (date) => {
    const today = new Date();
    const days = Math.floor((today - date) / (1000 * 60 * 60 * 24));
    setGestationalAge(Math.floor(days / 7));
    
    const due = new Date(date);
    due.setDate(due.getDate() + 280); // 40 weeks
    setDueDate(due);
  };

  // Handle date selection
  const onChangeDate = async (event, selectedDate) => {
    if (selectedDate) {
      setShowPicker(Platform.OS === "ios");
      setConceptionDate(selectedDate);
      await AsyncStorage.setItem("conceptionDate", selectedDate.toISOString());
      calculateDates(selectedDate);
    } else {
      setShowPicker(false);
    }
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#B4E4FF" />
        <Text style={styles.secondaryText}>Loading...</Text>
      </View>
    );
  }

  // Initial setup state
  if (!conceptionDate) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Welcome to Baby Growth Tracker</Text>
          <Image 
            source={require("../assets/images/fruits/Apple.png")} 
            style={styles.setupImage} 
          />
          <Text style={styles.secondaryText}>
            Please select your conception date or first day of your last period.
          </Text>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => setShowPicker(true)}
          >
            <MaterialIcons name="date-range" size={24} color="white" />
            <Text style={styles.buttonText}>Select Date</Text>
          </TouchableOpacity>
          
          {showPicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={onChangeDate}
              maximumDate={new Date()}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }

  // Find current growth stage
  const currentStage = growthStages.reduce(
    (closest, stage) => (stage.week <= gestationalAge ? stage : closest),
    growthStages[0]
  );

  // Determine trimester
  const trimester = gestationalAge <= 12 ? "First" : gestationalAge <= 26 ? "Second" : "Third";
  const trimesterColor = gestationalAge <= 12 ? "#F7C8E0" : gestationalAge <= 26 ? "#F7C8E0" : "#F7C8E0";
  const weeksRemaining = Math.max(0, 40 - gestationalAge);
  const progressPercent = Math.round(gestationalAge / 40 * 100);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Baby's Growth</Text>
          <View style={[styles.badge, { backgroundColor: trimesterColor }]}>
            <Text style={styles.badgeText}>{trimester} Trimester</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.weekText}>Week {gestationalAge}</Text>
          <Image source={currentStage.image} style={styles.fruitImage} />
          <Text style={styles.fruitText}>Your baby is about the size of a {currentStage.fruit}</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.progressHeader}>
            <Text style={styles.subtitle}>Pregnancy Journey</Text>
            <Text style={styles.highlight}>{gestationalAge}/40 weeks</Text>
          </View>
          
          <ProgressBar 
            progress={gestationalAge / 40} 
            color="#B4E4FF" 
            style={styles.progressBar} 
          />
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Conception</Text>
              <Text style={styles.infoValue}>{formatDate(conceptionDate)}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Due Date</Text>
              <Text style={styles.infoValue}>{formatDate(dueDate)}</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <MaterialIcons name="event-available" size={24} color="#B4E4FF" />
              <Text style={styles.statValue}>{weeksRemaining}</Text>
              <Text style={styles.statLabel}>Weeks Left</Text>
            </View>
            <View style={styles.stat}>
              <MaterialIcons name="trending-up" size={24} color="#B4E4FF" />
              <Text style={styles.statValue}>{progressPercent}%</Text>
              <Text style={styles.statLabel}>Complete</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => setShowPicker(true)}
        >
          <MaterialIcons name="edit" size={20} color="white" />
          <Text style={styles.buttonText}>Update Date</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={conceptionDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
            maximumDate={new Date()}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B4E4FF",
    padding: 16,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: "#333333",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
  },
  weekText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  fruitImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginVertical: 16,
  },
  fruitText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#555555",
  },
  divider: {
    height: 1,
    backgroundColor: "#B4E4FF",
    marginVertical: 16,
    width: "100%",
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 12,
  },
  highlight: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginBottom: 16,
    width: "100%",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#B4E4FF",
  },
  infoItem: {
    alignItems: "center",
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: "#555555",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#555555",
  },
  button: {
    backgroundColor: "#F7C8E0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 8,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  secondaryText: {
    fontSize: 16,
    color: "#555555",
    textAlign: "center",
    marginVertical: 12,
  },
  setupImage: {
    width: 100,
    height: 100,
    marginVertical: 16,
  },
});

export default GrowthTracker;