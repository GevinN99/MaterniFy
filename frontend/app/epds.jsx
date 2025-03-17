import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import axiosInstance from "../api/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { questions, getRecommendations } from "../api/epdsData";

const epds = () => {
    const AP_URL = "http://10.31.30.84:8070/api/quizzes";
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (questions && Array.isArray(questions)) {
            setAnswers(Array(questions.length).fill(null));
            setLoading(false);
        } else {
            console.error("Questions data is invalid:", questions);
            setLoading(false);
        }
    }, []);

    const handleAnswer = (score) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = score;
        setAnswers(newAnswers);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            const finalScore = newAnswers.reduce((sum, score) => sum + (score !== null ? score : 0), 0);
            setScore(finalScore);
            setSubmitted(true);
            saveResponses(newAnswers, finalScore);
        }
    };

    const saveResponses = async (answers, totalScore) => {
        try {
            console.log("Saving responses:", answers);

            const userId = await AsyncStorage.getItem("userId");
            if(!userId){
              console.warn("User Id not found");
            }
            if (!questions || !Array.isArray(questions)) {
              console.error("Questions data is not properly loaded:", questions);
              return;
          }

            const formattedResponses = answers.map((score, index) => {
                const question = questions[index];
                return{
                  question: question?.question || "Unknown question",
                  selectedOption: question?.options?.find(opt => opt.score === score)?.text || "Unknown",
                  score: score ?? 0
                };
            });

            const payload = {
                userId: userId || "guest",
                responses: formattedResponses,
                totalScore
            };

            console.log("Payload to send:", payload);

            const response = await axiosInstance.post("/quizzes/submit-response", payload
                // headers: { "Content-Type": "application/json" }
            );
            console.log("Response saved successfully:", response.data);
        } catch (error) {
            console.error("Error saving responses:", error.response?.data || error.message);
        }
    };

    const recommendations = getRecommendations(score);

    if (loading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-[#f0f4f8]">
                <ActivityIndicator size="large" color="#0077b6" />
            </SafeAreaView>
        );
    }

    if (submitted) {
        return (
            <SafeAreaView className="flex-1 bg-[#f0f4f8] p-6 justify-center items-center mt-4 mb-4">
                <Image source={require('../assets/images/epdsHome.jpeg')} className="w-40 h-40 rounded-full mb-4" resizeMode="cover" />
                <Text className="text-xl font-bold text-center mb-5">Your Score: {score}</Text>
                <Text className="text-md text-center mb-6 text-[#3c6e71]">{recommendations.message}</Text>
                {recommendations.actions.map((action, i) => (
                    <TouchableOpacity 
                        key={i} 
                        onPress={() => router.push(`/exercises?score=${score}`)} 
                        className="bg-[#0077b6] py-3 px-6 rounded-lg mb-3"
                    >
                        <Text className="text-white text-center">{action.label}</Text>
                    </TouchableOpacity>
                ))}
            </SafeAreaView>
        );
    }

    const currentQuestion = questions?.[currentQuestionIndex] || {};
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <SafeAreaView className="flex-1 bg-[#f0f4f8] p-4">
          <View className="flex-1 justify-center">
            <View className="mb-6">
              <View className="w-full bg-gray-200 h-2 rounded-full">
                <View className="bg-[#0077b6] h-2 rounded-full" style={{ width: `${progress}%` }} />
              </View>
              <Text className="text-lg font-bold text-center text-[#005f73] mt-3">
                Question {currentQuestionIndex + 1} of {questions?.length || 0}
              </Text>
            </View>
            <View className="bg-white shadow-md p-6 rounded-lg">
              <Text className="text-xl font-semibold mb-4 text-center text-[#3c6e71]">
                {currentQuestion?.question || "Loading question..."}
              </Text>
              {currentQuestion?.options?.length > 0 ? (
                currentQuestion.options.map((option, optionIndex) => (
                  <TouchableOpacity
                    key={optionIndex}
                    onPress={() => handleAnswer(option.score)}
                    className="p-4 my-2 rounded-md bg-gray-100 border border-gray-300"
                  >
                    <Text className="text-base text-center text-[#0077b6]">
                      {option.text}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text className="text-center text-[#3c6e71]">Loading options...</Text>
              )}
            </View>
          </View>
        </SafeAreaView>
      );
};

export default epds;
