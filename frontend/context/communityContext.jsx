import { createContext, useContext, useEffect, useState } from "react"
import {
	getAllCommunities,
	joinCommunity,
	leaveCommunity,
	getPostsFromAllUsersCommunities,
} from "../api/communityApi"
import getUserId from "../utils/getUserId"

const CommunityContext = createContext()

export const CommunityProvider = ({ children }) => {
	const [userCommunities, setUserCommunities] = useState([])
	const [nonUserCommunities, setNonUserCommunities] = useState([])
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)	
	const [selectedPost, setSelectedPost] = useState(null)

	useEffect(() => {
		console.log("running the function")
		fetchData()
	}, [])

	const fetchData = async (fetchType = "both") => {
		setLoading(true)
		try {			
			const userId = await getUserId()				

			if (fetchType === "communities" || fetchType === "both") {
				const { userCommunities, nonUserCommunities } =
					await getAllCommunities(userId)
				setUserCommunities(userCommunities || [])
				setNonUserCommunities(nonUserCommunities || [])				
			}

			if (fetchType === "posts" || fetchType === "both") {
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
