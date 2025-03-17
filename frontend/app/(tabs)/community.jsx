import { View, Text, ScrollView, TouchableOpacity, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import React, { useState } from "react"
import CommunityHeader from "../../components/CommunityHeader"
//import Post from "../../components/Post"
import { getPostsFromAllUsersCommunities } from "../../api/communityApi"
import Post from "../../components/Post"
import ErrorMessage from "../../components/ErrorMessage"
import CreatePost from "../../components/CreatePost"
import { useCommunity } from "../../context/communityContext"
import LoadingSpinner from "../../components/LoadingSpinner"
import { useRouter } from "expo-router"

const Community = () => {
	const { posts, loading, error, selectPost } = useCommunity()
	const [isModalVisible, setIsModalVisible] = useState(false)
	const router = useRouter()

	const handleNavigation = (postId, post) => { 	
		selectPost(post)
		router.push(`/community/post/${postId}`)
	}


	return (
		<SafeAreaView className="flex-1 bg-[#E7EDEF]">
			<ScrollView className="px-4 pb-28">
				<CommunityHeader />
				<View className="flex flex-row justify-between">
					<Text className="text-lg font-bold my-2">Your feed</Text>
					<TouchableOpacity
						className="p-2 bg-red-400 w-44 rounded-md"
						onPress={() => setIsModalVisible(true)}
					>
						<Text className="text-center">Create Post</Text>
					</TouchableOpacity>
				</View>
				<CreatePost
					visible={isModalVisible}
					onClose={() => setIsModalVisible(false)}
				/>
				{loading ? (
					<LoadingSpinner styles={"mt-44"} />
				) : error ? (
					<ErrorMessage
						error="Failed to load posts"
						styles="mt-44"
					/>
				) : (
					<View>
						{posts.length > 0 ? (
							posts.map((post, index) => (
								<Pressable
									key={index}
									onPress={() => handleNavigation(post._id, post)}
								>
									<Post post={post} />
								</Pressable>
							))
						) : (
							<View className="flex-1 justify-center items-center mt-52">
								<Text className="text-gray-500">
									User has not joined any community
								</Text>
							</View>
						)}
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	)
}

export default Community
