import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ExerciseCard = ({ exercise }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("exerciseDetails", { exercise})} 
    className="bg-white p-4 mb-3 rounded-lg shadow-md border-l-4 border-[#F7C8E0]">
      <Text className="text-lg font-bold text-[#333333]">{exercise.title}</Text>
      <Text className="text-[#555555] mt-1">{exercise.description}</Text>
    </TouchableOpacity>
  );
};

export default ExerciseCard;