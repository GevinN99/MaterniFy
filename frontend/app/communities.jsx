import {
	View,
	Text,
	TextInput,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	Pressable,
} from "react-native"
import { Image } from "expo-image"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import React, { useEffect, useState } from "react"
import { useRouter } from "expo-router"
import CommunityCard from "../components/CommunityCard"
import CreateCommunity from "../components/CreateCommunity"
import {useCommunity} from "../context/communityContext"
import ErrorMessage from "../components/ErrorMessage"
import LoadingSpinner from "../components/LoadingSpinner"
import Feather from "@expo/vector-icons/Feather"

const Communities = () => {
	const [searchQuery, setSearchQuery] = useState("")
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [searching, setSearching] = useState(false)
	const [searchResults, setSearchResults] = useState([])
	const {
		userCommunities,
		nonUserCommunities,
		handleJoinCommunity,
		handleLeaveCommunity,
		fetchData,
		error,
		loading,
	} = useCommunity()
	const router = useRouter()
	const allCommunities = userCommunities.concat(nonUserCommunities)

	useEffect(() => {
		if (searching) {
			if (searchQuery.trim() === "") {
				setSearchResults(allCommunities) // Show all communities when search is empty
			} else {
				const results = allCommunities.filter((community) =>
					community.name.toLowerCase().includes(searchQuery.toLowerCase())
				)
				setSearchResults(results)
			}
		}
	}, [searchQuery, searching])

	const handleNavigateToCommunity = (communityId) => {
		router.push(`/community/${communityId}`)
	}

	return (
		<SafeAreaView className="flex-1 bg-[#E7EDEF]">
			<View className="relative flex justify-center px-4">
				<Ionicons
					name="search-outline"
					size={20}
					color={searching ? "#3b82f6" : "#d1d5db"}
					className="absolute left-6 bottom-7 z-10"
				/>

				<TextInput
					onFocus={() => setSearching(true)}
					className="h-12 pl-10 pr-4 border border-gray-300 rounded-3xl bg-white mb-4 focus:outline-none focus:border-blue-500 duration-300 transition-all"
					placeholder="Search communities..."
					value={searchQuery}
					onChangeText={(value) => setSearchQuery(value)}
				/>
			</View>

			{searching ? (
				<ScrollView className=" mx-4 bg-white rounded-xl mb-4 ">
					<View className="flex flex-row items-center px-4 mt-4 mb-2">
						<Text className="text-xl font-bold flex-1">Search results</Text>
						<Pressable onPress={() => setSearching(false)}>
							<Ionicons
								name="close"
								size={24}
								color="black"
							/>
						</Pressable>
					</View>

					<View className="flex gap-4 p-4">
						{searchResults.length === 0 && searchQuery.trim() !== "" ? (
							<View className="flex flex-row gap-4 items-center justify-center py-6">
								<Feather
									name="alert-circle"
									size={24}
									color="gray"
								/>
								<Text className="text-gray-500">
									We couldn't find what you're looking for.
								</Text>
							</View>
						) : (
							searchResults.map((community, index) => (
								<Pressable
									key={index}
									onPress={() => handleNavigateToCommunity(community._id)}
								>
									<View className="flex flex-row gap-4 items-center">
										<Image
											source={{ uri: community.imageUrl }}
											contentFit="cover"
											style={styles.communityImage}
										/>
										<View>
											<Text className="font-bold">{community.name}</Text>
											<Text>{community.description}</Text>
										</View>
									</View>
								</Pressable>
							))
						)}
					</View>
				</ScrollView>
			) : (
				<ScrollView className="px-4">
					<Text className="text-2xl font-semibold my-4">Your communities</Text>
					<View>
						{loading ? (
							<LoadingSpinner />
						) : error ? (
							<ErrorMessage error="Failed to load communities" />
						) : userCommunities && userCommunities.length > 0 ? (
							userCommunities.map((community, index) => (
								<Pressable
									key={index}
									onPress={() => handleNavigateToCommunity(community._id, true)}
								>
									<CommunityCard
										community={community}
										isMember={true}
										handleJoin={handleJoinCommunity}
										handleLeave={handleLeaveCommunity}
									/>
								</Pressable>
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
								<Pressable
									key={index}
									onPress={() =>
										handleNavigateToCommunity(community._id, false)
									}
								>
									<CommunityCard
										community={community}
										isMember={false}
										handleJoin={handleJoinCommunity}
										handleLeave={handleLeaveCommunity}
									/>
								</Pressable>
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
			)}
			<TouchableOpacity
				onPress={() => setIsModalVisible(true)}
				className="absolute right-6 bottom-5 z-10 bg-blue-200/70 text-blue-500 border border-blue-500 w-16 h-16 pl-1 pb-.5 flex justify-center items-center rounded-full "
			>
				<Ionicons
					name="create-outline"
					size={28}
					color="#3b82f6"
				/>
			</TouchableOpacity>
			<CreateCommunity
				visible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
				onCommunityCreated={() => fetchData("communities")}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	communityImage: {
		width: 40,
		height: 40,
		borderRadius: 50,
	},
})

export default Communities
