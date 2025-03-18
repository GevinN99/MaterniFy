import { View, Text, StyleSheet } from "react-native"
import React, { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { TouchableOpacity } from "react-native"
import Feather from "@expo/vector-icons/Feather"

const CommunityCard = ({ community, isMember, handleJoin, handleLeave }) => {
	const { imageUrl, name, members, description, _id: communityId } = community
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
		<View className="bg-white rounded-xl mb-4 overflow-hidden shadow-sm">
			<View className="flex flex-row gap-2">
				{/* Image section */}
				{/* {renderImageOrPlaceholder()}</View> */}
				<View className="w-[100px] shadow-sm">
					{imageUrl && (
						<Image
							source={{ uri: imageUrl }}
							style={styles.communityImage}
							contentFit="cover"
							placeholder={{ blurhash }}
							transition={300}
						/>
					)}
				</View>
				
				<View className="flex-1 justify-between p-2">
					{/* Name and member count */}
					{/* <View className="flex-row justify-between items-start mb-2"> */}
					<Text className="text-base font-bold">{name}</Text>
					<View className="flex-row items-center bg-gray-100 px-2 py-1 rounded-full self-start my-2">
						<Feather
							name="users"
							size={12}
							color="#6b7280"
						/>
						<Text className="text-xs text-gray-500 ml-1">
							{members.length} {members.length === 1 ? "member" : "members"}
						</Text>
					</View>
					{/* </View> */}

					{/* Description */}
					<Text
						className="text-sm text-gray-500 leading-5"
						numberOfLines={2}
						ellipsizeMode="tail"
					>
						{description}
					</Text>
					<TouchableOpacity
						onPress={handleToggleMembership}
						className={`px-3 py-1.5 rounded-full self-end mt-4 ${
							isMember ? "bg-blue-500/10" : "border border-blue-500/20"
						}`}
					>
						{isMember ? (
							<View className="flex-row items-center">
								<Feather
									name="check"
									size={14}
									color="#3b82f6"
								/>
								<Text className="text-blue-500 font-medium text-sm ml-1">
									Joined
								</Text>
							</View>
						) : (
							<View className="flex-row items-center">
								<Feather
									name="plus"
									size={14}
									color="#3b82f6"
								/>
								<Text className="text-blue-500 font-medium text-sm ml-1">
									Join
								</Text>
							</View>
						)}
					</TouchableOpacity>
				</View>
			</View>
			{/* Membership controls */}
			{/* <View className="flex-row justify-between items-center px-4 pb-4"> */}
			{/* <Text className="text-sm text-gray-500">
					{isMember ? "You are a member" : "Join this community"}
				</Text> */}
			{/* </View> */}
		</View>
	)
}

const styles = StyleSheet.create({
	// communityImage: {
	// 	width: 100,
	// 	height: 100,
	// 	borderRadius: 10,
	// },

	communityImage: {
		width: "100%",
		height: "100%",		
		minHeight: 100,
		flex: 1,
	},
})

export default CommunityCard
