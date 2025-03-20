import { createContext, useContext, useState, useEffect } from "react"
import {
	getAllCommunities,
	joinCommunity,
	leaveCommunity,
	getPostsFromAllUsersCommunities,	
} from "../api/communityApi"
import { AuthContext } from "./AuthContext"

const CommunityContext = createContext()

export const CommunityProvider = ({ children }) => {
	const { userId } = useContext(AuthContext)
	const [userCommunities, setUserCommunities] = useState([])
	const [nonUserCommunities, setNonUserCommunities] = useState([])
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)
	const [communityError, setCommunityError] = useState(null)
	const [postsError, setPostsError] = useState(null)
	const [selectedPost, setSelectedPost] = useState(null)

	useEffect(() => {
		console.log("User id from community", userId)
		if (userId) {
			fetchData()
		}
	}, [userId])	

	const fetchData = async (fetchType = "both") => {
		if (!userId) {
			console.error("No user id provided")
			return
		}
		
		setCommunityError(null)
		setPostsError(null)

		if (fetchType === "communities" || fetchType === "both") {
			try {				
				console.log("Fetching communities for user: ", userId)
				const { userCommunities, nonUserCommunities } = await getAllCommunities(
					userId
				)
				setUserCommunities(userCommunities || [])
				setNonUserCommunities(nonUserCommunities || [])
			} catch (error) {
				console.error("Error fetching communities:", error)
				setCommunityError("Failed to fetch communities. Please try again later.")				
			}
		}

		// Fetch posts
		if (fetchType === "posts" || fetchType === "both") {
			try {
				
				console.log("Fetching posts for user: ", userId)
				const postsData = await getPostsFromAllUsersCommunities(userId)
				setPosts(postsData || [])
			} catch (error) {
				console.error("Error fetching posts:", error)
				setPostsError("Failed to fetch posts. Please try again later.")				
			}
		}

		setLoading(false)
	}

	// Set selected post
	const selectPost = (post) => {
		setSelectedPost(post)
	}

	const handleJoinCommunity = async (communityId) => {
		try {						
			await joinCommunity(communityId)

			setUserCommunities((prevCommunities) => [
				...prevCommunities,
				...nonUserCommunities.filter(
					(community) => community._id === communityId
				),
			])
			setNonUserCommunities((prevCommunities) =>
				prevCommunities.filter((community) => community._id !== communityId)
			)			
			
			fetchData("posts")				
		} catch (error) {
			console.error(error)
		}
	}

	const handleLeaveCommunity = async (communityId) => {
		try {
			await leaveCommunity(communityId)

			setUserCommunities((prevCommunities) =>
				prevCommunities.filter((community) => community._id !== communityId)
			)
			setNonUserCommunities((prevCommunities) => [
				...prevCommunities,
				...userCommunities.filter((community) => community._id === communityId),
			])

			fetchData("posts")			
		} catch (error) {
			console.error(error)
		}
	}	

	const addCommunity = (newCommunity) => {
		setUserCommunities((prevCommunities) => [...prevCommunities, newCommunity])		
	}

	return (
		<CommunityContext.Provider
			value={{
				fetchData,
				userCommunities,				
				nonUserCommunities,				
				posts,				
				loading,
				postsError,
				communityError,
				handleJoinCommunity,
				handleLeaveCommunity,
				selectPost,
				selectedPost,
				addCommunity,				
			}}
		>
			{children}
		</CommunityContext.Provider>
	)
}

export const useCommunity = () => useContext(CommunityContext)