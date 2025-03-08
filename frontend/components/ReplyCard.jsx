import { View, Text, StyleSheet, Pressable } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import React, {useState} from "react"
import { Image } from "expo-image"
import { likeUnlikeReply } from "../api/communityApi"
import Feather from "@expo/vector-icons/Feather"

const ReplyCard = ({ reply }) => {	
	const { content, userId, createdAt, likes, _id: replyId } = reply
	const [likeCount, setLikeCount] = useState(likes.length)
	const usertest = "67bc9ceff607c265056765af"
	const [liked, setLiked] = useState(likes.includes(usertest))
	const [showMenu, setShowMenu] = useState(false)

	const handleLikeUnlike = async () => {		
		try {
			const { likes } = await likeUnlikeReply(replyId)
			setLikeCount(likes.length)
			setLiked(likes.includes(usertest))			
		} catch (error) {
			console.error(error)
		}
	}

	const toggleMenu = () => {		
		setShowMenu(!showMenu)
	}

	return (
		<View className="border border-gray-400 mt-4 pb-4  rounded-lg p-2">
			<View className="flex flex-row">
				<Image
					source={{ uri: userId.profileImage }}
					style={styles.profileImage}
				/>
				<View className="ml-4 flex-1 gap-1">
					<Text className="font-bold">{userId.fullName}</Text>

					{/* <Text className="font-extralight">
						{new Date(createdAt).toLocaleDateString()}
					</Text> */}
					<Text className="text-gray-500">
						Replying to {reply.postId.userId.fullName}
					</Text>
					<Text className="mt-2">{content}</Text>

					<View className="flex flex-row justify-between mt-4">
						<View className="flex flex-row gap-4">
							<Pressable
								className="flex flex-row items-center"
								// onPress={handleReply}
							>
								<Ionicons
									name="chatbubble-outline"
									size={18}
									className="mr-1"
								/>
								{/* <Text>{selectedPost.replies.length}</Text> */}
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
						<Pressable 
						onPress={toggleMenu}
						>
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
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	profileImage: {
		width: 40,
		height: 40,
		borderRadius: 50,
		marginTop: 2,
	},
})

export default ReplyCard
