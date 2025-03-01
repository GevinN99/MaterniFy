import { View, Text, Image, StyleSheet, Pressable } from "react-native"
import { useRouter } from "expo-router"
import React from "react"

const CommunityHeader = () => {
	const router = useRouter()
	return (		
		<View className="flex flex-row justify-between mx-4 my-4 items-center">
			<Image
				source={""}
				style={styles.profileImage} // Only Image uses StyleSheet
			/>
			<Pressable onPress={() => router.push("/communities")}>
				<View>
					<Text className="text-black font-bold bg-[#6DE6FF] px-3 py-1 rounded-md border-2 border-black">
						Communities
					</Text>
				</View>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	profileImage: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
})

export default CommunityHeader
