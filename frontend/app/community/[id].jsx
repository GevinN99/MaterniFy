import { View, Text, ScrollView, Image } from "react-native"
import React, { useEffect, useState } from "react"
import { Link, useRouter, useLocalSearchParams } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import CommunityDetails from "../../components/CommunityDetails"
import { getCommunityById } from "../../api/communityApi"
import Post from "../../components/Post"
import { useCommunity } from "../../context/communityContext"

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
			<ScrollView className="p-4">
				<View className="flex flex-row items-center mb-4">
					<Link
						href="/communities"
						className="mr-2"
					>
						<Ionicons
							name="arrow-back"
							size={24}
							color="black"
						/>
					</Link>
					<Text className="text-2xl font-bold">Community Details</Text>
				</View>
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
