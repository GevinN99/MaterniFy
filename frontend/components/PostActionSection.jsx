import React from "react"
import { Pressable, View, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Feather from "@expo/vector-icons/Feather"

const PostActionSection = ({
	liked,
	likeCount,
	onLike,
	onReply,
	onToggleMenu,
	onDelete,
	showMenu,
	replyCount,
	admin
}) => {	
	return (
		<View className="flex flex-row justify-between mt-4">
			<View className="flex flex-row gap-4">
				{/* Reply Icon */}
				<Pressable
					className="flex flex-row items-center"
					onPress={onReply}
				>
					<Ionicons
						name="chatbubble-outline"
						size={18}
						className="mr-1"
					/>
					<Text>{replyCount}</Text>
				</Pressable>

				{/* Like/Unlike Icon */}
				<Pressable
					className="flex flex-row items-center"
					onPress={onLike}
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

			{/* Ellipsis Icon for menu */}
			{admin && (
				<Pressable onPress={onToggleMenu}>
					<Ionicons
						name="ellipsis-vertical-sharp"
						size={19}
						color="black"
					/>
				</Pressable>
			)}

			{/* Conditional Menu */}
			{showMenu && (
				<View className="absolute right-8 bottom-1 rounded-md shadow-md z-10 p-1 bg-white">
					<Pressable
						onPress={onDelete}
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
	)
}

export default PostActionSection
