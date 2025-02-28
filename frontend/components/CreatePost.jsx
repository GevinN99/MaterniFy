import React, { useState, useEffect } from "react"
import {Picker} from '@react-native-picker/picker';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	Modal,
	StyleSheet,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import { Alert } from "react-native"
import { createPost, getUserCommunities } from "../api/communityApi"

const CreatePost = ({ visible, onClose }) => {	
    const [userCommunities, setUserCommunities] = useState(null)
	const [loading, setLoading] = useState(false)
	const [postDetails, setPostDetails] = useState({
        content: "",
        communityId: "",
		imageUrl: "",
    })
    const [image, setImage] = useState(null)

    useEffect(() => {			
			const fetchUserCommunities = async () => {
				try {
					const fetchedUserCommunities = await getUserCommunities()
					setUserCommunities(fetchedUserCommunities || [])
					console.log(fetchedUserCommunities)
				} catch (error) {
					console.log(error)
				}
			}
			
			fetchUserCommunities()
		}, [])

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			quality: 1,
		})

		if (!result.canceled) {            
            setImage(result.assets[0].uri)
			console.log(result)
		}
	}	
    
    const handleSubmit = async () => {
			if (!postDetails.content) {
				Alert.alert("Please fill in all fields")
				console.log("fill all")
				return
			}

			try {
				const response = await createPost(postDetails)
				console.log(response)
			} catch (error) {
				console.log(error)
			}
		}

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View style={styles.modal}>
				<SafeAreaView className="w-11/12 bg-white rounded-lg">
					<View className="flex-row items-center p-4">
						<TouchableOpacity onPress={onClose}>
							<Ionicons
								name="close"
								size={24}
								color="black"
							/>
						</TouchableOpacity>
						<Text className="text-xl font-bold ml-4">Create Post</Text>
					</View>
					<View className="p-3 m-2 rounded-lg flex gap-4">
						<TextInput
							// className="h-3/6 border border-gray-300 rounded-lg p-2 mb-4"
							placeholder="What's on your mind?"
							value={postDetails.content}
							multiline
							onChangeText={(text) =>
								setPostDetails((prev) => ({ ...prev, content: text }))
							}
						/>
						<Picker
							selectedValue={postDetails.communityId}
							onValueChange={(itemValue) =>
								setPostDetails((prev) => ({ ...prev, communityId: itemValue }))
							}
							style={styles.picker}
						>
							<Picker.Item
								label="Select a community"
								value=""
							/>
							{userCommunities &&
								userCommunities.map((community, index) => (
									<Picker.Item
										key={index}
										label={community.name}
										value={community._id}
									/>
								))}
						</Picker>
						<View className="flex justify-center items-center">
							{image ? (
								<View>
									{/* <TouchableOpacity onPress={pickImage}> */}
									<Image
										source={{ uri: image }}
										style={[styles.postImage]}
										contentFit="cover"
										transition={1000}
									/>
									{/* </TouchableOpacity> */}
									<TouchableOpacity
										className="absolute right-2 top-2 bg-gray-100 border border-gray-200 p-1 rounded-full"
										onPress={() => setImage(null)}
									>
										<Ionicons
											name="close"
											size={20}
											color="grey"
										/>
									</TouchableOpacity>
								</View>
							) : (
								// <TouchableOpacity
								// 	onPress={pickImage}
								// 	className="flex justify-center items-center rounded-lg border border-dashed border-gray-300 p-8 w-fit"
								// >
								// 	<Ionicons
								// 		name="images"
								// 		size={20}
								// 		color="grey"
								// 	/>
								//     </TouchableOpacity>
								<TouchableOpacity
									onPress={pickImage}
									className="bg-blue-400 w-full p-4 rounded-lg items-center"
								>
									<Text className="text-white text-lg font-bold">
										Upload Image
									</Text>
								</TouchableOpacity>
							)}
						</View>
						<TouchableOpacity
							onPress={handleSubmit}
							className="bg-blue-500 p-4 rounded-lg items-center"
							disabled={loading}
						>
							<Text className="text-white text-lg font-bold">
								{loading ? "Posting..." : "Post"}
							</Text>
						</TouchableOpacity>
					</View>
				</SafeAreaView>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modal: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},

	postImage: {
		width: "100%",
		height: undefined,
		aspectRatio: 1,
		borderRadius: 10,
	},
})

export default CreatePost
