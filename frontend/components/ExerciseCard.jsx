import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ExerciseCard = ({ exercise }) => {
    return (
        <TouchableOpacity className="bg-blue-100 p-4 mb-3 rounded-lg">
            <Text className="text-lg font-bold text-blue-800">{exercise.title}</Text>
            <Text className="text-gray-600 mt-1">{exercise.description}</Text>
        </TouchableOpacity>
    );
};

export default ExerciseCard;
