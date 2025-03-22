import { View, Text, StyleSheet } from "react-native"
import React, { useState, useEffect, useContext } from "react"
import { Image } from "expo-image"
import { deletePost } from "../api/communityApi"
import { useCommunity } from "../context/communityContext"
import { useRouter } from "expo-router"
import { timeAgo } from "../utils/timeAgo"
import PostActionSection from "./PostActionSection"
import { AuthContext } from "../context/AuthContext"

const Post = ({ post, community, replying }) => {
	const blurhash = "LCKMX[}@I:OE00Eg$%Na0eNHWp-B"
	const { userId: user } = useContext(AuthContext)
	const router = useRouter()
	const { selectPost, fetchData, handleLikeUnlike } = useCommunity()
	const {
		_id: postId,
		likes,
		userId,
		communityId,
		createdAt,
		imageUrl,
		content,
		replies,
	} = post

	// Check if the logged-in user is the admin (author) of the post
	const admin = user === post.userId._id
	const [showMenu, setShowMenu] = useState(false)

	// Check if the logged-in user has liked the post
	const liked = likes.includes(user)
	const likeCount = likes.length

	const toggleMenu = () => {
		setShowMenu(!showMenu)
	}

	const onLike = async () => {
		handleLikeUnlike(postId)
	}

	const onDelete = async () => {
		try {
			const response = await deletePost(postId)
			toggleMenu()
			fetchData("posts")
		} catch (error) {
			console.log(error)
		}
	}

	const onReply = () => {
		selectPost(post)
		router.push(`/community/post/reply/${postId}`)
	}

	return (
		<View className="bg-white p-4 my-2 rounded-2xl">
			{/* User info section */}
			<View className="flex flex-row items-center">
				<Image
					source={{ uri: userId.profileImage }}
					style={styles.profileImage}
					contentFit="cover"
					placeholder={{ blurhash }}
				/>
				<View className="ml-4 flex">
					{/* Display user's name and post timestamp */}
					<View className="flex flex-row items-center ">
						<Text className="font-bold text-xl mr-2">{userId.fullName}</Text>
						<Text className="mt-1">•</Text>
						<Text className="font-extralight ml-1 mt-1">
							{timeAgo(createdAt)}
						</Text>
					</View>

					{/* Display community name */}
					<Text className="text-gray-500 text-base">
						@
						{(communityId.name || community.name)
							.replace(/\s+/g, "")
							.replace(/(?:^|\s)\S/g, (match) => match.toUpperCase())}
					</Text>
				</View>
			</View>

			{/* Post content */}
			<Text className="mt-4 text-lg">{content}</Text>

			{/* Display post image if available */}
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

			{/* Post actions (like, reply, delete) */}
			{!replying && (
				<PostActionSection
					liked={liked}
					likeCount={likeCount}
					onLike={onLike}
					onReply={onReply}
					replyCount={replies.length}
					onToggleMenu={toggleMenu}
					onDelete={onDelete}
					showMenu={showMenu}
					admin={admin}
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	profileImage: {
		width: 50,
		height: 50,
		borderRadius: 50,
	},
	postImage: {
		width: "100%",
		height: undefined,
		aspectRatio: 1,
	},
})

export default Post
