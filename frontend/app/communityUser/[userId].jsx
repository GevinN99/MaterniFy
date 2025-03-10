import { View, Text, SafeAreaView, ScrollView } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import React from "react"

const communityUserProfile = () => {
	const { userId } = useLocalSearchParams()
	return (
		<SafeAreaView className="flex-1 bg-[#E7EDEF]">
			<ScrollView className="px-4">	
				<View>
					<Text className="text-xl font-semibold mt-4">User Profile</Text>
					<View className="flex flex-row items-center">
						<Ionicons name="person-circle-outline" size={50} color="black" />
						<Text className="text-xl font-semibold ml-4">{userId}</Text>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default communityUserProfile
