import { View, Text, StyleSheet, Pressable } from "react-native"
import { useRouter } from "expo-router"
import { Image } from "expo-image"
import React from "react"

const CommunityHeader = () => {
	const router = useRouter()

	const handleNavigateToProfile = () => { 
		router.push({
			pathname: "/communityUser/67bc9ceff607c265056765af",			
		})
	}
	return (
		<View className="flex flex-row justify-between  my-4 items-center">
			<Pressable onPress={handleNavigateToProfile}>
				<Image
					source={{uri:
						"https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					}}
					style={styles.profileImage} // Only Image uses StyleSheet
					transition={300}
				/>
			</Pressable>
			<Pressable onPress={() => router.push("communities")}>
				<View>
					<Text className="text-blue-500 text-lg  bg-blue-500/10 px-3 py-1 rounded-md border border-blue-500">
						Communities
					</Text>
				</View>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	profileImage: {
		width: 60,
		height: 60,
		borderRadius: 50,		
	},
})

export default CommunityHeader