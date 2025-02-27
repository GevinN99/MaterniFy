import { View, Text, ScrollView, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"
import CommunityHeader from "../../components/CommunityHeader"
import Post from "../../components/Post"
import { getPostsFromAllUsersCommunities } from "../../api/communityApi"

const Community = () => {
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const fetchedPosts = await getPostsFromAllUsersCommunities()
				setPosts(fetchedPosts)
			} catch (error) {
				console.error("Failed to fetch posts:", error)
			} finally {
				setLoading(false)
			}
		}

		fetchPosts()
	}, [])

	return (
		<ScrollView className="bg-[#E7EDEF] h-screen">
			<CommunityHeader />
			<Text className="text-lg font-bold mx-6 my-2">Your feed</Text>
			{loading ? (
				<View className="flex-1 justify-center items-center mt-52">
					<ActivityIndicator
						size="large"
                        color="#38BDF8"                        
					/>
					<Text>Loading...</Text>
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
							image={post.imageUrl ? { uri: post.imageUrl } : null} // Conditionally pass image
							likes={post.likes.length}
							replies={post.replies.length}
						/>
					))}
				</View>
			)}
		</ScrollView>
	)
}

export default Community
