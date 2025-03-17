import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import axiosInstance from "../api/axiosInstance"; // Ensure axios is configured properly
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EPDSScores() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        console.log("Retrieved token: ", token);
        if (!token) throw new Error("Authentication token missing");

        const response = await axiosInstance.get("/quizzes/user-scores", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setScores(response.data);
      } catch (err) {
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

  return (
    <View className="flex-1 bg-gray-100 p-6">
      <Text className="text-2xl font-bold text-center text-gray-800 mb-4">
        Your EPDS Test Scores
      </Text>

      {scores.length === 0 ? (
        <Text className="text-center text-gray-600">No past scores found.</Text>
      ) : (
        <FlatList
          data={scores}
          keyExtractor={(item) => item._id} // Assuming MongoDB ObjectId is used
          renderItem={({ item }) => (
            <View className="bg-white p-4 rounded-lg shadow-md mb-3">
              <Text className="text-gray-800 font-semibold">Date: {new Date(item.createdAt).toLocaleDateString()}</Text>
              <Text className="text-gray-600">Total Score: {item.totalScore}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
