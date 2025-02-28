import axios from "axios"

// const API_URL = "http://localhost:8070/api"
const API_URL = "http://192.168.8.172:8070/api"

export const getPostsFromAllUsersCommunities = async () => {
	const response = await axios.get(
		`${API_URL}/community-posts/67bc9ceff607c265056765af`
	)
	console.log("Posts:", response.data)
	return response.data
}

export const getAllCommunities = async () => {
	const response = await axios.get(`${API_URL}/communities`)
	console.log("Communities:", response.data)
	return response.data
}

export const getUserCommunities = async () => {
	const response = await axios.get(`${API_URL}/communities/user/67bc9ceff607c265056765af`)
	console.log("Communities:", response.data)
	return response.data
}

export const createCommunity = async (data) => {
	const response = await axios.post(`${API_URL}/communities/create`, data)
	console.log(response)
	return response.data
}

export const createPost = async (data) => {
	const response = await axios.post(`${API_URL}/community-posts/create`, data)
	console.log(response)
	return response.data
}