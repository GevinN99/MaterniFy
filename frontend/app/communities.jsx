import {
	View,
	Text,
	TextInput,
	ScrollView,
	TouchableOpacity,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import React, { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import CommunityCard from "../components/CommunityCard"
import CreateCommunity from "../components/CreateCommunity"
import { useCommunity } from "../context/communityContext"
import ErrorMessage from "../components/ErrorMessage"
import LoadingSpinner from "../components/LoadingSpinner"

const Communities = () => {
	const [searchQuery, setSearchQuery] = useState("")
	const [isModalVisible, setIsModalVisible] = useState(false)
	const {
		userCommunities,
		nonUserCommunities,
		handleJoinCommunity,
		handleLeaveCommunity,
		setUpdateTrigger,
		error,
		loading,
	} = useCommunity()
	const router = useRouter()

	// console.log(userCommunities, nonUserCommunities)

	const handleNavigateToCommunity = (communityId, isUserMember) => {
		router.push(`/community/${communityId}`)
	}

	return (
		<SafeAreaView className="flex-1 bg-[#E7EDEF]">
			<ScrollView className="px-4">
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
					{loading ? (
						<LoadingSpinner />
					) : error ? (
						<ErrorMessage error="Failed to load communities" />
					) : userCommunities && userCommunities.length > 0 ? (
						userCommunities.map((community, index) => (
							<TouchableOpacity
								key={index}
								onPress={() => handleNavigateToCommunity(community._id, true)}
							>
								<CommunityCard
									community={community}
									isMember={true}
									handleJoin={handleJoinCommunity}
									handleLeave={handleLeaveCommunity}
								/>
							</TouchableOpacity>
						))
					) : (
						<View className="flex-1 justify-center items-center">
							<Text className="text-gray-500">
								User has not joined any community
							</Text>
						</View>
					)}
				</View>

				<Text className="text-2xl font-semibold mt-8 my-4">
					Discover new communities
				</Text>
				<View>
					{loading ? (
						<LoadingSpinner />
					) : error ? (
						<ErrorMessage error="Failed to load communities" />
					) : nonUserCommunities && nonUserCommunities.length > 0 ? (
						nonUserCommunities.map((community, index) => (
							<TouchableOpacity
								key={index}
								onPress={() => handleNavigateToCommunity(community._id, false)}
							>
								<CommunityCard
									community={community}
									isMember={false}
									handleJoin={handleJoinCommunity}
									handleLeave={handleLeaveCommunity}
								/>
							</TouchableOpacity>
						))
					) : (
						<View className="flex-1 justify-center items-center">
							<Text className="text-gray-500">
								No new communities available
							</Text>
						</View>
					)}
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
