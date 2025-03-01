import React from "react"
import { View, Text, TouchableOpacity } from "react-native";
import { userRouter } from "expo-router";

function home() {
	const router = useRouter();
	return (
		<View className="flex-1 items-center justify-center bg-gray-100 px-6">
			<Text className="text-2xl font-bold text-gray-800 mb-6">Welcome to Maternify!</Text>

			<TouchableOpacity className="w-full bg-blue-300 p-6 rounded-xl shadow-md items-center" onPress={() => router.push("/epds")}>
				<Text className="text-xl font-bold text-white">EPDS Assessment</Text>
				<Text className="text-sm text-white">Take the Edinburgh Postnatal Depression Scale</Text>
			</TouchableOpacity>
		</View>
	);
}

export default home;
