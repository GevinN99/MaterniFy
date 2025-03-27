import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Pressable,
	RefreshControl,
} from "react-native"
import React, { useEffect, useState, useCallback, useContext } from "react"
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { getRepliesForPost } from "../../../api/communityApi"
import ReplyCard from "../../../components/ReplyCard"
import { useCommunity } from "../../../context/communityContext"
import { Image } from "expo-image"
import { formatTime, formatDate } from "../../../utils/timeAgo"
import PostActionSection from "../../../components/PostActionSection"
import { AuthContext } from "../../../context/AuthContext"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { deletePost, getPostById } from "../../../api/communityApi"

const Post = ({ community }) => {
	const blurhash = "LCKMX[}@I:OE00Eg$%Na0eNHWp-B"
	const { userId: user } = useContext(AuthContext)
	const { postId } = useLocalSearchParams()
	const { posts, handleLikeUnlike, fetchData } = useCommunity()
	const [showMenu, setShowMenu] = useState(false)
	const [replies, setReplies] = useState([])
	const router = useRouter()
	const { selectPost } = useCommunity()
	const [post, setPost] = useState(null)
	const [refreshing, setRefreshing] = useState(false)

	// Fetch replies when the screen is focused
	useFocusEffect(
		useCallback(() => {
			fetchPost()
			fetchReplies()
		}, [postId, posts])
	)

	const fetchPost = async () => {
		try {
			const response = await getPostById(postId)
			setPost(response)
			console.log(response)
		} catch (error) {
			console.log(error)
		}
	}

	const fetchReplies = async () => {
		try {
			const response = await getRepliesForPost(postId)
			setReplies(response)
		} catch (error) {
			console.log(error)
		}
	}

	const onRefresh = async () => {
		setRefreshing(true)
		await fetchPost()
		await fetchReplies()
		setRefreshing(false)
	}

	// Show loading spinner if post is not yet fetched
	if (!post || !replies) {
		return (
			<SafeAreaView className="flex-1 bg-[#E7EDEF]">
				<View className="flex-1 justify-center items-center">
					<LoadingSpinner />
				</View>
			</SafeAreaView>
		)
	}

	const admin = user === post.userId._id

	// Destructure post data
	const {
		userId,
		communityId,
		createdAt,
		imageUrl,
		content,
		likes,
		replies: postReplies,
	} = post

	// Derive liked and likeCount from the post.likes array
	const liked = likes.includes(user)
	const likeCount = likes.length

	// Toggle menu visibility
	const toggleMenu = () => {
		setShowMenu(!showMenu)
	}

	// Handle post deletion
	const onDelete = async () => {
		try {
			const response = await deletePost(postId)
			toggleMenu()
			fetchData("posts")
			router.back()
		} catch (error) {
			console.log(error)
		}
	}

	// Handle reply navigation
	const handleReply = () => {
		selectPost(post)
		router.push(`/community/post/reply/${postId}`)
	}

	return (
		<SafeAreaView className="flex-1 bg-[#E7EDEF]">
			<ScrollView
				className="px-4"
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
			>
				<View className="flex flex-row items-center">
					<Image
						source={{ uri: userId.profileImage }}
						style={styles.profileImage}
						contentFit="cover"
						placeholder={{ blurhash }}
					/>
					<View className="ml-4 flex ">
						<Text className="font-bold text-xl">{userId.fullName}</Text>
						<Pressable
							onPress={() => router.push(`/community/${communityId._id}`)}
						>
							<Text className="text-gray-500 text-base">
								@
								{(communityId.name || community.name)
									.replace(/\s+/g, "")
									.replace(/(?:^|\s)\S/g, (match) => match.toUpperCase())}
							</Text>
						</Pressable>
					</View>
				</View>
				<Text className="mt-4 text-lg">{content}</Text>
				{imageUrl && (
					<View className="flex mt-4 items-center w-full overflow-hidden rounded-2xl">
						<Image
							source={{ uri: imageUrl }}
							style={[styles.postImage]}
							contentFit="cover"
							transition={300}
						/>
					</View>
				)}
				<View className="flex flex-row mt-4 gap-2 border-b border-gray-400 pb-4">
					<Text className="font-extralight text-base">
						{formatTime(createdAt)}
					</Text>
					<Text>•</Text>
					<Text className="font-extralight text-base">
						{formatDate(createdAt)}
					</Text>
				</View>

				<PostActionSection
					liked={liked}
					likeCount={likeCount}
					onLike={() => handleLikeUnlike(postId)}
					onReply={handleReply}
					onToggleMenu={toggleMenu}
					onDelete={onDelete}
					showMenu={showMenu}
					replyCount={postReplies.length}
					admin={admin}
				/>
				<Text className="border-t border-gray-400 mt-4"></Text>

				<View className="mb-4">
					{replies.length === 0 ? (
						<Text className="text-center pt-8">
							This post has no replies yet
						</Text>
					) : (
						replies.map((reply, index) => (
							<ReplyCard
								key={index}
								reply={reply}
							/>
						))
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
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
