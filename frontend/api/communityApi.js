import axios from "axios"

// const API_URL = "http://localhost:8070/api"
// const API_URL = "http://192.168.43.214:8070/api"
const API_URL = "http://10.31.30.84:8070/api"

// Fetch posts from all the communities the user have joined
export const getPostsFromAllUsersCommunities = async () => {
	const response = await axios.get(
		`${API_URL}/community-posts/67bc9ceff607c265056765af`
	)
	// console.log("Posts:", response.data)
	return response.data
}

export const getAllCommunities = async () => {	
	const response = await axios.get(
		`${API_URL}/communities/67bc9ceff607c265056765af`
	)
	// console.log("Communities:", response.data)
	return response.data
}

export const getCommunityById = async (communityId) => {
	const response = await axios.get(
		`${API_URL}/communities/community/${communityId}`
	)
	// console.log("Community:", response.data)r
	return response.data
}

export const createCommunity = async (data) => {
	const response = await axios.post(`${API_URL}/communities/create`, data)
	// console.log(response)
	return response.data
}

export const createPost = async (data) => {
	const response = await axios.post(`${API_URL}/community-posts/create`, data)
	// console.log(response)
	return response.data
}

export const joinCommunity = async (communityId) => {	
	const response = await axios.post(`${API_URL}/communities/join/${communityId}`)
	// console.log(response)
	return response.data
}

export const leaveCommunity = async (communityId) => {	
	const response = await axios.post(`${API_URL}/communities/leave/${communityId}`)
	// console.log(response)
	return response.data
}

export const likeUnlikePost = async (postId) => {	
	const response = await axios.post(`${API_URL}/community-posts/like-unlike/${postId}`)
	// console.log(response)
	return response.data
}
