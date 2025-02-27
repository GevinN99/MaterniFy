import axios from "axios"

// const API_URL = "http://localhost:8070/api"
const API_URL = "http://192.168.8.172:8070/api"

export const getPostsFromAllUsersCommunities = async () => {
	try {
		const response = await axios.get(
			`${API_URL}/community-posts/67bc9ceff607c265056765af`
		)
		console.log("Response:", response)
		console.log("Data:", response.data)
		return response.data // Return the fetched data
	} catch (error) {
		console.error("Error fetching data:", error)
		return [] // Return an empty array in case of error
	}
}
