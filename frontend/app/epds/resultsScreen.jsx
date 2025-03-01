import { view, Text, TouchableOpacity } from "react-native";
import { useEpds } from "./epdsContext";
import { useNavigation } from "@react-navigation/native";

const ResultsScreen = () => {
    const { score, calculateScore } = useEpds();
    const navigation = useNavigation();

    return (
        <View className="flex-1 items-center justify-center bg-gray-100 px-6">
            <Text className="text-2xl font-bold text-gray-800 mb-6">EPDS Results</Text>
            <Text className="text-lg font-semibold text-gray-800 mb-6">Your score is {score}</Text>

            <Text className="text-lg font-semibold text-gray-800 mb-6">
                {score < 10 ? 
                "You are not likely to be suffering from depression" : score < 15 
                ? "You may be suffering from depression" : 
                "You are likely to be suffering from depression .Please seek medical Help" 
                }
            </Text>

            <TouchableOpacity className="w-full bg-blue-300 p-6 rounded-xl shadow-md items-center" onPress={() => navigation.navigate("Home")}>
                <Text className="text-lg font-bold text-white">Home</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ResultsScreen;