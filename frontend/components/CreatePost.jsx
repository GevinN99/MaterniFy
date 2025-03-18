import React, { useState, useEffect } from "react"
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	Modal,
	StyleSheet,
	ScrollView,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import { createPost } from "../api/communityApi"
import uploadImage from "../utils/uploadImage"
import CommunityPicker from "./CommunityPicker"
import Feather from "@expo/vector-icons/Feather"
import { useCommunity } from "../context/communityContext"

const CreatePost = ({ visible, onClose }) => {
	const { userCommunities, fetchData } = useCommunity()
	const [inputHeight, setInputHeight] = useState(30)
	const [loading, setLoading] = useState(false)
	const [postDetails, setPostDetails] = useState({
		content: "",
		communityId: "",		
	})
	const [errors, setErrors] = useState({
		content: "",
		community: "",
		server: "",
	})
	const [image, setImage] = useState(null)

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
		console.log(postDetails.content)
		setErrors({ content: "", community: "", server: "" })

		let hasErrors = false

		if (!postDetails.content.trim()) {
			setErrors((prevErros) => ({
				...prevErros,
				content: "Content is required",
			}))
			hasErrors = true
		}

		if (!postDetails.communityId) {
			setErrors((prevErros) => ({
				...prevErros,
				community: "Select a Community",
			}))
			hasErrors = true
		}

		if (hasErrors) {
			return
		}	

		setLoading(true)

		try {
			let imageUrl = ""

			if (image) {
				imageUrl = await uploadImage(image)
			}

			const response = await createPost({ ...postDetails, imageUrl })
			setLoading(false)
			fetchData("posts")
			handleClose()			
		} catch (error) {
			setErrors({ ...errors, server: "Something went wrong! Try again later." })
			console.log(error)
			setLoading(false)
		}
	}

	const handleClose = () => {
		setPostDetails({ content: "", communityId: "" })
		setErrors({ content: "", community: "", server: "" })
		setImage(null)
		onClose()
	}

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={visible}
			onRequestClose={handleClose}
		>
			<View style={styles.modal}>
				<SafeAreaView className="w-11/12 bg-white rounded-lg">
					<ScrollView>
						<View className="flex-row items-center p-4">
							<TouchableOpacity onPress={handleClose}>
								<Ionicons
									name="close"
									size={24}
									color="black"
								/>
							</TouchableOpacity>
							<Text className="text-xl font-bold ml-4">Create Post</Text>
						</View>
						<View className="px-4 pb-4">
							<View className="rounded-lg p-4 bg-slate-100">
								<View className="flex flex-row items-center gap-4 mb-4">
									<Image
										source={{
											uri: "https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
										}}
										style={styles.profileImage} // Only Image uses StyleSheet
									/>
									<Text className="font-semibold">Ellyse Perry</Text>
								</View>

								{errors.content && (
									<Text className="text-red-500 my-1">*{errors.content}</Text>
								)}
								<View className="transition duration-300 rounded-lg px-4 pt-4 mb-4 pb-2 bg-white">
									<TextInput
										className="mb-4 outline-none"
										placeholder="What's on your mind?"
										onContentSizeChange={(event) => {
											const newHeight = event.nativeEvent.contentSize.height
											setInputHeight(Math.min(newHeight, 200))
										}}
										scrollEnabled={true}
										value={postDetails.content}
										maxLength={300}
										multiline
										onChangeText={(text) => {
											setPostDetails((prev) => ({ ...prev, content: text }))
											setErrors((prevErrors) => ({
												...prevErrors,
												content: "",
											}))
										}
										}
										style={{
											height: Math.max(inputHeight, 40),
											maxHeight: 200,
										}}
									/>
									{image && (
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
									)}
									<View className="flex flex-row justify-between items-center mt-4 ">
										<TouchableOpacity onPress={pickImage}>
											{/* <Camera
											size={20}
											className="text-gray-400"
										/> */}
											<Feather
												name="camera"
												style={styles.icon}
												size={20}
												color="#9ca3af"
											/>
										</TouchableOpacity>

										<Text className="text-gray-400">
											{postDetails.content.length}/300
										</Text>
									</View>
								</View>

								{errors.community && (
									<Text className="text-red-500 my-1">*{errors.community}</Text>
								)}
								<CommunityPicker
									items={userCommunities.map((community) => ({
										label: community.name,
										value: community._id,
										imageUrl: community.imageUrl,
									}))}
									selectedValue={postDetails.communityId}
									onValueChange={(itemValue) => {
										setPostDetails((prev) => ({
											...prev,
											communityId: itemValue,
										}))
										setErrors((prevErrors) => ({
											...prevErrors,
											community: "",
										}))
									}
									}
								/>
							</View>
							{errors.server && (
								<Text className="text-red-500 mt-4">{errors.server}</Text>
							)}
							<TouchableOpacity
								onPress={handleSubmit}
								className="bg-blue-500 p-2 rounded-lg items-center mt-4"
								disabled={loading}
							>
								<Text className="text-white text-lg font-bold">
									{loading ? "Posting..." : "Post"}
								</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
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

	profileImage: {
		width: 30,
		height: 30,
		borderRadius: 50,
	},
})

export default CreatePost
