import { View, Text, StyleSheet } from "react-native"
import React, { useState } from "react"
import { Image } from "expo-image"
import { likeUnlikeReply } from "../api/communityApi"
import { timeAgo } from "../utils/timeAgo"
import PostActionSection from "./PostActionSection"

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

	const onDelete = () => {
		// Delete reply
	}

	const onReply = () => {
		// Reply to reply
	}

	return (
		<View className="border border-gray-400 mt-4 pb-4  rounded-lg p-2">
			<View className="flex flex-row">
				<Image
					source={{ uri: userId.profileImage }}
					style={styles.profileImage}
				/>
				<View className="ml-4 flex-1 gap-1">
					<View className="flex flex-row gap-1">
						<Text className="font-bold">{userId.fullName}</Text>
						<Text>•</Text>
						<Text className="font-extralight">{timeAgo(createdAt)}</Text>
					</View>
					<Text className="text-gray-500">
						Replying to {reply.postId.userId.fullName}
					</Text>
					<Text className="mt-2">{content}</Text>

					<PostActionSection
						liked={liked}
						likeCount={likeCount}
						onLike={handleLikeUnlike}
						onReply={onReply}
						onToggleMenu={toggleMenu}
						onDelete={onDelete}
						showMenu={showMenu}
					/>
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
