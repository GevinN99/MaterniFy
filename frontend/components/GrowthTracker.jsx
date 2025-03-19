import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, Button, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressBar } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";


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
  { week: 36, fruit: "Pineapple", image: require("../assets/images/fruits/PineApple.png") },
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

  useEffect(() => {
    const fetchConceptionDate = async () => {
      try {
        const conceptionDateString = await AsyncStorage.getItem("conceptionDate");
        if (conceptionDateString) {
          const conceptionDateObj = new Date(conceptionDateString);
          setConceptionDate(conceptionDateObj);
          calculateGestationalAge(conceptionDateObj);
        }
      } catch (error) {
        console.error("Error fetching conception date:", error);
      }
      setLoading(false);
    };

    fetchConceptionDate();
  }, []);

  const calculateGestationalAge = (date) => {
    const today = new Date();
    const differenceInDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(differenceInDays / 7);
    setGestationalAge(weeks);
  };

  const onChangeDate = async (event, selectedDate) => {
    if (selectedDate) {
      setShowPicker(Platform.OS === "ios"); 
      setConceptionDate(selectedDate);
      await AsyncStorage.setItem("conceptionDate", selectedDate.toISOString());
      calculateGestationalAge(selectedDate);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />;
  }

  
  if (!conceptionDate) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Baby Growth Tracker</Text>
        <Text style={styles.errorText}>Please select a conception date</Text>
        <Button title="Pick a Date" onPress={() => setShowPicker(true)} color="#4CAF50" />
        {showPicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
      </View>
    );
  }


  const currentGrowthStage = growthStages.reduce(
    (closest, stage) => (stage.week <= gestationalAge ? stage : closest),
    growthStages[0]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Baby Growth Tracker</Text>
      <Text style={styles.subtitle}>Gestational Age: {gestationalAge} weeks</Text>

      <Image source={currentGrowthStage.image} style={styles.fruitImage} />
      <Text style={styles.fruitText}>
        Your baby is about the size of a {"\n"} {currentGrowthStage.fruit}!
      </Text>

      <ProgressBar progress={gestationalAge / 40} color="#4CAF50" style={styles.progressBar} />
      <Text style={styles.progressText}>{gestationalAge} / 40 weeks</Text>

      <Button title="Change Conception Date" onPress={() => setShowPicker(true)} color="#FF9800" />

      {showPicker && (
        <DateTimePicker
          value={conceptionDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: "#fffdef",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width:"100%"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4CAF50",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "#555",
  },
  fruitImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  fruitText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign:"center"
  },
  progressBar: {
    width: "80%",
    height: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  progressText: {
    fontSize: 16,
    color: "#333",
  },
  loader: {
    marginTop: 50,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default GrowthTracker;
