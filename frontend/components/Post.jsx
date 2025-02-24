import { View, Text, Image, StyleSheet, Dimensions } from "react-native"
import React from "react"
import { Ionicons } from "@expo/vector-icons"

const { width } = Dimensions.get("window")

const Post = ({
	profile,
	user,
	community,
	date,
	content,
	image,
	likes,
	replies,
}) => {
	return (
		<View className="bg-white p-4 my-2 mx-6 rounded-2xl">
			<View className="flex flex-row items-center">
				<Image
					source={profile}
					style={styles.profileImage}
				/>
				<View className="ml-4 flex gap-1">
					<View className="flex flex-row gap-1">
						<Text className="font-bold">{user}</Text>
						<Text className="text-gray-500">
							@
							{community?.name
								.replace(/\s+/g, "")
								.replace(/(?:^|\s)\S/g, (match) => match.toUpperCase())}
						</Text>
					</View>
					<Text className="font-extralight">{date}</Text>
				</View>
			</View>
			<Text className="mt-4">{content}</Text>
			{image && (
				<View className="flex items-center w-full my-4 overflow-hidden rounded-2xl">
					<Image
						source={image}
						style={[styles.postImage, { width: width - 48 }]} // Adjust width dynamically
						resizeMode="cover"
					/>
				</View>
			)}
			<View className="flex flex-row justify-between mt-4">
				<View className="flex flex-row gap-4">
					<View className="flex flex-row items-center">
						<Ionicons
							name="chatbubble-outline"
							size={20}
							className="mr-1"
						/>
						<Text>{replies}</Text>
					</View>
					<View className="flex flex-row items-center">
						<Ionicons
							name="heart-outline"
							size={20}
							className="mr-1"
						/>
						<Text>{likes}</Text>
					</View>
				</View>
				<Ionicons
					name="ellipsis-vertical-outline"
					size={20}
					className="-mr-1"
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	profileImage: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
	postImage: {
		width: "100%",
		height: undefined,
		aspectRatio: 1,
	},
})

export default Post
