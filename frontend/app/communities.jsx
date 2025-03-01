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
import { Link, useRouter } from "expo-router"
import CommunityCard from "../components/CommunityCard"
import { getAllCommunities, joinCommunity, leaveCommunity } from "../api/communityApi"
import CreateCommunity from "../components/CreateCommunity"

const Communities = () => {
	const [searchQuery, setSearchQuery] = useState("")
	const [nonUserCommunities, setNonUserCommunities] = useState([])
	const [userCommunities, setUserCommunities] = useState([])
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [updateTrigger, setUpdateTrigger] = useState(false)
	const router = useRouter()
	useEffect(() => {
		const fetchCommunities = async () => {
			try {
				const { userCommunities, nonUserCommunities } =
					await getAllCommunities()
				setUserCommunities(userCommunities || [])
				setNonUserCommunities(nonUserCommunities || [])
			} catch (error) {
				console.log(error)
			}
		}

		fetchCommunities()
	}, [updateTrigger])

	const handleJoinCommunity = async (communityId) => {
		try {
			const response = await joinCommunity(communityId)
			console.log(response)
			setUpdateTrigger((prev) => !prev)
		} catch (error) {
			console.log(error)
		}		
	}

	const handleLeaveCommunity = async (communityId) => {
		try {
			const response = await leaveCommunity(communityId)
			console.log(response)
			setUpdateTrigger((prev) => !prev)
		} catch (error) {
			console.log(error)
		}		
	}

	const handleNavigateToCommunity = (communityId) => {
		router.push(`/community/${communityId}`)
	}

	return (
		<SafeAreaView className="flex-1 bg-[#E7EDEF]">
			<ScrollView className="p-4">
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
					{userCommunities &&
						userCommunities.map((community, index) => (
							<TouchableOpacity
								key={index}
								onPress={() => handleNavigateToCommunity(community._id)}
							>
								<CommunityCard
									image={
										community.imageUrl ? { uri: community.imageUrl } : null
									}
									name={community.name}
									members={community.members.length}
									description={community.description}
									communityId={community._id}
									isMember={true}
									onJoin={() => handleJoinCommunity(community._id)}
									onLeave={() => handleLeaveCommunity(community._id)}
								/>
							</TouchableOpacity>
						))}
				</View>

				<Text className="text-2xl font-semibold mt-8 my-4">
					Discover new communities
				</Text>
				<View>
					{nonUserCommunities &&
						nonUserCommunities.map((community, index) => (
							<TouchableOpacity
								key={index}
								onPress={() => handleNavigateToCommunity(community._id)}
							>
								<CommunityCard
									image={
										community.imageUrl ? { uri: community.imageUrl } : null
									}
									name={community.name}
									members={community.members.length}
									description={community.description}
									isMember={false}
									onJoin={() => handleJoinCommunity(community._id)}
									onLeave={() => handleLeaveCommunity(community._id)}
								/>
							</TouchableOpacity>
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
