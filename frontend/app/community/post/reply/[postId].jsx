import {
	View,
	Text,
	ScrollView,
	TextInput,
	TouchableOpacity,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import React, { useState } from "react"
import { useCommunity } from "../../../../context/communityContext"
import Post from "../../../../components/Post"
import { createReply } from "../../../../api/communityApi"
import { useRouter } from "expo-router"

const postId = () => {
    const router = useRouter()
	const { selectedPost } = useCommunity()
	const [loading, setLoading] = useState(false)	
	const { userId, communityId } = selectedPost
	const [replyData, setReplyData] = useState({
		content: "",
		postId: selectedPost._id,
		communityId: communityId._id,
	})

	const handleSubmit = async () => {		
		if (!replyData.content) {
			return
		}
		setLoading(true)

        try {
            console.log('axios calling')
			const response = await createReply(replyData)
			console.log(response)
            setLoading(false)
            router.push('/community')
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	return (
		<SafeAreaView className="flex-1 bg-[#E7EDEF]">
			<ScrollView className="px-4 pb-28">
				<Post post={selectedPost} />
				<Text className="font-regular text-blue-500">
					Replying to {userId.fullName}
				</Text>
				<View className="bg-white p-4 my-2 rounded-2xl">
					<View className="border border-gray-400 mt-2 transition duration-300 rounded-lg px-4 pt-4 mb-4 pb-2 bg-white">
						<TextInput
							className="mb-4 outline-none"
							placeholder="What's on your mind?"
							// onContentSizeChange={(event) => {
							// 	const newHeight = event.nativeEvent.contentSize.height
							// 	setInputHeight(Math.min(newHeight, 200))
							// }}
							scrollEnabled={true}
							value={replyData.content}
							maxLength={300}
							multiline
							onChangeText={(text) =>
								setReplyData((prev) => ({ ...prev, content: text }))
							}
							// style={{ height: Math.max(inputHeight, 40), maxHeight: 200 }}
						/>
						<Text className="text-gray-400 text-right">
							{replyData.content.length}/300
						</Text>
					</View>
					<TouchableOpacity
						onPress={handleSubmit}
						className="bg-blue-500 p-2 rounded-lg items-center mt-4"
						disabled={loading}
					>
						<Text className="text-white text-lg font-bold">
							{loading ? "Replying..." : "Reply"}
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default postId
