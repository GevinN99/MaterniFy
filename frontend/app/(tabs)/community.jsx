import { View, Text, ScrollView, TouchableOpacity } from "react-native"
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

const Community = () => {
	const { posts, loading, error } = useCommunity()
	const [isModalVisible, setIsModalVisible] = useState(false)

	return (
		<SafeAreaView className="flex-1 bg-[#E7EDEF]">
			<ScrollView className="px-4 pb-28">
				<CommunityHeader />
				<Text className="text-lg font-bold mx-6 my-2">Your feed</Text>
				<TouchableOpacity
					className="p-2 ml-4 bg-red-400 w-44 rounded-md"
					onPress={() => setIsModalVisible(true)}					
				>
					<Text>Create Post</Text>
				</TouchableOpacity>
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
								<Post
									key={index}
									post={post}
								/>
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
