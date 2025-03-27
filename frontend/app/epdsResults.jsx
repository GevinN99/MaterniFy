import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, Dimensions } from "react-native";
import axiosInstance from "../api/axiosInstance"; // Ensure axios is configured properly
import { LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";

export default function EPDSScores() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axiosInstance.get("/quizzes/get-response" 
          // headers: { Authorization: `Bearer ${token}` },
        );
        const thisWeekScores = response.data.filter(item => {
          const itemDate = new Date(item.createdAt);
          const now = new Date();
          const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
          return itemDate >= startOfWeek;
        });

        setScores(thisWeekScores);
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

  if (loading) return <ActivityIndicator size="large" color="#A3C8E8" />;
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
  
    const affirmations = () => {
      return "You are strong and capable.";
    };
  
    return (
      <ScrollView className="flex-1 bg-[#FCFCFC] p-6">
        <Text className="text-2xl font-bold text-center text-[#333333] mb-4">Your EPDS Test Scores</Text>
        {scores.length > 0 && (
          <View>
            <LineChart
              data={chartData}
              width={screenWidth - 32}
              height={220}
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: "#FCFCFC",
                backgroundGradientFrom: "#FCFCFC",
                backgroundGradientTo: "#FCFCFC",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(163, 200, 232, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: { r: "6", strokeWidth: "2", stroke: "#A3C8E8" },
              }}
              bezier
              style={{ marginVertical: 8, borderRadius: 16, backgroundColor: "#EAEFF4" }}
            />
            <View className="bg-white p-4 rounded-lg shadow-md mb-3">
            <View className="flex-row items-center mb-2">
              <Ionicons name="information-circle-outline" size={24} color="#A3C8E8" className="mr-2" />
              <Text className="font-semibold text-[#333333]">Score Interpretation:</Text>
            </View>
            <Text className="text-[#555555] mb-2">{scoreInterpretation(scores[0].totalScore)}</Text>
            </View>

            <View className="bg-white p-4 rounded-lg shadow-md mb-3">
              <View className="flex-row items-center mb-2">
                <Ionicons name="medkit-outline" size={24} color="#A3C8E8" className="mr-2" />
                    <Text className="font-semibold text-[#333333]">Symptom Info:</Text>
              </View>
              <Text className="text-[#555555] mb-2">{symptomInfo(scores[0].totalScore)}</Text>
            </View>

            {/* <View className="flex-row items-center mb-2">
              <Ionicons name="bulb-outline" size={24} color="#A3C8E8" className="mr-2"/>
              <Text className="font-semibold text-[#333333]">Tailored Advice:</Text>
            </View> */}
            {/* <Text className="text-[#555555] mb-2">{tailoredAdvice(scores[0].totalScore)}</Text> */}

            {/* <View className="flex-row items-center mb-2">
              <Ionicons name="globe-outline" size={24} color="#A3C8E8" className="mr-2"/>
              <Text className="font-semibold text-[#333333]">Online Resources:</Text>
            </View>
            <Text className="text-[#555555] mb-2">{onlineResources()}</Text> */}

            <View className="bg-white p-4 rounded-lg shadow-md">
              <View className="flex-row items-center mb-2">
                <Ionicons name="heart-outline" size={24} color="#A3C8E8" className="mr-2" />
                  <Text className="font-semibold text-[#333333]">Affirmations:</Text>
              </View>
                <Text className="text-[#555555]">{affirmations()}</Text>
              </View>
            </View>
        )}
        {scores.length === 0 && <Text className="text-center text-gray-600">No past scores found.</Text>}
      </ScrollView>
    );
  }