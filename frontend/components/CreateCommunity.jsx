import { View, Text, Modal, TextInput, StyleSheet } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Image } from "expo-image"
import { createCommunity } from "../api/communityApi"
import { Alert } from "react-native"

const CreateCommunity = ({ visible, onClose }) => {
	const [communityDetails, setCommunityDetails] = useState({
		name: "",
		description: "",
		imageUrl: "",
    })
    const [image, setImage] = useState(null)

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		if (!result.canceled) {
			setImage(result.assets[0].uri)
			console.log(result)
		}
	}

	const handleSubmit = async () => {
        if (!communityDetails.name || !communityDetails.description) {
            Alert.alert("Please fill in all fields")
            console.log('fill all')
			return
        }
        
        try {
            const response = await createCommunity(communityDetails)
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
					<View className="flex-row items-center mb-4 p-4">
						<TouchableOpacity onPress={onClose}>
							<Ionicons
								name="close"
								size={24}
								color="black"
							/>
						</TouchableOpacity>
						<Text className="text-xl font-bold ml-4">Create Community</Text>
					</View>
					<View className="p-3 m-2 rounded-lg flex gap-4">
						<View className="flex justify-center items-center">
							{image ? (
								<View>									
									<Image
										source={{ uri: image }}
										style={[styles.postImage]}
										contentFit="cover"
										transition={1000}
									/>
									{/* </TouchableOpacity> */}
									<TouchableOpacity
										className="absolute -right-2 -bottom-2 bg-gray-100 border border-gray-200 p-1 rounded-full"
										onPress={pickImage}
									>
										<Ionicons
											name="image"
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
						<View>
							<Text className="font-light">Name</Text>
							<TextInput
								className="mt-2 py-2 mb-1 outline-none border-b border-gray-300 focus:border-b-2 focus:border-blue-500 transition-all duration-300"
								placeholder="Enter a name"
								maxLength={40}
								value={communityDetails.name}
								onChangeText={(text) =>
									setCommunityDetails((prev) => ({ ...prev, name: text }))
								}
							/>
						</View>

						<View>
							<Text className="font-light">Description</Text>
							<TextInput
								className="mt-2 py-2 mb-1 outline-none border-b border-gray-300 focus:border-b-2 focus:border-blue-500 transition-all duration-300"
								placeholder=""
								maxLength={100}
								value={communityDetails.description}
								multiline={true}
								onChangeText={(text) =>
									setCommunityDetails((prev) => ({
										...prev,
										description: text,
									}))
								}
							/>
						</View>
						<TouchableOpacity
							className="bg-blue-400 items-center py-3 rounded-md"							
							onPress={handleSubmit}
						>
							<Text className="font-bold text-white">Create Community</Text>
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
		width: 100,
		height: undefined,
		aspectRatio: 1,
		borderRadius: 10,
	},	
})

export default CreateCommunity
