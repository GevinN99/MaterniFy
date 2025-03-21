// import { View, ScrollView } from "react-native"
// import React, { useEffect, useState } from "react"
// import { useLocalSearchParams } from "expo-router"
// import CommunityDetails from "../../components/CommunityDetails"
// import { getCommunityById } from "../../api/communityApi"
// import Post from "../../components/Post"
// import { useCommunity } from "../../context/communityContext"
// import { SafeAreaView } from "react-native-safe-area-context"

// const Community = () => {
// 	const [community, setCommunity] = useState(null)
// 	const { handleJoinCommunity, handleLeaveCommunity } = useCommunity()
// 	const { communityId } = useLocalSearchParams()

// 	useEffect(() => {
// 		fetchCommunityDetails()
// 	}, [communityId])

// 	const fetchCommunityDetails = async () => {
// 		try {
// 			if (communityId) {
// 				const fetchedCommunity = await getCommunityById(communityId)
// 				setCommunity(fetchedCommunity || {})
// 			}
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	}

// 	return (
// 		<SafeAreaView className="flex-1 bg-[#E7EDEF]">
// 			<ScrollView className="px-4">
// 				{community && (
// 					<View>
// 						<CommunityDetails
// 							community={community}
// 							handleJoin={handleJoinCommunity}
// 							handleLeave={handleLeaveCommunity}
// 						/>
// 						{community.posts.length > 0 && (
// 							<View>
// 								{community.posts.map((post, index) => (
// 									<Post
// 										key={index}
// 										post={post}
// 										community={community}
// 										refreshCommunity={() => fetchCommunityDetails()}
// 									/>
// 								))}
// 							</View>
// 						)}
// 					</View>
// 				)}
// 			</ScrollView>
// 		</SafeAreaView>
// 	)
// }

// export default Community

import { View, ScrollView, Pressable } from "react-native"
import React, { useEffect, useState, useMemo } from "react"
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

	useEffect(() => {
		fetchCommunityDetails()
	}, [communityId, posts])

	const fetchCommunityDetails = async () => {
		try {
			const fetchedCommunity = await getCommunityById(communityId)			
			setCommunity(fetchedCommunity || {})
		} catch (error) {
			console.log(error)
		}
	}

	const handleNavigation = (postId, post) => {
		selectPost(post)
		router.push(`/community/post/${postId}`)
	}

	return (
		<SafeAreaView className="flex-1 bg-[#E7EDEF]">
			<ScrollView className="px-4">
				{community && (
					<View>
						<CommunityDetails
							community={community}
							handleJoin={handleJoinCommunity}
							handleLeave={handleLeaveCommunity}
						/>
						{community.posts.length > 0 && (
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
						)}
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	)
}

export default Community
