import {
	View,
	Text,
	FlatList,
	ScrollView,
	TouchableOpacity,
	Pressable,
	StyleSheet,
} from "react-native"
import { useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Image } from "expo-image"
import React, { useState, useEffect } from "react"
import Feather from "@expo/vector-icons/Feather"
import { useCommunity } from "../../context/communityContext"
import CompactCommunityCard from "../../components/CompactCommunityCard"
import Post from "../../components/Post"
import axiosInstance from "../../api/axiosInstance"
import { useRouter } from "expo-router"

const CommunityUserProfile = () => {
	const blurhash = "LCKMX[}@I:OE00Eg$%Na0eNHWp-B"
	const { userId } = useLocalSearchParams()
	const [user, setUser] = useState()
	const { userCommunities, posts, selectPost } = useCommunity()
	const [userPosts, setUserPosts] = useState([])
	const router = useRouter()

	// Fetch user data and filter posts related to this user
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axiosInstance.get("/users/profile") // Fetch user profile info
				setUser(response.data.fullName)
			} catch (error) {
				console.log(error)
			}
		}

		fetchUser()

		// Filter posts that belong to the current user
		if (userCommunities.length > 0 && posts.length > 0) {
			const filteredPosts = posts.filter((post) => {
				return post.userId._id === userId
			})
			setUserPosts(filteredPosts)
		} else {
			setUserPosts([])
		}
	}, [posts])

	const handleNavigation = (postId, post) => {
		selectPost(post)
		router.push(`/community/post/${postId}`)
	}

	const renderHeader = () => (
		<View className="relative rounded-xl">
			<View className="bg-white p-4 rounded-xl mx-4">
				<View className="bg-blue-100 pt-6 pb-16 px-4 rounded-lg relative mx-4">
					<Text className="text-2xl font-bold text-center">{user}</Text>
				</View>

				{/* Community Image */}
				<View className="flex justify-center items-center -mt-10 mb-4 ">
					<View className="rounded-full overflow-hidden border-4 border-white shadow-md">
						<Image
							source={{
								uri: "https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
							}}
							style={styles.profileImage}
							placeholder={{ blurhash }}
							contentFit="cover"
							transition={300}
						/>
					</View>
					<View className="flex-row justify-center gap-6 mt-4">
						<View className="flex items-center">
							<Text className="text-xl font-semibold">
								{userCommunities.length}
							</Text>
							<Text className="text-lg text-gray-500">Communities</Text>
						</View>
						<View className="flex items-center">
							<Text className="text-xl font-semibold">{userPosts.length}</Text>
							<Text className="text-lg text-gray-500">Posts</Text>
						</View>
					</View>
				</View>
			</View>
			{/* Communities Section */}
			<View className="mt-8">
				<View className=" flex-row items-center ml-4 mb-2">
					<Feather
						name="users"
						size={20}
					/>
					<Text className="ml-4 text-2xl font-bold">Communities</Text>
				</View>
				{userCommunities.length === 0 ? (
					<View className="flex items-center my-8 gap-4">
						<Text className="text-gray-500 text-lg  ">
							No communities joined yet.
						</Text>
						<TouchableOpacity
							onPress={() => router.push("communities")}
							className="center"
						>
							<View>
								<Text className="text-blue-500 text-lg  bg-blue-500/10 px-3 py-1 rounded-md border border-blue-500">
									Explore Communities
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				) : (
					// Display list of communities the user has joined
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						className="pl-2 py-2"
					>
						{userCommunities.map((community, index) => (
							<CompactCommunityCard
								key={community._id}
								community={community}
								classname={index === userCommunities.length - 1 ? "mr-6" : ""}
							/>
						))}
					</ScrollView>
				)}
			</View>

			{/* Posts Section Header */}
			<View className="mt-8">
				<View className="flex-row items-center ml-4 mb-2">
					<Feather
						name="file-text"
						size={20}
					/>
					<Text className="ml-4 text-2xl font-bold">Posts</Text>
				</View>
			</View>
		</View>
	)

	return (
		<SafeAreaView className="flex-1 bg-[#E7EDEF]">
			<FlatList
				data={userPosts}
				keyExtractor={(post) => post._id}
				renderItem={({ item }) => (
					<View className="px-4">
						<Pressable onPress={() => handleNavigation(item._id, item)}>
							<Post post={item} />
						</Pressable>
					</View>
				)}
				ListHeaderComponent={renderHeader}
				contentContainerStyle={{ paddingBottom: 16 }}
				// Show a message if there are no posts
				ListEmptyComponent={() => (
					<View className="flex items-center justify-center mt-8">
						<Text className="text-gray-500 text-lg">
							You have not posted anything yet.
						</Text>
					</View>
				)}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	profileImage: {
		width: 80,
		height: 80,
		borderRadius: 50,
	},
})

export default CommunityUserProfile
