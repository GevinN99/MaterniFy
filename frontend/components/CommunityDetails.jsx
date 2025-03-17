import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Pressable,
} from "react-native"
import React, { useState, useEffect } from "react"
import { Image } from "expo-image"
import getUserId from "../utils/getUserId"
import Feather from "@expo/vector-icons/Feather"
import Ionicons from "@expo/vector-icons/Ionicons"
import { deleteCommunityById } from "../api/communityApi"
import { useCommunity } from "../context/communityContext"
import { useRouter } from "expo-router"

const CommunityDetails = ({ community, handleJoin, handleLeave }) => {
	const { imageUrl, name, description, admin, members } = community
	const [userId, setUserId] = useState("")
	const [isMember, setIsMember] = useState(false)
	const [showMenu, setShowMenu] = useState(false)
	const { fetchData } = useCommunity()
	const router = useRouter()

	const blurhash =
		"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["

	useEffect(() => {
		const fetchUserId = async () => {
			const id = await getUserId()
			setUserId(id)
			setIsMember(members?.includes(id))
		}

		fetchUserId()
	}, [members])

	const isAdmin = admin?._id === userId

	const handleJoinCommunity = () => {
		handleJoin(community._id)
		setIsMember(true)
	}

	const handleLeaveCommunity = () => {
		handleLeave(community._id)
		setIsMember(false)
	}

	const onToggleMenu = () => {
		setShowMenu(!showMenu)
	}

	const onDelete = async () => {
		try {
			const response = await deleteCommunityById(community._id)
			console.log(response)
			router.push("/communities")
			fetchData()
		} catch (error) {
			console.error(error)
		}
		
	}

	return (
		<View className="relative flex-1 bg-white rounded-lg p-4">
			<View className="bg-blue-100 pt-6 pb-14 px-4 rounded-lg relative">
				<Text className="text-2xl font-bold text-center">{name}</Text>
				<View className="flex flex-row items-center justify-center gap-1.5 mt-1">
					<Feather
						name="users"
						size={16}
						color="#6b7280"
					/>
					<Text className="text-gray-500">
						{members?.length || 0}{" "}
						{members?.length === 1 ? "member" : "members"}
					</Text>
				</View>
			</View>

			{/* Community Image */}
			<View className="flex justify-center items-center -mt-10 mb-4 ">
				<View className="rounded-xl overflow-hidden border-4 border-white shadow-md">
					<Image
						source={{ uri: imageUrl || "https://via.placeholder.com/100" }}
						style={styles.communityImage}
						contentFit="cover"
						placeholder={{ blurhash }}
						transition={300}
					/>
				</View>
			</View>

			<View className="px-5">
				<Text className="text-center text-gray-600 mb-6">{description}</Text>

				<View className="bg-white border border-gray-400 rounded-xl p-3 mb-6 flex flex-row justify-center items-center gap-3 z-50">
					<Image
						source={{
							uri: admin?.profileImage,
						}}
						style={styles.adminImage}
						contentFit="cover"
						placeholder={{ blurhash }}
						transition={300}
					/>
					<View className="flex-1">
						<View className="flex flex-row items-center gap-2">
							<Text className="font-medium">{admin?.fullName}</Text>
							<Ionicons
								name="shield-checkmark-outline"
								size={14}
								color="#3b82f6"
							/>
						</View>
						<Text className="text-xs text-gray-500">
							Community Administrator
						</Text>
					</View>
					{isAdmin && (
						<Pressable onPress={onToggleMenu}>
							<Feather
								name="more-vertical"
								size={18}
							/>
						</Pressable>
					)}

					{showMenu && (
						<View className="absolute top-8 right-8 z-30 rounded-md shadow-md p-1 bg-white">
							<TouchableOpacity className="p-2 rounded-md flex flex-row gap-2 items-center hover:bg-slate-100">
								<Feather
									name="edit"
									size={20}
									// color={"#3b82f6"}
								/>
								<Text>Update Community</Text>
							</TouchableOpacity>
							<TouchableOpacity
								className="p-2 rounded-md flex flex-row gap-2 items-center hover:bg-slate-100"
								onPress={onDelete}
							>
								<Feather
									name="trash"
									size={20}
									// color="#ef4444"
								/>
								<Text>Delete Community</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>

				{!isAdmin && (
					<View className="flex flex-col gap-3">
						<TouchableOpacity
							onPress={isMember ? handleLeaveCommunity : handleJoinCommunity}
							className={`w-full h-12 rounded-xl flex items-center justify-center ${
								isMember ? "border border-red-500" : "border border-blue-500"
							}`}
						>
							<Text
								className={`text-base font-medium ${
									isMember ? "text-red-500" : "text-blue-500"
								}`}
							>
								{isMember ? "Leave Community" : "Join Community"}
							</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	communityImage: {
		width: 100,
		height: 100,
		borderRadius: 10,
	},
	adminImage: {
		width: 40,
		height: 40,
		borderRadius: 50,
	},
})

export default CommunityDetails
