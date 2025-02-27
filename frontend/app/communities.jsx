import { View, Text, TextInput, ScrollView } from "react-native"
import React, { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { Link } from "expo-router"
import CommunityCard from "../components/CommunityCard"
import image from '../assets/images/image1.jpg'

const Communities = () => {
	const [searchQuery, setSearchQuery] = useState("")

	return (
		<ScrollView className="flex-1 p-4 bg-[#E7EDEF]">
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

			<Text className="text-2xl font-semibold  my-4">Your communities</Text>
			<View>
				<CommunityCard
					image={image}
					name="Pregnancy Support"
					members={150}
					description="A supportive group for expecting mothers.A supportive group for expecting mothersA supportive group for expecting mothersA supportive group for expecting mothersA supportive group for expecting mothersA supportive group for expecting mothersA supportive group for expecting mothers"
				/>
			</View>

			<Text className="text-2xl font-semibold mt-8 my-4">
				Dicover new communities
			</Text>
			<View>
				<CommunityCard
					image={image}
					name="Pregnancy Support"
					members={150}
					description="A supportive group for expecting mothers."
				/>
			</View>
			<View>
				<CommunityCard
					image={image}
					name="Pregnancy Support"
					members={150}
					description="A supportive group for expecting mothers."
				/>
			</View>
			<View>
				<CommunityCard
					image={image}
					name="Pregnancy Support"
					members={150}
					description="A supportive group for expecting mothers."
				/>
			</View>
			<View>
				<CommunityCard
					image={image}
					name="Pregnancy Support"
					members={150}
					description="A supportive group for expecting mothers."
				/>
			</View>
		</ScrollView>
	)
}

export default Communities
