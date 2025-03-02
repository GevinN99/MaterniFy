import { View, Text, SafeAreaView, ScrollView } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import React from "react"

const communityUserProfile = () => {
	const { userId } = useLocalSearchParams()
	return (
		<SafeAreaView className="flex-1 bg-[#E7EDEF]">
			<ScrollView className="px-4">				
			</ScrollView>
		</SafeAreaView>
	)
}

export default communityUserProfile
