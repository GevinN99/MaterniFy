import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native"
import React, { useEffect, useState, useCallback, useContext } from "react"
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router"
import { likeUnlikePost, getPostById } from "../../../api/communityApi"
import { SafeAreaView } from "react-native-safe-area-context"
import { getRepliesForPost } from "../../../api/communityApi"
import ReplyCard from "../../../components/ReplyCard"
import { useCommunity } from "../../../context/communityContext"
import { Image } from "expo-image"
import { formatTime, formatDate } from "../../../utils/timeAgo"
import PostActionSection from "../../../components/PostActionSection"
import { AuthContext } from "../../../context/AuthContext"
import LoadingSpinner from "../../../components/LoadingSpinner"

const post = ({ community }) => {
	const { userId: user } = useContext(AuthContext)
	const { postId } = useLocalSearchParams()
	const { fetchData } = useCommunity()
	const [showMenu, setShowMenu] = useState(false)
	const [replies, setReplies] = useState([])
	const [post, setPost] = useState(null)
	const [likeCount, setLikeCount] = useState(0)	
	const [liked, setLiked] = useState(false)
	const router = useRouter()
	const { selectPost } = useCommunity()	

	useFocusEffect(
		useCallback(() => {
			const fetchPost = async () => {
				try {
					const response = await getPostById(postId)
					console.log(response)
					setPost(response)
					setLikeCount(response.likes.length)
					setLiked(response.likes.includes(user))
				} catch (error) {
					console.log(error)
				}
			}

			const fetchReplies = async () => {
				try {
					const response = await getRepliesForPost(postId)
					setReplies(response)
					console.log(response)
				} catch (error) {
					console.log(error)
				}
			}

			fetchPost()
			fetchReplies()
		}, [])
	)

	if (!post) {
		return (
			<SafeAreaView className="flex-1 bg-[#E7EDEF]">
				<View className="flex-1 justify-center items-center">
					<LoadingSpinner />
				</View>
			</SafeAreaView>
		)
	}

	const {
		userId,
		communityId,
		createdAt,
		imageUrl,
		content,
		replies: postReplies,
	} = post

	const handleLikeUnlike = async () => {
		try {
			const { likes } = await likeUnlikePost(postId)
			console.log("Like/Unlike API response:", likes)
			console.log(user)
			setLikeCount(likes.length)
			setLiked(likes.includes(user))
			fetchData('posts')
		} catch (error) {
			console.error(error)
		}
	}

	const toggleMenu = () => {
		setShowMenu(!showMenu)
	}

	const handleDelete = () => {
		// Delete post
	}

	const handleReply = () => {
		selectPost(post)
		router.push(`/community/post/reply/${postId}`)
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
							{(communityId.name ||
								community.name)
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
							transition={300}
						/>
					</View>
				)}
				<View className="flex flex-row mt-4 gap-1 border-b border-gray-400 pb-4">
					<Text className="font-extralight">{formatTime(createdAt)}</Text>
					<Text>•</Text>
					<Text className="font-extralight">{formatDate(createdAt)}</Text>
				</View>

				<PostActionSection
					liked={liked}
					likeCount={likeCount}
					onLike={handleLikeUnlike}
					onReply={handleReply}
					onToggleMenu={toggleMenu}
					onDelete={handleDelete}
					showMenu={showMenu}
					replyCount={postReplies.length}
				/>

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

export default post
