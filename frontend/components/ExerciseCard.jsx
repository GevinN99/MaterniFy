import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ExerciseCard = ({ exercise }) => {
  return (
    <TouchableOpacity className="bg-white p-4 mb-3 rounded-lg shadow-md border-l-4 border-maternifyBlue">
      <Text className="text-lg font-bold text-maternifyBlue">{exercise.title}</Text>
      <Text className="text-gray-600 mt-1">{exercise.description}</Text>
    </TouchableOpacity>
  );
};

export default ExerciseCard;
