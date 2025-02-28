import {
	View,
	Text,
	TextInput,
	ScrollView,
	TouchableOpacity,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import React, { useEffect, useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { Link } from "expo-router"
import CommunityCard from "../components/CommunityCard"
import { getAllCommunities } from "../api/communityApi"
import CreateCommunity from "../components/CreateCommunity"

const Communities = () => {
	const [searchQuery, setSearchQuery] = useState("")
	const [nonUserCommunities, setNonUserCommunities] = useState([])
	const [userCommunities, setUserCommunities] = useState([])
	const [isModalVisible, setIsModalVisible] = useState(false)	
	const [updateTrigger, setUpdateTrigger] = useState(false)

	useEffect(() => {
		const fetchCommunities = async () => {
			try {
				const userId = "your-user-id" // Replace with actual user ID
				const { userCommunities, nonUserCommunities } =
					await getAllCommunities(userId)
				setUserCommunities(userCommunities || [])
				setNonUserCommunities(nonUserCommunities || [])
				console.log({ userCommunities, nonUserCommunities })
			} catch (error) {
				console.log(error)
			}
		}

		fetchCommunities()
	}, [updateTrigger])

	const handleJoinCommunity = (communityId) => {
		// Your join community logic here
		console.log(`Joining community with id: ${communityId}`)
	}

	const handleLeaveCommunity = (communityId) => {
		// Your leave community logic here
		console.log(`Leaving community with id: ${communityId}`)
	}

	return (
		<SafeAreaView className="flex-1 bg-[#E7EDEF]">
			<ScrollView className="p-4 ">
				<View className="flex flex-row items-center mb-4">
					<Link
						href="community"
						className="mr-2"
					>
						<Ionicons
							name="arrow-back"
							size={24}
							color="black"
						/>
					</Link>
					<Text className="text-2xl font-bold">Communities</Text>
				</View>

				{/* Search bar */}
				<View className="relative flex justify-center">
					<Ionicons
						name="search-outline"
						size={20}
						color={"#d1d5db"}
						className="absolute left-3 top-3 z-10"
					/>
					<TextInput
						className="h-12 pl-10 pr-4 border border-gray-300 rounded-3xl bg-white mb-4"
						placeholder="Search communities..."
						value={searchQuery}
						onChangeText={setSearchQuery}
					/>
				</View>

				{/* Create community Modal */}
				<TouchableOpacity
					className="bg-yellow-400 w-fit p-2 rounded-md"
					onPress={() => setIsModalVisible(true)}
				>
					<Text>Create Community</Text>
				</TouchableOpacity>

				<Text className="text-2xl font-semibold my-4">Your communities</Text>
				<View>
					{userCommunities && userCommunities.map((community, index) => (
						<CommunityCard
							key={index}
							image={community.imageUrl ? { uri: community.imageUrl } : null}
							name={community.name}
							members={community.members.length}
							description={community.description}
							isMember={true}
							onJoin={() => handleJoinCommunity(community._id)}
							onLeave={() => handleLeaveCommunity(community._id)}
						/>
					))}
				</View>

				<Text className="text-2xl font-semibold mt-8 my-4">
					Discover new communities
				</Text>
				<View>
					{nonUserCommunities && nonUserCommunities.map((community, index) => (
						<CommunityCard
							key={index}
							image={community.imageUrl ? { uri: community.imageUrl } : null}
							name={community.name}
							members={community.members.length}
							description={community.description}
							isMember={false}
							onJoin={() => handleJoinCommunity(community._id)}
							onLeave={() => handleLeaveCommunity(community._id)}
						/>
					))}
				</View>
			</ScrollView>
			<CreateCommunity
				visible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
				onCommunityCreated={() => setUpdateTrigger((prev) => !prev)}
			/>
		</SafeAreaView>
	)
}

export default Communities
