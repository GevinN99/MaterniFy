import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Speech from "expo-speech";
import { useRoute } from "@react-navigation/native";
import { Play, Square } from "lucide-react-native";

const exerciseDetails = () => {
    const route = useRoute();
    const { exercise } = route.params;
    const [instructions, setInstructions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSpeaking, setIsSpeaking] = useState(false);
    
    useEffect(() => {
        const loadExerciseDetails = async () => {
          try {
            // If your DB stores instructions with line breaks, split them here
            // e.g. "Line1\nLine2\nLine3"
            // We'll split into an array for bullet points
            if (exercise.instructions) {
              const lines = exercise.instructions.split(/\r?\n/);
              setInstructions(lines);
            } else {
              setInstructions([]);
            }
          } catch (error) {
            console.error("Error loading exercise details:", error);
          } finally {
            setLoading(false);
          }
        };
    
        loadExerciseDetails();
      }, [exercise]);
    
      const handlePlayAudio = () => {
        setIsSpeaking(true);
        const combinedText = `${exercise.title}. ${exercise.description}. ${exercise.instructions}`;
        Speech.speak(combinedText, {
          language: "en-US",
          pitch: 1.0,
          rate: 1.0,
          onDone: () => setIsSpeaking(false),
          onStopped: () => setIsSpeaking(false),
          onError: () => setIsSpeaking(false),
        });
      };
    
      const handleStopAudio = () => {
        Speech.stop();
        setIsSpeaking(false);
      };
    
      if (loading) {
        return (
          <SafeAreaView className="flex-1 justify-center items-center bg-white">
            <ActivityIndicator size="large" color="#0077B6" />
          </SafeAreaView>
        );
      }
    
      return (
        <SafeAreaView className="flex-1 bg-maternifyWhite p-5">
          {/* Title */}
          <Text className="text-2xl font-bold text-maternifyBlue text-center mb-4">
            {exercise.title}
          </Text>
    
         {/* Description Box */}
         <View className="bg-maternifyLightBlue p-4 rounded-2xl shadow-md">
          <Text className="text-gray-700">{exercise.description}</Text>
         </View>
    
          {/* Instructions Header */}
          <Text className="text-lg font-semibold text-maternifyBlue mb-2">
            Instructions:
          </Text>
    
          {/* Bullet Points */}
          <View className="mb-5">
            {instructions.map((line, idx) => (
              <View key={idx} className="flex-row items-start mb-2">
                <Text className="text-maternifyBlue mr-2">•</Text>
                <Text className="text-gray-700 flex-1">{line}</Text>
              </View>
            ))}
          </View>
    
          {/* Play / Stop Buttons */}
          <View className="flex-row justify-center space-x-4 mt-6">
        {!isSpeaking ? (
          <TouchableOpacity
            onPress={handlePlayAudio}
            className="bg-maternifyBlue p-4 rounded-full w-40 flex-row justify-center items-center shadow-md"
          >
            <Play color="white" size={20} />
            <Text className="text-white text-center font-semibold ml-2">
              Play Audio
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStopAudio}
            className="bg-red-500 p-4 rounded-full w-40 flex-row justify-center items-center shadow-md"
          >
            <Square color="white" size={20} />
            <Text className="text-white text-center font-semibold ml-2">
              Stop Audio
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default exerciseDetails;