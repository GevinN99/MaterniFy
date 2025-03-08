import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { useLocalSearchParams } from "expo-router"
import { likeUnlikePost, ge } from "../../../api/communityApi"
import { SafeAreaView } from "react-native-safe-area-context"
import { getRepliesForPost } from "../../../api/communityApi"
import ReplyCard from "../../../components/ReplyCard"
import Post from "../../../components/Post"
import { useCommunity } from "../../../context/communityContext"
import { Image } from "expo-image"
import { Ionicons } from "@expo/vector-icons"
import Feather from "@expo/vector-icons/Feather"
import { useRouter } from "expo-router"

const postId = ({community}) => {
	const { postId } = useLocalSearchParams()
	const { selectedPost, setUpdateTrigger } = useCommunity()
	if (!selectedPost) {
		return null
	}
	console.log(selectedPost)
	const [showMenu, setShowMenu] = useState(false)
	const [replies, setReplies] = useState([])

	const { likes, userId, communityId, createdAt, imageUrl, content } =
		selectedPost
	const [likeCount, setLikeCount] = useState(likes.length)
	const usertest = "67bc9ceff607c265056765af"
	const [liked, setLiked] = useState(likes.includes(usertest))
	const router = useRouter()
	const { selectPost } = useCommunity()

	useEffect(() => {
		const fetchReplies = async () => {
			try {
				const response = await getRepliesForPost(postId)
				setReplies(response)
			} catch (error) {
				console.log(error)
			}
		}

		fetchReplies()
	}, [postId])

	const toggleMenu = () => {
		setShowMenu(!showMenu)
	}

	const handleReply = () => {
		selectPost(selectedPost)
		router.push(`/community/post/reply/${postId}`)
	}

	const handleLikeUnlike = async () => {
		try {
			const { likes } = await likeUnlikePost(postId)
			setLikeCount(likes.length)
			setLiked(likes.includes(usertest))
			setUpdateTrigger((prev) => !prev)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<SafeAreaView className="flex-1 bg-[#E7EDEF]">
			<ScrollView className="px-4 pb-28">
				<View className="flex flex-row items-center">
					<Image
						source={{ uri: userId.profileImage }}
						style={styles.profileImage}
					/>
					<View className="ml-4 flex gap-1">
						{/* <View className="flex flex-row gap-1"> */}
						<Text className="font-bold">{userId.fullName}</Text>
						{/* </View> */}
						<Text className="text-gray-500">
							@
							{communityId.name ||
								community.name
									.replace(/\s+/g, "")
									.replace(/(?:^|\s)\S/g, (match) => match.toUpperCase())}
						</Text>
					</View>
				</View>
				<Text className="mt-4">{content}</Text>
				{imageUrl && (
					<View className="flex mt-4 items-center w-full overflow-hidden rounded-2xl">
						<Image
							source={{ uri: imageUrl }}
							style={[styles.postImage]}
							contentFit="cover"
							transition={1000}
						/>
					</View>
				)}
				<View className="flex flex-row mt-4 gap-1 border-b border-gray-400 pb-4">
					<Text className="font-extralight">
						{new Date(createdAt).toLocaleTimeString(undefined, {
							hour: "2-digit",
							minute: "2-digit",
							hour12: true,
							hourCycle: "h12",
						})}
					</Text>
					<Text>•</Text>
					<Text className="font-extralight">
						{new Date(createdAt)
							.toLocaleDateString("en-GB", {
								day: "2-digit",
								month: "short",
								year: "2-digit",
							})
							.replace(",", "")}
					</Text>
				</View>
				<View className="flex flex-row justify-between mt-4 border-b border-gray-400 pb-4">
					<View className="flex flex-row gap-4">
						<Pressable
							className="flex flex-row items-center"
							onPress={handleReply}
						>
							<Ionicons
								name="chatbubble-outline"
								size={18}
								className="mr-1"
							/>
							<Text>{selectedPost.replies.length}</Text>
						</Pressable>
						<Pressable
							className="flex flex-row items-center"
							onPress={handleLikeUnlike}
						>
							<Ionicons
								name={liked ? "heart" : "heart-outline"}
								color={liked ? "red" : "black"}
								size={20}
								className="mr-1"
							/>
							<Text>{likeCount}</Text>
						</Pressable>
					</View>
					<Pressable onPress={toggleMenu}>
						<Ionicons
							name="ellipsis-vertical-sharp"
							size={20}
							color="black"
						/>
					</Pressable>
					{showMenu && (
						<View className="absolute right-5 bottom-1 rounded-md shadow-md z-10 p-1 bg-white">
							<Pressable
								// onPress={handleDelete}
								className="p-2 rounded-md flex flex-row gap-2 items-center"
							>
								<Feather
									name="trash"
									size={20}
									color="#ef4444"
								/>
								<Text className="text-red-500">Delete</Text>
							</Pressable>
						</View>
					)}
				</View>

				<View>
					{replies.map((reply, index) => {
						return (
							<ReplyCard
								key={index}
								reply={reply}
							/>
						)
					})}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	profileImage: {
		width: 40,
		height: 40,
		borderRadius: 50,
	},
	postImage: {
		width: "100%",
		height: undefined,
		aspectRatio: 1,
	},
})

export default postId
