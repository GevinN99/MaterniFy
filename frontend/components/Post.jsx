import { View, Text, StyleSheet, Pressable } from "react-native"
import React, { useState } from "react"
import { Image } from "expo-image"
import { likeUnlikePost } from "../api/communityApi"
import { useCommunity } from "../context/communityContext"
import { Ionicons } from "@expo/vector-icons"
import { EllipsisVertical } from "lucide-react-native"
import Feather from "@expo/vector-icons/Feather"
import { useRouter } from "expo-router"

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
	} = post	
	const { setUpdateTrigger } = useCommunity()
	const [showMenu, setShowMenu] = useState(false)
	const [likeCount, setLikeCount] = useState(likes.length)
	const usertest = "67bc9ceff607c265056765af"
	const [liked, setLiked] = useState(likes.includes(usertest))

	const toggleMenu = () => {
		setShowMenu(!showMenu)
	}

	const handleDelete = () => {
		// Delete post
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

	const handleReply = () => {
		selectPost(post)		
		router.push(`/community/post/reply/${postId}`)
	}

	return (		
		<View className="bg-white p-4 my-2 rounded-2xl" >
			<View className="flex flex-row items-center">
				<Image
					source={{ uri: userId.profileImage }}
					style={styles.profileImage}
				/>
				<View className="ml-4 flex gap-1">
					<View className="flex flex-row gap-1">
						<Text className="font-bold">{userId.fullName}</Text>
						<Text className="text-gray-500">
							@
							{communityId.name ||
								community.name
									.replace(/\s+/g, "")
									.replace(/(?:^|\s)\S/g, (match) => match.toUpperCase())}
						</Text>
					</View>
					<Text className="font-extralight">
						{new Date(createdAt).toLocaleDateString()}
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
						transition={1000}
					/>
				</View>
			)}
			<View className="flex flex-row justify-between mt-4">
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
						<Text>{post.replies.length}</Text>
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
					{/* <EllipsisVertical
						size={20}
						className="-mr-1 relative"
					/> */}
					<Ionicons
						name="ellipsis-vertical-sharp"
						size={20}
						color="black"
						// style={{ position: 'relative', marginLeft: -1}}
					/>
				</Pressable>
				{showMenu && (
					<View className="absolute right-5 bottom-1 bg-white rounded-md shadow-lg z-10 p-1">
						<Pressable
							onPress={handleDelete}
							className="p-2 rounded-md flex flex-row gap-2 items-center"
						>
							{/* <Trash
								size={20}
								className="text-red-500"
							/> */}
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
