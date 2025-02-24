import { View, Text, Image, StyleSheet } from "react-native"
import React from "react"
import { Ionicons } from "@expo/vector-icons"

const CommunityCard = ({ name, members, description, image }) => {
	return (
		<View className="flex flex-row items-center p-4 bg-white rounded-xl shadow-sm mb-4">
			<Image
				source={image}
				style={styles.communityImage}
			/>
			<View className="flex-1 ml-4">
				<Text className="font-medium">{name}</Text>
				<Text className="font-light">{members} members</Text>
				<Text
					className="mt-1"
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{description}
				</Text>
			</View>
			<View className="bg-[#6DE6FF] border-2 border-black rounded-full ml-4  truncate">
				<Ionicons
					name="remove-outline"
					size={24}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	communityImage: {
		width: 70,
		height: 70,
		borderRadius: 10,
	},
})

export default CommunityCard
