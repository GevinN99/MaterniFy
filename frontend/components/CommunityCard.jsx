import { View, Text, StyleSheet } from "react-native"
import React, { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { TouchableOpacity } from "react-native"

const CommunityCard = ({
	community,
	isMember,
	handleJoin,
	handleLeave
}) => {
	// if (!community) {
	// 	return null
	// }
	const { imageUrl, name, members, description, _id:communityId } = community
	const blurhash =
		"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["

	const handleToggleMembership = () => {
		if (isMember) {
			handleLeave(communityId)
		} else {
			handleJoin(communityId)
		}		
	}	

	return (
		<View className="flex flex-row items-center p-4 bg-white rounded-xl shadow-sm mb-4">
			{imageUrl && (
				<Image
					source={{ uri: imageUrl }}
					style={styles.communityImage}
					contentFit="cover"
					placeholder={{ blurhash }}
					transition={1000}
				/>
			)}
			<View className="flex-1 ml-4">
				<Text className="font-medium">{name}</Text>
				<Text className="font-light">{members.length} {members.length===1 ? "member" : "members"}</Text>
				<Text
					className="mt-1"
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{description}
				</Text>
			</View>

			<TouchableOpacity
				onPress={handleToggleMembership}
				className={"border-2 border-black rounded-full ml-4 p-2"}
			>
				<Ionicons
					name={isMember ? "remove-outline" : "add-outline"}
					size={24}					
				/>
			</TouchableOpacity>
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
