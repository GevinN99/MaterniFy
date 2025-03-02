import React, { useState, useEffect } from "react"
import { Picker } from "@react-native-picker/picker"
import CustomPicker from "./CustomPicker"
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
import { createPost, getAllCommunities } from "../api/communityApi"
import uploadImage from "../utils/uploadImage"

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
				const { userCommunities } = await getAllCommunities()
				setUserCommunities(userCommunities || [])
				console.log(userCommunities)
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

		setLoading(true)

		try {
			let imageUrl = ""

			if (image) {
				imageUrl = await uploadImage(image)
			}

			const response = await createPost({ ...postDetails, imageUrl })
			console.log(response)
			setLoading(false)
			onClose()
		} catch (error) {
			console.log(error)
			setLoading(false)
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
							className="border-none outline-none rounded-lg p-2 mb-4"
							placeholder="What's on your mind?"
							value={postDetails.content}
							multiline
							onChangeText={(text) =>
								setPostDetails((prev) => ({ ...prev, content: text }))
							}
						/>
						{/* <Picker
							className="outline-none border-none "
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
						</Picker>						 */}						

						{userCommunities && (
							<CustomPicker
								items={userCommunities.map((community) => ({
									label: community.name,
									value: community._id,
									imageUrl: community.imageUrl,
								}))}
								selectedValue={postDetails.communityId}
								onValueChange={(itemValue) =>
									setPostDetails((prev) => ({
										...prev,
										communityId: itemValue,
									}))
								}
							/>
						)}

						<View className="flex justify-center items-center">
							{image ? (
								<View>
									<Image
										source={{ uri: image }}
										style={[styles.postImage]}
										contentFit="contain"
										transition={1000}
									/>
									<TouchableOpacity
										className="absolute right-2 top-2 bg-gray-100 border border-gray-200 p-1 rounded-full"
										onPress={() => setImage("")}
									>
										<Ionicons
											name="close"
											size={20}
											color="grey"
										/>
									</TouchableOpacity>
								</View>
							) : (
								<TouchableOpacity
									onPress={pickImage}
									className="flex justify-center items-center rounded-lg border border-dashed border-gray-300 p-8 w-fit"
								>
									<Ionicons
										name="images"
										size={20}
										color="grey"
									/>
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
		// Width: 400, for web. '100%' not valid for web
		width: "100%",
		height: undefined,
		aspectRatio: 1,
		borderRadius: 10,
	},
})

export default CreatePost
