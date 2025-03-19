import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { Feather } from "@expo/vector-icons"
import React from "react"
import { useRouter } from "expo-router"

const CompactCommunityCard = ({ community }) => {
    const router = useRouter()
	const { imageUrl, name, members, _id:communityId } = community
	const blurhash =
		"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["

	return (
		<TouchableOpacity
			className=" w-[160px] bg-white rounded-xl overflow-hidden pb-4 mx-2"
			onPress={() => router.push(`/community/${communityId}`)}
		>
			{/* Community Cover Image */}
			<View>
				{imageUrl && (
					<Image
						source={{ uri: imageUrl }}
						style={styles.communityImage}
						contentFit="cover"
						placeholder={{ blurhash }}
						transition={300}
					/>
				)}
			</View>

			{/* Community Info */}
			<View className="pt-3 px-2">
				<Text className="text-lg font-semibold line-clamp-1">{name}</Text>
				<View className="flex-row items-center mt-1">
					<Feather
						name="users"
						size={14}
						color="#6b7280"
					/>
					<Text className="text-md text-gray-500 ml-2">
						{members.length} members
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	communityImage: {
		width: "100%",
		height: "100%",
		minHeight: 120,
		flex: 1,
	},
})

export default CompactCommunityCard
