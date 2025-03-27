import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ExerciseCard from "../components/ExerciseCard";
import axiosInstance from "../api/axiosInstance";

const Exercises = ({ route }) => {
  const [exerciseList, setExerciseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  
  useEffect(() => {
    navigation.setOptions({
      title: "Mental Health Exercises",
      headerTintColor: "#333333",
      headerStyle: { backgroundColor: "#B4E4FF" }, // Add this line
      headerLeft: () => (
        <View className="flex-row items-center pl-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333333" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axiosInstance.get(`/exercises/fetch-exercises`);
        setExerciseList(response.data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" className="mt-10" color="#A3C8E8" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#FCFCFC] p-4">
      <View className="items-center mb-4">
        <Text className="text-2xl font-bold text-[#555555] mt-5 mb-2">
          Start Your Mindfulness Journey
        </Text>
      </View>

      {exerciseList.length === 0 ? (
        <Text className="text-[#265D9C] text-center mt-5">
          No exercises available for this score.
        </Text>
      ) : (
        <FlatList
          data={exerciseList}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ExerciseCard exercise={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default Exercises;