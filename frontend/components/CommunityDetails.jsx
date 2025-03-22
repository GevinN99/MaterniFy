import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Pressable,
} from "react-native"
import React, { useState, useEffect, useContext } from "react"
import { Image } from "expo-image"
import Feather from "@expo/vector-icons/Feather"
import Ionicons from "@expo/vector-icons/Ionicons"
import { deleteCommunityById } from "../api/communityApi"
import { useCommunity } from "../context/communityContext"
import { useRouter } from "expo-router"
import { AuthContext } from "../context/AuthContext"
import CreateCommunity from "./CreateCommunity"
import { deleteImageFromFirebase } from "../utils/firebaseImage"
import { DEFAULT_COMMUNITY_IMAGE_URL } from "../utils/constants"
import LoadingSpinner from "./LoadingSpinner"

const CommunityDetails = ({
	community,
	handleJoin,
	handleLeave,	
}) => {
	const blurhash = "LCKMX[}@I:OE00Eg$%Na0eNHWp-B"
	const { userId } = useContext(AuthContext)
	const [loading, setLoading] = useState(false)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [communityDetails, setCommunityDetails] = useState(community)
	let { imageUrl, name, description, admin, members, posts } = communityDetails
	const [isMember, setIsMember] = useState(members?.includes(userId)) // Check if user is a member
	const [showMenu, setShowMenu] = useState(false)
	const { fetchData } = useCommunity()
	const router = useRouter()

	const isAdmin = admin._id === userId // Check if the current user is the community admin

	const handleJoinCommunity = () => {
		setCommunityDetails((prev) => ({
			...prev,
			members: [...prev.members, userId], // Add the user to the members list
		}))
		handleJoin(community._id)
		setIsMember(true)
	}

	const handleLeaveCommunity = () => {
		setCommunityDetails((prev) => ({
			...prev,
			members: prev.members.filter((memberId) => memberId !== userId), // Remove the user from the members list
		}))
		handleLeave(community._id)
		setIsMember(false)
	}

	const onToggleMenu = () => {
		setShowMenu(!showMenu)
	}

	const onUpdate = () => {
		setIsModalVisible(true)
		onToggleMenu()
	}

	const onDelete = async () => {
		try {
			setLoading(true)
			const response = await deleteCommunityById(communityDetails._id)
			// Delete community image from Firebase if it's not the default image
			if (communityDetails.imageUrl !== DEFAULT_COMMUNITY_IMAGE_URL) {
				await deleteImageFromFirebase(communityDetails.imageUrl, "community")
			} else {
				console.log("image is default. not deleted")
			}

			// Delete all post images related to the community
			const posts = communityDetails.posts
			for (const post of posts) {
				if (post.imageUrl) {
					await deleteImageFromFirebase(post.imageUrl, "post")
				}
			}
			router.push("/communities")
			fetchData()
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<View className="relative flex-1 bg-white rounded-lg p-4">
			<View className="bg-blue-100 pt-6 pb-14 px-4 rounded-lg relative">
				<Text className="text-2xl font-bold text-center">{name}</Text>
				<View className="mt-1 flex flex-row justify-center items-center gap-4">
					<View className="flex flex-row items-center gap-1.5 ">
						<Feather
							name="users"
							size={16}
							color="#6b7280"
						/>
						<Text className="text-gray-500 text-base">
							{members?.length || 0}{" "}
							{members?.length === 1 ? "member" : "members"}
						</Text>
					</View>
					<View className="flex flex-row items-center gap-1.5 ">
						<Feather
							name="file-text"
							size={16}
							color="#6b7280"
						/>
						<Text className="text-gray-500 text-base">
							{posts?.length || 0} {posts?.length === 1 ? "post" : "posts"}
						</Text>
					</View>
				</View>
			</View>

			{/* Community Image */}
			<View className="flex justify-center items-center -mt-10 mb-4 ">
				<View className="rounded-xl overflow-hidden border-4 border-white shadow-md">
					<Image
						source={{ uri: imageUrl }}
						style={styles.communityImage}
						contentFit="cover"
						placeholder={{ blurhash }}
						transition={300}
					/>
				</View>
			</View>

			{/* Community Description */}
			<View className="px-5">
				<Text className="text-center text-lg text-gray-600 mb-6">
					{description}
				</Text>

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
							<Text className="text-lg">{admin?.fullName}</Text>
							<Ionicons
								name="shield-checkmark-outline"
								size={14}
								color="#22c55e"
							/>
						</View>
						<Text className="text-sm text-gray-500">
							Community Administrator
						</Text>
					</View>
					{/* Admin Actions Menu */}
					{isAdmin && (
						<Pressable onPress={onToggleMenu}>
							<Feather
								name="more-vertical"
								size={18}
							/>
						</Pressable>
					)}

					{/* Dropdown Menu for Admin Actions */}
					{showMenu && (
						<View className="absolute top-5 right-10 z-30 rounded-md shadow-md bg-white">
							<TouchableOpacity
								className="p-3 rounded-md flex flex-row gap-2 items-center hover:bg-slate-100"
								onPress={onUpdate}
							>
								<Feather
									name="edit"
									size={20}
								/>
								<Text>Update Community</Text>
							</TouchableOpacity>
							<TouchableOpacity
								className="p-3 rounded-md flex flex-row gap-2 items-center hover:bg-slate-100"
								onPress={onDelete}
								disabled={loading}
							>
								{loading ? (
									// Show a loading indicator if the delete action is in progress
									<LoadingSpinner/>
								) : (
									// Show the delete icon and text if not loading
									<>
										<Feather
											name="trash"
											size={20}
											color={"#ef4444"}
										/>
										<Text className="text-red-500">Delete Community</Text>
									</>
								)}
							</TouchableOpacity>
						</View>
					)}
				</View>

				{/* Join/Leave Button for Members */}
				{!isAdmin && (
					<View className="flex flex-col gap-3">
						<TouchableOpacity
							onPress={isMember ? handleLeaveCommunity : handleJoinCommunity}
							className={`w-full h-12 rounded-xl flex items-center justify-center ${
								isMember ? "border border-red-500" : "border border-blue-500"
							}`}
						>
							<Text
								className={`text-lg font-medium ${
									isMember ? "text-red-500" : "text-blue-500"
								}`}
							>
								{isMember ? "Leave Community" : "Join Community"}
							</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
			{/* Community Update Modal */}
			<CreateCommunity
				editing={true}
				community={communityDetails}
				visible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
				onCommunityCreated={(updatedCommunity) => {
					setCommunityDetails((prev) => ({ ...prev, ...updatedCommunity })) // Update community state
					fetchData("communities")
				}}
			/>
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
		width: 50,
		height: 50,
		borderRadius: 50,
	},
})

export default CommunityDetails
