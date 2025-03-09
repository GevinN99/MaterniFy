import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Speech from "expo-speech";
import { useRoute } from "@react-navigation/native";

const exerciseDetails = () => {
    const route = useRoute();
    const { exercise } = route.params;
    const [detailedText, setDetailedText] = useState("");
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchExerciseDetails = async () => {
            try {
                const text = exercise.description + " This exercise helps improve mental well-being by promoting relaxation and reducing stress. Follow the instruction carfully for best results.";
                setDetailedText(text);
            } catch (error) {
                console.error("Error fetching exercise details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExerciseDetails();
    }, [exercise]);

    const handlePlayAudio = () => {
        Speech.speak(detailedText, {
            language: "en-US",
            pitch: 1.0,
            rate: 1.0,
        });
    };

    if (loading) {
        return <ActivityIndicator size="large" className="mt-10" color="#0077B6" />;
    }

    return (
        <SafeAreaView className="flex-1 bg-maternifyWhite p-5">
            <Text className="text-xl font-bold text-maternifyBlue text-center mb-4">
                {exercise.title}
            </Text>

            <Text className="text-gray-600 mt-1">{detailedText}</Text>

            <TouchableOpacity
                onPress={handlePlayAudio}
                className="bg-maternifyBlue p-3 mt-5 rounded-lg shadow-md">
                <Text className="text-white text-center">Play Audio</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default exerciseDetails;