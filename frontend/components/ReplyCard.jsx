// import { View, Text, StyleSheet, Pressable } from "react-native"
// import React, { useState, useEffect, useContext } from "react"
// import { Image } from "expo-image"
// import { likeUnlikeReply, deleteReply } from "../api/communityApi"
// import { timeAgo } from "../utils/timeAgo"
// import PostActionSection from "./PostActionSection"
// import { useRouter } from "expo-router"
// import { AuthContext } from "../context/AuthContext"
// import { useCommunity } from "../context/communityContext"

// const ReplyCard = ({ reply, admin }) => {	
// 	const { userId: user } = useContext(AuthContext)
// 	const { fetchData, selectPost} = useCommunity()
// 	const router = useRouter()
// 	const { content, userId, postId, createdAt, likes, _id: replyId, replies } = reply
// 	const [likeCount, setLikeCount] = useState(likes.length)	
// 	const [liked, setLiked] = useState(likes.includes(user))
// 	const [showMenu, setShowMenu] = useState(false)
// 	const [showNestedReplies, setShowNestedReplies] = useState(false)

// 	const handleLikeUnlike = async () => {
// 		try {
// 			const { likes } = await likeUnlikeReply(replyId)
// 			setLikeCount(likes.length)
// 			setLiked(likes.includes(user))
// 		} catch (error) {
// 			console.error(error)
// 		}
// 	}

// 	const toggleMenu = () => {
// 		setShowMenu(!showMenu)
// 	}

// 	const onDelete = async () => {
// 		try {
// 			const response = await deleteReply(replyId)
// 			toggleMenu()			
// 			fetchData("posts")			
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	}

// 	const onReply = () => {		
// 		selectPost(reply)		
// 		router.push({
// 			pathname: `/community/post/reply/${postId}`,
// 			params: { parentReplyId: replyId },
// 		})
// 	}

// 	const toggleNestedReplies = () => {
// 		setShowNestedReplies(!showNestedReplies)
// 	}

// 	return (
// 		<View className="border border-gray-400 mt-4 pb-4 rounded-lg p-2">
// 			<View className="flex flex-row">
// 				<Image
// 					source={{ uri: userId.profileImage }}
// 					style={styles.profileImage}
// 				/>
// 				<View className="ml-4 flex-1 gap-1">
// 					<View className="flex flex-row gap-1 items-center">
// 						<Text className="font-bold text-lg">{userId.fullName}</Text>
// 						<Text>•</Text>
// 						<Text className="font-extralight">{timeAgo(createdAt)}</Text>
// 					</View>
// 					<Text className="text-gray-500 text-base">
// 						Replying to{" "}
// 						{reply.postId?.userId?.fullName ||
// 							reply.parentReplyId?.userId?.fullName}
// 					</Text>
// 					<Text className="mt-2 text-lg">{content}</Text>

// 					<PostActionSection
// 						liked={liked}
// 						likeCount={likeCount}
// 						onLike={handleLikeUnlike}
// 						onReply={onReply}
// 						onToggleMenu={toggleMenu}
// 						onDelete={onDelete}
// 						showMenu={showMenu}
// 						replyCount={replies.length}
// 						admin={admin}
// 					/>

// 					{replies.length > 0 && (
// 						<Pressable onPress={toggleNestedReplies}>
// 							<Text className="text-blue-500 mt-2 text-base">
// 								{showNestedReplies
// 									? "Hide Replies"
// 									: `View Replies (${replies.length})`}
// 							</Text>
// 						</Pressable>
// 					)}
// 				</View>
// 			</View>
// 			{showNestedReplies &&
// 				replies.map((nestedReply, index) => (
// 					<View key={index}>
// 						<ReplyCard
// 							reply={nestedReply}
// 							admin={admin}
// 						/>
// 					</View>
// 				))}
// 		</View>
// 	)
// }

// const styles = StyleSheet.create({
// 	profileImage: {
// 		width: 50,
// 		height: 50,
// 		borderRadius: 50,
// 		marginTop: 2,
// 	},
// })

// export default ReplyCard


import { View, Text, Pressable, StyleSheet } from "react-native"
import { useState, useContext } from "react"
import { Image } from "expo-image"
import { Ionicons } from "@expo/vector-icons"
import { likeUnlikeReply, deleteReply } from "../api/communityApi"
import { timeAgo } from "../utils/timeAgo"
import { useRouter } from "expo-router"
import { AuthContext } from "../context/AuthContext"
import { useCommunity } from "../context/communityContext"
import PostActionSection from "./PostActionSection"

const ReplyCard = ({ reply, admin, nestLevel = 0, isLastReply = false }) => {
	const blurhash = "LCKMX[}@I:OE00Eg$%Na0eNHWp-B"
	const { userId: user } = useContext(AuthContext)
	const { fetchData, selectPost } = useCommunity()
	const router = useRouter()
	const {
		content,
		userId,
		postId,
		createdAt,
		likes,
		_id: replyId,
		replies,
	} = reply

	// State variables for like count, liked status, menu visibility, and nested replies visibility
	const [likeCount, setLikeCount] = useState(likes.length)
	const [liked, setLiked] = useState(likes.includes(user))
	const [showMenu, setShowMenu] = useState(false)
	const [showNestedReplies, setShowNestedReplies] = useState(false)
	admin = user === reply.userId._id

	const handleLikeUnlike = async () => {
		try {
			const { likes } = await likeUnlikeReply(replyId)
			setLikeCount(likes.length)
			setLiked(likes.includes(user))
		} catch (error) {
			console.error(error)
		}
	}

	const toggleMenu = () => {
		setShowMenu(!showMenu)
	}

	const onDelete = async () => {
		try {
			await deleteReply(replyId)
			toggleMenu()
			fetchData("posts")
		} catch (error) {
			console.log(error)
		}
	}

	const onReply = () => {
		selectPost(reply)
		router.push({
			pathname: `/community/post/reply/${postId}`,
			params: { parentReplyId: replyId },
		})
	}

	const toggleNestedReplies = () => {
		setShowNestedReplies(!showNestedReplies)
	}

	return (
		<View className={`relative mt-3 ${nestLevel === 0 ? "pl-0" : "pl-4"}`}>
			{/* Vertical connector for nested replies */}
			{nestLevel > 0 && (
				<View
					className="absolute left-0 top-0 w-0.5 bg-blue-200"
					style={{ height: isLastReply ? "50%" : "100%" }}
				/>
			)}

			<View className="bg-white rounded-xl p-4">
				{/* User details */}
				<View className="flex-row items-center mb-1.5">
					<Image
						source={{ uri: userId.profileImage }}
						style={styles.profileImage}
						contentFit="cover"
						placeholder={{ blurhash }}
					/>

					<View className="ml-2.5">
						<Text className="font-bold text-lg text-gray-900">
							{userId.fullName}
						</Text>
						<Text className="text-sm text-gray-500">{timeAgo(createdAt)}</Text>
					</View>
				</View>

				{/* Mention the user being replied to */}
				<Text className=" text-gray-500 mb-2">
					Replying to{" "}
					<Text className="font-base text-gray-600">
						{reply.postId?.userId?.fullName ||
							reply.parentReplyId?.userId?.fullName}
					</Text>
				</Text>

				<Text className="text-lg mb-3">{content}</Text>

				<PostActionSection
					liked={liked}
					likeCount={likeCount}
					onLike={handleLikeUnlike}
					onReply={onReply}
					onToggleMenu={toggleMenu}
					onDelete={onDelete}
					showMenu={showMenu}
					replyCount={replies.length}
					admin={admin}
				/>
			</View>

			{replies.length > 0 && (
				<View className="">
					<Pressable
						className="flex-row items-center mt-2 mb-1 py-1.5"
						onPress={toggleNestedReplies}
					>
						<Text className="text-blue-500 text-sm font-base">
							{showNestedReplies
								? "Hide replies"
								: `Show ${replies.length} ${
										replies.length === 1 ? "reply" : "replies"
								  }`}
						</Text>
						<Ionicons
							name={showNestedReplies ? "chevron-up" : "chevron-down"}
							size={14}
							color="#3B82F6"
							className="ml-2"
						/>
					</Pressable>

					{/* Display all nested replies  */}
					{showNestedReplies &&
						replies.map((nestedReply, index) => (
							<ReplyCard
								key={index}
								reply={nestedReply}
								admin={admin}
								nestLevel={nestLevel + 1}
								isLastReply={index === replies.length - 1}
							/>
						))}
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({	
	profileImage: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
})

export default ReplyCard

