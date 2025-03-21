import { View, Text, StyleSheet } from "react-native"
import React, { useState, useContext } from "react"
import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { TouchableOpacity } from "react-native"
import Feather from "@expo/vector-icons/Feather"
import { AuthContext } from "../context/AuthContext"

const CommunityCard = ({ community, isMember, handleJoin, handleLeave }) => {
	const { userId } = useContext(AuthContext)
	const {
		imageUrl,
		name,
		members,
		description,
		_id: communityId,
		admin,
	} = community
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
					<Text className="text-lg font-bold">{name}</Text>
					<View className="flex-row items-center bg-gray-100 px-2 py-2 -ml-1 rounded-full self-start my-2">
						<Feather
							name="users"
							size={12}
							color="#6b7280"
						/>
						<Text className="text-sm text-gray-500 ml-1">
							{members.length} {members.length === 1 ? "member" : "members"}
						</Text>
					</View>
					{/* </View> */}

					{/* Description */}
					<Text
						className="text-base text-gray-500 leading-5"
						numberOfLines={2}
						ellipsizeMode="tail"
					>
						{description}
					</Text>
					{/* <View className="flex flex-row justify-between mt-4">						 */}
					{admin === userId ? (
						<View className="flex-row mt-4 self-end items-center px-3 py-1.5 rounded-full border border-green-500/20 bg-green-500/10">
							<Ionicons
								name="shield-checkmark-outline"
								size={14}
								color="#22c55e"
							/>
							<Text className="text-green-500 font-medium text-base ml-2">
								Admin
							</Text>
						</View>
					) : (
						<TouchableOpacity
							onPress={handleToggleMembership}
							className={`px-3 py-1.5 mt-4 self-end rounded-full border border-blue-500/20 ${
								isMember ? "bg-blue-500/10" : ""
							}`}
						>
							{isMember ? (
								<View className="flex-row items-center">
									<Feather
										name="check"
										size={14}
										color="#3b82f6"
									/>
									<Text className="text-blue-500 font-medium text-base ml-1">
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
									<Text className="text-blue-500 font-medium text-base ml-1">
										Join
									</Text>
								</View>
							)}
						</TouchableOpacity>
					)}					
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({	
	communityImage: {
		width: "100%",
		height: "100%",
		minHeight: 100,
		flex: 1,
	},
})

export default CommunityCard