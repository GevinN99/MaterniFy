import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { useRoute } from "@react-navigation/native";
import { Play, Square } from "lucide-react-native";

const exerciseDetails = () => {
    const route = useRoute();
    const { exercise } = route.params;
    const [instructions, setInstructions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const navigation = useNavigation();
    

    useEffect(() => {
      navigation.setOptions({
        title: "Mental Health Exercises",
        headerTintColor: "#333333",
        headerStyle: { backgroundColor: "#FCFCFC" }, // Add this line
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
        const loadExerciseDetails = async () => {
          try {
            if (exercise.instructions) {
              //Split instructions into lines
              const sentences = exercise.instructions.split(". ");
              setInstructions(sentences.filter(sentence => sentence.trim() !== ""));
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
          <SafeAreaView className="flex-1 justify-center items-center bg-[#FCFCFC]">
            <ActivityIndicator size="large" color="#A3C8E8" />
          </SafeAreaView>
        );
      }
    
      return (
        <SafeAreaView className="flex-1 bg-[#A3C8E8] p-4">
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                {/* Title */}
                <View className="items-center mt-4">
                    <Text className="text-2xl font-bold text-[#265D9C]">{exercise.title}</Text>
                    <Text className="text-sm text-[#555555] mt-1">{exercise.duration} minutes</Text>
                </View>

                {/* Image */}
                <View className="items-center mt-4">
                    <Image
                      source={require("../assets/images/epds1.png")}
                      className="w-60 h-60 mb-4"
                      resizeMode="contain"
                    />
                </View>

                {/* Description Box */}
                <View className="bg-[#FCFCFC] p-4 rounded-2xl shadow-md mt-4 mx-4">
                    <Text className="text-[#333333]">{exercise.description}</Text>
                </View>

                {/* Instructions Header */}
                <Text className="text-lg font-semibold text-[#265D9C] mt-4 mb-2 mx-4">Instructions:</Text>

                {/* Bullet Points */}
                <View className="mb-5 mx-4">
                    {instructions.map((line, idx) => (
                        <View key={idx} className="flex-row items-start mb-2">
                            <Text className="text-[#265D9C] mr-2">•</Text>
                            <Text className="text-[#333333] flex-1">{line.trim()}</Text>
                        </View>
                    ))}
                </View>

                {/* Play / Stop Buttons */}
                <View className="flex-row justify-center space-x-4 mt-6 mb-4">
                    {!isSpeaking ? (
                        <TouchableOpacity
                            onPress={handlePlayAudio}
                            className="bg-[#FDD1D4] p-4 rounded-full w-40 flex-row justify-center items-center shadow-md"
                        >
                            <Play color="white" size={20} />
                            <Text className="text-white text-center font-semibold ml-2">Play Audio</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={handleStopAudio}
                            className="bg-red-500 p-4 rounded-full w-40 flex-row justify-center items-center shadow-md"
                        >
                            <Square color="white" size={20} />
                            <Text className="text-white text-center font-semibold ml-2">Stop Audio</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
  );
};

export default exerciseDetails;