import { View, Text, TouchableOpacity } from "react-native";
import { useEpds } from "./epds/epdsContext";
import { EpdsQuestions } from "./epdsQuestions";
import { useState } from "react";
import { useRouter } from "expo-router";

const epdsScreen = () => {
    const { responses, updateResponse } = useEpds();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const router = useRouter();

    const handleOptionClick = (score) => {
        updateResponse(currentQuestion, score);

        if (currentQuestion < EpdsQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            router.push("epdsResults");
        }   
    };


    return (
        <View className="flex-1 items-center justify-center bg-gray-100 px-6">
            <Text className="text-2xl font-bold text-gray-800 mb-6">EPDS Assessment</Text>
            <Text className="text-lg font-semibold text-gray-800 mb-6">{EpdsQuestions[currentQuestion].question}</Text>

            {EpdsQuestions[currentQuestion].options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    className="w-full bg-blue-300 p-6 rounded-xl shadow-md items-center mb-4"
                    onPress={() => handleOptionClick(option.score)}
                >
                    <Text className="text-lg font-bold text-white">{option.text}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
};
            

export default epdsScreen;