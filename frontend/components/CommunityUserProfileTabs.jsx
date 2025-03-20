import React, { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Post from "./Post"
import CommunityCard from "./CommunityCard"

const CommunityUserProfileTabs = ({userCommunities, userPosts}) => {
	const [activeTab, setActiveTab] = useState("Communities")

	return (
		<View className="flex-1">
			<View className="flex-row">
				<TouchableOpacity
					className={`flex-1 p-3 items-center ${
						activeTab === "Communities" ? " " : ""
					}`}
					onPress={() => setActiveTab("Communities")}
				>
					<Text
						className={`text-lg font-semibold ${
							activeTab === "Communities" ? "text-blue-500" : "text-gray-500"
						}`}
					>
						Communities
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					className={`flex-1 p-3 items-center ${
						activeTab === "Posts" ? " " : ""
					}`}
					onPress={() => setActiveTab("Posts")}
				>
					<Text
						className={`text-lg font-semibold ${
							activeTab === "Posts" ? "text-blue-500" : "text-gray-500"
						}`}
					>
						Your posts
					</Text>
				</TouchableOpacity>
			</View>
			{/* Content Section */}
			<ScrollView className=" bg-[#E7EDEF]">
				{activeTab === "Communities" ? (
					<View>
						{userCommunities.length > 0 ? (
							userCommunities.map((community, index) => (
								<CommunityCard
									community={community}
									isMember={true}
									// handleJoin={handleJoinCommunity}
									// handleLeave={handleLeaveCommunity}
								/>
							))
						) : (
							<Text className="text-center text-gray-500 mt-4">
								You haven't joined any communities.
							</Text>
						)}
					</View>
				) : (
					<View>
						{userPosts.length > 0 ? (
							userPosts.map((post, index) => <Post post={post} />)
						) : (
							<Text className="text-center text-gray-500 mt-4">
								You haven't created any posts.
							</Text>
						)}
					</View>
				)}
			</ScrollView>
		</View>
	)
}

export default CommunityUserProfileTabs
