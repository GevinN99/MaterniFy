import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import React, { useState } from "react"
import Feather from "@expo/vector-icons/Feather"

const communityUserProfile = () => {
	const { userId } = useLocalSearchParams()	
	return (
		<SafeAreaView className="flex-1 bg-[#E7EDEF] p-2">
			<View className="relative bg-white p-4">
				<View className="bg-blue-100 pt-6 pb-16 px-4 rounded-lg relative">
					<Text className="text-2xl font-bold text-center">Chamika Banu</Text>
				</View>

				{/* Community Image */}
				<View className="flex justify-center items-center -mt-10 mb-4 ">
					<View className="rounded-full overflow-hidden border-4 border-white shadow-md">
						<Image
							source={{
								uri: "https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
							}}
							style={styles.profileImage}
							contentFit="cover"
							transition={300}
						/>
					</View>
				</View>

				<View className="flex-row justify-center gap-6 mt-4">
					<View className="flex items-center">
						<Text className="text-xl font-semibold">12</Text>
						<Text className="text-sm text-gray-500">Communities</Text>
					</View>
					<View className="flex items-center">
						<Text className="text-xl font-semibold">5</Text>
						<Text className="text-sm text-gray-500">Posts</Text>
					</View>
				</View>
			</View>			

			{/* <View className="mt-10 rounded-xl flex-1"> */}
			{/* </View> */}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	profileImage: {
		width: 80,
		height: 80,
		borderRadius: 50,
	},
})

export default communityUserProfile
