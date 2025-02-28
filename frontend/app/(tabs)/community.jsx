import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import React, { useEffect, useState } from "react"
import CommunityHeader from "../../components/CommunityHeader"
import Post from "../../components/Post"
import { getPostsFromAllUsersCommunities } from "../../api/communityApi"
import CreatePost from "../../components/CreatePost"


const Community = () => {
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)	
	const [isModalVisible, setIsModalVisible] = useState(false)	

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const fetchedPosts = await getPostsFromAllUsersCommunities()
				setPosts(fetchedPosts || [])
			} catch (error) {				
				setError(error)
			} finally {
				setLoading(false)
			}
		}

		fetchPosts()
	}, [])

	return (
		<SafeAreaView className="flex-1 bg-[#E7EDEF]">
			<ScrollView className="">
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
					<View className="flex-1 justify-center items-center mt-52">
						<ActivityIndicator
							size="large"
							color="#38BDF8"
						/>
					</View>
				) : error ? (
					<View className="flex-1 justify-center items-center mt-52">
						<Text className="text-red-500">Failed to load posts</Text>
					</View>
				) : (
					<View>
						{posts.map((post, index) => (
							<Post
								key={index}
								profile={{ uri: post.userId.profileImage }}
								user={post.userId.fullName}
								community={post.communityId}
								date={new Date(post.createdAt).toLocaleDateString()}
								content={post.content}
								image={post.imageUrl ? { uri: post.imageUrl } : null} // Conditionally post image
								likes={post.likes.length}
								replies={post.replies.length}
							/>
						))}
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	)
}

export default Community
