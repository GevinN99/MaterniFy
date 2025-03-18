import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, ScrollView, Dimensions } from "react-native";
import axiosInstance from "../api/axiosInstance"; // Ensure axios is configured properly
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LineChart } from "react-native-chart-kit";

export default function EPDSScores() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        // const token = await AsyncStorage.getItem("authToken");
        // console.log("Retrieved token: ", token);
        // if (!token) throw new Error("Authentication token missing");

        const response = await axiosInstance.get("/quizzes/get-response" 
          // headers: { Authorization: `Bearer ${token}` },
        );

        console.log("API response:", response.data);

        setScores(response.data);
      } catch (err) {
        console.log("Error fetching scores:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#007AFF" />;
  if (error)
    return (
      <View className="p-4">
        <Text className="text-red-500 text-center">Error: {error}</Text>
      </View>
    );

    const screenWidth = Dimensions.get("window").width;
    const chartData = {
      labels: scores.map(item => new Date(item.createdAt).toLocaleDateString()),
      datasets: [{ data: scores.map(item => item.totalScore) }],
    };
  
    const scoreInterpretation = (score) => {
      if (score < 10) return "Low risk: You are doing well.";
      if (score < 13) return "Moderate risk: Some symptoms may be present.";
      return "High risk: Significant symptoms are present.";
    };
  
    const symptomInfo = (score) => {
      if (score < 10) return "Generally feeling well.";
      if (score < 13) return "May experience mild mood swings or anxiety.";
      return "Experiencing persistent sadness, anxiety, or difficulty coping.";
    };
  
    const tailoredAdvice = (score) => {
      if (score < 10) return "Continue with healthy habits.";
      if (score < 13) return "Consider mindfulness and relaxation techniques.";
      return "Seek professional help immediately.";
    };
  
    const onlineResources = () => {
      return "Visit [website](https://www.example.com) for more information.";
    };
  
    const affirmations = () => {
      return "You are strong and capable.";
    };
  
    return (
      <ScrollView className="flex-1 bg-gray-100 p-6">
        <Text className="text-2xl font-bold text-center text-gray-800 mb-4">Your EPDS Test Scores</Text>
        {scores.length > 0 && (
          <View>
            <LineChart
              data={chartData}
              width={screenWidth - 32}
              height={220}
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: "#e2e2e2",
                backgroundGradientFrom: "#e2e2e2",
                backgroundGradientTo: "#e2e2e2",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: { r: "6", strokeWidth: "2", stroke: "#ffa726" },
              }}
              bezier
              style={{ marginVertical: 8, borderRadius: 16 }}
            />
            <View className="bg-white p-4 rounded-lg shadow-md mb-3">
              <Text>Score Interpretation: {scoreInterpretation(scores[0].totalScore)}</Text>
              <Text>Symptom Info: {symptomInfo(scores[0].totalScore)}</Text>
              <Text>Tailored Advice: {tailoredAdvice(scores[0].totalScore)}</Text>
              <Text>Online Resources: {onlineResources()}</Text>
              <Text>Affirmations: {affirmations()}</Text>
            </View>
          </View>
        )}
        {scores.length === 0 && <Text className="text-center text-gray-600">No past scores found.</Text>}
      </ScrollView>
    );
  }

// 