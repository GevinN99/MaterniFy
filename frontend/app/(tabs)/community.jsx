import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Pressable,
	RefreshControl,
	StyleSheet,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import React, { useState, useEffect, useContext, useRef } from "react"
import Post from "../../components/Post"
import ErrorMessage from "../../components/ErrorMessage"
import CreatePost from "../../components/CreatePost"
import { useCommunity } from "../../context/communityContext"
import LoadingSpinner from "../../components/LoadingSpinner"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { AuthContext } from "../../context/AuthContext"
import axiosInstance from "../../api/axiosInstance"

const Community = () => {
	const blurhash = "LCKMX[}@I:OE00Eg$%Na0eNHWp-B"
	const router = useRouter()
	const {
		posts,
		loading,
		postsError: error,
		selectPost,
		refreshData,
	} = useCommunity()
	const [isModalVisible, setIsModalVisible] = useState(false)
	const { userId } = useContext(AuthContext)
	const [isButtonVisible, setIsButtonVisible] = useState(true)
	const hideTimeout = useRef(null)
	const [profileImage, setProfileImage] = useState()

	useEffect(() => {		
		const fetchUser = async () => {
			try {
				const response = await axiosInstance.get("/users/profile")
				setProfileImage(response.data.profileImage)
			} catch (error) {
				console.log(error)
			}
		}

		fetchUser()
	}, [])

	// Function to show the button
	const showButton = () => {
		// Clear any existing timeout
		if (hideTimeout.current) {
			clearTimeout(hideTimeout.current)
		}

		// Show the button
		setIsButtonVisible(true)

		// Set timeout to hide button after 3 seconds of inactivity
		hideTimeout.current = setTimeout(() => {
			setIsButtonVisible(false)
		}, 2000)
	}

	// Show button on component mount
	useEffect(() => {
		showButton()

		// Clean up timeout on unmount
		return () => {
			if (hideTimeout.current) {
				clearTimeout(hideTimeout.current)
			}
		}
	}, [])

	const handleNavigation = (postId, post) => {
		selectPost(post)
		router.push(`/community/post/${postId}`)
	}

	const handleNavigateToProfile = () => {
		router.push({
			pathname: `/communityUser/${userId}`,
		})
	}

	return (
		<SafeAreaView className="flex-1 bg-[#E7EDEF]" onTouchStart={showButton}>
			<ScrollView
				className="px-4"
				refreshControl={
					<RefreshControl
						refreshing={loading} 
						onRefresh={refreshData} 
					/>
				}
				onScrollBeginDrag={showButton}
				onTouchStart={showButton}
			>
				<View className="flex flex-row justify-between  my-4 items-center">
					<Pressable onPress={handleNavigateToProfile}>
						<Image
							source={{ uri: profileImage }}
							style={styles.profileImage}
							placeholder={{ blurhash }}
							transition={300}
						/>
					</Pressable>
					<TouchableOpacity onPress={() => router.push("communities")}>
						<View>
							<Text className="text-blue-500 text-lg  bg-blue-500/10 px-3 py-1 rounded-md border border-blue-500">
								Communities
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View className="flex flex-row justify-between">
					<Text className="text-xl font-bold my-2">Your feed</Text>
				</View>
				<CreatePost
					visible={isModalVisible}
					onClose={() => setIsModalVisible(false)}
				/>
				{loading ? (
					<LoadingSpinner styles={"mt-44"} />
				) : error ? (
					<ErrorMessage
						error={error}
						styles="mt-44"
					/>
				) : posts.length > 0 ? ( // If no error, check for posts
					<View>
						{posts.map((post, index) => (
							<Pressable
								key={index}
								onPress={() => handleNavigation(post._id, post)}
							>
								<Post post={post} />
							</Pressable>
						))}
					</View>
				) : (
					<View className="flex-1 justify-center items-center mt-52">
						<Text className="text-gray-500 text-base text-center">
							No posts to show. Explore and find communities to join!
						</Text>
					</View>
				)}
			</ScrollView>
			
			{isButtonVisible && (
				<TouchableOpacity
					onPress={() => {
						setIsModalVisible(true)
						showButton()
					}}
					className="absolute right-4 bottom-5 z-10 bg-blue-200/70 text-blue-500 border border-blue-500 w-20 h-20 pl-1 pb-.5 flex justify-center items-center rounded-full "
				>
					<Ionicons
						name="create-outline"
						size={28}
						color="#3b82f6"
					/>
				</TouchableOpacity>
			)}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	profileImage: {
		width: 60,
		height: 60,
		borderRadius: 50,
	},
})

export default Community
