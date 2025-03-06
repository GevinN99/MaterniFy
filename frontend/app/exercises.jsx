import { SafeAreaView, Text, View, TouchableOpacity, FlatList } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { fetchExercises } from "../api/exercisesApi";

const exercises = () => {
    const router = useRouter();
    const { score } = useLocalSearchParams(); // Get the EPDS score from query params
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const getExercises = async () => {
            const data = await fetchExercises();
            
            // Filter exercises based on the score (you can adjust this logic)
            const recommendedExercises = data.filter(exercise => {
                if (score < 5) return exercise.category === "mild";
                if (score < 10) return exercise.category === "moderate";
                return exercise.category === "severe";
            });

            setExercises(recommendedExercises);
        };
        getExercises();
    }, [score]);

    return (
        <SafeAreaView className="flex-1 bg-white p-6 justify-center">
            <Text className="text-xl font-bold text-center mb-4">Recommended Exercises</Text>

            <FlatList
                data={exercises}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        className="p-3 bg-blue-500 rounded-lg mb-3"
                        onPress={() => router.push(`/exercise-details?id=${item._id}`)}
                    >
                        <Text className="text-white text-center">{item.title}</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
};

export default exercises;
