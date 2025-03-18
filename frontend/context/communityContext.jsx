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
	const [error, setError] = useState(null)
	const [selectedPost, setSelectedPost] = useState(null)

	useEffect(() => {
		console.log("userId", userId)
		if (userId) {
			fetchData(userId)
		}
	}, [userId])

	const fetchData = async (userId ,fetchType = "both") => {
		setLoading(true)
		console.log("fetchType data", fetchType)
		
		try {
			if (fetchType === "communities" || fetchType === "both") {
				console.log("Fetching communities: ")
				const { userCommunities, nonUserCommunities } =
					await getAllCommunities(userId)
				setUserCommunities(userCommunities || [])
				setNonUserCommunities(nonUserCommunities || [])
			}

			if (fetchType === "posts" || fetchType === "both") {
				console.log("Fetching posts: ")
				const postsData = await getPostsFromAllUsersCommunities(userId)
				setPosts(postsData || [])
			}
		} catch (error) {
			setError(error)
			console.error(error)
		} finally {
			setLoading(false)
		}
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

	return (
		<CommunityContext.Provider
			value={{
				fetchData,
				userCommunities,
				nonUserCommunities,
				posts,
				loading,
				error,
				handleJoinCommunity,
				handleLeaveCommunity,
				// setUpdateTrigger,
				selectPost,
				selectedPost,
			}}
		>
			{children}
		</CommunityContext.Provider>
	)
}

export const useCommunity = () => useContext(CommunityContext)
