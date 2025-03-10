import { View, Text, StyleSheet } from "react-native"
import React, { useState } from "react"
import { Image } from "expo-image"
import { likeUnlikePost } from "../api/communityApi"
import { useCommunity } from "../context/communityContext"
import { useRouter } from "expo-router"
import { timeAgo } from "../utils/timeAgo"
import PostActionSection from "./PostActionSection"

const Post = ({ post, community }) => {
	const router = useRouter()
	const { selectPost } = useCommunity()	
	const {
		_id: postId,
		likes,
		userId,
		communityId,
		createdAt,
		imageUrl,
		content,
		replies
	} = post
	const { setUpdateTrigger } = useCommunity()
	const [showMenu, setShowMenu] = useState(false)
	const [likeCount, setLikeCount] = useState(likes.length)
	const usertest = "67bc9ceff607c265056765af"
	const [liked, setLiked] = useState(likes.includes(usertest))

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

	const toggleMenu = () => {
		setShowMenu(!showMenu)
	}

	const onDelete = () => {
		// Delete post
	}

	const onReply = () => {
		selectPost(post)
		router.push(`/community/post/reply/${postId}`)
	}

	return (
		<View className="bg-white p-4 my-2 rounded-2xl">
			<View className="flex flex-row items-center">
				<Image
					source={{ uri: userId.profileImage }}
					style={styles.profileImage}
				/>
				<View className="ml-4 flex gap-1">
					<View className="flex flex-row gap-1">
						<Text className="font-bold">{userId.fullName}</Text>
						<Text>•</Text>
						<Text className="font-extralight">{timeAgo(createdAt)}</Text>
					</View>

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
				<View className="flex my-4 items-center w-full overflow-hidden rounded-2xl">
					<Image
						source={{ uri: imageUrl }}
						style={[styles.postImage]}
						contentFit="cover"
						transition={300}
					/>
				</View>
			)}
			<PostActionSection
				liked={liked}
				likeCount={likeCount}
				onLike={handleLikeUnlike}
				onReply={onReply}
				replyCount={replies.length}
				onToggleMenu={toggleMenu}
				onDelete={onDelete}
				showMenu={showMenu}
			/>
		</View>
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

export default Post
