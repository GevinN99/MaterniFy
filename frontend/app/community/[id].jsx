import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import { useLocalSearchParams } from "expo-router"
import CommunityDetails from "../../components/CommunityDetails"
import { getCommunityById } from "../../api/communityApi"
import Post from "../../components/Post"
import { useCommunity } from "../../context/communityContext"
import { SafeAreaView } from "react-native-safe-area-context"

const Community = () => {
	const [community, setCommunity] = useState(null)	
	const { handleJoinCommunity, handleLeaveCommunity } = useCommunity()
	const { id, isMember } = useLocalSearchParams()	

	useEffect(() => {
		const fetchCommunityDetails = async () => {
			try {
				if (id) {
					const fetchedCommunity = await getCommunityById(id)
					setCommunity(fetchedCommunity || {})
				}
			} catch (error) {
				console.log(error)
			}
		}

		fetchCommunityDetails()
	}, [id])	

	return (
		<SafeAreaView className="flex-1 bg-[#E7EDEF]">
			<ScrollView className="px-4">				
				{community && (
					<View>
						<CommunityDetails
							community={community}
							isMember={isMember}
							handleJoin={handleJoinCommunity} 
							handleLeave={handleLeaveCommunity}
						/>
						{community.posts.length > 0 && (
							<View>
								<Text className="text-xl font-semibold mt-4">Posts</Text>
								{community.posts.map((post, index) => (
									<Post
										key={index}
										post={post}		
										community={community}
									/>
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
