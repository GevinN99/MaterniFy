import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { questions, getRecommendations } from "../api/epdsData";

const epds = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);
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
            setSubmitted(true);
        }
    };

    const calculateScore = () => {
        return answers.reduce((sum, score) => sum + (score !== null ? score : 0), 0);
    };

    const score = calculateScore();
    const recommendations = getRecommendations(score);

    if (loading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-white">
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    if (submitted) {
        return (
            <SafeAreaView className="flex-1 bg-white p-6 justify-center">
                <Text className="text-xl font-bold text-center mb-4">Your Score: {score}</Text>
                <Text className="text-md text-center mb-6">{recommendations.message}</Text>
                {recommendations.actions.map((action, i) => (
                    <TouchableOpacity 
                        key={i} 
                        onPress={() => router.push(action.route)} 
                        className="bg-blue-500 p-3 rounded-lg mb-3"
                    >
                        <Text className="text-white text-center">{action.label}</Text>
                    </TouchableOpacity>
                ))}
            </SafeAreaView>
        );
    }

    const currentQuestion = questions?.[currentQuestionIndex] || {};

    return (
        <SafeAreaView className="flex-1 bg-white p-6 justify-center">
            <Text className="text-xl font-bold mb-6 text-center">
                Question {currentQuestionIndex + 1} of {questions?.length || 0}
            </Text>
            <Text className="text-lg font-semibold mb-4 text-center">
                {currentQuestion?.question || "Loading question..."}
            </Text>

            {currentQuestion?.options?.length > 0 ? (
                currentQuestion.options.map((option, optionIndex) => (
                    <TouchableOpacity
                        key={optionIndex}
                        onPress={() => handleAnswer(option.score)}
                        className="p-3 my-2 rounded-lg bg-gray-200"
                    >
                        <Text className="text-base text-center">{option.text}</Text>
                    </TouchableOpacity>
                ))
            ) : (
                <Text className="text-center">Loading options...</Text>
            )}
        </SafeAreaView>
    );
};

export default epds;
