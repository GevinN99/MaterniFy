import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Image, ScrollView, Animated, Easing } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import axiosInstance from "../api/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { questions, getRecommendations, getEncourageingMessage, getPersonalizedSelfCareTips } from "../api/epdsData";
import { Ionicons } from "@expo/vector-icons";

const AnimatedHeart = ({ score }) => {
    const fillAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fillAnim, {
            toValue: score / 30,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    }, [score]);

    return (
        <View className="relative items-center my-5">
            <View className="w-24 h-24 border-2 border-[#B4E4FF] bg-[#EAEFF4] rounded-full overflow-hidden">
                <Animated.View
                    style={{
                        height: fillAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["0%", "100%"],
                        }),
                        backgroundColor: score >= 27 ? "#FF0000" : "#E1AFD1",
                        width: "100%",
                        position: "absolute",
                        bottom: 0,
                    }}
                />
            </View>
            {score >= 27 && <Text className="text-red-600 text-lg font-bold">💔</Text>}
        </View>
    );
};

const epds = () => {
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
            <SafeAreaView className="flex-1 items-center justify-center bg-[#FCFCFC]">
                <ActivityIndicator size="large" color="#A3C8E8" />
            </SafeAreaView>
        );
    }

    if (submitted) {
      const encouragingMessage = getEncourageingMessage(score);
      const personalizedSelfCareTips = getPersonalizedSelfCareTips(score);
        return (
          <SafeAreaView className="flex-1 bg-[#FCFCFC] p-6">
            <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 20 }}>
                {/* Header with Background Image */}
                <View className="w-full items-center mt-5">
                    <Text className="text-4l font-bold text-[#333333] mb-2">
                        Your Postpartum Depression Score
                    </Text>
                </View>
            {/* Score Display */}
            <View className="bg-[#EAEFF4] p-8 rounded-xl w-11/12 items-center mb-5">
                <AnimatedHeart score={score} />
                <Text className="text-3xl font-bold text-[#333333] mb-2">Your Score: {score}</Text>
                <Text className="text-base text-[#555555] text-center">{recommendations.message}</Text>
            </View>
            
            {/* Personalized Encouraging Message */}
            <View className="bg-[#B4E4FF] p-6 rounded-2xl w-11/12 mb-6 opacity-80">
                <Text className="text-base text-[#333333] text-center font-medium">
                {encouragingMessage}
                </Text>
            </View>

            {/* Self-Care Tips */}
            <View className="w-11/12 items-center">
                <Text className="text-xl font-semibold text-[#555555] mb-4">
                Self-Care Tips:
                </Text>
                {personalizedSelfCareTips.map((tip, i) => (
                <View
                    key={i}
                    className="bg-white p-5 rounded-xl mb-4 shadow-md border border-[#EAEFF4] flex-row items-center"
                >
                <Ionicons name={tip.icon} size={24} color="#F7C8E0" className="mr-4" />
                <View className="flex-1">
                    <Text className="text-base text-[#333333] font-medium">
                        {tip.text}
                    </Text>
                    {tip.link && (
                    <TouchableOpacity onPress={() => Linking.openURL(tip.link)}>
                        <Text className="text-base text-[#7469B6] underline mt-1">
                            Learn More
                        </Text>
                    </TouchableOpacity>
                    )}
                </View>
                </View>
                ))}
                </View>

             {recommendations.actions.map((action, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => router.push(`/exercises?score=${score}`)}
                  className="bg-[#E1AFD1] p-4 rounded-md w-11/12 items-center mt-3"
                >
                <Text className="text-base font-medium text-[#333333]">{action.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </SafeAreaView>             
      );
    }

    const currentQuestion = questions[currentQuestionIndex] || {};
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    
    return (
      <SafeAreaView className="flex-1 bg-[#B4E4FF]">
        <View className="flex-row items-center justify-between p-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#333333" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-[#333333]">EPDS Quiz</Text>
          <View style={{ width: 24 }} />
        </View>
    
        <ScrollView className="flex-1 p-4">
          <View className="mb-6">
            <View className="w-full bg-[#EAEFF4] h-2 rounded-full">
              <View className="bg-[#F7C8E0] h-2 rounded-full" style={{ width: `${progress}%` }} />
            </View>
          </View>

          <View className="p-4 justify-center items-center">
            <Text className="text-lg font-semibold text-[#333333] mb-2">
                Question {currentQuestionIndex + 1} of {questions.length}
            </Text>
          </View>
    
          <View className="flex-1 justify-center items-center">
            <View className="bg-[#B4E4FF] shadow-md p-6 rounded-lg w-full max-w-md">
              {/* Display the image in a circular frame */}
              {currentQuestion.image && (
                <View className="items-center mb-4">
                  <Image 
                    source={currentQuestion.image} 
                    className="w-32 h-32 rounded-full border-2 border-dotted border-[#F7C8E0]" 
                    resizeMode="cover"
                  />
                </View>
              )}
              
              <Text className="text-xl font-semibold mb-4 text-center text-[#333333]">
                {currentQuestion?.question || "Loading question..."}
              </Text>
              {currentQuestion?.options?.length > 0 ? (
                currentQuestion.options.map((option, optionIndex) => (
                  <TouchableOpacity
                    key={optionIndex}
                    onPress={() => handleAnswer(option.score)}
                    className="p-4 my-2 rounded-md bg-gray-100 border border-gray-300"
                  >
                    <Text className="text-base text-center text-[#A555555]">
                      {option.text}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text className="text-center text-[#555555]">Loading options...</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
}    

export default epds;
