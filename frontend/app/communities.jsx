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
import { getAllCommunities, getUserCommunities } from "../api/communityApi"
import CreateCommunity from "../components/CreateCommunity"

const Communities = () => {
	const [searchQuery, setSearchQuery] = useState("")
	const [allCommunities, setAllCommunities] = useState([])
	const [userCommunities, setUserCommunities] = useState([])
	const [isModalVisible, setIsModalVisible] = useState(false)	

	useEffect(() => {
		const fetchAllCommunities = async () => {
			try {
				const fetchedAllCommunities = await getAllCommunities()
				setAllCommunities(fetchedAllCommunities || [])
				console.log(fetchedAllCommunities)
			} catch (error) {
				console.log(error)
			}
		}

		const fetchUserCommunities = async () => {
			try {				
				const fetchedUserCommunities = await getUserCommunities()
				setUserCommunities(fetchedUserCommunities || [])
				console.log(fetchedUserCommunities)
			} catch (error) {
				console.log(error)
			}
		}

		fetchAllCommunities()
		fetchUserCommunities()
	}, [])

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
					{userCommunities &&
						userCommunities.map((community, index) => (
							<CommunityCard
								key={index}
								image={
									community.imageUrl
										? { uri: community.imageUrl }
										: null
								}
								name={community.name}
								members={community.members.length}
								description={community.description}
							/>
						))}
				</View>

				<Text className="text-2xl font-semibold mt-8 my-4">
					Discover new communities
				</Text>
				<View>
					{allCommunities &&
						allCommunities.map((community, index) => (
							<CommunityCard
								key={index}
								image={
									community.imageUrl
										? { uri: community.imageUrl }
										: null
								}
								name={community.name}
								members={community.members.length}
								description={community.description}
							/>
						))}
				</View>
			</ScrollView>
			<CreateCommunity
				visible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
			/>
		</SafeAreaView>
	)
}

export default Communities
