import { View, Text, ScrollView, Pressable, RefreshControl } from "react-native"
import React, { useEffect, useState } from "react"
import { useLocalSearchParams } from "expo-router"
import CommunityDetails from "../../components/CommunityDetails"
import { getCommunityById } from "../../api/communityApi"
import Post from "../../components/Post"
import { useCommunity } from "../../context/communityContext"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"

const Community = () => {
	const router = useRouter()
	const { communityId } = useLocalSearchParams()
	const [community, setCommunity] = useState(null)
	const { posts, handleJoinCommunity, handleLeaveCommunity, selectPost } =
		useCommunity()

	// Fetch the community details on mount and when communityId or posts change
	useEffect(() => {
		const fetchCommunityDetails = async () => {
			try {
				console.log("fetching getcd")
				const fetchedCommunity = await getCommunityById(communityId)
				setCommunity(fetchedCommunity || {})
			} catch (error) {
				console.log(error)
			}
		}

		fetchCommunityDetails()
	}, [communityId, posts])

	const handleNavigation = (postId, post) => {
		selectPost(post)
		router.push(`/community/post/${postId}`)
	}

	return (
		<SafeAreaView className="flex-1 bg-[#E7EDEF]">
			<ScrollView className="px-4">
				{community && (
					<View>
						{/* Display community details */}
						<CommunityDetails
							community={community}
							handleJoin={handleJoinCommunity}
							handleLeave={handleLeaveCommunity}
						/>
						{community.posts.length > 0 ? (
							<View>
								{community.posts.map((post, index) => (
									<Pressable
										key={index}
										onPress={() => handleNavigation(post._id, post)}
									>
										<Post
											key={index}
											post={post}
											community={community}
										/>
									</Pressable>
								))}
							</View>
						) : (
								// If there are no posts in the community, display a message 
							<Text className="text-gray-500 text-center mt-8 leading-relaxed">
								There are no posts in this community yet.{"\n"}Be the first to
								share!
							</Text>
						)}
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	)
}

export default Community
