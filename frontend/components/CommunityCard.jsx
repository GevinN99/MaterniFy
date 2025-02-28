import { View, Text, StyleSheet } from "react-native"
import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"

const CommunityCard = ({ name, members, description, image }) => {
	const blurhash =
		"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["
	
	return (
		<View className="flex flex-row items-center p-4 bg-white rounded-xl shadow-sm mb-4">
			{Image && (
				<Image
					source={image}
					style={styles.communityImage}
					contentFit="cover"
					placeholder={{ blurhash }}
					transition={1000}
				/>
			)}
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
