import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ExerciseCard from "../components/ExerciseCard";
import axiosInstance from "../api/axiosInstance";

const Exercises = ({ route }) => {
  const [exerciseList, setExerciseList] = useState([]);
  const [loading, setLoading] = useState(true);

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
    return <ActivityIndicator size="large" className="mt-10" color="#0077B6" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-maternifyWhite p-5">
      <Text className="text-xl font-bold text-maternifyBlue text-center mb-4">
        Recommended Exercises
      </Text>

      {exerciseList.length === 0 ? (
        <Text className="text-maternifyBlue text-center mt-5">
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
