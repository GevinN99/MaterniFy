import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { questions, getRecommendations } from "../api/epdsData";

const epds = () => {
    const [answers, setAnswers] = useState(Array(10).fill(null));
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();

    const handleAnswer = (questionIndex, score) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = score;
        setAnswers(newAnswers);
    };

    const calculateScore = () => {
        return answers.reduce((sum, score) => sum + (score !== null ? score : 0), 0);
    };

    const handleSubmit = () => {
        if (answers.includes(null)) {
            alert("Please answer all questions before submitting");
            return;
        }
        setSubmitted(true);
    };

    const score = calculateScore();
    const recommendations = getRecommendations(score);

    return (
        <SafeAreaView className="flex-1 bg-white p-4">
          <ScrollView>
            <Text className="text-xl font-bold mb-4 text-center">Edinburgh Postnatal Depression Scale (EPDS)</Text>
            {questions.map((q, index) => (
              <View key={index} className="mb-4">
                <Text className="text-lg font-semibold">{index + 1}. {q.question}</Text>
                {q.options.map((option, optionIndex) => (
                  <TouchableOpacity
                    key={optionIndex}
                    onPress={() => handleAnswer(index, option.score)}
                    className={`p-3 my-1 rounded-lg ${answers[index] === option.score ? 'bg-blue-500' : 'bg-gray-200'}`}
                  >
                    <Text className="text-base">{option.text}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
    
            {!submitted ? (
              <TouchableOpacity
                onPress={handleSubmit}
                className="bg-green-500 p-4 rounded-lg mt-4"
              >
                <Text className="text-white text-center text-lg font-bold">Submit</Text>
              </TouchableOpacity>
            ) : (
              <View className="mt-6">
                <Text className="text-lg font-bold text-center">Your Score: {score}</Text>
                <Text className="text-md text-center mt-2">{recommendations.message}</Text>
                {recommendations.actions.map((action, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => router.push(action.route)}
                    className="bg-blue-500 p-3 rounded-lg mt-3"
                  >
                    <Text className="text-white text-center">{action.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      );
    };
    
    export default epds;