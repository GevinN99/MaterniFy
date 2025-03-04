import { View, Text, Image, StyleSheet, Pressable } from "react-native"
import { useRouter } from "expo-router"
import React from "react"

const CommunityHeader = () => {
	const router = useRouter()

	const handleNavigateToProfile = () => { 
		router.push({
			pathname: "/communityUserProfile/67bc9ceff607c265056765af",			
		})
	}
	return (
		<View className="flex flex-row justify-between mx-4 my-4 items-center">
			<Pressable onPress={handleNavigateToProfile}>
				<Image
					source={
						"https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					}
					style={styles.profileImage} // Only Image uses StyleSheet
				/>
			</Pressable>
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
		width: 50,
		height: 50,
		borderRadius: 50,		
	},
})

export default CommunityHeader
