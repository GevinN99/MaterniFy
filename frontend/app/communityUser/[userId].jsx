import {
	View,
	Text,
	FlatList,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
} from "react-native"
import { useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import React, { useState } from "react"
import Feather from "@expo/vector-icons/Feather"
import CommunityUserProfileTabs from "../../components/CommunityUserProfileTabs"
import { useCommunity } from "../../context/communityContext"
import CompactCommunityCard from "../../components/CompactCommunityCard"
import Post from "../../components/Post"

const CommunityUserProfile = () => {
	const { userId } = useLocalSearchParams()
	const { userCommunities, posts } = useCommunity()
	const [userPosts, setUserPosts] = useState(
		posts.filter((post) => post.userId._id === userId)
	)

	const renderHeader = () => (
		<View className="relative rounded-xl">
			<View className="bg-white p-4 rounded-xl mx-4">
				<View className="bg-blue-100 pt-6 pb-16 px-4 rounded-lg relative mx-4">
					<Text className="text-2xl font-bold text-center">Chamika Banu</Text>
				</View>

				{/* Community Image */}
				<View className="flex justify-center items-center -mt-10 mb-4 ">
					<View className="rounded-full overflow-hidden border-4 border-white shadow-md">
						<Image
							source={{
								uri: "https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
							}}
							style={styles.profileImage}
							contentFit="cover"
							transition={300}
						/>
					</View>
					<View className="flex-row justify-center gap-6 mt-4">
						<View className="flex items-center">
							<Text className="text-xl font-semibold">
								{userCommunities.length}
							</Text>
							<Text className="text-lg text-gray-500">Communities</Text>
						</View>
						<View className="flex items-center">
							<Text className="text-xl font-semibold">{userPosts.length}</Text>
							<Text className="text-lg text-gray-500">Posts</Text>
						</View>
					</View>
				</View>
			</View>
			<View className="mt-4">
				<View className=" flex-row items-center ml-4 mb-2">
					<Feather
						name="users"
						size={20}
					/>
					<Text className="ml-4 text-2xl font-bold">Communities</Text>
				</View>

				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					className="pl-2 py-2"
				>
					{userCommunities.map((community) => (
						<CompactCommunityCard
							key={community._id}
							community={community}
						/>
					))}
				</ScrollView>
			</View>

			{/* Posts Section Header */}
			<View className="mt-4">
				<View className="flex-row items-center ml-4 mb-2">
					<Feather
						name="file-text"
						size={20}
					/>
					<Text className="ml-4 text-2xl font-bold">Posts</Text>
				</View>
			</View>
		</View>
	)

	return (
		<SafeAreaView className="flex-1 bg-[#E7EDEF]">
			<FlatList
				data={userPosts}
				keyExtractor={(post) => post._id}
				renderItem={({ item }) => (
					<View className="px-4">
						<Post post={item} />
					</View>
				)}
				ListHeaderComponent={renderHeader}
				contentContainerStyle={{ paddingBottom: 16 }}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	profileImage: {
		width: 80,
		height: 80,
		borderRadius: 50,
	},
})

export default CommunityUserProfile
